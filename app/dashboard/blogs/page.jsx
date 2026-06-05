'use client';

// Blog editor (T-014). Slugs are auto-generated from the title with a
// uniqueness check (handled in CrudEditor).

import CrudEditor from '../components/CrudEditor';

const FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'slug', label: 'Slug', type: 'text', autoSlugFrom: 'title', help: 'Auto-generated & made unique if blank' },
  { name: 'category', label: 'Category', type: 'text' },
  { name: 'author', label: 'Author', type: 'text' },
  { name: 'date', label: 'Date', type: 'text', help: 'e.g. 22 Aug, 2025' },
  { name: 'image', label: 'Cover image', type: 'image' },
  { name: 'metaImage', label: 'Author avatar', type: 'image' },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { name: 'body', label: 'Body', type: 'textarea', help: 'Plain text; blank lines start new paragraphs.' },
  { name: 'order', label: 'Order', type: 'number' },
];

export default function BlogsPage() {
  return (
    <CrudEditor
      collection="blogs"
      title="Blog Posts"
      singular="Post"
      fields={FIELDS}
      description="Posts feeding the Latest Blog section and the /blog pages."
    />
  );
}
