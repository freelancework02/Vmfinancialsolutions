// File: HeroImageVariant.jsx
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import heroImg from "../../assets/Herosec.png"; // <-- put your generated image here

const ACCENT_START = "#f7d88b";
const ACCENT_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const TEXT_NAVY = "#0f3144";

/*
  Hero using an external image:
  - subtle parallax on mouse move (desktop)
  - clipped angled mask to match composition
  - improved contrast overlays and refined CTA
*/

export default function HeroImageVariant({ onBook = () => alert("Book appointment") }) {
  // small parallax using framer-motion with pointer position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // small transform values
  const imgX = useTransform(x, [-200, 200], [-10, 10]);
  const imgY = useTransform(y, [-120, 120], [-6, 6]);

  const containerRef = useRef(null);

  function handlePointer(e) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px);
    y.set(py);
  }

  function resetPointer() {
    x.set(0);
    y.set(0);
  }

  return (
    <header className="w-full bg-white mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-16 lg:py-24">
          {/* Left text */}
          <div className="lg:col-span-6 z-30">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight" style={{ color: TEXT_NAVY }}>
              Making Your Future a Success
            </h1>

            <p className="mt-6 text-base sm:text-lg max-w-xl text-slate-700">
              We provide confidential and reliable consulting services tailored to your individual financial
              requirements. Our dedicated team is ready to assist you comprehensively.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={onBook}
                aria-label="Book an appointment"
                className="inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transform-gpu hover:-translate-y-0.5"
                style={{ background: `linear-gradient(90deg, ${ACCENT_START}, ${ACCENT_END})`, color: "#072033" }}
              >
                BOOK AN APPOINTMENT
              </button>

              <a href="#services" className="text-sm font-medium" style={{ color: DEEP_NAVY }}>
                Learn more
              </a>
            </div>
          </div>

          {/* Right image with pointer-based parallax */}
          <div
            className="lg:col-span-6 flex justify-end"
            ref={containerRef}
            onPointerMove={handlePointer}
            onPointerLeave={resetPointer}
            onPointerCancel={resetPointer}
          >
            <div className="relative w-full max-w-2xl lg:max-w-xl">
              <div aria-hidden className="absolute -left-20 top-0 bottom-0 w-[50%] hidden lg:block rounded-2xl" style={{ background: DEEP_NAVY }} />

              <div
                className="relative overflow-hidden rounded-3xl shadow-2xl"
                style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" }}
              >
                <motion.img
                  src={heroImg}
                  alt="Financial graph stylized"
                  className="w-full h-full object-cover block"
                  draggable={false}
                  style={{ x: imgX, y: imgY }}
                  initial={{ scale: 1.02 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 70, damping: 12 }}
                />

                {/* darker multiply overlay to keep text contrast on sections */}
                <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(8,42,72,0.28), rgba(8,42,72,0.12))", mixBlendMode: "multiply" }} />

                {/* gold decorative glow */}
                <div aria-hidden className="absolute right-6 top-6 w-24 h-24 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, rgba(247,216,139,0.12), transparent 60%)", pointerEvents: "none" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
