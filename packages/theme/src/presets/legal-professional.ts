import type { ThemePreset } from '../tokens/design-tokens';

const legalProfessional: ThemePreset = {
  id: 'legal-professional',
  name: 'Legal Professional',
  colors: {
    primary: 'hsl(220, 56%, 22%)',
    secondary: 'hsl(43, 74%, 49%)',
    accent: 'hsl(220, 40%, 38%)',
    background: 'hsl(220, 14%, 96%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(220, 30%, 12%)',
    muted: 'hsl(220, 10%, 46%)',
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
