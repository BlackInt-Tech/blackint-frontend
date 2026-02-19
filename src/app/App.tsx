import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/nav/header';
import { Footer } from './components/nav/footer';
import { CustomCursor } from './components/cursor/custom-cursor';
import { Preloader } from './components/preloader/preloader';
import { BackToTop } from './components/ui/back-to-top';
import { Homepage } from './pages/homepage';
import { Services } from './pages/services';
import { Work } from './pages/work';
import { CaseStudy } from './pages/case-study';
import { About } from './pages/about';
import { Insights } from './pages/insights';
import { BlogArticle } from './pages/blog-article';
import { Contact } from './pages/contact';
import { HeaderThemeProvider } from './context/header-theme';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/about" element={<About />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<BlogArticle />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <HeaderThemeProvider>
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <CustomCursor />
          <ScrollToTop />
          <Header />
          <main className="min-h-screen">
            <AnimatedRoutes />
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
      </HeaderThemeProvider>
    </Router>
  );
}