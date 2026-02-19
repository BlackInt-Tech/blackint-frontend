import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function Section({ children, className = '', fullHeight = false }: SectionProps) {
  return (
    <section className={`py-16 md:py-[120px] ${fullHeight ? 'min-h-screen' : ''} ${className}`}>
      {children}
    </section>
  );
}