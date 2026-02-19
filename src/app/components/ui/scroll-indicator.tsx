import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
      {/* Progress bar */}
      <div className="w-[1px] h-24 md:h-32 bg-white/20 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-[#FF4D00]"
          style={{ height: `${scrollProgress}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>
      
      {/* SCROLL text */}
      <div 
        className="text-[10px] uppercase tracking-widest text-white/40"
        style={{ 
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }}
      >
        SCROLL
      </div>
      
      {/* Animated dot */}
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-white/40"
        animate={{
          y: [0, 8, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
