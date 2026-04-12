import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`w-full mx-auto px-4 md:px-24 ${className}`}>
      {children}
    </div>
  );
}