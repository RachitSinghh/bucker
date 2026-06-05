'use client';

// Shop product grid/list with the view toggle (T-020). Products are passed in
// from the server page; only the grid/list interaction stays on the client.

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ShopGrid({ products = [] }) {
  const [view, setView] = useState('grid');

  return (
    <div className="product_page_wrapper">
      <div className="product_sidebar_header mb-60 d-flex justify-content-between align-items-center">
        <div className="page__amount border">
          <p><span>{products.length}</span> Product Found</p>
        </div>
        <div className="product_header_right d-flex align-items-center">
          <div className="sorting__by d-flex align-items-center">
            <span>Sort By : </span>
            <form className="select_option" action="#" onSubmit={(e) => e.preventDefault()}>
              <select name="orderby" id="short" className="form-select rounded-0 border">
                <option value="1">Default</option>
                <option value="2">Sort by popularity</option>
                <option value="3">Sort by newness</option>
                <option value="4">Price: low to high</option>
                <option value="5">Price: high to low</option>
              </select>
            </form>
          </div>
          <div className="product__toolbar__btn ms-4">
            <ul className="nav" role="tablist">
              <li className="nav-item">
                <button
                  className={`nav-link border-0 bg-transparent ${view === 'grid' ? 'active text-danger' : 'text-muted'}`}
                  onClick={() => setView('grid')}
                >
                  <i className="ion-grid"></i>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link border-0 bg-transparent ${view === 'list' ? 'active text-danger' : 'text-muted'}`}
                  onClick={() => setView('list')}
                >
                  <i className="ion-ios-list"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="product_page_gallery">
        {products.length === 0 ? (
          <p className="text-muted">No products available.</p>
        ) : view === 'grid' ? (
          <div className="row grid__product">
            {products.map((product) => (
              <div className="col-xl-4 col-md-6 col-sm-6" key={product.id}>
                <article className="single_product wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
                  <figure>
                    <div className="product_thumb">
                      <Link href={`/shop/${product.slug || product.id}`}>
                        <Image src={product.image} alt={product.name} width={268} height={307} style={{ width: '100%', height: 'auto' }} />
                      </Link>
                    </div>
                    <figcaption className="product_content text-center">
                      <h4><Link href={`/shop/${product.slug || product.id}`}>{product.name}</Link></h4>
                      {product.price && (
                        <div className="price_box mt-2">
                          <span className="current_price text-danger fw-bold">{product.price}</span>
                        </div>
                      )}
                    </figcaption>
                  </figure>
                </article>
              </div>
            ))}
          </div>
        ) : (
          <div className="shop_list_product">
            {products.map((product) => (
              <article className="product_list_items border-bottom mb-4 pb-4" key={product.id}>
                <figure className="product_list_flex d-flex align-items-center">
                  <div className="product_thumb" style={{ maxWidth: '200px' }}>
                    <Link href={`/shop/${product.slug || product.id}`}>
                      <Image src={product.image} alt={product.name} width={268} height={307} style={{ width: '100%', height: 'auto' }} />
                    </Link>
                  </div>
                  <figcaption className="product_list_content ms-4">
                    <h4><Link href={`/shop/${product.slug || product.id}`}>{product.name}</Link></h4>
                    <div className="product__ratting mb-2">
                      <ul className="d-flex text-warning" style={{ listStyle: 'none', padding: 0 }}>
                        <li><i className="ion-ios-star"></i></li>
                        <li><i className="ion-ios-star"></i></li>
                        <li><i className="ion-ios-star"></i></li>
                        <li><i className="ion-ios-star"></i></li>
                        <li><i className="ion-android-star-outline"></i></li>
                      </ul>
                    </div>
                    {product.price && (
                      <div className="price_box mb-3">
                        <span className="current_price text-danger fw-bold">{product.price}</span>
                      </div>
                    )}
                    <div className="product__desc mb-3">
                      <p>{product.description || ''}</p>
                    </div>
                    <div className="action_links">
                      <Link href={`/shop/${product.slug || product.id}`} className="btn btn-outline-danger rounded-0 btn-sm">View Details</Link>
                    </div>
                  </figcaption>
                </figure>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
