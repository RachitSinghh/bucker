// One-off Firestore seed script (T-003).
//
// Ports the previously-hardcoded content arrays from the storefront components
// into Firestore so the live site looks identical after switching the data
// source. Uses deterministic document ids + set() so re-running is idempotent
// (upsert, no duplicates).
//
// Run with:   node --env-file=.env.local scripts/seed.mjs
//   (or just: node scripts/seed.mjs  — this script also loads .env.local itself)

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// --- minimal .env.local loader (so plain `node scripts/seed.mjs` works) -------
function loadEnv() {
  const envPath = resolve(projectRoot, '.env.local');
  if (!existsSync(envPath)) return;
  const raw = readFileSync(envPath, 'utf-8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    // strip surrounding quotes but keep inner content (incl. \n escapes)
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnv();

// --- admin init ---------------------------------------------------------------
function init() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '')
    .replace(/\\n/g, '\n')
    .replace(/^"|"$/g, '');

  if (!projectId || !clientEmail || !privateKey) {
    console.error(
      '\n[seed] Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, ' +
        'FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in .env.local.\n'
    );
    process.exit(1);
  }

  if (!getApps().length) {
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }
  return getFirestore();
}

// --- seed data (mirrors the original component arrays) -------------------------

// Unified product catalog (canonical 8 products from /shop, with prices).
// Each product is flagged for the home tabs + best-seller slider it appears in.
const products = [
  { id: 'p1', name: 'Atque earum ullam non.', image: '/img/product/product1.webp', price: '$35.00', tabs: ['features', 'seller', 'sales'], bestSeller: true },
  { id: 'p2', name: 'Lorem, ipsum dolor.', image: '/img/product/product2.webp', price: '$35.00', tabs: ['features', 'seller', 'sales'], bestSeller: true },
  { id: 'p3', name: 'Modi excepturi ut ipsam.', image: '/img/product/product3.webp', price: '$38.00', tabs: ['features', 'seller', 'sales'], bestSeller: true },
  { id: 'p4', name: 'Provident odio, are Unde.', image: '/img/product/product4.webp', price: '$28.00', tabs: ['features', 'seller', 'sales'], bestSeller: true },
  { id: 'p5', name: 'Sit amet consectetur elit.', image: '/img/product/product5.webp', price: '$35.00', tabs: ['features', 'seller', 'sales'], bestSeller: true },
  { id: 'p6', name: 'Praesentium vero nesciu.', image: '/img/product/product6.webp', price: '$42.00', tabs: ['features', 'seller', 'sales'], bestSeller: true },
  { id: 'p7', name: 'Atque earum ullam non.', image: '/img/product/product7.webp', price: '$38.00', tabs: ['features', 'seller', 'sales'], bestSeller: true },
  { id: 'p8', name: 'Provident odio, are Unde.', image: '/img/product/product8.webp', price: '$28.00', tabs: ['features', 'seller', 'sales'], bestSeller: true },
].map((p, i) => ({
  ...p,
  slug: p.id,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  order: i + 1,
}));

const blogTitles = [
  'Lorem ipsum dolor sit amet adi pisi cing elit.',
  'Lorem ipsum dolor sit, elit, dolores is.',
  'harum dolorum culpa quas are veniam',
  'There are many of Lorem Ipsum.',
  'Lorem ipsum doloril sit amet consepy.',
  'Lorem ipsum dolor sit amet consectetur.',
];
const blogs = blogTitles.map((title, i) => ({
  id: `b${i + 1}`,
  title,
  slug: `blog-post-${i + 1}`,
  category: 'Bakery',
  author: 'Admin',
  date: '22 Aug, 2025',
  image: `/img/blog/blog${i + 1}.webp`,
  metaImage: `/img/others/meta-img${(i % 3) + 1}.webp`,
  excerpt:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
  body:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  order: i + 1,
}));

const brands = [
  { img: 'brand1', hover: 'brand-hover1' },
  { img: 'brand2', hover: 'brand-hover2' },
  { img: 'brand3', hover: 'brand-hover3' },
  { img: 'brand4', hover: 'brand-hover4' },
  { img: 'brand5', hover: 'brand-hover5' },
  { img: 'brand1', hover: 'brand-hover1' },
].map((b, i) => ({
  id: `br${i + 1}`,
  image: `/img/others/${b.img}.webp`,
  hoverImage: `/img/others/${b.hover}.webp`,
  link: '#',
  order: i + 1,
}));

