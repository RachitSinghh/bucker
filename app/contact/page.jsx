// Contact page (T-019). Server Component: pulls contact info from the `settings`
// singleton (T-016) and renders the client ContactForm that posts to /api/form.

import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactForm from './ContactForm';
import { getSettings } from '../lib/cms/content';

const DEFAULT_MAP =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13004082.928417291!2d-104.65713107818928!3d37.275578278180674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1606327234905!5m2!1sen!2sbd';

export default async function ContactPage() {
  const settings = (await getSettings()) || {};
  const stores = settings.stores || [];
  const heading = settings.contactHeading || 'We Are Here For Help You! Please Contact Us.';
  const mapUrl = settings.mapEmbedUrl || DEFAULT_MAP;

  return (
    <main>
      <Breadcrumbs title="Contact Us" />

      <div className="contact_page_section mb-100">
        <div className="container">
          <div className="contact_details">
            <div className="row">
              <div className="col-lg-7 col-md-6">
                <div className="contact_info_content">
                  <h2>{heading}</h2>
                  <div className="contact_search">
                    <form action="#">
                      <input placeholder="Enter your country or city" type="text" />
                      <button type="submit"><i className="ion-ios-search"></i></button>
                    </form>
                  </div>

                  {stores.map((store, idx) => (
                    <div className={`contact_info_details ${idx === 0 ? 'mb-45' : ''}`} key={idx}>
                      <h3>{store.title}</h3>
                      <p>{store.address}</p>
                      {store.phone && <p><a href={`tel:${store.phone}`}>{store.phone}</a></p>}
                      {store.email && <p><a href={`mailto:${store.email}`}>{store.email}</a></p>}
                      {store.website && (
                        <p>
                          <a href={`https://${String(store.website).replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer">
                            {store.website}
                          </a>
                        </p>
                      )}
                      <span>See On The Map</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-5 col-md-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact_map mt-70">
        <iframe
          src={mapUrl}
          style={{ border: 0, width: '100%', height: '450px' }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          title="Store Location"
        ></iframe>
      </div>
    </main>
  );
}
