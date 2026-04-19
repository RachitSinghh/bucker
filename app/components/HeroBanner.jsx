import React from 'react';
import Image from 'next/image';

export default function HeroBanner() {
  return (
    <>
      <div className="hero_banner_section d-flex align-items-center mb-110">
        <div className="container">
          <div className="hero_banner_inner">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="hero_content">
                  <h3 className="wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
                    <span>70%</span> Sale Off
                  </h3>
                  <h1 className="wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="1.2s">
                    Quality Products Bakery Items
                  </h1>
                  <a className="btn btn-link wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="1.3s" href="#">
                    Shop Now
                  </a>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="hero_shape_banner">
                  <Image 
                    className="banner_keyframes_animation wow" 
                    src="/img/bg/hero-banner-shape.webp" 
                    alt="Hero Banner" 
                    width={652} 
                    height={471} 
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero_mini_shape shape1">
          <Image src="/img/others/hero-mini-shape1.webp" alt="Shape" width={124} height={122} />
        </div>
        <div className="hero_mini_shape shape2">
          <Image src="/img/others/hero-mini-shape2.webp" alt="Shape" width={89} height={87} />
        </div>
        <div className="hero_mini_shape shape3">
          <Image src="/img/others/hero-mini-shape3.webp" alt="Shape" width={119} height={85} />
        </div>
        <div className="hero_mini_shape shape4">
          <Image src="/img/others/hero-mini-shape4.webp" alt="Shape" width={112} height={83} />
        </div>
        <div className="hero_mini_shape shape5">
          <Image src="/img/others/hero-mini-shape5.webp" alt="Shape" width={155} height={88} />
        </div>
      </div>
    </>
  );
}
