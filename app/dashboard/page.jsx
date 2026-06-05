// Dashboard overview (T-010): live counts per collection + recent submissions.

import { getAdminDb, isAdminConfigured } from '@/app/lib/firebase/admin';
import { LIST_COLLECTIONS } from '@/app/lib/cms/schema';
import OverviewContent from './components/OverviewContent';

export const dynamic = 'force-dynamic';

async function getStats() {
  if (!isAdminConfigured()) {
    return { counts: {}, submissions: [], configured: false };
  }
  const db = getAdminDb();
  const counts = {};
  try {
    await Promise.all(
      [...LIST_COLLECTIONS, 'submissions'].map(async (c) => {
        const snap = await db.collection(c).count().get();
        counts[c] = snap.data().count;
      })
    );
  } catch (err) {
    console.error('[dashboard] count failed:', err?.message || err);
  }

  let submissions = [];
  try {
    const snap = await db
      .collection('submissions')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();
    submissions = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name || '',
        email: data.email || '',
        read: !!data.read,
        createdAt: data.createdAt?.toDate?.().toISOString() || null,
      };
    });
  } catch {
    // submissions may not exist yet / no index — ignore
  }

  return { counts, submissions, configured: true };
}

export default async function DashboardHome() {
  const { counts, submissions, configured } = await getStats();
  return <OverviewContent counts={counts} submissions={submissions} configured={configured} />;
}
