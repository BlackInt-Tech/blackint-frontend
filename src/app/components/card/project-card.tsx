import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface ProjectCardProps {
  title: string;
  industry: string;
  role: string;
  image: string;
  slug: string;
  featured?: boolean;
}

export function ProjectCard({ title, industry, role, image, slug, featured = false }: ProjectCardProps) {
  if (featured) {
    return (
      <Link to={`/work/${slug}`} className="block group">
        <motion.div
          className="relative min-h-[400px] sm:h-[70vh] overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          data-cursor="VIEW"
        >
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-xs uppercase tracking-wider text-white/60 mb-2">{industry}</div>
              <h3 className="text-5xl md:text-7xl mb-2" style={{ fontWeight: 800 }}>{title}</h3>
              <div className="text-sm uppercase tracking-wider text-[#FF4D00]">{role}</div>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link to={`/work/${slug}`} className="block group">
      <motion.div
        className="relative overflow-hidden mb-6"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        data-cursor="VIEW"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </motion.div>
      <div className="text-xs uppercase tracking-wider text-white/40 mb-2">{industry}</div>
      <h3 className="text-2xl mb-2" style={{ fontWeight: 700 }}>{title}</h3>
      <div className="text-sm text-[#FF4D00] opacity-0 group-hover:opacity-100 transition-opacity">
        {role}
      </div>
    </Link>
  );
}
