// BlogDetail.VariantA.Updated.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Contactus/Contactus";

/**
 * Blog Detail — Variant A (Updated colors & layout)
 *
 * - Theme: blue gradient accents + deep navy text to match site logo palette.
 * - Larger immersive hero with blue overlay, clearer floating info card,
 *   improved typography and CTA treatments.
 * - Keeps existing routing/props expectations (location.state.blog).
 *
 * Color tokens:
 *   BLUE_START = #1572ff
 *   BLUE_END   = #0ea5e9
 *   DEEP_NAVY  = #082a48
 */

const BLUE_START = "#f7d88b";
const BLUE_END = "#c9943b";
const DEEP_NAVY = "#082a48";
const SURFACE = "#ffffff";

export default function BlogDetailVariantA() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="h-20 md:h-24 lg:h-28" />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: DEEP_NAVY }}>
            Blog not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 rounded-full font-semibold"
            style={{
              background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})`,
              color: SURFACE,
              boxShadow: "0 8px 28px rgba(21,114,255,0.14)",
            }}
          >
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedContent = blog.content
    ? blog.content
        .split("\n")
        .map((line, index, arr) => {
          const isBullet = line.trim().match(/^[-*•]\s/);
          const isNumbered = line.trim().match(/^\d+\.\s/);
          if ((isBullet || isNumbered) && index > 0 && arr[index - 1].trim() !== "")
            return `\n${line}`;
          return line;
        })
        .join("\n")
    : "";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {/* spacer to avoid navbar overlap */}
      <div className="h-20 md:h-24 lg:h-28" />

      {/* HERO */}
      <header className="relative w-full overflow-hidden">
        <div
          className="w-full"
          style={{
            height: "min(58vw, 640px)",
            maxHeight: "760px",
            position: "relative",
          }}
        >
          {/* hero image (keeps original) */}
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(.65)" }}
            loading="lazy"
          />

          {/* blue vignette overlay */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(2,20,45,0.25) 0%, rgba(2,20,45,0.12) 30%, rgba(0,0,0,0.0) 70%), radial-gradient(800px 300px at 10% 10%, rgba(21,114,255,0.10), transparent 30%)",
            }}
          />
        </div>

        {/* Floating info card */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 -mt-20 md:-mt-24 relative z-20">
          <div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border flex flex-col md:flex-row items-start gap-6"
            style={{
              borderColor: "rgba(2,20,45,0.06)",
            }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})`,
                    color: SURFACE,
                    boxShadow: "0 8px 20px rgba(21,114,255,0.12)",
                  }}
                >
                  {new Date(blog.publishedAt || Date.now()).toLocaleDateString()}
                </span>

                <div className="text-xs text-[rgba(8,42,72,0.7)]">
                  {blog.author || "Team"}
                </div>
              </div>

              <h1
                className="text-lg md:text-2xl lg:text-3xl font-extrabold text-ellipsis"
                style={{ color: DEEP_NAVY }}
                title={blog.title}
              >
                {blog.title}
              </h1>

              <p className="mt-3 text-sm md:text-base text-[rgba(2,20,45,0.75)] max-w-3xl">
                {blog.summary ||
                  "An in-depth article curated by our experts to help you understand financial insights and smart strategies."}
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto flex flex-col gap-3 items-stretch">
              <button
                onClick={() => navigate("/blog")}
                className="rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})`,
                  color: SURFACE,
                  boxShadow: "0 10px 30px rgba(21,114,255,0.12)",
                }}
              >
                Back to Blogs
              </button>

              <button
                onClick={() =>
                  window.open(blog.meetingLink || "#", "_blank", "noopener,noreferrer")
                }
                className="rounded-full px-4 py-2 text-sm font-medium border"
                style={{
                  borderColor: "rgba(2,20,45,0.06)",
                  color: DEEP_NAVY,
                  background: "white",
                }}
                aria-disabled={!blog.meetingLink}
              >
                {blog.meetingLink ? "Join Meeting" : "No meeting link"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <article className="prose prose-lg max-w-none text-[rgba(2,20,45,0.85)]">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left column image (keeps image but smaller) */}
            <div className="lg:w-1/3 w-full rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(2,20,45,0.06)]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
                style={{ minHeight: 220 }}
                loading="lazy"
              />
            </div>

            {/* Right column text */}
            <div className="lg:w-2/3 w-full space-y-5">
              {formattedContent.split("\n").map((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                const isList = trimmed.match(/^[-*•]\s/) || trimmed.match(/^\d+\.\s/);
                if (isList) {
                  // render as <li> for bullets / numbered -- simple detection
                  return (
                    <p
                      key={idx}
                      className="pl-5"
                      style={{ marginTop: 0, lineHeight: "1.8" }}
                      dangerouslySetInnerHTML={{ __html: trimmed.replace(/^[-*•]\s/, "• ") }}
                    />
                  );
                }
                return (
                  <p key={idx} style={{ lineHeight: "1.8", marginTop: "0.6rem" }}>
                    {line}
                  </p>
                );
              })}

              {/* Inline CTA strip */}
              <div className="mt-6 rounded-lg p-6 bg-gradient-to-r from-white to-white border" style={{ borderColor: "rgba(2,20,45,0.06)" }}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: DEEP_NAVY }}>
                      Want a tailored walkthrough?
                    </h3>
                    <p className="text-sm text-[rgba(2,20,45,0.7)]">
                      Book a short call and we'll walk through specific steps for your situation.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        window.open(blog.meetingLink || "https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer")
                      }
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold"
                      style={{
                        background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})`,
                        color: SURFACE,
                        boxShadow: "0 12px 36px rgba(21,114,255,0.12)",
                      }}
                    >
                      Book a Call
                    </button>

                    <button
                      onClick={() => navigate("/contact")}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-full border font-medium"
                      style={{
                        borderColor: "rgba(2,20,45,0.06)",
                        color: DEEP_NAVY,
                        background: "white",
                      }}
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* small secondary CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate("/blog")}
              className="rounded-full px-6 py-3 font-semibold"
              style={{
                background: `linear-gradient(90deg, ${BLUE_START}, ${BLUE_END})`,
                color: SURFACE,
                boxShadow: "0 10px 30px rgba(21,114,255,0.10)",
              }}
            >
              Browse all Blogs
            </button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
