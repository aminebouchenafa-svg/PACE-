export type Lang = "fr" | "en";

export type LocalizedText = { fr: string; en: string };

export type StepKey = "P" | "A" | "C" | "E" | "R";

export interface PacerStep {
  key: StepKey;
  /** Concise, action-oriented prompts shown as a checklist for this step. */
  items: LocalizedText[];
}

export interface Threat {
  id: string;
  icon: string;
  /** Neon accent color for the threat card. */
  color: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  /** Exactly five steps, in P-A-C-E-R order. */
  steps: PacerStep[];
}
