import { motion } from "motion/react";
import { Container } from "../components/layout/container";
import { Section } from "../components/layout/section";

export function TermsOfService() {
  return (
    <Section className="bg-black text-white py-32">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >

          <h1 className="text-5xl md:text-6xl mb-6 font-bold">
            Terms of Service
          </h1>

          <p className="text-white/60 mb-10">
            Last Updated: 2026
          </p>

          <div className="space-y-10 text-white/70 leading-relaxed">

            <section>
              <h2 className="text-2xl text-white mb-3">Introduction</h2>
              <p>
                These Terms of Service govern your access to and use of
                BlackInt’s website and services. By using our website,
                you agree to comply with these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">Services</h2>
              <p>
                BlackInt provides digital product development including
                websites, SaaS platforms, AI-powered solutions,
                API integrations, and scalable digital infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">User Responsibilities</h2>
              <p>
                Users agree to provide accurate information when submitting
                inquiries and must not attempt to misuse or disrupt
                the website or services provided by BlackInt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">Intellectual Property</h2>
              <p>
                All content, branding, and technology developed by BlackInt
                remain the intellectual property of the company unless
                otherwise specified in written agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">Limitation of Liability</h2>
              <p>
                BlackInt shall not be held liable for indirect or consequential
                damages arising from the use or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">Contact</h2>
              <p>
                For questions regarding these terms please contact:
              </p>

              <p className="text-[#FF4D00] mt-2">
                contact@blackint.in
              </p>
            </section>

          </div>

        </motion.div>

      </Container>
    </Section>
  );
}