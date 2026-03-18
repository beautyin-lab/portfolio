import type { ThemePreset } from '../tokens/design-tokens';

const legalModern: ThemePreset = {
  id: 'legal-modern',
  name: 'Legal Modern',
  colors: {
    primary: 'hsl(215, 19%, 35%)',
    secondary: 'hsl(217, 91%, 60%)',
    accent: 'hsl(173, 80%, 40%)',
    background: 'hsl(215, 10%, 98%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(215, 24%, 14%)',
    muted: 'hsl(215, 8%, 52%)',
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
