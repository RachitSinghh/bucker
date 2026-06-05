'use client';

// Dashboard login (T-008), styled with MUI to match the dark dashboard.
// Email/password via the Firebase client SDK, then exchange the ID token for an
// httpOnly session cookie before entering /dashboard.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase/client';
import AuthShell from '@/app/components/AuthShell';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import MuiLink from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoginPage() {
  const router = useRouter();
  // Read ?redirect= once at mount via lazy initial state (no effect needed).
  const [redirectTo] = useState(() => {
    if (typeof window === 'undefined') return '/dashboard';
    const r = new URLSearchParams(window.location.search).get('redirect');
    return r && r.startsWith('/') ? r : '/dashboard';
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!auth) {
      setError('Authentication is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars.');
      return;
    }
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Login failed');
      }
      router.replace(redirectTo);
      router.refresh();
    } catch (err) {
      setError(friendlyAuthError(err));
      setLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to Bucker"
      description="Manage your storefront content from the admin dashboard."
      footer={
        <>
          Need an account?{' '}
          <MuiLink component={Link} href="/signup" underline="hover" sx={{ fontWeight: 600 }}>
            Sign up
          </MuiLink>
        </>
      }
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            label="Email"
            type="email"
            size="medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            size="medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
            sx={{ py: 1.25, mt: 0.5 }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </Stack>
      </Box>
    </AuthShell>
  );
}

function friendlyAuthError(err) {
  const code = err?.code || '';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
    return 'Invalid email or password.';
  }
  if (code.includes('too-many-requests')) return 'Too many attempts. Try again later.';
  if (code.includes('network-request-failed')) return 'Network error — check your connection or that Firebase Auth is enabled.';
  return err?.message || 'Login failed. Please try again.';
}
