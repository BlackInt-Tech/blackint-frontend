import { motion } from "motion/react";
import { Container } from "../components/layout/container";
import { Section } from "../components/layout/section";
import { ScrollIndicator } from "../components/ui/scroll-indicator";
import { useHeaderTheme } from "../context/header-theme";
import { useEffect, useState } from "react";
import { submitContact } from "../../services/contactService";
import { getCachedData, setCachedData } from "../utils/cache";
import { getHomepageData } from "../../services/homepageService";
import { Offering } from "../../types/offering";
import { useLocation } from "react-router-dom";

export function Contact() {

  const [services, setServices] = useState<Offering[]>([]);
  const [packages, setPackages] = useState<Offering[]>([]);
  const { setTheme } = useHeaderTheme();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    offeringType: "" as "PACKAGE" | "SERVICE" | "",
    offeringName: "",
    offeringPrice: "",
    selectedServices: [] as string[],
    projectIdea: ""
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { offeringType, offeringName, offeringPrice } = location.state;

      setFormData((prev) => ({
        ...prev,
        offeringType,
        offeringName,
        offeringPrice
      }));
    }
  }, [location.state]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHomepageData();

        setServices(data.services || []);
        setPackages(data.packages || []);

      } catch (error) {
        console.error("Failed to load offerings", error);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    setTheme("primary");
  }, [setTheme]);

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };

  //SERVICE SELECT
  const handleServiceSelect = (service: Offering) => {
    setFormData((prev) => ({
      ...prev,
      offeringType: "SERVICE",
      offeringName: service.title,
      offeringPrice: service.price
    }));
  };

  //PACKAGE SELECT
  const handlePackageSelect = (pkg: Offering) => {
    setFormData((prev) => ({
      ...prev,
      offeringType: "PACKAGE",
      offeringName: pkg.title,
      offeringPrice: pkg.price
    }));
  };

  //SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {

      const response = await submitContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,

        offeringType: formData.offeringType as "PACKAGE" | "SERVICE",
        offeringName: formData.offeringName,
        offeringPrice: formData.offeringPrice,
        projectIdea: formData.projectIdea,
      });

      if (response.success) {

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          offeringType: "",
          offeringName: "",
          offeringPrice: "",
          selectedServices: [],
          projectIdea: ""
        });

        setSuccessMessage(response.message);
        setShowPopup(true);

        setTimeout(() => setShowPopup(false), 3000);

      } else {
        setErrorMessage("Something went wrong.");
      }

    } catch {
      setErrorMessage("Server error.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.company &&
    formData.projectIdea.length >= 20 &&
    formData.offeringName !== "";

    return (
    <>
      <ScrollIndicator />

      {/* Hero Section */}
      <Section className="pt-32 md:pt-40 pb-20 bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl"
          >

            <div className="text-xl uppercase tracking-[0.3em] text-[#FF4D00] mb-8">
              GET IN TOUCH
            </div>

            <h1
              className="text-5xl md:text-8xl mb-10 leading-[1.05]"
              style={{ fontWeight: 700 }}
            >
              Let's create something amazing.
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed">
              Whether you have a project in mind or just want to chat about the possibilities,
              we'd love to hear from you.
            </p>

          </motion.div>
        </Container>
      </Section>


      {/* Contact Form */}
      <Section className="bg-black pb-24">
        <Container>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

            {/* Form Column */}
            <motion.div
              className="col-span-1 md:col-span-7 w-full max-w-2xl"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >

              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit}
              >

                {/* First Name + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                      First Name *
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00]"
                    />
                  </div>


                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                      Last Name *
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00]"
                    />
                  </div>

                </div>


                {/* Email */}
                <div>

                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                    Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00]"
                  />

                </div>


                {/* Phone */}
                <div>

                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                    Phone *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00]"
                  />

                </div>


                {/* Company */}
                <div>

                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                    Company Name *
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00]"
                  />

                </div>

                {/* SERVICE TYPE */}
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                    Offering Type *
                  </label>

                  <div className="flex gap-4">
                    {["PACKAGE", "SERVICE"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            offeringType: type as "PACKAGE" | "SERVICE",
                            offeringName: "",
                            offeringPrice: ""
                          }))
                        }
                        className={`px-4 py-2 rounded-full border ${
                          formData.offeringType === type
                            ? "bg-[#FF4D00] text-white border-[#FF4D00]"
                            : "border-white/20 text-white/60"
                        }`}
                      >
                        {type === "PACKAGE" ? "Packages" : "Services"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SERVICES / PACKAGES */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                    {formData.offeringType === "PACKAGE" ? "Packages *" : "Services *"}
                  </label>

                  <div className="flex flex-wrap gap-3">

                    {/* SERVICES */}
                    {formData.offeringType === "SERVICE" &&
                      services.map((service) => (
                        <button
                          key={service.publicId}
                          type="button"
                          onClick={() => handleServiceSelect(service)}
                          className={`px-4 py-2 rounded-full text-sm border ${
                            formData.offeringName === service.title
                              ? "bg-[#FF4D00] text-white border-[#FF4D00]"
                              : "border-white/20 text-white/60"
                          }`}
                        >
                          {service.title} • {service.price}
                        </button>
                      ))}

                    {/* PACKAGES */}
                    {formData.offeringType === "PACKAGE" &&
                      packages.map((pkg) => (
                        <button
                          key={pkg.publicId}
                          type="button"
                          onClick={() => handlePackageSelect(pkg)}
                          className={`px-4 py-2 rounded-full text-sm border ${
                            formData.offeringName === pkg.title
                              ? "bg-[#FF4D00] text-white border-[#FF4D00]"
                              : "border-white/20 text-white/60"
                          }`}
                        >
                          {pkg.title} • {pkg.price}
                        </button>
                      ))}

                  </div>
                </div>

                {/* Project Idea */}
                <div>

                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                    Describe Your Project *
                  </label>

                  <textarea
                    name="projectIdea"
                    rows={4}
                    minLength={20}
                    maxLength={500}
                    value={formData.projectIdea}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00] resize-none"
                  />
                  <div className="flex justify-between text-xs text-white/40 mt-2">
                    <span>Minimum 20 characters</span>
                    {formData.projectIdea.length}/500
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className={`mt-8 w-full md:w-auto px-10 py-5 uppercase tracking-widest text-sm rounded-md transition
                  ${
                    loading || !isFormValid
                      ? "bg-gray-600 text-white/70 cursor-not-allowed"
                      : "bg-[#FF4D00] text-white hover:bg-[#ff6a2d]"
                  }`}
                >
                  {loading ? "Requesting..." : "Request Call Back"}
                </motion.button>

                <p className="text-xs text-white/40">
                  Your information is confidential and secure.
                </p>

              </form>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Success Popup */}
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            className="bg-black border border-[#FF4D00]/40 shadow-[0_0_40px_rgba(255,77,0,0.2)] rounded-xl p-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[#FF4D00] text-4xl mb-4">✓</div>

            <h3 className="text-xl font-semibold mb-2">
              Success
            </h3>

            <p className="text-white/60">
              {successMessage}
            </p>
          </motion.div>
        </motion.div>
      )}


      {/* Map Section */}
      <Section className="relative bg-black py-32 overflow-visible">

        <motion.div
          className="absolute inset-0 bg-black z-20"
          initial={{ x: "0%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <Container>

          <motion.div
            className="relative z-10 space-y-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >

            <div className="text-center text-white">

              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
                OUR LOCATION
              </div>

              <h2
                className="text-4xl md:text-6xl mb-6"
                style={{ fontWeight: 700 }}
              >
                Greater Noida, India
              </h2>

              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Operating from Greater Noida, Uttar Pradesh —
                working with clients globally.
              </p>

            </div>


            <div className="group relative overflow-hidden rounded-xl h-[420px] md:h-[520px] border border-white/10">

              <iframe
                title="BlackInt Location - Greater Noida"
                src="https://www.google.com/maps?q=Greater+Noida,+Uttar+Pradesh,+India&output=embed"
                className="absolute inset-0 w-full h-full border-0 grayscale contrast-125 brightness-75"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <motion.div
                className="absolute inset-0 bg-[#FF4D00]/40 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">

                <motion.span
                  className="absolute inline-flex h-16 w-16 rounded-full bg-[#FF4D00]/30"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.span
                  className="absolute inline-flex h-10 w-10 rounded-full bg-[#FF4D00]/40"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />

                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#FF4D00] shadow-[0_0_12px_rgba(255,77,0,0.8)]" />

              </div>

            </div>

          </motion.div>

        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-black py-32">

        <Container>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >

            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8 text-center">
              COMMON QUESTIONS
            </div>

            <h2
              className="text-4xl md:text-6xl mb-16 text-center"
              style={{ fontWeight: 700 }}
            >
              Frequently Asked Questions
            </h2>


            <div className="space-y-8">

              {[
                {
                  q: "What types of digital solutions does BlackInt specialize in?",
                  a: "BlackInt specializes in building modern digital platforms including websites, SaaS applications, AI-powered systems, custom business tools, and scalable cloud-based solutions. Our focus is on creating high-performance, secure, and scalable technology that helps businesses grow and operate more efficiently."
                },
                {
                  q: "Do you build custom software tailored to specific business needs?",
                  a: "Yes. Every project we build is customized according to the client’s business goals, workflows, and technical requirements. Instead of generic templates, we design and develop tailored digital solutions that solve real problems and deliver measurable value."
                },
                {
                  q: "Can BlackInt help startups build their first product or MVP?",
                  a: "Absolutely. We work closely with startups to design and develop Minimum Viable Products (MVPs), helping them launch faster and validate their ideas. Our team provides guidance on product architecture, scalability, and technology choices for long-term success."
                },
                {
                  q: "What technologies does your development team use?",
                  a: "Our team works with modern technologies including React, Next.js, Spring Boot, Node.js, cloud infrastructure, APIs, and AI integrations. We choose the best tech stack based on project requirements to ensure performance, scalability, and future growth."
                },
                {
                  q: "How does the project collaboration process work?",
                  a: "Our process typically includes discovery, planning, design, development, testing, and deployment. Throughout the project, we maintain transparent communication, provide progress updates, and collaborate closely with clients to ensure the final product aligns with their vision."
                },
                {
                  q: "Do you provide UI/UX design along with development?",
                  a: "Yes. We design modern, intuitive user interfaces and experiences before development begins. Our UI/UX process focuses on usability, aesthetics, and performance to ensure the final product is not only functional but also engaging for users."
                },
                {
                  q: "Can you integrate third-party services and APIs into our system?",
                  a: "Yes. We integrate various third-party services including payment gateways, authentication systems, analytics tools, CRMs, and other APIs. Our goal is to seamlessly connect your platform with the tools your business already uses."
                },
                {
                  q: "Do you provide maintenance and support after launch?",
                  a: "Yes. After launching a project, we offer ongoing maintenance and support to ensure everything runs smoothly. This includes performance monitoring, bug fixes, security updates, feature improvements, and technical assistance whenever needed."
                },
                {
                  q: "Can BlackInt scale platforms as businesses grow?",
                  a: "Yes. We build platforms with scalability in mind from the start. Our architectures are designed to handle increasing users, data, and traffic, ensuring your system continues to perform reliably as your business expands."
                },
                {
                  q: "How can businesses start a project with BlackInt?",
                  a: "Getting started is simple. You can reach out through our contact form with your project idea or requirements. Our team will review your request, schedule a consultation, and guide you through the next steps to bring your digital vision to life."
                }
              ].map((faq, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/10 pb-6"
                >

                  <h3 className="text-xl mb-3" style={{ fontWeight: 600 }}>
                    {faq.q}
                  </h3>

                  <p className="text-white/60 leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}