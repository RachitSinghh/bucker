import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer_widgets">
      <div className="container">
        <div className="shipping_area">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="single_shipping d-flex align-items-center">
                <div className="shipping_icon">
                  <Image src="/img/others/shipping1.webp" alt="Shipping" width={70} height={70} />
                </div>
                <div className="shipping_text">
                  <h3>Free Shipping</h3>
                  <p>Capped at $39 per order</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="single_shipping d-flex align-items-center">
                <div className="shipping_icon">
                  <Image src="/img/others/shipping2.webp" alt="Payments" width={70} height={70} />
                </div>
                <div className="shipping_text">
                  <h3>Card Payments</h3>
                  <p>12 Months Installments</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="single_shipping d-flex align-items-center">
                <div className="shipping_icon">
                  <Image src="/img/others/shipping3.webp" alt="Returns" width={70} height={70} />
                </div>
                <div className="shipping_text">
                  <h3>Easy Returns</h3>
                  <p>Shop Wwith Confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main_footer">
          <div className="row">
            <div className="col-12">
              <div className="main_footer_inner d-flex">
                <div className="footer_widget_list contact footer_list_width">
                  <h3>Contact Us</h3>
                  <div className="footer_contact_desc">
                    <p>
                      If you have any question.please contact us at{' '}
                      <a href="mailto:demo@example.com">demo@example.com</a>
                    </p>
                  </div>
                  <div className="footer_contact_info">
                    <div className="footer_contact_info_list d-flex align-items-center">
                      <div className="footer_contact_info_icon">
                        <span className="pe-7s-map-marker"></span>
                      </div>
                      <div className="footer_contact_info_text">
                        <p>Your address goes here. 123, Address.</p>
                      </div>
                    </div>
                    <div className="footer_contact_info_list d-flex align-items-center">
                      <div className="footer_contact_info_icon">
                        <span className="pe-7s-phone"></span>
                      </div>
                      <div className="footer_contact_info_text">
                        <ul>
                          <li>
                            <a href="tel:+0123456789">+ 0 123 456 789</a>
                          </li>
                          <li>
                            <a href="tel:+0123456789">+ 0 123 456 789</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer_menu_widget footer_list_width middle d-flex">
                  <div className="footer_widget_list">
                    <h3>Information</h3>
                    <div className="footer_menu">
                      <ul>
                        <li><Link href="/about">About us</Link></li>
                        <li><Link href="/contact">Delivery information</Link></li>
                        <li><Link href="/contact">Privacy Policy</Link></li>
                        <li><Link href="/contact">Sales</Link></li>
                        <li><Link href="/contact">Terms & Conditions</Link></li>
                        <li><Link href="/contact">Shipping Policy</Link></li>
                        <li><Link href="/contact">EMI Payment</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="footer_widget_list">
                    <h3>Account</h3>
                    <div className="footer_menu">
                      <ul>
                        <li><Link href="/my-account">My account</Link></li>
                        <li><Link href="/contact">My orders</Link></li>
                        <li><Link href="/contact">Returns</Link></li>
                        <li><Link href="/contact">Shipping</Link></li>
                        <li><Link href="/wishlist">Wishlist</Link></li>
                        <li><Link href="/about">How Does It Work</Link></li>
                        <li><Link href="/login-register">Merchant Sign Up</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer_widget_list footer_list_width">
                  <h3>newsletter</h3>
                  <div className="footer_newsletter">
                    <div className="newsletter_desc">
                      <p>
                        If you have any question.please contact us at{' '}
                        <Link href="/contact">Send Us a Email</Link>
                      </p>
                    </div>

                    <div className="newsletter_subscribe">
                      <form id="mc-form">
                        <input
                          id="mc-email"
                          type="email"
                          autoComplete="off"
                          placeholder="Email Address"
                        />
                        <button id="mc-submit">
                          <i className="ion-arrow-right-c"></i>
                        </button>
                      </form>
                      <div className="mailchimp-alerts text-centre">
                        <div className="mailchimp-submitting"></div>
                        <div className="mailchimp-success"></div>
                        <div className="mailchimp-error"></div>
                      </div>
                    </div>
                    <div className="footer_paypal">
                      <a href="#">
                        <Image src="/img/others/paypal.webp" alt="Payments" width={192} height={21} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="copyright_right text-center">
            <p>
              © 2025 <Link href="/"> JD Milk</Link> Made with{' '}
              <i className="ion-heart"></i> by <a href="#">Foods Sweet</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
