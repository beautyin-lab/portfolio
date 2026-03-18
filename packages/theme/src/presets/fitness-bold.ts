import type { ThemePreset } from '../tokens/design-tokens';

const fitnessBold: ThemePreset = {
  id: 'fitness-bold',
  name: 'Fitness Bold',
  colors: {
    primary: 'hsl(0, 72%, 51%)',
    secondary: 'hsl(240, 6%, 10%)',
    accent: 'hsl(46, 97%, 65%)',
    background: 'hsl(0, 0%, 98%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(0, 0%, 8%)',
    muted: 'hsl(0, 0%, 42%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'compact',
  },
  borderRadius: 'sm',
  spacing: 'tight',
  style: 'modern',
};

export default fitnessBold;
