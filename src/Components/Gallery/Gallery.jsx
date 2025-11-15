// EventsGallery.VariantB.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

/* --------------------- Firebase (unchanged) --------------------- */
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
 * EventsGallery Variant B — Magazine layout
 * - Prominent hero image per event
 * - Right-side captioned image strip (preview)
 * - Fade-in on scroll using IntersectionObserver
 * - Lightbox with keyboard navigation
 * - Keeps orange / black / white brand accents
 */
export default function EventsGalleryVariantB() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [lightbox, setLightbox] = useState({
    open: false,
    images: [],
    index: 0,
    title: "",
  });

  // for fade-in animation: set of event ids that are visible
  const [visibleIds, setVisibleIds] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const qs = await getDocs(collection(db, "properedgefinance"));
        const events = qs.docs.map((doc) => ({
          id: Number.isNaN(parseInt(doc.id, 10)) ? doc.id : parseInt(doc.id, 10),
          ...doc.data(),
        }));
        events.sort((a, b) => {
          const an = typeof a.id === "number";
          const bn = typeof b.id === "number";
          if (an && bn) return a.id - b.id;
          return String(a.id).localeCompare(String(b.id));
        });
        setEventsData(events);
      } catch (e) {
        console.error(e);
        setErr("Couldn't load the gallery. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // IntersectionObserver to add class when card enters viewport
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
              const next = new Set(s);
              next.add(id);
              return next;
            });
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    return () => {
      observerRef.current?.disconnect?.();
    };
  }, []);

  // attach observer via callback ref
  const setCardRef = useCallback((el) => {
    if (!el) return;
    const id = el.getAttribute("data-event-id");
    if (!id) return;
    observerRef.current && observerRef.current.observe(el);
  }, []);

  const openLightbox = useCallback((images, index = 0, title = "") => {
    if (!Array.isArray(images) || images.length === 0) return;
    setLightbox({ open: true, images, index, title });
    // lock scroll
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

  // keyboard navigation for lightbox
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

  const orange = "#f37021";
  const orangeDark = "#d95800";
  const black = "#0f0f0f";

  /* Helper to safely pick a thumbnail for hero */
  function heroImageForEvent(e) {
    if (Array.isArray(e.images) && e.images.length) return e.images[0];
    if (e.thumbnail) return e.thumbnail;
    if (e.image) return e.image;
    return ""; // fallback blank
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: black }}>
            Gallery — Magazine View
          </h2>
          <p className="mt-2 text-black/60 max-w-xl">
            Carefully composed event pages with a large hero image and a right-hand preview strip — fast to scan, pleasant to read.
          </p>
        </div>

        <div>
          {/* <span
            className="inline-flex items-center px-3 py-2 rounded-full font-medium"
            style={{
              background: `linear-gradient(135deg, ${orange}, ${orangeDark})`,
              color: "white",
              boxShadow: "0 8px 22px rgba(217,88,0,0.12)",
            }}
          >
            Orange · Black · White
          </span> */}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl p-6 bg-white/40 animate-pulse h-64" />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && err && (
        <div className="text-center text-black/70 py-16">{err}</div>
      )}

      {/* Events list */}
      <div className="space-y-12">
        {!loading &&
          !err &&
          eventsData.map((ev) => {
            const images = Array.isArray(ev.images) ? ev.images : [];
            const hero = heroImageForEvent(ev);
            // animation classes based on visibility
            const visible = visibleIds.has(String(ev.id));
            return (
              <article
                key={ev.id}
                data-event-id={String(ev.id)}
                ref={setCardRef}
                className={`grid gap-6 grid-cols-1 lg:grid-cols-3 items-start rounded-3xl overflow-hidden transition-all transform ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transition: "opacity .55s ease, transform .55s cubic-bezier(.2,.9,.2,1)",
                }}
              >
                {/* Left: large hero */}
                <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                  <button
                    onClick={() => openLightbox(images, 0, ev.title || `Event ${ev.id}`)}
                    className="group block w-full text-left"
                    aria-label={`Open gallery for ${ev.title || `Event ${ev.id}`}`}
                  >
                    <div className="relative h-72 md:h-96 w-full bg-gray-100 overflow-hidden">
                      {hero ? (
                        <img
                          src={hero}
                          alt={ev.title || ""}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      <div className="absolute left-6 bottom-6 right-6 md:left-8 md:right-8">
                        <h3 className="text-white text-lg md:text-2xl font-bold leading-tight drop-shadow">
                          {ev.title || `Event ${ev.id}`}
                        </h3>
                        <p className="mt-2 hidden md:block text-white/90 max-w-2xl text-sm drop-shadow">
                          {ev.subtitle || (ev.description ? String(ev.description).slice(0, 140) + "…" : "")}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Right: captioned previews */}
                <aside className="space-y-4">
                  <div className="px-4 py-3 flex items-start justify-between rounded-xl bg-white border border-black/6 shadow-sm">
                    <div className="flex-1 pr-3">
                      <h4 className="text-sm font-semibold" style={{ color: black }}>
                        {ev.title}
                      </h4>
                      <p className="text-xs text-black/60 mt-1 line-clamp-3">
                        {ev.subtitle || (ev.description ? String(ev.description).slice(0, 110) + "…" : "No description")}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold"
                        style={{
                          background: `linear-gradient(135deg, ${orange}, ${orangeDark})`,
                          color: "white",
                        }}
                      >
                        Gallery
                      </span>
                    </div>
                  </div>

                  {/* small preview strip */}
                  <div className="grid grid-cols-2 gap-3">
                    {images.slice(0, 4).map((src, i) => (
                      <button
                        key={i}
                        onClick={() => openLightbox(images, i, ev.title)}
                        className="relative block rounded-xl overflow-hidden border border-black/6"
                        aria-label={`Open image ${i + 1}`}
                      >
                        <div className="aspect-[3/2] overflow-hidden">
                          <img src={src} alt={`preview ${i + 1}`} className="w-full h-full object-cover transition-transform duration-400 hover:scale-105" loading="lazy" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 opacity-0 hover:opacity-100 transition" />
                      </button>
                    ))}

                    {/* if fewer images show placeholders */}
                    {images.length === 0 && (
                      <div className="col-span-2 rounded-xl border border-black/6 bg-gray-50 p-4 text-sm text-black/60">
                        No gallery available
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openLightbox(images, 0, ev.title)}
                      className="px-3 py-2 rounded-md text-sm font-semibold"
                      style={{
                        background: `linear-gradient(135deg, ${orange}, ${orangeDark})`,
                        color: "white",
                      }}
                    >
                      View gallery
                    </button>

                    <a
                      href={ev.meetingLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-black/70 underline"
                      onClick={(e) => {
                        if (!ev.meetingLink) e.preventDefault();
                      }}
                    >
                      {ev.meetingLink ? "Join meeting" : "No meeting link"}
                    </a>
                  </div>
                </aside>
              </article>
            );
          })}
      </div>

      {/* Lightbox modal */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-60 grid place-items-center bg-black/80 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="text-sm font-semibold text-black">{lightbox.title}</div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 text-xs rounded-md" style={{ background: `linear-gradient(135deg, ${orange}, ${orangeDark})`, color: "white" }}>
                  {lightbox.index + 1}/{lightbox.images.length}
                </div>
                <button onClick={closeLightbox} className="p-2 rounded hover:bg-gray-100">
                  ✕
                </button>
              </div>
            </div>

            <div className="relative bg-black">
              <img src={lightbox.images[lightbox.index]} alt={`lightbox ${lightbox.index + 1}`} className="mx-auto max-h-[78vh] object-contain w-auto" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                aria-label="Previous"
              >
                ‹
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
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
