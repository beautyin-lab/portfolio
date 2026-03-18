import type { ThemePreset } from '../tokens/design-tokens';

const cafeMinimal: ThemePreset = {
  id: 'cafe-minimal',
  name: 'Cafe Minimal',
  colors: {
    primary: 'hsl(30, 40%, 32%)',
    secondary: 'hsl(40, 28%, 58%)',
    accent: 'hsl(20, 48%, 44%)',
    background: 'hsl(0, 0%, 98%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(30, 16%, 12%)',
    muted: 'hsl(30, 6%, 50%)',
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
