import { getAllSites } from '@portfolio/data';

export interface PortfolioItem {
  id: string;
  slug: string;
  category: string;
  name: string;
  description: string;
  image: string;
  archetype: string;
  demoUrl: string;
}

// 카테고리 라벨 매핑
const CATEGORY_LABELS: Record<string, string> = {
  medical: '의료',
  legal: '법률',
  pension: '펜션',
  wellness: '웰니스',
  fitness: '헬스장',
  'pet-kids': '펫/키즈',
  beauty: '뷰티',
  cafe: '카페',
  realty: '부동산',
  wedding: '웨딩',
  'study-cafe': '스터디카페',
  interior: '인테리어',
  flower: '꽃집',
  education: '학원',
  restaurant: '식당',
};

// 실제 콘텐츠에서 포트폴리오 아이템 생성
export function getPortfolioItems(): PortfolioItem[] {
  const sites = getAllSites();
  return sites.map((site) => ({
    id: `${site.category}-${site.slug}`,
    slug: site.slug,
    category: CATEGORY_LABELS[site.category] ?? site.category,
    name: site.name,
    description: site.hero.subtitle ?? site.about.description.slice(0, 50),
    image: site.hero.images[0] ?? '',
    archetype: site.archetype,
    demoUrl: `/demo/${site.category}/${site.slug}`,
  }));
}

export const categories = Object.values(CATEGORY_LABELS);

export type Category = string;
