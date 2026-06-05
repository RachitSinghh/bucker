# Bucker CMS

A Next.js 16 (App Router, JavaScript) e-commerce storefront with a built-in,
real-time CMS. Non-technical staff edit products, blogs, banners, brands,
services and global settings from a protected `/dashboard`, and changes appear
on the public storefront without a redeploy.

- **Framework:** Next.js 16 (App Router, React 19)
- **Content store:** Firebase Firestore (read server-side via the Admin SDK,
  cached with `unstable_cache` + tag revalidation)
- **Auth:** Firebase Authentication (email/password) → httpOnly session cookie
- **Images:** Cloudinary (signed server-side uploads)
- **Email:** Nodemailer (contact form)

See `PROJECT_OVERVIEW.md` for architecture and `Task.md` for the ticket history.

---

## 1. Prerequisites

- Node.js 20+ (tested on 22)
- A Firebase project (Firestore + Authentication enabled)
- A Cloudinary account
- SMTP credentials for outgoing email (e.g. Gmail App Password, SendGrid,
  Mailgun, Resend SMTP)

## 2. Setup (clone → running CMS)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
#    then fill in every value (see the comments in .env.example)
```

### Where each credential comes from

| Group | Variables | Source |
|-------|-----------|--------|
| Firebase client | `NEXT_PUBLIC_FIREBASE_*` | Firebase Console → Project settings → General → Your apps (Web app) |
| Firebase admin | `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Firebase Console → Project settings → Service accounts → **Generate new private key**. Paste the private key on one line keeping the literal `\n` escapes inside the quotes. |
| Cloudinary | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_UPLOAD_FOLDER` | Cloudinary Dashboard → Account Details |
| SMTP | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM`, `CONTACT_RECEIVER_EMAIL` | Your email provider |
| Security | `ADMIN_EMAILS` | Comma-separated allowlist of emails permitted into the dashboard (leave blank to allow any signed-up user) |

> `.env.local` is git-ignored. **Never commit real secrets.** The Admin private
> key, Cloudinary secret and SMTP password are server-only (no `NEXT_PUBLIC_`
> prefix) and never reach the browser bundle.

## 3. Seed the content

Port the original placeholder content into Firestore so the storefront looks
identical to the static template:

```bash
node --env-file=.env.local scripts/seed.mjs
# (the script also loads .env.local on its own, so plain `node scripts/seed.mjs` works too)
```

The seed is **idempotent** — it uses deterministic document ids, so re-running
it upserts rather than duplicating.

## 4. Deploy the Firestore security rules

Rules live in `firestore.rules` (content is world-readable, submissions are
private, all writes go through the server Admin SDK):

```bash
firebase deploy --only firestore:rules
```

## 5. Create the first admin account

1. Add the admin email to `ADMIN_EMAILS` in `.env.local`.
2. Start the app and visit **`/signup`**, register with that email + a password.
3. (Optional) Disable `/signup` afterward, or rely on the `ADMIN_EMAILS`
   allowlist — non-allowlisted emails are rejected when the session cookie is
   minted, even if they create a Firebase user.

## 6. Run

```bash
npm run dev      # http://localhost:3000  (storefront)  •  /dashboard (admin)
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

---

## How real-time updates work

1. The storefront reads content through `app/lib/cms/content.js`, which wraps
   each Firestore read in `unstable_cache` tagged `content:<collection>`.
2. A dashboard edit calls `/api/content/<collection>`, which writes via the
   Admin SDK and then calls `revalidateContent(scope)` — invalidating the cache
   tag and the affected storefront paths.
3. The next storefront request renders fresh content; no redeploy needed.
4. Inside the dashboard, list views also subscribe with Firestore `onSnapshot`
   so concurrent edits appear live.

## Deploying to Vercel

1. Push the repo and import it in Vercel.
2. Add **every** variable from `.env.example` under
   **Project → Settings → Environment Variables** (Production + Preview).
   - Paste `FIREBASE_PRIVATE_KEY` exactly as in `.env.local` (with `\n` escapes).
3. Deploy. To sync env vars locally afterward: `vercel env pull .env.local`.
4. Run the seed + rules deploy once against the production Firebase project.

### API surface

| Route | Methods | Auth | Purpose |
|-------|---------|------|---------|
| `/api/auth/session` | POST, DELETE | token / cookie | Mint / clear the session cookie |
| `/api/content/[collection]` | GET, POST, PATCH, DELETE | writes require auth | CMS CRUD + revalidation |
| `/api/image` | POST, DELETE | required | Cloudinary upload / delete |
| `/api/form` | POST | public (rate-limited) | Contact form → email + submission log |
| `/api/submissions` | GET, PATCH, DELETE | required | Dashboard inbox |
