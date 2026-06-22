import type { Lang, LocalizedText, StepKey, Threat } from "@/types/pacer";

export function t(text: LocalizedText, lang: Lang): string {
  return text[lang];
}

/** Metadata for each PACER step: letter, name, guiding question, neon color. */
export const PACER_STEPS: {
  key: StepKey;
  color: string;
  name: LocalizedText;
  question: LocalizedText;
}[] = [
  {
    key: "P",
    color: "#00f5ff",
    name: { fr: "Percevoir", en: "Perceive" },
    question: { fr: "Que se passe-t-il vraiment ?", en: "What is actually happening?" },
  },
  {
    key: "A",
    color: "#ffb000",
    name: { fr: "Analyser", en: "Analyze" },
    question: { fr: "Quelles options ? Quels risques ?", en: "What options? What risks?" },
  },
  {
    key: "C",
    color: "#39ff14",
    name: { fr: "Choisir", en: "Choose" },
    question: { fr: "Quelle est la meilleure option ?", en: "Which option is best?" },
  },
  {
    key: "E",
    color: "#3d9eff",
    name: { fr: "Exécuter", en: "Execute" },
    question: { fr: "Comment l'appliquer maintenant ?", en: "How do I act on it now?" },
  },
  {
    key: "R",
    color: "#bf7fff",
    name: { fr: "Réévaluer", en: "Re-evaluate" },
    question: { fr: "Ça marche ? Sinon, on recommence.", en: "Is it working? If not, loop back." },
  },
];

export const PACER_COLOR: Record<StepKey, string> = Object.fromEntries(
  PACER_STEPS.map((s) => [s.key, s.color])
) as Record<StepKey, string>;

// Helper to keep the threat data readable.
function step(key: StepKey, items: LocalizedText[]): { key: StepKey; items: LocalizedText[] } {
  return { key, items };
}

