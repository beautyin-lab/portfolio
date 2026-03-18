import { notFound } from 'next/navigation';
import { getSiteConfig, getAllSites } from '@portfolio/data';
import { MenuPageContent } from '../../../_components/sub-pages/menu-page';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const sites = getAllSites();
  return sites
    .filter((s) => s.features?.menuBoard?.enabled)
    .map((s) => ({ category: s.category, slug: s.slug }));
}

export default async function MenuPage({ params }: PageProps) {
  const { category, slug } = await params;
  const config = getSiteConfig(category, slug);
  if (!config) return notFound();
  if (!config.features?.menuBoard?.enabled) return notFound();

  return <MenuPageContent config={config} />;
}
