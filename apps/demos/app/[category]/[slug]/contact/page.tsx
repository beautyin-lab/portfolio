import { notFound } from 'next/navigation';
import { getSiteConfig, getAllSites } from '@portfolio/data';
import { ContactPageContent } from '../../../_components/sub-pages/contact-page';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const sites = getAllSites();
  return sites.map((s) => ({ category: s.category, slug: s.slug }));
}

export default async function ContactPage({ params }: PageProps) {
  const { category, slug } = await params;
  const config = getSiteConfig(category, slug);
  if (!config) return notFound();

  return <ContactPageContent config={config} />;
}
