'use client';
import Link from 'next/link';
import Image from 'next/image';
import Slider from './DynamicSlider';

// Blog posts now come from the CMS (T-018) via props. Links point to the real
// /blog/[slug] pages.
export default function LatestBlog({ blogs = [] }) {
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
          <Slider {...settings}>
            {blogs.map((blog) => (
              <div key={blog.id} className="px-2">
                <div className="single_blog">
                  <div className="blog_thumb">
                    <Link href={`/blog/${blog.slug || blog.id}`}>
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
                      <Link href={`/blog/${blog.slug || blog.id}`}><i className="ion-arrow-right-c"></i></Link>
                    </div>
                    <span className={blog.colorClass}>{blog.category}</span>
                    <h3><Link href={`/blog/${blog.slug || blog.id}`}>{blog.title}</Link></h3>
                    <div className="blog__meta d-flex align-items-center">
                      <div className="blog__meta__thumb">
                        {blog.metaImage && <Image src={blog.metaImage} alt="Author" width={40} height={40} />}
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
        </div>
      </div>
    </div>
  );
}
