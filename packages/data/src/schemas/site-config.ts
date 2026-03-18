// ============================================================================
// SiteConfig — Schema & Types for demo site configuration
// ============================================================================

export const CATEGORIES = [
  'medical',
  'legal',
  'pension',
  'wellness',
  'fitness',
  'pet-kids',
  'beauty',
  'cafe',
  'realty',
  'wedding',
  'study-cafe',
  'interior',
  'flower',
  'education',
  'restaurant',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const ARCHETYPES = [
  'AT-01',
  'AT-02',
  'AT-03',
  'AT-04',
  'AT-05',
  'AT-06',
  'AT-07',
  'AT-08',
  'AT-09',
  'AT-10',
] as const;

export type Archetype = (typeof ARCHETYPES)[number];

// ---------------------------------------------------------------------------
// Layout Config — per-site unique layout configuration (replaces archetypes)
// ---------------------------------------------------------------------------

export type HeaderStyle =
  | 'minimal'
  | 'split-center'
  | 'transparent-overlay'
  | 'two-tier'
  | 'sticky-shrink'
  | 'sidebar'
  | 'bottom-tabs'
  | 'search-bar'
  | 'hamburger-only'
  | 'hidden';

export type ColorMode = 'light' | 'dark' | 'mixed';
export type HeadingFont = 'sans' | 'serif' | 'mono' | 'display';
export type BodyFont = 'sans' | 'serif';
export type HeadingWeight = 'light' | 'normal' | 'bold' | 'black';
export type HeadingSize = 'normal' | 'large' | 'dramatic';
export type ContentWidth = 'narrow' | 'standard' | 'wide' | 'full';
export type SectionSpacing = 'tight' | 'normal' | 'dramatic';
export type BorderRadiusSize = 'none' | 'small' | 'medium' | 'large' | 'full';
export type FooterStyle = 'minimal' | 'multi-column' | 'dark' | 'centered' | 'hidden';
export type HeroVariant = 'fade-slider' | 'fullscreen' | 'split' | 'minimal' | 'parallax';

export interface LayoutConfig {
  headerStyle: HeaderStyle;
  colorMode: ColorMode;
  backgroundColor?: string;
  headingFont: HeadingFont;
  bodyFont?: BodyFont;
  headingWeight?: HeadingWeight;
  headingSize?: HeadingSize;
  contentWidth?: ContentWidth;
  sectionSpacing?: SectionSpacing;
  borderRadius?: BorderRadiusSize;
  effects?: string[];
  footerStyle?: FooterStyle;
  heroVariant?: HeroVariant;
}

// ---------------------------------------------------------------------------
// Section types
// ---------------------------------------------------------------------------

export interface HeroCTA {
  text: string;
  action: string;
}

export interface HeroSection {
  title: string;
  subtitle?: string;
  images: string[];
  cta?: HeroCTA;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface AboutSection {
  title: string;
  description: string;
  highlights?: Highlight[];
}

export interface ServiceItem {
  name: string;
  description: string;
  price?: string;
  image?: string;
}

export interface ServicesSection {
  title: string;
  items: ServiceItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

export interface TeamSection {
  title: string;
  members: TeamMember[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

export interface GallerySection {
  title: string;
  images: GalleryImage[];
}

export interface TestimonialItem {
  name: string;
  content: string;
  rating: number;
  service?: string;
}

export interface TestimonialsSection {
  title: string;
  items: TestimonialItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  title: string;
  items: FAQItem[];
}

export interface ContactInfo {
  phone: string;
  address: string;
  hours: string;
  kakao?: string;
  email?: string;
  coordinates?: { lat: number; lng: number };
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
}

export interface ReservationStaff {
  id: string;
  name: string;
  specialty: string;
}

export interface ReservationService {
  id: string;
  name: string;
  duration: number;
}

export interface ReservationConfig {
  type: string;
  staff?: ReservationStaff[];
  services?: ReservationService[];
  rooms?: Array<{ id: string; name: string; capacity?: number; image?: string }>;
}

// ---------------------------------------------------------------------------
// Features (industry-specific modules)
// ---------------------------------------------------------------------------

export interface MenuBoardCategory {
  name: string;
  items: Array<{ name: string; price: string; description?: string; image?: string }>;
}

export interface SiteFeatures {
  menuBoard?: {
    enabled: boolean;
    categories: MenuBoardCategory[];
  };
  order?: {
    enabled: boolean;
    notice?: string;
  };
  reservation?: {
    enabled: boolean;
  };
  productGrid?: {
    enabled: boolean;
    products?: Array<{
      name: string;
      price: string;
      image?: string;
      description?: string;
    }>;
  };
  gallery?: {
    enabled: boolean;
  };
  estimate?: {
    enabled: boolean;
    fields?: Array<{ label: string; type: string }>;
  };
  schedule?: {
    enabled: boolean;
  };
  seatStatus?: {
    enabled: boolean;
    totalSeats?: number;
  };
  membershipPlans?: {
    enabled: boolean;
    plans?: Array<{
      name: string;
      price: string;
      duration: string;
      features?: string[];
    }>;
  };
  propertySearch?: {
    enabled: boolean;
  };
  priceList?: {
    enabled: boolean;
    categories?: Array<{
      name: string;
      items: Array<{ name: string; price: string; description?: string }>;
    }>;
  };
  hallInfo?: {
    enabled: boolean;
    halls?: Array<{
      name: string;
      capacity: string;
      price: string;
      image?: string;
      description?: string;
    }>;
  };
}

// ---------------------------------------------------------------------------
// SiteConfig — the main type
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Section order types
// ---------------------------------------------------------------------------

export type SectionType =
  | 'hero'
  | 'about'
  | 'services'
  | 'team'
  | 'gallery'
  | 'testimonials'
  | 'faq'
  | 'contact'
  | 'reservation'
  | 'menuBoard'
  | 'propertySearch'
  | 'seatStatus';

export interface ProjectMeta {
  duration: string;
  scope: string[];
  techTags: string[];
}

export interface SiteConfig {
  slug: string;
  category: Category;
  name: string;
  archetype: Archetype;
  theme: string;
  layoutConfig?: LayoutConfig;
  sectionOrder?: SectionType[];
  hero: HeroSection;
  about: AboutSection;
  services: ServicesSection;
  team: TeamSection;
  gallery: GallerySection;
  testimonials: TestimonialsSection;
  faq: FAQSection;
  contact: ContactInfo;
  seo: SEOConfig;
  reservation?: ReservationConfig;
  features?: SiteFeatures;
  projectMeta?: ProjectMeta;
}
