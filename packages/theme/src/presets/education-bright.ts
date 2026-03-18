import type { ThemePreset } from '../tokens/design-tokens';

const educationBright: ThemePreset = {
  id: 'education-bright',
  name: 'Education Bright',
  colors: {
    primary: 'hsl(221, 83%, 53%)',
    secondary: 'hsl(46, 97%, 65%)',
    accent: 'hsl(25, 95%, 53%)',
    background: 'hsl(221, 30%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(221, 20%, 14%)',
    muted: 'hsl(221, 8%, 48%)',
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
