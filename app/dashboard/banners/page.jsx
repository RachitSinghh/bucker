'use client';

// Banners editor (T-012): Hero / Promo / Full-width banners.

import CrudEditor from '../components/CrudEditor';
import { updateContent } from '@/app/lib/cms/client';

// "Hero" and "Full-width" are single-slot placements: only one shows on the
// storefront. The button lets an editor pick which one is live; promo banners
// all render, so they don't get the button.
const SINGLE_SLOT = ['hero', 'fullwidth'];

// Mark this banner active for its type and clear the flag on its siblings.
async function useThisBanner(item, items) {
  const siblings = items.filter(
    (b) => b.type === item.type && b.id !== item.id && b.active
  );
  await Promise.all([
    updateContent('banners', item.id, { active: true }),
    ...siblings.map((b) => updateContent('banners', b.id, { active: false })),
  ]);
}

const FIELDS = [
  {
    name: 'type',
    label: 'Type',
    type: 'select',
    required: true,
    options: [
      { value: 'hero', label: 'Hero' },
      { value: 'promo', label: 'Promo' },
      { value: 'fullwidth', label: 'Full-width' },
    ],
  },
  { name: 'discount', label: 'Discount badge', type: 'text', help: 'e.g. 70%' },
  { name: 'discountLabel', label: 'Discount label', type: 'text', help: 'e.g. Sale Off' },
  { name: 'title', label: 'Headline', type: 'text', required: true, help: 'Use \\n for a line break' },
  { name: 'subtext', label: 'Subtext', type: 'textarea' },
  { name: 'ctaLabel', label: 'CTA label', type: 'text' },
  { name: 'ctaLink', label: 'CTA link', type: 'text' },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'order', label: 'Order', type: 'number' },
];

export default function BannersPage() {
  return (
    <CrudEditor
      collection="banners"
      title="Banners"
      singular="Banner"
      fields={FIELDS}
      description="Hero, promo and full-width banners shown across the storefront."
      activation={{
        applies: (item) => SINGLE_SLOT.includes(item.type),
        isActive: (item) => !!item.active,
        actionLabel: 'Use this banner',
        activeLabel: 'In use',
        notice: (item) => `“${item.title}” is now the live ${item.type} banner.`,
        run: useThisBanner,
      }}
    />
  );
}
