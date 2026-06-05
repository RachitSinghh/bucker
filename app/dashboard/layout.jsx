// Dashboard layout + route protection (T-009 / T-010).
//
// Server component: every /dashboard/* route is gated here. Unauthenticated
// users are redirected to /login. The same getCurrentUser() check is reused by
// the API mutation routes, so auth logic is not duplicated/divergent.

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/lib/auth';
import ThemeRegistry from './components/ThemeRegistry';
import DashboardShell from './components/DashboardShell';

export const metadata = {
  title: 'Bucker CMS — Dashboard',
};

// Auth depends on the session cookie, so never statically prerender.
export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login?redirect=/dashboard');

  return (
    <ThemeRegistry>
      <DashboardShell userEmail={user.email}>{children}</DashboardShell>
    </ThemeRegistry>
  );
}
