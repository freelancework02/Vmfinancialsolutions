// Valueprop.VariantA.Updated.v2.jsx
import React from "react";

/**
 * Valueprop.VariantA.Updated.v2.jsx
 *
 * - Reworked layout: hero feature band + staggered card masonry below.
 * - Hero band uses large left visual (image) + right content + CTA.
 * - Cards are presented in a 3-column responsive masonry (1 / 2 / 3 cols).
 * - Stronger visual hierarchy: accent strips, badges, soft shadows, and hover lift.
 * - Keeps original copy and images unchanged. Uses brand gold gradient + deep navy.
 *
 * Usage: import and render <ValuepropVariantAUpdatedV2 />
 */

const GOLD_START = "#f7d88b";
const GOLD_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const TEXT = "#0f0f0f";

const services = [
  {
    title: "Planning for the Future",
    description: (
      <>
        <p className="text-black/80 leading-relaxed">
          We’ve helped clients prepare for the unknown while staying aligned with their financial goals. Ask us about:
        </p>
        <ul className="list-disc list-outside mt-3 text-black/70 pl-5 space-y-1">
          <li>Financial planning</li>
          <li>Tax optimization</li>
          <li>Education funding</li>
          <li>Estate planning</li>
        </ul>
        <p className="mt-3 text-black/80 leading-relaxed">
          As an independent firm, we source across providers to tailor solutions that fit your exact needs.
        </p>
      </>
    ),
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img7.jpg",
    tag: "Flagship",
  },
  {
    title: "Comprehensive End-to-End Approach",
    description:
      "We start with a deep needs analysis, clarify goals, and review your full portfolio. Then we tailor strategies to your risk tolerance and market realities—expect unbiased recommendations built around you.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img8.jpg",
    tag: "Featured",
  },
  {
    title: "Committed to Service",
    description:
      "Great strategies begin with great relationships. Our mission is to exceed expectations—on day one and year ten. Let’s map short- and long-term moves that bring your goals within reach.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img9.jpg",
    tag: "Trusted",
  },
];

