'use client';
import Link from 'next/link';
import Image from 'next/image';
import Slider from './DynamicSlider';

const products = [
  { id: 1, name: 'Products Name Here', image: '/img/product/product1.webp' },
  { id: 2, name: 'Lorem, ipsum dolor.', image: '/img/product/product2.webp' },
  { id: 3, name: 'Praesentium vero nesciu.', image: '/img/product/product3.webp' },
  { id: 4, name: 'Sit amet consectetur elit.', image: '/img/product/product4.webp' },
  { id: 5, name: 'Atque earum ullam non.', image: '/img/product/product5.webp' },
  { id: 6, name: 'Modi excepturi ut ipsam.', image: '/img/product/product6.webp' },
  { id: 7, name: 'Provident odio, are Unde.', image: '/img/product/product7.webp' },
  { id: 8, name: 'Products Name Here', image: '/img/product/product1.webp' }
];

export default function BestSellers() {
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
                      <Link href={`/shop/${product.id}`}>
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
                      <h4><Link href={`/shop/${product.id}`}>{product.name}</Link></h4>
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
