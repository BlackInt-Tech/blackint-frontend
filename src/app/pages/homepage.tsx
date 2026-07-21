import { motion } from "framer-motion";
import { Container } from "../components/layout/container";
import { Section } from "../components/layout/section";
import { ScrollIndicator } from "../components/ui/scroll-indicator";
import { ImageWithFallback } from "../components/blackint/ImageWithFallback";
import { useHeaderTheme } from "../context/header-theme";
import { useEffect, useMemo, useState } from "react";
import { useScroll } from "motion/react";
import { Link } from "react-router-dom";
import { getHomepageData } from "../../service/homepage.service";
import { ProjectInterface } from "../../interface/project";
import { OfferingIndividualInterface } from "../../interface/offeringIndividual";
import { OfferingPackageInterface } from "../../interface/offeringPackage";
import { InsightInterface } from "../../interface/insight";
import { getCachedData, setCachedData } from "../utils/cache";
import { useNavigate } from "react-router-dom";
import { HomepageData } from "../../service/homepage.service";

export function Homepage() {

  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [services, setServices] = useState<OfferingIndividualInterface[]>([]);
  const [packages, setPackages] = useState<OfferingPackageInterface[]>([]);
  const [insights, setInsights] = useState<InsightInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const words = [
                  "Design...",
                  "Development...",
                  "Marketing...",
                  "Branding...",
                  "Strategy...",
                  "Growth..."];

  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();
  const navigate = useNavigate();;

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const cacheKey = "homepage_data";

        const cached = getCachedData<HomepageData>(cacheKey);

        if (cached) {
          setProjects(cached.projects);
          setServices(cached.services);
          setPackages(cached.packages);
          setInsights(cached.insights);
          return;
        }

        const data = await getHomepageData();

        setProjects(data.projects);
        setServices(data.services);
        setPackages(data.packages);
        setInsights(data.insights);

        // Cache it
        setCachedData(cacheKey, data);

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
      if (y < window.innerHeight * 1) {
        setTheme("primary");
      } else if (y < window.innerHeight * 12.1) {
        setTheme("inverse");
      } else {
        setTheme("primary");
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
          setTimeout(() => setIsDeleting(true), 1000);
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

  const getNumericPrice = (price?: string | null): number | null => {
    if (!price) return null;

    const match = price.match(/\d[\d,]*/);
    return match ? Number(match[0].replace(/,/g, "")) : null;
  };

  const sortedPackages = [...packages].sort((a, b) => {
    const priceA = getNumericPrice(a.price);
    const priceB = getNumericPrice(b.price);

    if (priceA !== null && priceB !== null) {
      return priceA - priceB;
    }

    if (priceA !== null) return -1;

    if (priceB !== null) return 1;

    return 0;
  });

  return (
    <>
      <ScrollIndicator />

      {/* =========================================
          HERO SECTION 
      ========================================== */}
      <Section
        fullHeight
        className="relative bg-black overflow-hidden flex items-center"
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
        <Container>
          <div className="max-w-5xl">

            {/* Top Label */}
            <div className="text-xs sm:text-sm uppercase tracking-[0.3em] mt-6 sm:mt-6 mb-2 sm:mb-2">
              WE ARE BLACK<span className="text-[#FF4D00]">INT</span>
            </div>

            {/* Heading */}
            <h1
              className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl leading-[1.4] md:leading-[1.05] mt-6 mb-6 sm:mb-8"
              style={{ fontWeight: 800}}
            >
              A Digital Agency <br />
              Focused On{" "} <span className="inline-block min-w-[12ch] text-[#FF4D00] drop-shadow-[0_0_6px_rgba(255,77,0,0.4)]">{displayText}</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-s md:text-lg lg:text-xl text-white/80 leading-[2] md:leading-[1.05] max-w-3xl mt-9 mb-8 sm:mb-10">
              Creating technology-driven ecosystems where businesses build faster, automate smarter, and grow stronger in an increasingly digital world.
            </p>

            {/* CTA */}
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-white/20 px-6 sm:px-8 py-2 mt-8 sm:py-4 hover:border-[#FF4D00] transition-all duration-300"
            >
              <span className="text-xs sm:text-sm uppercase tracking-widest">
                GET TO KNOW US
              </span>
              <span className="text-lg sm:text-xl">+</span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* =========================================
          FEATURED WORK
      ========================================== */}
      <Section
        className="bg-white text-black py-8 sm:py-10 md:py-12 lg:py-16"
      >
        <motion.div
          onViewportEnter={() => setTheme("inverse")}
          onViewportLeave={() => setTheme("primary")}
        >
        <Container>
          <motion.div
            className="mb-8"
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
                      transition={{ duration: 0.8 }}
                    >
                      <Link to={`/work/${project.slug}`} className="group block">
                        <div
                          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center ${
                            !isEven ? "md:grid-flow-dense" : ""
                          }`}
                        >

                          {/* Image */}
                          <motion.div
                            className={`relative overflow-hidden aspect-[6/3] ${
                              !isEven ? "md:col-start-2" : ""
                            }`}
                            initial={{ x: isEven ? -80 : 80, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.6 }}
                          >
                            <motion.div
                              className="w-full h-full"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6 }}
                            >
                              <video
                                src={project.featuredVideo}
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls={false}
                                className="w-full h-full object-cover"
                              />
                            </motion.div>

                            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/0 to-transparent transition-all duration-500" />
                          </motion.div>

                          {/* Content */}
                          <motion.div
                            className={`${
                              !isEven ? "md:col-start-1 md:row-start-1" : ""
                            }`}
                            initial={{ x: isEven ? 80 : -80, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.6 }}
                          >
                            <div className="text-xs uppercase tracking-[0.3em] text-black/60 mb-4">
                              {project.clientName}
                            </div>

                            <h2
                              className="text-3xl md:text-4xl mb-4 group-hover:text-[#FF4D00] transition-colors duration-300"
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
              className="mt-18 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/work"
                className="inline-flex items-center gap-3 border border-black/20 px-10 py-5 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300"
              >
                <span className="text-sm uppercase tracking-widest">
                  VIEW ALL PROJECTS
                </span>
                <span className="text-xl">+</span>
              </Link>
            </motion.div>
            </motion.div>
          </Container>
        </motion.div>
      </Section>

      {/* =========================================
          FINAL CTA SECTION
      ========================================== */}
      <Section className="relative py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden bg-black text-white">

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] via-[#ffbd8e] to-[#FF4D00]"
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
              className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 text-sm uppercase tracking-widest font-semibold rounded-full shadow-2xl hover:bg-white hover:text-[#FF4D00] transition-all duration-500"
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
      <Section className="bg-white text-FF4D00 py-8 sm:py-10 md:py-12 lg:py-16">
        <Container>
          <div className="relative">
            <div className="absolute left-[-180px] top-[210px] -translate-y-1/2 text-[18vw] md:text-[24vw]
                font-bold text-[#FF4D00]/2 whitespace-nowrap pointer-events-none select-none">
              Services
            </div>

            <motion.div
              className="mb-12 md:mb 16 relative z-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-2xl uppercase tracking-[0.3em] text-[#FF4D00] mb-4 font-bold">
                WHAT WE DO
              </div>
              <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-black/50">
                We design and build powerful digital experiences that elevate brands, engage audiences, and drive measurable business growth.
              </p>
            </motion.div>

            <div className="">

            {/* HEADER */}
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-3xl md:text-5xl font-semibold text-[#FF4D00] tracking-tight">
                Digital Presence with the Right Plan
              </h2>
              <p className="text-black/50 mt-4 mb-8 text-sm md:text-base max-w-xl mx-auto">
                Performance-driven packages for every stage.<br />
                From launch to dominance — we grow with you.
              </p>
            </div>

            {/* GRID */}
            <div className="
              grid 
              gap-6 md:gap-10 lg:gap-12
              grid-cols-1
              md:grid-cols-2
              ">

              {sortedPackages.map((pkg, index) => {
                      const isPopular = pkg.title === sortedPackages[1].title;
                      const isValuable = pkg.title === sortedPackages[0].title;

                      return (
                        <div
                          key={pkg.publicId || index}
                          className={`
                            w-full

                            group relative flex flex-col
                            rounded-2xl

                            p-6 md:p-10 lg:p-12 
                            min-h-[520px]

                            backdrop-blur-xl
                            bg-bwhite
                            border border-black/50
                            shadow-[0_6px_20px_rgba(0,0,0,0.25)]

                            transition-all duration-500 ease-out

                            hover:scale-[1.005]
                            hover:-translate-y-2
                        
                          `}
                        >

                          {/* MOST POPULAR TAG */}
                          {isPopular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                              <span className="bg-[#FF4D00] text-white text-xs px-3 py-1 rounded-full">
                                Most Popular
                              </span>
                            </div>
                          )}

                          {/* MOST POPULAR TAG */}
                          {isValuable && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                              <span className="bg-[#FF4D00] text-white text-xs px-3 py-1 rounded-full">
                                Affordable
                              </span>
                            </div>
                          )}

                          {/* CONTENT */}
                          <div className="relative z-10 flex flex-col h-full">

                            {/* ICON */}
                            <div className="mb-6">
                              {pkg.icon ? (
                                <div className="
                                  w-16 h-16
                                  rounded-lg
                                  bg-white
                                  flex items-center justify-center
                                ">
                                  <img
                                    src={pkg.icon}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                </div>
                              ) : (
                                <div className="
                                  w-14 h-14
                                  rounded-lg
                                  bg-white/5
                                  flex items-center justify-center
                                  text-[#FF4D00] text-xl
                                ">
                                  ★
                                </div>
                              )}
                            </div>

                            {/* TITLE */}
                            <h3 className="text-2xl md:text-3xl font-bold text-black">
                              {pkg.title}
                            </h3>

                            <p className="text-black/60 text-sm mt-1 mb-5">
                              {pkg.description}
                            </p>

                            {/* PRICE */}
                            <div className="mb-6">
                              <span className="text-[#FF4D00] text-2xl font-semibold">
                                {pkg.price}
                              </span>
                              <span className="text-xs font-medium ml-2 text-[#cf3e00c7] mt-1">
                                Offer Package
                              </span>
                            </div>

                            {/* FEATURES */}
                            <ul className="space-y-2 text-sm text-black mb-6 flex-1">
                              {pkg.features.map((feature, index) => (
                                <li key={index}>✓ {feature}</li>
                              ))}
                            </ul>

                            {/* BUTTON */}
                            <button 
                              onClick={() =>
                                navigate("/contact", {
                                  state: {
                                    offeringType: "PACKAGE",
                                    offeringName: pkg.title,
                                    offeringPrice: pkg.price
                                  }
                                })
                              }
                              className="
                                py-4 px-2
                                font-semibold text-m

                                bg-white
                                text-black
                                border border-black

                                transition-all duration-300 ease-out

                                hover:border-[#FF4D00]
                                hover:text-[#FF4D00]
                                
                              ">
                              Get Started +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
            
            <motion.div
              className="mt-16 md:mt-20 text-center relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-3 border border-black/40 text-black px-10 py-5 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300"
              >
                <span className="text-sm uppercase tracking-widest">
                  VIEW ALL SERVICES
                </span>
                <span className="text-xl">+</span>
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>

      
      {/* =========================================
          FINAL CTA SECTION 
      ========================================== */}
      <Section className="relative py-9 md:py-18 overflow-hidden bg-black text-white">

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#ff63205e] via-[#ad7a64] to-[#ff63205e]"
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
              YOUR TRUSTED PARTNER ON YOUR DIGITAL JOURNEY
            </motion.div>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We don’t just build websites.  
              <span className="block text-[#fc550e]">
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
              Strategy-driven design. Performance-focused development.<br></br>
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
                className="inline-flex items-center gap-4 border border-white/40 px-12 py-6 text-sm uppercase tracking-widest font-semibold rounded-full hover:border-black/40 hover:text-black transition-all duration-500"
              >
                View Our Work
              </motion.a>
            </motion.div>
          </div>
        </Container>

      </Section>

      {/* =========================================
          INSIGHTS SECTION
      ========================================== */}
      <Section className="bg-white text-black py-8 sm:py-10 md:py-12 lg:py-16">
        <Container>
          <motion.div
            className="mb-10"
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
                      {insight.categoryId && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs uppercase tracking-widest text-black shadow-sm">
                          {insight.categoryId}
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
            <Link
              to="/insights"
              className="inline-flex items-center gap-3 border border-black/20 px-8 py-4 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300"
            >
              <span className="text-sm uppercase tracking-widest">
                VIEW MORE INSIGHTS
              </span>
              <span className="text-xl">+</span>
            </Link>
          </motion.div>
        </Container>
      </Section>

      {/* =========================================
          FOOTER CTA
      ========================================== */}
      <Section
        className="bg-black py-20 sm:py-24 md:py-32"
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
                className="text-4xl sm:text-6xl md:text-8xl inline-flex flex-wrap justify-center text-center"
                style={{ fontWeight: 900 }}
              >
                {"LET'S TALK".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -10, color: "#FF4D00", transition: { duration: 0.25 }}}
                    whileTap={{ y: -6, color: "#FF4D00" }}
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