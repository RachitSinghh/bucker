// Shop listing (T-020). Server Component reading the CMS product catalog.

import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ShopSidebar from '../components/ShopSidebar';
import ShopGrid from './ShopGrid';
import { getProducts } from '../lib/cms/content';

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main>
      <Breadcrumbs title="Shop" />

      <div className="product_page_section mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ShopSidebar />
            </div>
            <div className="col-lg-9">
              <ShopGrid products={products} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
