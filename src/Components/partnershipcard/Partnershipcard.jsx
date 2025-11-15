// // PartnerProgram.VariantB.jsx
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Handshake,
//   Notebook,
//   BookOpenText,
//   ChartNoAxesCombined,
//   X,
// } from "lucide-react";

// const cardData = [
//   {
//     title: "Responsibilities",
//     description: [
//       "Embrace the system, follow it, and align with your leaders.",
//       "Earn while you learn with guided mentorship.",
//       "Invite prospects to multiple workshops.",
//       "Schedule follow-ups for continued growth.",
//     ],
//     Icon: Handshake,
//   },
//   {
//     title: "Educate People On Securing Their Future",
//     description: [
//       "We help families secure future needs, build generational wealth, and enjoy life without compromise.",
//     ],
//     Icon: Notebook,
//   },
//   {
//     title: "Required Skills",
//     description: ["Energetic self-starter", "Coachable", "18+ with valid SSN"],
//     Icon: BookOpenText,
//   },
//   {
//     title: "What Will You Gain",
//     description: [
//       "Create plans covering retirement, tax efficiency, 401k rollovers, asset protection, and more.",
//     ],
//     Icon: ChartNoAxesCombined,
//   },
// ];

// export default function PartnerProgramVariantB() {
//   const [selectedCard, setSelectedCard] = useState(null);

//   const calendlyReadyRef = useRef(false);
//   const orange = "#f37021";
//   const orangeDark = "#d95800";
//   const black = "#0f0f0f";

//   const openCalendly = () => {
//     window.Calendly?.initPopupWidget?.({
//       url: "https://calendly.com/jack-weplanfuture/60min",
//     });
//   };

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-20 mt-10">
//       {/* HEADER */}
//       <div className="text-center mb-16 max-w-3xl mx-auto">
//         <h2 className="text-4xl font-extrabold" style={{ color: black }}>
//           Partner Program
//         </h2>
//         <p className="mt-4 text-black/70 text-lg">
//           Build a meaningful career helping families secure their future.
//         </p>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//         {cardData.map((card, idx) => (
//           <div
//             key={idx}
//             onClick={() => setSelectedCard(card)}
//             className="relative bg-white rounded-3xl p-8 text-center border border-black/10 shadow-md hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-1 hover:bg-white/90 backdrop-blur-sm"
//           >
//             {/* Floating Icon */}
//             <div
//               className="w-20 h-20 rounded-3xl grid place-items-center mx-auto -mt-12 shadow-lg"
//               style={{
//                 background: `linear-gradient(135deg, ${orange}, ${orangeDark})`,
//               }}
//             >
//               <card.Icon className="w-10 h-10 text-white" />
//             </div>

//             <h3 className="mt-6 text-xl font-bold" style={{ color: black }}>
//               {card.title}
//             </h3>

//             <p className="mt-3 text-black/70 text-sm leading-relaxed">
//               {card.description[0].slice(0, 110)}…
//             </p>

//             <button className="mt-6 text-sm underline text-black/60">
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {selectedCard && (
//         <div
//           className="fixed inset-0 bg-black/60 grid place-items-center p-4 z-50"
//           onClick={() => setSelectedCard(null)}
//         >
//           <div
//             className="bg-white rounded-3xl shadow-2xl p-6 max-w-xl w-full relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-4 right-4 hover:bg-gray-100 p-1 rounded"
//               onClick={() => setSelectedCard(null)}
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <h3 className="text-xl font-bold">{selectedCard.title}</h3>

//             <ul className="mt-4 text-black/80 list-disc pl-5 space-y-2">
//               {selectedCard.description.map((d, i) => (
//                 <li key={i}>{d}</li>
//               ))}
//             </ul>

//             <button
//               onClick={openCalendly}
//               className="mt-6 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
//               style={{
//                 background: `linear-gradient(135deg, ${orange}, ${orangeDark})`,
//               }}
//             >
//               Book a Call
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }



// PartnerProgram.VariantA.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Handshake,
  Notebook,
  BookOpenText,
  ChartNoAxesCombined,
  X,
} from "lucide-react";

