'use client';

// Global settings editor (T-016): footer + contact info singleton. Feeds the
// global Footer and the /contact page. MUI form; data shape, EMAIL_RE
// validation and the singleton PATCH save are unchanged.

import { useEffect, useState } from 'react';
import { listContent, updateContent } from '@/app/lib/cms/client';
import { EMAIL_RE } from './validators';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

const EMPTY = {
  contactEmail: '',
  address: '',
  phones: [],
  infoLinks: [],
  accountLinks: [],
  newsletterText: '',
  copyright: '',
  contactHeading: '',
  stores: [],
  mapEmbedUrl: '',
  shipping: [],
};

export default function SettingsPage() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await listContent('settings');
        if (data) setForm({ ...EMPTY, ...data });
      } catch (err) {
        setError(err.message || 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function set(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function save(e) {
    e.preventDefault();
    setError('');
    setNotice('');
    if (form.contactEmail && !EMAIL_RE.test(form.contactEmail)) {
      setError('Contact email is not a valid email address.');
      return;
    }
    for (const s of form.stores) {
      if (s.email && !EMAIL_RE.test(s.email)) {
        setError(`Store "${s.title || ''}" has an invalid email.`);
        return;
      }
    }
    setSaving(true);
    try {
      // Strip Firestore-managed fields before sending.
      const { id, updatedAt, createdAt, ...payload } = form;
      await updateContent('settings', null, payload);
      setNotice('Settings saved.');
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Box>
        <Skeleton width={180} height={40} sx={{ mb: 3 }} />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={160} sx={{ mb: 2 }} />
        ))}
      </Box>
    );
  }

  const SaveButton = (
    <Button
      type="submit"
      variant="contained"
      disabled={saving}
      startIcon={<SaveRoundedIcon />}
    >
      {saving ? 'Saving…' : 'Save settings'}
    </Button>
  );

  return (
    <Box component="form" onSubmit={save}>
      <Stack direction="row" sx={{ mb: 3, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Settings</Typography>
        {SaveButton}
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Section title="Contact details (footer + contact page)">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Contact email" value={form.contactEmail || ''} onChange={(e) => set('contactEmail', e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Contact page heading" value={form.contactHeading || ''} onChange={(e) => set('contactHeading', e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField label="Footer address" value={form.address || ''} onChange={(e) => set('address', e.target.value)} />
          </Grid>
        </Grid>
        <StringList label="Phone numbers" items={form.phones} onChange={(v) => set('phones', v)} />
      </Section>

      <Section title="Stores (contact page)">
        <ObjectList
          items={form.stores}
          onChange={(v) => set('stores', v)}
          template={{ title: '', address: '', phone: '', email: '', website: '' }}
          columns={['title', 'address', 'phone', 'email', 'website']}
          addLabel="Add store"
        />
        <Box sx={{ mt: 2.5 }}>
          <TextField label="Map embed URL" value={form.mapEmbedUrl || ''} onChange={(e) => set('mapEmbedUrl', e.target.value)} />
        </Box>
      </Section>

      <Section title="Footer link columns">
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
          Information links
        </Typography>
        <ObjectList
          items={form.infoLinks}
          onChange={(v) => set('infoLinks', v)}
          template={{ label: '', href: '' }}
          columns={['label', 'href']}
          addLabel="Add link"
        />
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
          Account links
        </Typography>
        <ObjectList
          items={form.accountLinks}
          onChange={(v) => set('accountLinks', v)}
          template={{ label: '', href: '' }}
          columns={['label', 'href']}
          addLabel="Add link"
        />
      </Section>

      <Section title="Footer extras">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Newsletter text" value={form.newsletterText || ''} onChange={(e) => set('newsletterText', e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Copyright" value={form.copyright || ''} onChange={(e) => set('copyright', e.target.value)} />
          </Grid>
        </Grid>
      </Section>

      <Box sx={{ mb: 5 }}>{SaveButton}</Box>

      <Snackbar
        open={!!notice}
        autoHideDuration={3500}
        onClose={() => setNotice('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setNotice('')}>
          {notice}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function Section({ title, children }) {
  return (
    <Card sx={{ mb: 3 }}>
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>
      <Divider />
      <CardContent sx={{ p: 3 }}>{children}</CardContent>
    </Card>
  );
}

function StringList({ label, items, onChange }) {
  const arr = items || [];
  return (
    <Box sx={{ mt: 2.5 }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        {label}
      </Typography>
      <Stack spacing={1.5}>
        {arr.map((val, i) => (
          <Stack direction="row" spacing={1} key={i}>
            <TextField
              value={val}
              onChange={(e) => {
                const next = [...arr];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <IconButton color="error" onClick={() => onChange(arr.filter((_, j) => j !== i))} aria-label="Remove">
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
      </Stack>
      <Button
        size="small"
        color="inherit"
        startIcon={<AddRoundedIcon />}
        onClick={() => onChange([...arr, ''])}
        sx={{ mt: 1.5 }}
      >
        Add
      </Button>
    </Box>
  );
}

function ObjectList({ items, onChange, template, columns, addLabel = 'Add row' }) {
  const arr = items || [];
  return (
    <Box>
      <Stack spacing={2}>
        {arr.map((row, i) => (
          <Stack direction="row" spacing={1} key={i} sx={{ alignItems: 'flex-start' }}>
            <Grid container spacing={1.5} sx={{ flexGrow: 1 }}>
              {columns.map((col) => (
                <Grid size={{ xs: 12, sm: columns.length > 2 ? 6 : 6 }} key={col}>
                  <TextField
                    label={col.charAt(0).toUpperCase() + col.slice(1)}
                    value={row[col] || ''}
                    onChange={(e) => {
                      const next = [...arr];
                      next[i] = { ...next[i], [col]: e.target.value };
                      onChange(next);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <IconButton
              color="error"
              onClick={() => onChange(arr.filter((_, j) => j !== i))}
              aria-label="Remove"
              sx={{ mt: 0.5 }}
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
      </Stack>
      <Button
        size="small"
        color="inherit"
        startIcon={<AddRoundedIcon />}
        onClick={() => onChange([...arr, { ...template }])}
        sx={{ mt: arr.length ? 2 : 0 }}
      >
        {addLabel}
      </Button>
    </Box>
  );
}
