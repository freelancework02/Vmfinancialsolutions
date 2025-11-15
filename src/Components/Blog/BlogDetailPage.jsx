// BlogDetail.VariantA.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Contactus/Contactus";

/**
 * Blog Detail — Variant A
 * - Immersive hero with floating info card
 * - Small spacer under Navbar to avoid overlap on mobile
 * - Orange/black/white accents (orange used for CTA)
 */

export default function BlogDetailVariantA() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="h-20 md:h-24 lg:h-28" /> {/* spacer for navbar */}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <h2 className="text-2xl font-semibold mb-4">Blog not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#f37021] to-[#d95800] text-white"
          >
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // keep original formatting logic
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
      <div className="h-20 md:h-24 lg:h-28" /> {/* spacer for navbar */}

      {/* Large hero */}
      <header className="relative w-full overflow-hidden">
        <div className="h-[48vw] max-h-[560px] w-full relative">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover brightness-75"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Floating info card */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 -mt-20 md:-mt-24 relative">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-black/6 flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "rgba(0,0,0,0.45)" }}>
                  {new Date(blog.publishedAt || Date.now()).toLocaleDateString()}
                </span>
                <div className="text-xs text-slate-600">  {blog.author || "Team"}</div>
              </div>

              <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-black truncate">
                {blog.title}
              </h1>

              <p className="mt-3 text-sm md:text-base text-black/70">
                {blog.summary || "An in-depth article curated by our experts to help you understand financial insights and smart strategies."}
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col gap-3 w-full md:w-auto">
              <button
                onClick={() => navigate("/blog")}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#f37021,#d95800)" }}
              >
                Back to Blogs
              </button>

              {/* <a
                href="#contact"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-slate-600 text-right"
              >
                Share · Save
              </a> */}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <article className="prose prose-lg max-w-none text-slate-800">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left column image */}
            <div className="md:w-2/5 lg:w-1/3 rounded-2xl overflow-hidden shadow-[0_6px_30px_rgba(0,0,0,0.08)]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.03]"
                loading="lazy"
              />
            </div>

            {/* Right column text */}
            <div className="md:w-3/5 lg:w-2/3 space-y-5 text-gray-700 text-justify">
              {formattedContent.split("\n").map((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                const isList = trimmed.match(/^[-*•]\s/) || trimmed.match(/^\d+\.\s/);
                return (
                  <p
                    key={idx}
                    className={isList ? "pl-5 relative before:absolute before:left-0" : ""}
                    style={{
                      marginTop: isList ? "0.6rem" : "1rem",
                      lineHeight: "1.7",
                    }}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>

          {/* CTA block */}
          <div className="mt-12 rounded-2xl p-8 bg-gradient-to-r from-white via-[#fff8f1] to-white border border-black/6 shadow-sm text-center">
            <h3 className="text-2xl font-bold text-black mb-3">Ready to explore more insights?</h3>
            <p className="text-slate-600 mb-6">Discover expert-driven perspectives and financial wisdom in our growing blog collection.</p>
            <button
              onClick={() => navigate("/blog")}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#f37021,#d95800)" }}
            >
              Browse All Blogs
            </button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
