"use client";

import Link from "next/link";
import type { Threat } from "@/types/pacer";
import { useLang } from "@/lib/lang";
import LangToggle from "@/components/LangToggle";
import PacerFlow from "@/components/PacerFlow";

const TXT = {
  back: { fr: "Menaces", en: "Threats" },
};

export default function ThreatClient({ threat }: { threat: Threat }) {
  const { lang } = useLang();

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="sticky top-0 z-20 px-4 pt-4 pb-3"
        style={{ background: "#141414ee", backdropFilter: "blur(10px)", borderBottom: `1px solid ${threat.color}33` }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <Link
              href="/"
              className="flex items-center gap-1 text-sm font-semibold"
              style={{ color: "#888" }}
            >
              ← {TXT.back[lang]}
            </Link>
            <LangToggle />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{threat.icon}</span>
            <div>
              <h1 className="text-xl font-black tracking-tight" style={{ color: threat.color, textShadow: `0 0 14px ${threat.color}66` }}>
                {threat.title[lang]}
              </h1>
              <p className="text-xs" style={{ color: "#888" }}>
                {threat.subtitle[lang]}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 max-w-2xl mx-auto w-full">
        <PacerFlow threat={threat} />
      </main>
    </div>
  );
}
