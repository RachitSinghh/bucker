import React from 'react';
import Image from 'next/image';

export default function Services() {
  return (
    <div className="service_section mb-86">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="services_section_inner d-flex justify-content-between">
              <div className="single_services one text-center wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
                <div className="services_thumb">
                  <Image src="/img/others/services1.webp" alt="Pastry" width={162} height={148} />
                </div>
                <div className="services_content">
                  <h3><a href="#">Pastry</a></h3>
                  <p>Lorem ipsum dolor sit ametgtol consecr adipiscing elit.</p>
                </div>
              </div>
              <div className="single_services two text-center wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="1.2s">
                <div className="services_thumb">
                  <Image src="/img/others/services2.webp" alt="Breakfast" width={245} height={162} />
                </div>
                <div className="services_content">
                  <h3><a href="#">Breakfast</a></h3>
                  <p>Lorem ipsum dolor sit ametgtol consecr adipiscing elit.</p>
                </div>
              </div>
              <div className="single_services three text-center wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="1.3s">
                <div className="services_thumb">
                  <Image src="/img/others/services3.webp" alt="Cofee Cake" width={140} height={144} />
                </div>
                <div className="services_content">
                  <h3><a href="#">Cofee Cake</a></h3>
                  <p>Lorem ipsum dolor sit ametgtol consecr adipiscing elit.</p>
                </div>
              </div>
              <div className="single_services four text-center wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="1.4s">
                <div className="services_thumb">
                  <Image src="/img/others/services4.webp" alt="Bake Tost" width={198} height={130} />
                </div>
                <div className="services_content">
                  <h3><a href="#">Bake Tost</a></h3>
                  <p>Lorem ipsum dolor sit ametgtol consecr adipiscing elit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
