import type { ThemePreset } from '../tokens/design-tokens';

const cafeMinimal: ThemePreset = {
  id: 'cafe-minimal',
  name: 'Cafe Minimal',
  colors: {
    primary: 'hsl(32, 95%, 44%)',
    secondary: 'hsl(48, 96%, 89%)',
    accent: 'hsl(23, 83%, 31%)',
    background: 'hsl(32, 30%, 98%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(32, 16%, 12%)',
    muted: 'hsl(32, 6%, 50%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'standard',
  },
  borderRadius: 'sm',
  spacing: 'normal',
  style: 'minimal',
};

export default cafeMinimal;
