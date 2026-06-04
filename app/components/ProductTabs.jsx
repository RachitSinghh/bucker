'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const productsData = {
  features: [
    { id: 1, name: 'Products Name Here', image: '/img/product/product1.webp' },
    { id: 2, name: 'Lorem, ipsum dolor.', image: '/img/product/product2.webp' },
    { id: 3, name: 'Praesentium vero nesciu.', image: '/img/product/product3.webp' },
    { id: 4, name: 'Sit amet consectetur elit.', image: '/img/product/product4.webp' },
    { id: 5, name: 'Atque earum ullam non.', image: '/img/product/product3.webp' },
    { id: 6, name: 'Modi excepturi ut ipsam.', image: '/img/product/product3.webp' },
    { id: 7, name: 'Provident odio, are Unde.', image: '/img/product/product1.webp' },
    { id: 8, name: 'Products Name Here', image: '/img/product/product1.webp' },
  ],
  seller: [
    { id: 1, name: 'Atque earum ullam non.', image: '/img/product/product5.webp' },
    { id: 2, name: 'Modi excepturi ut ipsam.', image: '/img/product/product6.webp' },
    { id: 3, name: 'Provident odio, are Unde.', image: '/img/product/product7.webp' },
    { id: 4, name: 'Products Name Here', image: '/img/product/product1.webp' },
    { id: 5, name: 'Products Name Here', image: '/img/product/product1.webp' },
    { id: 6, name: 'Lorem, ipsum dolor.', image: '/img/product/product2.webp' },
    { id: 7, name: 'Praesentium vero nesciu.', image: '/img/product/product3.webp' },
    { id: 8, name: 'Sit amet consectetur elit.', image: '/img/product/product4.webp' },
  ],
  sales: [
    { id: 1, name: 'Praesentium vero nesciu.', image: '/img/product/product3.webp' },
    { id: 2, name: 'Sit amet consectetur elit.', price: '$32.00', image: '/img/product/product4.webp' },
    { id: 3, name: 'Atque earum ullam non.', image: '/img/product/product5.webp' },
    { id: 4, name: 'Products Name Here', image: '/img/product/product1.webp' },
    { id: 5, name: 'Lorem, ipsum dolor.', image: '/img/product/product2.webp' },
    { id: 6, name: 'Modi excepturi ut ipsam.', image: '/img/product/product6.webp' },
    { id: 7, name: 'Provident odio, are Unde.', image: '/img/product/product7.webp' },
    { id: 8, name: 'Products Name Here', image: '/img/product/product1.webp' },
  ]
};

const TABS = [
  { id: 'features', label: 'Our Features' },
  { id: 'seller', label: 'Best Sellers' },
  { id: 'sales', label: 'New Items' },
];

export default function ProductTabs() {
  // This section is a plain Bootstrap grid in the template — no carousel.
  const [activeTab, setActiveTab] = useState('features');

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
                {productsData[activeTab].map((product) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                    <article className="single_product">
                      <figure>
                        <div className="product_thumb">
                          <Link href={`/shop/${product.id}`}>
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
                          <h4><Link href={`/shop/${product.id}`}>{product.name}</Link></h4>
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
