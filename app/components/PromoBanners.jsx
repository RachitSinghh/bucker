import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { renderMultiline } from './_multiline';

// Promo banners now come from the CMS (T-018) via props (typically two).
export default function PromoBanners({ banners = [] }) {
  return (
    <div className="banner_section mb-105">
      <div className="container">
        <div className="row">
          {banners.map((banner, idx) => (
            <div className="col-lg-6 col-md-6" key={banner.id || idx}>
              <div className="single_banner wow fadeInUp" data-wow-delay={`0.${idx + 1}s`} data-wow-duration={`1.${idx + 1}s`}>
                <div className="banner_thumb">
                  <Link href={banner.ctaLink || '/shop'}>
                    {banner.image && (
                      <Image
                        src={banner.image}
                        alt={banner.title || 'Banner'}
                        width={570}
                        height={301}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    )}
                  </Link>
                  <div className="banner_text">
                    {(banner.discount || banner.discountLabel) && (
                      <h3><span>{banner.discount}</span> {banner.discountLabel}</h3>
                    )}
                    <h2>{renderMultiline(banner.title)}</h2>
                    {banner.ctaLabel && (
                      <Link className="btn btn-link" href={banner.ctaLink || '/shop'}>{banner.ctaLabel}</Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
