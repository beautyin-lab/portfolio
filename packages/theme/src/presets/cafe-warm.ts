import type { ThemePreset } from '../tokens/design-tokens';

const cafeWarm: ThemePreset = {
  id: 'cafe-warm',
  name: 'Cafe Warm',
  colors: {
    primary: 'hsl(12, 6%, 15%)',
    secondary: 'hsl(32, 15%, 81%)',
    accent: 'hsl(23, 83%, 31%)',
    background: 'hsl(12, 6%, 18%)',
    surface: 'hsl(12, 5%, 24%)',
    text: 'hsl(32, 15%, 88%)',
    muted: 'hsl(12, 4%, 52%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'spacious',
  },
  borderRadius: 'lg',
  spacing: 'relaxed',
  style: 'warm',
};

export default cafeWarm;
