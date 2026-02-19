import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ImageParallaxProps {
  src: string;
  alt: string;
  speed?: number;
}

export function ImageParallax({ src, alt, speed = 0.5 }: ImageParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y }}
      />
    </div>
  );
}
