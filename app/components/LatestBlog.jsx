'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';

// Slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const blogs = [
  {
    id: 1,
    category: 'Bakery',
    title: 'Lorem ipsum dolor sit amet consepy.',
    image: '/img/blog/blog1.webp',
    author: 'Admin',
    date: '22 Aug, 2025',
    metaImage: '/img/others/meta-img1.webp',
    colorClass: ''
  },
  {
    id: 2,
    category: 'Bakery',
    title: 'Lorem ipsum dolor sit, elit, dolores is .',
    image: '/img/blog/blog1.webp', // reusing blog1 as template
    author: 'Admin',
    date: '22 Aug, 2025',
    metaImage: '/img/others/meta-img2.webp',
    colorClass: 'color2'
  },
  {
    id: 3,
    category: 'Bakery',
    title: 'harum dolorum culpa quas are veniam',
    image: '/img/blog/blog1.webp',
    author: 'Admin',
    date: '22 Aug, 2025',
    metaImage: '/img/others/meta-img3.webp',
    colorClass: 'color3'
  },
  {
    id: 4,
    category: 'Bakery',
    title: 'There are many of Lorem Ipsum.',
    image: '/img/blog/blog1.webp',
    author: 'Admin',
    date: '22 Aug, 2021',
    metaImage: '/img/others/meta-img1.webp',
    colorClass: ''
  }
];

export default function LatestBlog() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: false,
    speed: 300,
    infinite: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="blog_section mb-90">
      <div className="container">
        <div className="section_title text-center wow fadeInUp mb-50" data-wow-delay="0.1s" data-wow-duration="1.1s">
          <h2>Latest Blog</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod <br /> tempor incididunt ut labore et dolore magna
          </p>
        </div>
        <div className="blog_inner">
          {mounted && (
            <Slider {...settings}>
              {blogs.map((blog, idx) => (
                <div key={idx} className="px-2">
                  <div className="single_blog">
                    <div className="blog_thumb">
                      <Link href="/blog/lorem-ipsum">
                        <Image 
                          src={blog.image} 
                          alt={blog.title} 
                          width={370} 
                          height={260}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </Link>
                    </div>
                    <div className="blog_content">
                      <div className="blog_arrow_btn">
                        <Link href="/blog-detail"><i className="ion-arrow-right-c"></i></Link>
                      </div>
                      <span className={blog.colorClass}>{blog.category}</span>
                      <h3><Link href="/blog-detail">{blog.title}</Link></h3>
                      <div className="blog__meta d-flex align-items-center">
                        <div className="blog__meta__thumb">
                          <Image src={blog.metaImage} alt="Author" width={40} height={40} />
                        </div>
                        <div className="blog__meta__text">
                          <ul className="d-flex">
                            <li>By: {blog.author}</li>
                            <li><i className="icofont-calendar"></i> {blog.date}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
}
