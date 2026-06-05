'use client';

// Shared centered auth layout for /login and /signup, themed to match the dark
// MUI dashboard (same theme + providers). Renders bare (SiteChrome treats
// /login and /signup as bare routes), so the storefront chrome is not shown.

import Link from 'next/link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ThemeRegistry from '@/app/dashboard/components/ThemeRegistry';

export default function AuthShell({ eyebrow, title, description, footer, children }) {
  return (
    <ThemeRegistry>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          background:
            'radial-gradient(900px 480px at 50% -8%, rgba(252,124,124,0.16), transparent 62%), #0b0e14',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 420 }}>
          {/* Brand */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                textDecoration: 'none',
                color: 'text.primary',
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 800,
                  fontSize: 20,
                }}
              >
                B
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.01em' }}>
                Bucker CMS
              </Typography>
            </Box>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              boxShadow: '0 24px 60px -24px rgba(0,0,0,0.7)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              {eyebrow && (
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    mb: 1,
                  }}
                >
                  {eyebrow}
                </Typography>
              )}
              <Typography variant="h5" sx={{ mb: description ? 1 : 0 }}>
                {title}
              </Typography>
              {description && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {description}
                </Typography>
              )}
            </Box>

            {children}

            {footer && (
              <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 3 }}>
                {footer}
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </ThemeRegistry>
  );
}