export const THREATS: Threat[] = [
  {
    id: "generic",
    icon: "⚠️",
    color: "#ff9500",
    title: { fr: "Menace générique", en: "Generic threat" },
    subtitle: {
      fr: "N'importe quelle situation imprévue",
      en: "Any unexpected situation",
    },
    steps: [
      step("P", [
        { fr: "AVIATER d'abord : garde le contrôle — assiette + puissance.", en: "AVIATE first: keep control — attitude + power." },
        { fr: "Nomme la menace clairement : « Qu'est-ce qui ne va pas ? »", en: "Name the threat clearly: \"What is wrong?\"" },
        { fr: "Vérifie les indices : instruments, alarmes, voyants, bruits.", en: "Check the cues: instruments, alerts, warnings, sounds." },
        { fr: "Évite la fixation : balaye tout le tableau, pas un seul point.", en: "Avoid fixation: scan the whole panel, not one point." },
        { fr: "Combien de temps ai-je ? Décision ample ou critique ?", en: "How much time do I have? Ample or time-critical?" },
      ]),
      step("A", [
        { fr: "Liste au moins 2-3 options réalistes.", en: "List at least 2-3 realistic options." },
        { fr: "Pour chaque option : gravité × probabilité du risque.", en: "For each option: severity × probability of the risk." },
        { fr: "Carburant, météo, terrain, état avion : que permettent-ils ?", en: "Fuel, weather, terrain, aircraft state: what do they allow?" },
        { fr: "Une checklist / SOP / QRH s'applique-t-elle ?", en: "Does a checklist / SOP / QRH apply?" },
        { fr: "Reste analytique — pas d'émotion ni d'espoir trompeur.", en: "Stay analytical — no emotion, no false hope." },
      ]),
      step("C", [
        { fr: "Choisis l'option au meilleur résultat pour les conditions.", en: "Choose the option with the best outcome for the conditions." },
        { fr: "En cas de doute : prends la plus sûre / la plus conservatrice.", en: "If in doubt: pick the safest / most conservative." },
        { fr: "Décide — ne reste pas figé sans choix.", en: "Decide — do not freeze without a choice." },
      ]),
      step("E", [
        { fr: "AVIATE – NAVIGATE – COMMUNICATE, dans cet ordre.", en: "AVIATE – NAVIGATE – COMMUNICATE, in that order." },
        { fr: "Applique la checklist / QRH si disponible.", en: "Run the checklist / QRH if available." },
        { fr: "Communique : équipage, ATC (Mayday / Pan-Pan), cabine.", en: "Communicate: crew, ATC (Mayday / Pan-Pan), cabin." },
        { fr: "Répartis les tâches (PF pilote / PM surveillance).", en: "Assign tasks (PF flying / PM monitoring)." },
      ]),
      step("R", [
        { fr: "La situation s'améliore-t-elle ? Sinon, recommence à P.", en: "Is it improving? If not, restart at P." },
        { fr: "Méfie-toi de la persévération : ton plan tient-il toujours ?", en: "Beware plan-continuation bias: is your plan still valid?" },
        { fr: "Maintiens la conscience de la situation.", en: "Maintain situational awareness." },
        { fr: "Nouvelle info ? Réinjecte-la dans le cycle.", en: "New info? Feed it back into the cycle." },
      ]),
    ],
  },
  {
    id: "engine-failure",
    icon: "🛑",
    color: "#ff3b30",
    title: { fr: "Panne moteur", en: "Engine failure" },
    subtitle: { fr: "Perte totale ou partielle de puissance", en: "Total or partial power loss" },
    steps: [
      step("P", [
        { fr: "Affiche l'assiette de plané, vise la finesse max (best glide).", en: "Set glide attitude, target best-glide speed." },
        { fr: "Totale ou partielle ? Quel moteur (multi) ?", en: "Total or partial? Which engine (multi)?" },
        { fr: "Paramètres : N1/N2, EGT, pression huile, carburant.", en: "Parameters: N1/N2, EGT, oil pressure, fuel." },
        { fr: "Note ton altitude = ton temps et tes options.", en: "Note your altitude = your time and your options." },
      ]),
      step("A", [
        { fr: "Sites posables à portée de plané ? (vent, longueur)", en: "Landing sites within glide range? (wind, length)" },
        { fr: "Cause probable : carburant, allumage, givrage carbu, méca ?", en: "Likely cause: fuel, ignition, carb ice, mechanical?" },
        { fr: "Checklist « Engine Failure / Restart » applicable ?", en: "Is the \"Engine Failure / Restart\" checklist applicable?" },
        { fr: "Multi : maîtrise l'asymétrie, reste au-dessus de Vmca.", en: "Multi: control asymmetry, stay above Vmca." },
      ]),
      step("C", [
        { fr: "Redémarrage SI l'altitude et le temps le permettent.", en: "Attempt restart IF altitude and time allow." },
        { fr: "Sinon : choisis le meilleur terrain et engage l'approche.", en: "Otherwise: pick the best field and commit to the approach." },
        { fr: "Pas de demi-tour vers la piste si altitude insuffisante.", en: "No turn-back to the runway if altitude is insufficient." },
      ]),
      step("E", [
        { fr: "Vole l'avion : vitesse de plané, config, point d'aboutissement.", en: "Fly the aircraft: glide speed, config, aim point." },
        { fr: "Checklist panne moteur / atterrissage forcé.", en: "Run engine-failure / forced-landing checklist." },
        { fr: "Mayday : position, intentions, personnes à bord.", en: "Mayday: position, intentions, souls on board." },
        { fr: "Avant impact forcé : coupures carburant / électrique.", en: "Before forced touchdown: fuel / electrical shutoff." },
      ]),
      step("R", [
        { fr: "Plané stabilisé vers le point choisi ? Réajuste.", en: "Glide stabilized to the chosen point? Re-adjust." },
        { fr: "Redémarrage réussi ? Surveille, prépare un déroutement.", en: "Restart successful? Monitor, prepare a diversion." },
        { fr: "Prêt à changer de terrain si le plané évolue.", en: "Ready to change field if the glide changes." },
      ]),
    ],
  },
  {
    id: "fire-smoke",
    icon: "🔥",
    color: "#ff6b00",
    title: { fr: "Feu / Fumée", en: "Fire / Smoke" },
    subtitle: { fr: "Le temps joue contre toi", en: "Time is against you" },
    steps: [
      step("P", [
        { fr: "Contrôle l'avion d'abord.", en: "Control the aircraft first." },
        { fr: "Source : moteur, électrique, cabine, train ? Odeur / fumée ?", en: "Source: engine, electrical, cabin, gear? Smell / smoke?" },
        { fr: "Voyants feu / boucle de détection actifs ?", en: "Fire warnings / detection loop active?" },
      ]),
      step("A", [
        { fr: "Checklist Feu / Fumée à appliquer immédiatement.", en: "Fire / Smoke checklist to run immediately." },
        { fr: "Feu maîtrisable, ou pose immédiate requise ?", en: "Fire controllable, or is immediate landing required?" },
        { fr: "Terrain le plus proche vs temps de combustion.", en: "Nearest field vs time the fire gives you." },
      ]),
      step("C", [
        { fr: "Feu non maîtrisé → POSE-TOI au plus vite (priorité absolue).", en: "Uncontrolled fire → LAND as soon as possible (top priority)." },
        { fr: "Coupe la source (carburant / électrique) selon checklist.", en: "Cut the source (fuel / electrical) per checklist." },
      ]),
      step("E", [
        { fr: "Applique la checklist feu (extincteurs, coupures).", en: "Run the fire checklist (extinguishers, shutoffs)." },
        { fr: "Descente / déroutement immédiat, Mayday.", en: "Immediate descent / diversion, Mayday." },
        { fr: "Prépare la cabine et l'évacuation.", en: "Prepare the cabin and evacuation." },
      ]),
      step("R", [
        { fr: "Feu éteint / fumée dissipée ? Sinon, pose immédiate.", en: "Fire out / smoke clearing? If not, land immediately." },
        { fr: "Surveille toute reprise du feu.", en: "Watch for any re-ignition." },
      ]),
    ],
  },
  {
    id: "imc",
    icon: "☁️",
    color: "#5ac8fa",
    title: { fr: "IMC inattendu", en: "Unexpected IMC" },
    subtitle: { fr: "Entrée dans les nuages en VFR", en: "VFR flight into the clouds" },
    steps: [
      step("P", [
        { fr: "Passe aux instruments : assiette, vitesse, bille.", en: "Go to instruments: attitude, airspeed, ball." },
        { fr: "Reconnais l'IMC — n'essaie pas de « continuer à voir ».", en: "Recognize IMC — do not try to \"keep looking out\"." },
        { fr: "Note ton cap, ton altitude, ta position.", en: "Note your heading, altitude, position." },
      ]),
      step("A", [
        { fr: "Options : demi-tour 180° vers le VMC, montée MSA, déroutement.", en: "Options: 180° turn back to VMC, climb to MSA, divert." },
        { fr: "Assistance ATC / radar disponible ?", en: "ATC / radar assistance available?" },
        { fr: "Risque : désorientation spatiale en quelques secondes.", en: "Risk: spatial disorientation within seconds." },
      ]),
      step("C", [
        { fr: "Privilégie le demi-tour 180° vers le VMC d'où tu viens.", en: "Prefer the 180° turn back to the VMC you came from." },
        { fr: "Sinon : monte à la MSA et demande de l'aide.", en: "Otherwise: climb to MSA and ask for help." },
      ]),
      step("E", [
        { fr: "Vole aux instruments : virage doux, coordonné (standard rate).", en: "Fly instruments: gentle, coordinated turn (standard rate)." },
        { fr: "Déclare « unable VMC » / Pan-Pan, demande des vecteurs.", en: "Declare \"unable VMC\" / Pan-Pan, request vectors." },
        { fr: "Affiche fréquences et transpondeur utiles.", en: "Set useful frequencies and transponder." },
      ]),
      step("R", [
        { fr: "Retour en VMC ? Sinon, poursuis le vol assisté.", en: "Back in VMC? If not, continue the assisted flight." },
        { fr: "Crois tes instruments, pas tes sensations.", en: "Believe your instruments, not your senses." },
      ]),
    ],
  },
  {
    id: "system-failure",
    icon: "⚡",
    color: "#ffd60a",
    title: { fr: "Panne système", en: "System failure" },
    subtitle: { fr: "Électrique, hydraulique, avionique…", en: "Electrical, hydraulic, avionics…" },
    steps: [
      step("P", [
        { fr: "Contrôle l'avion, identifie le système touché.", en: "Control the aircraft, identify the affected system." },
        { fr: "Symptômes : disjoncteurs, voltage, perte d'instruments ?", en: "Symptoms: breakers, voltage, lost instruments?" },
        { fr: "Quels équipements perds-tu, et à quel point est-ce grave ?", en: "What equipment is lost, and how serious is it?" },
      ]),
      step("A", [
        { fr: "Checklist / QRH du système concerné.", en: "Checklist / QRH for the affected system." },
        { fr: "Réserve restante (batterie) et temps disponible.", en: "Remaining reserve (battery) and time available." },
        { fr: "Impact sur nav / comms / vol de nuit / IMC ?", en: "Impact on nav / comms / night / IMC?" },
      ]),
      step("C", [
        { fr: "Délestage : coupe le non-essentiel, préserve l'essentiel.", en: "Load-shed: cut non-essential, preserve essential." },
        { fr: "Déroute si tes capacités sont dégradées (nuit / IMC).", en: "Divert if your capability is degraded (night / IMC)." },
      ]),
      step("E", [
        { fr: "Applique la checklist, isole la panne.", en: "Run the checklist, isolate the failure." },
        { fr: "Communique tant que la radio fonctionne.", en: "Communicate while the radio still works." },
        { fr: "Prépare une navigation / un atterrissage dégradés.", en: "Prepare for degraded navigation / landing." },
      ]),
      step("R", [
        { fr: "Système rétabli ? Sinon, gère la dégradation et déroute.", en: "System restored? If not, manage the degradation and divert." },
        { fr: "Surveille les pannes en cascade.", en: "Watch for cascading failures." },
      ]),
    ],
  },
  {
    id: "gear",
    icon: "🛬",
    color: "#30d158",
    title: { fr: "Problème de train", en: "Gear malfunction" },
    subtitle: { fr: "Train non sorti / non verrouillé", en: "Gear unsafe / not down-and-locked" },
    steps: [
      step("P", [
        { fr: "Contrôle l'avion — tu as souvent du temps, gère le carburant.", en: "Control the aircraft — you often have time, manage fuel." },
        { fr: "Train : pas sorti, pas verrouillé, ou indication douteuse ?", en: "Gear: not down, not locked, or doubtful indication?" },
      ]),
      step("A", [
        { fr: "Procédure de sortie de secours (gravity extension).", en: "Emergency extension procedure (gravity extension)." },
        { fr: "Survol tour / observation visuelle possible ?", en: "Tower flyby / visual check possible?" },
        { fr: "Atterrissage train rentré : évalue, mais prépare-le.", en: "Gear-up landing: evaluate, but prepare for it." },
      ]),
      step("C", [
        { fr: "Tente la sortie de secours selon la checklist.", en: "Attempt the emergency extension per checklist." },
        { fr: "Choisis une piste longue, secours alertés.", en: "Choose a long runway, emergency services alerted." },
      ]),
      step("E", [
        { fr: "Applique la checklist train ; allège le carburant si prévu.", en: "Run the gear checklist; reduce fuel if applicable." },
        { fr: "Briefing atterrissage anormal, alerte les pompiers.", en: "Brief the abnormal landing, alert the fire service." },
        { fr: "Pose en douceur, maîtrise l'axe.", en: "Touch down gently, keep it on centreline." },
      ]),
      step("R", [
        { fr: "Train verrouillé confirmé ? Sinon, planifie la pose dégradée.", en: "Gear confirmed locked? If not, plan the degraded landing." },
        { fr: "Reste prêt à remettre les gaz.", en: "Stay ready to go around." },
      ]),
    ],
  },
  {
    id: "medical",
    icon: "🩺",
    color: "#ff2d55",
    title: { fr: "Urgence médicale", en: "Medical emergency" },
    subtitle: { fr: "Passager ou membre d'équipage", en: "Passenger or crew member" },
    steps: [
      step("P", [
        { fr: "Vole l'avion d'abord.", en: "Fly the aircraft first." },
        { fr: "Qui ? Quels symptômes ? Pilote ou passager ?", en: "Who? What symptoms? Pilot or passenger?" },
      ]),
      step("A", [
        { fr: "Assistance médicale par radio / ATC / medlink ?", en: "Medical assistance via radio / ATC / medlink?" },
        { fr: "Aéroport adéquat le plus proche avec moyens médicaux.", en: "Nearest suitable airport with medical facilities." },
        { fr: "Urgence vitale ou état stable ?", en: "Life-threatening or stable?" },
      ]),
      step("C", [
        { fr: "Déroute si urgence vitale, vers le terrain le mieux équipé.", en: "Divert if life-threatening, to the best-equipped field." },
        { fr: "Sinon, surveille et continue selon l'avis médical.", en: "Otherwise, monitor and continue per medical advice." },
      ]),
      step("E", [
        { fr: "Déclare l'urgence, demande une ambulance à l'arrivée.", en: "Declare the emergency, request an ambulance on arrival." },
        { fr: "Délègue les soins à un passager qualifié si possible.", en: "Delegate care to a qualified passenger if possible." },
        { fr: "Demande la priorité d'atterrissage.", en: "Request landing priority." },
      ]),
      step("R", [
        { fr: "L'état évolue ? Réadapte ta destination.", en: "Condition changing? Re-adapt your destination." },
      ]),
    ],
  },
  {
    id: "fuel",
    icon: "⛽",
    color: "#ff9f0a",
    title: { fr: "Problème carburant", en: "Fuel problem" },
    subtitle: { fr: "Fuite, faible niveau, déséquilibre", en: "Leak, low level, imbalance" },
    steps: [
      step("P", [
        { fr: "Vole l'avion, lis les jauges, calcule le carburant RÉEL restant.", en: "Fly the aircraft, read gauges, compute REAL fuel remaining." },
        { fr: "Fuite, surconsommation, ou erreur de planification ?", en: "Leak, over-consumption, or planning error?" },
      ]),
      step("A", [
        { fr: "Autonomie restante en TEMPS vs distance à l'aéroport.", en: "Endurance left in TIME vs distance to the airport." },
        { fr: "Terrains accessibles en gardant ta réserve.", en: "Fields reachable while keeping your reserve." },
        { fr: "Déséquilibre / sélecteur / pompe en cause ?", en: "Imbalance / selector / pump involved?" },
      ]),
      step("C", [
        { fr: "Déroute vers le terrain le plus sûr AVANT d'entamer la réserve.", en: "Divert to the safest field BEFORE eating into the reserve." },
        { fr: "Ne « tente » pas la destination si la marge est insuffisante.", en: "Do not \"stretch\" to destination if the margin is insufficient." },
      ]),
      step("E", [
        { fr: "Réduis la consommation (régime éco, altitude adaptée).", en: "Reduce consumption (economy power, suitable altitude)." },
        { fr: "Gère sélecteurs / équilibrage selon la checklist.", en: "Manage selectors / balancing per checklist." },
        { fr: "Déclare Pan-Pan / Mayday fuel selon la criticité.", en: "Declare Pan-Pan / Mayday fuel per criticality." },
      ]),
      step("R", [
        { fr: "Marge recalculée OK ? Sinon, déroute plus proche.", en: "Recomputed margin OK? If not, divert closer." },
        { fr: "Surveille la consommation en continu.", en: "Monitor consumption continuously." },
      ]),
    ],
  },
  {
    id: "disorientation",
    icon: "🌀",
    color: "#bf5af2",
    title: { fr: "Désorientation spatiale", en: "Spatial disorientation" },
    subtitle: { fr: "Tes sensations te mentent", en: "Your senses are lying to you" },
    steps: [
      step("P", [
        { fr: "Reviens aux instruments : l'horizon artificiel = la vérité.", en: "Return to instruments: the attitude indicator is truth." },
        { fr: "Reconnais le conflit : ce que tu sens ≠ ce que tu vois.", en: "Recognize the conflict: what you feel ≠ what you see." },
      ]),
      step("A", [
        { fr: "Ignore les sensations, fie-toi aux instruments.", en: "Ignore the sensations, trust the instruments." },
        { fr: "Base de référence : ailes à plat, assiette neutre, vitesse stable.", en: "Reference: wings level, neutral attitude, stable speed." },
      ]),
      step("C", [
        { fr: "Pilote l'horizon artificiel, mouvements doux.", en: "Fly the attitude indicator, gentle inputs." },
        { fr: "Demande de l'aide : autopilote, ATC, si disponible.", en: "Get help: autopilot, ATC, if available." },
      ]),
      step("E", [
        { fr: "Stabilise : assiette + puissance, scan instrumental régulier.", en: "Stabilize: attitude + power, regular instrument scan." },
        { fr: "Engage l'autopilote s'il est fiable et disponible.", en: "Engage autopilot if reliable and available." },
      ]),
      step("R", [
        { fr: "Sensations calmées ? Continue au scan instrumental.", en: "Sensations settled? Keep to the instrument scan." },
        { fr: "Évite les mouvements de tête brusques.", en: "Avoid abrupt head movements." },
      ]),
    ],
  },
  {
    id: "icing",
    icon: "❄️",
    color: "#64d2ff",
    title: { fr: "Givrage", en: "Icing" },
    subtitle: { fr: "Perte de performance et de portance", en: "Loss of performance and lift" },
    steps: [
      step("P", [
        { fr: "Contrôle l'avion ; surveille vitesse et assiette (décrochage avancé).", en: "Control the aircraft; watch speed and attitude (early stall)." },
        { fr: "Accumulation : ailes, hélice, pare-brise, sondes ?", en: "Accretion: wings, prop, windshield, probes?" },
      ]),
      step("A", [
        { fr: "Antigivrage / dégivrage disponible ? Pitot heat ON ?", en: "Anti-ice / de-ice available? Pitot heat ON?" },
        { fr: "Sortie : altitude plus chaude ou plus froide, demi-tour ?", en: "Escape: warmer or colder altitude, turn back?" },
        { fr: "Risque : vitesse de décrochage augmentée, perte de perf.", en: "Risk: increased stall speed, loss of performance." },
      ]),
      step("C", [
        { fr: "Quitte la zone givrante : change d'altitude vers de l'air non saturé.", en: "Leave the icing zone: change altitude toward unsaturated air." },
        { fr: "Augmente les marges de vitesse ; prudence avec les volets.", en: "Increase speed margins; be cautious with flaps." },
      ]),
      step("E", [
        { fr: "Active l'antigivrage, augmente la vitesse, demande un autre niveau.", en: "Turn on anti-ice, increase speed, request a level change." },
        { fr: "Signale le givrage à l'ATC.", en: "Report the icing to ATC." },
      ]),
      step("R", [
        { fr: "Givre éliminé ? Sinon, poursuis la sortie / déroute.", en: "Ice cleared? If not, continue the escape / divert." },
        { fr: "Surveille le retour du givre et les sondes.", en: "Watch for ice returning and the probes." },
      ]),
    ],
  },
  {
    id: "incapacitation",
    icon: "😵",
    color: "#ac8e68",
    title: { fr: "Incapacité pilote", en: "Pilot incapacitation" },
    subtitle: { fr: "Un pilote hors de combat", en: "A pilot out of action" },
    steps: [
      step("P", [
        { fr: "Prends / garde les commandes, annonce « I have control ».", en: "Take / keep the controls, announce \"I have control\"." },
        { fr: "Évalue l'état de l'autre pilote.", en: "Assess the other pilot's condition." },
      ]),
      step("A", [
        { fr: "Une aide à bord ? La charge en solo est-elle gérable ?", en: "Any help on board? Is the solo workload manageable?" },
        { fr: "Aéroport adapté le plus proche.", en: "Nearest suitable airport." },
      ]),
      step("C", [
        { fr: "Déroute et atterris dès que possible, en mono-pilote.", en: "Divert and land as soon as practical, single-pilot." },
      ]),
      step("E", [
        { fr: "Sécurise le pilote incapacité ; autopilote pour te soulager.", en: "Secure the incapacitated pilot; autopilot to offload yourself." },
        { fr: "Déclare Mayday, demande assistance et ambulance.", en: "Declare Mayday, request assistance and ambulance." },
        { fr: "Briefing d'atterrissage simplifié.", en: "Simplified landing brief." },
      ]),
      step("R", [
        { fr: "Charge gérable ? Demande plus d'aide à l'ATC si besoin.", en: "Workload manageable? Ask ATC for more help if needed." },
      ]),
    ],
  },
];

export function getThreat(id: string): Threat | undefined {
  return THREATS.find((thr) => thr.id === id);
}
