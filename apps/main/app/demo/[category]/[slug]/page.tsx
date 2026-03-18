import { notFound } from 'next/navigation';
import { getSiteConfig, getAllSites } from '@portfolio/data';
import { DemoSiteRenderer } from '../../_components/demo-site-renderer';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const sites = getAllSites();
  return sites.map((s) => ({ category: s.category, slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const config = getSiteConfig(category, slug);
  if (!config) return { title: '데모 사이트를 찾을 수 없습니다' };

  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords,
  };
}

export default async function DemoSitePage({ params }: PageProps) {
  const { category, slug } = await params;
  const config = getSiteConfig(category, slug);
  if (!config) return notFound();

  return <DemoSiteRenderer config={config} />;
}
