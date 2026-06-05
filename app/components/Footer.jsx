import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSettings } from '../lib/cms/content';

// Footer is an async Server Component reading the global settings singleton
// (T-016 / T-018). It is rendered by the root layout and passed into SiteChrome
// so the storefront keeps server-rendered footer content.
export default async function Footer() {
  const settings = (await getSettings()) || {};
  const shipping = settings.shipping || [];
  const infoLinks = settings.infoLinks || [];
  const accountLinks = settings.accountLinks || [];
  const phones = settings.phones || [];

  return (
    <footer className="footer_widgets">
      <div className="container">
        <div className="shipping_area">
          <div className="row">
            {shipping.map((item, idx) => (
              <div className="col-lg-4 col-md-4 col-sm-6" key={idx}>
                <div className="single_shipping d-flex align-items-center">
                  <div className="shipping_icon">
                    {item.image && <Image src={item.image} alt={item.title} width={70} height={70} />}
                  </div>
                  <div className="shipping_text">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
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
                      <a href={`mailto:${settings.contactEmail || ''}`}>{settings.contactEmail}</a>
                    </p>
                  </div>
                  <div className="footer_contact_info">
                    <div className="footer_contact_info_list d-flex align-items-center">
                      <div className="footer_contact_info_icon">
                        <span className="pe-7s-map-marker"></span>
                      </div>
                      <div className="footer_contact_info_text">
                        <p>{settings.address}</p>
                      </div>
                    </div>
                    <div className="footer_contact_info_list d-flex align-items-center">
                      <div className="footer_contact_info_icon">
                        <span className="pe-7s-phone"></span>
                      </div>
                      <div className="footer_contact_info_text">
                        <ul>
                          {phones.map((phone, idx) => (
                            <li key={idx}>
                              <a href={`tel:${String(phone).replace(/\s+/g, '')}`}>{phone}</a>
                            </li>
                          ))}
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
                        {infoLinks.map((link, idx) => (
                          <li key={idx}><Link href={link.href || '#'}>{link.label}</Link></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="footer_widget_list">
                    <h3>Account</h3>
                    <div className="footer_menu">
                      <ul>
                        {accountLinks.map((link, idx) => (
                          <li key={idx}><Link href={link.href || '#'}>{link.label}</Link></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer_widget_list footer_list_width">
                  <h3>newsletter</h3>
                  <div className="footer_newsletter">
                    <div className="newsletter_desc">
                      <p>
                        {settings.newsletterText || 'If you have any question.please contact us'} at{' '}
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
            <p>{settings.copyright || '© 2025 JD Milk'}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
