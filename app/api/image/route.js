// Cloudinary image upload route (T-005).
//
// POST   multipart/form-data { file } -> validate type/size, upload, return
//        { url, publicId, width, height }. Requires an authenticated admin.
// DELETE { publicId }                 -> remove the asset. Requires auth.
//
// The Cloudinary API secret stays server-side; it is never returned or bundled.

import { cloudinary, isCloudinaryConfigured } from '@/app/lib/cloudinary';
import { getCurrentUser } from '@/app/lib/auth';
import { ok, fail } from '@/app/lib/api';

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) return fail('Unauthorized', 401);

  if (!isCloudinaryConfigured()) {
    return fail('Image uploads are not configured on the server.', 500);
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return fail('Expected multipart/form-data', 400);
  }

  const file = formData.get('file');
  if (!file || typeof file.arrayBuffer !== 'function') {
    return fail('No file provided', 400);
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return fail('Unsupported file type. Use JPEG, PNG or WebP.', 400);
  }
  if (file.size > MAX_BYTES) {
    return fail('File too large. Maximum size is 5 MB.', 400);
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || 'bucker';
    const preset = process.env.CLOUDINARY_UPLOAD_PRESET || undefined;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, upload_preset: preset, resource_type: 'image' },
        (error, res) => (error ? reject(error) : resolve(res))
      );
      stream.end(buffer);
    });

    return ok({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (err) {
    console.error('[api/image] upload failed:', err?.message || err);
    return fail('Upload failed. Please try again.', 500);
  }
}

export async function DELETE(request) {
  const user = await getCurrentUser();
  if (!user) return fail('Unauthorized', 401);

  if (!isCloudinaryConfigured()) {
    return fail('Image uploads are not configured on the server.', 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }

  const publicId = body?.publicId;
  if (typeof publicId !== 'string' || !publicId) {
    return fail('Missing publicId', 400);
  }

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    return ok({ deleted: true });
  } catch (err) {
    console.error('[api/image] delete failed:', err?.message || err);
    return fail('Delete failed. Please try again.', 500);
  }
}
