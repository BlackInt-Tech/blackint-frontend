import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [animationStage, setAnimationStage] = useState<'letters' | 'complete'>('letters');
  const [visibleLetters, setVisibleLetters] = useState(0);
  
  const text = 'BLACKINT';
  const letters = text.split('');

  useEffect(() => {
    // Animate letters one by one
    const letterInterval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev >= letters.length) {
          clearInterval(letterInterval);
          // Wait a bit after all letters are shown, then exit
          setTimeout(() => {
            setAnimationStage('complete');
            setTimeout(onComplete, 1000);
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(letterInterval);
  }, [letters.length, onComplete]);

  return (
    <AnimatePresence>
      {animationStage !== 'complete' && (
        <motion.div
          className="fixed inset-0 bg-black z-[100] flex items-center justify-center px-6"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center">
            <div className="text-6xl md:text-9xl tracking-tight flex justify-center items-center" style={{ fontWeight: 900 }}>
              {letters.map((letter, index) => {
                const isOrange = index >= 5; // INT letters (indices 5, 6, 7)
                const isVisible = index < visibleLetters;
                
                return (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={isVisible ? { 
                      opacity: 1, 
                      y: 0, 
                      rotateX: 0 
                    } : {}}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.08 * index
                    }}
                    className={isOrange ? 'text-[#FF4D00]' : 'text-white'}
                    style={{ 
                      display: 'inline-block',
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'center bottom'
                    }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </div>
            
            <motion.div
              className="mt-12 text-xs uppercase tracking-widest text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Creative Technology Studio
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
