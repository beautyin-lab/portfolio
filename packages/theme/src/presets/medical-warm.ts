import type { ThemePreset } from '../tokens/design-tokens';

const medicalWarm: ThemePreset = {
  id: 'medical-warm',
  name: 'Medical Warm',
  colors: {
    primary: 'hsl(201, 68%, 44%)',
    secondary: 'hsl(174, 52%, 48%)',
    accent: 'hsl(36, 76%, 55%)',
    background: 'hsl(40, 33%, 97%)',
    surface: 'hsl(40, 20%, 99%)',
    text: 'hsl(200, 20%, 18%)',
    muted: 'hsl(200, 10%, 50%)',
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

export default medicalWarm;
