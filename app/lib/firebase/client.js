// Firebase CLIENT SDK singleton (T-002).
// Safe for the browser: only uses NEXT_PUBLIC_* config. Used for Auth and any
// client-side Firestore listeners (e.g. real-time dashboard lists, T-024).
// Guarded against re-initialization during hot reload / Fast Refresh.
//
// Initialization is also guarded against missing config so the app can build
// and pages can prerender even when NEXT_PUBLIC_FIREBASE_* vars are absent
// (auth simply stays null until configured). When unconfigured, the login /
// signup pages surface a clear message instead of crashing at module load.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isClientConfigured = Boolean(firebaseConfig.apiKey);

// Reuse the existing app on hot reload instead of calling initializeApp twice,
// which would throw "Firebase App named '[DEFAULT]' already exists".
const app = isClientConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const firebaseApp = app;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
