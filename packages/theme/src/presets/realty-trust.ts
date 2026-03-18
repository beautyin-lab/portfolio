import type { ThemePreset } from '../tokens/design-tokens';

const realtyTrust: ThemePreset = {
  id: 'realty-trust',
  name: 'Realty Trust',
  colors: {
    primary: 'hsl(215, 56%, 38%)',
    secondary: 'hsl(210, 16%, 52%)',
    accent: 'hsl(38, 68%, 50%)',
    background: 'hsl(216, 18%, 96%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(215, 24%, 14%)',
    muted: 'hsl(215, 10%, 48%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'standard',
  },
  borderRadius: 'md',
  spacing: 'normal',
  style: 'professional',
};

export default realtyTrust;