const cardData = [
  {
    title: "Responsibilities",
    description: [
      "Embrace the system, follow it, and align with your leaders.",
      "Allow your leaders to guide you while you earn and learn simultaneously.",
      "Invite anyone and everyone to sessions and workshops.",
      "Schedule follow-up sessions with your leader to enhance growth.",
    ],
    Icon: Handshake,
  },
  {
    title: "Educate People On Securing Their Future",
    description: [
      "“An investment in knowledge pays the best interest.” We help families secure future needs while enjoying life fully.",
    ],
    Icon: Notebook,
  },
  {
    title: "Required Skills",
    description: ["Energetic self-starter", "Coachable", "18+ with valid SSN"],
    Icon: BookOpenText,
  },
  {
    title: "What Will You Gain",
    description: [
      "Craft tailored plans across:",
      "Retirement planning",
      "Tax savings",
      "401(k) rollover",
      "College savings",
      "Asset protection",
      "Risk management",
      "Estate planning",
    ],
    Icon: ChartNoAxesCombined,
  },
];

export default function PartnerProgramVariantA() {
  const [selectedCard, setSelectedCard] = useState(null);

  const calendlyReadyRef = useRef(false);
  const orange = "#f37021";
  const orangeDark = "#d95800";
  const black = "#0f0f0f";

  const openCalendly = () => {
    const openPopup = () =>
      window.Calendly?.initPopupWidget?.({
        url: "https://calendly.com/jack-weplanfuture/60min",
      });

    if (calendlyReadyRef.current && window.Calendly) return openPopup();

    let script = document.getElementById("calendly-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        calendlyReadyRef.current = true;
        openPopup();
      };
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    if (!document.getElementById("calendly-script")) {
      const s = document.createElement("script");
      s.id = "calendly-script";
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.onload = () => (calendlyReadyRef.current = true);
      document.body.appendChild(s);
    }
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-4 mt-20 py-16">
      {/* HEADER */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2
          className="text-4xl font-extrabold tracking-tight"
          style={{ color: black }}
        >
          Partner Program
        </h2>
        <p className="mt-4 text-lg text-black/70">
          Build a meaningful career helping families master personal finance.
        </p>

        <button
         onClick={(e) => {
                e.preventDefault();
                // if you use Calendly or similar, call popup here
                if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                  window.Calendly.initPopupWidget({ url: "https://calendly.com/futurewesecure-info/30min" });
                } else {
                  // fallback to a route or external link — adjust as needed
                  window.open("https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer");
                }
              }}
          className="mt-6 inline-block rounded-full px-7 py-3 text-sm font-semibold"
          style={{
            background: `linear-gradient(135deg, ${orange}, ${orangeDark})`,
            color: "white",
            boxShadow: "0 10px 28px rgba(217,88,0,0.20)",
          }}
        >
          Learn More
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {cardData.map((card, idx) => (
          <article
            key={idx}
            onClick={() => setSelectedCard(card)}
            className="relative bg-white rounded-3xl p-8 border border-black/10 shadow-[0_8px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.15)] transition-all cursor-pointer hover:-translate-y-1"
          >
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl grid place-items-center shadow-md"
              style={{
                background: `linear-gradient(135deg, ${orange}, ${orangeDark})`,
              }}
            >
              <card.Icon className="w-8 h-8 text-white" />
            </div>

            <h3 className="mt-6 text-xl font-bold" style={{ color: black }}>
              {card.title}
            </h3>

            <ul className="mt-4 text-black/70 leading-relaxed list-disc pl-5 space-y-1">
              {card.description.slice(0, 3).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <button className="mt-5 text-sm font-semibold text-black/60">
              View Details →
            </button>
          </article>
        ))}
      </div>

      {/* MODAL */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-xl max-w-xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded"
              onClick={() => setSelectedCard(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-4">{selectedCard.title}</h3>

            <ul className="list-disc pl-5 space-y-2 text-black/70">
              {selectedCard.description.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <button
              onClick={(e) => {
                e.preventDefault();
                // if you use Calendly or similar, call popup here
                if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                  window.Calendly.initPopupWidget({ url: "https://calendly.com/futurewesecure-info/30min" });
                } else {
                  // fallback to a route or external link — adjust as needed
                  window.open("https://calendly.com/futurewesecure-info/30min", "_blank", "noopener,noreferrer");
                }
              }}
              className="mt-6 rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{
                background: `linear-gradient(135deg, ${orange}, ${orangeDark})`,
                color: "white",
              }}
            >
              Book a Call
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
