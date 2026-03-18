import type { ThemePreset } from '../tokens/design-tokens';

const interiorMinimal: ThemePreset = {
  id: 'interior-minimal',
  name: 'Interior Minimal',
  colors: {
    primary: 'hsl(30, 8%, 22%)',
    secondary: 'hsl(30, 12%, 52%)',
    accent: 'hsl(24, 30%, 42%)',
    background: 'hsl(30, 10%, 96%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(30, 6%, 10%)',
    muted: 'hsl(30, 4%, 50%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'standard',
  },
  borderRadius: 'sm',
  spacing: 'normal',
  style: 'modern',
};

export default interiorMinimal;
