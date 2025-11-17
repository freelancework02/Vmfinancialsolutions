// ProductcardGoldVariantEnhanced.jsx
import React from "react";

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

export default function ProductcardGoldVariantEnhanced() {
  const openCalendly = () => {
    if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/vmfinsolutions/financialneedanalysis",
      });
    } else {
      window.open(
        "https://calendly.com/vmfinsolutions/financialneedanalysis",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <section
      aria-labelledby="products-enhanced"
      className="mt-16 py-16"
      style={{
        background:
          "radial-gradient(800px 200px at 10% 10%, rgba(247,216,139,0.05), transparent 18%), linear-gradient(180deg,#ffffff 0%, #fff8f0 46%, #ffffff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h2 id="products-enhanced" className="text-3xl font-extrabold" style={{ color: DEEP_NAVY }}>
              Our Products — Premium solutions
            </h2>
            <p className="mt-2 text-sm text-black/70 max-w-2xl">
              Large visuals, consistent card sizing, clear CTAs — designed for trust and clarity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openCalendly}
              className="rounded-full px-5 py-3 font-semibold shadow-lg hover:translate-y-[-2px] transition-transform"
              style={{
                background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                color: SURFACE,
                boxShadow: "0 18px 48px rgba(199,155,75,0.14)",
              }}
              aria-label="Schedule Financial Review"
            >
              Schedule Financial Review
            </button>
          </div>
        </div>

        {/* grid: hero left + products right on desktop; stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* HERO */}
          <div className="lg:col-span-8">
            <div
              className="rounded-3xl overflow-hidden relative border shadow-2xl"
              style={{ borderColor: "rgba(8,42,72,0.05)", background: "linear-gradient(180deg,#fff,#fffaf6)" }}
            >
              <div className="relative h-80 lg:h-[380px]">
                <img
                  src={products[0].image}
                  alt={products[0].title}
                  className="w-full h-full object-cover transform transition-transform duration-800 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/28 to-transparent" />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="max-w-2xl">
                    <div
                      className="inline-flex items-center gap-3 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: "rgba(8,42,72,0.06)" }}
                    >
                      <span className="text-[10px] font-bold" style={{ color: GOLD_START }}>
                        FEATURED
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl md:text-3xl font-bold" style={{ color: DEEP_NAVY }}>
                      {products[0].title}
                    </h3>

                    <p className="mt-3 text-sm text-black/70">{products[0].description}</p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-[rgba(8,42,72,0.04)]">Tailored</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-[rgba(8,42,72,0.04)]">No obligation</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-[rgba(8,42,72,0.04)]">Quick review</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={openCalendly}
                      className="rounded-full px-5 py-3 font-semibold shadow-sm hover:translate-y-[-3px] transition-transform"
                      style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: SURFACE }}
                      aria-label="Start a review"
                    >
                      Start a review
                    </button>

                    <a
                      href="#learn"
                      onClick={(e) => {
                        e.preventDefault();
                        openCalendly();
                      }}
                      className="text-sm text-black/60 underline"
                    >
                      Learn how it works
                    </a>
                  </div>
                </div>
              </div>

              {/* glow */}
              <div
                aria-hidden
                className="absolute -right-10 -bottom-12 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 25% 25%, ${GOLD_START} 0%, rgba(201,156,75,0.14) 35%, transparent 55%)`,
                  filter: "blur(28px)",
                }}
              />
            </div>
          </div>

          {/* PRODUCT CARDS — right column */}
          <div className="lg:col-span-4 grid gap-6 auto-rows-fr">
            {products.slice(1).map((p, idx) => (
              <article
                key={p.title}
                className="rounded-2xl overflow-hidden border shadow-md hover:shadow-2xl transition-transform hover:-translate-y-2 flex flex-col bg-white"
                style={{
                  borderColor: "rgba(8,42,72,0.05)",
                  minHeight: 180,
                }}
                aria-labelledby={`product-${idx}`}
              >
                {/* image area */}
                <div className="relative h-32 sm:h-36 md:h-28 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent pointer-events-none" />

                  {/* top-right gold badge */}
                  <div className="absolute right-3 top-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-white"
                       style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` }}>
                    Product
                  </div>
                </div>

                {/* content area */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 id={`product-${idx}`} className="text-lg font-semibold" style={{ color: DEEP_NAVY }}>
                      {p.title}
                    </h4>
                    <p className="mt-2 text-sm text-black/70 line-clamp-3">{p.description}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="text-xs text-black/60">Quick call • 15m</div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={openCalendly}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold shadow-sm hover:scale-[1.02] transition-transform"
                        style={{
                          background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                          color: SURFACE,
                          boxShadow: "0 8px 24px rgba(199,155,75,0.10)",
                        }}
                        aria-label={`Get details for ${p.title}`}
                      >
                        Get details
                      </button>

                      <a
                        href="#learn"
                        onClick={(e) => {
                          e.preventDefault();
                          openCalendly();
                        }}
                        className="text-sm text-black/60 underline"
                      >
                        Learn
                      </a>
                    </div>
                  </div>
                </div>

                {/* mobile pinned CTA inside card */}
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

        {/* bottom CTA */}
        <div className="mt-10">
          <div
            className="rounded-2xl p-8 bg-gradient-to-r from-white to-white border"
            style={{ borderColor: "rgba(8,42,72,0.04)" }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold" style={{ color: DEEP_NAVY }}>
                  Ready to explore your options?
                </h4>
                <p className="text-sm text-black/70 mt-1">A short, focused conversation unlocks clarity — pick a time and we'll prepare a short agenda.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={openCalendly}
                  className="rounded-full px-6 py-3 font-semibold shadow hover:translate-y-[-3px] transition-transform"
                  style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: SURFACE }}
                >
                  Book a 15-min call
                </button>

                <a href="#contact" className="rounded-full px-6 py-3 border" style={{ borderColor: "rgba(8,42,72,0.06)", color: DEEP_NAVY }}>
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
