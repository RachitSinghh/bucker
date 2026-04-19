import React from 'react';
import HeroBanner from './components/HeroBanner';
import Services from './components/Services';
import PromoBanners from './components/PromoBanners';
import ProductTabs from './components/ProductTabs';
import BannerFullWidth from './components/BannerFullWidth';
import BestSellers from './components/BestSellers';
import Brands from './components/Brands';
import LatestBlog from './components/LatestBlog';

export default function Home() {
  return (
    <>
      {/* page search box (optional hidden by default in Next.js since we need state to toggle, sticking with layout flow for now) */}
      <HeroBanner />
      <Services />
      <PromoBanners />
      <ProductTabs />
      <BannerFullWidth />
      <BestSellers />
      <Brands />
      <LatestBlog />
    </>
  );
}
