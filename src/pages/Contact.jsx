// src/pages/Contact.jsx
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    setSubmitStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Simulate form submission
    setSubmitStatus("Submitting...");
    setTimeout(() => {
      setSubmitStatus("Thank you for reaching out! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-lg mt-12">
      <h2 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Contact Us
      </h2>
      <p className="text-center text-gray-700 mb-10 max-w-lg mx-auto">
        Have questions, feedback, or need support? Fill out the form below and our
        team will get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-semibold mb-2 text-gray-800">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-semibold mb-2 text-gray-800">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block font-semibold mb-2 text-gray-800">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject of your message"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 ${
              errors.subject ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.subject && <p className="text-red-500 mt-1">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block font-semibold mb-2 text-gray-800">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Write your message here..."
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-4 border rounded-xl resize-y focus:outline-none focus:ring-2 ${
              errors.message ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.message && <p className="text-red-500 mt-1">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
          disabled={submitStatus === "Submitting..."}
        >
          {submitStatus === "Submitting..." ? "Sending..." : "Send Message"}
        </button>

        {/* Submission Status */}
        {submitStatus && submitStatus !== "Submitting..." && (
          <p className="mt-4 text-center text-green-600 font-medium">{submitStatus}</p>
        )}
      </form>

      {/* Additional Contact Info */}
      <section className="mt-16 text-center text-gray-600 max-w-xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Other Ways to Reach Us</h3>
        <p>
          Email: <a href="mailto:support@finbot.ai" className="text-blue-600 hover:underline">support@finbot.ai</a>
        </p>
        <p>Phone: <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 12345 67890</a></p>
        <p className="mt-4 text-sm italic">
          We aim to respond to all queries within 24 hours.
        </p>
      </section>
    </section>
  );
}
