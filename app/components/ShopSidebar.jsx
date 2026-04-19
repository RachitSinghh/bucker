'use client';

import React from 'react';
import Link from 'next/link';

const shopCategories = [
  'Milk Foods',
  'Sweets',
  'Bakery Items',
  'Dairy Products',
  'Frozen Items',
  'Snacks',
];

const shopTags = ['Organic', 'Fresh', 'Sweet', 'Dairy', 'Pure', 'Healthy'];

export default function ShopSidebar() {
  return (
    <div className="shop_sidebar">
      <div className="shop_widget_list mb-50">
        <h3>Search Products</h3>
        <div className="widget_search">
          <form action="#" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Search products..." type="text" />
            <button type="submit"><i className="ion-ios-search"></i></button>
          </form>
        </div>
      </div>

      <div className="shop_widget_list mb-50">
        <h3>Categories</h3>
        <div className="widget_category">
          <ul>
            {shopCategories.map((cat, index) => (
              <li key={index}>
                <Link href="/shop">
                  {cat} <i className="icofont-curved-double-right"></i>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shop_widget_list mb-50">
        <h3>Filter by Price</h3>
        <div className="price_filter">
          <input type="range" className="w-100 mb-2" min="10" max="1000" />
          <div className="price_slider_amount d-flex justify-content-between align-items-center">
            <span>Price: $10 - $1000</span>
            <button type="button" className="btn btn-danger btn-sm rounded-0">Filter</button>
          </div>
        </div>
      </div>

      <div className="shop_widget_list tags">
        <h3>Popular Tags</h3>
        <div className="widget_tags">
          <ul>
            {shopTags.map((tag, index) => (
              <li key={index}><Link href="/shop">{tag}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
