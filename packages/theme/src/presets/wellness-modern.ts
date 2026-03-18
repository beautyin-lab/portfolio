import type { ThemePreset } from '../tokens/design-tokens';

const wellnessModern: ThemePreset = {
  id: 'wellness-modern',
  name: 'Wellness Modern',
  colors: {
    primary: 'hsl(172, 50%, 40%)',
    secondary: 'hsl(258, 34%, 52%)',
    accent: 'hsl(48, 60%, 56%)',
    background: 'hsl(170, 14%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(172, 20%, 14%)',
    muted: 'hsl(172, 8%, 48%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'standard',
  },
  borderRadius: 'lg',
  spacing: 'normal',
  style: 'modern',
};

export default wellnessModern;
