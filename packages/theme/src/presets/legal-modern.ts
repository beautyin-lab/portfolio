import type { ThemePreset } from '../tokens/design-tokens';

const legalModern: ThemePreset = {
  id: 'legal-modern',
  name: 'Legal Modern',
  colors: {
    primary: 'hsl(228, 48%, 30%)',
    secondary: 'hsl(210, 22%, 49%)',
    accent: 'hsl(38, 80%, 52%)',
    background: 'hsl(0, 0%, 98%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(228, 24%, 14%)',
    muted: 'hsl(228, 8%, 52%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'compact',
  },
  borderRadius: 'md',
  spacing: 'tight',
  style: 'modern',
};

export default legalModern;
