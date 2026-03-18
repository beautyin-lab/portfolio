import { LayoutShell } from '../layout-shell';

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutShell>{children}</LayoutShell>;
}
