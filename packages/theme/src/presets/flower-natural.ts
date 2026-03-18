import type { ThemePreset } from '../tokens/design-tokens';

const flowerNatural: ThemePreset = {
  id: 'flower-natural',
  name: 'Flower Natural',
  colors: {
    primary: 'hsl(262, 83%, 58%)',
    secondary: 'hsl(48, 100%, 96%)',
    accent: 'hsl(35, 92%, 33%)',
    background: 'hsl(262, 20%, 96%)',
    surface: 'hsl(262, 10%, 99%)',
    text: 'hsl(262, 14%, 14%)',
    muted: 'hsl(262, 6%, 48%)',
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
