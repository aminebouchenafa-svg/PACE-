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
  close: { fr: "Fermer", en: "Close" },
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
      <button className="btn" onClick={() => setOpen(true)} title={TXT.title[lang]} style={{ padding: "6px 11px" }}>
        ?
      </button>

      {open && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="modal-box">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontWeight: 700, fontSize: "var(--fsl)", color: "#F1F5F9" }}>
                <span style={{ color: "var(--blue)" }}>PACER</span> — {TXT.title[lang]}
              </h2>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "var(--mut)", fontSize: 26, lineHeight: 1, cursor: "pointer" }}>
                ×
              </button>
            </div>

            <p className="mb-4" style={{ fontSize: "var(--fss)", color: "var(--mut)", lineHeight: 1.5 }}>
              {TXT.intro[lang]}
            </p>

            <div className="space-y-2 mb-4">
              {PACER_STEPS.map((s) => (
                <div key={s.key} className="card flex gap-3" style={{ borderColor: `${s.color}33`, background: `${s.color}0d` }}>
                  <span
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: 32, height: 32, borderRadius: 8, fontWeight: 900, fontSize: "var(--fsl)", color: s.color, background: "#00000033" }}
                  >
                    {s.key}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, color: s.color, fontSize: "var(--fss)" }}>{s.name[lang]}</div>
                    <div style={{ fontSize: "var(--fsxs)", color: "var(--mut)", lineHeight: 1.4, marginTop: 2 }}>
                      {STEP_DESC[s.key][lang]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card mb-3" style={{ borderColor: "#F9731633", background: "#F973160d" }}>
              <div style={{ fontSize: "var(--fsxs)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--orange)", marginBottom: 4 }}>
                {TXT.loopTitle[lang]}
              </div>
              <div style={{ fontSize: "var(--fsxs)", color: "var(--mut)", lineHeight: 1.5 }}>{TXT.loop[lang]}</div>
            </div>

            <div className="card mb-3" style={{ borderColor: "#10B98133", background: "#10B9810d" }}>
              <div style={{ fontSize: "var(--fsxs)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--green)", marginBottom: 4 }}>
                {TXT.golden[lang]}
              </div>
              <div style={{ fontSize: "var(--fsxs)", color: "var(--mut)", lineHeight: 1.5 }}>{TXT.goldenTxt[lang]}</div>
            </div>

            <div className="mb-4" style={{ fontSize: "var(--fsxs)", textAlign: "center", color: "var(--faint)", lineHeight: 1.5 }}>
              {TXT.disclaimer[lang]}
            </div>

            <button className="btn btn-primary w-full" onClick={() => setOpen(false)} style={{ background: "var(--blue)", borderColor: "var(--blue)" }}>
              {TXT.close[lang]}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
