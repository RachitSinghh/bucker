'use client';

// Reusable list + create/edit/delete editor (EPIC 3) shared by the banners,
// products, blogs, brands and services modules. Driven by a plain `fields`
// config (no functions) so each module page just declares its shape.
//
// Field config shape:
//   { name, label, type, required?, options?, help?, autoSlugFrom? }
//   type: 'text' | 'textarea' | 'number' | 'image' | 'checkbox'
//         | 'select' | 'multiselect'
//
// UI is MUI: a DataGrid list (sort / quick-filter search / pagination) with a
// right-side Drawer for the create/edit form. All data + business logic
// (listContent/onSnapshot/buildPayload/save/activation/slug) is unchanged.

import { useEffect, useMemo, useState } from 'react';
import { collection as fsCollection, onSnapshot } from 'firebase/firestore';
import ImagePicker from './ImagePicker';
import ConfirmDialog from './ConfirmDialog';
import { db } from '@/app/lib/firebase/client';
import {
  listContent,
  createContent,
  updateContent,
  deleteContent,
} from '@/app/lib/cms/client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';

function plainTimestamps(data) {
  const out = {};
  for (const [k, v] of Object.entries(data)) {
    out[k] = typeof v?.toDate === 'function' ? v.toDate().toISOString() : v;
  }
  return out;
}

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function blankForm(fields) {
  const f = {};
  for (const field of fields) {
    if (field.type === 'checkbox') f[field.name] = false;
    else if (field.type === 'multiselect') f[field.name] = [];
    else if (field.type === 'number') f[field.name] = '';
    else f[field.name] = '';
  }
  return f;
}

