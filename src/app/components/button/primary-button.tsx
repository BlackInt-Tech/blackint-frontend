import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  asLink?: boolean;
  to?: string;
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  className?: string;
}

export function PrimaryButton({ 
  children, 
  onClick, 
  asLink = false, 
  to = '#',
  size = 'md',
  showArrow = false,
  className = ''
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-6 text-lg',
  };

  const baseClasses = `inline-flex items-center gap-3 bg-[#FF4D00] text-black font-medium uppercase tracking-wider hover:bg-[#ff6a2e] transition-all duration-300 ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && (
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight size={18} />
        </motion.span>
      )}
    </>
  );

  if (asLink && to) {
    return (
      <Link to={to} className={baseClasses}>
        {content}
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
      {content}
    </motion.button>
  );
}
