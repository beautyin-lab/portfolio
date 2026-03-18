import type { ThemePreset } from '../tokens/design-tokens';

const studyFocus: ThemePreset = {
  id: 'study-focus',
  name: 'Study Focus',
  colors: {
    primary: 'hsl(210, 14%, 40%)',
    secondary: 'hsl(152, 32%, 44%)',
    accent: 'hsl(200, 44%, 48%)',
    background: 'hsl(210, 10%, 96%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(210, 12%, 14%)',
    muted: 'hsl(210, 6%, 50%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'compact',
  },
  borderRadius: 'md',
  spacing: 'tight',
  style: 'minimal',
};

export default studyFocus;
