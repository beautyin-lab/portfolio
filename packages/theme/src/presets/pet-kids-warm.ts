import type { ThemePreset } from '../tokens/design-tokens';

const petKidsWarm: ThemePreset = {
  id: 'pet-kids-warm',
  name: 'Pet & Kids Warm',
  colors: {
    primary: 'hsl(262, 83%, 58%)',
    secondary: 'hsl(330, 81%, 60%)',
    accent: 'hsl(189, 94%, 43%)',
    background: 'hsl(262, 28%, 96%)',
    surface: 'hsl(262, 14%, 99%)',
    text: 'hsl(262, 18%, 14%)',
    muted: 'hsl(262, 8%, 46%)',
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
