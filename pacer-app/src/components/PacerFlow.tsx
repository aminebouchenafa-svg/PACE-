"use client";

import { useState } from "react";
import type { Threat } from "@/types/pacer";
import { PACER_STEPS } from "@/lib/data";
import { useLang } from "@/lib/lang";

const NAV = {
  aviate: { fr: "AVIATE D'ABORD — pilote l'avion", en: "AVIATE FIRST — fly the aircraft" },
  prev: { fr: "Précédent", en: "Back" },
  next: { fr: "Suivant", en: "Next" },
  restart: { fr: "Recommencer", en: "Restart" },
  loopHint: {
    fr: "Cycle bouclé. La situation s'est-elle améliorée ? Sinon, recommence à P.",
    en: "Cycle complete. Has it improved? If not, restart at P.",
  },
};

export default function PacerFlow({ threat }: { threat: Threat }) {
  const { lang } = useLang();
  const [current, setCurrent] = useState(0);
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
    <>
      {/* PACER steps as tabs */}
      <div className="tabs">
        {PACER_STEPS.map((s, i) => {
          const active = i === current;
          const done = i < current;
          return (
            <button
              key={s.key}
              className="tab"
              onClick={() => setCurrent(i)}
              style={{
                color: active ? s.color : done ? `${s.color}aa` : "var(--faint)",
                borderBottomColor: active ? s.color : "transparent",
              }}
              title={s.name[lang]}
            >
              {s.key}
            </button>
          );
        })}
      </div>

      {/* Scrollable step content */}
      <div className="scroll">
        {/* Priority banner */}
        <div
          className="chip mb-4"
          style={{ display: "block", textAlign: "center", color: "var(--green)", background: "#10B98114", border: "1px solid #10B98133", fontSize: "var(--fsxs)", letterSpacing: "0.5px" }}
        >
          ✈ {NAV.aviate[lang]}
        </div>

        {/* Step header */}
        <div className="flex items-baseline gap-2 mb-1">
          <span style={{ fontSize: "var(--fsxl)", fontWeight: 900, color: meta.color }}>{meta.key}</span>
          <h2 style={{ fontSize: "var(--fsl)", fontWeight: 700, color: "var(--text)" }}>{meta.name[lang]}</h2>
        </div>
        <p className="mb-4" style={{ fontSize: "var(--fss)", color: meta.color }}>
          {meta.question[lang]}
        </p>

        {/* Checklist items */}
        <div className="space-y-2">
          {step.items.map((item, idx) => {
            const isChecked = checked[current]?.has(idx) ?? false;
            return (
              <button
                key={idx}
                onClick={() => toggle(idx)}
                className="card w-full flex items-start gap-3 text-left"
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  background: isChecked ? `${meta.color}14` : "var(--surf)",
                  borderColor: isChecked ? `${meta.color}66` : "var(--bord)",
                }}
              >
                <span
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    marginTop: 2,
                    fontSize: 12,
                    fontWeight: 900,
                    background: isChecked ? meta.color : "transparent",
                    border: `1.5px solid ${isChecked ? meta.color : "var(--faint)"}`,
                    color: "#06121f",
                  }}
                >
                  {isChecked ? "✓" : ""}
                </span>
                <span
                  style={{
                    fontSize: "var(--fss)",
                    lineHeight: 1.4,
                    color: isChecked ? "var(--mut)" : "var(--text)",
                    textDecoration: isChecked ? "line-through" : "none",
                  }}
                >
                  {item[lang]}
                </span>
              </button>
            );
          })}
        </div>

        {isLast && (
          <p className="mt-4" style={{ fontSize: "var(--fsxs)", textAlign: "center", color: PACER_STEPS[4].color, lineHeight: 1.4 }}>
            🔄 {NAV.loopHint[lang]}
          </p>
        )}
      </div>

      {/* Bottom action bar */}
      <div className="bottom-bar">
        <button
          className="btn"
          onClick={() => setCurrent(current - 1)}
          disabled={current === 0}
          style={{ opacity: current === 0 ? 0.4 : 1 }}
        >
          ← {NAV.prev[lang]}
        </button>
        {isLast ? (
          <button
            className="btn btn-primary"
            onClick={restart}
            style={{ flex: 1, background: meta.color, borderColor: meta.color }}
          >
            🔄 {NAV.restart[lang]}
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => setCurrent(current + 1)}
            style={{ flex: 1, background: PACER_STEPS[current + 1].color, borderColor: PACER_STEPS[current + 1].color }}
          >
            {PACER_STEPS[current + 1].key} · {NAV.next[lang]} →
          </button>
        )}
      </div>
    </>
  );
}
