import type { ThemePreset } from '../tokens/design-tokens';

const legalProfessional: ThemePreset = {
  id: 'legal-professional',
  name: 'Legal Professional',
  colors: {
    primary: 'hsl(214, 52%, 25%)',
    secondary: 'hsl(43, 89%, 38%)',
    accent: 'hsl(0, 100%, 27%)',
    background: 'hsl(214, 14%, 96%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(214, 30%, 12%)',
    muted: 'hsl(214, 10%, 46%)',
  },
  typography: {
    heading: "'Pretendard', sans-serif",
    body: "'Pretendard', sans-serif",
    scale: 'standard',
  },
  borderRadius: 'sm',
  spacing: 'normal',
  style: 'professional',
};

export default legalProfessional;
