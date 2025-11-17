// File: HeroImageVariant.jsx
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import heroImg from "../../assets/Herosec.png"; // replace with your image

const ACCENT_START = "#f7d88b";
const ACCENT_END = "#c9943b";
const TEXT_NAVY = "#0f3144";

export default function HeroImageVariant({ onBook = () => alert("Book appointment") }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgX = useTransform(x, [-200, 200], [-10, 10]);
  const imgY = useTransform(y, [-120, 120], [-6, 6]);
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
    <header className="w-full bg-white mt-16">
      {/* ⚡ FULL WIDTH SECTION — NO SIDE SPACE */}
      <div className="w-full px-4 sm:px-6 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12">

          {/* LEFT: wider text section */}
          <div className="lg:col-span-6">
            <div className="bg-white/95 rounded-2xl p-8 sm:p-10 shadow-[0_18px_40px_rgba(2,6,23,0.10)] border border-gray-100 w-full">
              
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
                style={{ color: TEXT_NAVY }}
              >
                Making your future a success
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-700 max-w-2xl">
                Confidential, practical financial consulting tailored to your goals.  
                We turn complex choices into clear plans so you can move forward with confidence.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                   onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                          window.Calendly.initPopupWidget({ url: "https://calendly.com/futurewesecure-info/30min" });
                        } else {
                          window.open("https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer");
                        }
                      }}
                  className="rounded-full px-8 py-3 font-semibold shadow hover:-translate-y-0.5 transition-all"
                  style={{
                    background: `linear-gradient(90deg, ${ACCENT_START}, ${ACCENT_END})`,
                    color: "#072033",
                  }}

                >
                  Book an Appointment
                </button>

                <a href="/service" className="text-sm font-medium text-slate-700 mt-1 sm:mt-0">
                  Learn more
                </a>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600">
                <li>Tailored financial plans</li>
                <li>Experienced advisors</li>
                <li>Secure & confidential</li>
                <li>Clear next steps</li>
              </ul>

            </div>
          </div>

          {/* RIGHT: wider image section */}
          <div
            className="lg:col-span-6 flex justify-center"
            ref={containerRef}
            onPointerMove={handlePointer}
            onPointerLeave={resetPointer}
          >
            <div className="relative w-full">

              {/* IMAGE WRAPPER — full width */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl w-full">
                <motion.img
                  src={heroImg}
                  alt="Financial overview"
                  className="w-full h-[320px] sm:h-[380px] lg:h-[460px] object-cover"
                  // draggable={false}
                  // style={{ x: imgX, y: imgY }}
                  // initial={{ scale: 1.02 }}
                  // whileHover={{ scale: 1.03 }}
                  // transition={{ type: "spring", stiffness: 70, damping: 14 }}
                />

                {/* translucent floating card */}
                <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 z-30">
                  <div className="backdrop-blur-sm bg-white/75 rounded-xl p-4 shadow-md border border-gray-100">
                    <div className="text-xs font-semibold text-slate-700">Ready to plan?</div>
                    <div className="mt-1 text-sm font-medium" style={{ color: TEXT_NAVY }}>
                      Quick consult — 15 mins
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                         onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                          window.Calendly.initPopupWidget({ url: "https://calendly.com/futurewesecure-info/30min" });
                        } else {
                          window.open("https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer");
                        }
                      }}
                        className="px-4 py-1 rounded-full text-sm font-semibold"
                        style={{
                          background: `linear-gradient(90deg, ${ACCENT_START}, ${ACCENT_END})`,
                          color: "#072033",
                        }}
                      >
                        Book
                      </button>

                      <a href="#" className="text-xs text-slate-600"  onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                          window.Calendly.initPopupWidget({ url: "https://calendly.com/futurewesecure-info/30min" });
                        } else {
                          window.open("https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer");
                        }
                      }}>
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
