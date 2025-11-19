// EventsDetail.Modern.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FiCalendar,
  FiUser,
  FiImage,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

/**
 * EventsDetail - Modern (updated with real demo data & images)
 * - Clean, readable layout
 * - Large hero with concise floating info card
 * - Sticky right-side details & actions
 * - Simple lightbox with keyboard controls
 *
 * Props:
 *  - event: object with title, date, host, thumbnailUrl, gallery (array), meetingLink, description
 *  - previousEvents: optional array of prior events
 *
 * Usage:
 *  <EventsDetailModern event={myEvent} previousEvents={myPrevEvents} />
 *
 * If no event prop passed, built-in demo event with proper images will show.
 */

const ACCENT_START = "#f7d88b";
const ACCENT_END = "#c9943b";
const GRADIENT = `linear-gradient(135deg, ${ACCENT_START}, ${ACCENT_END})`;

/* ---------- demo data (used when no event prop provided) ---------- */
const DEMO_EVENT = {
  title: "Design Systems & DX — Practical Deep Dive",
  date: "2025-11-24T18:30:00+05:30",
  host: "vm financial solutions · Vaibhav Maddiwar",
  description:
    `<p>Join Vaibhav Maddiwar for a hands-on session exploring design systems that scale, accessibility patterns, and practical developer experience improvements you can adopt right away.</p>
     <ul>
       <li>Short talk: design tokens & theming</li>
       <li>Live demo: building a small component library</li>
       <li>Q&A and practical next steps</li>
     </ul>
     <p>Bring your questions — this session is interactive.</p>`,
  thumbnailUrl:
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1600&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1400&auto=format&fit=crop",
  ],
  meetingLink: "https://meet.google.com/example-meet-link",
};

const DEMO_PREVIOUS = [
  {
    id: "prev-101",
    title: "Frontend Roadmap: Build with Confidence",
    date: "2025-10-22T18:00:00+05:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop",
    recordingLink: "https://example.com/recording/frontend-roadmap",
  },
  {
    id: "prev-102",
    title: "React Accessibility Patterns",
    date: "2025-09-10T17:00:00+05:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
    recordingLink: "https://example.com/recording/react-a11y",
  },
  {
    id: "prev-103",
    title: "Practical Performance Budgets",
    date: "2025-08-05T16:00:00+05:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=800&auto=format&fit=crop",
    recordingLink: "https://example.com/recording/perf-budgets",
  },
];

