import type { ThemePreset } from '../tokens/design-tokens';

const restaurantTraditional: ThemePreset = {
  id: 'restaurant-traditional',
  name: 'Restaurant Traditional',
  colors: {
    primary: 'hsl(17, 88%, 40%)',
    secondary: 'hsl(48, 96%, 89%)',
    accent: 'hsl(86, 78%, 27%)',
    background: 'hsl(17, 20%, 96%)',
    surface: 'hsl(17, 10%, 99%)',
    text: 'hsl(17, 20%, 12%)',
    muted: 'hsl(17, 8%, 44%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'spacious',
  },
  borderRadius: 'sm',
  spacing: 'relaxed',
  style: 'professional',
};

export default restaurantTraditional;
