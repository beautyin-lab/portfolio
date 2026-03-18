import type { ThemePreset } from '../tokens/design-tokens';

const petKidsWarm: ThemePreset = {
  id: 'pet-kids-warm',
  name: 'Pet & Kids Warm',
  colors: {
    primary: 'hsl(18, 72%, 52%)',
    secondary: 'hsl(340, 54%, 54%)',
    accent: 'hsl(160, 44%, 46%)',
    background: 'hsl(30, 28%, 96%)',
    surface: 'hsl(30, 16%, 99%)',
    text: 'hsl(18, 18%, 14%)',
    muted: 'hsl(18, 8%, 46%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'standard',
  },
  borderRadius: 'xl',
  spacing: 'relaxed',
  style: 'warm',
};

export default petKidsWarm;
