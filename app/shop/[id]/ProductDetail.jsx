'use client';

// Product detail interactive UI (T-020): description/info/reviews tabs. The
// product is supplied by the server page.

import React, { useState } from 'react';
import Image from 'next/image';

export default function ProductDetail({ product }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <>
      <div className="single_product_section mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="single_product_gallery">
                <div className="product_gallery_main_img">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={570}
                      height={650}
                      style={{ width: '100%', height: 'auto' }}
                      priority
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="product_details_sidebar">
                <h2 className="product__title">{product.name}</h2>
                {product.price && (
                  <div className="price_box mb-3">
                    <span className="current_price text-danger h3">{product.price}</span>
                  </div>
                )}
                <div className="quickview__info mb-3">
                  <p className="product_review d-flex align-items-center">
                    <span className="review_icon d-flex text-warning">
                      <i className="ion-ios-star"></i>
                      <i className="ion-ios-star"></i>
                      <i className="ion-ios-star"></i>
                      <i className="ion-ios-star"></i>
                      <i className="ion-ios-star"></i>
                    </span>
                    <span className="review__text ms-2"> (5 reviews)</span>
                  </p>
                </div>
                <p className="product_details_desc mb-4">{product.description}</p>
                <div className="product_pro_button quantity d-flex align-items-center mb-4">
                  <div className="pro-qty border d-flex align-items-center p-2 me-3">
                    <input type="number" defaultValue="1" className="border-0 text-center" style={{ width: '40px' }} />
                  </div>
                  <button className="btn btn-danger rounded-0 me-3">add to cart</button>
                  <button className="btn btn-outline-secondary rounded-0"><i className="pe-7s-like"></i></button>
                </div>
                <div className="product_paypal">
                  <Image src="/img/others/paypal.webp" alt="payments" width={192} height={21} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product_tab_section mb-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="product_tab_navigation border-bottom mb-4">
                <ul className="nav justify-content-center">
                  {['description', 'info', 'reviews'].map((tab) => (
                    <li className="nav-item" key={tab}>
                      <button
                        className={`nav-link border-0 bg-transparent text-capitalize ${activeTab === tab ? 'active text-danger border-bottom border-danger' : 'text-muted'}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab === 'info' ? 'Information' : tab === 'reviews' ? 'Reviews' : 'Description'}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="product_page_content_inner tab-content p-3 border">
                {activeTab === 'description' && (
                  <div className="tab-pane fade show active">
                    <p>{product.description || 'No description available.'}</p>
                  </div>
                )}
                {activeTab === 'info' && (
                  <div className="tab-pane fade show active">
                    <table className="table">
                      <tbody>
                        <tr><td>Weight</td><td>1kg</td></tr>
                        <tr><td>Dimensions</td><td>10 x 10 x 5 cm</td></tr>
                        <tr><td>Materials</td><td>Natural</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="tab-pane fade show active">
                    <div className="product_review_form">
                      <h3>Add a review</h3>
                      <form action="#" onSubmit={(e) => e.preventDefault()} className="mt-3">
                        <div className="mb-3">
                          <label className="form-label">Your Review</label>
                          <textarea className="form-control rounded-0" rows="4"></textarea>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control rounded-0" />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control rounded-0" />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-danger rounded-0">Submit</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
