import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PromoBanners() {
  return (
    <div className="banner_section mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="single_banner wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
              <div className="banner_thumb">
                <Link href="/shop">
                  <Image 
                    src="/img/bg/banner1.webp" 
                    alt="Banner 1" 
                    width={570} 
                    height={301} 
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Link>
                <div className="banner_text">
                  <h3><span>70%</span> Sale Off</h3>
                  <h2>Best Quality <br /> Products</h2>
                  <Link className="btn btn-link" href="/shop">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="single_banner wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="1.2s">
              <div className="banner_thumb">
                <Link href="/shop">
                  <Image 
                    src="/img/bg/banner2.webp" 
                    alt="Banner 2" 
                    width={570} 
                    height={301} 
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Link>
                <div className="banner_text">
                  <h3><span>25%</span> Sale Off</h3>
                  <h2>Hot & Spicy <br /> Pastry</h2>
                  <Link className="btn btn-link" href="/shop">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
