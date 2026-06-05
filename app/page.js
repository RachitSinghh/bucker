// Home page (T-018). Server Component: fetches all section content from the CMS
// read layer and passes it to the section components as props. Markup, class
// names, WOW.js attributes and the slider components are unchanged — only the
// data source moved from hardcoded arrays to Firestore.

import HeroBanner from './components/HeroBanner';
import Services from './components/Services';
import PromoBanners from './components/PromoBanners';
import ProductTabs from './components/ProductTabs';
import BannerFullWidth from './components/BannerFullWidth';
import BestSellers from './components/BestSellers';
import Brands from './components/Brands';
import LatestBlog from './components/LatestBlog';
import {
  getBannersByType,
  getActiveBannerByType,
  getServices,
  getProductsByTab,
  getBestSellers,
  getBrands,
  getBlogs,
} from './lib/cms/content';

export default async function Home() {
  const [
    heroBanner,
    services,
    promoBanners,
    fullwidthBanner,
    features,
    seller,
    sales,
    bestSellers,
    brands,
    blogs,
  ] = await Promise.all([
    getActiveBannerByType('hero'),
    getServices(),
    getBannersByType('promo'),
    getActiveBannerByType('fullwidth'),
    getProductsByTab('features'),
    getProductsByTab('seller'),
    getProductsByTab('sales'),
    getBestSellers(),
    getBrands(),
    getBlogs(),
  ]);

  return (
    <>
      <HeroBanner banner={heroBanner} />
      <Services services={services} />
      <PromoBanners banners={promoBanners} />
      <ProductTabs productsData={{ features, seller, sales }} />
      <BannerFullWidth banner={fullwidthBanner} />
      <BestSellers products={bestSellers} />
      <Brands brands={brands} />
      <LatestBlog blogs={blogs} />
    </>
  );
}
