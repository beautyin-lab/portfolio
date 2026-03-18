import type { ThemePreset } from '../tokens/design-tokens';

const restaurantAppetizing: ThemePreset = {
  id: 'restaurant-appetizing',
  name: 'Restaurant Appetizing',
  colors: {
    primary: 'hsl(0, 63%, 31%)',
    secondary: 'hsl(48, 100%, 96%)',
    accent: 'hsl(23, 83%, 31%)',
    background: 'hsl(0, 20%, 96%)',
    surface: 'hsl(0, 10%, 99%)',
    text: 'hsl(0, 18%, 14%)',
    muted: 'hsl(0, 8%, 46%)',
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
