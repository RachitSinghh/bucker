'use client';

// Contact form (T-019). Posts to /api/form with success/error UI, a disabled
// button + spinner while submitting, and a hidden honeypot field (`company`).

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');

  async function onSubmit(values) {
    setStatus('submitting');
    setServerError('');
    try {
      const res = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.con_name,
          email: values.con_email,
          subject: values.con_subject,
          message: values.con_message,
          company: values.company, // honeypot
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const fieldMsg = data.fields ? Object.values(data.fields).join(', ') : '';
        throw new Error(fieldMsg || data.error || 'Something went wrong.');
      }
      setStatus('success');
      reset();
    } catch (err) {
      setServerError(err.message || 'Could not send your message.');
      setStatus('error');
    }
  }

  const submitting = status === 'submitting';

  return (
    <div
      className="contact_form"
      style={{ backgroundImage: 'url(/img/others/contact-form-bg-shape.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    >
      <h2>Send A Quest</h2>

      {status === 'success' && (
        <div className="alert alert-success py-2">Thanks! Your message has been sent.</div>
      )}
      {status === 'error' && serverError && (
        <div className="alert alert-danger py-2">{serverError}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Honeypot — hidden from real users; bots that fill it are dropped. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('company')}
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
          aria-hidden="true"
        />
        <div className="form_input">
          <input {...register('con_name', { required: 'Name is required' })} placeholder="Name*" type="text" />
          {errors.con_name && <span className="text-danger small">{errors.con_name.message}</span>}
        </div>
        <div className="form_input">
          <input
            {...register('con_email', {
              required: 'Email is required',
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'invalid email address' },
            })}
            placeholder="E-Mail*"
            type="text"
          />
          {errors.con_email && <span className="text-danger small">{errors.con_email.message}</span>}
        </div>
        <div className="form_input">
          <input {...register('con_subject')} placeholder="Subject" type="text" />
        </div>
        <div className="form_textarea">
          <textarea {...register('con_message', { required: 'Message is required' })} placeholder="Message Here"></textarea>
          {errors.con_message && <span className="text-danger small">{errors.con_message.message}</span>}
        </div>
        <div className="form_input_btn">
          <button type="submit" className="btn btn-link" disabled={submitting}>
            {submitting ? 'Sending…' : 'send message'}
          </button>
        </div>
      </form>
    </div>
  );
}
