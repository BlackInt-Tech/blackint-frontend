import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { ImageWithFallback } from '../components/blackint/ImageWithFallback';
import { useHeaderTheme } from '../context/header-theme';
import { useEffect, useState } from 'react';
import { useScroll } from "motion/react";
import { getPublishedOfferings } from '../../service/offeringIndividaual.service';
import { getPublishedPackages } from '../../service/offeringIPackage.service';

import { OfferingIndividualInterface } from "../../interface/offeringIndividual";
import { OfferingPackageInterface } from "../../interface/offeringPackage";
import { getCachedData, setCachedData } from '../utils/cache';
import { useNavigate } from "react-router-dom";
import React from 'react';

export function Services() {
  const phases = [
    { number: "01", title: "Discover", row: 1, col: 1 },
    { number: "02", title: "Design", row: 1, col: 2 },
    { number: "03", title: "Develop", row: 2, col: 2 },
    { number: "04", title: "Deploy", row: 2, col: 1 },
  ];
    const phasesMobile = [
    { no: "01", title: "Discover" },
    { no: "02", title: "Design" },
    { no: "03", title: "Develop" },
    { no: "04", title: "Deliver" },
  ];

  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();

  const [services, setServices] =
    useState<OfferingIndividualInterface[]>([]);

  const [packages, setPackages] =
    useState<OfferingPackageInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  setTheme("inverse");

  const unsubscribe = scrollY.on("change", (y) => {
    if (y < window.innerHeight * 17.2) {
      setTheme("inverse");
    } else if (y < window.innerHeight * 18.15){
      setTheme("primary");
    } else if (y < window.innerHeight * 18.95){
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

      const servicesCacheKey = "services_data";
      const packagesCacheKey = "packages_data";

      const cachedServices =
        getCachedData<OfferingIndividualInterface[]>(servicesCacheKey);

      const cachedPackages =
        getCachedData<OfferingPackageInterface[]>(packagesCacheKey);

      if (cachedServices && cachedPackages) {
        setServices(cachedServices);
        setPackages(cachedPackages);
        return;
      }

      const [servicesData, packagesData] = await Promise.all([
        getPublishedOfferings(),
        getPublishedPackages(),
      ]);

      setServices(servicesData);
      setPackages(packagesData);

      setCachedData(servicesCacheKey, servicesData);
      setCachedData(packagesCacheKey, packagesData);

    } catch (error) {
      console.error("Services Page Error:", error);
    } finally {
      setLoading(false);
    }
  }

  loadServices();
}, []);

  const getNumericPrice = (price: string): number | null => {
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

  const sortedServices = [...services].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(a.createdAt ?? 0).getTime()
  );

  return (
    <>
      <ScrollIndicator />
      
      {/* Hero Section */}
      <Section className="pt-24 md:pt-30 bg-white text-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl"
          >
            <div className="text-s uppercase tracking-[0.3em] text-[#FF4D00] mb-2">
              WHAT WE DO
            </div>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[1.1]" style={{ fontWeight: 700 }}>
              We are building <br />
              impactful experiences.
            </h1>
            <p className="text-lg md:text-xl text-black/50 max-w-3xl leading-relaxed  mb-8">
              Through great UX, design, and development, we help brands create meaningful connections with their audiences.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden aspect-[19/8]"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
              alt="Our services"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </Container>
      </Section>

      <Section className="pt-0 md:pt-0 bg-white text-black">
        <Container>

            {/* HEADER */}
            <div className="text-center mb-2 md:mb-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#0c0c0c] tracking-tight">
                      Scale Faster with the Right Plan
                    </h2>
                    <p className="text-black/50 mb-8 mt-4 text-sm md:text-base max-w-xl mx-auto">
                      Performance-driven packages for every stage. <br />From launch to dominance — we grow with you.
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
        </Container>
      </Section>
        

      {/* Services List */}
      <Section className="pt-0 md:pt-0 bg-white text-black pb-32">
        <Container>

          <div className="text-lg md:text-xl font-semibold uppercase tracking-[0.3em] text-[#000000] mb-6">
            WE HAVE SEPARATE SERVICES FOR EVERY NEED
          </div>

          <div className="space-y-12">

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
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-10 md:gap-16 border-t border-black/10 pt-8"
              >

                {/* LEFT → IMAGE + NUMBER */}
                <div className="space-y-3">

                  {/* NUMBER ABOVE IMAGE */}
                  <div className="text-5xl md:text-6xl text-black/20 font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                    {/* IMAGE */}
                    <motion.div
                      className="aspect-[6/3] overflow-hidden rounded-2xl"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                    >
                      <ImageWithFallback
                        src={service.featuredImage}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                          
                </div>

                {/* RIGHT → CONTENT */}
                <div className="flex flex-col justify-center space-y-6">

                  {/* TITLE */}
                  <h2 className="text-3xl md:text-4xl font-bold md:pt-6">
                    {service.title}
                  </h2>

                  {/* FEATURES */}
                  <p className="text-base text-black/70 leading-relaxed md:pt-0">
                    {/* {service.shortDescription}  */}
                    <p className="text-black/40 text-sm">
                      {service.shortDescription}
                    </p>
                  </p>

                  {/* PRICE (CLEAN ORANGE) */}
                  {service.price && (
                    <div className="text-2xl font-bold text-[#FF4D00]">
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
                      bg-white text-black
                      border border-black
                      transition-all duration-300 ease-out
                      hover:border-[#FF4D00] hover:text-[#FF4D00]
                      hover:shadow-[0_0_30px_rgba(255,77,0,0.1)]
                    "
                  >
                    Get Service +
                  </button>

                </div>

              </motion.div>
            ))}

          </div>
        </Container>
      </Section>

      {/* Process Section */}
      <Section className="bg-black text-white py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="text-s uppercase tracking-[0.3em] text-[#FF4D00] mb-6">
              OUR PROCESS
            </div>
            <h2 className="text-4xl md:text-6xl mb-12 leading-tight" style={{ fontWeight: 700 }}>
              We follow a proven process to deliver exceptional results.
            </h2>

            <div className="hidden lg:flex items-start justify-between mt-20">

              {phases.map((phase, index) => (
                <React.Fragment key={phase.title}>

                  {/* Step */}
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                    }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="text-6xl font-black text-[#FF4D00] leading-none">
                      {phase.number}
                    </div>

                    <h3 className="mt-5 text-2xl font-semibold">
                      {phase.title}
                    </h3>
                  </motion.div>

                  {/* Arrow */}
                  {index < phases.length - 1 && (
                    <motion.div
                      className="flex-1 flex justify-center mt-8"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.2,
                      }}
                      style={{ originX: 0 }}
                    >
                      <svg
                        width="180"
                        height="20"
                        viewBox="0 0 180 24"
                        fill="none"
                      >
                        <line
                          x1="0"
                          y1="12"
                          x2="165"
                          y2="12"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="2"
                        />

                        <polyline
                          points="155,4 168,12 155,20"
                          fill="none"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="2"
                        />
                      </svg>
                    </motion.div>
                  )}

                </React.Fragment>
              ))}

            </div>

            <div className="relative w-[320px] h-[320px] mx-auto lg:hidden mt-16">

              {/* Top Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4}}
                className="absolute left-0 top-0 text-center"
              >
                <h2 className="text-5xl font-black text-[#FF4D00]">01</h2>
                <p className="font-semibold text-lg mt-2">Discover</p>

                {/* → */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-[18px] left-[85px] origin-left"
                >
                  <svg width="150" height="24">
                    <line x1="0" y1="12" x2="135" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                    <polyline points="125,4 138,12 125,20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                  </svg>
                </motion.div>
              </motion.div>

              

              {/* Top Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="absolute right-0 top-0 text-center"
              >
                <h2 className="text-5xl font-black text-[#FF4D00]">02</h2>
                <p className="font-semibold text-lg mt-2">Design</p>
              </motion.div>

              {/* ↓ */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="absolute right-[25px] top-[89px] origin-top"
              >
                <svg width="24" height="150">
                  <line x1="12" y1="0" x2="12" y2="135" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                  <polyline points="4,125 12,138 20,125" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                </svg>
              </motion.div>

              {/* Bottom Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="absolute right-0 bottom-0 text-center"
              >
                <h2 className="text-5xl font-black text-[#FF4D00]">03</h2>
                <p className="font-semibold text-lg mt-2">Develop</p>
              </motion.div>

              {/* ← */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6}}
                className="absolute bottom-[55px] left-[85px] origin-right"
              >
                <svg width="130" height="24">
                  <line x1="15" y1="12" x2="150" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                  <polyline points="25,4 12,12 25,20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                </svg>
              </motion.div>

              {/* Bottom Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.9 }}
                className="absolute left-0 bottom-0 text-center"
              >
                <h2 className="text-5xl font-black text-[#FF4D00]">04</h2>
                <p className="font-semibold text-lg mt-2">Deliver</p>
              </motion.div>

            </div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white text-[#FF4D00] py-16">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-3xl md:text-7xl mb-12 leading-tight max-w-4xl mx-auto" style={{ fontWeight: 700 }}>
              Let's build something amazing together.
            </h2>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 border-2 border-black text-black px-10 py-5 hover:text-[#FF4D00] hover:border-[#FF4D00] transition-all duration-300 text-lg uppercase tracking-widest"
            >
              START A PROJECT 🞤
            </a>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
