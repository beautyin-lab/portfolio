import type { ThemePreset } from '../tokens/design-tokens';

const medicalClean: ThemePreset = {
  id: 'medical-clean',
  name: 'Medical Clean',
  colors: {
    primary: 'hsl(221, 83%, 53%)',
    secondary: 'hsl(189, 94%, 43%)',
    accent: 'hsl(160, 84%, 39%)',
    background: 'hsl(221, 40%, 98%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(221, 24%, 16%)',
    muted: 'hsl(221, 12%, 55%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'standard',
  },
  borderRadius: 'md',
  spacing: 'normal',
  style: 'professional',
};

export default medicalClean;
