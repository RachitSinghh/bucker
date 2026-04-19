import React from 'react';
import Link from 'next/link';

export default function BannerFullWidth() {
  return (
    <div className="banner_fullwidth_section mb-105" style={{ backgroundImage: "url('/img/bg/banner-fullwidth1.png')" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="banner_discount_text text-center">
              <h3 className="wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
                <span>45% </span> Sale Off
              </h3>
              <h2 className="wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="1.2s">
                Best Quality Bakery Products
              </h2>
              <p className="wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="1.3s">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod <br /> tempor incididunt ut labore et dolore magna
              </p>
              <Link className="btn btn-link wow fadeInUp" href="/product" data-wow-delay="0.3s" data-wow-duration="1.3s">
                Shop Now
              </Link>
            </div>
          2</div>
        </div>
      </div>
    </div>
  );
}
