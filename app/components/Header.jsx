'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const pathname = usePathname();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
    setIsCartOpen(false); // Ensure only one is open
    setActiveSubmenu(null);
  };
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsOffcanvasOpen(false); // Ensure only one is open
  };
  const toggleSubmenu = (name) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  const isActive = (path) => pathname === path || (path !== '/' && pathname?.startsWith(path));

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={toggleSearch} />

      {/* overlays */}
      <div
        className={`body_overlay ${(isOffcanvasOpen || isCartOpen) ? 'active' : ''}`}
        onClick={() => {
          setIsOffcanvasOpen(false);
          setIsCartOpen(false);
        }}
      ></div>

      {/* Mini Cart Start */}
      <div className={`mini_cart ${isCartOpen ? 'active' : ''}`}>
        <div className="cart_close">
          <div className="cart_text">
            <h3>Cart</h3>
          </div>
          <div className="mini_cart_close">
            <button className="border-0 bg-transparent" onClick={toggleCart}>
              <i className="ion-android-close"></i>
            </button>
          </div>
        </div>
        <div className="cart_item">
          <div className="cart_img">
            <Link href="/shop">
              <Image 
                src="/img/product/mini-product/product1.webp" 
                alt="Product" 
                width={80} 
                height={80} 
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>
          <div className="cart_info">
            <Link href="/shop">Primis In Faucibus</Link>
            <p>1 x <span>$65.00</span></p>
          </div>
          <div className="cart_remove">
            <button className="border-0 bg-transparent text-muted"><i className="ion-android-close"></i></button>
          </div>
        </div>
        <div className="cart_item">
          <div className="cart_img">
            <Link href="/shop">
              <Image 
                src="/img/product/mini-product/product2.webp" 
                alt="Product" 
                width={80} 
                height={80} 
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>
          <div className="cart_info">
            <Link href="/shop">Letraset Sheets</Link>
            <p>1 x <span>$60.00</span></p>
          </div>
          <div className="cart_remove">
            <button className="border-0 bg-transparent text-muted"><i className="ion-android-close"></i></button>
          </div>
        </div>
        <div className="mini_cart_table">
          <div className="cart_total">
            <span>Sub total:</span>
            <span className="price">$125.00</span>
          </div>
          <div className="cart_total mt-10">
            <span>total:</span>
            <span className="price">$125.00</span>
          </div>
        </div>
        <div className="mini_cart_footer mt-20">
          <div className="cart_button">
            <Link href="/contact">VIEW CART</Link>
          </div>
          <div className="cart_button">
            <Link href="/contact">CHECKOUT</Link>
          </div>
        </div>
      </div>
      {/* Mini Cart End */}

      <div className={`offcanvas_menu ${isOffcanvasOpen ? 'active' : ''}`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={`offcanvas_menu_wrapper ${isOffcanvasOpen ? 'active' : ''}`}>
                <div className="canvas_close">
                  <button 
                    className="border-0 bg-transparent" 
                    onClick={toggleOffcanvas}
                    aria-label="Close"
                  >
                    <i className="ion-android-close"></i>
                  </button>
                </div>
                <div className="welcome_text text-center">
                  <p>Welcome to JD Milk Foods Sweet</p>
                </div>
                <div id="menu" className="text-left">
                  <ul className="offcanvas_main_menu">
                    <li><Link href="/" onClick={toggleOffcanvas}>Home</Link></li>
                    <li><Link href="/about" onClick={toggleOffcanvas}>About Us</Link></li>
                    <li><Link href="/shop" onClick={toggleOffcanvas}>Shop</Link></li>
                    <li className={`menu-item-has-children ${activeSubmenu === 'pages' ? 'active' : ''}`}>
                      <button 
                        className="bg-transparent border-0 p-0 text-start w-100 d-flex justify-content-between align-items-center"
                        onClick={() => toggleSubmenu('pages')}
                        style={{ fontSize: 'inherit', fontWeight: 'inherit', color: activeSubmenu === 'pages' ? '#fc7c7c' : 'inherit' }}
                      >
                        Pages <i className={`ion-ios-arrow-${activeSubmenu === 'pages' ? 'up' : 'down'} ms-2`}></i>
                      </button>
                      <ul className="sub-menu">
                        <li><Link href="/faq" onClick={toggleOffcanvas}>FAQ</Link></li>
                        <li><Link href="/404" onClick={toggleOffcanvas}>Error 404</Link></li>
                      </ul>
                    </li>
                    <li className={`menu-item-has-children ${activeSubmenu === 'blog' ? 'active' : ''}`}>
                      <button 
                        className="bg-transparent border-0 p-0 text-start w-100 d-flex justify-content-between align-items-center"
                        onClick={() => toggleSubmenu('blog')}
                        style={{ fontSize: 'inherit', fontWeight: 'inherit', color: activeSubmenu === 'blog' ? '#fc7c7c' : 'inherit' }}
                      >
                        blog <i className={`ion-ios-arrow-${activeSubmenu === 'blog' ? 'up' : 'down'} ms-2`}></i>
                      </button>
                      <ul className="sub-menu">
                        <li><Link href="/blog" onClick={toggleOffcanvas}>Blog Listing</Link></li>
                        <li><Link href="/blog/test-post" onClick={toggleOffcanvas}>Blog Details</Link></li>
                      </ul>
                    </li>
                    <li><Link href="/contact" onClick={toggleOffcanvas}>Contact Us</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* offcanvas menu area end */}

      {/* header area start */}
      <header className="header_section sticky-header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="header_top_inner d-flex justify-content-between">
                  <div className="welcome_text">
                    <p>World Wide Completely Free Returns and Free Shipping</p>
                  </div>
                  <div className="header_top_sidebar d-flex align-items-center">
                    <ul className="d-flex align-items-center">
                      <li>
                        <i className="icofont-phone"></i>
                        <a href="tel:+00123456789">+00 123 456 789</a>
                      </li>
                      <li className="ms-3">
                        <i className="icofont-envelope"></i>
                        <a href="mailto:demo@example.com">demo@example.com</a>
                      </li>
                      <li className="account_link ms-3">
                        <Link href="/contact">Account <i className="icofont-rounded-down"></i></Link>
                        <ul className="dropdown_account_link">
                          <li><Link href="/contact">My Account</Link></li>
                          <li><Link href="/contact">Login</Link></li>
                          <li><Link href="/contact">Contact</Link></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="main_header d-flex justify-content-between align-items-center">
                <div className="header_logo">
                  <Link href="/">
                    <Image 
                      src="/img/logo/logo.webp" 
                      alt="JD Milk Logo" 
                      width={132} 
                      height={80} 
                      priority
                    />
                  </Link>
                </div>
                {/* main menu start */}
                <div className="main_menu d-none d-lg-block">
                  <nav>
                    <ul className="d-flex">
                      <li><Link href="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
                      <li><Link href="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
                      <li>
                        <Link href="/shop" className={isActive('/shop') ? 'active' : ''}>Product</Link>
                        <ul className="bucker-dropdown">
                          <li><Link href="/shop">SWEETS</Link></li>
                        </ul>
                      </li>
                       <li className="menu-item-has-children">
                        <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>blog</Link>
                        <ul className="bucker-dropdown">
                          <li><Link href="/blog">Blog Listing</Link></li>
                          <li><Link href="/blog/test-post">Blog Details</Link></li>
                        </ul>
                      </li>
                      <li><Link href="/faq" className={isActive('/faq') ? 'active' : ''}>FAQ</Link></li>
                      <li><Link href="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
                    </ul>
                  </nav>
                </div>
                {/* main menu end */}
                <div className="header_account">
                  <ul className="d-flex align-items-center">
                    <li className="header_search me-3">
                      <button 
                        className="border-0 bg-transparent p-0" 
                        onClick={toggleSearch}
                        aria-label="Search"
                      >
                        <i className="pe-7s-search h3 mb-0"></i>
                      </button>
                    </li>
                    <li className="header_wishlist me-3">
                      <Link href="/contact">
                        <i className="pe-7s-like h3 mb-0"></i>
                      </Link>
                    </li>
                    <li className="header_cart me-3 position-relative">
                      <button 
                        className="border-0 bg-transparent p-0" 
                        onClick={toggleCart}
                        aria-label="Cart"
                      >
                        <i className="pe-7s-shopbag h3 mb-0"></i>
                        <span className="item_count">2</span>
                      </button>
                    </li>
                    <li className="canvas_open d-lg-none">
                      <button 
                        className="border-0 bg-transparent p-0" 
                        onClick={toggleOffcanvas}
                        aria-label="Menu"
                      >
                        <i className="ion-navicon h3 mb-0"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

