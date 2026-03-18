import type { ThemePreset } from '../tokens/design-tokens';

const cafeWarm: ThemePreset = {
  id: 'cafe-warm',
  name: 'Cafe Warm',
  colors: {
    primary: 'hsl(26, 58%, 38%)',
    secondary: 'hsl(36, 44%, 52%)',
    accent: 'hsl(14, 62%, 46%)',
    background: 'hsl(36, 30%, 95%)',
    surface: 'hsl(36, 20%, 99%)',
    text: 'hsl(26, 22%, 14%)',
    muted: 'hsl(26, 10%, 46%)',
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
