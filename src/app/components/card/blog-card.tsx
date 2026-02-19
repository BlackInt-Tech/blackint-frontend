import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  featured?: boolean;
}

export function BlogCard({ title, excerpt, category, date, image, slug, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link to={`/insights/${slug}`} className="block group">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative aspect-[16/10] overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#FF4D00] mb-4">{category}</div>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 800 }}>{title}</h2>
            <p className="text-white/60 mb-6 text-lg leading-relaxed">{excerpt}</p>
            <div className="text-sm text-white/40">{date}</div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/insights/${slug}`} className="block group">
      <motion.div
        className="relative aspect-[4/3] overflow-hidden mb-6"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
      <div className="text-xs uppercase tracking-wider text-[#FF4D00] mb-3">{category}</div>
      <h3 className="text-xl mb-3 group-hover:text-[#FF4D00] transition-colors" style={{ fontWeight: 700 }}>{title}</h3>
      <p className="text-white/60 text-sm mb-4">{excerpt}</p>
      <div className="text-xs text-white/40">{date}</div>
    </Link>
  );
}
