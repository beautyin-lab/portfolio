import type { ThemePreset } from '../tokens/design-tokens';

const pensionLuxury: ThemePreset = {
  id: 'pension-luxury',
  name: 'Pension Luxury',
  colors: {
    primary: 'hsl(160, 30%, 28%)',
    secondary: 'hsl(38, 56%, 48%)',
    accent: 'hsl(24, 44%, 40%)',
    background: 'hsl(40, 20%, 95%)',
    surface: 'hsl(40, 12%, 99%)',
    text: 'hsl(160, 14%, 12%)',
    muted: 'hsl(160, 6%, 44%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'standard',
  },
  borderRadius: 'md',
  spacing: 'relaxed',
  style: 'luxury',
};

export default pensionLuxury;
