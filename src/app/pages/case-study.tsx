import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { ImageWithFallback } from '../components/blackint/ImageWithFallback';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useHeaderTheme } from '../context/header-theme';
import { useEffect, useState } from "react";
import { useScroll } from "motion/react";
import { getProjectBySlug } from "../../service/project.service";
import { ProjectInterface } from "../../interface/project";
import { getCachedData, setCachedData } from '../utils/cache';

export function CaseStudy() {

  const { slug } = useParams();
  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();

  const [project, setProject] = useState<ProjectInterface | null>(null);
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
      const cached = getCachedData<ProjectInterface>(cacheKey);

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
    setTheme("inverse");

    const unsubscribe = scrollY.on("change", (y: number) => {
      if (y < window.innerHeight * 2) {
        setTheme("inverse");
      } else if (y < window.innerHeight * 3.55) {
        setTheme("primary");
      } else if (y < window.innerHeight * 4.74) {
        setTheme("inverse");
      } else if (y < window.innerHeight * 5.6) {
        setTheme("primary");
      } else if (y < window.innerHeight * 6.22) {
        setTheme("inverse");
      } else {
        setTheme("primary");
      }
    });

    return () => unsubscribe();
  }, [scrollY, setTheme]);

  if (loading) {
    return (
      <Section className="bg-black text-white py-32">
        <Container>
          <p className="text-xl">Loading project...</p>
        </Container>
      </Section>
    );
  }

  if (!project) {
    return (
      <Section className="bg-black text-white py-32">
        <Container>
          <p className="text-xl">Project not found.</p>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <ScrollIndicator />

      {/* HERO IMAGE */}

      <div className="h-screen md:h-screen relative bg-white">

        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* <ImageWithFallback
            src={project.galleryImages[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          /> */}
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-white/50" />

          <div className="absolute bottom-0 left-0 right-0 top-0 pb-24 mt-20">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="text-xl font-extrabold uppercase tracking-[0.3em] text-[#FF4D00] mb-4">
                  CASE STUDY
                </div>

                <h1 className="text-2xl md:text-6xl mb-2 text-[#fff]" style={{ fontWeight: 800 }}>
                  {project.title}
                </h1>

                <p className="text-md md:text-xl text-lack mb-16">
                  {project.shortDescription}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="md:text-xs text-[12px] uppercase tracking-[0.3em] text-white/80 mb-1">
                CLIENT
              </div>
              <div className="md:text-2xl text-[16px]">
                {project.clientName}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-white/80 mb-1">
                PROJECT URL
              </div>
              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl break-all text-[#FF4D00] hover:underline"
                >
                  {project.projectUrl}
                </a>
              ) : (
                <span className="text-2xl text-white/80">
                  —
                </span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-white/80 mb-1">
                PUBLISHED
              </div>
              <div className="text-[24px]">
                {project.publishedAt
                  ? new Date(project.publishedAt).toLocaleDateString()
                  : "Not Published"}
              </div>
            </motion.div>

          </div>
            </Container>
          </div>
        </div>

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
                <div className="text-3xl uppercase tracking-[0.3em] text-black/20 mb-4" style={{ fontWeight: 900 }}>
                  01
                </div>
                <h2 className="text-5xl mb-4" style={{ fontWeight: 800 }}>
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
                <p className="text-xl text-black/70 leading-relaxed mb-6">
                   {project.shortDescription}
                </p>
              </motion.div>

              <motion.div
                className="aspect-[6/3] overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <ImageWithFallback
                  src={project.galleryImages[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
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
                <div className="text-3xl uppercase tracking-[0.3em] text-white/40 mb-4" style={{ fontWeight: 900 }}>
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
                <p className="text-md text-white/70 leading-relaxed mb-6">
                  {project.fullContent}
                </p>

              </motion.div>

              <motion.div
                className="aspect-[6/3] overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
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
                className="aspect-[6/3] overflow-hidden rounded-2xl"
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
                className="aspect-[6/3] overflow-hidden rounded-2xl"
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

            {project.galleryImages?.[3] && (
              <motion.div
                className="aspect[6/3] overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <ImageWithFallback
                  src={project.galleryImages[3]}
                  alt={`${project.title} gallery 4`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            {project.galleryImages?.[4] && (
              <motion.div
                className="aspect-[6/3] overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <ImageWithFallback
                  src={project.galleryImages[4]}
                  alt={`${project.title} gallery 5`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            {project.galleryImages?.[5] && (
              <motion.div
                className="aspect-[6/3] overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <ImageWithFallback
                  src={project.galleryImages[5]}
                  alt={`${project.title} gallery 6`}
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
            <div className="text-4xl uppercase tracking-[0.3em] text-white/40 mb-4"  style={{ fontWeight: 900 }}>
              03
            </div>
            <h2 className="text-5xl md:text-6xl text-white" style={{ fontWeight: 800 }}>
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
              <div className="text-xl text-white/80">
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
              <div className="text-xl text-white/80">
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
              <div className="text-xl text-white/80">
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