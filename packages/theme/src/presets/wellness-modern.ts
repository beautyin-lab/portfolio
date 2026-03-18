import type { ThemePreset } from '../tokens/design-tokens';

const wellnessModern: ThemePreset = {
  id: 'wellness-modern',
  name: 'Wellness Modern',
  colors: {
    primary: 'hsl(335, 78%, 42%)',
    secondary: 'hsl(217, 19%, 27%)',
    accent: 'hsl(327, 87%, 82%)',
    background: 'hsl(335, 14%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(335, 20%, 14%)',
    muted: 'hsl(335, 8%, 48%)',
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
