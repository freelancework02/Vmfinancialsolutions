/*
Home - 2 Theme Variants.jsx

This file contains the original Home content (text unchanged) presented in two visual variants:
- HomeVariantA: Gold + Deep Navy theme (matches the Navbar/logo gold gradient)
- HomeVariantB: Teal + Deep Slate theme (a modern cool alternative that still pairs with the logo)

Usage:
- Save as `HomeVariants.jsx` and import the variant you want, e.g. `import HomeVariantA from './HomeVariants.jsx'`
- Make sure `lucide-react` icons and your `Logo` asset are available in the project.
- No text was modified — only styling, layout and colors.

*/

import React from 'react';
import {
  Presentation,
  FileText,
  ShieldCheck,
  Briefcase,
  Calculator,
  CheckCircle,
  TrendingUp,
  Users,
} from 'lucide-react';
import Logo from '../../assets/Logo/logo.png';

// ---------------- Theme tokens ----------------
// Variant A: Gold + Deep Navy (logo-matching)
const A = {
  accentStart: '#f7d88b', // light gold
  accentEnd: '#c9943b',   // deep gold
  deep: '#082a48',        // deep navy
  text: '#0f3144',
  surface: '#ffffff',
  subtle: 'rgba(8,42,72,0.06)'
};

// Variant B: Teal + Deep Slate (modern alternative)
const B = {
  accentStart: '#34d1c0', // teal light
  accentEnd: '#0ea5a3',   // teal deep
  deep: '#072029',        // deep slate
  text: '#072029',
  surface: '#ffffff',
  subtle: 'rgba(7,32,41,0.06)'
};

// ---------- Shared Data (text unchanged) ----------
const cards = [
  {
    title: 'We Help You Plan For Future Needs',
    description:
      'Enjoy today while preparing for tomorrow. Gain clarity on your finances and build a roadmap toward a secure future.',
    Icon: Presentation,
  },
  {
    title: 'Educate People On Securing Their Future',
    description:
      'We break down financial concepts into simple, actionable insights so you can make informed wealth decisions.',
    Icon: FileText,
  },
  {
    title: 'Protect Your Assets & Loved Ones',
    description:
      'Minimize taxes, reduce risks, and create protections that secure your assets for the next generation.',
    Icon: ShieldCheck,
  },
  {
    title: 'Build & Diversify Your Income',
    description:
      'Explore structured and strategic income streams tailored to your goals and lifestyle aspirations.',
    Icon: Briefcase,
  },
];

