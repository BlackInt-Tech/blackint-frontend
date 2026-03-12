import { motion } from "motion/react";
import { Container } from "../components/layout/container";
import { Section } from "../components/layout/section";
import { ScrollIndicator } from "../components/ui/scroll-indicator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useHeaderTheme } from "../context/header-theme";
import { useEffect, useMemo, useState } from "react";
import { useScroll } from "motion/react";
import { Link } from "react-router-dom";
import { getPublishedProjects } from "../../services/projectService";
import { getPublishedOfferings } from "../../services/offeringService";
import { getPublishedInsights } from "../../services/insightService";
import { Project } from "../../types/project";
import { Offering } from "../../types/offering";
import { Insight } from "../../types/insight";
import { getCachedData, setCachedData } from "../utils/cache";
import { useNavigate } from "react-router-dom";

export function Homepage() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);
  const words = [
                  "Design.",
                  "Development.",
                  "Marketing.",
                  "Branding.",
                  "Strategy.",
                  "Growth."];

  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  useEffect(() => {
  async function loadData() {
    try {
      setLoading(true);

      const cacheKey = "homepage_data";

      // Check cache first
      const cached = getCachedData<{
        projects: Project[];
        offerings: Offering[];
        insights: Insight[];
      }>(cacheKey);

      if (cached) {
        setProjects(cached.projects);
        setOfferings(cached.offerings);
        setInsights(cached.insights);
        setLoading(false);
        return;
      }

      // No cache → Call APIs
      const [projectsData, offeringsData, insightsData] =
        await Promise.all([
          getPublishedProjects(),
          getPublishedOfferings(),
          getPublishedInsights(),
        ]);

      const slicedProjects = (projectsData || []).slice(0, 6);
      const slicedOfferings = (offeringsData || []).slice(0, 6);
      const slicedInsights = (insightsData || []).slice(0, 6);

      setProjects(slicedProjects);
      setOfferings(slicedOfferings);
      setInsights(slicedInsights);

      // Store combined data in cache
      setCachedData(cacheKey, {
        projects: slicedProjects,
        offerings: slicedOfferings,
        insights: slicedInsights,
      });

    } catch (error) {
      console.error("Homepage Load Error:", error);
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

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  const particles = useMemo(() => {
    return [...Array(25)].map((_, i) => {
      const size = Math.random() * 30 + 10;

      return {
        id: i,
        size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 10 + 5,
      };
    });
  }, []);

  return (
    <>
      <ScrollIndicator />

      {/* =========================================
          HERO SECTION 
      ========================================== */}
      <Section
        fullHeight
        className="relative bg-black overflow-hidden px-6 sm:px-10 md:px-12 lg:px-0 flex items-center"
      >
        {/* Floating Particles */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                border: "1.2px solid rgba(255, 255, 255, 0.6)",
                boxShadow: `
                  0 0 25px rgba(255,106,0,0.4),
                  0 0 80px rgba(255,106,0,0.25),
                  inset 0 0 20px rgba(255,106,0,0.15)
                `,
                top: particle.top,
                left: particle.left,
                opacity: 0.4,
              }}
              animate={{
                x: [0, 200],
                y: [0, -150],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 opacity-10 z-[1] pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] sm:w-[600px] md:w-[700px] h-[500px] sm:h-[600px] md:h-[700px] rounded-full bg-[#FF4D00] blur-[160px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Content */}
        <Container className="relative z-10 w-full pt-24 sm:pt-28 md:pt-0">
          <div className="max-w-5xl">

            {/* Top Label */}
            <div className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-6 sm:mb-8">
              WE ARE BLACK<span className="text-[#FF4D00]">INT</span>
            </div>

            {/* Heading */}
            <h1
              className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl leading-[1.05] mb-6 sm:mb-8"
              style={{ fontWeight: 800}}
            >
              A Digital Agency <br />
              Focused On{" "} <span className="inline-block min-w-[12ch] text-[#FF4D00]"> {displayText} </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-s md:text-lg lg:text-xl text-white/80 max-w-3xl mb-8 sm:mb-10">
              Creating technology-driven ecosystems where businesses build faster, automate smarter, and grow stronger in an increasingly digital world.
            </p>

            {/* CTA */}
            <a
              href="/about"
              className="inline-flex items-center gap-3 border border-white/20 px-6 sm:px-8 py-3 sm:py-4 hover:border-[#FF4D00] transition-all duration-300"
            >
              <span className="text-xs sm:text-sm uppercase tracking-widest">
                GET TO KNOW US
              </span>
              <span className="text-lg sm:text-xl">+</span>
            </a>
          </div>
        </Container>
      </Section>

      {/* =========================================
          FEATURED WORK
      ========================================== */}
      <Section
        className="bg-white text-black py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-10 md:px-12 lg:px-0 "
      >
        <motion.div
          onViewportEnter={() => setTheme("inverse")}
          onViewportLeave={() => setTheme("primary")}
        >
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

            <div className="space-y-24">
              {loading && projects.length === 0 && (
                <p className="text-black/40">Loading projects...</p>
              )}

              {!loading && projects.length === 0 && (
                <p className="text-black/40">No projects available.</p>
              )}

              {projects.length > 0 &&
                projects.map((project, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={project.publicId || index}
                      initial={{ opacity: 0, y: 80 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <Link to={`/work/${project.slug}`} className="group block">
                        <div
                          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                            !isEven ? "md:grid-flow-dense" : ""
                          }`}
                        >

                          {/* Image */}
                          <motion.div
                            className={`relative overflow-hidden aspect-[4/3] ${
                              !isEven ? "md:col-start-2" : ""
                            }`}
                            initial={{ x: isEven ? -80 : 80, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.9,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <motion.div
                              className="w-full h-full"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6 }}
                            >
                              <ImageWithFallback
                                src={project.featuredImage}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </motion.div>

                            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/0 to-transparent group-hover:from-[#FF4D00]/20 transition-all duration-500" />
                          </motion.div>

                          {/* Content */}
                          <motion.div
                            className={`${
                              !isEven ? "md:col-start-1 md:row-start-1" : ""
                            }`}
                            initial={{ x: isEven ? 80 : -80, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.9,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <div className="text-xs uppercase tracking-[0.3em] text-black/40 mb-4">
                              {project.clientName}
                            </div>

                            <h2
                              className="text-3xl md:text-5xl mb-4 group-hover:text-[#FF4D00] transition-colors duration-300"
                              style={{ fontWeight: 700 }}
                            >
                              {project.title}
                            </h2>

                            <p className="text-lg text-black/60 mb-6 leading-relaxed">
                              {project.shortDescription}
                            </p>

                            <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest group-hover:text-[#FF4D00] transition-colors">
                              VIEW PROJECT →
                            </div>
                          </motion.div>

                        </div>
                      </Link>
                    </motion.div>
                  );
                })}

            </div>

            {/* VIEW ALL PROJECTS CTA */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a
                href="/work"
                className="inline-flex items-center gap-3 border border-black/20 px-10 py-5 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300"
              >
                <span className="text-sm uppercase tracking-widest">
                  VIEW ALL PROJECTS
                </span>
                <span className="text-xl">+</span>
              </a>
            </motion.div>
            </motion.div>
          </Container>
        </motion.div>
      </Section>

      {/* =========================================
          FINAL CTA SECTION
      ========================================== */}
      <Section className="relative py-32 overflow-hidden bg-black text-white">

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] via-[#FF6A00] to-[#FF4D00]"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <Container>
          <div className="relative z-10 text-center max-w-4xl mx-auto">

            <motion.div
              className="uppercase tracking-[0.4em] text-sm text-white/70 mb-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              LET’S BUILD SOMETHING EXCEPTIONAL
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ready to elevate your brand into a powerful
              digital experience?
            </motion.h2>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 text-sm uppercase tracking-widest font-semibold rounded-full shadow-2xl hover:bg-black hover:text-white transition-all duration-500"
            >
              START A PROJECT
              <span className="text-xl">→</span>
            </motion.a>
          </div>
        </Container>

        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF4D00]/30 blur-[150px] rounded-full" />
      </Section>

      {/* =========================================
            SERVICES SECTION
      ========================================== */}
      <Section className="bg-white text-black py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-10 md:px-12 lg:px-0">
        <Container>
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[18vw] md:text-[20vw]
                font-bold text-black/[0.02] whitespace-nowrap pointer-events-none select-none">
              Services
            </div>

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

            <div className="text-xl md:text-2xl uppercase tracking-[0.3em] text-[#FF4D00] mb-12">
                  SERVICES WE OFFER
            </div>

            <div className="space-y-20 md:space-y-32">

              {loading && offerings.length === 0 && (
                <p className="text-black/40">Loading services...</p>
              )}

              {!loading && offerings.length === 0 && (
                <p className="text-black/40">No services available.</p>
              )}

              {offerings.length > 0 &&
                offerings.map((service, index) => (
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
                        className="text-6xl md:text-8xl text-black/30"
                        style={{ fontWeight: 700 }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-10 space-y-8">

                      <div>
                        <h2
                          className="text-3xl md:text-5xl mb-6 group-hover:text-[#FF4D00] transition-colors duration-300"
                          style={{ fontWeight: 700 }}
                        >
                          {service.title}
                        </h2>

                          <div className="relative overflow-hidden aspect-[4/3] rounded-xl mb-6 max-w-[80%]">                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full"
                          >
                            <ImageWithFallback
                              src={service.featuredImage}
                              alt={service.title}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        </div>

                        <p className="text-lg md:text-xl text-black/60 leading-relaxed max-w-3xl">
                          {service.shortDescription}
                        </p>

                        {service.price && (
                          <motion.div
                            className="mt-6 inline-block"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                          >
                            <button
                              onClick={() =>
                                navigate("/contact", {
                                  state: { selectedService: service.title },
                                })
                              }
                              className="
                                relative
                                border-black
                                text-black
                                border border-black/40
                                px-6 py-3
                                rounded-md
                                font-bold
                                text-sm md:text-base
                                tracking-wide
                                transition-all duration-300 ease-out
                                hover:border-[#FF4D00]
                                hover:text-[#FF4D00]
                                hover:shadow-[0_0_25px_rgba(255,77,0,0.6)]
                              "
                            >
                              {service.price}
                            </button>
                          </motion.div>
                        )}
                      </div>

                      {/* Optional full content preview */}
                      {service.fullContent && (
                        <p className="text-black/50 max-w-3xl">
                          {service.fullContent}
                        </p>
                      )}

                    </div>
                  </motion.div>
              ))}
            </div>
            
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
          FINAL CTA SECTION 
      ========================================== */}
      <Section className="relative py-36 overflow-hidden bg-black text-white">

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]"
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF4D00]/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <Container>
          <div className="relative z-10 text-center max-w-5xl mx-auto">

            <motion.div
              className="uppercase tracking-[0.5em] text-xs text-white/60 mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              BLACKINT DIGITAL STUDIO
            </motion.div>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We don’t just build websites.  
              <span className="block text-[#FF4D00]">
                We craft digital dominance.
              </span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              Strategy-driven design. Performance-focused development.  
              We partner with ambitious brands and founders to create 
              digital experiences that scale, convert, and lead markets.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 bg-[#FF4D00] text-white px-12 py-6 text-sm uppercase tracking-widest font-semibold rounded-full shadow-2xl hover:shadow-[#FF4D00]/40 transition-all duration-500"
              >
                Start a Strategic Partnership
                <span className="text-xl">→</span>
              </motion.a>

              <motion.a
                href="/work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 border border-white/20 px-12 py-6 text-sm uppercase tracking-widest font-semibold rounded-full hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-500"
              >
                View Our Work
              </motion.a>
            </motion.div>
          </div>
        </Container>

        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FF4D00]/20 blur-[180px] rounded-full" />
      </Section>

      {/* =========================================
          INSIGHTS SECTION
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

            {loading && insights.length === 0 && (
              <p className="text-black/40">Loading insights...</p>
            )}

            {!loading && insights.length === 0 && (
              <p className="text-black/40">No insights available.</p>
            )}

            {insights.length > 0 &&
              insights.map((insight, index) => (
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
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[16/10] mb-6 rounded-xl">
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

                      {/* Category Badge */}
                      {insight.category && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs uppercase tracking-widest text-black shadow-sm">
                          {insight.category}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-3">

                      {/* Date */}
                      <div className="text-xs uppercase tracking-widest text-black/40">
                        {insight.publishedAt
                          ? new Date(insight.publishedAt).toLocaleDateString()
                          : ""}
                      </div>

                      {/* Title */}
                      <h2
                        className="text-2xl md:text-3xl group-hover:text-[#FF4D00] transition-colors duration-300"
                        style={{ fontWeight: 700 }}
                      >
                        {insight.title}
                      </h2>

                      {/* Excerpt */}
                      {insight.excerpt && (
                        <p className="text-black/60">
                          {insight.excerpt}
                        </p>
                      )}

                      {/* CTA */}
                      <div className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-black/60 group-hover:text-[#FF4D00] transition-colors">
                        READ MORE →
                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}

          </div>

          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="/insights"
              className="inline-flex items-center gap-3 border border-black/20 px-8 py-4 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300"
            >
              <span className="text-sm uppercase tracking-widest">
                VIEW MORE INSIGHTS
              </span>
              <span className="text-xl">+</span>
            </a>
          </motion.div>
        </Container>
      </Section>

      {/* =========================================
          FOOTER CTA
      ========================================== */}
      <Section
        className="bg-black py-20 sm:py-24 md:py-32 px-6 sm:px-8 md:px-0"
      >
        <motion.div
        onViewportEnter={() => setTheme("primary")}
        >
        <Container>
          <div className="text-center">
            <motion.div
              className="overflow-hidden mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-4xl sm:text-6xl md:text-8xl inline-flex flex-wrap justify-center"
                style={{ fontWeight: 900 }}
              >
                {"LET'S TALK".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ y: 60 }}   // reduced from 100
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.02,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -10,            // reduced from -20
                      color: "#FF4D00",
                      transition: { duration: 0.3 },
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h2>
            </motion.div>

            <motion.a
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/20 px-8 sm:px-10 py-4 sm:py-5 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300 text-white"
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
        </motion.div>
      </Section>

    </>
  );
}