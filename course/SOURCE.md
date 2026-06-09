# SOURCE — Study Framework

**This is the source of truth for this course. If a lesson and this file disagree, this file wins.**

This file is an **original study framework** — not a reproduction of any exam guide. It is built on:
- The seven root principles (this course's original framing)
- Publicly documented Claude behaviors (Anthropic docs, SDK reference, Claude Code docs)
- Community-published exam structure facts (domain weights, format — sourced from `claudecertifications.com`)

For the official exam guide, register at the **[Anthropic Skilljar portal](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request)** and study it directly.

> ⚠️ **EXAM TRUTH vs CURRENT TRUTH.** The exam is scored against the v0.1 (Feb 2025) guide.
> The live product has since moved on. This course teaches **the exam answer (to pass)** and
> **flags the current reality (so you don't learn a stale fact as permanent)**. Every place
> they differ is marked `EXAM:` / `NOW:`.

---

## Exam format
- Multiple choice, scenario-based. Each question = **1 correct + 3 distractors**; pick the single best.
- Distractors = options a candidate with incomplete knowledge would plausibly choose.
- **No penalty for guessing**; unanswered = incorrect.
- **Scaled score 100–1,000. Passing = 720.** Pass/fail.
- During the exam, **4 of the 6 scenarios are presented, picked at random.**
- Target candidate: solution architect with hands-on experience building production Claude systems.

## Domain weights (community-published)
| Domain | Weight |
|---|---|
| D1 Agentic Architecture & Orchestration | **~27%** |
| D2 Tool Design & MCP Integration | **~18%** |
| D3 Claude Code Configuration & Workflows | ~20% |
| D4 Prompt Engineering & Structured Output | ~20% |
| D5 Context Management & Reliability | ~15% |

*Source: [claudecertifications.com/claude-certified-architect](https://claudecertifications.com/claude-certified-architect). Study the official portal for authoritative weights.*

## The 6 scenarios (community-published names)
1. **Customer Support Resolution Agent** — D1, D2, D5
2. **Code Generation with Claude Code** — D3, D5
3. **Multi-Agent Research System** — D1, D2, D5
4. **Developer Productivity with Claude** — D2, D3, D1
5. **Claude Code for CI/CD** — D3, D4
6. **Structured Data Extraction** — D4, D5

---

## The first-principles spine (how to think, not what to memorise)

Every anti-pattern below is a **violation of one root principle**. Learn the principle and you can
re-derive any answer — on the exam and at work.

**Meta-principle:** *The LLM is one probabilistic component in a system. Architecture is everything
you wrap around it.* Correct answers reach for the systems fix (deterministic control, curated
context, independent verification, sound structure). Distractors reach for "ask the model harder"
(better prompt, more retries, self-reported confidence, sentiment) or a disproportionate fix
(classifier, fine-tune, bigger model/context).

| P | Principle |
|---|---|
| **P1** | Determinism for the correctness-critical; the model for judgment. |
| **P2** | Context is a finite, ordered, decaying working set — not memory. |
| **P3** | Match the mechanism to the problem's shape and cost. |
| **P4** | Make failure legible — distinguish failure *types*, propagate structured error context. |
| **P5** | Verification independent of generation; measurement disaggregated. |
| **P6** | Decomposition buys reliability only if coverage is complete and the seams are managed. |
| **P7** | Preserve provenance and uncertainty — never silently collapse conflict or source. |

---

## Domain 1 — Agentic Architecture & Orchestration [P1, P2, P4, P6]

**Core concept:** The agentic loop is a deterministic control structure. `stop_reason` — not
natural language — drives it. `tool_use` → execute and append result; `end_turn` → stop.
Parsing assistant text for completion signals is an anti-pattern (P1).

**Multi-agent hub-and-spoke:** A coordinator routes all inter-subagent communication and errors.
Subagents do NOT inherit coordinator context — it is passed explicitly (P2, P6). Too-narrow
decomposition leaves coverage gaps (P6).

**Subagent invocation:** The `Task` tool spawns subagents. Coordinator needs `"Task"` in
`allowedTools`; subagents do not (prevents recursive spawn). `fork_session` branches from a
shared baseline. Parallel invocation = multiple `Task` calls in one response. Pass structured
findings, not raw verbose content (P7).

**Hooks for enforcement:** `PreToolUse` / `PostToolUse` run as deterministic code — not prompts.
Use hooks for any compliance requirement where a non-zero prompt failure rate is unacceptable (P1).

**Handoff:** Structured handoff (customer details, root cause, recommended next action) is required
for multi-step workflows. Prerequisite gates block downstream tools until upstream conditions are
confirmed (P1, P4).

**Session state:** `--resume` to continue; `fork_session` for branches; always inform the agent of
file changes on resume. New session with structured summary > resuming with stale tool results (P2).

**Decomposition:** Fixed sequential (prompt chaining) vs dynamic adaptive. Per-unit analysis +
separate integration pass avoids attention dilution (P3, P6).

*Docs: [Agent SDK](https://docs.anthropic.com/en/docs/agents) · [Claude Code hooks](https://docs.anthropic.com/en/docs/claude-code)*

---

## Domain 2 — Tool Design & MCP Integration [P3, P4, P7]

**Tool descriptions** are the primary selection mechanism — include input formats, example queries,
edge cases, and boundaries. Overlapping descriptions cause misrouting. System-prompt wording also
affects selection (P3).

**Structured errors:** Use `isError` flag; distinguish `errorCategory` (transient / validation /
business / permission); set `isRetryable` boolean. Generic "Operation failed" prevents recovery.
Access failures ≠ valid empty results (P4). Subagents recover transient errors locally; propagate
only unresolvable failures with partial results + what was attempted.

**Tool count:** ~4–5 tools per agent for reliable selection; 18+ tools degrades selection quality.
Scope tool access per role. `tool_choice`: `"auto"` / `"any"` / forced `{"type":"tool","name":"..."}` (P3).
- `NOW:` `tool_choice` also accepts `{"type":"none"}`. Incompatible with extended thinking (only `auto`/`none` allowed with thinking).

**MCP config:** `.mcp.json` (project-level, shared via VCS) vs `~/.claude.json` (user-level, personal).
Use `${ENV_VAR}` expansion for secrets — never commit credentials. Tools from all servers are
discovered at connection time. MCP resources expose content catalogs to reduce exploratory calls.
Prefer community MCP servers for standard integrations (P3).

**Built-in tools:** Grep = content search; Glob = filename/path patterns; Read/Write = full file;
Edit = targeted unique-match (fails on non-unique → Read+Write fallback). Explore incrementally
(Grep entry points → Read to follow imports) (P3).
- `NOW:` Claude Code exposes ~27 built-in tools (Task, WebFetch, WebSearch, TodoWrite, NotebookEdit, …).

*Docs: [Tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) · [MCP](https://docs.anthropic.com/en/docs/mcp)*

---

## Domain 3 — Claude Code Configuration & Workflows [P1, P3, P5]

**CLAUDE.md hierarchy:** User `~/.claude/CLAUDE.md` (personal, NOT shared) → project `.claude/CLAUDE.md`
or root `CLAUDE.md` (shared via VCS) → directory-level `CLAUDE.md`. More specific overrides. `@import`
for modular includes (≤5 levels). `.claude/rules/` for topic files. `/memory` to verify loaded files (P3).

**Commands & skills:** Project `.claude/commands/` (shared) vs user `~/.claude/commands/` (personal).
Skills = `.claude/skills/<name>/SKILL.md` with frontmatter `context: fork` (isolated sub-agent context,
prevents output polluting main conversation), `allowed-tools`, `argument-hint`. Skills = on-demand task
workflows; CLAUDE.md = always-loaded standards; commands = lightweight shortcuts (P3).

**Path-specific rules:** `.claude/rules/` YAML frontmatter `paths:` globs (e.g. `paths: ["terraform/**/*"]`);
loads only when editing matching files. Better than directory CLAUDE.md for conventions spanning many dirs.
- `NOW:` `paths:` has known bugs; community uses `globs:`; project-level only.

**Plan mode vs direct execution:** Plan mode for complex/architectural/multi-file changes; direct execution
for simple well-scoped tasks. Explore subagent isolates verbose discovery. Combine as needed (P3).
- `NOW:` `/plan`, Shift+Tab cycle, `--permission-mode plan`, `/ultraplan` (Apr 2026).

**Iterative refinement:** 2–3 concrete input/output examples; test-driven iteration (tests first, share
failures); interview pattern (Claude asks clarifying questions); single message for interacting problems,
sequential for independent ones (P3, P5).

**CI/CD:** `-p` / `--print` non-interactive (prevents pipeline hang). `--output-format json` +
`--json-schema` for machine-parseable output. CLAUDE.md supplies CI context. Same-session self-review
is weaker than an independent review instance (P3, P5).

*Docs: [Claude Code](https://docs.anthropic.com/en/docs/claude-code)*

---

## Domain 4 — Prompt Engineering & Structured Output [P1, P3, P4, P5]

**Explicit criteria:** Specific categorical criteria > vague ("be conservative", "only high-confidence").
High false-positive categories erode trust; define severity with concrete examples (P1, P3).

**Few-shot:** 2–4 targeted examples (incl. ambiguous/edge cases) > detailed instructions alone.
Enables generalization; reduces extraction hallucination (P3).

**Structured output via `tool_use` + JSON schema:** Guarantees schema-compliance, eliminates **syntax**
errors but **NOT semantic** errors (line items not summing, wrong-field values). Schema patterns: required
vs optional, `enum` with `"other"` + detail string, nullable to prevent fabrication, `"unclear"` enum for
ambiguous inputs (P3, P4, P5).

**Validation/retry:** Retry with specific error feedback appended; retries are useless when the
information is absent from source (vs format/structural errors which retry fixes). Emit `calculated_total`
vs `stated_total` + `conflict_detected` to surface semantic errors (P4, P5).

**Batch processing:** Message Batches API — 50% cost savings, up to 24-hr window, no latency SLA.
`custom_id` correlates request/response. Batch for non-blocking/overnight; synchronous for
blocking pre-merge checks (P3).
- `EXAM:` "no multi-turn tool calling in a batch." `NOW:` nuance — batches support multi-turn convos;
  the limit is that tool results require the next request (no mid-request tool iteration).

**Multi-instance review:** Self-review retains generation reasoning → blind spots. Independent review
instance catches more. Multi-pass = per-file local pass + cross-file integration pass (avoids attention
dilution). Confidence self-report for calibrated routing (P5).

*Docs: [Prompt engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) · [Tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) · [Message Batches](https://docs.anthropic.com/en/docs/build-with-claude/message-batches)*

---

## Domain 5 — Context Management & Reliability [P2, P4, P5, P7]

**Preserve context across long interactions:** Progressive summarization risk (condensing exact
numbers/dates into vague summaries). "Lost in the middle" — models reliably use beginning & end,
may drop middle content. Tool results consume tokens disproportionately. Mitigation: "case facts" block
(amounts, dates, order #s, statuses) in every prompt outside summarized history; trim verbose tool output;
place key findings at the start (P2).

**Escalation & ambiguity:** Valid escalation triggers = explicit customer request for human, policy
gaps/exceptions, inability to make meaningful progress. Invalid = sentiment/frustration, self-reported
confidence scores (poor proxies for actual complexity). Honor explicit human requests immediately.
Multiple customer matches → ask for more identifiers, don't guess (P1, P5).

**Error propagation (multi-agent):** Structured error context (failure type, attempted query, partial
results, alternatives tried). Access failures ≠ valid empty results. Silent suppression (empty = success)
and terminating the whole workflow on one failure are both anti-patterns. Local recovery before
propagation (P4).

**Context in large codebase exploration:** Context degradation — model drifts to "typical patterns"
vs specific findings made earlier. Mitigations: scratchpad files, subagent delegation for verbose
discovery, structured state exports/manifests for crash recovery, `/compact` to reduce usage (P2, P5).

**Human review & confidence calibration:** Aggregate accuracy (e.g. 97%) can mask poor per-type/per-field
performance. Stratified random sampling; field-level confidence calibrated with labeled validation sets.
Route low-confidence/ambiguous to human review. Validate by document type and field before automating (P5).

**Provenance & uncertainty in multi-source synthesis:** Preserve claim-source mappings (source URL,
doc name, excerpt) through synthesis. Conflicting credible sources → annotate conflict with attribution,
don't arbitrarily pick one. Temporal data (publication/collection dates) prevents misreading time
differences as contradictions. Separate well-established vs contested findings (P7).

*Docs: [Context windows](https://docs.anthropic.com/en/docs/build-with-claude/context-windows) · [Agents](https://docs.anthropic.com/en/docs/agents)*

---

## In-scope / Out-of-scope (the boundary IS testable)
**In-scope:** agentic loop impl, multi-agent orchestration, subagent context mgmt, tool interface design,
MCP tool/resource design, MCP server config, error handling/propagation, escalation decision-making,
CLAUDE.md config, custom commands & skills, plan vs direct execution, iterative refinement, structured
output via `tool_use`, few-shot, batch processing, context window optimization, human review workflows,
information provenance.

**Out-of-scope (will NOT appear):** fine-tuning/training custom models; API auth/billing/account mgmt;
deep language/framework impl; deploying/hosting MCP servers (infra/networking/containers); Claude
internal architecture/training/weights; Constitutional AI/RLHF/safety training; embeddings/vector DB impl;
computer use; vision/image analysis; streaming API/SSE; rate limits/quotas/pricing; OAuth/key-rotation;
specific cloud (AWS/GCP/Azure) configs; perf benchmarking/model comparison; prompt-caching impl details
(beyond knowing it exists); token-counting/tokenization specifics.

---

## Anti-patterns — the 18 distractors (spot them, eliminate 2–3 options instantly)

*Source: [claudecertifications.com/claude-certified-architect/anti-patterns](https://claudecertifications.com/claude-certified-architect/anti-patterns) — community-published, not Anthropic NTK.*

**10 critical · 7 high · 1 medium · 18 total**

### D1 — Agentic Architecture (5 patterns)

| Severity | Anti-pattern | Instead |
|---|---|---|
| **CRITICAL** | Parsing natural language for loop termination | Check `stop_reason` — `tool_use` → continue, `end_turn` → stop |
| **CRITICAL** | Arbitrary iteration caps as primary stopping mechanism | Let the loop terminate naturally via `stop_reason`; caps as a safety ceiling only |
| **CRITICAL** | Prompt-based enforcement for critical business rules | Programmatic hooks (`PreToolUse`/`PostToolUse`) for deterministic compliance |
| HIGH | Sentiment-based escalation to human agents | Escalate on task complexity, policy gaps, explicit customer request — not sentiment |
| HIGH | Self-reported confidence scores for decision-making | Structured criteria + programmatic checks; model confidence is a poor proxy |

### D2 — Tool Design & MCP (4 patterns)

| Severity | Anti-pattern | Instead |
|---|---|---|
| **CRITICAL** | Generic error messages (`'Operation failed'`) | Structured errors: `isError`, `errorCategory`, `isRetryable`, context of what was attempted |
| **CRITICAL** | Silently returning empty results for access failures | Explicitly distinguish access failure from "checked and found nothing" |
| **CRITICAL** | Hardcoding API keys in `.mcp.json` | `${ENV_VAR}` expansion — never commit credentials |
| HIGH | Giving one agent 18+ tools | ~4–5 tools per agent for reliable selection; scope access per role |

### D3 — Claude Code Config (3 patterns)

| Severity | Anti-pattern | Instead |
|---|---|---|
| **CRITICAL** | Same-session self-review in CI/CD pipelines | Independent review instance — same-session review retains generation reasoning (blind spots) |
| HIGH | Using commands for complex tasks that need context isolation | Use skills with `context: fork` for isolation and `allowed-tools` restrictions |
| MEDIUM | Putting personal preferences in project-level `CLAUDE.md` | Personal preferences → `~/.claude/CLAUDE.md`; project level is for team standards |

### D4 — Prompt Engineering (3 patterns)

| Severity | Anti-pattern | Instead |
|---|---|---|
| **CRITICAL** | Vague instructions like `'be thorough'` or `'find all issues'` | Specific categorical criteria with examples; vague = false positives + alert fatigue |
| HIGH | Assuming `tool_use` guarantees semantic correctness | `tool_use` guarantees schema compliance (no syntax errors), not semantic validity |
| HIGH | Generic retry messages: `'There were errors, please try again'` | Specific error feedback: which field failed, what was wrong, what was expected |

### D5 — Context & Reliability (3 patterns)

| Severity | Anti-pattern | Instead |
|---|---|---|
| **CRITICAL** | Progressive summarization of critical customer details | Immutable "case facts" block (amounts, dates, IDs) pinned at prompt start every turn |
| **CRITICAL** | Aggregate accuracy metrics only (e.g. `'95% overall'`) | Stratified metrics per document type — aggregate masks per-type failures |
| HIGH | No provenance tracking for multi-agent data | Preserve source + confidence + timestamp through synthesis; annotate conflicts, don't collapse them |

---

## Practice questions (14 of 25 — source: claudecertifications.com)

*From [claudecertifications.com/claude-certified-architect/practice-questions](https://claudecertifications.com/claude-certified-architect/practice-questions). Full interactive set of 25 at that URL. Answer key below — try the questions before reading.*

---

**Q1 · D1 · Agentic Architecture**
You are building a customer support agent using the Claude Agent SDK. How should the agentic loop determine when to stop iterating?

A. Parse the assistant's text response to check if it says 'task complete'
B. Set a maximum iteration limit of 10 and stop when reached
**C. Check the `stop_reason` field — continue on `'tool_use'`, terminate on `'end_turn'`** ✓
D. Monitor the conversation length and stop after a set number of messages

*Why C:* Parsing natural language for completion is unreliable. Arbitrary caps and message counts are anti-patterns. `stop_reason` is the deterministic control signal.

---

**Q2 · D1 · Agentic Architecture**
In a multi-agent research system, what is the best practice for passing context from a coordinator to subagents?

A. Share the full coordinator conversation history with each subagent
B. Let subagents access a shared global state object
**C. Pass explicit, relevant context specific to each subagent's task** ✓
D. Use a shared database that all agents read from and write to

*Why C:* Full coordinator history = context pollution. Shared state creates coupling and race conditions. Each subagent gets only what it needs — context isolation is a core principle.

---

**Q6 · D3 · Claude Code Config**
Where should team-wide coding standards for a project be configured in Claude Code?

A. `~/.claude/CLAUDE.md` (user-level)
**B. `.claude/CLAUDE.md` (project-level)** ✓
C. In each individual source file as comments
D. In environment variables

*Why B:* Project-level config is shared via VCS — the whole team gets it. User-level is for personal preferences only.

---

**Q10 · D5 · Context & Reliability**
In a long-running agent session, you notice the quality of responses is degrading. What is the recommended approach?

A. Increase the model's temperature to introduce more variation
B. Restart the session from scratch
**C. Use `/compact` to compress history, persist critical state to scratchpad files, and delegate verbose exploration to subagents** ✓
D. Switch to a model with a larger context window

*Why C:* Context degradation is real and predictable. `/compact` + scratchpad + subagent delegation keeps the coordinator's context clean and usable. A larger window delays but doesn't solve it.

---

**Q11 · D5 · Context & Reliability**
A data extraction agent reports 95% overall accuracy, but stakeholders report poor results on invoices. What metric approach should you use?

A. Increase the overall sample size to get more accurate aggregate metrics
**B. Track accuracy per document type (invoices, receipts, contracts) instead of only aggregate metrics** ✓
C. Add more few-shot examples for invoices
D. Use a self-review step to catch invoice extraction errors

*Why B:* Aggregate accuracy masks per-type failures. 70% accuracy on invoices + 99% on receipts can still average to 95%. Stratified metrics are required to find real problems.

---

**Q12 · D5 · Context & Reliability**
A subagent fails to retrieve data from an API due to a permissions error. How should it report this to the coordinator?

A. Return an empty result set
B. Return a generic error: 'Data retrieval failed'
**C. Return structured context: what was attempted, the error type (access failure), and distinguish this from 'checked and found nothing'** ✓
D. Silently skip the failed data source and proceed with other sources

*Why C:* Access failure ≠ empty result. Empty masks failure as success. Generic loses context. Silently skipping means the coordinator makes decisions without knowing data is missing.

---

**Q13 · D1 · Agentic Architecture**
You need to explore an alternative API design without affecting your main Claude Code session. What should you use?

A. Start a new terminal window and run Claude Code there
**B. Use `fork_session` to create a branched session for exploration** ✓
C. Use `/compact` to clear the current context first
D. Save your work, restart Claude Code, and explore in the fresh session

*Why B:* `fork_session` inherits the current context and diverges from that point — changes in the fork don't affect the main session. New terminal loses context; restart loses all session state.

---

**Q14 · D2 · Tool Design & MCP**
You're configuring an MCP server for your team's Jira integration. Where should the Jira API token be stored?

A. Directly in `.mcp.json` as a string value
B. In a comment in `.mcp.json` with instructions to replace it
**C. Using environment variable expansion: `${JIRA_TOKEN}` in `.mcp.json`** ✓
D. In a separate `secrets.json` file that is gitignored

*Why C:* `${ENV_VAR}` expansion keeps secrets out of VCS while allowing the config to be shared. Hardcoding in any committed file is a critical anti-pattern.

---

**Q15 · D3 · Claude Code Config**
A developer wants to configure Claude Code to always use their preferred terminal color scheme. Where should this go?

A. `.claude/CLAUDE.md` in the project root
**B. `~/.claude/CLAUDE.md` in their home directory** ✓
C. `src/CLAUDE.md` in the source directory
D. In the project's `package.json` under a claude config key

*Why B:* Personal preferences belong in user-level config (not shared via VCS). Project-level imposes your personal settings on the whole team.

---

**Q17 · D1 · Agentic Architecture**
In a multi-agent research system, the coordinator needs to pass context to a subagent responsible for market analysis. What is the correct approach?

A. Share the entire coordinator conversation history for maximum context
**B. Pass only the specific research question and relevant parameters for the market analysis task** ✓
C. Let the subagent access a shared database to read the coordinator's state
D. Pass a summarized version of all previous subagent results

*Why B:* Each subagent gets only the context relevant to its task. Full history wastes tokens and introduces noise. Shared databases create coupling. Other subagents' results are mostly irrelevant.

---

**Q18 · D2 · Tool Design & MCP**
An agent needs to modify line 42 of an existing TypeScript file. Which built-in tool should it use?

A. Write — to create the file with the updated content
B. Bash — to use `sed` or a similar command-line tool
**C. Edit — to make a targeted change to the existing file** ✓
D. Read the file first, then Write the entire file back with the change

*Why C:* Edit makes targeted, unique-match changes without touching the rest of the file. Write replaces the entire file (risk of data loss). Bash with sed is an anti-pattern when a purpose-built tool exists.

---

**Q19 · D3 · Claude Code Config**
You want to create a reusable refactoring behavior that runs in isolation from the main session and can only use Read, Edit, and Grep tools. What should you create?

A. A custom command in `.claude/commands/refactor.md`
**B. A skill in `.claude/skills/refactor/SKILL.md` with `context: fork` and `allowed-tools`** ✓
C. A script in `.claude/scripts/refactor.sh`
D. A prompt template in `.claude/prompts/refactor.md`

*Why B:* Skills support `context: fork` (isolation) and `allowed-tools` (tool restriction). Commands run in the current session without either. `.claude/scripts/` and `.claude/prompts/` are not Claude Code conventions.

---

**Q22 · D5 · Context & Reliability**
Two subagents return different revenue figures: one from a financial database (verified), another from a quarterly PDF (extracted). How should the coordinator resolve this?

A. Average the two values for a best estimate
B. Always trust the most recent value regardless of source
**C. Use information provenance — trust the verified database source over the extracted PDF** ✓
D. Ask the user to decide which value to use

*Why C:* Provenance (source + confidence + timestamp) enables informed conflict resolution. Verified database > extracted PDF. Averaging financial data is statistically unsound. Recency doesn't indicate reliability.

---

**Q24 · D3 · Claude Code Config**
Your team wants to run a nightly code quality audit across the entire codebase using Claude Code. What is the most cost-effective approach?

A. Run `claude -p` synchronously for each file in a loop
**B. Use the Message Batches API for non-urgent batch processing (50% cost savings)** ✓
C. Run multiple Claude Code instances in parallel
D. Schedule a single long-running Claude Code session overnight

*Why B:* Batches API = 50% cost reduction, 24h window — designed for exactly this. Synchronous costs twice as much. Parallel instances don't reduce per-request cost. A single long session degrades.

---

**Q25 · D4 · Prompt Engineering**
Your validation-retry loop for invoice extraction keeps failing. The retry message says 'There were errors in your extraction. Please try again.' What should you change?

A. Increase the maximum number of retries from 3 to 10
B. Switch to a more capable model for the retry attempts
**C. Replace the generic message with specific error details: which fields failed, what was wrong, and what was expected** ✓
D. Add more few-shot examples to the initial prompt

*Why C:* Generic retry messages give the model no signal for what to fix. Specific feedback — `'The date field contains 2024-13-45 which is not a valid date'` — gives a clear correction target. More retries with the same vague message won't help. Few-shot examples help initial extraction, not retry correction.

---

## Study resources
See **[RESOURCES.md](RESOURCES.md)** for the full resource list — free Anthropic courses, official
portal, community study materials, and exam registration.

---

## About this framework
Original study framework built on publicly documented Claude behaviors (Anthropic API docs, Claude Code
docs, Agent SDK reference) and community-published exam structure facts. First-principles framing and
EXAM:/NOW: annotations are original. Not affiliated with or endorsed by Anthropic. Built with
[create-course](https://github.com/eugeniawang/create-course).
