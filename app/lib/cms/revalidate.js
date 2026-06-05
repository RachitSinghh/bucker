// Centralized content revalidation (T-009, used by /api/content T-007).
//
// Maps a CMS collection ("scope") to the cache tag and storefront paths that
// must be refreshed after an edit, so a content write becomes visible on the
// storefront without a redeploy. Keeping this in one place means the API routes
// and any server actions revalidate consistently.

import 'server-only';
import { revalidateTag, revalidatePath } from 'next/cache';
import { contentTag } from '@/app/lib/cms/content';

/** Storefront paths affected by each collection. */
const PATHS_BY_SCOPE = {
  products: ['/', '/shop'],
  blogs: ['/', '/blog'],
  brands: ['/'],
  banners: ['/'],
  services: ['/'],
  settings: ['/', '/contact'],
};

/**
 * Revalidate cached content for a collection.
 * @param {string} scope Collection name (e.g. 'products').
 */
export function revalidateContent(scope) {
  if (!scope) return;
  // Tag-based: clears the unstable_cache entry the read layer uses.
  revalidateTag(contentTag(scope));
  // Path-based: refreshes rendered storefront routes that embed this content.
  for (const path of PATHS_BY_SCOPE[scope] || ['/']) {
    revalidatePath(path);
  }
}
