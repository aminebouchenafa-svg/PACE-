# ✈ PACER — Aide à la décision en vol

Application web rapide, mobile-first et hors-ligne qui aide les pilotes à prendre
les meilleures décisions face à une menace en vol, en suivant le cycle **PACER**.

> **PACER** = **P**ercevoir · **A**nalyser · **C**hoisir · **E**xécuter · **R**éévaluer
> (EN : **P**erceive · **A**nalyze · **C**hoose · **E**xecute · **R**e-evaluate)

## Pourquoi PACER ?

Le cycle s'appuie sur la doctrine de prise de décision aéronautique (modèle 3P de
la FAA, processus en 4 étapes de Transport Canada, DECIDE / FOR-DEC) avec une
addition clé : le **R — Réévaluer**, qui ferme la boucle et combat la *fixation /
plan continuation bias*, le piège n°1 décrit dans la littérature accident.

| Étape | FR | EN | Rôle |
|------|------|------|------|
| **P** | Percevoir | Perceive | Pilote, observe, nomme la menace |
| **A** | Analyser | Analyze | Options + risques (gravité × probabilité) |
| **C** | Choisir | Choose | L'option la plus sûre pour les conditions |
| **E** | Exécuter | Execute | Checklist, communication, répartition des tâches |
| **R** | Réévaluer | Re-evaluate | Ça marche ? Sinon, on recommence à P |

## Utilisation

1. Ouvre l'app → choisis la **menace** rencontrée (ou *cycle générique*).
2. Déroule les 5 étapes PACER ; coche les actions au fur et à mesure.
3. À la fin, **réévalue** : si la situation ne s'améliore pas, relance le cycle.

Bascule **FR / EN** à tout moment via l'interrupteur en haut à droite.

> ⚠️ **Aide à la décision uniquement.** Ne remplace ni le QRH, ni les SOP, ni le
> jugement du commandant de bord.

## Stack

- **Next.js 16** (App Router, export statique) · **React 19** · **Tailwind CSS v4** · **TypeScript**
- Tout le contenu est dans `src/lib/data.ts` (menaces + questions-guides, bilingue).

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # export statique dans ./out
```

## Ajouter / modifier une menace

Édite le tableau `THREATS` dans `src/lib/data.ts`. Chaque menace fournit les cinq
étapes `P, A, C, E, R`, chacune avec une liste de prompts `{ fr, en }`.
