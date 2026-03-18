import type { ThemePreset } from '../tokens/design-tokens';

const medicalWarm: ThemePreset = {
  id: 'medical-warm',
  name: 'Medical Warm',
  colors: {
    primary: 'hsl(175, 84%, 32%)',
    secondary: 'hsl(38, 92%, 50%)',
    accent: 'hsl(330, 81%, 60%)',
    background: 'hsl(175, 30%, 97%)',
    surface: 'hsl(175, 15%, 99%)',
    text: 'hsl(175, 20%, 18%)',
    muted: 'hsl(175, 10%, 50%)',
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
