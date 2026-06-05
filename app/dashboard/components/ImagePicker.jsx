'use client';

// Reusable image picker/upload field (MUI). Controlled component: uploads the
// chosen file to POST /api/image, shows a preview + progress state, and reports
// the resulting Cloudinary URL to the parent via onChange. Supports clearing
// and a manual URL fallback (e.g. existing /img/* assets).

import { useState } from 'react';
import { uploadImage } from '@/app/lib/cms/client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';

export default function ImagePicker({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-selecting the same file later
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const data = await uploadImage(file);
      onChange(data.url);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Box
          sx={{
            width: 104,
            height: 104,
            flexShrink: 0,
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'divider',
            bgcolor: 'action.hover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {uploading ? (
            <CircularProgress size={26} />
          ) : value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="preview"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          ) : (
            <ImageRoundedIcon sx={{ color: 'text.disabled', fontSize: 32 }} />
          )}
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <Button
              component="label"
              size="small"
              variant="outlined"
              color="inherit"
              startIcon={<UploadRoundedIcon fontSize="small" />}
              disabled={uploading}
              sx={{ borderColor: 'divider' }}
            >
              {uploading ? 'Uploading…' : 'Upload'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={handleFile}
              />
            </Button>
            {value && !uploading && (
              <IconButton size="small" color="error" onClick={() => onChange('')} aria-label="Clear image">
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
          <TextField
            size="small"
            fullWidth
            placeholder="or paste an image URL"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            error={!!error}
            helperText={error || undefined}
          />
        </Box>
      </Stack>
    </Box>
  );
}
