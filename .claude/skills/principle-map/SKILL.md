---
name: principle-map
description: |
  Open or render the Principle Map: meta-principle -> 7 principles -> nemeses -> scenarios. Use when the learner types /principle-map, "show me the principle map", or "diagram this".
allowed-tools:
  - Read
  - Bash
---

# Principle Map

## Primary: the static reference card
A beautiful, printable, zero-cost card already ships in the repo: `reference/principle-map.html`.
Point the learner there first.
- Have them open it: `open reference/principle-map.html` (macOS), `xdg-open` (Linux), `start` (Windows), or just open the file in a browser. It is self-contained — no internet, no tokens. They can print it to PDF as a one-page revision sheet.
- Encourage keeping it open while studying. Offer: "ask me about any principle or nemesis on the card."

## Fallback: render in chat
If they can't open a browser (or want it inline), render the map from `course/COMPETENCY_MAP.md` only (7 principles + nemesis roster + scenario coverage): meta-principle → 7 principles → nemeses per principle → scenarios that stress each, plus a one-line plain-English gloss per principle. No code, no external links. Dry and efficient — it's a reference, not a lecture.
