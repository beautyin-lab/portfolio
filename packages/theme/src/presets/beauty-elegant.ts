import type { ThemePreset } from '../tokens/design-tokens';

const beautyElegant: ThemePreset = {
  id: 'beauty-elegant',
  name: 'Beauty Elegant',
  colors: {
    primary: 'hsl(262, 83%, 58%)',
    secondary: 'hsl(252, 95%, 85%)',
    accent: 'hsl(220, 13%, 91%)',
    background: 'hsl(262, 20%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(262, 14%, 16%)',
    muted: 'hsl(262, 8%, 52%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'standard',
  },
  borderRadius: 'md',
  spacing: 'normal',
  style: 'luxury',
};

export default beautyElegant;
