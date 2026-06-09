# Architect on Call — CCA-F Exam Prep

> **Independent & unofficial.** Community-created study companion. Not affiliated with or endorsed by
> Anthropic. Not a replacement for the official certification materials — study those too.

An interactive, first-principles prep course for the **Claude Certified Architect – Foundations (CCA-F)**
exam, delivered inside Claude Code. You play the on-call architect for your own Claude system; every
session is a build or a 2am incident. Built with [create-course](https://github.com/eugeniawang/create-course).

Course version: `0.9` · Last updated: `2026-06-09`

## What this is (and isn't)
- **It doesn't teach *at* you.** An AI instructor (Claude Code, via `CLAUDE.md`) guides you through
  *doing* the work — you learn by predicting, running, explaining back, and judging scenarios.
- **Independent and unofficial.** Community-created. Not affiliated with, endorsed by, or sponsored by
  Anthropic. Not a replacement for the official Anthropic certification materials.
- **`course/SOURCE.md` is the course's source of truth** — an original study framework built on the seven
  root principles and publicly documented Claude behaviors. Not a reproduction of any exam guide. Study
  the official Anthropic materials directly; if anything here ever differs from Anthropic's current
  materials, **Anthropic's materials win.**
- **Free resources first.** See [course/RESOURCES.md](course/RESOURCES.md) — Anthropic's free GitHub courses are the
  best technical foundation, and the official portal is where the exam guide lives.

## Course focus
- **Goal:** get genuinely exam-ready (the course is designed so that clearing every gate ≈ ready for the
  720/1000 bar) **and** understand the material well enough to use it at work.
- **Success looks like:** you can explain each of the seven root principles plainly, name the violated
  principle in any scenario, clear the 72% phase gates, pass a 4-of-6 timed mock, and ship an
  architecture brief for your own system.
- **Out of scope:** the official out-of-scope list in `course/SOURCE.md` (fine-tuning, billing, MCP hosting,
  computer use, vision, streaming, pricing, tokenization, etc.).
- **Capstone / proof:** your own system's one-page architecture brief + the final mock.

## How it's built to stick
Two welded layers — neither optional:
- **Principles (the why).** Seven root principles. Every anti-pattern is one of them, violated. Learn
  the seven and you can re-derive any answer, even on a scenario you've never seen.
- **Concrete (the what).** Every exact exam token, drilled to cold recall, anchored to a principle.

Plus: Feynman explain-back gates, spaced repetition keyed to principles, scenario-first judgment,
72% phase gates, and a final 4-of-6 timed mock. It's also meant to be *fun* — the anti-patterns are
recurring nemeses you learn to spot and slay, with a wry instructor and a status line that calls you by name.

## Prep timeline (you choose at setup)
One core 13-session curriculum; pick the cadence:
- **1 month** — ~3 sessions/week, tight review spacing.
- **2 months** — ~1–2 sessions/week, more spacing.
- **3 months** — ~1 session/week, heaviest reinforcement.
Same content; only pace and review spacing change. The instructor uses your choice for every "what's next" call.

## Quick start
1. Clone the repo: [`eugeniawang/claude-architect-exam-prep`](https://github.com/eugeniawang/claude-architect-exam-prep)
2. Open this folder as its own project in Claude Code.
3. Type **`Start`**. A 4-question intake (name · bad-joke tolerance · comfort 1–5 · 1/2/3-month
   timeline), one at a time, then it recommends Session 0 → 1. Returning? Type `continue`.

Core commands: `Help` · `Define X` · `Quiz me` · `Distractor gauntlet` · `Practice exam` · `Mock exam` ·
`Show my progress` · `What's next?` · `Show me the principle map` · `I'm stuck on X` · `Parking lot`.

A **project-local status line** (never global) shows your lesson position, cumulative active time, a
readiness meter, the model you're on — plus a deadpan quip or two.

**Model:** **Sonnet recommended.** The static `reference/` study aids need no model at all. Haiku
handles light review (definitions, recall, navigation, the static drills); the judgment-heavy parts
(grading scenarios, the mock, adaptive remediation) are better on Sonnet. Opus is unnecessary. Switch with `/model sonnet`.

## The map (13 sessions, 4 phases)
- **Phase 0 — Onboarding:** S0 The Prime Directive + your system + meet the nemeses.
- **Phase 1 — The Agent's Spine** (Domain 1, 27%): S1 Agentic Loops & `stop_reason` · S2 Multi-Agent Orchestration & Context Isolation · S3 Hooks, Enforcement & Handoff.
- **Phase 2 — Tools, Code & Context** (Domains 2, 3 + batch/review): S4 Tool Design & Structured Errors · S5 MCP & Built-in Tools · S6 Claude Code Config · S7 Plan Mode, Iteration & CI/CD.
- **Phase 3 — Prompting, Reliability & Context** (Domains 4, 5): S8 Explicit Criteria & Few-Shot · S9 Structured Output & Validation-Retry · S10 Context Management & Reliability · S11 Escalation, Error Propagation & Provenance.
- **Phase 4 — Capstone:** S12 architecture brief + 4-of-6 timed mock.

## Course structure (canonical files)
- `CLAUDE.md` — the instructor runtime adapter (how the course is delivered).
- `course/LESSONS.md` — the session index; full content is in `lessons/` (one file per session, loaded
  individually so only the current lesson enters context — low token use).
- `reference/` — **static HTML study aids** that need no model: the **Principle Map** card (printable)
  and the interactive **Distractor Gauntlet** quiz. Open in a browser; replay for free.
- `course/SOURCE.md` — the course's source of truth (original study framework, principle-anchored, with `EXAM:`/`NOW:` labels).
- `course/COMPETENCY_MAP.md` — coverage matrix (proves every task statement is taught) + nemesis roster.
- `course/DISTRACTOR-PATTERNS.md` — wrong-answer patterns mapped to the principle each one breaks.
- `course/GLOSSARY.md` — plain-English terms + the exact exam token + the principle it serves.
- `COURSE_PLAN.md` — planning/architecture record. `VALIDATION.md` — maintainer validation record.
- `NOTEBOOKLM.md` — optional NotebookLM companion (audio overview + mind map). Never required.
- `index.html` — this course's landing page.
- `templates/` — `user.json`, `progress.json`, `PROGRESS.md`, `MY_SYSTEM.md` (copied to root on setup).
- `.claude/` — slash commands, runtime skills, and the project-local status line hook.
- `course/RESOURCES.md` — free Anthropic courses, official portal, community study links.
- `sources/anthropic/` — community-collected exam overview and reference links (no proprietary content).

> **Legacy note:** earlier files (`session-guides/`, `workbooks/`, `labs/`, `learner/`, `CHECKPOINTS.md`,
> `COMPETENCY-CHECKS.md`, `REVIEW-SYSTEM.md`, `study/OFFICIAL-EXAM-ANCHORS.md`, `study/SKILLS-MATRIX.md`,
> `study/DOMAIN-MAP.md`, `study/SCENARIOS.md`) are superseded by the canonical files above and kept as reference only.

## Optional NotebookLM companion
Want audio overviews and an auto mind map for revision on the go? See `NOTEBOOKLM.md`. It's optional and
unofficial — the course is fully functional in Claude Code without it, and the principle map is built in
(`Show me the principle map`).

## Built with create-course
This course is also an example of one built with
[create-course](https://github.com/eugeniawang/create-course), the course-builder that generated this shape.
