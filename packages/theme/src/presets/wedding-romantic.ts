import type { ThemePreset } from '../tokens/design-tokens';

const weddingRomantic: ThemePreset = {
  id: 'wedding-romantic',
  name: 'Wedding Romantic',
  colors: {
    primary: 'hsl(12, 56%, 72%)',
    secondary: 'hsl(340, 36%, 68%)',
    accent: 'hsl(42, 64%, 56%)',
    background: 'hsl(20, 28%, 97%)',
    surface: 'hsl(20, 16%, 100%)',
    text: 'hsl(12, 16%, 18%)',
    muted: 'hsl(12, 8%, 52%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'spacious',
  },
  borderRadius: 'xl',
  spacing: 'relaxed',
  style: 'warm',
};

export default weddingRomantic;
