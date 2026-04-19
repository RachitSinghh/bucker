'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import Breadcrumbs from '../../components/Breadcrumbs';

// Slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetailPage({ params }) {
  const [activeTab, setActiveTab] = useState('description');
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const mainSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const thumbSliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    vertical: true,
  };

  return (
    <main>
      <Breadcrumbs title="Product Detail" parentTitle="Shop" parentHref="/shop" />

      <div className="single_product_section mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="single_product_gallery">
                <div className="product_gallery_inner d-flex">
                  <div className="product_gallery_main_img">
                    <Slider 
                      {...mainSliderSettings} 
                      asNavFor={nav2} 
                      ref={(slider1) => setNav1(slider1)}
                    >
                      {[1, 2, 5, 7, 8].map((num) => (
                        <div className="gallery_img_list" key={num}>
                          <img src={`/img/product/product${num}.png`} alt={`Product ${num}`} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="product_gallery_btn_img" style={{ width: '100px' }}>
                    <Slider 
                      {...thumbSliderSettings} 
                      asNavFor={nav1} 
                      ref={(slider2) => setNav2(slider2)}
                    >
                       {[1, 2, 5, 7, 8].map((num) => (
                        <div className="gallery_btn_img_list" key={num} style={{ cursor: 'pointer', padding: '5px' }}>
                          <img src={`/img/product/product${num}.png`} alt={`Thumb ${num}`} className="border" />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 col-md-6">
              <div className="product_details_sidebar">
                <h2 className="product__title">Products Name Here</h2>
                <div className="price_box mb-3">
                  <span className="current_price text-danger h3">Rs.70.00</span>
                </div>
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
                <p className="product_details_desc mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmoddll tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veni quis nostrud exercit ullamco laboris nisi ut aliquip.
                </p>
                <div className="product_pro_button quantity d-flex align-items-center mb-4">
                  <div className="pro-qty border d-flex align-items-center p-2 me-3">
                    <input type="number" defaultValue="1" className="border-0 text-center" style={{ width: '40px' }} />
                  </div>
                  <button className="btn btn-danger rounded-0 me-3">add to cart</button>
                  <button className="btn btn-outline-secondary rounded-0"><i className="pe-7s-like"></i></button>
                </div>
                <div className="product_paypal">
                  <img src="/img/others/paypal.png" alt="payments" />
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
                  <li className="nav-item">
                    <button 
                      className={`nav-link border-0 bg-transparent ${activeTab === 'description' ? 'active text-danger border-bottom border-danger' : 'text-muted'}`}
                      onClick={() => setActiveTab('description')}
                    >
                      Description
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link border-0 bg-transparent ${activeTab === 'info' ? 'active text-danger border-bottom border-danger' : 'text-muted'}`}
                      onClick={() => setActiveTab('info')}
                    >
                      Information
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link border-0 bg-transparent ${activeTab === 'reviews' ? 'active text-danger border-bottom border-danger' : 'text-muted'}`}
                      onClick={() => setActiveTab('reviews')}
                    >
                      Reviews 03
                    </button>
                  </li>
                </ul>
              </div>
              
              <div className="product_page_content_inner tab-content p-3 border">
                {activeTab === 'description' && (
                  <div className="tab-pane fade show active">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
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
    </main>
  );
}
