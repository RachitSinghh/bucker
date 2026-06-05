// Server-side content read layer (T-004).
//
// Typed (JSDoc) read helpers used by Server Components. All reads go through the
// Admin SDK on the server and are wrapped in `unstable_cache` with per-collection
// tags, so the storefront is fast but reflects edits quickly: a content write
// calls `revalidateContent(scope)` (see app/lib/cms/revalidate.js) which clears
// the matching tag.
//
// Every helper returns plain serializable objects (no Firestore class
// instances) and degrades gracefully to empty defaults if Firestore is
// unreachable or unconfigured, so pages always render.

import 'server-only';
import { unstable_cache } from 'next/cache';
import { getAdminDb, isAdminConfigured } from '@/app/lib/firebase/admin';
import { SETTINGS_DOC_ID } from '@/app/lib/cms/schema';

/** Cache tag for a collection (also used by the revalidate helper). */
export function contentTag(collection) {
  return `content:${collection}`;
}

// --- serialization ------------------------------------------------------------

/** Convert Firestore values (Timestamps, etc.) into plain JSON-safe values. */
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

function docToObject(doc) {
  return { id: doc.id, ...toPlain(doc.data()) };
}

// --- low-level cached reads ---------------------------------------------------

async function readCollectionRaw(collection) {
  if (!isAdminConfigured()) return [];
  try {
    const snap = await getAdminDb().collection(collection).get();
    const items = snap.docs.map(docToObject);
    // Sort by `order` when present so editors control display order.
    items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return items;
  } catch (err) {
    console.error(`[cms] failed to read "${collection}":`, err?.message || err);
    return [];
  }
}

/** Build a tag-scoped cached reader for a list collection. */
function cachedCollection(collection) {
  return unstable_cache(
    () => readCollectionRaw(collection),
    ['cms', collection],
    { tags: [contentTag(collection)], revalidate: 3600 }
  );
}

const readProducts = cachedCollection('products');
const readBlogs = cachedCollection('blogs');
const readBrands = cachedCollection('brands');
const readBanners = cachedCollection('banners');
const readServices = cachedCollection('services');

async function readSettingsRaw() {
  if (!isAdminConfigured()) return null;
  try {
    const doc = await getAdminDb().collection('settings').doc(SETTINGS_DOC_ID).get();
    return doc.exists ? docToObject(doc) : null;
  } catch (err) {
    console.error('[cms] failed to read settings:', err?.message || err);
    return null;
  }
}

const readSettings = unstable_cache(readSettingsRaw, ['cms', 'settings'], {
  tags: [contentTag('settings')],
  revalidate: 3600,
});

// --- public API ---------------------------------------------------------------

/** @returns {Promise<import('./schema').Product[]>} */
export async function getProducts() {
  return readProducts();
}

/** @returns {Promise<import('./schema').Product|null>} */
export async function getProductById(id) {
  if (!id) return null;
  const products = await readProducts();
  return products.find((p) => p.id === id || p.slug === id) || null;
}

/** Products flagged into a given home tab (features|seller|sales). */
export async function getProductsByTab(tab) {
  const products = await readProducts();
  return products.filter((p) => Array.isArray(p.tabs) && p.tabs.includes(tab));
}

/** Products flagged for the Best Sellers slider. */
export async function getBestSellers() {
  const products = await readProducts();
  return products.filter((p) => p.bestSeller);
}

/** @returns {Promise<import('./schema').Blog[]>} */
export async function getBlogs() {
  return readBlogs();
}

/** @returns {Promise<import('./schema').Blog|null>} */
export async function getBlogBySlug(slug) {
  if (!slug) return null;
  const blogs = await readBlogs();
  return blogs.find((b) => b.slug === slug || b.id === slug) || null;
}

/** @returns {Promise<import('./schema').Brand[]>} */
export async function getBrands() {
  return readBrands();
}

/** @returns {Promise<import('./schema').Banner[]>} */
export async function getBanners() {
  return readBanners();
}

/** Banners of a given type (hero|promo|fullwidth), order-sorted. */
export async function getBannersByType(type) {
  const banners = await readBanners();
  return banners.filter((b) => b.type === type);
}

/**
 * The single banner to show for a single-slot type (hero|fullwidth): the one
 * flagged `active` in the dashboard, falling back to the first by order.
 * @returns {Promise<import('./schema').Banner|null>}
 */
export async function getActiveBannerByType(type) {
  const banners = await getBannersByType(type);
  return banners.find((b) => b.active) || banners[0] || null;
}

/** @returns {Promise<import('./schema').Service[]>} */
export async function getServices() {
  return readServices();
}

/** @returns {Promise<import('./schema').Settings|null>} */
export async function getSettings() {
  return readSettings();
}
