'use client';

// Services editor (T-015). Icon image + title + blurb, ordered.

import CrudEditor from '../components/CrudEditor';

const FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'text', label: 'Text', type: 'textarea' },
  { name: 'image', label: 'Icon image', type: 'image' },
  { name: 'width', label: 'Image width', type: 'number', help: 'Intrinsic px width (preserves layout)' },
  { name: 'height', label: 'Image height', type: 'number' },
  { name: 'cssClass', label: 'Layout class', type: 'text', help: 'one | two | three | four' },
  { name: 'order', label: 'Order', type: 'number' },
];

export default function ServicesPage() {
  return (
    <CrudEditor
      collection="services"
      title="Services"
      singular="Service"
      fields={FIELDS}
      description="Service / feature blurbs shown in the home Services strip."
    />
  );
}
