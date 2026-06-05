import React from 'react';
import Image from 'next/image';
import { renderMultiline } from './_multiline';

// Hero banner content now comes from the CMS (T-018) via the `banner` prop.
// The decorative mini-shapes remain part of the template design.
export default function HeroBanner({ banner = null }) {
  return (
    <>
      <div className="hero_banner_section d-flex align-items-center mb-110">
        <div className="container">
          <div className="hero_banner_inner">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="hero_content">
                  {(banner?.discount || banner?.discountLabel) && (
                    <h3 className="wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
                      <span>{banner.discount}</span> {banner.discountLabel}
                    </h3>
                  )}
                  <h1 className="wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="1.2s">
                    {renderMultiline(banner?.title)}
                  </h1>
                  {banner?.ctaLabel && (
                    <a className="btn btn-link wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="1.3s" href={banner.ctaLink || '#'}>
                      {banner.ctaLabel}
                    </a>
                  )}
                </div>
              </div>
              <div className="col-lg-7">
                <div className="hero_shape_banner">
                  {banner?.image && (
                    <Image
                      className="banner_keyframes_animation wow"
                      src={banner.image}
                      alt="Hero Banner"
                      width={652}
                      height={471}
                      priority
                    />
                  )}
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
