"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang";
import { PACER_STEPS } from "@/lib/data";

const TXT = {
  title: { fr: "La méthode PACER", en: "The PACER method" },
  intro: {
    fr: "PACER est un cycle de décision pour le vol. Le but : éviter la fixation et garder un plan qui reste valable.",
    en: "PACER is a decision cycle for flight. The goal: avoid fixation and keep a plan that stays valid.",
  },
  loopTitle: { fr: "Pourquoi le R ?", en: "Why the R?" },
  loop: {
    fr: "Le tueur n°1 est de persévérer dans un plan dépassé. Réévaluer ferme la boucle : si ça ne s'améliore pas, on repart à P.",
    en: "The number-one killer is sticking to an outdated plan. Re-evaluate closes the loop: if it isn't improving, restart at P.",
  },
  golden: { fr: "Règle d'or", en: "Golden rule" },
  goldenTxt: {
    fr: "AVIATE – NAVIGATE – COMMUNICATE. Pilote l'avion avant tout.",
    en: "AVIATE – NAVIGATE – COMMUNICATE. Fly the aircraft first.",
  },
  disclaimer: {
    fr: "Aide à la décision — ne remplace ni le QRH, ni les SOP, ni le jugement du commandant de bord.",
    en: "Decision aid — does not replace the QRH, the SOP, or the captain's judgement.",
  },
};

const STEP_DESC: Record<string, { fr: string; en: string }> = {
  P: { fr: "Perçois la situation : pilote, observe, nomme la menace.", en: "Perceive the situation: fly, observe, name the threat." },
  A: { fr: "Analyse les options et leurs risques (gravité × probabilité).", en: "Analyze the options and their risks (severity × probability)." },
  C: { fr: "Choisis l'option la plus sûre pour les conditions.", en: "Choose the safest option for the conditions." },
  E: { fr: "Exécute : checklist, communication, répartition des tâches.", en: "Execute: checklist, communication, task sharing." },
  R: { fr: "Réévalue : ça marche ? Sinon, recommence le cycle.", en: "Re-evaluate: is it working? If not, restart the cycle." },
};

export default function AboutModal() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all"
        style={{ background: "#2a2a2a", border: "1px solid #444", color: "#aaa" }}
        title={TXT.title[lang]}
      >
        ?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl overflow-y-auto max-h-[90vh]"
            style={{ background: "#1e1e1e", border: "1px solid #333" }}
          >
            <div
              className="flex items-center justify-between p-4 sticky top-0"
              style={{ background: "#1e1e1e", borderBottom: "1px solid #2e2e2e" }}
            >
              <h2 className="font-bold text-base" style={{ color: "#f0f0f0" }}>
                {TXT.title[lang]}
              </h2>
              <button onClick={() => setOpen(false)} className="text-2xl leading-none" style={{ color: "#666" }}>
                ×
              </button>
            </div>

            <div className="p-4 space-y-5">
              <p className="text-sm leading-relaxed" style={{ color: "#c0c0c0" }}>
                {TXT.intro[lang]}
              </p>

              <div className="space-y-2">
                {PACER_STEPS.map((s) => (
                  <div
                    key={s.key}
                    className="flex gap-3 rounded-xl p-3"
                    style={{ background: `${s.color}0d`, border: `1px solid ${s.color}33` }}
                  >
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-lg font-black"
                      style={{ color: s.color, textShadow: `0 0 8px ${s.color}88`, background: "#00000033" }}
                    >
                      {s.key}
                    </span>
                    <div>
                      <p className="text-sm font-bold" style={{ color: s.color }}>
                        {s.name[lang]}
                      </p>
                      <p className="text-xs leading-relaxed mt-0.5" style={{ color: "#a0a0a0" }}>
                        {STEP_DESC[s.key][lang]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <section className="rounded-xl p-3" style={{ background: "#bf7fff0d", border: "1px solid #bf7fff33" }}>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#bf7fff" }}>
                  {TXT.loopTitle[lang]}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#a0a0a0" }}>
                  {TXT.loop[lang]}
                </p>
              </section>

              <section className="rounded-xl p-3" style={{ background: "#39ff140d", border: "1px solid #39ff1433" }}>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#39ff14" }}>
                  {TXT.golden[lang]}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#a0a0a0" }}>
                  {TXT.goldenTxt[lang]}
                </p>
              </section>

              <div className="rounded-xl p-3 text-xs text-center leading-relaxed" style={{ background: "#252525", color: "#777" }}>
                {TXT.disclaimer[lang]}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
