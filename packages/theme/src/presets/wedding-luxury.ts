import type { ThemePreset } from '../tokens/design-tokens';

const weddingLuxury: ThemePreset = {
  id: 'wedding-luxury',
  name: 'Wedding Luxury',
  colors: {
    primary: 'hsl(329, 86%, 70%)',
    secondary: 'hsl(94, 14%, 43%)',
    accent: 'hsl(353, 96%, 90%)',
    background: 'hsl(329, 20%, 97%)',
    surface: 'hsl(329, 10%, 100%)',
    text: 'hsl(329, 14%, 14%)',
    muted: 'hsl(329, 6%, 46%)',
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

export default weddingLuxury;
