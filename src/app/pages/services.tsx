import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useHeaderTheme } from '../context/header-theme';
import { useEffect, useState } from 'react';
import { useScroll } from "motion/react";
import { getPublishedOfferings } from "../../services/offeringService";
import { Offering } from "../../types/offering";

export function Services() {
  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();

  const [services, setServices] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setTheme("inverse");

  const unsubscribe = scrollY.on("change", (y) => {
    if (y < window.innerHeight * 5.3) {
      setTheme("inverse");
    } else {
      setTheme("primary");
    }
  });

  return () => unsubscribe();
}, [scrollY, setTheme]);

useEffect(() => {
  async function loadServices() {
    try {
      setLoading(true);
      const data = await getPublishedOfferings();
      setServices(data || []);
    } catch (error) {
      console.error("Services Load Error:", error);
    } finally {
      setLoading(false);
    }
  }

  loadServices();
}, []);

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
            className="max-w-5xl"
          >
            <div className="text-s uppercase tracking-[0.3em] text-[#FF4D00] mb-8">
              WHAT WE DO
            </div>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[1.1]" style={{ fontWeight: 700 }}>
              We build <br />
              impactful 
              experiences.
            </h1>
            <p className="text-xl md:text-2xl text-black/60 max-w-3xl leading-relaxed">
              Through great UX, design, and development, we help brands create meaningful connections with their audiences.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Featured Image Section */}
      <Section className="bg-white text-black pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden aspect-[21/9]"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
              alt="Our services"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </Container>
      </Section>

      {/* Services List */}
      <Section className="bg-white text-black pb-32">
        <Container>
          <div className="text-xl md:text-2xl uppercase tracking-[0.3em] text-[#FF4D00] mb-8">
              SERVICES WE OFFER
            </div>
          <div className="space-y-20 md:space-y-32">
            {loading && services.length === 0 && (
              <p className="text-black/40">Loading services...</p>
            )}

            {!loading && services.length === 0 && (
              <p className="text-black/40">No services available.</p>
            )}

            {services.length > 0 &&
              services.map((service, index) => (
                <motion.div
                  key={service.publicId || index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-black/10 pt-12"
                >
                  {/* Auto Number */}
                  <div className="md:col-span-2">
                    <div
                      className="text-6xl md:text-8xl text-black/40"
                      style={{ fontWeight: 700 }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-10 space-y-8">
                    <div>
                      <h2
                        className="text-4xl md:text-6xl mb-6"
                        style={{ fontWeight: 700 }}
                      >
                        {service.title}
                      </h2>

                      <ImageWithFallback
                        src={service.featuredImage}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />

                      <p className="text-xl text-black/60 leading-relaxed max-w-3xl">
                        {service.shortDescription}
                      </p>

                      {service.price && (
                        <motion.div
                          className="mt-6 relative inline-block"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          {/* Pulse Glow Background */}
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-[#FF4D00]"
                            animate={{
                              opacity: [0.4, 0.8, 0.4],
                              scale: [1, 1.08, 1],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            style={{ filter: "blur(18px)" }}
                          />

                          {/* Glass Badge */}
                          <div
                            className="
                              relative 
                              bg-[#FF4D00]/80
                              backdrop-blur-md
                              border border-white/20
                              text-black
                              px-6 py-3
                              rounded-xl
                              font-bold
                              text-sm md:text-base
                              tracking-wide
                              shadow-lg
                              transition-all duration-300
                            "
                          >
                            {service.price}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Optional full content preview */}
                    <p className="text-black/50 max-w-3xl">
                      {service.fullContent}
                    </p>
                  </div>
                </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process Section */}
      <Section className="bg-black text-white py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="text-s uppercase tracking-[0.3em] text-[#FF4D00] mb-8">
              OUR PROCESS
            </div>
            <h2 className="text-4xl md:text-6xl mb-12 leading-tight" style={{ fontWeight: 700 }}>
              We follow a proven process to deliver exceptional results.
            </h2>
            <p className="text-xl text-white/60 leading-relaxed mb-12">
              From initial discovery to launch and beyond, we work closely with our clients to ensure every project is a success.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
              {['Discover', 'Design', 'Develop', 'Deploy'].map((phase, index) => (
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl mb-4 text-[#FF4D00]" style={{ fontWeight: 900 }}>
                    0{index + 1}
                  </div>
                  <div className="text-lg" style={{ fontWeight: 600 }}>
                    {phase}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-[#FF4D00] text-white py-32">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl mb-12 leading-tight max-w-4xl mx-auto" style={{ fontWeight: 700 }}>
              Let's build something amazing together.
            </h2>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 border-2 border-white px-10 py-5 hover:bg-white hover:text-[#FF4D00] transition-all duration-300 text-lg uppercase tracking-widest"
            >
              START A PROJECT
            </a>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
