import type { ThemePreset } from '../tokens/design-tokens';

const fitnessDark: ThemePreset = {
  id: 'fitness-dark',
  name: 'Fitness Dark',
  colors: {
    primary: 'hsl(221, 83%, 53%)',
    secondary: 'hsl(215, 28%, 17%)',
    accent: 'hsl(158, 64%, 52%)',
    background: 'hsl(221, 20%, 6%)',
    surface: 'hsl(221, 15%, 12%)',
    text: 'hsl(0, 0%, 95%)',
    muted: 'hsl(221, 8%, 58%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'compact',
  },
  borderRadius: 'none',
  spacing: 'tight',
  style: 'minimal',
};

export default fitnessDark;
