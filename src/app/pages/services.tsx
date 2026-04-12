import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useHeaderTheme } from '../context/header-theme';
import { useEffect, useState } from 'react';
import { useScroll } from "motion/react";
import { Rocket, TrendingUp, Briefcase, Crown } from "lucide-react";
import { getHomepageData } from '../../services/homepageService';
import { Offering } from "../../types/offering";
import { getCachedData, setCachedData } from '../utils/cache';
import { useNavigate } from "react-router-dom";

export function Services() {
  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();

  const [services, setServices] = useState<Offering[]>([]);
  const [packages, setPackages] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [activePlan, setActivePlan] = useState(1);

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

      const cacheKey = "homepage_data";

      const cached = getCachedData<{
        services: Offering[];
        packages: Offering[];
      }>(cacheKey);

      if (cached) {
        setServices(cached.services);
        setPackages(cached.packages);
        return;
      }

      const data = await getHomepageData();

      setServices(data.services);
      setPackages(data.packages);

      setCachedData(cacheKey, {
        services: data.services,
        packages: data.packages
      });

    } catch (error) {
      console.error("Services Page Error:", error);
    } finally {
      setLoading(false);
    }
  }

  loadServices();
}, []);

  const getNumericPrice = (price: string): number => {
    if (!price) return 0;

    const match = price.match(/\d[\d,]*/); // extract number
    return match ? Number(match[0].replace(/,/g, "")) : 0;
  };

  const sortedPackages = [...packages].sort(
    (a, b) => getNumericPrice(a.price) - getNumericPrice(b.price)
  );

  const sortedServices = [...services].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

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

          <Section className="py-24 md:py-16">
              <Container>

                {/* HEADER */}
                <div className="text-center mb-16 md:mb-20">
                  <h2 className="text-3xl md:text-5xl font-semibold text-[#FF4D00] tracking-tight">
                    Scale Faster with the Right Plan
                  </h2>
                  <p className="text-black/80 mt-4 text-sm md:text-base max-w-xl mx-auto">
                    Performance-driven packages for every stage. <br />From launch to dominance — we grow with you.
                  </p>
                </div>

                {/* GRID */}
                <div className="
                  grid 
                  gap-8 md:gap-10 lg:gap-12
                  md:grid-cols-2 
                  lg:grid-cols-2
                ">

                  {sortedPackages.map((pkg, index) => {
                    const isPopular = pkg.title === "Growth";

                    return (
                      <div
                        key={pkg.publicId || index}
                        className={`
                          group relative rounded-2xl flex flex-col
                          p-8 md:p-10 lg:p-12
                          min-h-[520px]

                          backdrop-blur-xl
                          bg-black
                          border border-white/10

                          transition-all duration-500 ease-out

                          hover:scale-[1.04]
                          hover:-translate-y-2
                          hover:border-[#FF4D00]/40
                          hover:shadow-black
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

                        {/* CONTENT */}
                        <div className="relative z-10 flex flex-col h-full">

                          {/* ICON */}
                          <div className="mb-6">
                            {pkg.featuredImage ? (
                              <div className="
                                w-16 h-16
                                rounded-lg
                                bg-black
                                flex items-center justify-center
                              ">
                                <img
                                  src={pkg.featuredImage}
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
                          <h3 className="text-xl md:text-2xl font-semibold text-white">
                            {pkg.title}
                          </h3>

                          {/* DESCRIPTION */}
                          <p className="text-white/70 text-sm mt-1 mb-5">
                            {pkg.fullContent || " "}
                          </p>

                          {/* PRICE */}
                          <div className="mb-6">
                            <span className="text-[#FF4D00] text-2xl font-semibold">
                              {pkg.price}
                            </span>
                            <p className="text-xs text-[#FF4D00]/80 mt-1">
                              Offer Package
                            </p>
                          </div>

                          {/* FEATURES */}
                          <ul className="space-y-2 text-sm text-white mb-6 flex-1">
                            {pkg.shortDescription?.map((feature, i) => (
                              <li key={i}>✓ {feature}</li>
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
                              w-full py-3 px-4
                              rounded-full
                              font-medium text-sm

                              bg-white
                              text-[#FF4D00]
                              border border-white

                              transition-all duration-300 ease-out

                              hover:border-[#FF4D00]
                              hover:bg-[#FF4D00]
                              hover:text-white
                              hover:shadow-[0_8px_25px_rgba(255,77,0,0.35)]
                              hover:scale-[1.02]

                              active:scale-[0.98]
                            ">
                            Get Started
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Container>
            </Section>
        </Container>
      </Section>

      {/* Services List */}
      <Section className="bg-white text-black pb-32">
        <Container>

          <div className="text-lg md:text-xl uppercase tracking-[0.3em] text-[#FF4D00] mb-8">
            WE HAVE SEPARATE SERVICES FOR EVERY NEED
          </div>

          <div className="space-y-24">

            {loading && services.length === 0 && (
              <p className="text-black/40">Loading services...</p>
            )}

            {!loading && services.length === 0 && (
              <p className="text-black/40">No services available.</p>
            )}

            {sortedServices.map((service, index) => (
              <motion.div
                key={service.publicId || index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="grid md:grid-cols-2 gap-10 md:gap-16 border-t border-black/10 pt-16"
              >

                {/* LEFT → IMAGE + NUMBER */}
                <div className="space-y-4">

                  {/* NUMBER ABOVE IMAGE */}
                  <div className="text-5xl md:text-6xl text-black/20 font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* IMAGE */}
                  <div className="overflow-hidden rounded-xl">
                    <ImageWithFallback
                      src={service.featuredImage}
                      alt={service.title}
                      className="
                        w-full h-[350px] object-cover
                        transition-transform duration-500 ease-out
                        hover:scale-110
                      "
                    />
                  </div>
                </div>

                {/* RIGHT → CONTENT */}
                <div className="flex flex-col justify-center space-y-6">

                  {/* TITLE */}
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {service.title}
                  </h2>

                  {/* FEATURES */}
                  <ul className="text-base text-black/60 space-y-2">
                    {service.shortDescription?.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>

                  {/* PRICE (CLEAN ORANGE) */}
                  {service.price && (
                    <div className="text-2xl font-semibold text-[#FF4D00]">
                      {service.price}
                    </div>
                  )}

                  {/* PREMIUM CTA BUTTON */}
                  <button
                    onClick={() =>
                      navigate("/contact", {
                        state: {
                          offeringType: "SERVICE",
                          offeringName: service.title,
                          offeringPrice: service.price
                        }
                      })
                    }
                    className="
                      mt-2 px-6 py-3 w-fit
                      rounded-md
                      font-medium

                      bg-black text-white
                      border border-black

                      transition-all duration-300 ease-out

                      hover:bg-[#FF4D00]
                      hover:border-[#FF4D00]
                      hover:shadow-[0_0_30px_rgba(255,77,0,0.6)]
                    "
                  >
                    Get Service
                  </button>

                  {/* FULL CONTENT */}
                  <p className="text-black/50 text-sm">
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
