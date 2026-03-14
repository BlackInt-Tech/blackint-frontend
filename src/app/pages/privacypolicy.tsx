import { motion } from "motion/react";
import { Container } from "../components/layout/container";
import { Section } from "../components/layout/section";

export function PrivacyPolicy() {
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
            Privacy Policy
          </h1>

          <p className="text-white/60 mb-10">
            Last Updated: 2026
          </p>

          <div className="space-y-10 text-white/70 leading-relaxed">

            <section>
              <h2 className="text-2xl text-white mb-3">Overview</h2>
              <p>
                At BlackInt, we respect your privacy and are committed to protecting
                the information you share with us. This policy explains how we collect,
                use, and safeguard your personal information when you interact with
                our website and digital services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">Information We Collect</h2>
              <p>
                When you submit a contact request or interact with our services,
                we may collect your name, email address, phone number, company name,
                and project details in order to respond to inquiries and deliver services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">How We Use Information</h2>
              <p>
                The information we collect helps us respond to inquiries,
                understand project requirements, improve our services,
                and communicate with clients regarding ongoing or future work.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">Data Security</h2>
              <p>
                We implement industry-standard security measures to protect
                your information from unauthorized access, misuse, or disclosure.
                Access to personal data is restricted to authorized personnel only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">Third-Party Services</h2>
              <p>
                Our platform may use trusted third-party services such as hosting,
                analytics tools, and communication platforms to operate effectively.
                These services only process information necessary to perform their tasks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">Contact</h2>
              <p>
                If you have questions regarding this privacy policy,
                you can contact us at:
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