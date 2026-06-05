import React from 'react';
import Link from 'next/link';
import { renderMultiline } from './_multiline';

// Full-width promo banner now comes from the CMS (T-018) via the `banner` prop.
export default function BannerFullWidth({ banner = null }) {
  const bg = banner?.image ? `url('${banner.image}')` : "url('/img/bg/banner-fullwidth1.webp')";

  return (
    <div className="banner_fullwidth_section mb-105" style={{ backgroundImage: bg }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="banner_discount_text text-center">
              {(banner?.discount || banner?.discountLabel) && (
                <h3 className="wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
                  <span>{banner.discount} </span> {banner.discountLabel}
                </h3>
              )}
              <h2 className="wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="1.2s">
                {renderMultiline(banner?.title)}
              </h2>
              {banner?.subtext && (
                <p className="wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="1.3s">
                  {renderMultiline(banner.subtext)}
                </p>
              )}
              {banner?.ctaLabel && (
                <Link className="btn btn-link wow fadeInUp" href={banner.ctaLink || '/shop'} data-wow-delay="0.3s" data-wow-duration="1.3s">
                  {banner.ctaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
