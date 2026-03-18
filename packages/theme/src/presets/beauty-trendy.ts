import type { ThemePreset } from '../tokens/design-tokens';

const beautyTrendy: ThemePreset = {
  id: 'beauty-trendy',
  name: 'Beauty Trendy',
  colors: {
    primary: 'hsl(326, 62%, 56%)',
    secondary: 'hsl(280, 44%, 54%)',
    accent: 'hsl(36, 80%, 58%)',
    background: 'hsl(330, 16%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(326, 18%, 14%)',
    muted: 'hsl(326, 8%, 48%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'compact',
  },
  borderRadius: 'lg',
  spacing: 'tight',
  style: 'modern',
};

export default beautyTrendy;
