'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TABS = [
  { id: 'features', label: 'Our Features' },
  { id: 'seller', label: 'Best Sellers' },
  { id: 'sales', label: 'New Items' },
];

// Products grouped by home tab now come from the CMS (T-018) via props.
export default function ProductTabs({ productsData = {} }) {
  const [activeTab, setActiveTab] = useState('features');
  const items = productsData[activeTab] || [];

  return (
    <div className="product_section mb-80 wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
      <div className="container">
        <div className="product_header">
          <div className="section_title text-center">
            <h2>New Products</h2>
          </div>
          <div className="product_tab_button">
            <ul className="nav justify-content-center" role="tablist" id="nav-tab">
              {TABS.map((tab) => (
                <li key={tab.id}>
                  <a
                    className={activeTab === tab.id ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); setActiveTab(tab.id); }}
                    href="#"
                  >
                    {tab.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tab-content product_container">
          <div className="tab-pane fade show active">
            <div className="product_gallery">
              <div className="row">
                {items.map((product) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                    <article className="single_product">
                      <figure>
                        <div className="product_thumb">
                          <Link href={`/shop/${product.slug || product.id}`}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={268}
                              height={307}
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </Link>
                        </div>
                        <figcaption className="product_content text-center">
                          <h4><Link href={`/shop/${product.slug || product.id}`}>{product.name}</Link></h4>
                          {product.price && (
                            <div className="price_box">
                              <span className="current_price">{product.price}</span>
                            </div>
                          )}
                        </figcaption>
                      </figure>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
