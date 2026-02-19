import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router-dom';
import { useHeaderTheme } from '../context/header-theme';
import { useEffect } from "react";
import { useScroll } from "motion/react";

const insights = [
  {
    title: 'Where AI Meets Growth: Future-Ready Marketing for B2B Companies',
    category: 'Marketing',
    date: 'Feb 2, 2026',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
    slug: 'ai-meets-growth',
  },
  {
    title: 'Modern B2B Brands: Building Trust in the Digital Age',
    category: 'Branding',
    date: 'Jan 28, 2026',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
    slug: 'modern-b2b-brands',
  },
  {
    title: 'The Modern Web Playbook: Launching a SaaS Site',
    category: 'Web Design',
    date: 'Jan 20, 2026',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
    slug: 'modern-web-playbook',
  },
  {
    title: 'Building a Thriving Partnership with Your Digital Agency',
    category: 'Business',
    date: 'Jan 15, 2026',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
    slug: 'building-partnership',
  },
  {
    title: 'Design Systems: The Foundation of Scalable Digital Products',
    category: 'Design',
    date: 'Jan 10, 2026',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
    slug: 'design-systems',
  },
  {
    title: 'Web Performance Optimization: Speed Matters',
    category: 'Development',
    date: 'Jan 5, 2026',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
    slug: 'web-performance',
  },
];

export function Insights() {
  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();
  useEffect(() => {
  setTheme("inverse");

  const unsubscribe = scrollY.on("change", (y) => {
    if (y < window.innerHeight * 3.62) {
      setTheme("inverse");
    }  else if(y < window.innerHeight * 4.4){
      setTheme("primary");
    } else {
      setTheme("inverse");
    }
  });

  return () => unsubscribe();
}, [scrollY, setTheme]);

  return (
    <>
      <ScrollIndicator />
      
      {/* Hero Section */}
      <Section className="pt-32 md:pt-40 pb-20 bg-white text-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl mb-8 leading-[1.1]" style={{ fontWeight: 700 }}>
              Latest Insights
            </h1>
            <p className="text-xl md:text-2xl text-black/60 max-w-3xl">
              Our thoughts and perspectives on digital.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Insights Grid */}
      <Section className="bg-white text-black pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.slug}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: (index % 2) * 0.1 }}
              >
                <Link
                  to={`/insights/${insight.slug}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[16/10] mb-6">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ImageWithFallback
                        src={insight.image}
                        alt={insight.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs uppercase tracking-widest text-black">
                      {insight.category}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <div className="text-xs uppercase tracking-widest text-black/40">
                      {insight.date}
                    </div>
                    <h2 className="text-2xl md:text-3xl group-hover:text-[#FF4D00] transition-colors duration-300" style={{ fontWeight: 700 }}>
                      {insight.title}
                    </h2>
                    <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-black/60 group-hover:text-[#FF4D00] transition-colors">
                      READ MORE
                      <motion.span
                        className="text-lg"
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Load More Button */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button className="inline-flex items-center gap-3 border border-black/20 px-8 py-4 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300">
              <span className="text-sm uppercase tracking-widest">VIEW MORE INSIGHTS</span>
              <span className="text-xl">+</span>
            </button>
          </motion.div>
        </Container>
      </Section>

      {/* Newsletter Section */}
      <Section className="bg-black text-white py-32">
        <Container>
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8">
              STAY UPDATED
            </div>
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight" style={{ fontWeight: 700 }}>
              Subscribe to our newsletter
            </h2>
            <p className="text-xl text-white/60 mb-12 leading-relaxed">
              Get the latest insights, articles, and resources delivered to your inbox.
            </p>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#FF4D00] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#FF4D00] text-white px-8 py-4 hover:bg-[#ff6a2d] transition-colors uppercase tracking-widest text-sm"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white text-black py-32">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl mb-12 leading-tight max-w-4xl mx-auto" style={{ fontWeight: 700 }}>
              Have a project in mind?
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-black/20 px-8 py-4 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300"
            >
              <span className="text-sm uppercase tracking-widest">LET'S TALK</span>
              <span className="text-xl">+</span>
            </Link>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
