// PartnerProgram.GoldVariant.EqualCards.jsx
import React, { useEffect, useRef, useState } from "react";
import { Handshake, Notebook, BookOpenText, ChartNoAxesCombined, X } from "lucide-react";

/**
 * PartnerProgram.GoldVariant.EqualCards.jsx
 *
 * Same as PartnerProgram.GoldVariant but cards are forced to equal height/width:
 * - parent grid uses auto-rows-fr so rows get equal height
 * - each card is h-full and flex-col so content layout remains consistent
 *
 * Usage: import and render <PartnerProgramGoldVariantEqualCards />
 */

const GOLD_START = "#f7d88b";
const GOLD_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const SURFACE = "#ffffff";

const cardData = [
  {
    title: "Responsibilities",
    description: [
      "Embrace the system, follow it, and align with your leaders.",
      "Allow your leaders to guide you while you earn and learn simultaneously.",
      "Invite prospects to multiple workshops and events.",
      "Schedule follow-ups to grow your pipeline and skills.",
    ],
    Icon: Handshake,
  },
  {
    title: "Educate People On Securing Their Future",
    description: [
      "We help families secure future needs, build generational wealth, and enjoy life without compromise.",
    ],
    Icon: Notebook,
  },
  {
    title: "Required Skills",
    description: ["Energetic self-starter", "Coachable", "18+ with valid SSN"],
    Icon: BookOpenText,
  },
  {
    title: "What Will You Gain",
    description: [
      "Create plans covering retirement, tax efficiency, 401(k) rollovers, college saving, asset protection and estate planning.",
    ],
    Icon: ChartNoAxesCombined,
  },
];

export default function PartnerProgramGoldVariantEqualCards() {
  const [selectedCard, setSelectedCard] = useState(null);
  const calendlyReadyRef = useRef(false);

  // Ensure Calendly widget script is available
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("calendly-widget")) {
      calendlyReadyRef.current = !!window.Calendly;
      return;
    }
    const s = document.createElement("script");
    s.id = "calendly-widget";
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.onload = () => {
      calendlyReadyRef.current = true;
    };
    document.body.appendChild(s);
  }, []);

  const openCalendly = (url = "https://calendly.com/futurewesecure-info/30min") => {
    if (typeof window === "undefined") return;
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url });
      return;
    }
    // fallback: open in new tab
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="mt-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      aria-labelledby="partner-heading"
      style={{ background: "linear-gradient(180deg,#ffffff 0%, #fffaf3 45%, #ffffff 100%)" }}
    >
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 id="partner-heading" className="text-4xl font-extrabold" style={{ color: DEEP_NAVY }}>
          Partner Program
        </h2>
        <p className="mt-4 text-lg text-black/70">
          Build a meaningful career helping families secure their future — training, steps, and real earning potential.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => openCalendly()}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold shadow"
            style={{
              background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
              color: SURFACE,
              boxShadow: "0 12px 36px rgba(199,155,75,0.14)",
            }}
          >
            Book an intro call
          </button>

          <a
            onClick={() => openCalendly()}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-full border font-medium"
            style={{ borderColor: "rgba(8,42,72,0.06)", color: DEEP_NAVY }}
          >
            Contact us
          </a>
        </div>
      </div>

      {/* Content: grid + sticky CTA on wide screens */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cards area: auto-rows-fr ensures each grid row is same height, so cards stretch equally */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 auto-rows-fr">
          {cardData.map((card, idx) => {
            const { Icon } = card;
            return (
              <article
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedCard(card)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedCard(card);
                }}
                // h-full + flex-col makes each card fill its grid cell and align content vertically
                className="relative group cursor-pointer rounded-2xl p-6 bg-white/95 border shadow-[0_8px_30px_rgba(8,42,72,0.06)] hover:shadow-[0_18px_60px_rgba(8,42,72,0.12)] transition-transform hover:-translate-y-1 h-full flex flex-col"
                style={{ borderColor: "rgba(8,42,72,0.04)" }}
                aria-label={`${card.title} — view details`}
              >
                {/* Floating icon badge */}
                <div
                  className="absolute -top-8 left-6 w-20 h-20 rounded-2xl grid place-items-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD_START}, ${GOLD_END})`,
                    transform: "translateY(-8px)",
                  }}
                >
                  <Icon className="w-9 h-9 text-white" />
                </div>

                {/* Content container - flex-1 stretches to keep CTAs at bottom */}
                <div className="mt-6 pl-1 flex-1 flex flex-col">
                  <h3 className="mt-6 text-xl font-semibold" style={{ color: DEEP_NAVY }}>
                    {card.title}
                  </h3>

                  <ul className="mt-3 text-black/70 list-disc pl-5 space-y-1 text-sm leading-relaxed flex-1">
                    {card.description.slice(0, 4).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCard(card);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
                      style={{
                        background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                        color: SURFACE,
                        boxShadow: "0 8px 28px rgba(199,155,75,0.12)",
                      }}
                    >
                      View details
                    </button>

                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openCalendly();
                      }}
                      className="text-sm text-[rgba(8,42,72,0.85)] underline"
                    >
                      Book a call
                    </button> */}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Right column: highlight, quick benefits, CTA (sticky on large screens) */}
        <aside className="lg:col-span-4">
          <div
            className="sticky top-24 bg-white rounded-2xl p-6 border shadow-md"
            style={{ borderColor: "rgba(8,42,72,0.04)" }}
          >
            <div className="flex items-start gap-4">
              <div>
                <h4 className="text-lg font-bold" style={{ color: DEEP_NAVY }}>
                  Why join our program?
                </h4>
                <p className="mt-2 text-sm text-black/70">
                  Get training, mentorship, real leads, and a clear path to earn while you learn. Build a career helping families plan better.
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-black/70">
              <li>✔ Guided mentorship & structured onboarding</li>
              <li>✔ Real workshop invites & prospect flows</li>
              <li>✔ Commission + ongoing growth opportunities</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => openCalendly()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold"
                style={{
                  background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                  color: SURFACE,
                  boxShadow: "0 12px 36px rgba(199,155,75,0.14)",
                }}
              >
                Schedule intro call
              </button>

              <a
                onClick={() => openCalendly()}
                className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border font-medium"
                style={{ borderColor: "rgba(8,42,72,0.06)", color: DEEP_NAVY }}
              >
                Contact
              </a>
            </div>

            <div className="mt-4 text-xs text-black/60">
              <strong>Time slots:</strong> Weekdays evenings and weekends by appointment. No pressure — just clarity.
            </div>
          </div>
        </aside>
      </div>

      {/* Modal for selected card */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedCard.title} details`}
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 p-2 rounded hover:bg-gray-100"
              onClick={() => setSelectedCard(null)}
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold" style={{ color: DEEP_NAVY }}>
              {selectedCard.title}
            </h3>

            <ul className="mt-4 list-disc pl-5 space-y-2 text-black/75">
              {selectedCard.description.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => openCalendly()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold"
                style={{
                  background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                  color: SURFACE,
                }}
              >
                Book a Call
              </button>

              <button
                onClick={() => setSelectedCard(null)}
                className="px-4 py-3 rounded-full border font-medium"
                style={{ borderColor: "rgba(8,42,72,0.06)", color: DEEP_NAVY }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
