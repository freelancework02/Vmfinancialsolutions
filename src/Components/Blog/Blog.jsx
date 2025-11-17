// Blog.VariantB.Updated.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Components/Firebase/firebase";
import { useNavigate } from "react-router-dom";

/**
 * Blog.VariantB.Updated.jsx
 *
 * - Theme updated to blue + deep-navy + white (matches site logo & images).
 * - More attractive layout:
 *    • Featured hero for the latest post (large image + overlay).
 *    • Filter chips (optional tags) to narrow posts.
 *    • Uniform card grid with image-focus, consistent card heights, hover lift, subtle tilt.
 *    • Strong blue gradient CTAs and accent bars.
 * - Responsive and accessible.
 *
 * Save as Blog.VariantB.Updated.jsx and import where needed.
 */

const BLUE_START = "#f7d88b";
const BLUE_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const SURFACE = "#ffffff";

export default function BlogVariantBUpdated() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState(["All"]);
  const [activeTag, setActiveTag] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const q = await getDocs(collection(db, "blogs"));
        const items = q.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // Sort by createdAt if available, else by id (descending -> newest first)
        items.sort((a, b) => {
          const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bDate - aDate || String(b.id).localeCompare(String(a.id));
        });
        setBlogs(items);

        // derive tags (simple)
        const t = new Set(["All"]);
        items.forEach((it) => {
          if (it.tag) t.add(String(it.tag));
          if (Array.isArray(it.tags)) it.tags.forEach((x) => t.add(String(x)));
        });
        setTags(Array.from(t));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const featured = blogs.length ? blogs[0] : null;
  const list = blogs.slice(1);

  const filtered = activeTag === "All" ? list : list.filter((b) => {
    if (!b) return false;
    if (b.tag && b.tag === activeTag) return true;
    if (Array.isArray(b.tags) && b.tags.includes(activeTag)) return true;
    return false;
  });

  const excerpt = (text = "", n = 140) => (String(text).length > n ? String(text).slice(0, n).trim() + "…" : text);

  return (
    <section className="mt-20 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: DEEP_NAVY }}>
              Blog & Insights
            </h2>
            <p className="mt-2 text-sm md:text-base text-black/60 max-w-xl">
              Curated posts and practical guides — easy to scan, quick to act on.
            </p>
          </div>

          {/* tags / filters */}
          <div className="flex gap-3 flex-wrap items-center">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`text-sm px-3 py-1.5 rounded-full font-medium transition-shadow focus:outline-none`}
                style={
                  activeTag === t
                    ? { background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})`, color: SURFACE, boxShadow: "0 8px 24px rgba(21,114,255,0.12)" }
                    : { border: "1px solid rgba(8,42,72,0.06)", color: DEEP_NAVY, background: "white" }
                }
                aria-pressed={activeTag === t}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* loading state */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        )}

        {/* featured hero */}
        {!loading && featured && (
          <article className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-[rgba(3,43,85,0.04)]">
            <div className="relative grid grid-cols-1 lg:grid-cols-12">
              {/* Image */}
              <div className="lg:col-span-7 relative h-[420px] md:h-[520px] overflow-hidden">
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute left-6 bottom-6 right-6 md:left-10 md:right-10">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})`, color: SURFACE }}>
                      LATEST
                    </span>
                    <div className="text-xs text-white/90">{featured.date || ""}</div>
                  </div>

                  <h3 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow">
                    {featured.title}
                  </h3>
                  <p className="mt-2 text-white/90 max-w-2xl">{excerpt(featured.summary || featured.content || featured.description, 220)}</p>

                  <div className="mt-4 flex gap-3 flex-wrap">
                    <button
                      onClick={() => navigate(`/blog/${featured.id}`, { state: { blog: featured } })}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold"
                      style={{ background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})`, color: SURFACE }}
                    >
                      Read Article
                    </button>

                    <button
                      onClick={() => window.open(featured.meetingLink || "#", "_blank", "noopener,noreferrer")}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium"
                      style={{ borderColor: "rgba(255,255,255,0.12)", color: "white" }}
                      aria-disabled={!featured.meetingLink}
                    >
                      {featured.meetingLink ? "Join Meeting" : "No meeting link"}
                    </button>
                  </div>
                </div>
              </div>

              {/* metadata + excerpt column */}
              <aside className="lg:col-span-5 p-6 md:p-8 bg-white">
                <div className="flex flex-col h-full">
                  <div>
                    <div className="text-sm font-semibold" style={{ color: DEEP_NAVY }}>
                      {featured.tag || featured.category || "Featured"}
                    </div>
                    <div className="mt-3 text-black/75">{excerpt(featured.summary || featured.content || featured.description, 260)}</div>
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-black/60">{featured.author || "Admin"}</div>
                      <div className="text-sm text-black/60">{featured.readTime || featured.minutes || ""}</div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => navigate(`/blog/${featured.id}`, { state: { blog: featured } })}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold"
                        style={{ background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})`, color: SURFACE }}
                      >
                        Continue reading
                      </button>

                      <button
                        onClick={() => window.open(featured.meetingLink || "#", "_blank", "noopener,noreferrer")}
                        className="px-4 py-3 rounded-lg border text-sm font-medium"
                        style={{ borderColor: "rgba(8,42,72,0.06)", color: DEEP_NAVY }}
                      >
                        Book a call
                      </button>
                    </div>

                    <div className="mt-4 text-xs text-black/60">Published: {featured.date || "—"}</div>
                  </div>
                </div>
              </aside>
            </div>
          </article>
        )}

        {/* grid intro */}
        {!loading && (
          <div className="mb-4">
            <h4 className="text-xl font-semibold" style={{ color: DEEP_NAVY }}>Recent articles</h4>
            <p className="text-sm text-black/60">Browse recent posts — click any card to read the full article.</p>
          </div>
        )}

        {/* cards grid */}
        {!loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {filtered.map((blog) => (
              <article
                key={blog.id}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border shadow-sm hover:shadow-xl transform transition hover:-translate-y-1"
                style={{ borderColor: "rgba(8,42,72,0.04)", minHeight: 360 }}
                aria-labelledby={`blog-${blog.id}-title`}
              >
                {/* image top */}
                <div className="relative h-44 overflow-hidden">
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,43,85,0.20)] via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 px-2 py-1 rounded-md text-xs font-semibold" style={{ background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})`, color: SURFACE }}>
                    {blog.tag || blog.category || "Article"}
                  </div>
                </div>

                {/* content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 id={`blog-${blog.id}-title`} className="text-lg font-semibold mb-2" style={{ color: DEEP_NAVY }}>
                      {blog.title}
                    </h3>
                    <p className="text-sm text-black/70 mb-4 line-clamp-3">{excerpt(blog.summary || blog.content || blog.description, 140)}</p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-black/60">{blog.date || ""}</div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/blog/${blog.id}`, { state: { blog } })}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold"
                        style={{ background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})`, color: SURFACE }}
                      >
                        Read more
                      </button>

                      <a
                        href={blog.meetingLink || "#"}
                        onClick={(e) => { if (!blog.meetingLink) e.preventDefault(); }}
                        className="text-sm text-[rgba(3,43,85,0.8)] underline"
                      >
                        {blog.meetingLink ? "Join" : "No link"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* bottom accent */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})` }} />
              </article>
            ))}

            {/* no posts message */}
            {filtered.length === 0 && !loading && (
              <div className="col-span-full p-8 rounded-2xl border text-center text-black/60">
                No articles found for "{activeTag}".
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
