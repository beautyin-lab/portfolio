import type { ThemePreset } from '../tokens/design-tokens';

const pensionNature: ThemePreset = {
  id: 'pension-nature',
  name: 'Pension Nature',
  colors: {
    primary: 'hsl(152, 44%, 38%)',
    secondary: 'hsl(30, 36%, 44%)',
    accent: 'hsl(82, 40%, 50%)',
    background: 'hsl(90, 18%, 96%)',
    surface: 'hsl(60, 14%, 99%)',
    text: 'hsl(150, 16%, 16%)',
    muted: 'hsl(150, 8%, 48%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'spacious',
  },
  borderRadius: 'lg',
  spacing: 'relaxed',
  style: 'warm',
};

export default pensionNature;
