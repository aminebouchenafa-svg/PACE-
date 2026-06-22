"use client";

import { useLang } from "@/lib/lang";

export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="flex items-center"
      style={{ background: "var(--surf2)", border: "1px solid var(--bord)", borderRadius: 6, padding: 2 }}
    >
      {(["fr", "en"] as const).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: "4px 9px",
              borderRadius: 4,
              fontSize: "var(--fsxs)",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              background: active ? "var(--blue)" : "transparent",
              color: active ? "#fff" : "var(--mut)",
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
