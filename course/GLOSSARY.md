# Glossary — plain English + the exact exam token

Each entry: what it means, the exact token the exam uses, and which principle it serves (P1–P7, see
`SOURCE.md`). Where the v0.1 guide lags the live product, you'll see `EXAM:` / `NOW:`.

## Agents & loops
- **agent** — a model that can reason, call tools, and decide its next step in a loop.
- **agentic loop** — ask model → check `stop_reason` → if a tool was requested, run it and **append the result to the conversation** → repeat → stop when done. *(P1)*
- **`stop_reason`** — the API field that controls the loop. **`tool_use`** = run the tool and continue; **`end_turn`** = stop. `EXAM:` also know `max_tokens` (ran out of room — do NOT treat as done). `NOW:` the live API also returns `stop_sequence`, `pause_turn`, `refusal`, `model_context_window_exceeded`. Principle: handle *every* stop reason, never assume binary. *(P1)*
- **coordinator** — the hub agent that decomposes work, delegates to subagents, routes all comms/errors, and aggregates. *(P6)*
- **subagent** — a scoped helper. **Does NOT inherit the coordinator's context** — you pass what it needs explicitly. *(P2, P6)*
- **`Task` tool** — the mechanism to spawn a subagent. The coordinator's **`allowed_tools` must include `"Task"`**; don't give subagents `Task` (no recursive spawn). Parallel subagents = multiple `Task` calls in one response. *(P6)*
- **`AgentDefinition`** — per-subagent config: description, system prompt, tool restrictions. *(P6)*
- **`fork_session`** — branch from a shared baseline to explore divergent approaches. **`--resume <session-name>`** resumes a named session. *(P2)*
- **hook** — deterministic code that runs on a tool event: **`PreToolUse`** (intercept/ block an outgoing call, e.g. refunds > $500) and **`PostToolUse`** (normalize a result). The way to *guarantee* a rule instead of asking the model nicely. *(P1)*
- **prerequisite gate** — block a downstream tool until a precondition holds (e.g. block `process_refund` until `get_customer` returns a verified ID). *(P1)*

## Tools & MCP
- **tool description** — the PRIMARY thing the model uses to pick a tool. Include input formats, examples, edge cases, boundaries. Vague/overlapping descriptions cause misrouting. *(P3)*
- **structured error** — an error the agent can act on: **`isError`**, **`errorCategory`** (transient / validation / business / permission), **`isRetryable`** / **`retriable: false`**. Beats "Operation failed". *(P4)*
- **access failure ≠ empty result** — a failed lookup is not "zero matches". Conflating them hides problems. *(P4)*
- **tool budget** — ~**4–5 tools per agent**; ~18 degrades selection. Scope tools to the role. *(P3)*
- **`tool_choice`** — `"auto"` (model may answer without a tool), `"any"` (must use some tool), forced `{"type":"tool","name":"..."}` (must use that exact tool). `NOW:` also `{"type":"none"}`; incompatible with extended thinking. *(P3)*
- **MCP** — Model Context Protocol; how external tools/resources are exposed. **`.mcp.json`** = project-level, shared via version control; **`~/.claude.json`** = user-level, personal. Use **`${ENV_VAR}`** expansion for secrets — never hardcode keys. *(P3)*
- **MCP resource** — a content catalog exposed via MCP to cut exploratory tool calls. *(P3)*
- **built-in tools** — **Grep** = file *contents*; **Glob** = file *names/paths* (`**/*.test.tsx`); **Read/Write** = full file; **Edit** = targeted unique-match; Edit fails on non-unique → **Read + Write**. `NOW:` ~27 built-ins exist; same selection logic. *(P3)*

## Claude Code config
- **CLAUDE.md hierarchy** — user `~/.claude/CLAUDE.md` (personal, NOT shared) → project `.claude/CLAUDE.md` or root `CLAUDE.md` (shared) → directory `CLAUDE.md`; more specific overrides. *(P3)*
- **`@import`** — pull modular files into CLAUDE.md (≤5 levels). **`/memory`** — see which memory files are loaded. *(P3)*
- **command vs skill vs CLAUDE.md** — command (`.claude/commands/`, simple slash shortcut, project=shared/user=personal) · skill (`.claude/skills/<name>/SKILL.md`, on-demand workflow, frontmatter **`context: fork`** for isolation, **`allowed-tools`**, **`argument-hint`**) · CLAUDE.md (always-loaded standards). *(P3)*
- **path-specific rule** — `.claude/rules/` file with YAML frontmatter **`paths:`** globs; loads only for matching files. `NOW:` `paths:` has bugs; community uses `globs:`; project-scope only. *(P3)*
- **plan mode vs direct execution** — plan mode for architectural/multi-file work; direct for small clear changes. **Explore subagent** isolates verbose discovery. *(P3)*
- **CI flags** — **`-p` / `--print`** = non-interactive (stops pipeline hangs); **`--output-format json`** + **`--json-schema`** = machine-parseable output. *(P3)*

## Prompting & structured output
- **explicit criteria** — specific, categorical rules beat "be conservative" / "high-confidence". *(P1)*
- **few-shot** — **2–4 examples incl. an edge case**; more isn't better. *(P3)*
- **structured output via `tool_use`** — a JSON schema guarantees *shape* (no **syntax** errors) but NOT **semantics** (totals can still be wrong). *(P3, P5)*
- **schema design** — `required` vs optional; **`enum` with `"other"` + detail**; **nullable** so the model returns null instead of fabricating; `"unclear"` for ambiguous. *(P4)*
- **validation-retry** — append the **specific** error on retry. **Retries are useless when the data is absent from the source** (only fixes format/structure). *(P3, P4)*
- **`detected_pattern`** — field that surfaces systematic (not one-off) failures. `calculated_total` vs `stated_total` + `conflict_detected` = self-checking. *(P4, P5)*

## Reliability & context
- **context window** — the finite, ordered working set the model reasons over. Not memory. *(P2)*
- **lost in the middle** — models reliably use the start and end of a long input, may drop the middle. Put key facts first. *(P2)*
- **progressive summarization risk** — condensing exact amounts/dates into vague summaries loses what matters. *(P2)*
- **case-facts block** — exact values (amounts, dates, order #s, statuses) kept in every prompt, outside the summary. *(P2)*
- **`/compact`** / **scratchpad** / **structured state (manifest)** — counters to context degradation in long sessions. *(P2, P5)*
- **Batch (Message Batches API)** — 50% cost, up to 24-hr window, no SLA, `custom_id` to correlate; for non-blocking work. `EXAM:` "no multi-turn tool calling"; `NOW:` tool results just require the next request. *(P3)*
- **independent review / multi-pass** — a fresh instance catches what same-session self-review can't; per-file pass + cross-file pass. *(P5)*
- **aggregate masking** — a 97% average can hide 0% on one doc type. Use **stratified sampling** + **field-level confidence**; route low-confidence to humans. *(P5)*
- **escalation** — hand off to a human. **Valid triggers:** explicit request, policy gap, no progress. **INVALID:** sentiment/frustration, the model's self-reported confidence. *(P1, P5)*
- **provenance** — keep **claim → source mappings** (URL, doc, excerpt), **temporal data** (dates), and **annotate conflicts** instead of silently picking one. *(P7)*
