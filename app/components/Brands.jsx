'use client';
import Image from 'next/image';
import Slider from './DynamicSlider';

// Brand logos now come from the CMS (T-018) via props.
export default function Brands({ brands = [] }) {
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
                  <div key={brand.id || `${brand.image}-${idx}`}>
                    <div className="single_brand">
                      <a className="primary" href={brand.link || '#'}>
                        <Image src={brand.image} alt="Brand" width={114} height={107} />
                      </a>
                      <a className="secondary" href={brand.link || '#'}>
                        <Image src={brand.hoverImage || brand.image} alt="Brand Hover" width={114} height={107} />
                      </a>
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
