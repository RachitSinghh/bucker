'use client';

// Dashboard error boundary (T-023) — MUI.

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

export default function DashboardError({ error, reset }) {
  return (
    <Paper sx={{ p: 5 }}>
      <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
        <ErrorOutlineRoundedIcon color="error" sx={{ fontSize: 48 }} />
        <Typography variant="h6">Something went wrong</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {error?.message || 'An unexpected error occurred.'}
        </Typography>
        <Button variant="contained" startIcon={<ReplayRoundedIcon />} onClick={() => reset()}>
          Try again
        </Button>
      </Stack>
    </Paper>
  );
}
