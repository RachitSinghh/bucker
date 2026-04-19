'use client';
import React from 'react';
import Link from 'next/link';

export default function Breadcrumbs({ title, parentTitle = 'Home', parentHref = '/' }) {
  return (
    <div 
      className="breadcrumbs_aree breadcrumbs_bg mb-110" 
      style={{ backgroundImage: 'url(/img/others/breadcrumbs-bg.png)' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumbs_text">
              <h1>{title}</h1>
              <ul>
                <li><Link href={parentHref}>{parentTitle}</Link></li>
                <li> // {title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
