import type { ThemePreset } from '../tokens/design-tokens';

const restaurantAppetizing: ThemePreset = {
  id: 'restaurant-appetizing',
  name: 'Restaurant Appetizing',
  colors: {
    primary: 'hsl(4, 72%, 48%)',
    secondary: 'hsl(28, 80%, 52%)',
    accent: 'hsl(46, 84%, 50%)',
    background: 'hsl(30, 24%, 96%)',
    surface: 'hsl(30, 12%, 99%)',
    text: 'hsl(4, 18%, 14%)',
    muted: 'hsl(4, 8%, 46%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'standard',
  },
  borderRadius: 'md',
  spacing: 'normal',
  style: 'warm',
};

export default restaurantAppetizing;
