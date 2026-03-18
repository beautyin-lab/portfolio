import type { ThemePreset } from '../tokens/design-tokens';

const weddingRomantic: ThemePreset = {
  id: 'wedding-romantic',
  name: 'Wedding Romantic',
  colors: {
    primary: 'hsl(40, 55%, 37%)',
    secondary: 'hsl(48, 100%, 96%)',
    accent: 'hsl(46, 65%, 52%)',
    background: 'hsl(40, 28%, 97%)',
    surface: 'hsl(40, 16%, 100%)',
    text: 'hsl(40, 16%, 18%)',
    muted: 'hsl(40, 8%, 52%)',
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
