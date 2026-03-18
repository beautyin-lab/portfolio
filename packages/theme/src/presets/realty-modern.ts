import type { ThemePreset } from '../tokens/design-tokens';

const realtyModern: ThemePreset = {
  id: 'realty-modern',
  name: 'Realty Modern',
  colors: {
    primary: 'hsl(161, 94%, 30%)',
    secondary: 'hsl(138, 76%, 97%)',
    accent: 'hsl(226, 71%, 40%)',
    background: 'hsl(161, 20%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(161, 20%, 12%)',
    muted: 'hsl(161, 8%, 50%)',
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
