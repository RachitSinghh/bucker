'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

// Slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const productsData = {
  features: [
    { id: 1, name: 'Products Name Here', image: '/img/product/product1.png' },
    { id: 2, name: 'Lorem, ipsum dolor.', image: '/img/product/product2.png' },
    { id: 3, name: 'Praesentium vero nesciu.', image: '/img/product/product3.png' },
    { id: 4, name: 'Sit amet consectetur elit.', image: '/img/product/product4.png' },
    { id: 5, name: 'Atque earum ullam non.', image: '/img/product/product3.png' },
    { id: 6, name: 'Modi excepturi ut ipsam.', image: '/img/product/product3.png' },
    { id: 7, name: 'Provident odio, are Unde.', image: '/img/product/product1.png' },
    { id: 8, name: 'Products Name Here', image: '/img/product/product1.png' },
  ],
  seller: [
    { id: 1, name: 'Atque earum ullam non.', image: '/img/product/product5.png' },
    { id: 2, name: 'Modi excepturi ut ipsam.', image: '/img/product/product6.png' },
    { id: 3, name: 'Provident odio, are Unde.', image: '/img/product/product7.png' },
    { id: 4, name: 'Products Name Here', image: '/img/product/product1.png' },
    { id: 5, name: 'Products Name Here', image: '/img/product/product1.png' },
    { id: 6, name: 'Lorem, ipsum dolor.', image: '/img/product/product2.png' },
    { id: 7, name: 'Praesentium vero nesciu.', image: '/img/product/product3.png' },
    { id: 8, name: 'Sit amet consectetur elit.', image: '/img/product/product4.png' },
  ],
  sales: [
    { id: 1, name: 'Praesentium vero nesciu.', image: '/img/product/product3.png' },
    { id: 2, name: 'Sit amet consectetur elit.', price: '$32.00', image: '/img/product/product4.png' },
    { id: 3, name: 'Atque earum ullam non.', image: '/img/product/product5.png' },
    { id: 4, name: 'Products Name Here', image: '/img/product/product1.png' },
    { id: 5, name: 'Lorem, ipsum dolor.', image: '/img/product/product2.png' },
    { id: 6, name: 'Modi excepturi ut ipsam.', image: '/img/product/product6.png' },
    { id: 7, name: 'Provident odio, are Unde.', image: '/img/product/product7.png' },
    { id: 8, name: 'Products Name Here', image: '/img/product/product1.png' },
  ]
};

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('features');

  // To mimic a grid, React-Slick is not used for this section in the template natively. 
  // Wait, ProductTabs section in HTML uses standard grid (`row` > `col-lg-3 col-md-4 col-sm-6`).
  // So it's just mapping the active tab's array and outputting columns!

  return (
    <div className="product_section mb-80 wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
      <div className="container">
        <div className="product_header">
          <div className="section_title text-center">
            <h2>New Products</h2>
          </div>
          <div className="product_tab_button">
            <ul className="nav justify-content-center" role="tablist" id="nav-tab">
              <li>
                <a className={activeTab === 'features' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('features'); }} href="#">Our Features</a>
              </li>
              <li>
                <a className={activeTab === 'seller' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('seller'); }} href="#">Best Sellers</a>
              </li>
              <li>
                <a className={activeTab === 'sales' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('sales'); }} href="#">New Items</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content product_container">
          <div className={`tab-pane fade ${activeTab === 'features' ? 'show active' : ''}`}>
            <div className="product_gallery">
              <div className="row">
                {productsData.features.map((product, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                    <article className="single_product">
                      <figure>
                        <div className="product_thumb">
                          <Link href="/product"><img src={product.image} alt={product.name} /></Link>
                        </div>
                        <figcaption className="product_content text-center">
                          <h4><Link href="/product">{product.name}</Link></h4>
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
          <div className={`tab-pane fade ${activeTab === 'seller' ? 'show active' : ''}`}>
            <div className="product_gallery">
              <div className="row">
                {productsData.seller.map((product, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                    <article className="single_product">
                      <figure>
                        <div className="product_thumb">
                          <Link href="/product"><img src={product.image} alt={product.name} /></Link>
                        </div>
                        <figcaption className="product_content text-center">
                          <h4><Link href="/product">{product.name}</Link></h4>
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
          <div className={`tab-pane fade ${activeTab === 'sales' ? 'show active' : ''}`}>
            <div className="product_gallery">
              <div className="row">
                {productsData.sales.map((product, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                    <article className="single_product">
                      <figure>
                        <div className="product_thumb">
                          <Link href="/product"><img src={product.image} alt={product.name} /></Link>
                        </div>
                        <figcaption className="product_content text-center">
                          <h4><Link href="/product">{product.name}</Link></h4>
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
