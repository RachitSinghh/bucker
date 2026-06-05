// Blog listing (T-020). Server Component reading posts from the CMS.

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import BlogSidebar from '../components/BlogSidebar';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../lib/cms/content';

export default async function BlogPage() {
  const posts = await getBlogs();

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
                  {posts.length === 0 ? (
                    <p className="text-muted">No blog posts yet.</p>
                  ) : (
                    posts.map((post, idx) => (
                      <BlogCard key={post.id} delay={`0.${(idx % 3) + 1}s`} {...post} />
                    ))
                  )}
                </div>

                {posts.length > 0 && (
                  <div className="pagination justify-content-center mt-50">
                    <ul className="d-flex">
                      <li className="current">1</li>
                      <li><Link href="/blog">2</Link></li>
                      <li><Link href="/blog">3</Link></li>
                      <li><Link href="/blog"><i className="ion-ios-arrow-right"></i></Link></li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
