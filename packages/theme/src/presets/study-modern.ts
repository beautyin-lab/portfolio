import type { ThemePreset } from '../tokens/design-tokens';

const studyModern: ThemePreset = {
  id: 'study-modern',
  name: 'Study Modern',
  colors: {
    primary: 'hsl(160, 38%, 36%)',
    secondary: 'hsl(220, 20%, 44%)',
    accent: 'hsl(44, 56%, 52%)',
    background: 'hsl(160, 8%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(160, 14%, 12%)',
    muted: 'hsl(160, 6%, 48%)',
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

export default studyModern;
