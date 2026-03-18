// Schema types
export type {
  SiteConfig,
  Category,
  Archetype,
  HeroSection,
  AboutSection,
  ServicesSection,
  TeamSection,
  GallerySection,
  TestimonialsSection,
  FAQSection,
  ContactInfo,
  SEOConfig,
  ReservationConfig,
  SiteFeatures,
  ProjectMeta,
} from './schemas/site-config';

export { CATEGORIES, ARCHETYPES } from './schemas/site-config';

// Registry
export {
  getSiteConfig,
  getSiteBySlug,
  getAllSites,
  getSitesByCategory,
  getAllCategories,
} from './registry';
