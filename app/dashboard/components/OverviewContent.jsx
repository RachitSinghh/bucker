'use client';

// Overview presentation (MUI). Fed by the server component (page.jsx), which
// does the Firestore reads. Pure presentational — no data fetching here.

import Link from 'next/link';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ViewCarouselRoundedIcon from '@mui/icons-material/ViewCarouselRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import LoyaltyRoundedIcon from '@mui/icons-material/LoyaltyRounded';
import RoomServiceRoundedIcon from '@mui/icons-material/RoomServiceRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const CARDS = [
  { key: 'banners', label: 'Banners', href: '/dashboard/banners', icon: ViewCarouselRoundedIcon },
  { key: 'products', label: 'Products', href: '/dashboard/products', icon: Inventory2RoundedIcon },
  { key: 'blogs', label: 'Blogs', href: '/dashboard/blogs', icon: ArticleRoundedIcon },
  { key: 'brands', label: 'Brands', href: '/dashboard/brands', icon: LoyaltyRoundedIcon },
  { key: 'services', label: 'Services', href: '/dashboard/services', icon: RoomServiceRoundedIcon },
  { key: 'submissions', label: 'Submissions', href: '/dashboard/submissions', icon: MailRoundedIcon },
];

export default function OverviewContent({ counts = {}, submissions = [], configured = true }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 0.5 }}>
        Overview
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Manage your storefront content from one place.
      </Typography>

      {!configured && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Firebase Admin is not configured. Add credentials to <code>.env.local</code> and run the seed
          script to populate content.
        </Alert>
      )}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {CARDS.map(({ key, label, href, icon: Icon }) => (
          <Grid key={key} size={{ xs: 6, sm: 4, md: 2 }}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea component={Link} href={href} sx={{ height: '100%', p: 2 }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      borderRadius: 2,
                      bgcolor: 'action.hover',
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 22, lineHeight: 1.1 }}>
                      {counts[key] ?? 0}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                      {label}
                    </Typography>
                  </Box>
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ overflow: 'hidden' }}>
        <Stack
          direction="row"
          sx={{ px: 2, py: 1.5, alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography variant="subtitle1">Recent submissions</Typography>
          <Button
            component={Link}
            href="/dashboard/submissions"
            size="small"
            endIcon={<ArrowForwardRoundedIcon />}
            color="inherit"
          >
            View all
          </Button>
        </Stack>

        {submissions.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'text.secondary', px: 2, pb: 2.5 }}>
            No submissions yet.
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{s.name || '—'}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{s.email}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>
                    {s.createdAt ? new Date(s.createdAt).toLocaleString() : '—'}
                  </TableCell>
                  <TableCell align="right">
                    {!s.read && <Chip label="new" size="small" color="primary" />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}
