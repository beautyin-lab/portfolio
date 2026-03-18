import { notFound } from 'next/navigation';
import { getSiteConfig, getAllSites } from '@portfolio/data';
import { GalleryPageContent } from '../../../_components/sub-pages/gallery-page';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const sites = getAllSites();
  return sites
    .filter((s) => s.gallery?.images?.length || s.features?.gallery?.enabled)
    .map((s) => ({ category: s.category, slug: s.slug }));
}

export default async function GalleryPage({ params }: PageProps) {
  const { category, slug } = await params;
  const config = getSiteConfig(category, slug);
  if (!config) return notFound();
  if (!config.gallery?.images?.length && !config.features?.gallery?.enabled) return notFound();

  return <GalleryPageContent config={config} />;
}
