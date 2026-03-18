import type { ThemePreset } from '../tokens/design-tokens';

const restaurantTraditional: ThemePreset = {
  id: 'restaurant-traditional',
  name: 'Restaurant Traditional',
  colors: {
    primary: 'hsl(16, 56%, 36%)',
    secondary: 'hsl(36, 42%, 44%)',
    accent: 'hsl(44, 68%, 48%)',
    background: 'hsl(36, 18%, 94%)',
    surface: 'hsl(36, 10%, 98%)',
    text: 'hsl(16, 20%, 12%)',
    muted: 'hsl(16, 8%, 44%)',
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
