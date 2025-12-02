// EventsGallery.Attractive.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";

const GOLD_START = "#f7d88b";
const GOLD_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const SURFACE = "#ffffff";

// API base for your backend
const API_BASE = "https://vmfinancialsolutions.com/api";

/**
 * EventsGallery.Attractive.jsx
 *
 * Powered by your Node API:
 * - List galleries: GET  /api/galleries
 * - Gallery detail + images: GET /api/galleries/:id
 * - Image blob: GET /api/galleries/image/:imageId/blob
 */

export default function EventsGalleryAttractive() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [filter, setFilter] = useState("All"); // All (only one for now)
  const [availableTags, setAvailableTags] = useState(["All"]);
  const [visibleIds, setVisibleIds] = useState(new Set());

  // lightbox state
  const [lightbox, setLightbox] = useState({
    open: false,
    images: [],
    index: 0,
    title: "",
  });

  const observerRef = useRef(null);

  // Fetch galleries from API (replaces Firebase)
  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      setErr("");

      try {
        // 1) Get list of galleries
        const res = await fetch(`${API_BASE}/galleries`);
        if (!res.ok) throw new Error("Failed to load galleries list");

        const json = await res.json();
        const list = Array.isArray(json.data) ? json.data : [];

        // Only show published galleries
        const published = list.filter(
          (g) => g.is_published === 1 || g.is_published === true
        );

        // Sort ascending by created_at (so last one is "latest")
        published.sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );

        // 2) For each gallery, fetch its images
        const mapped = await Promise.all(
          published.map(async (g) => {
            const baseMapped = {
              id: g.id,
              title: g.title,
              description: g.description,
              created_at: g.created_at,
              date: g.created_at
                ? new Date(g.created_at).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "",
              tag: "Gallery", // generic tag for now
              images: [],
            };

            try {
              const detailRes = await fetch(`${API_BASE}/galleries/${g.id}`);
              if (!detailRes.ok) throw new Error("Failed gallery detail");

              const detailJson = await detailRes.json();
              const imgs = Array.isArray(detailJson.images)
                ? detailJson.images.map(
                    (img) => `${API_BASE}/galleries/image/${img.id}/blob`
                  )
                : [];

              return {
                ...baseMapped,
                images: imgs,
              };
            } catch (e) {
              console.error(
                "Error loading images for gallery",
                g.id,
                e.message
              );
              // fallback: just return gallery without images
              return baseMapped;
            }
          })
        );

        setEventsData(mapped);

        // Tags: just "All" for now (API has no category/tag fields)
        setAvailableTags(["All"]);
      } catch (e) {
        console.error(e);
        setErr("Couldn't load the gallery. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
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
    setLightbox((s) => ({
      ...s,
      index: (s.index - 1 + s.images.length) % s.images.length,
    }));
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((s) => ({
      ...s,
      index: (s.index + 1) % s.images.length,
    }));
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
  const latest = eventsData.length
    ? eventsData[eventsData.length - 1]
    : null;
  const previous = eventsData.length
    ? eventsData.slice(0, eventsData.length - 1).reverse()
    : [];

  // filtered previous list
  const filteredPrevious =
    filter === "All"
      ? previous
      : previous.filter(
          (p) =>
            (p.tag ? String(p.tag) === filter : false) ||
            (p.category ? String(p.category) === filter : false)
        );

  // small utility for safe short text
  const excerpt = (text, len = 120) =>
    text
      ? String(text).slice(0, len) +
        (String(text).length > len ? "…" : "")
      : "";

  return (
    <section
      className="mt-10 sm:mt-12 lg:mt-16 relative max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-16 pb-28 lg:pb-16"
    >
      {/* Top heading + filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 mb-6 sm:mb-8">
        <div className="w-full md:w-auto">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold"
            style={{ color: DEEP_NAVY }}
          >
            Gallery Showcase
          </h2>
          <p className="mt-2 text-sm sm:text-base text-black/60 max-w-xl">
            Latest gallery highlighted — browse previous galleries below.
          </p>
        </div>

        <div className="flex items-center justify-start md:justify-end gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 flex-wrap">
            {availableTags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`text-xs sm:text-sm px-3 py-1.5 rounded-full font-medium transition ${
                  filter === t
                    ? "shadow-lg"
                    : "border bg-white/60 hover:bg-white/80"
                }`}
                style={
                  filter === t
                    ? {
                        background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                        color: SURFACE,
                      }
                    : {
                        borderColor: "rgba(8,42,72,0.06)",
                        color: DEEP_NAVY,
                      }
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
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          <div className="rounded-3xl overflow-hidden animate-pulse h-56 sm:h-72 md:h-80 bg-gray-100" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 bg-white/40 animate-pulse h-48 sm:h-56"
              />
            ))}
          </div>
        </div>
      )}

      {!loading && err && (
        <div className="text-center text-black/70 py-12 sm:py-16">
          {err}
        </div>
      )}

      {/* Latest hero */}
      {!loading && !err && latest && (
        <article
          data-event-id={String(latest.id)}
          ref={setCardRef}
          className="relative rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(8,42,72,0.08)] mb-8 sm:mb-10"
          style={{ border: "1px solid rgba(8,42,72,0.04)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: hero image + overlay */}
            <div className="lg:col-span-8 relative">
              <div className="relative h-64 sm:h-80 md:h-[420px] lg:h-[520px] overflow-hidden">
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

                <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 md:left-10 md:bottom-10 right-4 sm:right-6 md:right-10">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold"
                      style={{
                        background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                        color: SURFACE,
                      }}
                    >
                      LATEST
                    </span>
                    <div className="text-[11px] sm:text-xs text-white/90">
                      {latest.date || ""}
                    </div>
                  </div>

                  <h3
                    className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-4xl font-extrabold text-white leading-tight"
                    style={{
                      textShadow: "0 10px 22px rgba(0,0,0,0.5)",
                    }}
                  >
                    {latest.title || `Gallery ${latest.id}`}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-white/90 max-w-3xl">
                    {excerpt(latest.description, 180)}
                  </p>

                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-3 items-center">
                    <button
                      onClick={() =>
                        openLightbox(
                          Array.isArray(latest.images)
                            ? latest.images
                            : [],
                          0,
                          latest.title
                        )
                      }
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold shadow-md"
                      style={{
                        background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                        color: SURFACE,
                      }}
                    >
                      View Gallery
                    </button>

                  
                  </div>
                </div>
              </div>
            </div>

            {/* Right: thumbnail rail + quick meta (desktop) */}
            <aside
              className="lg:col-span-4 border-l hidden lg:block"
              style={{ borderColor: "rgba(8,42,72,0.04)" }}
            >
              <div className="p-5 xl:p-6 sticky top-24 h-[460px] xl:h-[520px] flex flex-col gap-4">
                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: DEEP_NAVY }}
                  >
                    Quick previews
                  </div>
                  <div className="mt-1.5 text-xs text-black/60">
                    Peek into the latest images — tap to open.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2.5 overflow-auto pr-1">
                  {(Array.isArray(latest.images)
                    ? latest.images.slice(0, 8)
                    : []
                  ).map((src, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        openLightbox(latest.images, i, latest.title)
                      }
                      className="rounded-xl overflow-hidden border border-black/6 shadow-sm group focus:outline-none"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={src}
                          alt={`preview ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </button>
                  ))}

                  {(!latest.images ||
                    latest.images.length === 0) && (
                    <div className="col-span-2 text-sm text-black/60 p-3 bg-white rounded-xl border border-black/6">
                      No previews available
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-2">
                  <div className="text-xs text-black/70">Captured on</div>
                  <div
                    className="mt-1 text-sm font-semibold"
                    style={{ color: DEEP_NAVY }}
                  >
                    {latest.date || "—"}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      )}

      {/* Previous heading */}
      {!loading && !err && previous.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h4
            className="text-lg sm:text-xl font-bold"
            style={{ color: DEEP_NAVY }}
          >
            Previous Galleries
          </h4>
          <p className="text-xs sm:text-sm text-black/60">
            Uniform, easy-to-scan cards with consistent height and clear
            CTAs.
          </p>
        </div>
      )}

      {/* Uniform card grid (filtered) */}
      {!loading && !err && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPrevious.map((ev) => {
            const images = Array.isArray(ev.images) ? ev.images : [];
            const hero = heroImageForEvent(ev);
            return (
              <article
                key={ev.id}
                data-event-id={String(ev.id)}
                ref={setCardRef}
                className="relative flex flex-col rounded-2xl overflow-hidden bg-white border shadow-[0_8px_24px_rgba(8,42,72,0.04)] hover:shadow-[0_16px_40px_rgba(8,42,72,0.08)] transition-transform hover:-translate-y-1.5"
                style={{
                  borderColor: "rgba(8,42,72,0.04)",
                  minHeight: 320,
                }}
                aria-labelledby={`event-${ev.id}-title`}
              >
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  {hero ? (
                    <img
                      src={hero}
                      alt={ev.title || ""}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,42,72,0.28)] via-transparent to-transparent" />
                  <div
                    className="absolute left-2.5 top-2.5 px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold"
                    style={{
                      background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                      color: SURFACE,
                    }}
                  >
                    PREVIOUS
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h5
                      id={`event-${ev.id}-title`}
                      className="text-base sm:text-lg font-semibold"
                      style={{ color: DEEP_NAVY }}
                    >
                      {ev.title}
                    </h5>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-black/65 line-clamp-3">
                      {excerpt(ev.description, 120)}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2">
                    <div className="text-[11px] sm:text-xs text-black/60">
                      {ev.date || ""}
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() =>
                          openLightbox(images, 0, ev.title)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold shadow-sm"
                        style={{
                          background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                          color: SURFACE,
                        }}
                      >
                        View
                      </button>

                    
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* No previous results after filter */}
          {filteredPrevious.length === 0 && !loading && !err && (
            <div className="col-span-full py-14 sm:py-20 text-center text-black/60 rounded-2xl border border-black/6 text-sm">
              No galleries match this filter.
            </div>
          )}
        </div>
      )}

      {/* Sticky CTA for mobile */}
      {latest && (
        <div className="lg:hidden fixed left-4 right-4 bottom-5 z-50">
          <div className="mx-auto max-w-3xl">
            <div className="flex gap-2.5 sm:gap-3">
              <button
                onClick={() => {
                  if (latest)
                    openLightbox(
                      Array.isArray(latest.images)
                        ? latest.images
                        : [],
                      0,
                      latest.title
                    );
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold"
                style={{
                  background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                  color: SURFACE,
                  boxShadow: "0 10px 30px rgba(199,155,75,0.18)",
                }}
              >
                Open latest gallery
              </button>

            
            </div>
          </div>
        </div>
      )}

      {/* Lightbox modal */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 px-3 sm:px-4 py-4 sm:py-6"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden bg-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b"
              style={{ background: DEEP_NAVY }}
            >
              <div
                className="text-xs sm:text-sm font-semibold truncate max-w-[60%]"
                style={{ color: SURFACE }}
              >
                {lightbox.title || ""}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs rounded-md"
                  style={{
                    background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})`,
                    color: SURFACE,
                  }}
                >
                  {lightbox.index + 1}/{lightbox.images.length}
                </div>
                <button
                  onClick={closeLightbox}
                  className="p-1.5 sm:p-2 rounded hover:bg-white/5"
                  aria-label="Close"
                  style={{ color: SURFACE }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div
              className="relative bg-black flex-1 flex items-center justify-center"
              style={{ minHeight: "50vh" }}
            >
              <img
                src={lightbox.images[lightbox.index]}
                alt={`lightbox ${lightbox.index + 1}`}
                className="mx-auto max-h-[80vh] sm:max-h-[84vh] object-contain w-auto"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 p-2 sm:p-3 rounded-full shadow text-lg sm:text-xl"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 p-2 sm:p-3 rounded-full shadow text-lg sm:text-xl"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
