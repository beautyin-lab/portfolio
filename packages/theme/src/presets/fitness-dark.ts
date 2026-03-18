import type { ThemePreset } from '../tokens/design-tokens';

const fitnessDark: ThemePreset = {
  id: 'fitness-dark',
  name: 'Fitness Dark',
  colors: {
    primary: 'hsl(4, 76%, 56%)',
    secondary: 'hsl(0, 0%, 18%)',
    accent: 'hsl(45, 100%, 52%)',
    background: 'hsl(0, 0%, 6%)',
    surface: 'hsl(0, 0%, 12%)',
    text: 'hsl(0, 0%, 95%)',
    muted: 'hsl(0, 0%, 58%)',
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
