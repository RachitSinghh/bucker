'use client';

// Client-side CMS API helpers (EPIC 3). Thin wrappers over /api/content and
// /api/image used by the dashboard editors. All return the parsed { ok, data }
// envelope and throw a friendly Error on failure.

async function handle(res) {
  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error(`Request failed (${res.status})`);
  }
  if (!res.ok || !json.ok) {
    const fieldMsg = json.fields ? ` ${Object.values(json.fields).join(', ')}` : '';
    throw new Error((json.error || `Request failed (${res.status})`) + fieldMsg);
  }
  return json.data;
}

export function listContent(collection) {
  return fetch(`/api/content/${collection}`, { cache: 'no-store' }).then(handle);
}

export function createContent(collection, data) {
  return fetch(`/api/content/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle);
}

export function updateContent(collection, id, data) {
  const qs = id ? `?id=${encodeURIComponent(id)}` : '';
  return fetch(`/api/content/${collection}${qs}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle);
}

export function deleteContent(collection, id) {
  return fetch(`/api/content/${collection}?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  }).then(handle);
}

export async function uploadImage(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/image', { method: 'POST', body: fd });
  return handle(res);
}
