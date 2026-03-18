import type { ThemePreset } from '../tokens/design-tokens';

const medicalClean: ThemePreset = {
  id: 'medical-clean',
  name: 'Medical Clean',
  colors: {
    primary: 'hsl(207, 90%, 54%)',
    secondary: 'hsl(199, 89%, 48%)',
    accent: 'hsl(168, 76%, 42%)',
    background: 'hsl(210, 40%, 98%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(210, 24%, 16%)',
    muted: 'hsl(210, 12%, 55%)',
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
