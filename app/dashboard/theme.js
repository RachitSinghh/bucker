// MUI dark theme for the admin dashboard (CMS-IMPLEMENTATION).
//
// Brand: coral (#fc7c7c) primary accent, a lighter indigo/navy secondary that
// reads on dark surfaces. The UI font (Plus Jakarta Sans) is loaded via
// next/font so the family resolves inside MUI portals (Drawer/Menu/Dialog) too.

import { Plus_Jakarta_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const CORAL = '#fc7c7c';
const INDIGO = '#7c93fc';
const PAPER = '#151a23';
const DEFAULT_BG = '#0b0e14';
const ELEVATED = '#1b2230';

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: { main: CORAL, contrastText: '#1a1414' },
    secondary: { main: INDIGO, contrastText: '#0d1020' },
    success: { main: '#5fd0a0' },
    warning: { main: '#f5c46b' },
    error: { main: '#f47174' },
    info: { main: '#79b8ff' },
    background: { default: DEFAULT_BG, paper: PAPER },
    text: { primary: '#e6e9ef', secondary: '#9aa4b2' },
    divider: 'rgba(255,255,255,0.08)',
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: jakarta.style.fontFamily,
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.01em' }, // 24px page titles
    h6: { fontWeight: 700, fontSize: '1.125rem', letterSpacing: 'normal' },
    subtitle1: { fontWeight: 700, fontSize: '0.9375rem', letterSpacing: 'normal' },
    subtitle2: { fontWeight: 600, letterSpacing: 'normal' },
    body1: { fontSize: '0.875rem', letterSpacing: 'normal' }, // 14px body
    body2: { fontSize: '0.875rem', letterSpacing: 'normal' }, // 14px secondary
    caption: { letterSpacing: 'normal' },
    button: { fontWeight: 600, letterSpacing: 'normal' },
  },
  components: {
    // Normalize the storefront's global `body { letter-spacing: .02em }` that
    // otherwise inherits into the dashboard subtree.
    MuiScopedCssBaseline: {
      styleOverrides: {
        root: { letterSpacing: 'normal', fontFamily: jakarta.style.fontFamily },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: 'rgba(255,255,255,0.16)' },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'default' },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(11,14,20,0.85)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backgroundImage: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: PAPER,
          backgroundImage: 'none',
          borderRight: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: PAPER,
          border: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 10 },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '&.Mui-selected': {
            backgroundColor: 'rgba(252,124,124,0.16)',
            color: CORAL,
            '&:hover': { backgroundColor: 'rgba(252,124,124,0.22)' },
            '& .MuiListItemIcon-root': { color: CORAL },
          },
        },
      },
    },
    MuiTextField: { defaultProps: { size: 'small', fullWidth: true } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiTooltip: {
      styleOverrides: { tooltip: { backgroundColor: ELEVATED, fontSize: 12 } },
    },
  },
});

export default theme;