const banners = [
  {
    id: 'hero',
    type: 'hero',
    discount: '70%',
    discountLabel: 'Sale Off',
    title: 'Quality Products Bakery Items',
    subtext: '',
    ctaLabel: 'Shop Now',
    ctaLink: '/shop',
    image: '/img/bg/hero-banner-shape.webp',
    order: 1,
  },
  {
    id: 'promo1',
    type: 'promo',
    discount: '70%',
    discountLabel: 'Sale Off',
    title: 'Best Quality \n Products',
    subtext: '',
    ctaLabel: 'Shop Now',
    ctaLink: '/shop',
    image: '/img/bg/banner1.webp',
    order: 1,
  },
  {
    id: 'promo2',
    type: 'promo',
    discount: '25%',
    discountLabel: 'Sale Off',
    title: 'Hot & Spicy \n Pastry',
    subtext: '',
    ctaLabel: 'Shop Now',
    ctaLink: '/shop',
    image: '/img/bg/banner2.webp',
    order: 2,
  },
  {
    id: 'fullwidth',
    type: 'fullwidth',
    discount: '45%',
    discountLabel: 'Sale Off',
    title: 'Best Quality Bakery Products',
    subtext:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    ctaLabel: 'Shop Now',
    ctaLink: '/shop',
    image: '/img/bg/banner-fullwidth1.webp',
    order: 1,
  },
];

const services = [
  { id: 's1', title: 'Pastry', image: '/img/others/services1.webp', width: 162, height: 148, cssClass: 'one' },
  { id: 's2', title: 'Breakfast', image: '/img/others/services2.webp', width: 245, height: 162, cssClass: 'two' },
  { id: 's3', title: 'Cofee Cake', image: '/img/others/services3.webp', width: 140, height: 144, cssClass: 'three' },
  { id: 's4', title: 'Bake Tost', image: '/img/others/services4.webp', width: 198, height: 130, cssClass: 'four' },
].map((s, i) => ({
  ...s,
  text: 'Lorem ipsum dolor sit ametgtol consecr adipiscing elit.',
  order: i + 1,
}));

const settings = {
  shipping: [
    { image: '/img/others/shipping1.webp', title: 'Free Shipping', text: 'Capped at $39 per order' },
    { image: '/img/others/shipping2.webp', title: 'Card Payments', text: '12 Months Installments' },
    { image: '/img/others/shipping3.webp', title: 'Easy Returns', text: 'Shop Wwith Confidence' },
  ],
  contactEmail: 'demo@example.com',
  address: 'Your address goes here. 123, Address.',
  phones: ['+ 0 123 456 789', '+ 0 123 456 789'],
  infoLinks: [
    { label: 'About us', href: '/about' },
    { label: 'Delivery information', href: '/contact' },
    { label: 'Privacy Policy', href: '/contact' },
    { label: 'Sales', href: '/contact' },
    { label: 'Terms & Conditions', href: '/contact' },
    { label: 'Shipping Policy', href: '/contact' },
    { label: 'EMI Payment', href: '/contact' },
  ],
  accountLinks: [
    { label: 'My account', href: '/contact' },
    { label: 'My orders', href: '/contact' },
    { label: 'Returns', href: '/contact' },
    { label: 'Shipping', href: '/contact' },
    { label: 'Wishlist', href: '/contact' },
    { label: 'How Does It Work', href: '/about' },
    { label: 'Merchant Sign Up', href: '/contact' },
  ],
  newsletterText: 'If you have any question.please contact us',
  copyright: '© 2025 JD Milk Made with love by Foods Sweet',
  contactHeading: 'We Are Here For Help You! Please Contact Us.',
  stores: [
    { title: 'Store In New York', address: 'Your address goes here.', phone: '0123456789', email: 'demo@example.com', website: 'www.example.com' },
    { title: 'Store In New York', address: 'Your address goes here.', phone: '0123456789', email: 'demo@example.com', website: 'www.example.com' },
  ],
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13004082.928417291!2d-104.65713107818928!3d37.275578278180674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1606327234905!5m2!1sen!2sbd',
};

// --- write --------------------------------------------------------------------
async function seedCollection(db, name, docs) {
  const batch = db.batch();
  for (const { id, ...data } of docs) {
    const ref = db.collection(name).doc(id);
    batch.set(ref, { ...data, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  }
  await batch.commit();
  console.log(`[seed] ${name}: ${docs.length} docs`);
}

async function main() {
  const db = init();
  await seedCollection(db, 'products', products);
  await seedCollection(db, 'blogs', blogs);
  await seedCollection(db, 'brands', brands);
  await seedCollection(db, 'banners', banners);
  await seedCollection(db, 'services', services);
  await db
    .collection('settings')
    .doc('global')
    .set({ ...settings, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  console.log('[seed] settings/global: 1 doc');
  console.log('\n[seed] Done. ✅');
  process.exit(0);
}

main().catch((err) => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});