// ---------- Variant A (Gold + Deep Navy) ----------
export function HomeVariantA() {
  const t = A;

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{ background: `linear-gradient(180deg, ${t.surface} 0%, #fff9f3 40%, ${t.surface} 100%)` }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-5 py-2 mb-5 rounded-full text-sm font-medium border" style={{ background: 'white', borderColor: t.subtle }}>
            <CheckCircle className="w-4 h-4 mr-2" style={{ color: t.accentStart }} />
            What We Do
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4" style={{ color: t.text }}>
            Empowering You With{' '}
            <span style={{ background: `linear-gradient(90deg, ${t.accentStart}, ${t.accentEnd})`, WebkitBackgroundClip: 'text', color: 'transparent' }}>Clarity, Confidence,</span>
            <br className="hidden sm:block" />
            and a Strong Financial Path Forward.
          </h1>

          <p className="max-w-3xl mx-auto text-black/60 text-base md:text-lg">
            We simplify your path to financial security through strategic planning,
            smart protection, and guided wealth-building.
          </p>
        </div>

        {/* Cards - denser, glass-like cards with soft gradient accents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <article key={i} className="relative flex flex-col rounded-2xl p-8 bg-white/95 border" style={{ borderColor: t.subtle, boxShadow: '0 12px 30px rgba(8,42,72,0.06)' }}>
              <div className="w-16 h-16 mb-5 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: `linear-gradient(135deg, ${t.accentStart}, ${t.accentEnd})` }}>
                <card.Icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-semibold mb-3 leading-snug" style={{ color: t.text }}>{card.title}</h3>
              <p className="text-black/60 leading-relaxed text-sm sm:text-base">{card.description}</p>

              <div className="absolute -bottom-1 left-6 right-6 h-0.5 rounded-full opacity-0 transition-all group-hover:opacity-100" style={{ background: `linear-gradient(90deg, ${t.accentStart}, ${t.accentEnd})` }} />
            </article>
          ))}
        </div>

        {/* Feature Strip - wide, icon left, CTA right */}
        <section className="mt-20 md:mt-28 rounded-2xl px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={{ background: `radial-gradient(600px 300px at 10% -10%, ${t.accentStart}14, transparent), ${t.surface}`, border: `1px solid ${t.subtle}`, boxShadow: '0 8px 30px rgba(8,42,72,0.06)' }}>
          <div className="flex items-start md:items-center gap-4">
            <div className="p-3 rounded-2xl shadow" style={{ background: `linear-gradient(135deg, ${t.accentStart}, ${t.accentEnd})` }}>
              <TrendingUp className="w-8 h-8 text-white" />
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: t.text }}>
                Let’s Analyze Your Financial Game Plan
              </h2>
              <p className="text-black/60 text-sm md:text-base leading-relaxed">
                Get a personalized evaluation of your financial strategy — and unlock
                insights that bring long-term clarity.
              </p>
            </div>
          </div>

          <a href="#book" onClick={(e) => { e.preventDefault(); window.Calendly?.initPopupWidget?.({ url: 'https://calendly.com/futurewesecure-info/30min' }); }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-transform text-white"
            style={{ background: `linear-gradient(135deg, ${t.accentStart}, ${t.accentEnd})` }}>
            <Calculator className="w-5 h-5 mr-2" />
            Book a Consultation
          </a>
        </section>

        {/* Mini Feature Row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            {
              title: 'Trusted Advisors',
              desc: 'Decades of experience guiding individuals and families with honesty and precision.',
              icon: <Users className="w-8 h-8 mx-auto mb-3" style={{ color: t.accentStart }} />,
            },
            {
              title: 'Tailored Solutions',
              desc: 'Every plan is built uniquely around your long-term personal goals.',
              icon: <CheckCircle className="w-8 h-8 mx-auto mb-3" style={{ color: t.accentEnd }} />,
            },
            {
              title: 'Data-Driven Approach',
              desc: 'We look at real numbers, real projections, and real-life variables.',
              icon: <Presentation className="w-8 h-8 mx-auto mb-3" style={{ color: t.text }} />,
            },
            {
              title: 'Transparent Guidance',
              desc: 'No hidden agendas—just clear, actionable, and trustworthy advice.',
              icon: <FileText className="w-8 h-8 mx-auto mb-3" style={{ color: t.accentStart }} />,
            },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all" style={{ borderColor: t.subtle }}>
              {item.icon}
              <h3 className="font-bold mb-2" style={{ color: t.text }}>{item.title}</h3>
              <p className="text-black/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// ---------- Variant B (Teal + Deep Slate) ----------
// export function HomeVariantB() {
//   const t = B;

//   return (
//     <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{ background: `linear-gradient(180deg, ${t.surface} 0%, #f6fdfa 40%, ${t.surface} 100%)` }}>
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center justify-center px-5 py-2 mb-5 rounded-full text-sm font-medium border" style={{ background: 'white', borderColor: t.subtle }}>
//             <CheckCircle className="w-4 h-4 mr-2" style={{ color: t.accentStart }} />
//             What We Do
//           </div>

//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4" style={{ color: t.text }}>
//             Empowering You With{' '}
//             <span style={{ background: `linear-gradient(90deg, ${t.accentStart}, ${t.accentEnd})`, WebkitBackgroundClip: 'text', color: 'transparent' }}>Clarity, Confidence,</span>
//             <br className="hidden sm:block" />
//             and a Strong Financial Path Forward.
//           </h1>

//           <p className="max-w-3xl mx-auto text-black/60 text-base md:text-lg">
//             We simplify your path to financial security through strategic planning,
//             smart protection, and guided wealth-building.
//           </p>
//         </div>

//         {/* Cards - softer rounded cards, two-column stacked with accent rings */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {cards.map((card, i) => (
//             <article key={i} className="relative flex flex-col rounded-3xl p-8 bg-white border" style={{ borderColor: t.subtle, boxShadow: '0 10px 40px rgba(7,32,41,0.04)' }}>
//               <div className="w-16 h-16 mb-5 rounded-full flex items-center justify-center ring-2" style={{ ringColor: t.accentStart, boxShadow: `inset 0 -8px 22px rgba(14,165,163,0.06)`, background: `linear-gradient(180deg, ${t.accentStart}15, transparent)` }}>
//                 <card.Icon className="w-8 h-8" style={{ color: t.accentEnd }} />
//               </div>

//               <h3 className="text-xl font-semibold mb-3 leading-snug" style={{ color: t.text }}>{card.title}</h3>
//               <p className="text-black/60 leading-relaxed text-sm sm:text-base">{card.description}</p>

//               <div className="absolute bottom-6 right-6 text-xs text-gray-400">Learn more →</div>
//             </article>
//           ))}
//         </div>

//         {/* Feature Strip - compact, teal accent */}
//         <section className="mt-20 md:mt-28 rounded-3xl px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={{ background: `radial-gradient(600px 300px at 90% -20%, ${t.accentStart}14, transparent), ${t.surface}`, border: `1px solid ${t.subtle}`, boxShadow: '0 8px 30px rgba(7,32,41,0.04)' }}>
//           <div className="flex items-start md:items-center gap-4">
//             <div className="p-3 rounded-full shadow" style={{ background: `linear-gradient(135deg, ${t.accentStart}, ${t.accentEnd})` }}>
//               <TrendingUp className="w-8 h-8 text-white" />
//             </div>

//             <div>
//               <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: t.text }}>
//                 Let’s Analyze Your Financial Game Plan
//               </h2>
//               <p className="text-black/60 text-sm md:text-base leading-relaxed">
//                 Get a personalized evaluation of your financial strategy — and unlock
//                 insights that bring long-term clarity.
//               </p>
//             </div>
//           </div>

//           <a href="#book" onClick={(e) => { e.preventDefault(); window.Calendly?.initPopupWidget?.({ url: 'https://calendly.com/futurewesecure-info/30min' }); }}
//             className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-transform text-white"
//             style={{ background: `linear-gradient(135deg, ${t.accentStart}, ${t.accentEnd})` }}>
//             <Calculator className="w-5 h-5 mr-2" />
//             Book a Consultation
//           </a>
//         </section>

//         {/* Mini Feature Row */}
//         <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
//           {[
//             {
//               title: 'Trusted Advisors',
//               desc: 'Decades of experience guiding individuals and families with honesty and precision.',
//               icon: <Users className="w-8 h-8 mx-auto mb-3" style={{ color: t.accentStart }} />,
//             },
//             {
//               title: 'Tailored Solutions',
//               desc: 'Every plan is built uniquely around your long-term personal goals.',
//               icon: <CheckCircle className="w-8 h-8 mx-auto mb-3" style={{ color: t.accentEnd }} />,
//             },
//             {
//               title: 'Data-Driven Approach',
//               desc: 'We look at real numbers, real projections, and real-life variables.',
//               icon: <Presentation className="w-8 h-8 mx-auto mb-3" style={{ color: t.text }} />,
//             },
//             {
//               title: 'Transparent Guidance',
//               desc: 'No hidden agendas—just clear, actionable, and trustworthy advice.',
//               icon: <FileText className="w-8 h-8 mx-auto mb-3" style={{ color: t.accentStart }} />,
//             },
//           ].map((item, i) => (
//             <div key={i} className="p-6 bg-white border rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all" style={{ borderColor: t.subtle }}>
//               {item.icon}
//               <h3 className="font-bold mb-2" style={{ color: t.text }}>{item.title}</h3>
//               <p className="text-black/60 text-sm leading-relaxed">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// default export keeps previous name for convenience
export default HomeVariantA;
