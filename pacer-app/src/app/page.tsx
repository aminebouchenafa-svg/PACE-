"use client";

import Link from "next/link";
import { THREATS, PACER_STEPS } from "@/lib/data";
import { useLang } from "@/lib/lang";
import LangToggle from "@/components/LangToggle";
import AboutModal from "@/components/AboutModal";

const TXT = {
  tagline: {
    fr: "Percevoir · Analyser · Choisir · Exécuter · Réévaluer",
    en: "Perceive · Analyze · Choose · Execute · Re-evaluate",
  },
  prompt: { fr: "Quelle est la menace ?", en: "What is the threat?" },
  generic: { fr: "Démarrer un cycle générique", en: "Start a generic cycle" },
  genericSub: { fr: "Pour toute situation imprévue", en: "For any unexpected situation" },
  threats: { fr: "Menaces fréquentes", en: "Common threats" },
};

export default function HomePage() {
  const { lang } = useLang();
  const generic = THREATS.find((thr) => thr.id === "generic")!;
  const threats = THREATS.filter((thr) => thr.id !== "generic");

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="sticky top-0 z-20 px-4 pt-4 pb-3"
        style={{ background: "#141414ee", backdropFilter: "blur(10px)", borderBottom: "1px solid #2a2a2a" }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h1
                className="text-2xl font-black tracking-tight"
                style={{ color: "#3d9eff", textShadow: "0 0 16px #3d9eff66" }}
              >
                ✈ PACER
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <LangToggle />
              <AboutModal />
            </div>
          </div>
          <p className="text-xs font-mono" style={{ color: "#666" }}>
            {TXT.tagline[lang]}
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 max-w-2xl mx-auto w-full">
        {/* Mini PACER legend */}
        <div className="flex gap-1.5 mb-5">
          {PACER_STEPS.map((s) => (
            <div
              key={s.key}
              className="flex-1 rounded-lg py-1.5 text-center text-sm font-black"
              style={{ background: `${s.color}14`, border: `1px solid ${s.color}33`, color: s.color }}
              title={s.name[lang]}
            >
              {s.key}
            </div>
          ))}
        </div>

        <p className="text-sm font-semibold mb-3" style={{ color: "#888" }}>
          {TXT.prompt[lang]}
        </p>

        {/* Generic CTA */}
        <Link href="/threat/generic">
          <div
            className="rounded-2xl p-4 mb-5 flex items-center gap-3 cursor-pointer transition-all active:scale-[0.98]"
            style={{
              background: `${generic.color}14`,
              border: `1px solid ${generic.color}66`,
              boxShadow: `0 0 20px ${generic.color}22`,
            }}
          >
            <span className="text-3xl">{generic.icon}</span>
            <div>
              <p className="font-bold text-base" style={{ color: generic.color }}>
                {TXT.generic[lang]}
              </p>
              <p className="text-xs" style={{ color: "#999" }}>
                {TXT.genericSub[lang]}
              </p>
            </div>
          </div>
        </Link>

        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#666" }}>
          {TXT.threats[lang]}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {threats.map((thr) => (
            <Link href={`/threat/${thr.id}`} key={thr.id}>
              <div
                className="rounded-xl p-4 h-full cursor-pointer transition-all duration-200 active:scale-95 hover:scale-[1.02]"
                style={{
                  background: "#1f1f1f",
                  border: `1px solid ${thr.color}44`,
                  boxShadow: `0 0 14px ${thr.color}1c, inset 0 0 20px ${thr.color}08`,
                }}
              >
                <div className="text-3xl mb-2">{thr.icon}</div>
                <div className="text-sm font-bold leading-tight mb-1" style={{ color: thr.color }}>
                  {thr.title[lang]}
                </div>
                <div className="text-xs leading-snug" style={{ color: "#888" }}>
                  {thr.subtitle[lang]}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
