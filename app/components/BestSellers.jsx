'use client';
import Link from 'next/link';
import Image from 'next/image';
import Slider from './DynamicSlider';

// Products now come from the CMS (T-018) via props; the react-slick slider and
// markup are unchanged.
export default function BestSellers({ products = [] }) {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: false,
    speed: 300,
    infinite: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 500, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="product_section mb-80 wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
      <div className="container">
        <div className="section_title text-center mb-55">
          <h2>Best Seller</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod <br /> tempor incididunt ut labore et dolore magna
          </p>
        </div>
        <div className="product_slick">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id}>
                <article className="single_product">
                  <figure>
                    <div className="product_thumb">
                      <Link href={`/shop/${product.slug || product.id}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={268}
                          height={307}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </Link>
                    </div>
                    <figcaption className="product_content text-center">
                      <h4><Link href={`/shop/${product.slug || product.id}`}>{product.name}</Link></h4>
                    </figcaption>
                  </figure>
                </article>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
