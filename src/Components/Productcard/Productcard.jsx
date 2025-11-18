import React, { useState, useEffect, useRef } from "react";

// Color tokens (keep same palette)
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

// Simple SVG fallback (data URL)
const FALLBACK_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
    <defs>
      <linearGradient id='g' x1='0' x2='1'>
        <stop offset='0' stop-color='${GOLD_START}' />
        <stop offset='1' stop-color='${GOLD_END}' />
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' fill='url(#g)' />
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='32' fill='${SURFACE}' opacity='0.95'>Image unavailable</text>
  </svg>`
)}`;

// Shared utility: open calendly (keeps existing behavior)
function openCalendly() {
  if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
    window.Calendly.initPopupWidget({
      url: "https://calendly.com/vmfinsolutions/financialneedanalysis",
    });
  } else if (typeof window !== "undefined") {
    window.open(
      "https://calendly.com/vmfinsolutions/financialneedanalysis",
      "_blank",
      "noopener,noreferrer"
    );
  }
}

export default function ProductcardGoldVariantModern() {
  const [active, setActive] = useState(0); // active product index
  const cardRefs = useRef([]);

  // scroll active card into view whenever active changes
  useEffect(() => {
    const el = cardRefs.current[active];
    if (el && typeof el.scrollIntoView === "function") {
      // center the card in view smoothly
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
  }, [active]);

  // fallback handler for images
  const handleImgError = (e) => {
    try {
      if (e?.target?.dataset?.fallbackused) return;
      e.target.src = FALLBACK_SVG;
      e.target.dataset.fallbackused = "1";
    } catch (err) {
      // ignore
    }
  };

  // inline style utilities to avoid external CSS and <style> tags
  const cardBaseStyle = {
    borderRadius: 24,
    overflow: "hidden",
    background: "#fff",
    border: "1px solid rgba(8,42,72,0.04)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 380ms cubic-bezier(.2,.9,.2,1), box-shadow 380ms ease",
  };

  const heroImgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  return (
    <section
      aria-labelledby="products-modern"
      style={{
        marginTop: 64,
        paddingTop: 64,
        paddingBottom: 64,
        background: "linear-gradient(180deg, #ffffff 0%, #fff9f2 100%)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", paddingLeft: 16, paddingRight: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div>
              <h2 id="products-modern" style={{ fontSize: 28, fontWeight: 800, color: DEEP_NAVY, margin: 0 }}>
                Our Products
              </h2>
              <p style={{ marginTop: 8, color: "rgba(0,0,0,0.65)", maxWidth: 600 }}>
                Premium solutions — quick calls, clear next steps.
              </p>
            </div>

            <div>
              <button
                onClick={openCalendly}
                style={{
                  borderRadius: 28,
                  padding: "10px 18px",
                  fontWeight: 700,
                  boxShadow: "0 18px 48px rgba(199,155,75,0.14)",
                  background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                  color: SURFACE,
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Schedule Financial Review"
              >
                Schedule Financial Review
              </button>
            </div>
          </div>

          {/* layout: left column (nav + hero), right column (cards) */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 24,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* LEFT: navigation + hero visual */}
            <div style={{ flex: "1 1 320px", maxWidth: 360 }}>
              <div
                style={{
                  borderRadius: 20,
                  padding: 18,
                  background: "#fff",
                  border: "1px solid rgba(8,42,72,0.04)",
                  boxShadow: "0 6px 18px rgba(8,42,72,0.04)",
                }}
              >
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: DEEP_NAVY }}>Product list</h3>
                <p style={{ marginTop: 8, color: "rgba(0,0,0,0.6)", marginBottom: 12 }}>
                  Tap any item to spotlight it on the right.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {products.map((p, i) => {
                    const isActive = i === active;
                    return (
                      <button
                        key={p.title}
                        onClick={() => setActive(i)}
                        aria-pressed={isActive}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: 10,
                          borderRadius: 10,
                          background: isActive ? "rgba(8,42,72,0.04)" : "transparent",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <img
                          src={p.image}
                          alt={`${p.title} thumbnail`}
                          onError={handleImgError}
                          style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 6, flexShrink: 0 }}
                        />

                        <div style={{ flex: "1 1 auto" }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: DEEP_NAVY }}>{p.title}</div>
                          <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>Quick call • 15m</div>
                        </div>

                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            padding: "6px 8px",
                            borderRadius: 999,
                            background: isActive ? GOLD_START : "rgba(8,42,72,0.04)",
                            color: DEEP_NAVY,
                            flexShrink: 0,
                          }}
                        >
                          {isActive ? "Active" : "View"}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: 14 }}>
                  <button
                    onClick={openCalendly}
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      padding: "10px 12px",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                      color: SURFACE,
                    }}
                  >
                    Book a 15-min call
                  </button>
                </div>
              </div>

              {/* hero thumbnail below the list */}
              <div style={{ marginTop: 16, borderRadius: 18, overflow: "hidden", border: "1px solid rgba(8,42,72,0.04)" }}>
                <div style={{ width: "100%", height: 200, position: "relative", background: "#f6f3ef" }}>
                  <img
                    src={products[0].image}
                    alt={products[0].title}
                    onError={handleImgError}
                    style={heroImgStyle}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 12,
                      bottom: 12,
                      background: "rgba(255,255,255,0.92)",
                      padding: 10,
                      borderRadius: 10,
                      backdropFilter: "blur(4px)",
                      boxShadow: "0 8px 20px rgba(8,42,72,0.06)",
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 800, color: DEEP_NAVY }}>{products[0].title}</div>
                    <div style={{ fontSize: 12, color: "rgba(0,0,0,0.6)" }}>{products[0].description}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: product cards grid */}
            <div style={{ flex: "1 1 640px", minWidth: 300 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 18,
                }}
              >
                {products.map((p, i) => {
                  const isActive = i === active;
                  const dynamicStyle = {
                    transform: isActive ? "scale(1.035)" : "scale(1)",
                    boxShadow: isActive ? "0 30px 60px rgba(8,42,72,0.12)" : "0 10px 24px rgba(8,42,72,0.06)",
                    ...cardBaseStyle,
                  };

                  return (
                    <article
                      key={p.title}
                      id={`modern-card-${i}`}
                      ref={(el) => (cardRefs.current[i] = el)}
                      style={dynamicStyle}
                    >
                      <div style={{ width: "100%", height: 220, position: "relative" }}>
                        <img
                          src={p.image}
                          alt={p.title}
                          onError={handleImgError}
                          style={heroImgStyle}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 40%)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: 14,
                            top: 14,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "6px 10px",
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 800,
                            color: SURFACE,
                            background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                          }}
                        >
                          Product
                        </div>
                      </div>

                      <div style={{ padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between", flex: "1 1 auto" }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: DEEP_NAVY }}>{p.title}</h4>
                          <p style={{ marginTop: 8, marginBottom: 0, color: "rgba(0,0,0,0.65)" }}>{p.description}</p>
                        </div>

                        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontSize: 12, color: "rgba(0,0,0,0.58)" }}>15 min • Quick review</div>

                          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            <button
                              onClick={() => {
                                setActive(i);
                                // small delay then open calendly to keep UX smooth
                                setTimeout(() => openCalendly(), 220);
                              }}
                              style={{
                                borderRadius: 10,
                                padding: "8px 12px",
                                fontWeight: 800,
                                border: "none",
                                cursor: "pointer",
                                background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                                color: SURFACE,
                                boxShadow: "0 8px 24px rgba(199,155,75,0.08)",
                              }}
                              aria-label={`Book ${p.title}`}
                            >
                              Book
                            </button>

                            <button
                              onClick={() => {
                                setActive(i);
                                openCalendly();
                              }}
                              style={{ background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline", color: "rgba(0,0,0,0.6)", fontSize: 14 }}
                            >
                              Learn
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          {/* bottom CTA */}
          <div style={{ marginTop: 18 }}>
            <div style={{ borderRadius: 18, padding: 18, background: "#fff", border: "1px solid rgba(8,42,72,0.04)" }}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: DEEP_NAVY }}>Ready to explore your options?</div>
                  <div style={{ marginTop: 6, color: "rgba(0,0,0,0.65)" }}>A short, focused conversation unlocks clarity — pick a time and we'll prepare a short agenda.</div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openCalendly}
                    style={{
                      borderRadius: 12,
                      padding: "10px 16px",
                      background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                      color: SURFACE,
                      fontWeight: 800,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Book a 15-min call
                  </button>

                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    style={{
                      borderRadius: 12,
                      padding: "10px 16px",
                      border: "1px solid rgba(8,42,72,0.06)",
                      background: "transparent",
                      color: DEEP_NAVY,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Contact us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
