import { Link } from 'react-router-dom';
import { motion, useScroll, AnimatePresence, useTransform } from 'motion/react';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import LogoPrimary from '../../assets/logo-primary.png';
import LogoInverse from '../../assets/logo-inverse.png';
import instagramIcon from "../../assets/instagram.png";
import facebookIcon from "../../assets/facebook.png";
import linkedinIcon from "../../assets/linkedin.png";
import whatsappIcon from "../../assets/whatsapp.png";
import { useHeaderTheme } from '../../context/header-theme';
import { useRef, useEffect } from 'react';

export function Header() {
  const { theme, setTheme, isMenuOpen, setIsMenuOpen } = useHeaderTheme();  
  const previousTheme = useRef<'primary' | 'inverse'>(theme);

  const isLight = theme === 'primary';
  const textColor = isLight ? 'text-white' : 'text-black';
  const borderColor = isLight ? 'border-white' : 'border-black';
  const lineColor = isLight ? 'bg-white' : 'bg-black';

  const logoSrc = isLight ? LogoPrimary : LogoInverse;
  const { scrollY } = useScroll();
  const collapseProgress = useTransform(scrollY, [0, 200], [0, 1]);

  useEffect(() => {
  const scrollY = window.scrollY;

  if (isMenuOpen) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
  } else {
    const top = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(top || "0") * -1);
  }
}, [isMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ✅ Reduced mobile padding only */}
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8">
          
          {/* Logo */}
          <Link to="/" className="relative z-50 flex items-center gap-3 md:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
              <img
                src={logoSrc}
                alt="BlackInt Logo"
                className="w-full h-full object-contain transition-all duration-300"
              />
            </div>

            {/* BLACKINT */}
            <div className="overflow-hidden">
              <motion.div
                className="flex items-center text-lg sm:text-xl md:text-3xl lg:text-4xl"
                style={{
                  scale: useTransform(collapseProgress, [0, 1], [1, 0.75]),
                  opacity: useTransform(collapseProgress, [0, 1], [1, 0]),
                }}
              >
                {"BLACKINT".split("").map((letter, index) => {
                  const isOrange = index >= 5;
                  return (
                    <motion.span
                      key={index}
                      className={`font-black tracking-[0.12em] md:tracking-[0.15em] ${
                        isOrange ? 'text-[#FF4D00]' : textColor
                      }`}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </motion.div>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            
            {/* Let's Talk (unchanged for desktop) */}
            <motion.a
              href="/contact"
              className={`hidden md:block ${textColor} text-sm uppercase tracking-widest
                          border-b-2 border-transparent hover:border-current pb-1
                          transition-all duration-300`}
              whileHover={{ y: -2 }}
            >
              LET'S TALK
            </motion.a>

            {/* Hamburger */}
            <button
              aria-label="Menu"
              onClick={() => {
                setIsMenuOpen(prev => {
                  const next = !prev;
                  if (next) {
                    previousTheme.current = theme;
                    setTheme('primary');
                  } else {
                    setTheme(previousTheme.current);
                  }
                  return next;
                });
              }}
              className={`relative z-50 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 border-2 ${borderColor}
                          rounded-full flex items-center justify-center
                          hover:border-[#FF4D00]
                          transition-all duration-300 group`}
            >
              <div className="relative w-4 sm:w-5 h-3 flex flex-col justify-between">
                <motion.span
                  className={`w-full h-0.5 ${lineColor}`}
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : {}}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className={`w-full h-0.5 ${lineColor}`}
                  animate={isMenuOpen ? { opacity: 0 } : {}}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className={`w-full h-0.5 ${lineColor}`}
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : {}}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

/* ================= MENU OVERLAY ================= */
interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const menuItems = [
    { label: "Work", path: "/work" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Insights", path: "/insights" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black text-white z-40 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="h-screen flex flex-col lg:flex-row">

            {/* ================= LEFT SIDE ================= */}
            <div className="relative flex-1 flex items-center justify-center lg:justify-start
                            px-6 sm:px-10 md:px-20 lg:px-32 
                            pt-24 lg:pt-0">

              {/* MENU Label - Mobile */}
                <div className="lg:hidden absolute left-15 top-1/2 -translate-y-1/2">
                  <div
                    className="text-xs sm:text-sm tracking-[0.4em] text-white/30 uppercase"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    MENU
                  </div>
                </div>
                {/* MENU Label - Desktop */}
                <div className="hidden lg:flex absolute left-[80px] top-1/4 -translate-y-1/2">
                  <div
                    className="text-xs md:text-sm tracking-[0.4em] text-white/30 uppercase"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    MENU
              </div>
            </div>

              {/* Main Navigation */}
              <nav className="space-y-3 sm:space-y-4 text-center lg:text-left">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="block
                                 text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                                 font-bold
                                 leading-[0.95]
                                 hover:text-[#FF4D00]
                                 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="flex-1 flex flex-col justify-end
                            px-6 sm:px-10 md:px-16 lg:px-24
                            py-12 md:py-16 lg:py-20
                            text-center lg:text-left">

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
                  GET IN TOUCH
                </div>

                <a
                  href="mailto:contact@blackint.in"
                  className="block text-[#FF4D00] text-lg sm:text-xl mb-2 hover:underline"
                >
                  contact@blaclint.in
                </a>

                <a
                  href="tel:+919288268417"
                  className="block text-[#FF4D00] text-lg sm:text-xl mb-6 hover:underline"
                >
                  +91 9288268417
                </a>

                <div className="text-sm text-white/40 leading-relaxed mb-10">
                  Greater Noida, Delhi NCR<br />
                  India 201310
                </div>
              </motion.div>

              {/* Social */}
              <motion.div
                className="flex gap-5 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {[
                  {
                    icon: whatsappIcon,
                    label: "Whatsapp",
                    link: "https://whatsapp.com"
                  },
                  {
                    icon: instagramIcon,
                    label: "Instagram",
                    link: "https://www.instagram.com/blackinttech?igsh=MWExd3N3YjlrMW43Zw=="
                  },
                  {
                    icon: facebookIcon,
                    label: "Facebook",
                    link: "https://facebook.com"
                  },
                  {
                    icon: linkedinIcon,
                    label: "LinkedIn",
                    link: "https://www.linkedin.com/company/blackint-tech/"
                  }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-[#FF4D00] transition-colors"
                    aria-label={social.label}
                  >
                    <img
                      src={social.icon}
                      alt={social.label}
                      className="w-5 h-5 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition"
                    />
                  </a>
                ))}
              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

