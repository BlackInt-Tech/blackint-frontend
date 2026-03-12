import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useHeaderTheme } from '../context/header-theme';
import { useEffect, useState } from "react";
import { useScroll } from "motion/react";
import { getProjectBySlug } from '../../services/projectService';
import { Project } from '../../types/project';
import { getCachedData, setCachedData } from '../utils/cache';

export function CaseStudy() {

  const { slug } = useParams();
  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchProject() {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const cacheKey = `project_slug_${slug}`;

      // Check cache first
      const cached = getCachedData<Project>(cacheKey);

      if (cached) {
        setProject(cached);
        return;
      }

      // No cache → Call API
      const data = await getProjectBySlug(slug);

      if (data) {
        setProject(data);
        setCachedData(cacheKey, data);
      } else {
        setProject(null);
      }

    } catch (error) {
      console.error("Project fetch error:", error);
      setProject(null);
    } finally {
      setLoading(false);
    }
  }

  fetchProject();
}, [slug]);

  useEffect(() => {
    setTheme("primary");

    const unsubscribe = scrollY.on("change", (y: number) => {
      if (y < window.innerHeight * 1.33) {
        setTheme("primary");
      } else if (y < window.innerHeight * 2.02) {
        setTheme("inverse");
      } else if (y < window.innerHeight * 3.5) {
        setTheme("primary");
      } else if (y < window.innerHeight * 4.85) {
        setTheme("inverse");
      } else if (y < window.innerHeight * 5.6) {
        setTheme("primary");
      } else {
        setTheme("inverse");
      }
    });

    return () => unsubscribe();
  }, [scrollY, setTheme]);

  if (loading || !project) {
    return (
      <Section className="bg-black text-white py-32">
        <Container>
          <p className="text-xl">Loading project...</p>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <ScrollIndicator />

      {/* HERO IMAGE */}

      <div className="h-screen relative bg-black">

        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <ImageWithFallback
            src={project.featuredImage || project.galleryImages?.[0]}
            alt={project.title}
            className="w-full h-full object-cover opacity-70"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 pb-24">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="text-xl uppercase tracking-[0.3em] text-[#FF4D00] mb-4">
                CASE STUDY
              </div>

              <h1 className="text-6xl md:text-8xl mb-4" style={{ fontWeight: 900 }}>
                {project.title}
              </h1>

              <p className="text-xl md:text-2xl text-white/80">
                {project.shortDescription}
              </p>
            </motion.div>
          </Container>
        </div>
      </div>

      {/* Project Details */}

      <Section className="border-b border-white/10 bg-black">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
                CLIENT
              </div>
              <div className="text-2xl">
                {project.clientName}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
                PROJECT URL
              </div>
              <div className="text-2xl break-all">
                {project.projectUrl}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
                PUBLISHED
              </div>
              <div className="text-2xl">
                {new Date(project.publishedAt).toLocaleDateString()}
              </div>
            </motion.div>

          </div>
        </Container>
      </Section>

            {/* Challanges */}

      <Section className="bg-white text-black py-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

            <div className="md:col-span-4">
              <motion.div
                className="sticky top-32"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-xs uppercase tracking-[0.3em] text-black/40 mb-4">
                  01
                </div>
                <h2 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
                  The Challenge
                </h2>
              </motion.div>
            </div>

            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl text-black/80 leading-relaxed mb-6">
                  {project.fullContent}
                </p>

                <p className="text-xl text-black/60 leading-relaxed">
                  This project required strategic thinking, strong brand positioning,
                  and a performance-driven digital execution aligned with business goals.
                </p>
              </motion.div>
            </div>

          </div>
        </Container>
      </Section>


      {/* Solutions */}

      <Section className="bg-black py-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

            <div className="md:col-span-4">
              <motion.div
                className="sticky top-32"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
                  02
                </div>
                <h2 className="text-5xl mb-4 text-white" style={{ fontWeight: 700 }}>
                  Our Solution
                </h2>
              </motion.div>
            </div>

            <div className="md:col-span-8 space-y-16">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl text-white/80 leading-relaxed mb-6">
                  We crafted a powerful digital presence built on performance,
                  clarity, and conversion-focused architecture.
                </p>

                <p className="text-xl text-white/60 leading-relaxed">
                  Every interaction, animation, and layout element was designed
                  to elevate the brand perception and maximize engagement.
                </p>
              </motion.div>

              <motion.div
                className="aspect-video overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <ImageWithFallback
                  src={project.galleryImages?.[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

            </div>
          </div>
        </Container>
      </Section>


      {/* UI Showcase */}
      <Section className="bg-white text-black py-32">
        <Container>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {project.galleryImages?.[1] && (
              <motion.div
                className="aspect-[4/5] overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <ImageWithFallback
                  src={project.galleryImages[1]}
                  alt={`${project.title} gallery 2`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            {project.galleryImages?.[2] && (
              <motion.div
                className="aspect-[4/5] overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <ImageWithFallback
                  src={project.galleryImages[2]}
                  alt={`${project.title} gallery 3`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </div>
        </Container>
      </Section>

      {/* Results */}
      <Section className="bg-black py-32">
        <Container>
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              03
            </div>
            <h2 className="text-5xl md:text-7xl text-white" style={{ fontWeight: 700 }}>
              The Results
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-7xl text-[#FF4D00] mb-4" style={{ fontWeight: 900 }}>
                +240%
              </div>
              <div className="text-xl text-white/60">
                Increase in qualified leads
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-7xl text-[#FF4D00] mb-4" style={{ fontWeight: 900 }}>
                3.2M
              </div>
              <div className="text-xl text-white/60">
                Website visits in 6 months
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-7xl text-[#FF4D00] mb-4" style={{ fontWeight: 900 }}>
                92%
              </div>
              <div className="text-xl text-white/60">
                Positive brand perception
              </div>
            </motion.div>

          </div>
        </Container>
      </Section>


      {/* Next Project */}

      <Section className="bg-white text-black py-32">
        <Container>
          <Link to="/work" className="block group">
            <motion.div
              className="border border-black/10 p-12 hover:border-[#FF4D00] transition-all duration-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between">

                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-black/40 mb-4">
                    NEXT PROJECT
                  </div>

                  <h3
                    className="text-5xl mb-2 group-hover:text-[#FF4D00] transition-colors"
                    style={{ fontWeight: 700 }}
                  >
                    View All Work
                  </h3>

                  <div className="text-black/60">
                    Explore our portfolio
                  </div>
                </div>

                <ArrowRight
                  size={48}
                  className="text-black/20 group-hover:text-[#FF4D00] group-hover:translate-x-4 transition-all"
                />

              </div>
            </motion.div>
          </Link>
        </Container>
      </Section>

    </>
  );
}