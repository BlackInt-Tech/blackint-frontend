import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router-dom';
import { useScroll } from "motion/react";
import { useHeaderTheme } from '../context/header-theme';
import { useEffect, useState} from 'react';
import { getPublishedProjects } from "../../services/projectService";
import { Project } from "../../types/project";
import { getCachedData, setCachedData } from '../utils/cache';

export function Work() {
  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();
  const [projects, setProjects] = useState<Project[]>([]);
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
    async function loadProject() {
      try {
        setLoading(true);

        const cached = getCachedData<Project[]>("work_projects");

        if (cached) {
          setProjects(cached);
          setLoading(false);
          return;
        }

        const data = await getPublishedProjects();
        setProjects(data || []);

        setCachedData("work_projects", data || []);
      } catch (error) {
        console.error("Work Page Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
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
          >
            <h1 className="text-6xl md:text-8xl mb-8 leading-[1.1]" style={{ fontWeight: 700 }}>
              Featured Work
            </h1>
            <p className="text-xl md:text-2xl text-black/60 max-w-3xl">
              Explore some of our latest website projects.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section className="bg-white text-black pb-32">
      <Container className="bg-white">
        <div className="space-y-24 bg-white">
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
                  className="bg-white"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Link to={`/work/${project.slug}`} className="group block bg-white">
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                        !isEven ? "md:grid-flow-dense" : ""
                      }`}
                    >

                      {/* Image */}
                      <motion.div
                        className={`relative overflow-hidden aspect-[4/3] bg-white ${
                          !isEven ? "md:col-start-2" : ""
                        }`}
                        initial={{ x: isEven ? -80 : 80, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
                        className={`bg-white ${
                          !isEven ? "md:col-start-1 md:row-start-1" : ""
                        }`}
                        initial={{ x: isEven ? 80 : -80, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
      </Container>
    </Section>

      {/* CTA Section */}
      <Section className="bg-black py-32">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl mb-12" style={{ fontWeight: 700 }}>
              Ready to start your project?
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300"
            >
              <span className="text-sm uppercase tracking-widest">GET IN TOUCH</span>
              <span className="text-xl">+</span>
            </Link>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
