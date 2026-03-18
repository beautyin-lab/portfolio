import type { ThemePreset } from '../tokens/design-tokens';

const petKidsPlayful: ThemePreset = {
  id: 'pet-kids-playful',
  name: 'Pet & Kids Playful',
  colors: {
    primary: 'hsl(24, 88%, 56%)',
    secondary: 'hsl(330, 66%, 58%)',
    accent: 'hsl(50, 92%, 54%)',
    background: 'hsl(40, 40%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(24, 20%, 16%)',
    muted: 'hsl(24, 10%, 48%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'spacious',
  },
  borderRadius: 'full',
  spacing: 'relaxed',
  style: 'playful',
};

export default petKidsPlayful;
