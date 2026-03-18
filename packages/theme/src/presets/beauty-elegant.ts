import type { ThemePreset } from '../tokens/design-tokens';

const beautyElegant: ThemePreset = {
  id: 'beauty-elegant',
  name: 'Beauty Elegant',
  colors: {
    primary: 'hsl(350, 40%, 62%)',
    secondary: 'hsl(30, 52%, 68%)',
    accent: 'hsl(340, 24%, 48%)',
    background: 'hsl(20, 20%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(350, 14%, 16%)',
    muted: 'hsl(350, 8%, 52%)',
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
