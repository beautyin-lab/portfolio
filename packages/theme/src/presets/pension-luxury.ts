import type { ThemePreset } from '../tokens/design-tokens';

const pensionLuxury: ThemePreset = {
  id: 'pension-luxury',
  name: 'Pension Luxury',
  colors: {
    primary: 'hsl(224, 64%, 33%)',
    secondary: 'hsl(44, 52%, 55%)',
    accent: 'hsl(204, 94%, 94%)',
    background: 'hsl(224, 20%, 95%)',
    surface: 'hsl(224, 10%, 99%)',
    text: 'hsl(224, 14%, 12%)',
    muted: 'hsl(224, 6%, 44%)',
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
