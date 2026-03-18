import type { ThemePreset } from '../tokens/design-tokens';

const beautyTrendy: ThemePreset = {
  id: 'beauty-trendy',
  name: 'Beauty Trendy',
  colors: {
    primary: 'hsl(240, 6%, 10%)',
    secondary: 'hsl(39, 46%, 61%)',
    accent: 'hsl(60, 9%, 98%)',
    background: 'hsl(240, 6%, 12%)',
    surface: 'hsl(240, 4%, 18%)',
    text: 'hsl(60, 9%, 98%)',
    muted: 'hsl(240, 4%, 58%)',
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
