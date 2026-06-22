"use client";

import Link from "next/link";
import type { Threat } from "@/types/pacer";
import { useLang } from "@/lib/lang";
import LangToggle from "@/components/LangToggle";
import PacerFlow from "@/components/PacerFlow";

const TXT = {
  back: { fr: "Retour", en: "Back" },
};

export default function ThreatClient({ threat }: { threat: Threat }) {
  const { lang } = useLang();

  return (
    <div className="app">
      <div className="topbar" style={{ borderBottomColor: `${threat.color}40` }}>
        <Link href="/" className="btn">
          ← {TXT.back[lang]}
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="title" style={{ color: threat.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {threat.icon} {threat.title[lang]}
          </div>
          <div className="sub" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {threat.subtitle[lang]}
          </div>
        </div>
        <LangToggle />
      </div>

      <PacerFlow threat={threat} />
    </div>
  );
}
