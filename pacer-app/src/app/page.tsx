"use client";

import Link from "next/link";
import { THREATS, PACER_STEPS } from "@/lib/data";
import { useLang } from "@/lib/lang";
import LangToggle from "@/components/LangToggle";
import AboutModal from "@/components/AboutModal";

const TXT = {
  sub: {
    fr: "Aide à la décision en vol",
    en: "In-flight decision aid",
  },
  prompt: { fr: "Quelle est la menace ?", en: "What is the threat?" },
  generic: { fr: "Cycle générique", en: "Generic cycle" },
  genericSub: { fr: "Pour toute situation imprévue", en: "For any unexpected situation" },
  threats: { fr: "Menaces fréquentes", en: "Common threats" },
};

export default function HomePage() {
  const { lang } = useLang();
  const generic = THREATS.find((thr) => thr.id === "generic")!;
  const threats = THREATS.filter((thr) => thr.id !== "generic");

  return (
    <div className="app">
      {/* Topbar */}
      <div className="topbar">
        <div style={{ flex: 1 }}>
          <div className="title" style={{ color: "var(--blue)", letterSpacing: "0.5px" }}>
            ✈ PACER
          </div>
          <div className="sub">{TXT.sub[lang]}</div>
        </div>
        <LangToggle />
        <AboutModal />
      </div>

      {/* Scrollable body */}
      <div className="scroll">
        {/* PACER legend chips */}
        <div className="flex gap-1.5 mb-5">
          {PACER_STEPS.map((s) => (
            <div
              key={s.key}
              className="flex-1 text-center"
              style={{
                borderRadius: 8,
                padding: "7px 0",
                fontWeight: 800,
                fontSize: "var(--fsl)",
                color: s.color,
                background: `${s.color}1a`,
                border: `1px solid ${s.color}3a`,
              }}
              title={s.name[lang]}
            >
              {s.key}
            </div>
          ))}
        </div>

        <div className="mb-2" style={{ fontSize: "var(--fss)", fontWeight: 700, color: "var(--mut)" }}>
          {TXT.prompt[lang]}
        </div>

        {/* Generic CTA */}
        <Link href="/threat/generic">
          <div
            className="card mb-5 flex items-center gap-3"
            style={{ borderColor: `${generic.color}66`, cursor: "pointer" }}
          >
            <span style={{ fontSize: 30 }}>{generic.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: generic.color, fontSize: "var(--fsl)" }}>
                {TXT.generic[lang]}
              </div>
              <div style={{ fontSize: "var(--fss)", color: "var(--mut)" }}>
                {TXT.genericSub[lang]}
              </div>
            </div>
            <span style={{ color: "var(--faint)", fontSize: 22 }}>→</span>
          </div>
        </Link>

        <div
          className="mb-3"
          style={{ fontSize: "var(--fsxs)", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--faint)" }}
        >
          {TXT.threats[lang]}
        </div>

        {/* Threat grid */}
        <div className="grid grid-cols-2 gap-3">
          {threats.map((thr) => (
            <Link href={`/threat/${thr.id}`} key={thr.id}>
              <div
                className="card h-full"
                style={{ borderColor: `${thr.color}40`, cursor: "pointer" }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{thr.icon}</div>
                <div style={{ fontWeight: 700, color: thr.color, fontSize: "var(--fss)", lineHeight: 1.2, marginBottom: 4 }}>
                  {thr.title[lang]}
                </div>
                <div style={{ fontSize: "var(--fsxs)", color: "var(--mut)", lineHeight: 1.3 }}>
                  {thr.subtitle[lang]}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
