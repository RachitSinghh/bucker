'use client';

// Brands editor (T-015). Logo + hover logo + link, ordered.

import CrudEditor from '../components/CrudEditor';

const FIELDS = [
  { name: 'image', label: 'Logo', type: 'image', required: true },
  { name: 'hoverImage', label: 'Hover logo', type: 'image' },
  { name: 'link', label: 'Link', type: 'text', help: 'e.g. https://brand.example.com' },
  { name: 'order', label: 'Order', type: 'number' },
];

export default function BrandsPage() {
  return (
    <CrudEditor
      collection="brands"
      title="Brands"
      singular="Brand"
      fields={FIELDS}
      description="Logos shown in the Brands carousel on the home page."
    />
  );
}
