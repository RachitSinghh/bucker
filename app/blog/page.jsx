'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import BlogSidebar from '../components/BlogSidebar';
import BlogCard from '../components/BlogCard';

const blogPosts = [
  {
    id: 1,
    image: '/img/blog/blog1.png',
    category: 'Brakery',
    title: 'Lorem ipsum dolor sit amet adi pisi cing elit.',
    author: 'Admin',
    date: '22 Aug, 2021',
    metaImage: '/img/others/meta-img1.png',
    delay: '0.1s'
  },
  {
    id: 2,
    image: '/img/blog/blog2.png',
    category: 'Brakery',
    title: 'Lorem ipsum dolor sit, elit, dolores is .',
    author: 'Admin',
    date: '22 Aug, 2021',
    metaImage: '/img/others/meta-img2.png',
    delay: '0.2s'
  },
  {
    id: 3,
    image: '/img/blog/blog3.png',
    category: 'Brakery',
    title: 'harum dolorum culpa quas are veniam',
    author: 'Admin',
    date: '22 Aug, 2021',
    metaImage: '/img/others/meta-img3.png',
    delay: '0.3s'
  },
  {
    id: 4,
    image: '/img/blog/blog4.png',
    category: 'Brakery',
    title: 'There are many of Lorem Ipsum.',
    author: 'Admin',
    date: '22 Aug, 2021',
    metaImage: '/img/others/meta-img1.png',
    delay: '0.1s'
  },
  {
    id: 5,
    image: '/img/blog/blog5.png',
    category: 'Brakery',
    title: 'Lorem ipsum doloril sit amet consepy.',
    author: 'Admin',
    date: '22 Aug, 2021',
    metaImage: '/img/others/meta-img1.png',
    delay: '0.1s'
  },
  {
    id: 6,
    image: '/img/blog/blog6.png',
    category: 'Brakery',
    title: 'Lorem ipsum dolor sit amet adi pisi cing elit.',
    author: 'Admin',
    date: '22 Aug, 2021',
    metaImage: '/img/others/meta-img1.png',
    delay: '0.1s'
  }
];

export default function BlogPage() {
  return (
    <main>
      <Breadcrumbs title="Blog" />

      <div className="blog_page_section mb-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 order-2 order-lg-1">
              <BlogSidebar />
            </div>
            <div className="col-lg-8 order-1 order-lg-2">
              <div className="blog_wrapper_inner">
                <div className="row">
                  {blogPosts.map((post) => (
                    <BlogCard key={post.id} {...post} />
                  ))}
                </div>
                
                <div className="pagination justify-content-center mt-50">
                  <ul className="d-flex">
                    <li className="current">1</li>
                    <li><Link href="/blog">2</Link></li>
                    <li><Link href="/blog">3</Link></li>
                    <li><Link href="/blog"><i className="ion-ios-arrow-right"></i></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
