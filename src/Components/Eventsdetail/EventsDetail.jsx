// EventsDetail.Modern.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  FiCalendar,
  FiUser,
  FiImage,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useParams } from "react-router-dom";

const ACCENT_START = "#f7d88b";
const ACCENT_END = "#c9943b";
const GRADIENT = `linear-gradient(135deg, ${ACCENT_START}, ${ACCENT_END})`;

const API_BASE = "https://vmfinancialsolutions.com/api";

/* ---------------- helpers ---------------- */

function safeFormatDate(d) {
  try {
    if (!d) return "";
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
  // strip script/style blocks, keep rest as-is
  return String(html || "").replace(
    /<(script|style)[\s\S]*?>[\s\S]*?<\/\1>/gi,
    ""
  );
}

/* -------------------- component -------------------- */

export default function EventsDetailModern({ eventId: propEventId = null }) {
  const { id: routeId, eventId: routeEventId } = useParams() || {};
  const resolvedId =
    propEventId || routeId || routeEventId ? Number(propEventId || routeId || routeEventId) : null;

  const [currentEvent, setCurrentEvent] = useState(null); // mapped model
  const [previousEvents, setPreviousEvents] = useState([]); // mapped list
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxRef = useRef(null);

  const images = Array.isArray(currentEvent?.gallery)
    ? currentEvent.gallery
    : [];
  const hasGallery = images.length > 0;
  const formattedDate = currentEvent ? safeFormatDate(currentEvent.date) : "";

  // Fetch from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErr("");
      try {
        // 1) list events
        const listRes = await fetch(`${API_BASE}/events`);
        if (!listRes.ok) throw new Error("Failed to load events list");

        const listJson = await listRes.json();
        const rawList = Array.isArray(listJson.data) ? listJson.data : [];

        // Prefer active events
        const active = rawList.filter(
          (e) => e.status === 1 || e.status === "1"
        );
        const baseList = active.length ? active : rawList;

        if (!baseList.length) {
          setCurrentEvent(null);
          setPreviousEvents([]);
          setLoading(false);
          return;
        }

        let baseCurrent = null;
        if (resolvedId) {
          baseCurrent = baseList.find((e) => e.id === Number(resolvedId));
        }
        if (!baseCurrent) {
          baseCurrent = baseList[0];
        }

        const basePrevious = baseList.filter((e) => e.id !== baseCurrent.id);

        // 2) detail for current event
        let detailEvent = null;
        let imageObjs = [];

        try {
          const detailRes = await fetch(`${API_BASE}/events/${baseCurrent.id}`);
          if (detailRes.ok) {
            const dJson = await detailRes.json();
            detailEvent = dJson.event || null;

            if (Array.isArray(dJson.images)) {
              imageObjs = dJson.images.map((img) => ({
                id: img.id,
                url: `${API_BASE}/events/image/${img.id}/blob`,
              }));
            }
          }
        } catch (e) {
          console.error("Error loading event detail", baseCurrent.id, e);
        }

        // Hero image:
        // 1) cover_image_id if set & matches an image
        // 2) else first image
        let heroUrl = null;
        if (baseCurrent.cover_image_id && imageObjs.length) {
          const coverMatch = imageObjs.find(
            (im) => im.id === baseCurrent.cover_image_id
          );
          heroUrl = coverMatch ? coverMatch.url : imageObjs[0]?.url || null;
        } else if (imageObjs.length) {
          heroUrl = imageObjs[0].url;
        }

        const dateValue =
          detailEvent?.event_date ||
          baseCurrent.event_date ||
          baseCurrent.created_at;

        const mappedCurrent = {
          id: baseCurrent.id,
          title: baseCurrent.title,
          date: dateValue,
           event_timezone:
    detailEvent?.event_timezone ||
    baseCurrent?.event_timezone ||
    detailEvent?.timezone ||
    baseCurrent?.timezone ||
    "EST",
          host:
            baseCurrent.hosted_by ||
            detailEvent?.hosted_by ||
            "VM Financial Solutions",
          description:
            detailEvent?.description || baseCurrent.description || "",
          meetingLink: baseCurrent.link || detailEvent?.link || "",
          address: baseCurrent.address || detailEvent?.address || "",
          thumbnailUrl: heroUrl,
          gallery: imageObjs.map((im) => im.url),
        };

        const mappedPrev = basePrevious.map((e) => {
          const created = e.event_date || e.created_at;
          const dt = created ? new Date(created) : null;
          const dateStr = dt
            ? dt.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "";

          let thumb = null;
          // if we have cover_image_id and this is current detail's image list we don't know per-event images here,
          // but for sidebar thumbnail we just try to use cover if same as current, else fallback later if you add more.
          if (e.cover_image_id) {
            thumb = `${API_BASE}/events/image/${e.cover_image_id}/blob`;
          }

          return {
            id: e.id,
            title: e.title,
            date: created,
            formattedDate: dateStr,
            thumbnailUrl: thumb,
          };
        });

        setCurrentEvent(mappedCurrent);
        setPreviousEvents(mappedPrev);
      } catch (e) {
        console.error(e);
        setErr("Could not load event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedId]);

  // keyboard nav for lightbox
  useEffect(() => {
    const handler = (e) => {
      if (!lightboxOpen || !hasGallery) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, hasGallery, images.length]);

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
    if (!hasGallery) return;
    setLightboxIndex((p) => (p - 1 + images.length) % images.length);
  }

  function next() {
    if (!hasGallery) return;
    setLightboxIndex((p) => (p + 1) % images.length);
  }

  function joinMeeting() {
    if (!currentEvent?.meetingLink) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return;
    }
    window.open(currentEvent.meetingLink, "_blank", "noopener noreferrer");
  }

  /* ---------- loading / error states ---------- */

  if (loading) {
    return (
      <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-64 md:h-80 rounded-2xl bg-gray-200" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-40 rounded-2xl bg-gray-200" />
              <div className="h-40 rounded-2xl bg-gray-200" />
            </div>
            <div className="space-y-4">
              <div className="h-40 rounded-2xl bg-gray-200" />
              <div className="h-40 rounded-2xl bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (err) {
    return (
      <section className="w-full max-w-3xl mx-auto px-4 md:px-6 py-10">
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-6 text-sm text-red-700">
          {err}
        </div>
      </section>
    );
  }

  if (!currentEvent) {
    return (
      <section className="w-full max-w-3xl mx-auto px-4 md:px-6 py-10">
        <div className="rounded-2xl border px-4 py-6 text-sm text-gray-600">
          No active events found.
        </div>
      </section>
    );
  }

  const model = currentEvent;
  const prevList = previousEvents;

  /* ---------- main render ---------- */

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
            className="rounded-2xl bg-white/95 backdrop-blur p-4 md:p-6 shadow-2xl border"
            style={{ borderColor: "rgba(8,42,72,0.06)" }}
            aria-label={`Event card: ${model.title}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white rounded-full px-2 py-0.5"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                >
                  <FiCalendar />{" "}
                  <span className="leading-none">{formattedDate}</span>
                  {model.event_timezone && (
  <span className="text-white">
    {model.event_timezone}
  </span>
)}

                </div>

                <h1 className="mt-2 text-lg md:text-xl font-extrabold text-gray-900 truncate">
                  {model.title}
                </h1>
                <p className="mt-1 text-sm text-gray-700 flex items-center gap-1.5">
                  <FiUser className="text-gray-500" />
                  <span className="truncate">{model.host}</span>
                </p>
                {model.address && (
                  <p className="mt-2 text-xs text-gray-500">
                    Location: {model.address}
                  </p>
                )}
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
                    className="rounded-full px-3 py-1 text-xs sm:text-sm text-gray-800 font-medium border flex items-center gap-1.5 bg-white/90"
                    style={{ borderColor: "rgba(8,42,72,0.08)" }}
                  >
                    <FiImage className="text-gray-500" />
                    View Gallery
                  </button>
                )}

              
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: safeHTML(model.description),
                  }}
                />
              ) : (
                <p>{model.description}</p>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FiImage className="text-gray-500" /> Gallery
              </h3>
              <div className="text-sm text-gray-500">
                {images.length} photo{images.length !== 1 ? "s" : ""}
              </div>
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
              <div className="rounded-lg border-dashed border p-6 text-center text-gray-500">
                No gallery images uploaded for this event.
              </div>
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

  <div className="flex items-center gap-2 text-gray-500">
    <span>{formattedDate}</span>

    {model.event_timezone && (
      <span className="text-black/70">
        ( {model.event_timezone} )
      </span>
    )}
  </div>
</li>

              <li>
                <div className="font-medium">Host</div>
                <div className="text-gray-500">{model.host}</div>
              </li>
              {model.address && (
                <li>
                  <div className="font-medium">Where</div>
                  <div className="text-gray-500">{model.address}</div>
                </li>
              )}
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
            <h5 className="font-semibold text-gray-900 mb-2">
              Previous events
            </h5>
            {prevList.length === 0 ? (
              <div className="text-xs text-gray-500">
                No previous events found.
              </div>
            ) : (
              <div className="space-y-3 text-sm text-gray-700">
                {prevList.slice(0, 3).map((p, i) => (
                  <div key={p.id || i} className="flex items-start gap-3">
                    <div className="w-14 h-10 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                      {p.thumbnailUrl ? (
                        <img
                          src={p.thumbnailUrl}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm line-clamp-2">
                        {p.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {p.formattedDate || safeFormatDate(p.date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              ref={lightboxRef}
              src={images[lightboxIndex]}
              alt={`Preview ${lightboxIndex + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-md shadow-lg"
            />

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90"
              aria-label="Close"
            >
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
