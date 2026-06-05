// Shared API helpers (T-005..T-007, hardened in T-021).
//
// Consistent JSON envelope ({ ok, data | error }) and a small schema-based
// validator for content payloads so every route validates input the same way
// and never leaks internal error details.

import { NextResponse } from 'next/server';
import { FIELD_SPECS, BANNER_TYPES } from '@/app/lib/cms/schema';

/** Success response: { ok: true, data }. */
export function ok(data = null, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

/** Failure response: { ok: false, error } (+ optional field-level errors). */
export function fail(error, status = 400, fields = undefined) {
  const body = { ok: false, error };
  if (fields) body.fields = fields;
  return NextResponse.json(body, { status });
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

/** Trim a string field; non-strings pass through untouched. */
function clean(v) {
  return typeof v === 'string' ? v.trim() : v;
}

/**
 * Validate + whitelist a content payload against FIELD_SPECS.
 * @param {string} collection
 * @param {object} body
 * @param {{partial?:boolean}} [opts] partial=true skips required checks (PATCH).
 * @returns {{ valid: boolean, value?: object, errors?: Record<string,string> }}
 */
export function validateContent(collection, body, opts = {}) {
  const spec = FIELD_SPECS[collection];
  if (!spec) return { valid: false, errors: { _: `Unknown collection "${collection}"` } };
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, errors: { _: 'Body must be a JSON object' } };
  }

  const errors = {};
  const value = {};

  // Whitelist known fields only (strips unknown keys like injected ids).
  for (const key of spec.fields) {
    if (key in body && body[key] !== undefined) value[key] = clean(body[key]);
  }

  // Required-on-create checks.
  if (!opts.partial) {
    for (const key of spec.required) {
      if (!isNonEmptyString(value[key]) && value[key] == null) {
        errors[key] = `${key} is required`;
      }
    }
  }

  // Field-specific rules.
  if (collection === 'banners' && value.type && !BANNER_TYPES.includes(value.type)) {
    errors.type = `type must be one of ${BANNER_TYPES.join(', ')}`;
  }
  if (collection === 'banners' && 'active' in value) {
    value.active = value.active === true || value.active === 'true';
  }
  if ('order' in value && value.order != null) {
    const n = Number(value.order);
    if (Number.isNaN(n)) errors.order = 'order must be a number';
    else value.order = n;
  }
  if (collection === 'products' && 'tabs' in value && value.tabs != null && !Array.isArray(value.tabs)) {
    errors.tabs = 'tabs must be an array';
  }

  if (Object.keys(errors).length > 0) return { valid: false, errors };
  return { valid: true, value };
}
