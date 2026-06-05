'use client';

// Conditionally renders the storefront chrome (Header/Footer/WOW animations).
// Admin and auth routes render bare so the dashboard isn't wrapped in the
// storefront navigation/theme (T-010).
//
// The footer is an async Server Component, so it is rendered by the root layout
// and passed in via `footerSlot` (a client component cannot render an async
// server component directly).

import { usePathname } from 'next/navigation';
import Header from './Header';
import WOWInit from './WOWInit';

const BARE_PREFIXES = ['/dashboard', '/login', '/signup'];

export default function SiteChrome({ children, footerSlot }) {
  const pathname = usePathname() || '/';
  const isBare = BARE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isBare) return <>{children}</>;

  return (
    <>
      <WOWInit />
      <Header />
      {children}
      {footerSlot}
    </>
  );
}
