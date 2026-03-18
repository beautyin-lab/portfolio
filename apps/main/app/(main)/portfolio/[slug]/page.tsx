import { getSiteBySlug, getAllSites } from '@portfolio/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PortfolioDetail } from './portfolio-detail';

const CATEGORY_LABELS: Record<string, string> = {
  medical: '의료',
  legal: '법률',
  pension: '펜션/숙박',
  wellness: '웰니스',
  fitness: '헬스장/피트니스',
  'pet-kids': '펫/키즈',
  beauty: '뷰티',
  cafe: '카페/베이커리',
  realty: '부동산',
  wedding: '웨딩',
  'study-cafe': '스터디카페',
  interior: '인테리어',
  flower: '꽃집/플라워',
  education: '학원/교육',
  restaurant: '식당/맛집',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) return { title: '프로젝트를 찾을 수 없습니다' };

  const categoryLabel = CATEGORY_LABELS[site.category] ?? site.category;

  return {
    title: `${site.name} - ${categoryLabel} | 포트폴리오`,
    description: site.seo.description,
    keywords: site.seo.keywords,
  };
}

export async function generateStaticParams() {
  return getAllSites().map((s) => ({ slug: s.slug }));
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) notFound();

  // Find prev/next sites for navigation
  const allSites = getAllSites();
  const currentIndex = allSites.findIndex((s) => s.slug === slug);
  const prevSite = currentIndex > 0 ? allSites[currentIndex - 1] : null;
  const nextSite =
    currentIndex < allSites.length - 1 ? allSites[currentIndex + 1] : null;

  return (
    <PortfolioDetail
      site={site}
      prevSite={prevSite ? { slug: prevSite.slug, name: prevSite.name } : null}
      nextSite={nextSite ? { slug: nextSite.slug, name: nextSite.name } : null}
    />
  );
}
