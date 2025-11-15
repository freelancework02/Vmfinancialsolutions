/* ProfessionalServices - 2 Enhanced Variants

This file contains two visually-upgraded versions of your ProfessionalServices component.
- VariantA: Logo-aligned Gold + Deep Navy theme (primary site look)
- VariantB: Sophisticated Slate + Warm-Gold accent (alternative)

Text, copy, and image URLs remain unchanged. Only UI, layout and theme are updated.

Usage: Import the variant you want, e.g.
  import ProfessionalServices from './ProfessionalServicesVariants.jsx';

*/

import React from 'react';

const ORANGE = '#f37021';
const ORANGE_DARK = '#d95800';
const DEEP_NAVY = '#082a48';
const BLACK = '#0f0f0f';

const services = [
  {
    title: 'Expertise',
    description:
      'Over ten years of experience. Clear insights, strategic roadmaps, and ongoing reviews that keep your goals on track.',
    image:
      'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img1.jpg',
  },
  {
    title: 'Discretion',
    description:
      'Your privacy matters. We handle sensitive information with full confidentiality and secure data processes.',
    image:
      'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img2.jpg',
  },
  {
    title: 'Dependability',
    description:
      'Consistent support, transparent updates, and a results-driven approach to your long-term well-being.',
    image:
      'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img3.jpg',
  },
  {
    title: 'Consulting',
    description:
      'Cut through complexity. Focused strategy sessions that help you clarify goals and close financial gaps.',
    image:
      'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img4.jpg',
  },
  {
    title: 'Sales',
    description:
      'Curated financial solutions that prioritize suitability, cost-efficiency, and long-term value.',
    image:
      'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img5.jpg',
  },
  {
    title: 'Partnership',
    description:
      "If our philosophy aligns, we grow together—built on trust, shared standards, and mutual integrity.",
    image:
      'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img6.jpg',
  },
];

// ---------------- Variant A: Gold + Deep Navy ----------------

