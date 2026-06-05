// Server-side auth helpers (T-008).
//
// The dashboard uses Firebase email/password auth on the client. After sign-in
// the client exchanges its Firebase ID token for an httpOnly **session cookie**
// (POST /api/auth/session), which the Admin SDK mints and verifies. This module
// centralizes cookie handling, the optional admin allowlist, and the
// `getCurrentUser()` helper used by API routes and protected pages.

import 'server-only';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/app/lib/firebase/admin';

export const SESSION_COOKIE = 'bucker_session';
// Firebase session cookies support up to 14 days.
export const SESSION_MAX_AGE_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

/** Parsed ADMIN_EMAILS allowlist (lowercased). Empty array = allow any user. */
export function adminAllowlist() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** True if the email may access the dashboard (allowlist disabled when empty). */
export function isAllowedAdmin(email) {
  const list = adminAllowlist();
  if (list.length === 0) return true;
  return Boolean(email && list.includes(email.toLowerCase()));
}

/** Cookie options used when setting the session cookie. */
export function sessionCookieOptions(maxAgeMs = SESSION_MAX_AGE_MS) {
  return {
    name: SESSION_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: Math.floor(maxAgeMs / 1000),
  };
}

/**
 * Read and verify the session cookie.
 * @returns {Promise<{uid:string,email:string|undefined}|null>}
 */
export async function getCurrentUser() {
  const store = await cookies();
  const session = store.get(SESSION_COOKIE)?.value;
  if (!session) return null;
  try {
    // checkRevoked = true so a logged-out / disabled user is rejected.
    const decoded = await getAdminAuth().verifySessionCookie(session, true);
    if (!isAllowedAdmin(decoded.email)) return null;
    return { uid: decoded.uid, email: decoded.email };
  } catch {
    return null;
  }
}

/** Convenience guard for API routes: returns the user or null (401 caller-side). */
export async function requireUser() {
  return getCurrentUser();
}
