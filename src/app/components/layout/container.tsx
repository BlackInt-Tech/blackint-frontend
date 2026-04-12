import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={`
        w-full 
        mx-auto 
        max-w-[1280px]
        px-4 md:px-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}