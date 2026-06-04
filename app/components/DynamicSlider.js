'use client';
import dynamic from 'next/dynamic';

// react-slick is heavy and only matters on the client. Loading it via
// next/dynamic with ssr:false keeps it out of the initial bundle (better TTI/LCP)
// and avoids the SSR/hydration mismatch that previously forced a `mounted`
// useEffect gate in every carousel. Slick's CSS is loaded once in globals.css.
const DynamicSlider = dynamic(() => import('react-slick'), { ssr: false });

export default DynamicSlider;
