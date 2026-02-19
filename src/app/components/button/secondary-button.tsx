import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface SecondaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  asLink?: boolean;
  to?: string;
  className?: string;
}

export function SecondaryButton({ 
  children, 
  onClick, 
  asLink = false, 
  to = '#',
  className = ''
}: SecondaryButtonProps) {
  const baseClasses = `inline-block border border-white text-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 ${className}`;

  if (asLink && to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
