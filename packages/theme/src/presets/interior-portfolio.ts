import type { ThemePreset } from '../tokens/design-tokens';

const interiorPortfolio: ThemePreset = {
  id: 'interior-portfolio',
  name: 'Interior Portfolio',
  colors: {
    primary: 'hsl(0, 0%, 10%)',
    secondary: 'hsl(0, 0%, 30%)',
    accent: 'hsl(36, 44%, 48%)',
    background: 'hsl(0, 0%, 98%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(0, 0%, 8%)',
    muted: 'hsl(0, 0%, 48%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'spacious',
  },
  borderRadius: 'none',
  spacing: 'relaxed',
  style: 'minimal',
};

export default interiorPortfolio;
