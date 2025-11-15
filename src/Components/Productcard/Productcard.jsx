// Productcard.GoldVariant.V2.jsx
import React from "react";

/**
 * Productcard.GoldVariant.V2.jsx
 *
 * - Polished, more attractive visual treatment for the Products section.
 * - Brand palette: GOLD gradient + DEEP_NAVY as requested.
 * - Clear visual hierarchy: large hero card, crisp compact product cards, elegant CTAs.
 * - Enhanced micro-interactions: lift on hover, soft glows, badges, card glass effect.
 * - Responsive: single column mobile → 2 columns tablet → 3 columns desktop.
 *
 * Drop this file into your project and import where needed.
 */

const GOLD_START = "#f7d88b";
const GOLD_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const SURFACE = "#ffffff";

const products = [
  {
    title: "Fixed & Indexed Annuities",
    description:
      "A contract with an insurer that can guarantee principal and interest while offering potential lifelong income withdrawals.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img4.jpg",
  },
  {
    title: "Indexed Universal Life",
    description:
      "Death benefit protection plus portfolio diversification with the potential for tax-advantaged growth.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img3.jpg",
  },
  {
    title: "Term Life",
    description:
      "Straightforward coverage for the years you need it most—protect temporary responsibilities with confidence.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img2.jpg",
  },
  {
    title: "Traditional IRA / Roth IRA",
    description:
      "Tax-deferred growth with Traditional IRAs or tax-free qualified withdrawals with Roth IRAs—plan an efficient retirement.",
    image: "https://wesecurefuture.com/wp-content/uploads/2024/12/2148793763.jpg",
  },
  {
    title: "Whole Life Insurance",
    description:
      "Lifetime coverage with guaranteed benefits and cash value that can grow over time.",
    image: "https://wesecurefuture.com/wp-content/uploads/2024/12/2163.jpg",
  },
  {
    title: "Will & Trust",
    description:
      "Establish your Will & Trust plus four other core estate documents to protect wishes and heirs.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img1.jpg",
  },
];

