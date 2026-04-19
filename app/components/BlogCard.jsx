'use client';

import React from 'react';
import Link from 'next/link';

export default function BlogCard({ image, category, title, author, date, metaImage, delay }) {
  return (
    <div className="col-lg-6 col-md-6 col-sm-6">
      <div 
        className="single_blog wow fadeInUp" 
        data-wow-delay={delay}
        data-wow-duration="1.1s"
      >
        <div className="blog_thumb">
          <Link href="/blog/lorem-ipsum">
            <img src={image} alt={title} />
          </Link>
        </div>
        <div className="blog_content">
          <div className="blog_arrow_btn">
            <Link href="/blog/lorem-ipsum">
              <i className="ion-arrow-right-c"></i>
            </Link>
          </div>
          <span className={category === 'Brakery' ? '' : `color${Math.floor(Math.random() * 3) + 2}`}>{category}</span>
          <h3>
            <Link href="/blog/lorem-ipsum">{title}</Link>
          </h3>
          <div className="blog__meta d-flex align-items-center">
            <div className="blog__meta__thumb">
              <img src={metaImage} alt={author} />
            </div>
            <div className="blog__meta__text">
              <ul className="d-flex">
                <li>By: {author}</li>
                <li><i className="icofont-calendar"></i> {date}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