// `activation` (optional) adds a per-row "use this" button to mark one item as
// the active one. Shape:
//   { applies?(item):bool, isActive(item):bool, run(item, items):Promise,
//     actionLabel?:string, activeLabel?:string, notice?(item):string }
export default function CrudEditor({ collection, title, singular, fields, description, activation = null }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [editing, setEditing] = useState(null); // null | 'new' | id
  const [form, setForm] = useState(() => blankForm(fields));
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [activatingId, setActivatingId] = useState(null);
  const [confirmItem, setConfirmItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const imageField = useMemo(() => fields.find((f) => f.type === 'image'), [fields]);
  const titleField = useMemo(
    () => fields.find((f) => ['title', 'name'].includes(f.name)) || fields.find((f) => f.type === 'text'),
    [fields]
  );

  async function refresh() {
    setLoading(true);
    setError('');
    try {
      const data = await listContent(collection);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  // Initial load via the API (authoritative), then — if the client Firestore
  // SDK is configured — subscribe with onSnapshot so edits from other admins
  // appear live without a manual refresh (T-024). The listener is cleaned up on
  // unmount / collection change to avoid leaks and duplicate subscriptions.
  useEffect(() => {
    if (!db) {
      // No client Firestore: one-shot API read. Await before any setState so we
      // don't update state synchronously inside the effect body.
      let active = true;
      (async () => {
        try {
          const data = await listContent(collection);
          if (active) setItems(Array.isArray(data) ? data : []);
        } catch (err) {
          if (active) setError(err.message || 'Failed to load');
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }
    // `loading` starts true; the snapshot callback flips it false.
    const unsub = onSnapshot(
      fsCollection(db, collection),
      (snap) => {
        const next = snap.docs.map((d) => ({ id: d.id, ...plainTimestamps(d.data()) }));
        next.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setItems(next);
        setLoading(false);
      },
      (err) => {
        // Fall back to a one-shot API read if the listener fails.
        console.error('[cms] snapshot error:', err?.message || err);
        refresh();
      }
    );
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  function startCreate() {
    setForm(blankForm(fields));
    setFormError('');
    setEditing('new');
  }

  function startEdit(item) {
    const next = blankForm(fields);
    for (const field of fields) {
      if (item[field.name] !== undefined && item[field.name] !== null) next[field.name] = item[field.name];
    }
    setForm({ ...next, id: item.id });
    setFormError('');
    setEditing(item.id);
  }

  function cancel() {
    setEditing(null);
    setFormError('');
  }

  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function buildPayload() {
    const payload = {};
    for (const field of fields) {
      let v = form[field.name];
      if (field.type === 'number') v = v === '' || v == null ? undefined : Number(v);
      payload[field.name] = v;
    }
    // Auto-generate a unique slug from another field when left blank.
    const slugField = fields.find((f) => f.autoSlugFrom);
    if (slugField && !payload[slugField.name]) {
      let base = slugify(form[slugField.autoSlugFrom]);
      if (!base) base = `${singular || 'item'}`.toLowerCase();
      let candidate = base;
      let n = 2;
      const taken = new Set(items.filter((it) => it.id !== form.id).map((it) => it[slugField.name]));
      while (taken.has(candidate)) candidate = `${base}-${n++}`;
      payload[slugField.name] = candidate;
    }
    return payload;
  }

  async function save(e) {
    e.preventDefault();
    setFormError('');
    // Required validation.
    for (const field of fields) {
      if (field.required) {
        const v = form[field.name];
        const empty = field.type === 'multiselect' ? !(v && v.length) : !String(v ?? '').trim();
        if (empty) {
          setFormError(`${field.label} is required.`);
          return;
        }
      }
    }
    setSaving(true);
    try {
      const payload = buildPayload();
      if (editing === 'new') {
        await createContent(collection, payload);
        setNotice(`${singular} created.`);
      } else {
        await updateContent(collection, form.id, payload);
        setNotice(`${singular} updated.`);
      }
      setEditing(null);
      await refresh();
    } catch (err) {
      setFormError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function runActivate(item) {
    if (!activation) return;
    setError('');
    setActivatingId(item.id);
    try {
      await activation.run(item, items);
      setNotice(activation.notice ? activation.notice(item) : `${singular} updated.`);
      await refresh();
    } catch (err) {
      setError(err.message || 'Action failed');
    } finally {
      setActivatingId(null);
    }
  }

  async function remove(item) {
    setDeleting(true);
    try {
      await deleteContent(collection, item.id);
      setNotice(`${singular} deleted.`);
      setConfirmItem(null);
      await refresh();
    } catch (err) {
      setError(err.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  }

  const columns = useMemo(() => {
    const cols = [];
    if (imageField) {
      cols.push({
        field: '__image',
        headerName: '',
        width: 72,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params) => {
          const url = params.row[imageField.name];
          return (
            <Avatar
              variant="rounded"
              src={url || undefined}
              sx={{ width: 40, height: 40, bgcolor: 'action.hover', color: 'text.disabled' }}
            >
              {!url && <ImageRoundedIcon fontSize="small" />}
            </Avatar>
          );
        },
      });
    }
    cols.push({
      field: titleField?.name || 'name',
      headerName: titleField?.label || 'Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Stack sx={{ height: '100%', justifyContent: 'center' }} spacing={0.25}>
          <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
            {params.row[titleField?.name] || '(untitled)'}
          </Typography>
          {params.row.type && (
            <Box>
              <Chip label={params.row.type} size="small" variant="outlined" sx={{ height: 18, fontSize: 11 }} />
            </Box>
          )}
        </Stack>
      ),
    });
    cols.push({
      field: 'order',
      headerName: 'Order',
      width: 90,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      valueGetter: (value) => value ?? null,
    });
    cols.push({
      field: '__actions',
      headerName: '',
      width: activation ? 280 : 116,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => {
        const item = params.row;
        return (
          <Stack direction="row" spacing={0.5} sx={{ width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
            {activation && activation.applies?.(item) !== false && (
              activation.isActive(item) ? (
                <Chip
                  size="small"
                  color="success"
                  variant="outlined"
                  icon={<CheckCircleRoundedIcon />}
                  label={activation.activeLabel || 'In use'}
                  sx={{ mr: 0.5 }}
                />
              ) : (
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  onClick={() => runActivate(item)}
                  disabled={activatingId === item.id}
                  sx={{ mr: 0.5 }}
                >
                  {activatingId === item.id ? '…' : activation.actionLabel || 'Use this'}
                </Button>
              )
            )}
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => startEdit(item)}>
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" color="error" onClick={() => setConfirmItem(item)}>
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    });
    return cols;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageField, titleField, activation, activatingId]);

  const drawerOpen = editing !== null;

  return (
    <Box>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 3, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}
      >
        <Box>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          )}
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={startCreate}>
          Add {singular}
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* List */}
      <Paper sx={{ height: 600, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={items}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          showToolbar
          disableRowSelectionOnClick
          rowHeight={60}
          columnHeaderHeight={46}
          pageSizeOptions={[10, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          localeText={{ noRowsLabel: `No ${title.toLowerCase()} yet — click “Add ${singular}”.` }}
          sx={{
            border: 'none',
            '--DataGrid-rowBorderColor': 'rgba(255,255,255,0.06)',
            '& .MuiDataGrid-columnHeaders': { bgcolor: 'background.default' },
            '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700, fontSize: 13, color: 'text.secondary' },
            '& .MuiDataGrid-cell': { fontSize: 14, display: 'flex', alignItems: 'center' },
            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': { outline: 'none' },
            '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
            '& .MuiDataGrid-row:hover': { bgcolor: 'action.hover' },
            '& .MuiDataGrid-toolbarContainer': { px: 2, py: 1.5, gap: 1 },
            // Footer / pagination: neutralize the storefront's inherited
            // line-height (29px) that otherwise mis-centers the toolbar.
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid rgba(255,255,255,0.06)',
              minHeight: 52,
            },
            '& .MuiTablePagination-toolbar': {
              minHeight: 52,
              alignItems: 'center',
              lineHeight: 'normal',
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              m: 0,
              lineHeight: 'normal',
              fontSize: 13,
              color: 'text.secondary',
            },
            '& .MuiTablePagination-select': {
              display: 'flex',
              alignItems: 'center',
              lineHeight: 'normal',
            },
          }}
        />
      </Paper>

      {/* Create / edit drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={saving ? undefined : cancel}>
        <Box
          component="form"
          onSubmit={save}
          sx={{ width: { xs: '100vw', sm: 480 }, height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Stack
            direction="row"
            sx={{ px: 3, py: 2, alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography variant="h6">
              {editing === 'new' ? `New ${singular}` : `Edit ${singular}`}
            </Typography>
            <IconButton onClick={cancel} disabled={saving} aria-label="Close">
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Divider />

          <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 3, py: 3 }}>
            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
              </Alert>
            )}
            <Grid container spacing={2.5}>
              {fields.map((field) => (
                <Grid key={field.name} size={{ xs: 12, sm: isFullWidthField(field) ? 12 : 6 }}>
                  <Field field={field} value={form[field.name]} onChange={setField} />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider />
          <Stack direction="row" spacing={1.5} sx={{ px: 3, py: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {saving ? 'Saving…' : 'Save'}
            </Button>
            <Button type="button" color="inherit" onClick={cancel} disabled={saving}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Drawer>

      <ConfirmDialog
        open={!!confirmItem}
        title={`Delete this ${singular?.toLowerCase() || 'item'}?`}
        message="This action cannot be undone."
        busy={deleting}
        onConfirm={() => confirmItem && remove(confirmItem)}
        onClose={() => setConfirmItem(null)}
      />

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

// Wide field types take a full row in the drawer's 2-column form grid.
function isFullWidthField(field) {
  return ['textarea', 'image', 'multiselect'].includes(field.type);
}

function Field({ field, value, onChange }) {
  if (field.type === 'image') {
    return <ImagePicker label={field.label} value={value} onChange={(url) => onChange(field.name, url)} />;
  }

  if (field.type === 'checkbox') {
    return (
      <FormControlLabel
        control={<Checkbox checked={!!value} onChange={(e) => onChange(field.name, e.target.checked)} />}
        label={field.label}
      />
    );
  }

  if (field.type === 'multiselect') {
    const arr = Array.isArray(value) ? value : [];
    return (
      <Box>
        <FormLabel sx={{ fontSize: 13, fontWeight: 600, color: 'text.secondary' }}>{field.label}</FormLabel>
        <FormGroup>
          {field.options.map((opt) => (
            <FormControlLabel
              key={opt.value}
              control={
                <Checkbox
                  size="small"
                  checked={arr.includes(opt.value)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...arr, opt.value]
                      : arr.filter((v) => v !== opt.value);
                    onChange(field.name, next);
                  }}
                />
              }
              label={opt.label}
            />
          ))}
        </FormGroup>
      </Box>
    );
  }

  if (field.type === 'select') {
    return (
      <TextField
        select
        label={field.label}
        value={value || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        helperText={field.help || undefined}
      >
        <MenuItem value="">
          <em>Select…</em>
        </MenuItem>
        {field.options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  if (field.type === 'textarea') {
    return (
      <TextField
        label={field.label}
        value={value || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        multiline
        minRows={field.name === 'body' ? 8 : 3}
        helperText={field.help || undefined}
      />
    );
  }

  return (
    <TextField
      label={field.label}
      type={field.type === 'number' ? 'number' : 'text'}
      value={value ?? ''}
      onChange={(e) => onChange(field.name, e.target.value)}
      helperText={field.help || undefined}
    />
  );
}
