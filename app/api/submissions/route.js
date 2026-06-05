// Submissions inbox API (T-017). Auth-required.
//
//   GET    /api/submissions          -> newest-first, capped list
//   PATCH  /api/submissions?id=ID      { read }  -> mark read/unread
//   DELETE /api/submissions?id=ID                -> delete

import { getAdminDb, isAdminConfigured } from '@/app/lib/firebase/admin';
import { getCurrentUser } from '@/app/lib/auth';
import { ok, fail } from '@/app/lib/api';

export const dynamic = 'force-dynamic';

const MAX = 100;

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return fail('Unauthorized', 401);
  if (!isAdminConfigured()) return ok([]);

  try {
    const snap = await getAdminDb()
      .collection('submissions')
      .orderBy('createdAt', 'desc')
      .limit(MAX)
      .get();
    const items = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name || '',
        email: data.email || '',
        subject: data.subject || '',
        message: data.message || '',
        read: !!data.read,
        createdAt: data.createdAt?.toDate?.().toISOString() || null,
      };
    });
    return ok(items);
  } catch (err) {
    console.error('[api/submissions GET]', err?.message || err);
    return fail('Failed to load submissions', 500);
  }
}

export async function PATCH(request) {
  const user = await getCurrentUser();
  if (!user) return fail('Unauthorized', 401);
  if (!isAdminConfigured()) return fail('Server not configured', 500);

  const id = new URL(request.url).searchParams.get('id');
  if (!id) return fail('Missing id', 400);

  let body;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }

  try {
    await getAdminDb()
      .collection('submissions')
      .doc(id)
      .set({ read: !!body.read }, { merge: true });
    return ok({ id, read: !!body.read });
  } catch (err) {
    console.error('[api/submissions PATCH]', err?.message || err);
    return fail('Failed to update submission', 500);
  }
}

export async function DELETE(request) {
  const user = await getCurrentUser();
  if (!user) return fail('Unauthorized', 401);
  if (!isAdminConfigured()) return fail('Server not configured', 500);

  const id = new URL(request.url).searchParams.get('id');
  if (!id) return fail('Missing id', 400);

  try {
    await getAdminDb().collection('submissions').doc(id).delete();
    return ok({ id, deleted: true });
  } catch (err) {
    console.error('[api/submissions DELETE]', err?.message || err);
    return fail('Failed to delete submission', 500);
  }
}
