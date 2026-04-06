import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useHeaderTheme } from '../context/header-theme';
import { useEffect } from "react";
import { useScroll } from "motion/react";
import founder_profile from "../assets/founder_profile.jpeg";

const values = [
  {
    title: 'Excellence',
    description: 'We pursue excellence in everything we do, from strategy to execution.',
  },
  {
    title: 'Innovation',
    description: 'We embrace new technologies and creative approaches to solve problems.',
  },
  {
    title: 'Collaboration',
    description: 'We work closely with our clients as true partners in success.',
  },
  {
    title: 'Impact',
    description: 'We measure our success by the impact we create for our clients.',
  },
];

const team = [
  // {
  //   name: 'Ritik Raj',
  //   role: 'FOUNDER & CEO',
  //   image: founder_profile,
  // },
  // {
  //   name: 'Ritik Raj',
  //   role: 'Lead Developer',
  //   image: founder_profile,
  // },
  // {
  //   name: 'Ritik Raj',
  //   role: 'Marketing Lead',
  //   image: founder_profile,
  // },
  // {
  //   name: 'Ritik Raj',
  //   role: 'UI/UX Lead',
  //   image: founder_profile,
  // },
];

export function About() {
  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();
  useEffect(() => {
  setTheme("primary");

  const unsubscribe = scrollY.on("change", (y) => {
    if (y < window.innerHeight * 1.1) {
      setTheme("primary");
    } else if (y < window.innerHeight * 2.4) {
      setTheme("inverse");
    } else if (y < window.innerHeight * 3.85) {
      setTheme("primary");
    } else if (y < window.innerHeight * 5.33) {
      setTheme("inverse");
    } else if (y < window.innerHeight * 5.8) {
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
      <Section className="pt-32 md:pt-40 pb-20 bg-black text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl"
          >
            <div className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-6 sm:mb-8">
              WE ARE BLACK<span className="text-[#FF4D00]">INT</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-12 leading-[1.1] text-white/80" style={{ fontWeight: 700 }}>
              A Digital Agency<br/>Focused on Design, Development & Marketing.
            </h1>
            <p className="text-xl md:text-2xl text-[#FF4D00]/75 max-w-3xl leading-relaxed">
              Creating technology-driven ecosystems where businesses build faster, automate smarter, and grow stronger in an increasingly digital world.            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Story Section */}
      <Section className="bg-white text-black py-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Text — slide in from LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="text-xl uppercase tracking-[0.3em] text-[#FF4D00] mb-6">
                OUR STORY
              </div>

              <h2
                className="text-4xl md:text-6xl mb-6"
                style={{ fontWeight: 700 }}
              >
                Building Scalable Digital Products
              </h2>

              <div className="space-y-4 text-lg text-black/60 leading-relaxed">
                <p>
                  BlackInt is a technology and digital solutions company helping startups,
                  businesses, and growing brands build powerful digital platforms.
                </p>
                <p>
                  From websites and SaaS applications to automation systems and AI-powered tools,
                  we create solutions that streamline operations and accelerate growth.
                </p>
                <p>
                  By combining strategy, design, and scalable technology,
                  we build digital products that perform, convert, and scale with your business.
                </p>
              </div>
            </motion.div>

            {/* Image — slide in from RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mt-35">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1632835256917-9932799fee58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D"
                  alt="Our team"
                  className="w-full h-full object-cover"
                />
                </div>
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </Section>


      {/* Values Section */}
      <Section className="bg-black text-white py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-xl uppercase tracking-[0.3em] text-[#FF4D00] mb-6">
              OUR VALUES
            </div>
            <h2 className="text-5xl md:text-7xl" style={{ fontWeight: 700 }}>
              What drives us.
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-white/10 p-8 hover:border-[#FF4D00] transition-colors duration-300"
              >
                <div className="text-6xl text-[#FF4D00] mb-6" style={{ fontWeight: 900 }}>
                  0{index + 1}
                </div>
                <h3 className="text-3xl mb-4" style={{ fontWeight: 700 }}>
                  {value.title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section className="bg-white text-black py-24 sm:py-28 md:py-32 overflow-hidden">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <div className="text-sm uppercase tracking-[0.3em] text-[#FF4D00] mb-6">
              OUR TEAM
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-7xl mb-6 font-bold">
              Meet the people behind BlackInt.
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-black/60 max-w-3xl">
              Our diverse team brings together talent from design, development, strategy, and business.
            </p>
          </motion.div>

          {/* GRID FIXED */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group w-full"
              >
                <div className="relative w-full aspect-[3/4] min-h-[280px] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </motion.div>
                </div>

                <h3 className="text-lg sm:text-xl mt-4 font-semibold">
                  {member.name}
                </h3>

                <p className="text-black/60 text-sm">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>


      {/* Stats Section */}
      <Section className="bg-black text-white py-32">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-9">
            {[
              { number: "Web", label: "Modern Web Platforms" },
              { number: "SaaS", label: "SaaS Platforms" },
              { number: "AI", label: "AI-Powered Systems" },
              { number: "API", label: "API Integrations" },
              { number: "Cloud", label: "Scalable Infrastructure" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl mb-3 text-[#FF4D00]" style={{ fontWeight: 900 }}>
                  {stat.number}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
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
              Want to join our team?
            </h2>
            <a
              href="/openings"
              className="inline-flex items-center gap-3 border border-black/20 px-8 py-4 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300"
            >
              <span className="text-sm uppercase tracking-widest">VIEW OPEN POSITIONS</span>
              <span className="text-xl">+</span>
            </a>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
