"use client";

import { useLang } from "@/lib/lang";

export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="flex items-center rounded-full p-0.5 text-xs font-bold"
      style={{ background: "#2a2a2a", border: "1px solid #444" }}
    >
      {(["fr", "en"] as const).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="px-2.5 py-1 rounded-full transition-all uppercase"
            style={{
              background: active ? "#3d9eff" : "transparent",
              color: active ? "#06121f" : "#888",
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
