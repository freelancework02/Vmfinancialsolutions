// ContactSection.GoldDeep.jsx
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, Calendar, ShieldCheck, MapPin } from "lucide-react";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * ContactSection.GoldDeep.jsx
 * - Uses deep-navy (#082a48) as the main background for the contact area.
 * - Gold gradient accents preserved (no external images or logos).
 * - Replaced contact info with the email and business hours you provided.
 * - Responsive, accessible, and self-contained (Tailwind classes + inline styles).
 *
 * Note: keep your emailjs service/template/keys as they were in your project.
 */

const GOLD_START = "#f7d88b";
const GOLD_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const SURFACE = "#ffffff";

const WHATSAPP_GREEN = "#25D366";
const WHATSAPP_DARK = "#128C7E";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters).";
    }
    const email = String(formData.email || "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!emailOk) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message || formData.message.trim().length < 12) {
      newErrors.message = "Tell us a bit more (at least 12 characters).";
    }
    if (formData.company && formData.company.trim().length > 0) {
      newErrors.company = "Spam detected.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const templateParams = {
      from_name: formData.name,
      email: formData.email,
      message: formData.message,
    };

  emailjs.send(
  "service_clfjpui",
  "template_329vuuu",
  templateParams,
  "CVKrczuvBFE0HOIOy"
)
      .then(
        () => {
          toast.success("🎉 Thanks — your message has been sent.");
          setFormData({ name: "", email: "", message: "", company: "" });
          setErrors({});
        },
        (error) => {
          console.error(error);
          toast.error("❌ Could not send your message. Please try again.");
        }
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section
      aria-labelledby="contact-heading"
      className="relative overflow-hidden"
      style={{
        background: DEEP_NAVY,
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* subtle top decorative band */}
      <div
        aria-hidden
        style={{
          height: 140,
          background: DEEP_NAVY,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 lg:py-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <div
                className="inline-flex items-center justify-center w-9 h-9 rounded-full shadow-sm"
                style={{
                  background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 17h4v4H3v-4zM10 10h4v11h-4V10zM17 4h4v17h-4V4z" fill="#082a48" />
                </svg>
              </div>

              <div>
                <div className="text-sm uppercase tracking-wider font-semibold" style={{ color: "#fff" }}>
                  Contact & Support
                </div>
                <div className="text-xs text-white/90">We typically reply within 24 hours</div>
              </div>
            </div>

            <h2 id="contact-heading" className="text-3xl md:text-4xl font-extrabold" style={{ color: "#fff" }}>
              Let’s talk about your goals
            </h2>

            <p className="mt-3 text-base text-white/85 max-w-2xl">
              Send a message, message on WhatsApp, or book a quick call — whichever works best for you.
            </p>
          </div>

          <div className="ml-auto hidden md:flex items-center gap-3">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium shadow"
              style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: DEEP_NAVY }}
            >
              <ShieldCheck size={16} />
              We reply within 24 hours
            </div>
          </div>
        </div>

        {/* Grid: Form left, contact options right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form card (white) - spans 7 on lg */}
          <div className="lg:col-span-7">
            <div
              className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-1">Contact Us</h3>
              <p className="text-center text-gray-600 mb-6">We'll get back to you quickly with clear next steps.</p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-describedby="form-errors">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    className={`w-full p-3 rounded-lg border outline-none focus:ring-2 transition ${errors.name ? "border-red-300 focus:ring-red-400" : "border-gray-200"
                      }`}
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className={`w-full p-3 rounded-lg border outline-none focus:ring-2 transition ${errors.email ? "border-red-300 focus:ring-red-400" : "border-gray-200"
                      }`}
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="How can we help?"
                    className={`w-full p-3 rounded-lg min-h-[140px] border outline-none focus:ring-2 resize-y transition ${errors.message ? "border-red-300 focus:ring-red-400" : "border-gray-200"
                      }`}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-600 text-sm mt-1" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${isSubmitting ? "bg-gray-300 cursor-not-allowed" : ""
                    }`}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  style={{
                    background: isSubmitting ? undefined : `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                    boxShadow: isSubmitting ? "none" : "0 12px 34px rgba(199,155,75,0.14)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p id="form-errors" className="text-xs text-black text-center" aria-live="polite">
                  We respect your privacy. We’ll never share your details.
                </p>
              </form>
            </div>
          </div>

          {/* Right: contact options (panel styled on deep-navy) - spans 5 on lg */}
          <aside className="lg:col-span-5 flex flex-col gap-6">
            <div
              className="relative rounded-3xl overflow-hidden shadow-lg p-6"
              style={{ background: DEEP_NAVY }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` }}
                >
                  <Mail size={18} color={DEEP_NAVY} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold" style={{ color: "#fff" }}>
                    Prefer a quick conversation?
                  </h4>
                  <p className="text-sm text-white/80 mt-1">Choose the fastest way to reach us.</p>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <a
                  href="mailto:info@vmfinancialsolutions.com"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-white/8 border border-white/10 text-white hover:bg-white/12 transition"
                  aria-label="Email us"
                >
                  <Mail size={16} />
                  Email
                </a>

                <a
                  href="tel:+13128639331"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-white/8 border border-white/10 text-white hover:bg-white/12 transition"
                  aria-label="Call us"
                >
                  <Phone size={16} />
                  Call
                </a>
              </div>

              <a
                href="https://api.whatsapp.com/send?phone=13128639331&text=Hello!"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-3 rounded-xl px-4 py-3 font-semibold text-white transition transform"
                style={{
                  background: `linear-gradient(135deg, ${WHATSAPP_GREEN}, ${WHATSAPP_DARK})`,
                  boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
                }}
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
                Message us on WhatsApp
              </a>

              <button
                onClick={() =>
                  window.Calendly?.initPopupWidget?.({
                    url: "https://calendly.com/vmfinsolutions/financialneedanalysis",
                  })
                }
                className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold bg-white"
                aria-label="Book a call"
                style={{ color: DEEP_NAVY }}
              >
                <Calendar size={16} />
                Book a Call
              </button>
            </div>

            {/* contact card with new info and hours */}
            <div className="rounded-3xl p-6 bg-white border shadow-sm" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold" style={{ color: DEEP_NAVY }}>
                    VM Financial Solutions
                  </h4>

                  <div className="mt-3 text-sm text-gray-700 space-y-2">
                    <div>📧 <a href="mailto:info@vmfinancialsolutions.com" className="font-medium" style={{ color: DEEP_NAVY }}>info@vmfinancialsolutions.com</a></div>

                    <div>
                      <div className="font-medium text-sm" style={{ color: DEEP_NAVY }}>Hours</div>
                      <div className="text-sm text-gray-600">
                        Monday - Friday: 6 pm - 9 pm<br />
                        Saturday & Sunday: Available throughout the day
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} /> <span>Mount Airy, MD</span>
                  </div> */}
                </div>

                <div className="hidden sm:flex items-center">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M3 17h4v4H3v-4zM10 10h4v11h-4V10zM17 4h4v17h-4V4z" fill={DEEP_NAVY} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* reassurance strip */}
            <div className="rounded-2xl p-4 bg-white/6 border border-white/6 text-sm text-white/90" style={{ backdropFilter: "blur(6px)", background: "rgba(255,255,255,0.03)" }}>
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} color={GOLD_START} />
                <div>
                  <div className="font-semibold" style={{ color: "#fff" }}>Secure & Confidential</div>
                  <div className="text-xs text-white/80">We protect your information and privacy.</div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer note */}
        <div className="mt-14 text-center text-sm text-white/70">
          © {new Date().getFullYear()} VM Financial Solutions. All Rights Reserved.
        </div>
      </div>
    </section>
  );
}
