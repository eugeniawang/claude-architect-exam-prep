---
title: "CCA-F First-Principles Course Plan"
status: "active"
delivery_environment: "claude-code"
source_policy: "SOURCE.md is canonical (original study framework, publicly documented behaviors). SOURCE.md wins on any conflict."
created: "2026-06-08"
updated: "2026-06-09"
---

# CCA-F First-Principles Course Plan

## Identity
- **Build mode:** brownfield, **in-place** (rebuilt on top of the existing repo on branch
  `feat/first-principles-rebuild`; no read-only copy — explicitly authorized by the owner).
- **Title:** Claude Certified Architect – Foundations: *Architect on Call*
- **Slug:** claude-architect-exam-prep
- **Audience:** solution architects prepping for CCA-F (some hands-on Claude experience; may be rusty on specifics).
- **Promise:** every learner who finishes **passes the exam (≥720/1000)** — and understands the
  material well enough to use it at work, because they learned the *principles*, not just patterns.
- **Running example:** `MY_SYSTEM.md` — the real (or realistic) production Claude system the learner
  is responsible for. Every principle is applied to it; the capstone ships its architecture brief.

## Goal Lens
- **Intake template:** goal-led · **Goal type:** specific outcome (pass CCA-F) + durable capability.
- **Course goals:**
  1. Internalize the 7 root principles so any anti-pattern/scenario is re-derivable.
  2. Cold-recall every exam-tested token (per `SOURCE.md` / `COMPETENCY_MAP.md`).
  3. Justify scenario choices against distractors under exam format.
  4. Pass a 4-of-6 timed mock at the real bar, with a repair plan if short.
- **Success criteria:** explains each principle plainly (Feynman) · names the violated principle in any
  scenario · clears 72% phase gates · passes final mock · ships a personal architecture brief.
- **Out of scope:** the official out-of-scope list (`SOURCE.md`) — fine-tuning, billing, MCP hosting,
  computer use, vision, streaming, pricing, tokenization, etc.
- **External standard:** Anthropic CCA-F exam guide v0.1 (Feb 2025).

## Runtime Architecture
- **Delivery environment:** Claude Code only. **Adapter:** `CLAUDE.md`.
- Project-local; no global install. Learner state in root working files copied from `templates/`.

## Learning Architecture
- **Spine:** first-principles (meta + 7 principles) → anti-patterns derived as violations → scenarios as integration.
- **Format:** create-course lesson format (Overview · Skill · Prerequisites · Do This First · What Just
  Happened · Guided Practice · Explain It Back · Pattern/Anti-pattern · Scenario Check · Apply/Transfer · Review Hooks).
- **Shape:** 13 sessions (onboarding S0 + 12), 4 phases, capstone.
- **Gates:** scored scenario check per session · 72% phase gate · final 4-of-6 timed mock.
- **Beginner-first:** yes (define jargon on first use; repair foundations; recurring review of weak areas).
- **Competency/coverage map:** `COMPETENCY_MAP.md` (proves full task-statement coverage).
- **Visual aids:** built-in **Principle Map** (self-contained, on-demand via `show me the principle map`)
  + optional NotebookLM companion (see below). Visual commands active in `CLAUDE.md`.
- **NotebookLM:** OPTIONAL companion only (audio overview + auto mind map from `SOURCE.md`). Course is
  fully functional without it. `NOTEBOOKLM.md` included, marked optional/unofficial.

## create-course house-rule adherence
- **House rule #6 "never show code" is HONORED.** No code blocks, JSON, or config samples anywhere; exact
  tokens are named inline only (e.g. the `stop_reason` field, `-p`, `.mcp.json`) because the exam tests
  recognising the names. Verified: 0 code fences in `LESSONS.md`.
- **Succinct, non-chatty.** Instructor guides/teaches/coaches/explains; no cheerleading (spinner verbs do
  that); short wry aside at most; one question at a time; setup/tracking file ops are silent.

## Fun mandate (create-course is too dry — make it land)
- **Narrative frame:** "Architect on Call" — learner is the on-call architect at a scrappy startup;
  each session is a build or a 2am incident on *their* system.
- **Nemeses:** every anti-pattern is a recurring villain (see `COMPETENCY_MAP.md` roster) that
  reappears in disguise — exactly how the exam hides distractors. Learner "slays" them.
- **Distractor Gauntlet:** rapid-fire spot-the-wrong-answer with a streak counter and wry heckling.
- **Readiness meter** climbs visibly; **Hall of Shame** logs villains beaten.
- **Voice:** succinct, never chatty; a short wry aside at most. Encouragement lives in the spinner verbs, not the prose.

## Capabilities
| Capability | Input | Output | Success criteria |
| --- | --- | --- | --- |
| start / continue | learner state | next session or review | learner knows exact next move |
| define | term | plain-language + exam token | learner can use it correctly |
| quiz-me | weak/current concepts | scenario checks | misconception logged or cleared |
| distractor-gauntlet | scenario pool | timed spot-the-distractor + streak | distractor-spotting speed up |
| practice-exam | competency map | mixed scenarios | weak areas + repair plan |
| mock-exam | competency map | 4-of-6 timed, scored to 72% | pass/fail + remediation |
| progress | progress files | readiness meter + next action | path + weak areas visible |
| show principle map / diagram | concept + source anchor | visual artifact | relationship seen clearly |

## Configuration
| Field | Prompt | Default | Used by |
| --- | --- | --- | --- |
| build_mode | scratch or brownfield? | brownfield in-place | routing |
| delivery_environment | Claude Code? | Claude Code | adapter |
| beginner_first | assume rust/gaps? | true | pace |
| navigation_mode | sequential or flexible? | sequential | progression |
| running_example | the learner's real Claude system | ask on setup | personalization |
| notebooklm | enable optional companion? | optional | visuals |

## Dependencies & Guardrails
- Source packet under `sources/anthropic/` (official PDF) — `SOURCE.md` is the canonical digest.
- Exam-prep accuracy outranks cleverness; fun never distorts a fact.
- Weak-domain repair explicit before advancement; no gate bypass.
- `EXAM:`/`NOW:` labels required wherever the v0.1 guide lags the live product.

## Validation Checklist
- [ ] Session count matches across README, LESSONS, PROGRESS, progress.json (13).
- [ ] Every task statement in COMPETENCY_MAP maps to a session.
- [ ] Lessons full (no stubs), in create-course format, principle-anchored.
- [ ] 72% gates + 4-of-6 mock wired in CLAUDE.md + mock skill.
- [ ] Domain weights = 27/18/20/20/15 everywhere.
- [ ] Show-code deviation logged in VALIDATION.
- [ ] JSON validates; index.html transpiles.
- [ ] Self-contained: learner can start from repo alone.

## Build Roadmap
1. Contract files: SOURCE, COURSE_PLAN, COMPETENCY_MAP. ✅
2. CLAUDE.md adapter + GLOSSARY + DISTRACTOR-PATTERNS (principle-based) + Principle Map.
3. Templates: user.json, progress.json (13), PROGRESS.md, MY_SYSTEM.md; optional NOTEBOOKLM.md.
4. LESSONS.md: 13 full sessions (delegate phases, assemble).
5. README + index.html + VALIDATION; verify against generated folder; commit.
