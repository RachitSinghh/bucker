'use client';

// Products editor (T-013). Manages the catalog and assigns products to the home
// tabs (features / seller / sales) and the Best Sellers slider.

import CrudEditor from '../components/CrudEditor';

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'image', label: 'Image', type: 'image', required: true },
  { name: 'price', label: 'Price', type: 'text', help: 'e.g. $35.00 (optional)' },
  { name: 'slug', label: 'Slug', type: 'text', autoSlugFrom: 'name', help: 'Auto-generated from name if blank' },
  { name: 'description', label: 'Description', type: 'textarea' },
  {
    name: 'tabs',
    label: 'Home tabs',
    type: 'multiselect',
    options: [
      { value: 'features', label: 'Our Features' },
      { value: 'seller', label: 'Best Sellers (tab)' },
      { value: 'sales', label: 'New Items' },
    ],
  },
  { name: 'bestSeller', label: 'Show in Best Sellers slider', type: 'checkbox' },
  { name: 'order', label: 'Order', type: 'number' },
];

export default function ProductsPage() {
  return (
    <CrudEditor
      collection="products"
      title="Products"
      singular="Product"
      fields={FIELDS}
      description="Catalog feeding the home tabs, Best Sellers, and the shop pages."
    />
  );
}
