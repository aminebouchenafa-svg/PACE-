"use client";

import { useState } from "react";
import type { Threat } from "@/types/pacer";
import { PACER_STEPS } from "@/lib/data";
import { useLang } from "@/lib/lang";

const NAV = {
  aviate: { fr: "AVIATE D'ABORD — pilote l'avion", en: "AVIATE FIRST — fly the aircraft" },
  prev: { fr: "Précédent", en: "Back" },
  next: { fr: "Étape suivante", en: "Next step" },
  restart: { fr: "Recommencer le cycle", en: "Restart the cycle" },
  loopHint: {
    fr: "Cycle bouclé. La situation s'est-elle améliorée ? Sinon, recommence à P.",
    en: "Cycle complete. Has it improved? If not, restart at P.",
  },
};

export default function PacerFlow({ threat }: { threat: Threat }) {
  const { lang } = useLang();
  const [current, setCurrent] = useState(0);
  // Per-step set of checked item indices.
  const [checked, setChecked] = useState<Record<number, Set<number>>>({});

  const step = threat.steps[current];
  const meta = PACER_STEPS[current];
  const isLast = current === threat.steps.length - 1;

  const toggle = (itemIdx: number) => {
    setChecked((prev) => {
      const next = { ...prev };
      const set = new Set(next[current] ?? []);
      if (set.has(itemIdx)) set.delete(itemIdx);
      else set.add(itemIdx);
      next[current] = set;
      return next;
    });
  };

  const restart = () => {
    setCurrent(0);
    setChecked({});
  };

  return (
    <div>
      {/* Persistent priority banner */}
      <div
        className="rounded-lg px-3 py-2 mb-4 text-center text-xs font-bold tracking-wide"
        style={{ background: "#39ff140f", border: "1px solid #39ff1433", color: "#39ff14" }}
      >
        ✈ {NAV.aviate[lang]}
      </div>

      {/* P-A-C-E-R progress bar */}
      <div className="flex gap-1.5 mb-5">
        {PACER_STEPS.map((s, i) => {
          const active = i === current;
          const done = i < current;
          return (
            <button
              key={s.key}
              onClick={() => setCurrent(i)}
              className="flex-1 rounded-lg py-2 font-black text-lg transition-all active:scale-95"
              style={{
                background: active ? `${s.color}22` : done ? `${s.color}11` : "#222",
                border: `1px solid ${active ? s.color : done ? `${s.color}55` : "#333"}`,
                color: active || done ? s.color : "#555",
                textShadow: active ? `0 0 10px ${s.color}aa` : "none",
              }}
              title={s.name[lang]}
            >
              {s.key}
            </button>
          );
        })}
      </div>

      {/* Active step card */}
      <div
        className="rounded-2xl p-4 mb-4"
        style={{ background: "#1f1f1f", border: `1px solid ${meta.color}44`, boxShadow: `inset 0 0 24px ${meta.color}0a` }}
      >
        <div className="flex items-baseline gap-2 mb-1">
          <span
            className="text-2xl font-black"
            style={{ color: meta.color, textShadow: `0 0 12px ${meta.color}88` }}
          >
            {meta.key}
          </span>
          <h2 className="text-lg font-bold" style={{ color: "#f0f0f0" }}>
            {meta.name[lang]}
          </h2>
        </div>
        <p className="text-sm mb-4" style={{ color: meta.color }}>
          {meta.question[lang]}
        </p>

        <div className="space-y-2">
          {step.items.map((item, idx) => {
            const isChecked = checked[current]?.has(idx) ?? false;
            return (
              <button
                key={idx}
                onClick={() => toggle(idx)}
                className="w-full flex items-start gap-3 rounded-xl p-3 text-left transition-all active:scale-[0.99]"
                style={{
                  background: isChecked ? `${meta.color}14` : "#262626",
                  border: `1px solid ${isChecked ? `${meta.color}66` : "#333"}`,
                }}
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-xs font-black mt-0.5"
                  style={{
                    background: isChecked ? meta.color : "transparent",
                    border: `1.5px solid ${isChecked ? meta.color : "#555"}`,
                    color: "#06121f",
                  }}
                >
                  {isChecked ? "✓" : ""}
                </span>
                <span
                  className="text-sm leading-snug"
                  style={{ color: isChecked ? "#888" : "#e0e0e0", textDecoration: isChecked ? "line-through" : "none" }}
                >
                  {item[lang]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {isLast && (
        <p className="text-xs text-center mb-4 leading-relaxed px-4" style={{ color: "#bf7fff" }}>
          🔄 {NAV.loopHint[lang]}
        </p>
      )}

      {/* Navigation */}
      <div className="flex gap-2">
        {current > 0 && (
          <button
            onClick={() => setCurrent(current - 1)}
            className="px-4 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
            style={{ background: "#2a2a2a", border: "1px solid #444", color: "#aaa" }}
          >
            ← {NAV.prev[lang]}
          </button>
        )}
        {isLast ? (
          <button
            onClick={restart}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
            style={{ background: "#bf7fff22", border: "1px solid #bf7fff", color: "#bf7fff" }}
          >
            🔄 {NAV.restart[lang]}
          </button>
        ) : (
          <button
            onClick={() => setCurrent(current + 1)}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
            style={{
              background: `${PACER_STEPS[current + 1].color}22`,
              border: `1px solid ${PACER_STEPS[current + 1].color}`,
              color: PACER_STEPS[current + 1].color,
            }}
          >
            {NAV.next[lang]} →
          </button>
        )}
      </div>
    </div>
  );
}
