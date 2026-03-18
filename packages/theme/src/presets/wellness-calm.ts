import type { ThemePreset } from '../tokens/design-tokens';

const wellnessCalm: ThemePreset = {
  id: 'wellness-calm',
  name: 'Wellness Calm',
  colors: {
    primary: 'hsl(262, 36%, 58%)',
    secondary: 'hsl(168, 42%, 52%)',
    accent: 'hsl(300, 20%, 64%)',
    background: 'hsl(270, 20%, 97%)',
    surface: 'hsl(270, 10%, 100%)',
    text: 'hsl(262, 18%, 18%)',
    muted: 'hsl(262, 10%, 52%)',
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
