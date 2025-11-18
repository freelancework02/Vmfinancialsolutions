// AboutUs.FounderFirst.jsx
import React from "react";

/**
 * AboutUs.FounderFirst.jsx
 *
 * - Uses the brand color combo: gold gradient + deep-navy.
 * - Layout optimized for all screen sizes: mobile-first stacked, large screens show text + large founder portrait.
 * - If you provide a `founderImage` (string URL or import), the component will use it in a large circular portrait.
 *   If not provided, it falls back to a CSS-only initials avatar.
 *
 * Usage:
 *   // Option A - pass an imported image:
 *   import FounderImg from "../../assets/founder.jpg";
 *   <AboutUsFounder founderImage={FounderImg} />
 *
 *   // Option B - pass an external URL:
 *   <AboutUsFounder founderImage="https://example.com/founder.jpg" />
 *
 *   // Option C - no image passed -> initials avatar used
 *   <AboutUsFounder />
 *
 * Save as AboutUs.FounderFirst.jsx and import where needed.
 */

const GOLD_START = "#f7d88b";
const GOLD_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const TEXT = "#0f0f0f";

export default function AboutUsFounder({ founderImage, founderName = "Vaibhav Maddiwar", initials = "VM" }) {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative mt-16 py-12 md:py-16 px-4 sm:px-6 lg:px-12"
      style={{ background: "linear-gradient(180deg,#ffffff 0%, #fffaf6 36%, #ffffff 100%)" }}
    >
    
        {/* Header */}
        <div className="text-center md:text-left mb-8 md:mb-12">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold"
            style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: DEEP_NAVY }}
          >
            ABOUT US
          </span>

      

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text column */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div
              className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_18px_48px_rgba(8,42,72,0.06)] border"
              style={{ borderColor: "rgba(8,42,72,0.04)" }}
            >
              <h2 className="text-2xl font-semibold" style={{ color: DEEP_NAVY }}>
              Our Mission 🎯 
              </h2>

              <div className="mt-4 text-black/75 space-y-4 leading-relaxed">
                <p>
                Personal finances are something that every individual should know and understand. But sadly, there is very little formal education on the topic and many of us fumble about the topic copying what everyone else is doing. But this may not always be in our best interest. What may be a good strategy for someone else may not be the best for you, because personal finance is unique to every family, with different goals, different time horizons, different challenges.
                </p>

              

                <p>
                 VM financial solutions was conceived to primarily take an educational approach towards personal finances, to first teach people the basics of personal finances and then help them take actions to meet their financial goals.
                </p>
              </div>

              {/* quick facts */}
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-[linear-gradient(90deg,#fff,#fff)] rounded-xl px-4 py-2 border" style={{ borderColor: "rgba(8,42,72,0.03)" }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` }} />
                  <div>
                    <div className="text-sm font-medium" style={{ color: DEEP_NAVY }}>Education-first</div>
                    <div className="text-xs text-black/60">Foundational learning & action</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[linear-gradient(90deg,#fff,#fff)] rounded-xl px-4 py-2 border" style={{ borderColor: "rgba(8,42,72,0.03)" }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: DEEP_NAVY }} />
                  <div>
                    <div className="text-sm font-medium" style={{ color: DEEP_NAVY }}>Personalized</div>
                    <div className="text-xs text-black/60">Plans built for your life</div>
                  </div>
                </div>
              </div>

              {/* CTA row */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href=""
                 onClick={(e) => { e.preventDefault(); window.Calendly?.initPopupWidget?.({ url: 'https://calendly.com/vmfinsolutions/financialneedanalysis' }); }}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold"
                  style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: DEEP_NAVY }}
                >
                  Book a review
                </a>
                <a
                  href="/service"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 border"
                  style={{ borderColor: "rgba(8,42,72,0.06)", color: DEEP_NAVY }}
                >
                  Our services
                </a>
              </div>
            </div>
          </div>

          {/* Founder portrait column */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px]">
              {/* decorative background panel */}
              <div
                aria-hidden
                className="absolute -inset-y-4 -left-4 right-4 rounded-3xl"
                style={{
                  background: `linear-gradient(180deg, rgba(8,42,72,0.03), rgba(8,42,72,0.02))`,
                  transform: "translateY(6px)",
                  zIndex: 0,
                }}
              />

              {/* large hero card with portrait */}
              <div
                className="relative bg-white rounded-3xl p-6 md:p-8 shadow-[0_24px_60px_rgba(8,42,72,0.08)] border"
                style={{ borderColor: "rgba(8,42,72,0.04)", overflow: "visible" }}
              >
                {/* top row inside card */}
                <div className="flex items-start gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: GOLD_START }}>
                      Founder
                    </div>
                    <div className="mt-1 text-lg font-bold" style={{ color: DEEP_NAVY }}>{founderName}</div>
                    <div className="text-sm text-black/60 mt-1">(License Number – 21322826)</div>
                  </div>
                </div>

                {/* portrait — large circular overlap */}
              

                {/* card footer / quick line */}
                <div className="mt-6 pt-4 border-t" style={{ borderColor: "rgba(8,42,72,0.03)" }}>
                  <div className="text-sm text-black/60">Trusted guidance • Practical plans • Ongoing support</div>
                </div>
              </div>

              {/* subtle gold glow behind the portrait */}
              <div
                aria-hidden
                className="absolute -right-6 -top-8 w-[220px] h-[220px] rounded-full"
                
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
