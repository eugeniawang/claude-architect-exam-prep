# Competency Map — Coverage Matrix (the pass guarantee, proven)

This is the proof that **nothing exam-tested is missing**. Every official task statement maps to a
session, a root principle (so it's retained), the scenario(s) that stress it, and a `SOURCE.md`
anchor. If a row has no session, the course has a hole. It doesn't.

**Pass mechanics:** scored scenario check each session · **72% gate** per phase (= 720/1000) ·
final **4-of-6 timed mock** mirroring the 12 official sample questions · no "complete" without
clearing the threshold on real-format questions.

Legend: P = root principle (see `SOURCE.md`). S = scenario number.

## Domain 1 — Agentic Architecture & Orchestration (27%)
| Task | Concept | Session | Principle | Scenario | Source anchor |
|---|---|---|---|---|---|
| 1.1 | Agentic loops, `stop_reason` | S1 | P1 | S1, S3 | SOURCE §D1.1 |
| 1.2 | Coordinator-subagent, context isolation | S2 | P6, P2 | S3 | SOURCE §D1.2 |
| 1.3 | `Task`/`allowedTools`, `AgentDefinition`, `fork_session` | S2 | P6, P7 | S3 | SOURCE §D1.3 |
| 1.4 | Enforcement & structured handoff | S3 | P1, P4 | S1 | SOURCE §D1.4 |
| 1.5 | Hooks `PreToolUse`/`PostToolUse` | S3 | P1 | S1 | SOURCE §D1.5 |
| 1.6 | Task decomposition (chaining vs adaptive) | S2 | P3, P6 | S3 | SOURCE §D1.6 |
| 1.7 | Session state, `--resume`, `fork_session` | S2 | P2 | S2, S4 | SOURCE §D1.7 |

## Domain 2 — Tool Design & MCP Integration (18%)
| Task | Concept | Session | Principle | Scenario | Source anchor |
|---|---|---|---|---|---|
| 2.1 | Tool descriptions, overlap, naming | S4 | P3 | S1, S4 | SOURCE §D2.1 |
| 2.2 | Structured errors `isError`/`errorCategory`/`isRetryable` | S4 | P4 | S1, S3 | SOURCE §D2.2 |
| 2.3 | Tool distribution (4–5 vs 18), `tool_choice` | S4 | P3 | S4 | SOURCE §D2.3 |
| 2.4 | MCP `.mcp.json` vs `~/.claude.json`, `${ENV_VAR}` | S5 | P3 | S4 | SOURCE §D2.4 |
| 2.5 | Built-in tools Read/Write/Edit/Bash/Grep/Glob | S5 | P3 | S4 | SOURCE §D2.5 |

## Domain 3 — Claude Code Configuration & Workflows (20%)
| Task | Concept | Session | Principle | Scenario | Source anchor |
|---|---|---|---|---|---|
| 3.1 | CLAUDE.md hierarchy, `@import`, `/memory` | S6 | P3 | S2 | SOURCE §D3.1 |
| 3.2 | Commands vs skills vs CLAUDE.md, `context: fork` | S6 | P3 | S2 | SOURCE §D3.2 |
| 3.3 | Path-specific rules `paths:` globs | S6 | P3 | S2 | SOURCE §D3.3 |
| 3.4 | Plan mode vs direct execution | S7 | P3 | S2 | SOURCE §D3.4 |
| 3.5 | Iterative refinement (examples, TDD, interview) | S7 | P3, P5 | S2 | SOURCE §D3.5 |
| 3.6 | CI/CD `-p`/`--output-format json`/`--json-schema`, session isolation | S7 | P3, P5 | S5 | SOURCE §D3.6 |

## Domain 4 — Prompt Engineering & Structured Output (20%)
| Task | Concept | Session | Principle | Scenario | Source anchor |
|---|---|---|---|---|---|
| 4.1 | Explicit criteria vs vague | S8 | P1, P3 | S5, S6 | SOURCE §D4.1 |
| 4.2 | Few-shot (2–4 + edge case) | S8 | P3 | S6 | SOURCE §D4.2 |
| 4.3 | `tool_use`+schema, `tool_choice`, schema≠semantic | S9 | P3, P4, P5 | S6 | SOURCE §D4.3 |
| 4.4 | Validation-retry, retry-useless-when-absent, `detected_pattern` | S9 | P4, P5 | S6 | SOURCE §D4.4 |
| 4.5 | Batch API (50%, 24h, `custom_id`) | S7 | P3 | S5 | SOURCE §D4.5 |
| 4.6 | Multi-instance / multi-pass review | S7 | P5 | S5 | SOURCE §D4.6 |

## Domain 5 — Context Management & Reliability (15%)
| Task | Concept | Session | Principle | Scenario | Source anchor |
|---|---|---|---|---|---|
| 5.1 | Lost-in-the-middle, case-facts block, summarization risk | S10 | P2 | S1 | SOURCE §D5.1 |
| 5.2 | Escalation triggers (NOT sentiment/self-confidence) | S11 | P1, P5 | S1 | SOURCE §D5.2 |
| 5.3 | Error propagation, access-failure ≠ empty-result | S11 | P4 | S3 | SOURCE §D5.3 |
| 5.4 | Context degradation, scratchpad, `/compact` | S10 | P2, P5 | S4 | SOURCE §D5.4 |
| 5.5 | Human review, aggregate-masking, stratified sampling, field-confidence | S10 | P5 | S6 | SOURCE §D5.5 |
| 5.6 | Provenance, claim-source, conflict annotation, temporal data | S11 | P7 | S3 | SOURCE §D5.6 |

## Scenario coverage (all 6 drilled; mock presents 4 of 6)
| # | Scenario | Domains | Drilled in |
|---|---|---|---|
| S1 | Customer Support Resolution Agent | D1, D2, D5 | S3, S11, capstone |
| S2 | Code Generation with Claude Code | D3, D5 | S6, S7, capstone |
| S3 | Multi-Agent Research System | D1, D2, D5 | S2, S11, capstone |
| S4 | Developer Productivity with Claude | D2, D3, D1 | S5, capstone |
| S5 | Claude Code for CI/CD | D3, D4 | S7, capstone |
| S6 | Structured Data Extraction | D4, D5 | S9, S10, capstone |

## Nemesis roster (each anti-pattern = a violated principle, personified for recall)
| Nemesis | Anti-pattern | Principle violated | Met in |
|---|---|---|---|
| The Text Whisperer | parse NL for loop termination | P1 | S1 |
| The Mind-Reader | assume subagents inherit context | P2/P6 | S2 |
| The Narrow Decomposer | too-narrow task decomposition | P6 | S2 |
| The Polite Asker | prompt instead of hook for business rule | P1 | S3 |
| The Hoarder | 18 tools on one agent | P3 | S4 |
| The Mumbler | vague/overlapping tool descriptions | P3 | S4 |
| Old Faithful Failure | generic "Operation failed" errors | P4 | S4 |
| The Secret-Spiller | hardcoded keys in `.mcp.json` | P3 | S5 |
| The Bash Bludgeon | Bash when a built-in tool fits | P3 | S5 |
| The Oversharer | personal prefs in project-scope config | P3 | S6 |
| The Sledgehammer | plan mode / heavy fix for a tiny job | P3 | S7 |
| The Self-Marker | same-session self-review | P5 | S7 |
| The Vague Vizier | "be conservative" / "find all issues" | P1 | S8 |
| The Eternal Retrier | retry when the data is simply absent | P3/P4 | S9 |
| The Summarizer of Doom | progressive summarization of exact facts | P2 | S10 |
| The Average-Hider | aggregate accuracy masking per-type failure | P5 | S10 |
| The Sentiment-Based Escalator | escalate on frustration/self-confidence | P1/P5 | S11 |
| The Silent Reconciler | arbitrarily pick one conflicting source | P7 | S11 |
