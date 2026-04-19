'use client';

import React from 'react';

export default function SearchOverlay({ isOpen, onClose }) {
  return (
    <div className={`page_search_box ${isOpen ? 'active' : ''}`}>
      <div className="search_close" onClick={onClose}>
        <i className="ion-android-close"></i>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="search_content">
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Search products..." />
                <button type="submit"><i className="ion-ios-search"></i></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
