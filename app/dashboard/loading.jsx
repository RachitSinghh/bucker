// Dashboard loading skeleton (T-023) — MUI.

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

export default function DashboardLoading() {
  return (
    <Box>
      <Skeleton width={200} height={40} sx={{ mb: 0.5 }} />
      <Skeleton width={320} height={24} sx={{ mb: 3 }} />
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} size={{ xs: 6, sm: 4, md: 2 }}>
            <Card sx={{ p: 2.5 }}>
              <Skeleton variant="rounded" width={40} height={40} sx={{ mb: 1.5 }} />
              <Skeleton width="50%" height={36} />
              <Skeleton width="70%" />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Skeleton variant="rounded" height={240} />
    </Box>
  );
}
