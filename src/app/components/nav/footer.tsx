import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Container } from '../layout/container';
import LogoPrimary from '../../assets/logo-primary.png';
import instagramIcon from "../../assets/instagram.png";
import facebookIcon from "../../assets/facebook.png";
import linkedinIcon from "../../assets/linkedin.png";
import whatsappIcon from "../../assets/whatsapp.png";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-14 sm:py-16 md:py-24">
      <Container>
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 sm:gap-12 md:gap-16 mb-14 md:mb-16">
          
          {/* Brand */}
          <div className="md:col-span-4 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-15 h-15 sm:w-15 sm:h-15 md:w-15 md:h-15 mx-auto sm:mx-0 rounded-full overflow-hidden flex items-center justify-center mb-6">
                <img
                  src={LogoPrimary}
                  alt="BlackInt Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-base sm:text-lg leading-relaxed" style={{ fontWeight: 400 }}>
                Build. Automate. Grow.<br className="hidden sm:block"/> Making great things in India.
              </p>
            </motion.div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">
                GET IN TOUCH
              </div>

              <a
                href="mailto:contact@blackint.in"
                className="block text-[#FF4D00] text-base sm:text-lg mb-2 hover:underline"
              >
                contact@blackint.in
              </a>

              <a
                href="tel:+919288268417"
                className="block text-[#FF4D00] text-base sm:text-lg hover:underline"
              >
                +91 9288268417
              </a>
              
              <div className="text-s text-white/60 leading-relaxed">
              <br />
                Greater Noida<br />
                Delhi NCR, India 201310
              </div>

            </motion.div>
          </div>

          {/* Explore */}
          <div className="md:col-span-4 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">
                EXPLORE
              </div>

              <nav className="space-y-2 text-white/60 text-sm mb-6">
                <Link to="/work" className="block hover:text-[#FF4D00] transition-colors">Work</Link>
                <Link to="/services" className="block hover:text-[#FF4D00] transition-colors">Services</Link>
                <Link to="/about" className="block hover:text-[#FF4D00] transition-colors">About</Link>
                <Link to="/insights" className="block hover:text-[#FF4D00] transition-colors">Insights</Link>
                <Link to="/contact" className="block hover:text-[#FF4D00] transition-colors">Contact</Link>
              </nav>
            </motion.div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center md:items-center gap-6 text-center md:text-left">
          
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

          {/* Copyright */}
          <motion.div
            className="text-xs text-white/40 flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-8 items-center md:items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span>© 2026 BlackInt. All Rights Reserved.</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </motion.div>
        </div>
      </Container>
    </footer>
  );
}
