'use client';

// MUI provider stack for the dashboard subtree.
//
// AppRouterCacheProvider wires Emotion's SSR cache for the Next.js App Router
// (injects critical styles during streaming — prevents FOUC / hydration
// mismatch). ScopedCssBaseline applies the MUI baseline only to the dashboard
// wrapper so the global Bootstrap storefront styles are left untouched.
//
// NOTE: we deliberately do NOT use `enableCssLayer`. The storefront loads
// Bootstrap + a Playfair-Display theme globally (app/globals.css) with element
// selectors (h1-h6, legend, fieldset, body). Those are *unlayered*; if MUI's
// styles were put in a cascade layer they would lose to unlayered CSS and
// Bootstrap's `legend`/`fieldset` reset would break every outlined input.
// Keeping MUI unlayered lets its class selectors win on specificity instead.

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import theme from '../theme';

export default function ThemeRegistry({ children }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline>{children}</ScopedCssBaseline>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
