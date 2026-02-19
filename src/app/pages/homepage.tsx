import { motion } from "motion/react";
import { Container } from "../components/layout/container";
import { Section } from "../components/layout/section";
import { ScrollIndicator } from "../components/ui/scroll-indicator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useHeaderTheme } from "../context/header-theme";
import { useEffect, useState } from "react";
import { useScroll } from "motion/react";
import { getPublishedProjects } from "../../services/projectService";
import { getPublishedOfferings } from "../../services/offeringService";

const insights = [
  {
    title: 'Where AI Meets Growth: Future-Ready Marketing for B2B Companies',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    title: 'Modern B2B Brands',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    title: 'The Power of Storytelling in B2B Marketing',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    title: 'Designing for Conversion: How to Create a High-Performing B2B Website',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  }
];

export function Homepage() {

const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
const [services, setServices] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();

  useEffect(() => {
    async function loadData() {
      try {
        const projects = await getPublishedProjects();
        const offerings = await getPublishedOfferings();

        setFeaturedProjects(projects);
        setServices(offerings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);
  
  useEffect(() => {

    setTheme("primary");

    const unsubscribe = scrollY.on("change", (y) => {
      if (y < window.innerHeight * 0.9) {
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
      <Section
        fullHeight
        className="relative flex items-center bg-black overflow-hidden px-6 sm:px-10 md:px-12 lg:px-0"
      >
        {/* SVG CIRCLE */}
        <motion.svg
          viewBox="-120 -120 1200 1200"
          className="absolute 
                     w-[500px] h-[500px] 
                     sm:w-[650px] sm:h-[650px] 
                     md:w-[800px] md:h-[800px] 
                     lg:w-[900px] lg:h-[900px]
                     right-[-120px] bottom-[-120px]
                     pointer-events-none z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.circle
            cx="500"
            cy="400"
            r="620"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 24,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.svg>
        {/* Subtle ambient orange glow */}
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#FF4D00] blur-[120px]"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.12, 0.08] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

        {/* CONTENT */}
        <Container className="relative z-10">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <motion.div
              className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-8 sm:mb-10 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              WE ARE BLACK<span className="text-[#FF4D00]">INT</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl leading-[1.1] mb-6 sm:mb-8"
              style={{ fontWeight: 700 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              A digital agency<br />focused on web.
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              We are a creative team of designers, developers, strategists,
              and producers building elevated websites in the heart of Silicon Valley.
            </motion.p>

            {/* CTA */}
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/20 px-6 sm:px-8 py-3 sm:py-4 hover:border-[#FF4D00] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <span className="text-xs sm:text-sm uppercase tracking-widest">
                GET TO KNOW US
              </span>
              <span className="text-lg sm:text-xl">+</span>
            </motion.a>
          </div>
        </Container>

        {/* Decorative dots — unchanged */}
              <motion.div
                className="absolute right-[15%] top-[30%] grid grid-cols-3 gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/20"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                  />
                ))}
              </motion.div>

        {/* STAR CLUSTER — bottom left */}
              <div className="absolute inset-0 pointer-events-none z-[2]">
                <motion.div
                  className="absolute left-12 bottom-32 grid grid-cols-4 gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {[...Array(14)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-[#FF6E00] text-xs"
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 12,
                        delay: i * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ⭑
                      </motion.span>
                  ))}
                </motion.div>
              </div>
      </Section>

      {/* =========================================
          FEATURED WORK
      ========================================== */}
      <Section className="bg-white text-black py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-10 md:px-12 lg:px-0"
        onViewportEnter={() => setTheme("inverse")}
        onViewportLeave={() => setTheme("primary")}>
        <Container>
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 font-bold">
            Featured Work
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}              
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={project.featuredImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                {/* <div className="mt-6 text-xs uppercase tracking-widest text-black/80">
                  {project.category}
                </div> */}

                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 group-hover:text-[#FF4D00] transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm sm:text-base text-black/60 mt-2">
                  {project.shortDescription}
                </p>
              </motion.div>
            ))}
          </div>
          </motion.div>
        </Container>
      </Section>

{/* Final CTA Section */}
      <Section className="relative py-20 sm:py-24 md:py-32 overflow-hidden px-6 sm:px-8 md:px-0">
        {/* Animated orange background */}
        <motion.div
          className="absolute inset-0 bg-[#FF4D00]"
          initial={{ x: "-100%" }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <Container>
          <div className="relative z-10 text-white">
            {/* Eyebrow text — slides left to right */}
            <motion.div
              className="text-s uppercase tracking-[0.3em] mb-8 text-white/80"
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
            >
              A DIGITAL AGENCY
            </motion.div>

            {/* Description — left aligned */}
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl mb-12 sm:mb-14 md:mb-16 leading-tight max-w-5xl text-left"
              style={{ fontWeight: 700 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              We are a web design and development company, building websites that drive
              traffic, engagement, and conversion for industry-leading brands and
              startups in Silicon Valley.
            </motion.h2>
          </div>
        </Container>

        {/* Decorative gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </Section>

      {/* =========================================
          SERVICES SECTION
      ========================================== */}
      <Section className="bg-white text-black py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-10 md:px-12 lg:px-0">
        <Container>
          <div className="relative">
            {/* Background text */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[18vw] md:text-[20vw]
 font-bold text-black/[0.02] whitespace-nowrap pointer-events-none select-none">
              Services
            </div>

            {/* Section header */}
            <motion.div
              className="mb-24 relative z-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-l uppercase tracking-[0.3em] text-[#FF4D00] mb-6 font-bold">
                WHAT WE DO
              </div>
              <p className="text-2xl md:text-3xl max-w-3xl leading-relaxed font-bold text-black/80">
                We design and build digital experiences that elevate brands and drive
                measurable business outcomes.
              </p>
            </motion.div>

          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={service.reverse ? "md:order-2" : ""}>
                  <div className="text-xs uppercase tracking-[0.3em] text-[#FF4D00] mb-4">
                    {service.title}
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-6 group-hover:text-[#FF4D00] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-base sm:text-lg text-black/60">
                    {service.shortDescription}
                  </p>
                </div>

                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    service.reverse ? "md:order-1" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={service.featuredImage}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* CTA */}
            <motion.div
              className="mt-32 text-center relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <a
                href="/services"
                className="inline-flex items-center gap-3 border border-black/20 px-10 py-5 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300"
              >
                <span className="text-sm uppercase tracking-widest">
                  VIEW ALL SERVICES
                </span>
                <span className="text-xl">+</span>
              </a>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* =========================================
          INSIGHTS
      ========================================== */}
      <Section className="bg-white text-black py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-10 md:px-12 lg:px-0">
        <Container>
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 font-bold">
            Latest Insights
          </h2>
            <p className="text-lg text-black/60 max-w-2xl">
              Our thoughts and perspectives on digital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                // className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={insight.image}
                      alt={insight.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl mt-6 group-hover:text-[#FF4D00] transition-colors font-semibold">
                  {insight.title}
                </h3>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="/insights"
              className="inline-flex items-center gap-3 border border-black/20 px-8 py-4 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300"
            >
              <span className="text-sm uppercase tracking-widest">VIEW MORE INSIGHTS</span>
              <span className="text-xl">+</span>
            </a>
          </motion.div>
        </Container>
      </Section>

      {/* Footer CTA with Wave Text */}
      <Section className="bg-black py-20 sm:py-24 md:py-32 px-6 sm:px-8 md:px-0"
              onViewportEnter={() => setTheme("primary")}>
        <Container>
          <div className="text-center">
            <motion.div
              className="overflow-hidden mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-6xl md:text-8xl inline-flex flex-wrap justify-center" style={{ fontWeight: 900 }}>
                {"LET'S TALK".split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ y: 100 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{
                      y: -20,
                      color: '#FF4D00',
                      transition: { duration: 0.3 }
                    }}
                    style={{ cursor: 'default' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h2>
              </motion.div>
              {/* ✅ START A PROJECT Button (Below LET'S TALK) */}
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-3 border border-white/20 
                          px-8 sm:px-10 py-4 sm:py-5 
                          hover:border-[#FF4D00] hover:text-[#FF4D00] 
                          transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="text-xs sm:text-sm uppercase tracking-widest">
                  START A PROJECT
                </span>
                <span className="text-lg sm:text-xl">+</span>
              </motion.a>
          </div>
        </Container>
      </Section>
    </>
  );
}