export default function ProductcardGoldVariantV2() {
  const openCalendly = () => {
    if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: "https://calendly.com/futurewesecure-info/30min" });
    } else {
      window.open("https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      aria-labelledby="products-heading"
      className="mt-10 py-16"
      style={{ background: "linear-gradient(180deg,#ffffff 0%, #fffaf6 46%, #ffffff 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h2 id="products-heading" className="text-2xl lg:text-3xl font-extrabold" style={{ color: DEEP_NAVY }}>
              Products
            </h2>
            <p className="mt-2 text-sm text-black/65">
              Practical solutions explained clearly — quick CTAs let customers act fast. Choose a product and schedule a brief call.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={openCalendly}
              className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold shadow-sm"
              style={{
                background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                color: SURFACE,
                boxShadow: "0 10px 34px rgba(201,156,80,0.14)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="opacity-95">
                <path d="M12 2v6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 10h12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="7" width="18" height="14" rx="2" stroke="white" strokeWidth="1.6" />
              </svg>
              Book an appointment
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border"
              style={{ borderColor: "rgba(8,42,72,0.06)", color: DEEP_NAVY }}
            >
              Contact us
            </a>
          </div>
        </div>

        {/* Layout: hero card left + product grid right on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hero card - left */}
          <div className="lg:col-span-7">
            <article
              className="relative rounded-3xl overflow-hidden bg-white border shadow-2xl"
              style={{
                borderColor: "rgba(8,42,72,0.04)",
                boxShadow: "0 20px 60px rgba(8,42,72,0.06)",
              }}
            >
              {/* left accent stripe */}
              <div
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-2"
                style={{ background: `linear-gradient(180deg, ${GOLD_START}, ${GOLD_END})` }}
              />

              <div className="md:flex">
                <div className="md:w-1/2 h-72 md:h-auto relative overflow-hidden">
                  <img
                    src={products[0].image}
                    alt={products[0].title}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                    style={{ minHeight: 260 }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  <div
                    className="absolute left-5 top-5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-md"
                    style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` }}
                  >
                    Featured
                  </div>
                </div>

                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold" style={{ color: DEEP_NAVY }}>
                      {products[0].title}
                    </h3>
                    <p className="mt-3 text-sm text-black/70 leading-relaxed">{products[0].description}</p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-[rgba(8,42,72,0.04)] text-black/70">Quick call</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-[rgba(8,42,72,0.04)] text-black/70">15 mins</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-[rgba(8,42,72,0.04)] text-black/70">No obligation</span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={openCalendly}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-white shadow"
                      style={{
                        background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                        boxShadow: "0 12px 36px rgba(199,155,75,0.14)",
                      }}
                    >
                      Get details
                    </button>

                    <a
                      href="#learn"
                      onClick={(e) => {
                        e.preventDefault();
                        openCalendly();
                      }}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border font-medium"
                      style={{ borderColor: "rgba(8,42,72,0.05)", color: DEEP_NAVY }}
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>

              {/* subtle decorative glow bottom-right */}
              <div
                aria-hidden
                className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full opacity-80 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${GOLD_START} 0%, rgba(201,156,75,0.12) 40%, transparent 60%)`,
                  filter: "blur(20px)",
                }}
              />
            </article>
          </div>

          {/* Product cards grid - right */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.slice(1).map((p, idx) => (
              <article
                key={p.title}
                className="relative bg-white/70 backdrop-blur rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-transform hover:-translate-y-2"
                style={{
                  borderColor: "rgba(8,42,72,0.04)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.82))",
                }}
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

                  <div
                    className="absolute left-3 top-3 px-2 py-1 rounded-full text-xs font-semibold text-white shadow"
                    style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` }}
                  >
                    Product
                  </div>
                </div>

                <div className="p-4 md:p-5 flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-lg font-semibold" style={{ color: DEEP_NAVY }}>
                      {p.title}
                    </h4>
                    <p className="mt-2 text-sm text-black/70">{p.description}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-black/60">Quick call • 15m</div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={openCalendly}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold"
                        style={{
                          background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                          color: SURFACE,
                          boxShadow: "0 8px 24px rgba(199,155,75,0.10)",
                        }}
                      >
                        Get details
                      </button>

                      <a
                        href="#learn"
                        onClick={(e) => {
                          e.preventDefault();
                          openCalendly();
                        }}
                        className="text-sm underline"
                        style={{ color: DEEP_NAVY }}
                      >
                        Learn
                      </a>
                    </div>
                  </div>
                </div>

                {/* floating mobile pinned CTA inside card for small screens */}
                <div className="lg:hidden absolute left-4 right-4 bottom-4">
                  <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-md" style={{ border: "1px solid rgba(8,42,72,0.04)" }}>
                    <button
                      onClick={openCalendly}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                      style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: SURFACE }}
                    >
                      Book quick call
                    </button>

                    <a
                      href="#learn"
                      onClick={(e) => {
                        e.preventDefault();
                        openCalendly();
                      }}
                      className="px-3 py-2 text-sm"
                      style={{ color: DEEP_NAVY }}
                    >
                      Learn
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            background: "linear-gradient(180deg, #ffffff, #fffaf3)",
            border: "1px solid rgba(8,42,72,0.04)",
            boxShadow: "0 14px 40px rgba(8,42,72,0.04)",
          }}
        >
          <div>
            <h4 className="text-lg font-bold" style={{ color: DEEP_NAVY }}>
              Want a quick, no-pressure review?
            </h4>
            <p className="text-sm text-black/70 mt-1">Schedule a brief 15-minute call — we’ll listen, assess, and suggest next steps.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={openCalendly}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold"
              style={{
                background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                color: SURFACE,
                boxShadow: "0 12px 36px rgba(199,155,75,0.12)",
              }}
            >
              Book a call
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 border"
              style={{ borderColor: "rgba(8,42,72,0.06)", color: DEEP_NAVY }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
