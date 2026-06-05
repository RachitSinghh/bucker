'use client';

// Dashboard sign-up (T-008), styled with MUI to match the dark dashboard.
// Creates a Firebase email/password user, then exchanges the ID token for the
// httpOnly session cookie. If ADMIN_EMAILS is set, the session route rejects
// non-allowlisted emails with a clear message.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase/client';
import AuthShell from '@/app/components/AuthShell';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import MuiLink from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';

export default function SignupPage() {
  const router = useRouter();
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
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Sign up failed');
      }
      router.replace('/dashboard');
      router.refresh();
    } catch (err) {
      setError(friendlyAuthError(err));
      setLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Get started"
      title="Create admin account"
      description="Register a dashboard user for Bucker CMS."
      footer={
        <>
          Already have an account?{' '}
          <MuiLink component={Link} href="/login" underline="hover" sx={{ fontWeight: 600 }}>
            Sign in
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
            placeholder="At least 6 characters"
            required
            autoComplete="new-password"
            slotProps={{ htmlInput: { minLength: 6 } }}
            helperText="Use at least 6 characters."
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
            {loading ? 'Creating…' : 'Sign Up'}
          </Button>
        </Stack>
      </Box>
    </AuthShell>
  );
}

function friendlyAuthError(err) {
  const code = err?.code || '';
  if (code.includes('email-already-in-use')) return 'That email is already registered. Try logging in.';
  if (code.includes('invalid-email')) return 'Please enter a valid email address.';
  if (code.includes('weak-password')) return 'Password is too weak (min 6 characters).';
  if (code.includes('network-request-failed')) return 'Network error — check your connection or that Firebase Auth is enabled.';
  return err?.message || 'Sign up failed. Please try again.';
}
