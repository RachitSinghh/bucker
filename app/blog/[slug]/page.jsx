// Blog detail (T-020). Server Component: looks up the post by slug param and
// 404s when missing. `params` is awaited per Next.js 16 conventions.

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import BlogSidebar from '../../components/BlogSidebar';
import { getBlogBySlug } from '../../lib/cms/content';

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const paragraphs = String(post.body || '').split('\n').filter((p) => p.trim());

  return (
    <main>
      <Breadcrumbs title="Blog Detail" parentTitle="Blog" parentHref="/blog" />

      <div className="blog_details_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 order-2 order-lg-1">
              <BlogSidebar />
            </div>
            <div className="col-lg-8 order-1 order-lg-2">
              <div className="blog_details_left">
                <div className="blog_sticky_thumb">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={770}
                      height={540}
                      style={{ width: '100%', height: 'auto' }}
                      priority
                    />
                  )}
                </div>
                <div className="blog_details_content">
                  {post.category && <span className="brakery">{post.category}</span>}
                  <div className="blog_details_title">
                    <h2>{post.title}</h2>
                  </div>
                  <div className="blog__meta d-flex align-items-center">
                    {post.metaImage && (
                      <div className="blog__meta__thumb">
                        <Image src={post.metaImage} alt={post.author || 'Author'} width={36} height={36} />
                      </div>
                    )}
                    <div className="blog__meta__text">
                      <ul className="d-flex">
                        <li>By: {post.author}</li>
                        <li><i className="icofont-calendar"></i> {post.date}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="blog_details_desc">
                    {paragraphs.length > 0 ? (
                      paragraphs.map((p, i) => <p key={i}>{p}</p>)
                    ) : (
                      <p>{post.excerpt}</p>
                    )}
                  </div>

                  <div className="post_tags_social d-flex justify-content-between">
                    <div className="post_tags d-flex align-items-center">
                      <i className="icofont-tags"></i>
                      <ul className="d-flex">
                        <li><Link href="/blog">{post.category || 'Blog'}</Link></li>
                      </ul>
                    </div>
                    <div className="post__social">
                      <ul className="d-flex">
                        <li><a href="#"><i className="icofont-facebook"></i></a></li>
                        <li><a href="#"><i className="icofont-dribble"></i></a></li>
                        <li><a href="#"><i className="icofont-pinterest"></i></a></li>
                        <li><a href="#"><i className="icofont-vimeo"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
