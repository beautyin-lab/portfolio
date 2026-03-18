import type { ThemePreset } from '../tokens/design-tokens';

const educationBright: ThemePreset = {
  id: 'education-bright',
  name: 'Education Bright',
  colors: {
    primary: 'hsl(220, 72%, 52%)',
    secondary: 'hsl(48, 88%, 50%)',
    accent: 'hsl(340, 60%, 54%)',
    background: 'hsl(48, 30%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(220, 20%, 14%)',
    muted: 'hsl(220, 8%, 48%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'spacious',
  },
  borderRadius: 'lg',
  spacing: 'relaxed',
  style: 'playful',
};

export default educationBright;
