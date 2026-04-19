'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const recentPosts = [
  {
    id: 1,
    title: 'Lorem ipsum dolo conse tetur adi.',
    date: '22 Aug, 2021',
    image: '/img/blog/blog-small1.png',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit, elit, is .',
    date: '22 Aug, 2021',
    image: '/img/blog/blog-small2.png',
  },
  {
    id: 3,
    title: 'harum dolorum culpa quas are',
    date: '22 Aug, 2021',
    image: '/img/blog/blog-small3.png',
  },
  {
    id: 4,
    title: 'Lorem ipsum dolo conse tetur adi.',
    date: '22 Aug, 2021',
    image: '/img/blog/blog-small4.png',
  },
];

const categories = [
  'Women Fashion',
  'Men Fashion',
  'Baby Fashion',
  'Fashion Shop',
  'New Collection',
];

const tags = ['Cookies', 'Doughnuts', 'Desserts', 'Muffins', 'Bread'];

export default function BlogSidebar() {
  return (
    <div className="blog_sidebar blog_widget">
      <div className="blog_widget_list">
        <h3>Search Here</h3>
        <div className="widget_search">
          <form action="#" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Search Your Article" type="text" />
            <button type="submit"><i className="ion-ios-search"></i></button>
          </form>
        </div>
      </div>
      
      <div className="blog_widget_list">
        <h3>Post Categories</h3>
        <div className="widget_category blog_widget_category">
          <ul>
            {categories.map((cat, index) => (
              <li key={index}>
                <Link href="/blog">
                  {cat} <i className="icofont-curved-double-right"></i>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="blog_widget_list">
        <h3>Recent Post</h3>
        <div className="recent_post_inner">
          {recentPosts.map((post) => (
            <div className="recent_post_list d-flex" key={post.id}>
              <div className="recent_post_thumb">
                <Link href="/blog/lorem-ipsum">
                  <img src={post.image} alt={post.title} />
                </Link>
              </div>
              <div className="recent_post_content">
                <span><i className="icofont-calendar"></i> {post.date}</span>
                <h4>
                  <Link href="/blog/lorem-ipsum">{post.title}</Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="blog_widget_list tags">
        <h3>Tags</h3>
        <div className="widget_tags">
          <ul>
            {tags.map((tag, index) => (
              <li key={index}><Link href="/blog">{tag}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
