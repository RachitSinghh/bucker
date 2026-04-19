'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import BlogSidebar from '../../components/BlogSidebar';

export default function BlogDetailPage() {
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
                  <img src="/img/blog/blog-sticky.png" alt="Blog Main" />
                </div>
                <div className="blog_details_content">
                  <span className="brakery">Brakery</span>
                  <div className="blog_details_title">
                    <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</h2>
                  </div>
                  <div className="blog__meta d-flex align-items-center">
                    <div className="blog__meta__thumb">
                      <img src="/img/others/meta-img1.png" alt="Admin" />
                    </div>
                    <div className="blog__meta__text">
                      <ul className="d-flex">
                        <li>By: Admin</li>
                        <li><i className="icofont-calendar"></i> 22 Aug, 2021</li>
                      </ul>
                    </div>
                  </div>
                  <div className="blog_details_desc">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                      incididunt ut labore etl dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquippl ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                      deseruntmh mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus
                      error sit voluptatem a doloremquej laudantium, totam rem aperiam, eaque ipsa quae
                    </p>
                  </div>
                  <div 
                    className="blog_details_blockquote" 
                    style={{ backgroundImage: 'url(/img/blog/blockcode-bg.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                  >
                    <blockquote className="blockquote__text text-center">
                      <h4>
                        Lorem ipsum dolor sit amet, consectetur adipisicin elit, sed do eiusmod tempor
                        incidi
                      </h4>
                    </blockquote>
                  </div>
                  <div className="blog_details_desc">
                    <h4>Lorem ipsum dolor sit amet</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                      incididunt ut labore etl dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquippl ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                      deseruntmh mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus
                      error sit voluptatem a doloremquej laudantium, totam rem aperiam, eaque ipsa quae
                    </p>
                  </div>
                  <div className="blog_related_gallery">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="blog_related_thumb">
                          <img src="/img/blog/blog2.png" alt="Related" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="blog_related_thumb">
                          <img src="/img/blog/blog3.png" alt="Related" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="blog_details_desc">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                      incididunt ut labore etl dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquippl ex ea commodo consequat.
                    </p>
                  </div>
                  <div className="post_tags_social d-flex justify-content-between">
                    <div className="post_tags d-flex align-items-center">
                      <i className="icofont-tags"></i>
                      <ul className="d-flex">
                        <li><Link href="/blog">Cookies,</Link></li>
                        <li><Link href="/blog">Desserts,</Link></li>
                        <li><Link href="/blog">Muffins</Link></li>
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
                  
                  <div className="blog_comment_wrapper">
                    <div className="comments_box">
                      <div className="comments_title">
                        <h2>Comments 03</h2>
                      </div>
                      <div className="comment_list d-flex">
                        <div className="comment_thumb">
                          <img src="/img/blog/post-comment1.png" alt="User" />
                        </div>
                        <div className="comment_content">
                          <a href="#"><i className="icofont-reply"></i> Reply</a>
                          <h5>Jakobe Snell <br /> <span> 22 Aug, 2021</span></h5>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusml
                            tempor incididunt ut labore etl dolore magna aliqua.
                          </p>
                        </div>
                      </div>
                      {/* Add more comments as needed */}
                    </div>
                    
                    <div className="comments_form">
                      <div className="comments_title">
                        <h2>Leave A Comment</h2>
                      </div>
                      <div className="comments_form_inner">
                        <form action="#" onSubmit={(e) => e.preventDefault()}>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="comments_form_input">
                                <input className="border" placeholder="Name *" type="text" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="comments_form_input">
                                <input className="border" placeholder="Email *" type="text" />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="comments_form_input">
                                <input className="border" placeholder="Subject (Optional)" type="text" />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="comments_form_input">
                                <textarea className="border" placeholder="Message"></textarea>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="comments_form_btn">
                                <button className="btn btn-link" type="submit">post comment</button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
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
