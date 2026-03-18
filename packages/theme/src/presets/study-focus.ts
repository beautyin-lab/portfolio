import type { ThemePreset } from '../tokens/design-tokens';

const studyFocus: ThemePreset = {
  id: 'study-focus',
  name: 'Study Focus',
  colors: {
    primary: 'hsl(175, 84%, 32%)',
    secondary: 'hsl(217, 33%, 17%)',
    accent: 'hsl(198, 93%, 60%)',
    background: 'hsl(175, 15%, 96%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(175, 12%, 14%)',
    muted: 'hsl(175, 6%, 50%)',
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
