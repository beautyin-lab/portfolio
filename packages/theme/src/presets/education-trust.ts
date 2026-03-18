import type { ThemePreset } from '../tokens/design-tokens';

const educationTrust: ThemePreset = {
  id: 'education-trust',
  name: 'Education Trust',
  colors: {
    primary: 'hsl(214, 64%, 44%)',
    secondary: 'hsl(46, 76%, 52%)',
    accent: 'hsl(160, 44%, 42%)',
    background: 'hsl(214, 18%, 96%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(214, 22%, 14%)',
    muted: 'hsl(214, 10%, 48%)',
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

export default educationTrust;
