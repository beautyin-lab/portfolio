import type { ThemePreset } from '../tokens/design-tokens';

const pensionNature: ThemePreset = {
  id: 'pension-nature',
  name: 'Pension Nature',
  colors: {
    primary: 'hsl(96, 57%, 20%)',
    secondary: 'hsl(23, 83%, 31%)',
    accent: 'hsl(32, 95%, 44%)',
    background: 'hsl(96, 18%, 96%)',
    surface: 'hsl(96, 10%, 99%)',
    text: 'hsl(96, 16%, 16%)',
    muted: 'hsl(96, 8%, 48%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'spacious',
  },
  borderRadius: 'lg',
  spacing: 'relaxed',
  style: 'warm',
};

export default pensionNature;