// ---------------- Variant B: Slate + Warm-Gold Accent ----------------
export function ProfessionalServicesVariantB() {
  const ACCENT_START = '#f6caa3';
  const ACCENT_END = '#d9a15a';
  const SLATE = '#0b1b24';

  return (
    <section className="py-16 px-4 md:px-6 lg:px-12" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fbfdfa 45%, #ffffff 100%)' }} aria-labelledby="services-heading-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="px-5 py-2 rounded-full text-sm font-medium bg-white shadow flex items-center gap-3 border" style={{ borderColor: 'rgba(11,27,36,0.06)' }}>
            <span className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: `linear-gradient(90deg, ${ACCENT_START}, ${ACCENT_END})` }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l4 4L19 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className="tracking-wide text-[13px] text-[#0b2a32]">WHAT CAN YOU EXPECT FROM US</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 id="services-heading-2" className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: SLATE }}>
            Our Skills & Offers
          </h2>
          <p className="mt-3 text-[#254b4f] max-w-3xl mx-auto">Expertise you can trust — delivered with clarity, transparency, and long-term vision.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <article key={i} className="group bg-white rounded-3xl overflow-hidden border" style={{ borderColor: 'rgba(11,27,36,0.04)', boxShadow: '0 10px 30px rgba(11,27,36,0.04)' }}>
              <div className="relative h-56 md:h-64 w-full overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow" style={{ background: `linear-gradient(90deg, ${ACCENT_START}, ${ACCENT_END})` }}>
                  Featured
                </span>
                <span aria-hidden className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full opacity-50 pointer-events-none" style={{ background: `radial-gradient(60% 60% at 50% 50%, ${ACCENT_START} 0%, rgba(217,161,110,0.12) 40%, transparent 60%)`, filter: 'blur(16px)' }} />
              </div>

              <div className="p-6 md:p-7">
                <h3 className="text-xl md:text-[1.125rem] font-semibold" style={{ color: SLATE }}>{s.title}</h3>
                <p className="text-sm md:text-base text-[#234a4a] leading-relaxed">{s.description}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium px-3 py-1 rounded-full border bg-[#fbf6ef] text-[#455b57]">Clarity</span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full border bg-[#fbf6ef] text-[#455b57]">Consistency</span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full border bg-[#fbf6ef] text-[#455b57]">Accountability</span>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <a href="#" onClick={(e) => { e.preventDefault(); if (typeof window !== 'undefined' && window.Calendly?.initPopupWidget) { window.Calendly.initPopupWidget({ url: 'https://calendly.com/futurewesecure-info/30min' }); } else { window.open('https://calendly.com/futurewesecure-info/30min', '_blank', 'noopener,noreferrer'); } }}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-shadow shadow-sm" style={{ background: `linear-gradient(90deg, ${ACCENT_START}, ${ACCENT_END})`, color: '#08282a', boxShadow: '0 8px 26px rgba(217,88,0,0.08)' }} aria-label={`Get started with ${s.title}`}>
                    Get Started
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h12M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>

                  <a href="#" onClick={(e) => { e.preventDefault(); if (typeof window !== 'undefined' && window.Calendly?.initPopupWidget) { window.Calendly.initPopupWidget({ url: 'https://calendly.com/futurewesecure-info/30min' }); } else { window.open('https://calendly.com/futurewesecure-info/30min', '_blank', 'noopener,noreferrer'); } }} className="text-sm text-[#235353] hover:text-[#0b2a32] transition" aria-label={`Learn more about ${s.title}`}>
                    Learn more →
                  </a>
                </div>

                <div className="mt-5 h-[3px] w-0 group-hover:w-full transition-[width] duration-400 rounded-full" style={{ background: `linear-gradient(90deg, ${ACCENT_START}, ${ACCENT_END})` }} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white border" style={{ borderColor: 'rgba(11,27,36,0.04)', boxShadow: '0 8px 30px rgba(11,27,36,0.04)' }}>
          <div>
            <h3 className="text-lg md:text-xl font-bold" style={{ color: SLATE }}>Want a quick, no-pressure review?</h3>
            <p className="text-sm text-[#234a4a] mt-1">Schedule a brief call — we’ll listen, assess, and suggest next steps.</p>
          </div>

          <div className="flex gap-3">
            <a href="#" onClick={(e) => { e.preventDefault(); if (typeof window !== 'undefined' && window.Calendly?.initPopupWidget) { window.Calendly.initPopupWidget({ url: 'https://calendly.com/futurewesecure-info/30min' }); } else { window.open('https://calendly.com/futurewesecure-info/30min', '_blank', 'noopener,noreferrer'); } }} className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold" style={{ background: `linear-gradient(90deg, ${ACCENT_START}, ${ACCENT_END})`, color: '#08282a', boxShadow: '0 12px 36px rgba(217,88,0,0.08)' }}>
              Book a Review
            </a>

            <a href="#" onClick={(e) => { e.preventDefault(); if (typeof window !== 'undefined' && window.Calendly?.initPopupWidget) { window.Calendly.initPopupWidget({ url: 'https://calendly.com/futurewesecure-info/30min' }); } else { window.open('https://calendly.com/futurewesecure-info/30min', '_blank', 'noopener,noreferrer'); } }} className="inline-flex items-center gap-2 rounded-full px-5 py-3 border text-sm font-semibold bg-white" style={{ borderColor: 'rgba(11,27,36,0.06)', color: SLATE }}>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// default export: Variant A
export default ProfessionalServicesVariantB;









/*
ProfessionalServices - Gold & Light Variants

Two polished, responsive component variants that use your logo's gold gradient and deep-navy brand color.
- Variant 1 (GoldHero): dark/deep-navy accent with gold highlights and the hero image.
- Variant 2 (LightCard): white/light background with subtle gold accents and cleaner cards.

Both keep your original copy and image URLs intact. Replace the import paths for Logo/Hero if needed in your project.

Usage: save as ProfessionalServicesVariants.jsx and import the variant you want:
  import { ProfessionalServicesGold, ProfessionalServicesLight } from './ProfessionalServicesVariants.jsx'

*/

// import React from 'react';
// import Logo from '../../assets/Logo/logo.png'; // adjust path if needed
// import HeroImg from '../../assets/Herosectionimg.png'; // adjust path if needed

// const GOLD_START = '#f7d88b';
// const GOLD_END = '#c9943b';
// const DEEP_NAVY = '#082a48';
// const NEUTRAL_TEXT = '#22313f';

// const services = [
//   {
//     title: 'Expertise',
//     description:
//       'Over ten years of experience. Clear insights, strategic roadmaps, and ongoing reviews that keep your goals on track.',
//     image:
//       'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img1.jpg',
//   },
//   {
//     title: 'Discretion',
//     description:
//       'Your privacy matters. We handle sensitive information with full confidentiality and secure data processes.',
//     image:
//       'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img2.jpg',
//   },
//   {
//     title: 'Dependability',
//     description:
//       'Consistent support, transparent updates, and a results-driven approach to your long-term well-being.',
//     image:
//       'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img3.jpg',
//   },
//   {
//     title: 'Consulting',
//     description:
//       'Cut through complexity. Focused strategy sessions that help you clarify goals and close financial gaps.',
//     image:
//       'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img4.jpg',
//   },
//   {
//     title: 'Sales',
//     description:
//       'Curated financial solutions that prioritize suitability, cost-efficiency, and long-term value.',
//     image:
//       'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img5.jpg',
//   },
//   {
//     title: 'Partnership',
//     description:
//       "If our philosophy aligns, we grow together—built on trust, shared standards, and mutual integrity.",
//     image:
//       'https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img6.jpg',
//   },
// ];


// // ---------------- Variant 2: LightCard ----------------
// export function ProfessionalServicesLight() {
//   return (
//     <section className="py-16 px-4 md:px-6 lg:px-12 bg-gradient-to-b from-white to-[#fffaf7]" aria-labelledby="services-light">
//       <div className="max-w-7xl mx-auto">
       

//         <div className="text-center mb-8">
//           <h2 id="services-light" className="text-3xl md:text-4xl font-extrabold" style={{ color: DEEP_NAVY }}>Our Skills & Offers</h2>
//           <p className="mt-3 text-[#274f73] max-w-3xl mx-auto">Expertise you can trust — delivered with clarity, transparency, and long-term vision.</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left column: large overview card */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-3xl p-6 shadow-md border" style={{ borderColor: 'rgba(3,43,85,0.04)' }}>
//               <img src={services[0].image} alt="overview" className="w-full h-48 object-cover rounded-xl mb-4" />
//               <h3 className="text-xl font-semibold" style={{ color: NEUTRAL_TEXT }}>{services[0].title}</h3>
//               <p className="mt-2 text-sm text-[#425a6e]">{services[0].description}</p>

//               <div className="mt-4 flex gap-2">
//                 <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` }}>Get Started</a>
//                 <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold" style={{ borderColor: 'rgba(3,43,85,0.06)', color: DEEP_NAVY }}>Contact</a>
//               </div>
//             </div>
//           </div>

//           {/* Right column: grid of cards */}
//           <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {services.slice(1).map((s, i) => (
//               <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border hover:shadow-md transition-transform hover:-translate-y-1" style={{ borderColor: 'rgba(3,43,85,0.04)' }}>
//                 <div className="flex items-start gap-4">
//                   <div className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden">
//                     <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
//                   </div>

//                   <div>
//                     <h4 className="font-semibold" style={{ color: DEEP_NAVY }}>{s.title}</h4>
//                     <p className="mt-1 text-sm text-[#32536f]">{s.description}</p>

//                     <div className="mt-3 flex items-center gap-3">
//                       <a href="#" className="text-sm font-semibold inline-flex items-center" style={{ color: GOLD_START }}>Get Started →</a>
//                       <a href="#" className="text-sm text-[#4b6b80]">Learn</a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-12 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white border" style={{ borderColor: 'rgba(3,43,85,0.04)' }}>
//           <div>
//             <h3 className="text-lg md:text-xl font-bold" style={{ color: NEUTRAL_TEXT }}>Want a quick, no-pressure review?</h3>
//             <p className="text-sm text-[#274f73] mt-1">Schedule a brief call — we’ll listen, assess, and suggest next steps.</p>
//           </div>

//           <div className="flex gap-3">
//             <a href="#" className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white" style={{ background: `linear-gradient(90deg, ${GOLD_START}, ${GOLD_END})` }}>Book a Review</a>
//             <a href="#" className="inline-flex items-center gap-2 rounded-full px-5 py-3 border text-sm font-semibold bg-white" style={{ borderColor: 'rgba(3,43,85,0.06)', color: DEEP_NAVY }}>Contact Us</a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProfessionalServicesLight;
