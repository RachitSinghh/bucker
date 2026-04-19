'use client';
import React from 'react';
import Slider from 'react-slick';

// Slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
  { img: '/img/others/brand1.png', hoverImg: '/img/others/brand-hover1.png' },
  { img: '/img/others/brand2.png', hoverImg: '/img/others/brand-hover2.png' },
  { img: '/img/others/brand3.png', hoverImg: '/img/others/brand-hover3.png' },
  { img: '/img/others/brand4.png', hoverImg: '/img/others/brand-hover4.png' },
  { img: '/img/others/brand5.png', hoverImg: '/img/others/brand-hover5.png' },
  { img: '/img/others/brand1.png', hoverImg: '/img/others/brand-hover1.png' },
];

export default function Brands() {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: false,
    speed: 300,
    infinite: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
      { breakpoint: 300, settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <div className="brand_section_area mb-100 wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="brand_inner">
              <Slider {...settings}>
                {brands.map((brand, idx) => (
                  <div key={idx}>
                    <div className="single_brand">
                      <a className="primary" href="#"><img src={brand.img} alt="" /></a>
                      <a className="secondary" href="#"><img src={brand.hoverImg} alt="" /></a>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
