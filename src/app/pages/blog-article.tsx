import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHeaderTheme } from '../context/header-theme';
import { useEffect } from "react";
import { useScroll } from "motion/react";

export function BlogArticle() {
  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();
  useEffect(() => {
  setTheme("primary");

  const unsubscribe = scrollY.on("change", (y) => {
    if (y < window.innerHeight * 2.25) {
      setTheme("primary");
    } else if (y < window.innerHeight * 4.59) {
      setTheme("inverse");
    } else {
      setTheme("primary");
    }
  });

  return () => unsubscribe();
}, [scrollY, setTheme]);

  return (
    <>
      <ScrollIndicator />
      
      {/* Back Button */}
      <Section className="pt-32 bg-black">
        <Container>
          <Link to="/insights" className="inline-flex items-center gap-2 text-white/60 hover:text-[#FF4D00] transition-colors">
            <ArrowLeft size={20} />
            Back to Insights
          </Link>
        </Container>
      </Section>

      {/* Article Header */}
      <Section className="bg-black pt-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-xl uppercase tracking-[0.3em] text-[#FF4D00] mb-6">DESIGN</div>
              <h1 className="text-5xl md:text-7xl mb-6 leading-tight" style={{ fontWeight: 900 }}>
                The Future of Digital Design in 2026
              </h1>
              <div className="flex items-center gap-6 text-white/60 text-sm mb-12">
                <span>February 8, 2026</span>
                <span>•</span>
                <span>8 min read</span>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Featured Image */}
      <Section className="py-0 bg-black pb-12">
        <Container>
          <motion.div
            className="aspect-[21/9] overflow-hidden mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
              alt="Article"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </Container>
      </Section>

      {/* Article Content */}
      <Section className="bg-white text-black py-32">
        <Container>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8 text-black/80 leading-relaxed"
            >
              <p className="text-2xl leading-relaxed text-black/90">
                The digital design landscape is evolving at an unprecedented pace. As we move through 2026, we're witnessing a fundamental shift in how we approach user experience, visual design, and the technology that powers our digital products.
              </p>

              <p className="text-lg">
                Artificial intelligence has moved from being a buzzword to an essential tool in every designer's arsenal. But this isn't about AI replacing designers—it's about augmenting our capabilities and allowing us to focus on what truly matters: creating meaningful experiences for real people.
              </p>

              <h2 className="text-4xl mt-16 mb-6 text-black" style={{ fontWeight: 700 }}>
                The Rise of Motion-First Design
              </h2>

              <p className="text-lg">
                Static designs are becoming a thing of the past. Users now expect fluid, responsive interfaces that react to their every interaction. Motion design isn't just about making things look pretty—it's about creating intuitive feedback systems that guide users through complex interactions.
              </p>

              <p className="text-lg">
                We're seeing brands invest heavily in motion design systems, treating animation as a core component of their design language rather than an afterthought. This shift requires designers to think in four dimensions: adding time to width, height, and depth.
              </p>

              <h2 className="text-4xl mt-16 mb-6 text-black" style={{ fontWeight: 700 }}>
                Accessibility is Non-Negotiable
              </h2>

              <p className="text-lg">
                Inclusive design has moved from a nice-to-have to an absolute requirement. With stricter regulations and a growing awareness of digital accessibility, designers must consider all users from the very beginning of the design process.
              </p>

              <p className="text-lg">
                This means thinking beyond WCAG compliance checklists and truly understanding the diverse ways people interact with digital products. Voice interfaces, alternative input methods, and adaptive interfaces are becoming standard considerations.
              </p>

              <h2 className="text-4xl mt-16 mb-6 text-black" style={{ fontWeight: 700 }}>
                The Future is Minimal
              </h2>

              <p className="text-lg">
                Paradoxically, as technology becomes more complex, successful digital experiences are becoming simpler. The best interfaces disappear, allowing users to focus entirely on their tasks without cognitive overload.
              </p>

              <p className="text-lg">
                This minimalist approach isn't about removing features—it's about intelligent hierarchy, progressive disclosure, and ruthless prioritization. Every element must earn its place on the screen.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Related Articles */}
      <Section className="bg-black py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-4xl md:text-5xl" style={{ fontWeight: 700 }}>
              Related Articles
            </h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Where AI Meets Growth',
                category: 'Marketing',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              },
              {
                title: 'Modern B2B Brands',
                category: 'Branding',
                image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
              },
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to="/insights">
                  <div className="aspect-[16/10] overflow-hidden mb-4">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/40 mb-2">
                    {article.category}
                  </div>
                  <h4 className="text-2xl group-hover:text-[#FF4D00] transition-colors" style={{ fontWeight: 600 }}>
                    {article.title}
                  </h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
