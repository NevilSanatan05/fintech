// src/pages/Planner.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function Planner() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulated AI processing function (replace with real API call)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults({
        budgetBreakdown: {
          Rent: "₹10,000",
          Grocery: "₹5,000",
          Savings: "₹7,000",
          Others: "₹3,000",
        },
        goalTimeline: "Save ₹50,000 in 6 months for your new iPhone",
        tips: [
          "Try automating your savings monthly.",
          "Reduce dining out to save more.",
          "Consider a high-yield savings account.",
        ],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <motion.section
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          AI Finance Planner
        </h2>

        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl mx-auto leading-relaxed">
          Enter your income, expenses, and financial goals in natural language,
          and receive a personalized budget breakdown, goal timeline, and AI-powered tips.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            rows={4}
            placeholder='Example: "I earn ₹30,000 monthly, pay ₹10,000 rent, want to save for a new laptop in 4 months."'
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Planning..." : "Generate Plan"}
          </button>
        </form>

        {/* Results Section */}
        <motion.div
          key={results ? "results" : "empty"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 rounded-2xl p-6 shadow min-h-[180px]"
        >
          {!results && !loading && (
            <p className="text-center text-gray-500">Your plan will appear here.</p>
          )}

          {loading && (
            <p className="text-center text-blue-600 font-semibold">Generating your plan...</p>
          )}

          {results && (
            <>
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                Budget Breakdown
              </h3>
              <ul className="mb-6 space-y-2 text-gray-800">
                {Object.entries(results.budgetBreakdown).map(([category, amount]) => (
                  <li key={category} className="flex justify-between border-b border-gray-300 pb-2">
                    <span>{category}</span>
                    <span className="font-semibold">{amount}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Goal Timeline</h3>
              <p className="mb-6 text-gray-700">{results.goalTimeline}</p>

              <h3 className="text-2xl font-semibold text-blue-700 mb-4">AI Tips</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {results.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      </motion.section>

      {/* Extra Feature Info */}
      <motion.section
        className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-3xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Why use AI for your financial planning?
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-4 max-w-xl mx-auto text-lg">
          <li>
            <strong>Natural Language Input:</strong> Just tell FinBot what you earn, spend, and want, no complex forms required.
          </li>
          <li>
            <strong>Smart Insights:</strong> Get tailored budgeting and savings tips based on your unique financial habits.
          </li>
          <li>
            <strong>Visual Progress Tracking:</strong> Soon you’ll be able to track your goals with easy-to-understand charts.
          </li>
          <li>
            <strong>Privacy First:</strong> Your data is secure and never shared — your finances stay private.
          </li>
        </ul>
      </motion.section>
    </main>
  );
}
