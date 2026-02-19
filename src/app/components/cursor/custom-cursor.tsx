import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.hasAttribute('data-cursor') || 
          target.closest('a') || 
          target.closest('button')) {
        setCursorText(target.getAttribute('data-cursor') || '');
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.hasAttribute('data-cursor') || 
          target.closest('a') || 
          target.closest('button')) {
        setCursorText('');
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      
      {/* Middle Circle */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.8 : 1,
          borderColor: isHovering ? 'rgba(255, 77, 0, 0.8)' : 'rgba(255, 255, 255, 0.5)',
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 22,
          mass: 0.3
        }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? '#FF4D00' : '#FFFFFF',
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
          mass: 0.2
        }}
      />

      {isHovering && cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998] text-white text-xs font-medium uppercase tracking-wider"
          animate={{
            x: mousePosition.x + 20,
            y: mousePosition.y - 10,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {cursorText}
        </motion.div>
      )}
    </>
  );
}
