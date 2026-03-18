import type { ThemePreset } from '../tokens/design-tokens';

const studyModern: ThemePreset = {
  id: 'study-modern',
  name: 'Study Modern',
  colors: {
    primary: 'hsl(242, 47%, 34%)',
    secondary: 'hsl(270, 100%, 98%)',
    accent: 'hsl(262, 83%, 58%)',
    background: 'hsl(242, 20%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(242, 14%, 12%)',
    muted: 'hsl(242, 6%, 48%)',
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
