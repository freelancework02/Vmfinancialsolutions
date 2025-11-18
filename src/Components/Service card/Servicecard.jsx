// Servicecard.VariantA.Updated.jsx
import React from "react";

const GOLD_START = "#f7d88b";
const GOLD_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const NEUTRAL = "#0f1724";

const services = [
  {
    title: "Retirement Planning",
    description:
      "Plan your retirement so your lifestyle is shaped by choice, not just assets at retirement.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img1.jpg",
  },
  {
    title: "Estate Planning",
    description:
      "Protect what you’ve built from probate, litigation, and unfavorable taxation.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img2.jpg",
  },
  {
    title: "Kids Education Planning",
    description:
      "Choose a smart, disciplined path to fund your children’s education.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img3.jpg",
  },
  {
    title: "Lifetime Income Planning",
    description:
      "No pension? Create one—and secure predictable, lifetime income streams.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img4.jpg",
  },
  {
    title: "Life Insurance Planning",
    description:
      "Right-sized coverage with living benefits and quotes that fit your budget.",
    image:
      "https://s3.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/files/images/240314022303_Life%20Insurance%20at%20Various%20Life%20Stages.jpeg",
  },
  {
    title: "Investments Planning",
    description:
      "Grow capital the smart way. Know the difference between nominal and real returns.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img6.jpg",
  },
];

export default function ServicecardVariantAUpdated() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white border shadow-sm" style={{ borderColor: "rgba(8,42,72,0.06)" }}>
            <span
              className="px-2 py-1 rounded-full"
              style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, boxShadow: "0 6px 20px rgba(199,155,75,0.12)" }}
            />
            <span className="text-sm font-medium text-black/70">OUR SERVICES</span>
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-extrabold" style={{ color: NEUTRAL }}>
            Professional Services
          </h2>

          <p className="mt-3 text-black/60 max-w-2xl mx-auto">
            Expert guidance and tailored solutions to help you secure a better financial future.
          </p>
        </div>

        {/* Grid: alternating mosaic layout */}
        <div className="grid grid-cols-1 gap-10">
          {services.map((s, i) => {
            const isEven = i % 2 === 1;
            return (
              <article
                key={i}
                className={`grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch transform transition hover:-translate-y-1 duration-300`}
                aria-labelledby={`service-${i}`}
              >
                {/* IMAGE */}
                <div
                  className={`md:col-span-5 relative overflow-hidden rounded-2xl shadow-lg group`}
                  style={{
                    order: isEven ? 2 : 1,
                    minHeight: 220,
                  }}
                >
                  <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(8,42,72,0.06), transparent)` }} />
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                    style={{ minHeight: 220 }}
                  />

                  {/* image overlay label */}
                  <div className="absolute left-4 bottom-4 rounded-xl px-3 py-2 bg-white/95 backdrop-blur text-sm font-semibold" style={{ border: "1px solid rgba(8,42,72,0.04)" }}>
                    <span className="text-black">Trusted</span>
                  </div>

                  {/* floating badge */}
                  <div
                    className="absolute right-4 top-4 rounded-full px-3 py-1.5 text-white font-semibold text-xs"
                    style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, boxShadow: "0 10px 30px rgba(199,155,75,0.14)" }}
                  >
                    Popular
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  className="md:col-span-7 bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-between border shadow-sm"
                  style={{
                    borderLeft: `6px solid ${isEven ? `rgba(3,43,85,0.04)` : `linear-gradient(180deg, ${GOLD_START}, ${GOLD_END})`}`,
                    borderColor: "rgba(8,42,72,0.04)",
                  }}
                >
                  <div>
                    <h3 id={`service-${i}`} className="text-2xl font-semibold" style={{ color: DEEP_NAVY }}>
                      {s.title}
                    </h3>
                    <p className="mt-3 text-black/70 leading-relaxed">{s.description}</p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      <li className="text-xs px-3 py-1 rounded-full bg-[rgba(3,43,85,0.04)] text-black/70">Clarity</li>
                      <li className="text-xs px-3 py-1 rounded-full bg-[rgba(3,43,85,0.04)] text-black/70">Tailored</li>
                      <li className="text-xs px-3 py-1 rounded-full bg-[rgba(3,43,85,0.04)] text-black/70">Ongoing</li>
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <a
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white font-semibold shadow"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                          window.Calendly.initPopupWidget({ url: "https://calendly.com/vmfinsolutions/financialneedanalysis" });
                        } else {
                          window.open("https://calendly.com/vmfinsolutions/financialneedanalysis", "_blank", "noopener,noreferrer");
                        }
                      }}
                      style={{
                        background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                        boxShadow: "0 12px 34px rgba(199,155,75,0.14)",
                      }}
                    >
                      Book a review
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 12h12M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>

                    <a
                      className="text-sm font-medium"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                          window.Calendly.initPopupWidget({ url: "https://calendly.com/vmfinsolutions/financialneedanalysis" });
                        } else {
                          window.open("https://calendly.com/vmfinsolutions/financialneedanalysis", "_blank", "noopener,noreferrer");
                        }
                      }}
                      style={{ color: DEEP_NAVY }}
                    >
                      Learn more →
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Secondary grid: compact cards for quick scan */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <div
              key={`compact-${idx}`}
              className="bg-white rounded-2xl p-4 border shadow-sm hover:shadow-md transition-transform hover:-translate-y-1"
              style={{ borderColor: "rgba(8,42,72,0.04)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0" style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` }}>
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-90" />
                </div>

                <div className="flex-1">
                  <h4 className="text-lg font-semibold" style={{ color: DEEP_NAVY }}>{s.title}</h4>
                  <p className="mt-2 text-sm text-black/70">{s.description}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                          window.Calendly.initPopupWidget({ url: "https://calendly.com/vmfinsolutions/financialneedanalysis" });
                        } else {
                          window.open("https://calendly.com/vmfinsolutions/financialneedanalysis", "_blank", "noopener,noreferrer");
                        }
                      }}
                      className="text-sm font-semibold"
                      style={{ color: DEEP_NAVY }}
                    >
                      Get Started
                    </a>

                    <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(3,43,85,0.04)] text-black/60">Trusted</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
