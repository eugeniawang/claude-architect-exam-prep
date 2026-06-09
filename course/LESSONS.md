# LESSONS — Architect on Call

The plan for every session. The instructor (`CLAUDE.md`) teaches from this file, succinctly, and applies
each session to the learner's own system (`MY_SYSTEM.md`).

> **Source of truth:** `SOURCE.md` (official Anthropic exam guide, v0.1). If a lesson and `SOURCE.md`
> disagree, `SOURCE.md` wins. Where the v0.1 guide lags the live product, lessons carry `EXAM:` (answer
> to pass) and `NOW:` (current reality) notes.

## Frame
The learner is the on-call architect for a Claude system. Each session is a build or an incident on it.
Anti-patterns are recurring **nemeses**; spotting the tempting-but-wrong answer is the exam. Use the
frame as light structure — not narration.

## How it works
Two layers, both required:
- **Principles (the why).** Seven root principles. Every anti-pattern is one of them, violated — learn the
  seven and you can re-derive any answer.
- **Concrete (the what).** Every exact exam token, drilled to recall, anchored to a principle. Coverage proof: `COMPETENCY_MAP.md`.

**Prime Directive (meta-principle):** the LLM is one probabilistic component; architecture is everything
you wrap around it. Wrong answers "ask the model harder" or reach for a disproportionate fix.

## The seven principles
- **P1** — Determinism for the correctness-critical; the model for judgment.
- **P2** — Context is a finite, ordered, decaying working set — not memory.
- **P3** — Match the mechanism to the problem's shape and cost.
- **P4** — Make failure legible; propagate structured error context.
- **P5** — Verification independent of generation; measurement disaggregated.
- **P6** — Decomposition needs complete coverage and managed seams.
- **P7** — Preserve provenance and uncertainty.

## Lesson format (every session)
Overview · Skill built · Prerequisites · Do This First · What Just Happened · Guided Practice ·
Explain It Back · Pattern/Anti-pattern · Scenario Check · Apply/Transfer · Review Hooks.

## Guardrails the instructor enforces
- Doing before telling; explanation is two or three lines, after.
- **Never show code** — describe in plain English; name exact tokens inline only (the exam tests recognising them).
- Succinct, never chatty; no cheerleading (the status line/spinner carry that). A short dry aside at most.
- Name the violated principle and the nemesis whenever an anti-pattern appears.
- Gates are real: each Scenario Check is scored; phase gates at **72%** (after S3, S7, S11); final = **4-of-6 timed mock**.

## Nemeses (anti-patterns, by principle)
| Nemesis | Crime | Principle | First met |
|---|---|---|---|
| The Text Whisperer | reads the model's words to decide when to stop the loop | P1 | S1 |
| The Mind-Reader | assumes subagents inherit context | P2/P6 | S2 |
| The Narrow Decomposer | splits a task so narrowly it misses whole areas | P6 | S2 |
| The Polite Asker | asks the model to obey a business rule instead of enforcing it | P1 | S3 |
| The Hoarder | piles 18 tools on one agent | P3 | S4 |
| The Mumbler | vague, overlapping tool descriptions | P3 | S4 |
| Old Faithful Failure | returns "Operation failed" and nothing else | P4 | S4 |
| The Secret-Spiller | hardcodes API keys into config | P3 | S5 |
| The Bash Bludgeon | reaches for Bash when a built-in tool fits | P3 | S5 |
| The Oversharer | puts personal prefs in project-scoped config | P3 | S6 |
| The Sledgehammer | swings plan mode at a one-line fix | P3 | S7 |
| The Self-Marker | reviews its own work in the same session | P5 | S7 |
| The Vague Vizier | says "be conservative" and calls it criteria | P1 | S8 |
| The Eternal Retrier | retries for data the source never contained | P3/P4 | S9 |
| The Summarizer of Doom | condenses exact amounts and dates into a blur | P2 | S10 |
| The Average-Hider | reports 97% while one type sits at 0% | P5 | S10 |
| The Sentiment-Based Escalator | escalates on frustration, not complexity | P1/P5 | S11 |
| The Silent Reconciler | quietly picks one of two conflicting sources | P7 | S11 |

## Map
Phase 0 Onboarding (S0) · Phase 1 The Agent's Spine, D1 (S1–3) · Phase 2 Tools, Code & Context, D2/D3 (S4–7) ·
Phase 3 Prompting, Reliability & Context, D4/D5 (S8–11) · Phase 4 Capstone (S12).

---

## Session Index

Each session lives in `lessons/`. Load only the file for the current session.

| # | File | Title | Phase |
|---|------|-------|-------|
| 0 | `lessons/00-the-prime-directive.md` | The Prime Directive | Phase 0 — Onboarding |
| 1 | `lessons/01-agentic-loops.md` | Agentic Loops & stop_reason | Phase 1 — The Agent's Spine |
| 2 | `lessons/02-multi-agent-orchestration.md` | Multi-Agent Orchestration & Context Isolation | Phase 1 |
| 3 | `lessons/03-hooks-enforcement-and-handoff.md` | Hooks, Enforcement & Handoff | Phase 1 |
| 4 | `lessons/04-tool-design-and-structured-errors.md` | Tool Design & Structured Errors | Phase 2 — Tools, Code & Context |
| 5 | `lessons/05-mcp-and-built-in-tools.md` | MCP & Built-in Tools | Phase 2 |
| 6 | `lessons/06-claude-code-config.md` | Claude Code Config: CLAUDE.md, Commands, Skills, Rules | Phase 2 |
| 7 | `lessons/07-plan-mode-iteration-and-cicd.md` | Plan Mode, Iteration & CI/CD | Phase 2 |
| 8 | `lessons/08-explicit-criteria-and-few-shot.md` | Explicit Criteria & Few-Shot | Phase 3 — Prompting, Reliability & Context |
| 9 | `lessons/09-structured-output-and-validation-retry.md` | Structured Output & Validation-Retry | Phase 3 |
| 10 | `lessons/10-context-management-and-reliability.md` | Context Management & Reliability | Phase 3 |
| 11 | `lessons/11-escalation-error-propagation-and-provenance.md` | Escalation, Error Propagation & Provenance | Phase 3 |
| 12 | `lessons/12-the-final-shift.md` | The Final Shift | Phase 4 — Capstone |
