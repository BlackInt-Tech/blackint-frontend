import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link?: string;
}

export function ServiceCard({ icon, title, description, link }: ServiceCardProps) {
  return (
    <motion.div
      className="border border-white/10 p-8 hover:border-[#FF4D00] transition-all duration-500 group"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-white/40 mb-6 group-hover:text-[#FF4D00] transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl mb-4" style={{ fontWeight: 700 }}>{title}</h3>
      <p className="text-white/60 mb-6 leading-relaxed">{description}</p>
      {link && (
        <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#FF4D00] group-hover:gap-4 transition-all">
          Learn More
          <ArrowRight size={16} />
        </div>
      )}
    </motion.div>
  );
}
