import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const features = [
  {
    title: "Smart Budgeting",
    desc: "Instantly generate a budget breakdown from plain text input.",
    icon: "💰",
  },
  {
    title: "Goal Planning",
    desc: "Set goals (like buying an iPhone) and see a timeline to achieve them.",
    icon: "🎯",
  },
  {
    title: "AI Tips",
    desc: "Get personalized investment advice based on your risk profile.",
    icon: "🧠",
  },
  {
    title: "Track Progress",
    desc: "See your savings grow with visual charts and insights.",
    icon: "📊",
  },
  {
    title: "Visual Dashboards",
    desc: "Understand your finances better with rich, interactive graphs.",
    icon: "📈",
  },
  {
    title: "Free to Use",
    desc: "No cost. No ads. Built for students and young professionals.",
    icon: "🆓",
  },
];

const testimonials = [
  {
    name: "Anita Sharma",
    role: "Student",
    feedback:
      "FinBot.AI transformed the way I manage my pocket money. The AI budgeting tips are super helpful!",
  },
  {
    name: "Raj Patel",
    role: "Young Professional",
    feedback:
      "The goal planning feature helped me save for my dream laptop in just 6 months. Highly recommend!",
  },
  {
    name: "Meera Singh",
    role: "Freelancer",
    feedback:
      "The visual dashboards make it so easy to track my expenses and investments. A must-have app.",
  },
];

export default function Home() {
  // Testimonial carousel index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top button visibility
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="p-8 space-y-28 bg-gray-50 min-h-screen flex flex-col relative">
      {/* Hero Section */}
      <motion.section
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        aria-label="Welcome Hero Section"
      >
        <h1 className="text-6xl font-extrabold text-blue-600 mb-6 leading-tight">
          Welcome to FinBot.AI 🧠
        </h1>
        <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
          Your smart personal finance planner. Track spending, set goals, and get
          AI-powered tips — all in one intuitive platform.
        </p>
        <a
          href="/planner"
          className="inline-block mt-10 px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          aria-label="Start Planning Now"
        >
          Start Planning Now
        </a>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        aria-label="Features Section"
      >
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-12">
          Why Use FinBot?
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: idx * 0.15, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.05 }}
              tabIndex={0}
              role="group"
              aria-labelledby={`feature-title-${idx}`}
            >
              <div className="text-6xl mb-6" aria-hidden="true">
                {feature.icon}
              </div>
              <h3
                id={`feature-title-${idx}`}
                className="text-2xl font-semibold mb-3 text-blue-700"
              >
                {feature.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="max-w-4xl mx-auto text-center px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        aria-label="How It Works Section"
      >
        <h2 className="text-4xl font-semibold mb-8 text-gray-800">How It Works</h2>
        <ol className="space-y-6 text-lg text-left max-w-xl mx-auto list-decimal list-inside">
          <li>
            <strong>Type</strong> something like:{" "}
            <em>“I earn ₹30k, spend ₹10k on rent, saving for iPhone.”</em>
          </li>
          <li>
            <strong>Get AI Output:</strong> Budget breakdown, goal timeline, and
            savings plan tailored to you.
          </li>
          <li>
            <strong>Visualize</strong> everything with interactive charts and track
            your progress over time.
          </li>
        </ol>
      </motion.section>

      {/* Testimonials */}
      <section
        className="max-w-3xl mx-auto text-center bg-white rounded-3xl p-10 shadow-lg"
        aria-label="User Testimonials"
      >
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">What Users Say</h2>
        <blockquote className="text-xl italic text-gray-700 mb-4">
          “{testimonials[testimonialIndex].feedback}”
        </blockquote>
        <p className="font-semibold text-blue-600">
          - {testimonials[testimonialIndex].name},{" "}
          <span className="text-gray-500">{testimonials[testimonialIndex].role}</span>
        </p>
      </section>

      {/* CTA Footer */}
      <motion.section
        className="text-center py-16 bg-blue-600 text-white rounded-xl shadow-lg max-w-4xl mx-auto px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        aria-label="Call to Action"
      >
        <h2 className="text-4xl font-bold mb-6">Ready to take control of your money?</h2>
        <p className="mb-8 text-xl max-w-lg mx-auto">
          Let FinBot.AI guide your financial journey with smart insights and
          personalized plans.
        </p>
        <a
          href="/planner"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
          aria-label="Try FinBot Now"
        >
          Try FinBot Now
        </a>
      </motion.section>

      {/* Footer */}
      <footer
        className="mt-auto bg-gray-100 border-t border-gray-300 py-8"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-600">
          <p className="mb-4 md:mb-0">&copy; 2025 FinBot.AI. All rights reserved.</p>
          <nav className="flex space-x-6" aria-label="Footer Navigation">
            <a
              href="/privacy"
              className="hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              Contact
            </a>
          </nav>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          ↑
        </button>
      )}
    </main>
  );
}
