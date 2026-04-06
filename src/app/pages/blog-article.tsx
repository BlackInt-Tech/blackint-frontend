import { motion, useScroll } from "motion/react";
import { Container } from "../components/layout/container";
import { Section } from "../components/layout/section";
import { ScrollIndicator } from "../components/ui/scroll-indicator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useHeaderTheme } from "../context/header-theme";
import { useEffect, useState } from "react";
import { getBlogBySlug } from "../../services/insightService";
import { getHomepageData } from "../../services/homepageService";
import { Insight } from "../../types/insight";
import { getCachedData, setCachedData } from "../utils/cache";

export function BlogArticle() {
  const { setTheme } = useHeaderTheme();
  const { scrollY } = useScroll();
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  const [relatedBlogs, setRelatedBlogs] = useState<Insight[]>([]);

  // Header theme scroll logic
  useEffect(() => {
    setTheme("primary");

    const unsubscribe = scrollY.on("change", (y: number) => {
      if (y < window.innerHeight * 2.25) {
        setTheme("primary");
      } else if (y < window.innerHeight * 4.59) {
        setTheme("inverse");
      } else {
        setTheme("primary");
      }
    });

    return () => unsubscribe();
  }, [scrollY, setTheme]);

  // Blog Load Logic with Cache
  useEffect(() => {
   async function loadBlog() {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const cacheKey = `blog_slug_${slug}`;
      const cached = getCachedData<Insight>(cacheKey);

      let currentBlog = cached;

      if (!currentBlog) {
        currentBlog = await getBlogBySlug(slug);
        if (currentBlog) {
          setCachedData(cacheKey, currentBlog);
        }
      }

      setBlog(currentBlog);

      const homepageCacheKey = "homepage_data";

      let homepageData = getCachedData<{
        insights: Insight[];
      }>(homepageCacheKey);

      if (!homepageData) {
        homepageData = await getHomepageData();
        setCachedData(homepageCacheKey, homepageData);
      }

      if (homepageData?.insights && currentBlog) {
        const filtered = homepageData.insights
          .filter((item: Insight) => item.slug !== currentBlog.slug)
          .slice(0, 2);

        setRelatedBlogs(filtered);
      }

    } catch (error) {
      console.error("Blog load error:", error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  }

    loadBlog();
  }, [slug]);

  // Loading Screen
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  // Not Found
  if (!blog) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Blog not found
      </div>
    );
  }

  // MAIN RENDER
  return (
    <>
      <ScrollIndicator />

      {/* Back Button */}
      <Section className="pt-32 bg-black">
        <Container>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#FF4D00] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Insights
          </Link>
        </Container>
      </Section>

      {/* Article Header */}
      <Section className="bg-black pt-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-xl uppercase tracking-[0.3em] text-[#FF4D00] mb-6">
                {blog.category}
              </div>

              <h1
                className="text-5xl md:text-7xl mb-6 leading-tight text-white"
                style={{ fontWeight: 700 }}
              >
                {blog.title}
              </h1>

              <div className="flex items-center gap-6 text-white/60 text-sm mb-12">
                <span>
                  {new Date(blog.publishedAt).toDateString()}
                </span>
                <span>•</span>
                <span>{blog.readTime} min read</span>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Featured Image */}
      <Section className="py-0 bg-black pb-12">
        <Container>
          <motion.div
            className="w-full max-h-[500px] flex items-center justify-center mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ImageWithFallback
              src={blog.featuredImage}
              alt={blog.title}
              className="max-w-full max-h-[500px] object-contain"
            />
          </motion.div>
        </Container>
      </Section>

      {/* Article Content */}
      <Section className="bg-white text-black py-32">
        <Container>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8 text-black/80 leading-relaxed"
            >
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Related Articles */}
      <Section className="bg-black py-32">
        <Container>
          <h3 className="text-4xl md:text-5xl text-white mb-12 font-bold">
            Related Articles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedBlogs.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <Link to={`/insights/${item.slug}`}>
                  <div className="aspect-[16/10] overflow-hidden mb-4">
                    <ImageWithFallback
                      src={item.featuredImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="text-xs uppercase tracking-widest text-white/40 mb-2">
                    {item.category}
                  </div>

                  <h4 className="text-2xl text-white group-hover:text-[#FF4D00] transition-colors font-semibold">
                    {item.title}
                  </h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}