// EventsGallery.Attractive.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

/* ---------- Firebase (unchanged) ---------- */
const firebaseConfig = {
  apiKey: "AIzaSyBg2p1nPZQ39AU91CDzRWeYtQjBs5HHf-Y",
  authDomain: "ajazgraphic-da740.firebaseapp.com",
  projectId: "ajazgraphic-da740",
  storageBucket: "ajazgraphic-da740.appspot.com",
  messagingSenderId: "600209988666",
  appId: "1:600209988666:web:d806f6d7dfd10fa394a903",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * EventsGallery.Attractive.jsx
 *
 * - Eye-catching, modern layout emphasizing the latest gallery with a thumbnail rail.
 * - Uniform cards below with hover lift / tilt, badges, filters, and sticky CTAs.
 * - Uses GOLD + DEEP_NAVY theme (GOLD_START/GOLD_END/DEEP_NAVY).
 * - Preserves fetching, keyboard-friendly lightbox, and mobile responsiveness.
 */

const GOLD_START = "#f7d88b";
const GOLD_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const SURFACE = "#ffffff";

export default function EventsGalleryAttractive() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [filter, setFilter] = useState("All"); // All | Workshops | Webinars | Highlights | etc
  const [availableTags, setAvailableTags] = useState(["All"]);
  const [visibleIds, setVisibleIds] = useState(new Set());

  // lightbox state
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0, title: "" });

  const observerRef = useRef(null);

  useEffect(() => {
    // fetch events
    const fetchEvents = async () => {
      try {
        const qs = await getDocs(collection(db, "properedgefinance"));
        const events = qs.docs.map((doc) => ({
          id: Number.isNaN(parseInt(doc.id, 10)) ? doc.id : parseInt(doc.id, 10),
          ...doc.data(),
        }));
        // sort ascending -> newest last
        events.sort((a, b) => {
          const an = typeof a.id === "number";
          const bn = typeof b.id === "number";
          if (an && bn) return a.id - b.id;
          return String(a.id).localeCompare(String(b.id));
        });
        setEventsData(events);

        // derive tags (normalize and unique)
        const tags = new Set(["All"]);
        events.forEach((e) => {
          if (e.tag) tags.add(String(e.tag));
          // also add category-like fields if present
          if (e.category) tags.add(String(e.category));
        });
        setAvailableTags(Array.from(tags));
      } catch (e) {
        console.error(e);
        setErr("Couldn't load the gallery. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // IntersectionObserver for reveal animations
  useEffect(() => {
    if (typeof window === "undefined") return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-event-id");
          if (!id) return;
          if (entry.isIntersecting) {
            setVisibleIds((s) => {
              if (s.has(id)) return s;
              const n = new Set(s);
              n.add(id);
              return n;
            });
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    return () => observerRef.current?.disconnect?.();
  }, []);

  const setCardRef = useCallback((el) => {
    if (!el) return;
    const id = el.getAttribute("data-event-id");
    if (!id) return;
    observerRef.current && observerRef.current.observe(el);
  }, []);

  // Lightbox controls
  const openLightbox = useCallback((images, index = 0, title = "") => {
    if (!Array.isArray(images) || images.length === 0) return;
    setLightbox({ open: true, images, index, title });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((s) => ({ ...s, open: false }));
    document.body.style.overflow = "";
  }, []);

  const prevImage = useCallback(() => {
    setLightbox((s) => ({ ...s, index: (s.index - 1 + s.images.length) % s.images.length }));
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((s) => ({ ...s, index: (s.index + 1) % s.images.length }));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox.open, closeLightbox, prevImage, nextImage]);

  // helpers
  function heroImageForEvent(e) {
    if (Array.isArray(e.images) && e.images.length) return e.images[0];
    if (e.thumbnail) return e.thumbnail;
    if (e.image) return e.image;
    return "";
  }

  // Latest = newest (last in sorted array)
  const latest = eventsData.length ? eventsData[eventsData.length - 1] : null;
  const previous = eventsData.length ? eventsData.slice(0, eventsData.length - 1).reverse() : [];

  // filtered previous list
  const filteredPrevious =
    filter === "All" ? previous : previous.filter((p) => (p.tag ? String(p.tag) === filter : false) || (p.category ? String(p.category) === filter : false));

  // small utility for safe short text
  const excerpt = (text, len = 120) => (text ? String(text).slice(0, len) + (String(text).length > len ? "…" : "") : "");

  return (
    <section className="mt-16 relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
      {/* Top heading + filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: DEEP_NAVY }}>
            Events Showcase
          </h2>
          <p className="mt-2 text-black/60 max-w-xl">
            Latest gallery highlighted — browse previous galleries below. Use filters to find workshops, webinars and highlights quickly.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 flex-wrap">
            {availableTags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`text-sm px-3 py-1.5 rounded-full font-medium transition ${
                  filter === t
                    ? "shadow-lg"
                    : "border bg-white/60 hover:bg-white/80"
                }`}
                style={
                  filter === t
                    ? { background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: SURFACE }
                    : { borderColor: "rgba(8,42,72,0.06)", color: DEEP_NAVY }
                }
                aria-pressed={filter === t}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-3xl overflow-hidden animate-pulse h-[420px] bg-gray-100" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl p-4 bg-white/40 animate-pulse h-64" />
            ))}
          </div>
        </div>
      )}

      {!loading && err && <div className="text-center text-black/70 py-16">{err}</div>}

      {/* Latest hero — bold and attractive */}
      {!loading && !err && latest && (
        <article
          data-event-id={String(latest.id)}
          ref={setCardRef}
          className="relative rounded-3xl overflow-hidden shadow-[0_22px_60px_rgba(8,42,72,0.08)] mb-10"
          style={{ border: "1px solid rgba(8,42,72,0.04)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: hero image + overlay */}
            <div className="lg:col-span-8 relative">
              <div className="relative h-[420px] md:h-[520px] overflow-hidden">
                {heroImageForEvent(latest) ? (
                  <img
                    src={heroImageForEvent(latest)}
                    alt={latest.title || ""}
                    className="w-full h-full object-cover transition-transform duration-700 transform hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,42,72,0.6)] via-transparent to-transparent" />

                <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 right-6 md:right-10">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: SURFACE }}>
                      LATEST
                    </span>
                    <div className="text-xs text-white/90">{latest.date || ""}</div>
                  </div>

                  <h3 className="mt-4 text-2xl md:text-4xl font-extrabold text-white leading-tight" style={{ textShadow: "0 10px 22px rgba(0,0,0,0.5)" }}>
                    {latest.title || `Event ${latest.id}`}
                  </h3>
                  <p className="mt-3 text-white/90 max-w-3xl text-sm md:text-base">
                    {latest.subtitle ? excerpt(latest.subtitle, 180) : excerpt(latest.description, 180)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3 items-center">
                    <button
                      onClick={() => openLightbox(Array.isArray(latest.images) ? latest.images : [], 0, latest.title)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold shadow-md"
                      style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: SURFACE }}
                    >
                      View Gallery
                    </button>

                    <a
                      href={latest.meetingLink || "#"}
                      onClick={(e) => {
                        if (!latest.meetingLink) e.preventDefault();
                      }}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium"
                      style={{ borderColor: "rgba(255,255,255,0.12)", color: "white" }}
                    >
                      {latest.meetingLink ? "Join Meeting" : "No meeting link"}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: thumbnail rail + quick meta (on desktop) */}
            <aside className="lg:col-span-4 border-l hidden lg:block" style={{ borderColor: "rgba(8,42,72,0.04)" }}>
              <div className="p-6 sticky top-28 h-[520px] flex flex-col gap-4">
                <div>
                  <div className="text-sm font-semibold" style={{ color: DEEP_NAVY }}>Quick previews</div>
                  <div className="mt-2 text-xs text-black/60">Peek into the latest images — tap to open.</div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3 overflow-auto">
                  {(Array.isArray(latest.images) ? latest.images.slice(0, 8) : []).map((src, i) => (
                    <button key={i} onClick={() => openLightbox(latest.images, i, latest.title)} className="rounded-xl overflow-hidden border border-black/6 shadow-sm group focus:outline-none">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img src={src} alt={`preview ${i + 1}`} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105" loading="lazy" />
                      </div>
                    </button>
                  ))}

                  {(!latest.images || latest.images.length === 0) && (
                    <div className="col-span-2 text-sm text-black/60 p-3 bg-white rounded-xl border border-black/6">No previews available</div>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="text-sm text-black/70">Curated on</div>
                  <div className="mt-1 font-semibold" style={{ color: DEEP_NAVY }}>{latest.date || "—"}</div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      )}

      {/* Previous heading */}
      {!loading && !err && previous.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xl font-bold" style={{ color: DEEP_NAVY }}>Previous Galleries</h4>
          <p className="text-sm text-black/60">Uniform, easy-to-scan cards with consistent height and clear CTAs.</p>
        </div>
      )}

      {/* Uniform card grid (filtered) */}
      {!loading && !err && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrevious.map((ev) => {
            const images = Array.isArray(ev.images) ? ev.images : [];
            const hero = heroImageForEvent(ev);
            return (
              <article
                key={ev.id}
                data-event-id={String(ev.id)}
                ref={setCardRef}
                className={`relative flex flex-col rounded-2xl overflow-hidden bg-white border shadow-[0_8px_30px_rgba(8,42,72,0.04)] hover:shadow-[0_18px_60px_rgba(8,42,72,0.08)] transition-transform hover:-translate-y-2`}
                style={{ borderColor: "rgba(8,42,72,0.04)", minHeight: 360 }}
                aria-labelledby={`event-${ev.id}-title`}
              >
                <div className="relative h-44 overflow-hidden">
                  {hero ? (
                    <img src={hero} alt={ev.title || ""} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,42,72,0.28)] via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 px-2 py-1 rounded-md text-xs font-semibold" style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: SURFACE }}>
                    PREVIOUS
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 id={`event-${ev.id}-title`} className="text-lg font-semibold" style={{ color: DEEP_NAVY }}>{ev.title}</h5>
                    <p className="mt-2 text-sm text-black/65 line-clamp-3">{excerpt(ev.subtitle || ev.description, 120)}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-black/60">{ev.date || ""}</div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openLightbox(images, 0, ev.title)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold shadow-sm"
                        style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: SURFACE }}
                      >
                        View
                      </button>

                      <a
                        href={ev.meetingLink || "#"}
                        onClick={(e) => {
                          if (!ev.meetingLink) e.preventDefault();
                        }}
                        className="text-sm text-[rgba(8,42,72,0.85)] underline"
                      >
                        {ev.meetingLink ? "Join" : "No link"}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* No previous results after filter */}
          {filteredPrevious.length === 0 && (
            <div className="col-span-full py-20 text-center text-black/60 rounded-2xl border border-black/6">
              No galleries match this filter.
            </div>
          )}
        </div>
      )}

      {/* Sticky right CTA for mobile (bottom fixed) */}
      <div className="lg:hidden fixed left-4 right-4 bottom-6 z-50">
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (latest) openLightbox(Array.isArray(latest.images) ? latest.images : [], 0, latest.title);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold"
              style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: SURFACE, boxShadow: "0 12px 36px rgba(199,155,75,0.12)" }}
            >
              Open latest gallery
            </button>

            <a href="#contact" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border" style={{ borderColor: "rgba(8,42,72,0.06)", color: DEEP_NAVY }}>
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {lightbox.open && (
        <div className="fixed inset-0 z-60 grid place-items-center bg-black/90 p-4" onClick={closeLightbox}>
          <div className="relative w-full max-w-6xl rounded-2xl overflow-hidden bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ background: DEEP_NAVY }}>
              <div className="text-sm font-semibold" style={{ color: SURFACE }}>{lightbox.title || ""}</div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 text-xs rounded-md" style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`, color: SURFACE }}>
                  {lightbox.index + 1}/{lightbox.images.length}
                </div>
                <button onClick={closeLightbox} className="p-2 rounded hover:bg-white/5" aria-label="Close" style={{ color: SURFACE }}>✕</button>
              </div>
            </div>

            <div className="relative bg-black flex items-center justify-center" style={{ minHeight: "65vh" }}>
              <img src={lightbox.images[lightbox.index]} alt={`lightbox ${lightbox.index + 1}`} className="mx-auto max-h-[84vh] object-contain w-auto" />

              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow" aria-label="Previous">‹</button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow" aria-label="Next">›</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
