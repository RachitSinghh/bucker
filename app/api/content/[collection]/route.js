// CMS content CRUD route (T-007).
//
//   GET    /api/content/:collection          -> list (fresh, uncached)
//   GET    /api/content/:collection?id=ID     -> single document
//   POST   /api/content/:collection          -> create   (auth)
//   PATCH  /api/content/:collection?id=ID      -> update   (auth)
//   DELETE /api/content/:collection?id=ID      -> delete   (auth)
//
// `settings` is a singleton (doc id "global"): only GET + PATCH apply.
// All mutations verify the session cookie, validate the payload against the
// schema, and revalidate the affected storefront content on success.

import { getAdminDb, isAdminConfigured } from '@/app/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { getCurrentUser } from '@/app/lib/auth';
import { ok, fail, validateContent } from '@/app/lib/api';
import { revalidateContent } from '@/app/lib/cms/revalidate';
import { LIST_COLLECTIONS, SETTINGS_DOC_ID } from '@/app/lib/cms/schema';

const ALL_COLLECTIONS = [...LIST_COLLECTIONS, 'settings'];

function isValidCollection(name) {
  return ALL_COLLECTIONS.includes(name);
}

function toPlain(value) {
  if (value == null) return value;
  if (typeof value?.toDate === 'function') return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(toPlain);
  if (typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = toPlain(v);
    return out;
  }
  return value;
}

async function resolveCollection(context) {
  const { collection } = await context.params;
  return collection;
}

// --- GET (public read; dashboard uses fresh data) -----------------------------
export async function GET(request, context) {
  const collection = await resolveCollection(context);
  if (!isValidCollection(collection)) return fail('Unknown collection', 404);
  if (!isAdminConfigured()) return ok(collection === 'settings' ? null : []);

  const db = getAdminDb();
  const id = new URL(request.url).searchParams.get('id');

  try {
    if (collection === 'settings') {
      const doc = await db.collection('settings').doc(SETTINGS_DOC_ID).get();
      return ok(doc.exists ? { id: doc.id, ...toPlain(doc.data()) } : null);
    }
    if (id) {
      const doc = await db.collection(collection).doc(id).get();
      if (!doc.exists) return fail('Not found', 404);
      return ok({ id: doc.id, ...toPlain(doc.data()) });
    }
    const snap = await db.collection(collection).get();
    const items = snap.docs.map((d) => ({ id: d.id, ...toPlain(d.data()) }));
    items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return ok(items);
  } catch (err) {
    console.error(`[api/content GET ${collection}]`, err?.message || err);
    return fail('Failed to read content', 500);
  }
}

// --- POST (create) ------------------------------------------------------------
export async function POST(request, context) {
  const collection = await resolveCollection(context);
  if (!isValidCollection(collection)) return fail('Unknown collection', 404);
  if (collection === 'settings') return fail('Use PATCH to update settings', 405);

  const user = await getCurrentUser();
  if (!user) return fail('Unauthorized', 401);
  if (!isAdminConfigured()) return fail('Server not configured', 500);

  let body;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }

  const { valid, value, errors } = validateContent(collection, body);
  if (!valid) return fail('Validation failed', 400, errors);

  try {
    const db = getAdminDb();
    const payload = {
      ...value,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    // Allow a caller-supplied id (e.g. slug) for deterministic docs.
    const desiredId = typeof body.id === 'string' && body.id.trim() ? body.id.trim() : null;
    let id;
    if (desiredId) {
      await db.collection(collection).doc(desiredId).set(payload);
      id = desiredId;
    } else {
      const ref = await db.collection(collection).add(payload);
      id = ref.id;
    }
    revalidateContent(collection);
    return ok({ id, ...value }, 201);
  } catch (err) {
    console.error(`[api/content POST ${collection}]`, err?.message || err);
    return fail('Failed to create content', 500);
  }
}

// --- PATCH (update) -----------------------------------------------------------
export async function PATCH(request, context) {
  const collection = await resolveCollection(context);
  if (!isValidCollection(collection)) return fail('Unknown collection', 404);

  const user = await getCurrentUser();
  if (!user) return fail('Unauthorized', 401);
  if (!isAdminConfigured()) return fail('Server not configured', 500);

  let body;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }

  const { valid, value, errors } = validateContent(collection, body, { partial: true });
  if (!valid) return fail('Validation failed', 400, errors);

  try {
    const db = getAdminDb();
    const payload = { ...value, updatedAt: FieldValue.serverTimestamp() };

    if (collection === 'settings') {
      await db.collection('settings').doc(SETTINGS_DOC_ID).set(payload, { merge: true });
      revalidateContent('settings');
      return ok({ id: SETTINGS_DOC_ID, ...value });
    }

    const id = new URL(request.url).searchParams.get('id') || (typeof body.id === 'string' ? body.id : '');
    if (!id) return fail('Missing document id', 400);
    const ref = db.collection(collection).doc(id);
    const existing = await ref.get();
    if (!existing.exists) return fail('Not found', 404);
    await ref.set(payload, { merge: true });
    revalidateContent(collection);
    return ok({ id, ...value });
  } catch (err) {
    console.error(`[api/content PATCH ${collection}]`, err?.message || err);
    return fail('Failed to update content', 500);
  }
}

// --- DELETE -------------------------------------------------------------------
export async function DELETE(request, context) {
  const collection = await resolveCollection(context);
  if (!isValidCollection(collection)) return fail('Unknown collection', 404);
  if (collection === 'settings') return fail('Settings cannot be deleted', 405);

  const user = await getCurrentUser();
  if (!user) return fail('Unauthorized', 401);
  if (!isAdminConfigured()) return fail('Server not configured', 500);

  const id =
    new URL(request.url).searchParams.get('id') ||
    (await request.json().catch(() => ({})))?.id;
  if (!id) return fail('Missing document id', 400);

  try {
    await getAdminDb().collection(collection).doc(id).delete();
    revalidateContent(collection);
    return ok({ id, deleted: true });
  } catch (err) {
    console.error(`[api/content DELETE ${collection}]`, err?.message || err);
    return fail('Failed to delete content', 500);
  }
}

// Mutations and fresh reads must never be statically cached.
export const dynamic = 'force-dynamic';
