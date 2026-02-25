import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router-dom';
import { useHeaderTheme } from '../context/header-theme';
import { useEffect, useState} from "react";
import { useScroll } from "motion/react";
import { getPublishedInsights } from "../../services/insightService";
import { Insight } from "../../types/insight";

export function Insights() {
  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();

  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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

useEffect(() => {
  loadInsights(0);
}, []);

async function loadInsights(pageNumber: number) {
  try {
    setLoading(true);

    const data = await getPublishedInsights(pageNumber, 6);

    if (data.length === 0) {
      setHasMore(false);
    }

    if (pageNumber === 0) {
      setInsights(data);
    } else {
      setInsights((prev) => [...prev, ...data]);
    }

  } catch (error) {
    console.error("Insights Load Error:", error);
  } finally {
    setLoading(false);
  }
}

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
            {loading && insights.length === 0 && (
              <p className="text-black/40">Loading insights...</p>
            )}

            {!loading && insights.length === 0 && (
              <p className="text-black/40">No insights available.</p>
            )}

            {insights.map((insight, index) => (
              <motion.div
                key={insight.publicId || index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: (index % 2) * 0.1 }}
              >
                <Link
                  to={`/insights/${insight.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden aspect-[16/10] mb-6">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ImageWithFallback
                        src={insight.featuredImage}
                        alt={insight.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {insight.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs uppercase tracking-widest text-black">
                        {insight.category}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs uppercase tracking-widest text-black/40">
                      {new Date(insight.publishedAt).toLocaleDateString()}
                    </div>

                    <h2 className="text-2xl md:text-3xl group-hover:text-[#FF4D00] transition-colors duration-300" style={{ fontWeight: 700 }}>
                      {insight.title}
                    </h2>

                    <p className="text-black/60">
                      {insight.excerpt}
                    </p>

                    <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-black/60 group-hover:text-[#FF4D00] transition-colors">
                      READ MORE →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Load More Button */}
          {hasMore && (
            <motion.div
              className="text-center mt-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => {
                  const nextPage = page + 1;
                  setPage(nextPage);
                  loadInsights(nextPage);
                }}
                disabled={loading}
                className="inline-flex items-center gap-3 border border-black/20 px-8 py-4 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300"
              >
                <span className="text-sm uppercase tracking-widest">
                  {loading ? "Loading..." : "VIEW MORE INSIGHTS"}
                </span>
                <span className="text-xl">+</span>
              </button>
            </motion.div>
          )}
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
