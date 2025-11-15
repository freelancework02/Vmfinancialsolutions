// FoundationalCommitments.Gold.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Mail, HelpCircle } from "lucide-react";
import faqimg from "../../assets/faqimg.jpg"; // keep your path
import Logo from "../../assets/Logo/logo.png"; // optional if you want to show logo

/**
 * FAQ - Gold theme (uses logo gold gradient + deep-navy)
 * - Keeps your original copy exactly the same.
 * - Improved layout, responsive, accessible accordion with smooth height animation.
 * - Visuals: deep-navy backgrounds, gold gradient accents, soft shadows and rounded cards.
 */

const GOLD_START = "#f7d88b";
const GOLD_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const TEXT = "#0f0f0f";
const SOFT_BG = "rgba(8,42,72,0.03)";

const commitmentsData = [
  {
    title:
      "Is it possible to engage a financial advisor if I don't have a substantial amount of disposable income?",
    content:
      "Yes, everyone can benefit from financial advising. We help you make confident financial decisions — regardless of your income level.",
  },
  {
    title: "Can you help make my investments more secure?",
    content:
      "We work with you to balance risk and reward, ensuring your investments support your long-term goals.",
  },
  {
    title: "Could you please review my portfolio?",
    content:
      "Regular portfolio reviews keep your financial direction aligned. We conduct a full Financial Needs Analysis for your entire portfolio.",
  },
  {
    title: "What kind of kids' education plans do you offer?",
    content:
      "We estimate future education costs and recommend personalized financial products to match your family's goals.",
  },
  {
    title: "Do you provide assistance with life insurance?",
    content:
      "Life insurance is essential for long-term family security, asset protection, and estate planning — and we guide you through it all.",
  },
];

export default function FoundationalCommitmentsGold() {
  const [open, setOpen] = useState(null);
  const contentRefs = useRef({});

  useEffect(() => {
    // set maxHeight for open panel for smooth accessible animation
    Object.keys(contentRefs.current).forEach((k) => {
      const el = contentRefs.current[k];
      if (!el) return;
      if (Number(k) === open) {
        // allow a little breathing room
        el.style.maxHeight = el.scrollHeight + 24 + "px";
      } else {
        el.style.maxHeight = "0px";
      }
    });
  }, [open]);

  return (
    <section
      id="faq"
      className="py-16 px-6 md:px-10"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, rgba(247,216,139,0.06) 30%, #ffffff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-full shadow-sm"
                style={{
                  background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                }}
              >
                {/* small chart icon (decorative) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 16h3v4H4v-4zM10 10h3v10h-3V10zM16 4h3v16h-3V4z" fill="#fff" opacity="0.95" />
                </svg>
              </span>

              <div>
                <div
                  className="text-xs uppercase tracking-wider font-semibold"
                  style={{ color: DEEP_NAVY }}
                >
                  Frequently Asked Questions
                </div>
                <div className="text-sm text-[#405569]">Everything you want to know</div>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight" style={{ color: TEXT }}>
              Everything you want to know
            </h1>

            <p className="mt-3 text-black/70">
              Here’s what people commonly ask before working with us.
            </p>
          </div>

          {/* optional small brand / CTA on right */}
          <div className="flex items-center gap-4 ml-auto">
           

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                  window.Calendly.initPopupWidget({ url: "https://calendly.com/futurewesecure-info/30min" });
                } else {
                  window.open("https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer");
                }
              }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium shadow"
              style={{
                background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                color: DEEP_NAVY,
              }}
            >
              Book a Review
            </a>
          </div>
        </div>

        {/* layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* left: accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {commitmentsData.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl overflow-hidden transition-shadow`}
                    style={{
                      boxShadow: isOpen ? "0 18px 40px rgba(8,42,72,0.08)" : "0 6px 18px rgba(8,42,72,0.04)",
                      border: `1px solid ${isOpen ? `rgba(201,152,74,0.16)` : "rgba(3,43,85,0.04)"}`,
                      background: isOpen ? "white" : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.96))",
                    }}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="w-full flex items-start gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{ alignItems: "center" }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-semibold text-base md:text-lg" style={{ color: DEEP_NAVY }}>
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` || GOLD_END }}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      id={`faq-panel-${i}`}
                      ref={(el) => (contentRefs.current[i] = el)}
                      className="px-6 overflow-hidden transition-max-h duration-300 ease-in-out"
                      style={{ maxHeight: 0 }}
                    >
                      <div className="py-4 pb-6 text-sm text-black/75">{item.content}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA box */}
            <div className="mt-6">
              <div
                className="inline-flex items-center gap-4 px-5 py-4 rounded-2xl shadow-sm border bg-white"
                style={{ borderColor: SOFT_BG }}
              >
                <Mail className="w-5 h-5" style={{ color: GOLD_START }} />
                <div className="text-sm text-black/85">
                  Still have questions? Email{" "}
                  <a href="mailto:Info@futurewesecure.com" className="font-semibold" style={{ color: DEEP_NAVY }}>
                    Info@futurewesecure.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* right: visual column */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-[420px] md:h-[520px] rounded-xl overflow-hidden shadow-xl">
              <img
                src={faqimg}
                alt="Client consulting financial expert"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />

              {/* deep overlay to match theme */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(8,42,72,0.48), transparent)" }}
              />

              {/* info card on image */}
              <div
                className="absolute bottom-6 left-6 rounded-xl px-4 py-3 shadow-lg bg-white border"
                style={{ borderColor: "rgba(3,43,85,0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5" style={{ color: GOLD_START }} />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: DEEP_NAVY }}>
                      Trusted by 1,200+ families
                    </div>
                    <div className="text-xs text-black/60">Real guidance. Real clarity. Real results.</div>
                  </div>
                </div>
              </div>

              {/* subtle gold glow (decorative) */}
              <div
                aria-hidden
                className="absolute -right-10 -top-10 w-48 h-48 rounded-full"
                
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
