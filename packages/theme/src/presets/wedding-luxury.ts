import type { ThemePreset } from '../tokens/design-tokens';

const weddingLuxury: ThemePreset = {
  id: 'wedding-luxury',
  name: 'Wedding Luxury',
  colors: {
    primary: 'hsl(40, 60%, 50%)',
    secondary: 'hsl(16, 40%, 64%)',
    accent: 'hsl(350, 28%, 56%)',
    background: 'hsl(40, 16%, 96%)',
    surface: 'hsl(40, 8%, 100%)',
    text: 'hsl(40, 14%, 14%)',
    muted: 'hsl(40, 6%, 46%)',
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
