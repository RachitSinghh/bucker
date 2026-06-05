// Contact form route (T-006).
//
// POST { name, email, subject?, message, company? }
//   - validates input server-side (400 on failure)
//   - honeypot field `company` must be empty (filled => silently dropped)
//   - per-IP rate limited (429 when exceeded)
//   - sends email via Nodemailer to CONTACT_RECEIVER_EMAIL
//   - logs a `submissions` document for the dashboard inbox
//
// SMTP credentials never reach the client; errors return safe messages.

import { getAdminDb, isAdminConfigured } from '@/app/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { getTransport, isMailerConfigured } from '@/app/lib/mailer';
import { rateLimit, clientIp } from '@/app/lib/ratelimit';
import { ok, fail, isNonEmptyString, EMAIL_RE } from '@/app/lib/api';

export async function POST(request) {
  // Rate limit first (cheap, before any work).
  const ip = clientIp(request);
  const { allowed } = rateLimit(`form:${ip}`, 5, 60_000);
  if (!allowed) {
    return fail('Too many requests. Please try again in a minute.', 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (isNonEmptyString(body?.company)) {
    return ok({ received: true });
  }

  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const subject = typeof body?.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  const fields = {};
  if (!isNonEmptyString(name)) fields.name = 'Name is required';
  if (!EMAIL_RE.test(email)) fields.email = 'A valid email is required';
  if (!isNonEmptyString(message)) fields.message = 'Message is required';
  if (Object.keys(fields).length) return fail('Please correct the errors below.', 400, fields);

  // Persist the submission (best-effort; do not block email on it).
  if (isAdminConfigured()) {
    try {
      await getAdminDb()
        .collection('submissions')
        .add({
          name,
          email,
          subject: subject || null,
          message,
          read: false,
          ip,
          createdAt: FieldValue.serverTimestamp(),
        });
    } catch (err) {
      console.error('[api/form] failed to log submission:', err?.message || err);
    }
  }

  // Send the email.
  if (!isMailerConfigured()) {
    // Without SMTP configured we still stored the submission; report failure
    // so the operator notices, but never leak config details.
    return fail('Email service is not configured. Your message was logged.', 500);
  }

  try {
    const to = process.env.CONTACT_RECEIVER_EMAIL;
    const from = process.env.MAIL_FROM || process.env.SMTP_USER;
    await getTransport().sendMail({
      from,
      to,
      replyTo: email,
      subject: subject ? `[Bucker] ${subject}` : `[Bucker] New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '(none)'}\n\n${message}`,
      html: `
        <h2>New contact submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || '(none)')}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    });
    return ok({ received: true });
  } catch (err) {
    console.error('[api/form] mail send failed:', err?.message || err);
    return fail('Could not send your message right now. Please try again later.', 500);
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
