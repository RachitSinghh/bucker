'use client';
import Image from 'next/image';
import Slider from './DynamicSlider';

const brands = [
  { img: '/img/others/brand1.webp', hoverImg: '/img/others/brand-hover1.webp' },
  { img: '/img/others/brand2.webp', hoverImg: '/img/others/brand-hover2.webp' },
  { img: '/img/others/brand3.webp', hoverImg: '/img/others/brand-hover3.webp' },
  { img: '/img/others/brand4.webp', hoverImg: '/img/others/brand-hover4.webp' },
  { img: '/img/others/brand5.webp', hoverImg: '/img/others/brand-hover5.webp' },
  { img: '/img/others/brand1.webp', hoverImg: '/img/others/brand-hover1.webp' },
];

export default function Brands() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

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
                  <div key={`${brand.img}-${idx}`}>
                    <div className="single_brand">
                      <a className="primary" href="#">
                        <Image src={brand.img} alt="Brand" width={114} height={107} />
                      </a>
                      <a className="secondary" href="#">
                        <Image src={brand.hoverImg} alt="Brand Hover" width={114} height={107} />
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
