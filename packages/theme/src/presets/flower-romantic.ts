import type { ThemePreset } from '../tokens/design-tokens';

const flowerRomantic: ThemePreset = {
  id: 'flower-romantic',
  name: 'Flower Romantic',
  colors: {
    primary: 'hsl(340, 52%, 62%)',
    secondary: 'hsl(150, 34%, 48%)',
    accent: 'hsl(310, 30%, 56%)',
    background: 'hsl(340, 24%, 97%)',
    surface: 'hsl(340, 12%, 100%)',
    text: 'hsl(340, 16%, 16%)',
    muted: 'hsl(340, 8%, 50%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'spacious',
  },
  borderRadius: 'xl',
  spacing: 'relaxed',
  style: 'warm',
};

export default flowerRomantic;