export default function ValuepropVariantAUpdatedV2() {
  return (
    <section
      className="py-16"
      style={{
        background: "linear-gradient(180deg,#ffffff 0%, #fbfbfd 48%, #ffffff 100%)",
      }}
      aria-labelledby="valueprop-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO FEATURE BAND */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Large visual panel (left on desktop) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div
              className="relative rounded-2xl overflow-hidden shadow-lg group"
              style={{ minHeight: 360 }}
            >
              <img
                src={services[0].image}
                alt={services[0].title}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: 360 }}
              />

              {/* dark overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

              {/* left accent strip */}
              <div
                className="absolute left-0 top-0 h-full w-2"
                style={{ background: `linear-gradient(180deg, ${GOLD_START}, ${GOLD_END})` }}
                aria-hidden
              />

              {/* floating badge */}
              <div className="absolute left-6 bottom-6 rounded-full px-3 py-2 text-sm font-semibold text-white shadow" style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` }}>
                {services[0].tag}
              </div>
            </div>
          </div>

          {/* Text content + CTA (right on desktop) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="h-full flex flex-col justify-center gap-6">
              <div className="inline-flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                  style={{ background: `linear-gradient(135deg, ${GOLD_START}, ${GOLD_END})` }}
                  aria-hidden
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M7 17L17 7" stroke="#082a48" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 7H8" stroke="#082a48" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div>
                  <h3 id="valueprop-heading" className="text-2xl sm:text-3xl font-extrabold" style={{ color: TEXT }}>
                    Our Value Proposition
                  </h3>
                  <p className="mt-1 text-sm text-black/70">Clear guidance. Disciplined strategy. A better future ahead.</p>
                </div>
              </div>

              <div className="mt-2 text-black/80 leading-relaxed">
                <p className="mb-2">
                  We’ve helped clients prepare for the unknown while staying aligned with their financial goals.
                  Our approach blends clarity, data, and human-centred advice so you can make confident decisions.
                </p>

                <ul className="pl-5 list-disc text-black/70 space-y-1">
                  <li>Financial planning and needs analysis</li>
                  <li>Tax-efficient strategies</li>
                  <li>Education & retirement roadmaps</li>
                </ul>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                      window.Calendly.initPopupWidget({ url: "https://calendly.com/vmfinsolutions/financialneedanalysis" });
                    } else {
                      window.open("https://calendly.com/vmfinsolutions/financialneedanalysis", "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold shadow"
                  style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: DEEP_NAVY }}
                >
                  Book a consultation
                </button>

                {/* <a
                  href="#learn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                      window.Calendly.initPopupWidget({ url: "https://calendly.com/futurewesecure-info/30min" });
                    } else {
                      window.open("https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-full border"
                  style={{ borderColor: "rgba(8,42,72,0.06)", color: DEEP_NAVY }}
                >
                  Learn more
                </a> */}
              </div>
            </div>
          </div>
        </div>

        {/* STAGGERED CARD MASONRY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => {
            // alternate vertical offset for staggered feel
            const offsetClass = idx % 2 === 0 ? "mt-0" : "mt-8 lg:mt-12";
            return (
              <article
                key={idx}
                className={`${offsetClass} group bg-white rounded-2xl overflow-hidden shadow-md border`}
                style={{ borderColor: "rgba(8,42,72,0.04)" }}
                aria-labelledby={`vp-${idx}-title`}
              >
                <div className="relative">
                  <div className="h-44 md:h-52 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute left-4 top-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow" style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` }}>
                    {s.tag}
                  </div>

                  {/* subtle accent strip at left */}
                  <div
                    className="absolute left-0 top-0 h-full w-1"
                    style={{ background: `linear-gradient(180deg, ${GOLD_START}, ${GOLD_END})` }}
                    aria-hidden
                  />
                </div>

                <div className="p-6">
                  <h4 id={`vp-${idx}-title`} className="text-xl font-bold mb-2" style={{ color: DEEP_NAVY }}>
                    {s.title}
                  </h4>

                  <div className="text-sm text-black/75 mb-4">{s.description}</div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-[rgba(3,43,85,0.04)] text-black/70">Clarity</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-[rgba(3,43,85,0.04)] text-black/70">Tailored</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                            window.Calendly.initPopupWidget({ url: "https://calendly.com/vmfinsolutions/financialneedanalysis" });
                          } else {
                            window.open("https://calendly.com/vmfinsolutions/financialneedanalysis", "_blank", "noopener,noreferrer");
                          }
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold"
                        style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: DEEP_NAVY }}
                      >
                        Talk to an advisor
                      </button>

                      {/* <a
                        href="#learn"
                        className="text-sm text-[rgba(3,43,85,0.8)] underline"
                        onClick={(e) => {
                          e.preventDefault();
                          if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                            window.Calendly.initPopupWidget({ url: "https://calendly.com/futurewesecure-info/30min" });
                          } else {
                            window.open("https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer");
                          }
                        }}
                      >
                        Learn more
                      </a> */}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA FOOTER STRIP */}
        <div className="mt-12 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-white" style={{ boxShadow: "0 10px 34px rgba(3,43,85,0.04)", border: "1px solid rgba(3,43,85,0.04)" }}>
          <div>
            <h4 className="text-xl font-bold" style={{ color: DEEP_NAVY }}>Ready to get started?</h4>
            <p className="text-sm text-black/70 mt-1">Book a free 30-minute consultation and we’ll map the next steps together.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                  window.Calendly.initPopupWidget({ url: "https://calendly.com/vmfinsolutions/financialneedanalysis" });
                } else {
                  window.open("https://calendly.com/vmfinsolutions/financialneedanalysis", "_blank", "noopener,noreferrer");
                }
              }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold"
              style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: DEEP_NAVY }}
            >
              Book a consultation
            </button>

            <a href="#"   onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                      window.Calendly.initPopupWidget({ url: "https://calendly.com/vmfinsolutions/financialneedanalysis" });
                    } else {
                      window.open("https://calendly.com/vmfinsolutions/financialneedanalysis", "_blank", "noopener,noreferrer");
                    }
                  }} className="inline-flex items-center gap-2 rounded-full px-5 py-3 border" style={{ borderColor: "rgba(3,43,85,0.06)", color: DEEP_NAVY }}>
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
