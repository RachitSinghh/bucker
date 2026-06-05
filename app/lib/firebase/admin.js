// Firebase ADMIN SDK singleton (T-002).
//
// SERVER ONLY. This module reads the service-account private key and must never
// be imported from a 'use client' component. The `import 'server-only'` below
// turns any accidental client import into a build error.
//
// Initialization is LAZY: the Admin app is only created the first time
// `getAdminAuth()` / `getAdminDb()` is called. This lets the app build and the
// storefront degrade gracefully (read layer returns empty data) even when no
// service-account credentials are present in the environment.

import 'server-only';

import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function getPrivateKey() {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  if (!key) return undefined;
  // In .env the key is stored on one line with literal "\n" escapes; restore
  // the real newlines the Admin SDK expects. Also strip wrapping quotes that
  // some shells/hosts leave in place.
  return key.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
}

/** True when the Admin SDK has the credentials it needs. */
export function isAdminConfigured() {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  );
}

let cachedApp = null;

function getAdminApp() {
  if (cachedApp) return cachedApp;
  if (getApps().length) {
    cachedApp = getApp();
    return cachedApp;
  }
  if (!isAdminConfigured()) {
    throw new Error(
      'Firebase Admin SDK is not configured. Set FIREBASE_PROJECT_ID, ' +
        'FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in .env.local.'
    );
  }
  cachedApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: getPrivateKey(),
    }),
  });
  return cachedApp;
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}
