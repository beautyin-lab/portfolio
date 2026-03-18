import type { ThemePreset } from '../tokens/design-tokens';

const petKidsPlayful: ThemePreset = {
  id: 'pet-kids-playful',
  name: 'Pet & Kids Playful',
  colors: {
    primary: 'hsl(25, 95%, 53%)',
    secondary: 'hsl(43, 96%, 56%)',
    accent: 'hsl(35, 92%, 33%)',
    background: 'hsl(25, 40%, 97%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(25, 20%, 16%)',
    muted: 'hsl(25, 10%, 48%)',
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
