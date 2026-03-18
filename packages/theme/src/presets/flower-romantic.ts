import type { ThemePreset } from '../tokens/design-tokens';

const flowerRomantic: ThemePreset = {
  id: 'flower-romantic',
  name: 'Flower Romantic',
  colors: {
    primary: 'hsl(347, 77%, 50%)',
    secondary: 'hsl(356, 100%, 97%)',
    accent: 'hsl(142, 72%, 29%)',
    background: 'hsl(347, 24%, 97%)',
    surface: 'hsl(347, 12%, 100%)',
    text: 'hsl(347, 16%, 16%)',
    muted: 'hsl(347, 8%, 50%)',
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
