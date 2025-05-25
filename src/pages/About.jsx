// src/pages/About.jsx
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="bg-gray-50 min-h-screen p-8">
      <motion.section
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          About FinBot.AI
        </h2>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          FinBot.AI is designed specifically for young individuals and
          professionals who want to take control of their financial future
          without the hassle of complex tools. Whether you're a student,
          freelancer, or starting your career, FinBot offers a friendly, smart
          assistant to help you budget, save, and plan your goals.
        </p>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          By leveraging modern technologies like React and Tailwind CSS for a
          sleek, responsive experience, combined with powerful AI algorithms,
          FinBot transforms your casual financial inputs into clear, actionable
          insights — helping you make smarter decisions with confidence.
        </p>

        <motion.div
          className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600 shadow-sm mb-8"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">
            Our Mission
          </h3>
          <p className="text-gray-800 leading-relaxed">
            To empower young people to build healthy financial habits by
            providing intuitive tools that simplify money management and goal
            planning — all powered by cutting-edge AI technology.
          </p>
        </motion.div>

        <motion.div
          className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600 shadow-sm mb-8"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-green-700 mb-2">
            Why Choose FinBot.AI?
          </h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2 leading-relaxed">
            <li>
              Simple, natural language input for effortless budgeting and goal
              setting.
            </li>
            <li>AI-powered insights tailored to your unique financial profile.</li>
            <li>Interactive visual dashboards that make understanding finances fun.</li>
            <li>100% free and ad-free, focused on your success.</li>
            <li>Responsive design for use on any device — phone, tablet, or desktop.</li>
          </ul>
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-gray-600 italic max-w-xl mx-auto">
            “Your financial journey is personal — and with FinBot.AI, you’re never
            alone in reaching your goals.”
          </p>
          <p className="mt-4 font-semibold text-blue-600">– The FinBot Team</p>
        </motion.div>
      </motion.section>
    </main>
  );
}
