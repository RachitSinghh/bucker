// Product detail page (T-020). Server Component: looks up the product by the
// route param (id or slug) and 404s when missing. `params` is awaited per
// Next.js 16 conventions.

import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import ProductDetail from './ProductDetail';
import { getProductById } from '../../lib/cms/content';

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <main>
      <Breadcrumbs title="Product Detail" parentTitle="Shop" parentHref="/shop" />
      <ProductDetail product={product} />
    </main>
  );
}
