import type { ThemePreset } from '../tokens/design-tokens';

const interiorPortfolio: ThemePreset = {
  id: 'interior-portfolio',
  name: 'Interior Portfolio',
  colors: {
    primary: 'hsl(240, 6%, 10%)',
    secondary: 'hsl(0, 0%, 98%)',
    accent: 'hsl(0, 0%, 64%)',
    background: 'hsl(240, 4%, 12%)',
    surface: 'hsl(240, 3%, 18%)',
    text: 'hsl(0, 0%, 96%)',
    muted: 'hsl(240, 3%, 56%)',
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
