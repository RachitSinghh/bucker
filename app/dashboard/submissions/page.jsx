'use client';

// Form submissions inbox (T-017). Lists submissions newest-first with
// read/unread state, a detail view, and delete. MUI two-pane layout; the
// fetch / PATCH / DELETE calls are unchanged.

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ConfirmDialog from '../components/ConfirmDialog';

export default function SubmissionsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/submissions', { cache: 'no-store' });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || 'Failed to load');
        if (active) setItems(json.data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function open(item) {
    setSelected(item);
    if (!item.read) {
      await fetch(`/api/submissions?id=${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      }).catch(() => {});
      setItems((list) => list.map((s) => (s.id === item.id ? { ...s, read: true } : s)));
    }
  }

  async function remove(item) {
    await fetch(`/api/submissions?id=${item.id}`, { method: 'DELETE' }).catch(() => {});
    setItems((list) => list.filter((s) => s.id !== item.id));
    if (selected?.id === item.id) setSelected(null);
    setConfirm(false);
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Submissions
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ overflow: 'hidden' }}>
            {loading ? (
              <Box sx={{ p: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} height={56} sx={{ mb: 1 }} />
                ))}
              </Box>
            ) : items.length === 0 ? (
              <Typography variant="body2" sx={{ color: 'text.secondary', p: 3 }}>
                No submissions yet.
              </Typography>
            ) : (
              <List disablePadding>
                {items.map((s, i) => (
                  <Box key={s.id}>
                    {i > 0 && <Divider component="li" />}
                    <ListItemButton selected={selected?.id === s.id} onClick={() => open(s)} sx={{ py: 1.5 }}>
                      <ListItemText
                        primary={s.name || '(no name)'}
                        secondary={s.subject || s.message}
                        slotProps={{
                          primary: { fontWeight: s.read ? 500 : 700, noWrap: true },
                          secondary: { noWrap: true, fontSize: 13 },
                        }}
                      />
                      {!s.read && <Chip label="new" size="small" color="primary" sx={{ ml: 1 }} />}
                    </ListItemButton>
                  </Box>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 3, minHeight: 320 }}>
            {selected ? (
              <Box>
                <Stack direction="row" sx={{ mb: 1, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6">{selected.subject || '(no subject)'}</Typography>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteOutlineRoundedIcon />}
                    onClick={() => setConfirm(true)}
                  >
                    Delete
                  </Button>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
                  From <strong>{selected.name}</strong> &lt;{selected.email}&gt;
                  {selected.createdAt && ` · ${new Date(selected.createdAt).toLocaleString()}`}
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-wrap', mb: 3 }}>{selected.message}</Typography>
                <Button
                  variant="contained"
                  startIcon={<ReplyRoundedIcon />}
                  href={`mailto:${selected.email}`}
                >
                  Reply by email
                </Button>
              </Box>
            ) : (
              <Stack spacing={1.5} sx={{ py: 6, color: 'text.secondary', alignItems: 'center', justifyContent: 'center' }}>
                <MailOutlineRoundedIcon sx={{ fontSize: 40, opacity: 0.5 }} />
                <Typography variant="body2">Select a submission to read it.</Typography>
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={confirm}
        title="Delete this submission?"
        message="This action cannot be undone."
        onConfirm={() => selected && remove(selected)}
        onClose={() => setConfirm(false)}
      />
    </Box>
  );
}
