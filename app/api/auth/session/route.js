// Session cookie route (T-008).
//
// POST   { idToken }  -> verify the Firebase ID token with the Admin SDK,
//                        enforce the optional admin allowlist, mint an httpOnly
//                        session cookie.
// DELETE              -> clear the session cookie (logout).

import { cookies } from 'next/headers';
import { getAdminAuth } from '@/app/lib/firebase/admin';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_MS,
  isAllowedAdmin,
  sessionCookieOptions,
} from '@/app/lib/auth';
import { ok, fail } from '@/app/lib/api';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }

  const idToken = body?.idToken;
  if (typeof idToken !== 'string' || !idToken) {
    return fail('Missing idToken', 400);
  }

  try {
    const auth = getAdminAuth();
    // Verify the ID token server-side before issuing any cookie.
    const decoded = await auth.verifyIdToken(idToken, true);
    if (!isAllowedAdmin(decoded.email)) {
      return fail('This account is not allowed to access the dashboard.', 403);
    }

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_MAX_AGE_MS,
    });

    const store = await cookies();
    const opts = sessionCookieOptions();
    store.set(opts.name, sessionCookie, opts);

    return ok({ email: decoded.email, uid: decoded.uid });
  } catch (err) {
    console.error('[auth/session] verify failed:', err?.message || err);
    return fail('Could not verify credentials.', 401);
  }
}

export async function DELETE() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return ok({ loggedOut: true });
}
