import type { ThemePreset } from '../tokens/design-tokens';

const realtyTrust: ThemePreset = {
  id: 'realty-trust',
  name: 'Realty Trust',
  colors: {
    primary: 'hsl(214, 52%, 25%)',
    secondary: 'hsl(215, 20%, 65%)',
    accent: 'hsl(161, 94%, 30%)',
    background: 'hsl(214, 18%, 96%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(214, 24%, 14%)',
    muted: 'hsl(214, 10%, 48%)',
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
