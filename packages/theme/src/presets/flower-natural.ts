import type { ThemePreset } from '../tokens/design-tokens';

const flowerNatural: ThemePreset = {
  id: 'flower-natural',
  name: 'Flower Natural',
  colors: {
    primary: 'hsl(142, 36%, 42%)',
    secondary: 'hsl(350, 40%, 60%)',
    accent: 'hsl(46, 52%, 54%)',
    background: 'hsl(100, 16%, 96%)',
    surface: 'hsl(80, 8%, 99%)',
    text: 'hsl(142, 14%, 14%)',
    muted: 'hsl(142, 6%, 48%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'standard',
  },
  borderRadius: 'lg',
  spacing: 'normal',
  style: 'modern',
};

export default flowerNatural;
