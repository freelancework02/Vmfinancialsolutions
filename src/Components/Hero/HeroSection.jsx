// HeroImageEnhanced.jsx
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import heroImg from "../../assets/Herosec.png"; // keep your image path

const ACCENT_START = "#f7d88b";
const ACCENT_END = "#c9943b";
const TEXT_NAVY = "#0f3144";

export default function HeroImageEnhanced({ onBook = () => {} }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgX = useTransform(x, [-240, 240], [-12, 12]);
  const imgY = useTransform(y, [-140, 140], [-8, 8]);
  const containerRef = useRef(null);

  function handlePointer(e) {
    if (e.pointerType === "touch") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function resetPointer() {
    x.set(0);
    y.set(0);
  }

  return (
    <header className="w-full bg-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Hero card with ribbon */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-[0_20px_50px_rgba(2,20,45,0.06)] border" style={{ borderColor: "rgba(2,20,45,0.04)" }}>
              {/* Decorative stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-b from-[#f7d88b] to-[#c9943b] opacity-95" />

              <div className="pl-8 md:pl-12 pr-6 py-8 md:py-10">
                <div className="max-w-2xl">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold" style={{ color: TEXT_NAVY }}>
                    Making your future a success
                  </h1>

                  <p className="mt-4 text-base sm:text-lg text-slate-700">
                    Confidential, practical financial consulting tailored to your goals. We turn complex choices into clear
                    plans so you can move forward with confidence.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onBook();
                        if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                          window.Calendly.initPopupWidget({ url: "https://calendly.com/futurewesecure-info/30min" });
                        } else {
                          window.open("https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer");
                        }
                      }}
                      className="rounded-full px-6 py-3 font-semibold shadow-sm"
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT_START}, ${ACCENT_END})`,
                        color: "#072033",
                        boxShadow: "0 12px 36px rgba(199,155,75,0.10)",
                      }}
                    >
                      Book an Appointment
                    </button>

                    <a href="/service" className="inline-flex items-center self-center text-sm font-medium text-slate-700 ml-1">
                      Learn more
                    </a>
                  </div>

                  {/* stats ribbon */}
                  <div className="mt-6 inline-flex items-center gap-6 bg-white/95 border rounded-full px-4 py-2 shadow-inner" style={{ borderColor: "rgba(2,20,45,0.04)" }}>
                    <div className="text-xs text-slate-600">Trusted by</div>
                    <div className="text-lg font-bold" style={{ color: TEXT_NAVY }}>1,200+ families</div>
                    <div className="text-xs text-slate-500">• Real guidance • Real clarity</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary small cards below on large screens */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl p-4 bg-white border shadow-sm" style={{ borderColor: "rgba(2,20,45,0.04)" }}>
                <div className="font-semibold text-sm" style={{ color: TEXT_NAVY }}>Tailored Plans</div>
                <div className="mt-2 text-sm text-slate-600">Personalized strategies for real life.</div>
              </div>

              <div className="rounded-xl p-4 bg-white border shadow-sm" style={{ borderColor: "rgba(2,20,45,0.04)" }}>
                <div className="font-semibold text-sm" style={{ color: TEXT_NAVY }}>Trusted Advisors</div>
                <div className="mt-2 text-sm text-slate-600">Decades of experience guiding families.</div>
              </div>

              <div className="rounded-xl p-4 bg-white border shadow-sm" style={{ borderColor: "rgba(2,20,45,0.04)" }}>
                <div className="font-semibold text-sm" style={{ color: TEXT_NAVY }}>Quick Calls</div>
                <div className="mt-2 text-sm text-slate-600">15 minute consults to get started fast.</div>
              </div>
            </div>
          </div>

          {/* Right: Parallax image with floating panel */}
          <div
            className="lg:col-span-5"
            ref={containerRef}
            onPointerMove={handlePointer}
            onPointerLeave={resetPointer}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <motion.img
                src={heroImg}
                alt="Financial overview"
                className="w-full h-[420px] md:h-[520px] object-cover"
                // style={{ x: imgX, y: imgY }}
                // loading="lazy"
              />

              {/* layered highlight card */}
              <div className="absolute left-6 bottom-6 z-30">
                <div className="bg-white/90 rounded-2xl p-4 md:p-5 shadow-lg border" style={{ borderColor: "rgba(2,20,45,0.06)" }}>
                  <div className="text-xs text-slate-600">Quick Consult</div>
                  <div className="mt-1 text-sm font-semibold" style={{ color: TEXT_NAVY }}>15 minutes — clear next step</div>

                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onBook();
                        if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                          window.Calendly.initPopupWidget({ url: "https://calendly.com/futurewesecure-info/30min" });
                        } else {
                          window.open("https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer");
                        }
                      }}
                      className="px-4 py-2 rounded-full font-semibold"
                      style={{ background: `linear-gradient(90deg, ${ACCENT_START}, ${ACCENT_END})`, color: "#072033" }}
                    >
                      Book
                    </button>

                    <a href="#contact" className="text-sm text-slate-600 self-center" onClick={(e) => e.preventDefault()}>
                      Contact
                    </a>
                  </div>
                </div>
              </div>

              {/* soft glow */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-60 pointer-events-none" style={{ background: `radial-gradient(circle at 30% 30%, ${ACCENT_START}, transparent 40%)`, filter: "blur(20px)" }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
