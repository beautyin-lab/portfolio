import type { ThemePreset } from '../tokens/design-tokens';

const wellnessCalm: ThemePreset = {
  id: 'wellness-calm',
  name: 'Wellness Calm',
  colors: {
    primary: 'hsl(94, 14%, 43%)',
    secondary: 'hsl(39, 33%, 75%)',
    accent: 'hsl(25, 48%, 53%)',
    background: 'hsl(94, 14%, 97%)',
    surface: 'hsl(94, 8%, 100%)',
    text: 'hsl(94, 18%, 18%)',
    muted: 'hsl(94, 10%, 52%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'spacious',
  },
  borderRadius: 'xl',
  spacing: 'relaxed',
  style: 'warm',
};

export default wellnessCalm;
