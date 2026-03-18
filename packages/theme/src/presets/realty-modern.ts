import type { ThemePreset } from '../tokens/design-tokens';

const realtyModern: ThemePreset = {
  id: 'realty-modern',
  name: 'Realty Modern',
  colors: {
    primary: 'hsl(220, 48%, 32%)',
    secondary: 'hsl(200, 20%, 44%)',
    accent: 'hsl(174, 52%, 42%)',
    background: 'hsl(220, 10%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(220, 20%, 12%)',
    muted: 'hsl(220, 8%, 50%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'compact',
  },
  borderRadius: 'lg',
  spacing: 'tight',
  style: 'modern',
};

export default realtyModern;