/* -------------------- component -------------------- */
export default function EventsDetailModern({ event = null, previousEvents = null }) {
  // use provided event or demo
  const model = useMemo(() => ({ ...(event || DEMO_EVENT) }), [event]);
  const prevList = Array.isArray(previousEvents) && previousEvents.length ? previousEvents : DEMO_PREVIOUS;

  const images = Array.isArray(model.gallery) ? model.gallery : [];
  const hasGallery = images.length > 0;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxRef = useRef(null);

  const formattedDate = useMemo(() => safeFormatDate(model.date), [model.date]);

  /* keyboard nav for lightbox */
  useEffect(() => {
    const handler = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, images.length]);

  function openAt(i) {
    if (!hasGallery) return;
    setLightboxIndex(Math.max(0, i % images.length));
    setLightboxOpen(true);
    setTimeout(() => lightboxRef.current?.focus?.(), 50);
    document.body.style.overflow = "hidden";
  }

  function handleClose() {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }

  function prev() {
    setLightboxIndex((p) => (p - 1 + images.length) % images.length);
  }

  function next() {
    setLightboxIndex((p) => (p + 1) % images.length);
  }

  function joinMeeting() {
    if (!model.meetingLink) {
      // scroll to contact or bottom if none
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return;
    }
    window.open(model.meetingLink, "_blank", "noopener noreferrer");
  }

  return (
    <section className="w-full">
      {/* HERO */}
      <div className="relative w-full">
        <div className="h-64 md:h-96 lg:h-[520px] w-full overflow-hidden rounded-2xl">
          {model.thumbnailUrl ? (
            <img
              src={model.thumbnailUrl}
              alt={model.title}
              className="w-full h-full object-cover brightness-[0.75] transition-transform duration-700 hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
        </div>

        {/* floating info card */}
        <div className="absolute left-4 right-4 md:left-12 md:right-auto bottom-4 md:bottom-12 md:w-1/2">
          <article
            className="rounded-2xl bg-white/99 p-4 md:p-6 shadow-2xl border"
            style={{ borderColor: "rgba(8,42,72,0.06)" }}
            aria-label={`Event card: ${model.title}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white rounded-full px-2 py-0.5"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                >
                  <FiCalendar /> <span className="leading-none">{formattedDate}</span>
                </div>

                <h1 className="mt-2 text-lg md:text-xl font-extrabold text-white truncate">{model.title}</h1>
                <p className="mt-1 text-sm text-white">{model.host}</p>
                <p className="mt-2 text-xs text-white">Format: Live · Q&A · Slides</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={joinMeeting}
                  className="rounded-full px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
                  style={{ background: GRADIENT }}
                >
                  {model.meetingLink ? "Join Meeting" : "Contact Organizer"}
                </button>

                {hasGallery && (
                  <button
                    onClick={() => openAt(0)}
                    className="rounded-full px-3 py-1 text-white text-sm font-medium border"
                    style={{ borderColor: "rgba(8,42,72,0.06)" }}
                  >
                    View Gallery
                  </button>
                )}

                <div className="text-xs text-white">~90 mins</div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* main column */}
        <div className="lg:col-span-2 space-y-6">
          <section
            className="rounded-2xl p-5 bg-white border shadow-sm"
            style={{ borderColor: "rgba(8,42,72,0.04)" }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            <div className="text-gray-700 prose max-w-none">
              {looksLikeHtml(model.description) ? (
                <div dangerouslySetInnerHTML={{ __html: safeHTML(model.description) }} />
              ) : (
                <p>{model.description}</p>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Gallery</h3>
              <div className="text-sm text-gray-500">{images.length} photos</div>
            </div>

            {hasGallery ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.slice(0, 9).map((src, i) => (
                  <button
                    key={i}
                    onClick={() => openAt(i)}
                    className="group relative rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition"
                    aria-label={`Open image ${i + 1}`}
                  >
                    <div className="aspect-[4/3]">
                      <img
                        src={src}
                        alt={`Event image ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div
                      className="absolute left-2 top-2 px-2 py-0.5 rounded-md text-xs text-white"
                      style={{ background: GRADIENT }}
                    >
                      #{i + 1}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-dashed border p-6 text-center text-gray-500">No gallery yet</div>
            )}
          </section>
        </div>

        {/* sidebar */}
        <aside className="space-y-4">
          <div
            className="rounded-2xl p-4 bg-white border shadow-sm sticky top-24"
            style={{ borderColor: "rgba(8,42,72,0.04)" }}
          >
            <h4 className="font-semibold text-gray-900">Event details</h4>
            <ul className="mt-3 space-y-3 text-sm text-gray-700">
              <li>
                <div className="font-medium">When</div>
                <div className="text-gray-500">{formattedDate}</div>
              </li>
              <li>
                <div className="font-medium">Host</div>
                <div className="text-gray-500">{model.host}</div>
              </li>
            </ul>

            <div className="mt-4">
              <button
                onClick={joinMeeting}
                className="w-full rounded-lg px-4 py-2 font-semibold text-white"
                style={{ background: GRADIENT }}
              >
                {model.meetingLink ? "Join Meeting" : "Request Info"}
              </button>
            </div>
          </div>

          <div
            className="rounded-2xl p-3 bg-white border shadow-sm"
            style={{ borderColor: "rgba(8,42,72,0.04)" }}
          >
            <h5 className="font-semibold text-gray-900 mb-2">Previous events</h5>
            <div className="space-y-3 text-sm text-gray-700">
              {prevList.slice(0, 3).map((p, i) => (
                <div key={p.id || i} className="flex items-start gap-3">
                  <div className="w-14 h-10 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                    {p.thumbnailUrl ? (
                      <img src={p.thumbnailUrl} alt={p.title} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{p.title}</div>
                    <div className="text-xs text-gray-500">{safeFormatDate(p.date)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && hasGallery && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              ref={lightboxRef}
              src={images[lightboxIndex]}
              alt={`Preview ${lightboxIndex + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-md shadow-lg"
            />

            <button onClick={handleClose} className="absolute top-3 right-3 p-2 rounded-full bg-white/90" aria-label="Close">
              <FiX />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90"
              aria-label="Previous"
            >
              <FiChevronLeft />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90"
              aria-label="Next"
            >
              <FiChevronRight />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- helpers ---------------- */

function safeFormatDate(d) {
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return String(d || "");
    return dt.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(d || "");
  }
}

function looksLikeHtml(s) {
  return typeof s === "string" && /<\/?[a-z][\s\S]*>/i.test(s);
}

function safeHTML(html) {
  // minimal sanitizer: strip script/style and return the rest
  return String(html || "").replace(/<(script|style)[\s\S]*?>[\s\S]*?<\/\1>/gi, "");
}
