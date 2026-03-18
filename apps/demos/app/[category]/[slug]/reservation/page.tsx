import { notFound } from 'next/navigation';
import { getSiteConfig, getAllSites } from '@portfolio/data';
import { ReservationPageContent } from '../../../_components/sub-pages/reservation-page';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const sites = getAllSites();
  return sites
    .filter((s) => s.reservation || s.features?.reservation?.enabled)
    .map((s) => ({ category: s.category, slug: s.slug }));
}

export default async function ReservationPage({ params }: PageProps) {
  const { category, slug } = await params;
  const config = getSiteConfig(category, slug);
  if (!config) return notFound();
  if (!config.reservation && !config.features?.reservation?.enabled) return notFound();

  return <ReservationPageContent config={config} />;
}
