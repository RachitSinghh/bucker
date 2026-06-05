'use client';

// Dashboard chrome (CMS-IMPLEMENTATION): MUI AppBar + responsive Drawer sidebar
// with active highlighting, signed-in email and a logout action. Renders bare
// (no storefront theme). Auth/logout logic is unchanged from the original.

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase/client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ViewCarouselRoundedIcon from '@mui/icons-material/ViewCarouselRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import LoyaltyRoundedIcon from '@mui/icons-material/LoyaltyRounded';
import RoomServiceRoundedIcon from '@mui/icons-material/RoomServiceRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';

const DRAWER_WIDTH = 248;

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: DashboardRoundedIcon, exact: true },
  { href: '/dashboard/banners', label: 'Banners', icon: ViewCarouselRoundedIcon },
  { href: '/dashboard/products', label: 'Products', icon: Inventory2RoundedIcon },
  { href: '/dashboard/blogs', label: 'Blogs', icon: ArticleRoundedIcon },
  { href: '/dashboard/brands', label: 'Brands', icon: LoyaltyRoundedIcon },
  { href: '/dashboard/services', label: 'Services', icon: RoomServiceRoundedIcon },
  { href: '/dashboard/settings', label: 'Settings', icon: SettingsRoundedIcon },
  { href: '/dashboard/submissions', label: 'Submissions', icon: MailRoundedIcon },
];

export default function DashboardShell({ userEmail, children }) {
  const pathname = usePathname() || '';
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      if (auth) await signOut(auth).catch(() => {});
      await fetch('/api/auth/session', { method: 'DELETE' });
    } finally {
      router.replace('/login');
      router.refresh();
    }
  }

  function isActive(item) {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ gap: 1.25, px: 2.5 }}>
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: 34,
            height: 34,
            fontWeight: 800,
            fontSize: 18,
          }}
        >
          B
        </Avatar>
        <Box sx={{ lineHeight: 1 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>
            Bucker CMS
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Content manager
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={active}
                onClick={() => setMobileOpen(false)}
              >
                <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { fontSize: 14, fontWeight: active ? 700 : 500 } }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }} noWrap>
          {userEmail}
        </Typography>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          color="inherit"
          startIcon={<LogoutIcon fontSize="small" />}
          onClick={handleLogout}
          disabled={loggingOut}
          sx={{ borderColor: 'divider' }}
        >
          {loggingOut ? 'Signing out…' : 'Logout'}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Top bar */}
      <AppBar
        position="fixed"
        sx={{ width: { md: `calc(100% - ${DRAWER_WIDTH}px)` }, ml: { md: `${DRAWER_WIDTH}px` } }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: 'none' } }}
            aria-label="Open navigation"
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ fontWeight: 700, display: { md: 'none' } }}>Bucker CMS</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={userEmail || ''}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'action.selected', color: 'text.primary', fontSize: 14, fontWeight: 700 }}>
              {(userEmail || '?').charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Sidebar — permanent on desktop, temporary on mobile */}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        {isDesktop ? (
          <Drawer
            variant="permanent"
            open
            sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}
          >
            {drawerContent}
          </Drawer>
        )}
      </Box>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minWidth: 0,
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, md: 3.5 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
