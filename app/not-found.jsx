'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from './components/Breadcrumbs';

export default function NotFound() {
  return (
    <main>
      <Breadcrumbs title="404" />
      
      <div className="error-404-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="error-404-content text-center">
                <h1 className="title mb-4">404</h1>
                <h2 className="sub-title mb-4">Page Cannot Be Found!</h2>
                <p className="short-desc mb-7">
                  Seems like nothing was found at this location. Try something else or you
                  can go back to the homepage following the button below!
                </p>
                <div className="button-wrap">
                  <Link href="/" className="btn btn-danger btn-lg rounded-0">
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
