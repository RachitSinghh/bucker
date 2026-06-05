import React from 'react';
import Image from 'next/image';

// Service blurbs now come from the CMS (T-018) via props.
export default function Services({ services = [] }) {
  return (
    <div className="service_section mb-86">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="services_section_inner d-flex justify-content-between">
              {services.map((service, idx) => (
                <div
                  key={service.id || idx}
                  className={`single_services ${service.cssClass || ''} text-center wow fadeInUp`}
                  data-wow-delay={`0.${idx + 1}s`}
                  data-wow-duration={`1.${idx + 1}s`}
                >
                  <div className="services_thumb">
                    {service.image && (
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={service.width || 162}
                        height={service.height || 148}
                      />
                    )}
                  </div>
                  <div className="services_content">
                    <h3><a href="#">{service.title}</a></h3>
                    <p>{service.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
