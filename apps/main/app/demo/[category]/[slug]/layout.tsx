import { notFound } from 'next/navigation';
import { getSiteConfig } from '@portfolio/data';
import { ThemeWrapper } from '../../_components/theme-wrapper';
import { ArchetypeShell } from '../../_components/archetype-shell';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ category: string; slug: string }>;
}

export default async function DemoSiteLayout({ children, params }: LayoutProps) {
  const { category, slug } = await params;
  const config = getSiteConfig(category, slug);
  if (!config) return notFound();

  return (
    <ThemeWrapper config={config}>
      <ArchetypeShell config={config}>{children}</ArchetypeShell>
    </ThemeWrapper>
  );
}
