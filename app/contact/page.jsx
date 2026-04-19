'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
    alert('Message sent successfully!');
  };

  return (
    <main>
      <Breadcrumbs title="Contact Us" />

      <div className="contact_page_section mb-100">
        <div className="container">
          <div className="contact_details">
            <div className="row">
              <div className="col-lg-7 col-md-6">
                <div className="contact_info_content">
                  <h2>We Are Here For Help You! Please Contact Us.</h2>
                  <div className="contact_search">
                    <form action="#" onSubmit={(e) => e.preventDefault()}>
                      <input placeholder="Enter your country or city" type="text" />
                      <button type="submit"><i className="ion-ios-search"></i></button>
                    </form>
                  </div>
                  
                  <div className="contact_info_details mb-45">
                    <h3>Store In New York</h3>
                    <p>Your address goes here.</p>
                    <p><a href="tel:0123456789">0123456789</a></p>
                    <p><a href="mailto:demo@example.com">demo@example.com</a></p>
                    <p><a href="https://www.example.com" target="_blank" rel="noopener noreferrer">www.example.com</a></p>
                    <span>See On The Map</span>
                  </div>
                  
                  <div className="contact_info_details">
                    <h3>Store In New York</h3>
                    <p>Your address goes here.</p>
                    <p><a href="tel:0123456789">0123456789</a></p>
                    <p><a href="mailto:demo@example.com">demo@example.com</a></p>
                    <p><a href="https://www.example.com" target="_blank" rel="noopener noreferrer">www.example.com</a></p>
                    <span>See On The Map</span>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-5 col-md-6">
                <div 
                  className="contact_form" 
                  style={{ backgroundImage: 'url(/img/others/contact-form-bg-shape.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                >
                  <h2>Send A Quest</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form_input">
                      <input 
                        {...register('con_name', { required: 'Name is required' })} 
                        placeholder="Name*" 
                        type="text" 
                      />
                      {errors.con_name && <span className="text-danger small">{errors.con_name.message}</span>}
                    </div>
                    <div className="form_input">
                      <input 
                        {...register('con_email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                          }
                        })} 
                        placeholder="E-Mail*" 
                        type="text" 
                      />
                      {errors.con_email && <span className="text-danger small">{errors.con_email.message}</span>}
                    </div>
                    <div className="form_input">
                      <input 
                        {...register('con_subject')} 
                        placeholder="Subject" 
                        type="text" 
                      />
                    </div>
                    <div className="form_textarea">
                      <textarea 
                        {...register('con_message', { required: 'Message is required' })} 
                        placeholder="Message Here"
                      ></textarea>
                      {errors.con_message && <span className="text-danger small">{errors.con_message.message}</span>}
                    </div>
                    <div className="form_input_btn">
                      <button type="submit" className="btn btn-link">send message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact_map mt-70">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13004082.928417291!2d-104.65713107818928!3d37.275578278180674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1606327234905!5m2!1sen!2sbd"
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
