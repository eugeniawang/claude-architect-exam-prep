### Session 7 — Plan Mode, Iteration & CI/CD

**Domain 3.4, 3.5, 3.6, 4.5, 4.6 · Principles P3, P5 · Nemeses: The Sledgehammer, The Self-Marker**

---

#### Overview
The pipeline is hanging. The manager wants 50% cost savings on batch processing. The 14-file PR review gives contradictory feedback. The architect wants to plan a monolith-to-microservices migration and Claude keeps starting to write code. Each problem is a mechanism mismatch. This session gives you the decision tree for all four.

---

#### Skill Built
Choose correctly between plan mode and direct execution, configure Claude Code for CI/CD non-interactive runs, apply the Message Batches API correctly (including where it must *not* be used), and split large reviews to avoid attention dilution.

---

#### Prerequisites / Foundations
- Basic familiarity with running Claude Code from the command line.
- CI/CD pipelines run non-interactively — no human is there to answer prompts.
- The Message Batches API is a separate request pathway with different timing guarantees.

---

#### Do This First
Without running it, predict: what happens when a CI pipeline calls `claude "Analyse this PR"` without any flags? It hangs — waiting for follow-up input that never comes. Now predict: which single flag prevents that? Confirm your answer by running `claude --help | grep -E "\-p|print|output-format|json"`.

---

#### What Just Happened
`-p` / `--print` puts Claude Code in non-interactive mode: run the prompt, print the result, exit. Without it, Claude Code waits for follow-up. In CI, that wait is infinite — the job hangs until timeout.

`--output-format json` combined with `--json-schema` returns structured output a downstream step can parse. Put your CI-relevant context (test standards, review criteria) in the repo's CLAUDE.md — then you don't have to stuff it all into the command-line prompt.

---

#### Guided Practice
**Exercise 7a — Plan mode decision.** For each scenario, decide: plan mode or direct execution?

1. Fix a null-pointer exception in a single function. → **Direct** — well-scoped, clear correct answer.
2. Migrate a monolith to microservices across 45+ files. → **Plan mode** — large-scale, architectural, multi-file.
3. Add a `createdAt` timestamp field to one model and its TypeScript interface. → **Direct** — two files, well-scoped.
4. Choose between three architectural approaches for a new caching layer. → **Plan mode** — choosing between approaches is exactly what plan mode is for.
5. Rename a CSS class across 12 files. → **Direct** — mechanical, well-defined, even across many files.

**Exercise 7b — CI/CD config.** Write the correct `claude` invocation for a CI step that reviews a PR non-interactively, returns structured JSON, uses the project's CLAUDE.md for review criteria, and must not hang. Key ingredients: `-p` flag, `--output-format json`, `--json-schema` with your schema. CLAUDE.md handles the review criteria; the command handles the mechanics.

---

#### Explain It Back
Why is same-session self-review weaker than review by an independent instance?

- When a model generates output and then reviews it in the same session, the reasoning that produced the output is still in context. The blind spots from generation become blind spots in review.
- An independent instance starts fresh: no prior reasoning, no anchoring to the original approach. It reads the output like a stranger.
- P5 — verification must be independent of generation, with disaggregated measurement. "Independent" is the load-bearing word.

---

#### Pattern / Anti-pattern
**Good pattern — Plan mode for architectural decisions:** user enters plan mode before any code is written; Claude produces decomposition options, seam identification, migration sequence, and risk per phase; user reviews and approves; then execution begins. Plan mode prevents "Claude just started writing code" for work where seeing full scope before touching anything is the value.

**Nemesis: The Sledgehammer**

Uses plan mode for everything. Single-file bug fix? Plan mode. Rename a variable? Plan mode. The overhead is disproportionate and you're waiting for a plan you didn't need. Violates **P3**. Counter-signal: if you can write the fix in one sentence, use direct execution.

**Nemesis: The Self-Marker**

Runs the review in the same session that generated the code. "I'll just have Claude check its own work." This is the author proofreading their own draft. Fix: use a separate independent review instance. Multi-pass review: per-file local pass for line-level issues, then a separate cross-file integration pass for interface mismatches, missing error propagation, and broken contracts between modules. Violates **P5 — verification independent of generation, with disaggregated measurement.** Per-file metrics and cross-file structural correctness are different things; measure both separately.

**Batch API — use it right:** the Message Batches API offers roughly 50% cost savings but has no latency guarantee and a result window of up to 24 hours. Use it for non-blocking, non-time-sensitive work (overnight reports, bulk classification). Do NOT use it for anything that blocks a human or a deployment. `custom_id` is your correlation key when polling for results. EXAM note: treat batch as non-interactive and non-blocking; multi-turn tool calling requires a new request per tool result.

---

#### Scenario Check
**Scenario A** (mirrors official Q5):

> A team is beginning a migration from a monolith to microservices. The work will touch dozens of files across multiple modules. What is the best first step in Claude Code?
>
> **A.** Enter plan mode to generate a structured migration plan before writing any code.
> **B.** Begin direct execution immediately; Claude will figure out the structure as it goes.
> **C.** Write a detailed prompt specifying every file to be changed upfront before starting.
> **D.** Start with plan mode, then switch to direct execution once the first module is clear.

**Correct answer: A.** Plan mode is designed for complex, multi-file, architectural work where seeing full scope before touching anything is the value. B produces inconsistent decomposition across 45+ files — the cleanup costs more than the plan would have. C requires knowing all the files upfront, which you don't — that's what the plan discovers. D implies switching mid-plan; A means generate a full plan, review it, then execute.

---

**Scenario B** (mirrors official Q10):

> A CI pipeline runs `claude "Analyse this PR and flag blocking issues"` as a quality gate. The pipeline hangs indefinitely on every run. What is the fix?
>
> **A.** Add the `-p` flag: `claude -p "Analyse this PR and flag blocking issues"`
> **B.** Set the environment variable `CLAUDE_HEADLESS=true` before the command.
> **C.** Redirect stdin: `claude "Analyse this PR and flag blocking issues" < /dev/null`
> **D.** Use the `--batch` flag to run the command in batch mode.

**Correct answer: A.** `-p` / `--print` is the explicit non-interactive mode flag — run the prompt, exit. B: `CLAUDE_HEADLESS` does not exist; the pipeline still hangs. C: stdin redirection is a classic Unix trick but Claude Code's interactive mode is not purely stdin-driven; `-p` is the correct mechanism. D: `--batch` does not exist in Claude Code's CLI.

---

**Scenario C** (mirrors official Q11):

> A manager wants to cut API costs. The team has: (1) a blocking pre-merge quality gate that must return within 30 seconds, and (2) a nightly usage report that runs overnight. The manager wants both moved to the Message Batches API for the 50% saving. What is the correct recommendation?
>
> **A.** Move only the nightly report to Batch; keep the pre-merge gate on the standard Messages API.
> **B.** Move both to Batch; the 50% saving applies to both and the latency difference is negligible.
> **C.** Move only the pre-merge gate to Batch; it processes more volume and saves more cost.
> **D.** Keep both on the standard API; Batch is not suitable for code review tasks.

**Correct answer: A.** The right question for Batch eligibility is: does this job need a result within seconds, or can it wait up to 24 hours? The nightly report can wait. The pre-merge gate cannot — a gate that blocks deployment for up to 24 hours is not a gate, it's a blockade. B treats the latency difference as negligible when it is not. C confuses the criterion: volume doesn't determine eligibility, timing does. D is wrong because the nightly report is a genuine Batch use case.

---

**Scenario D** (mirrors official Q12):

> A developer submits a 14-file PR. A single-pass Claude review returns feedback that is internally inconsistent — it approves a pattern in one file that it flags as a problem in another. What is the best fix?
>
> **A.** Split the review into per-file local passes followed by a separate cross-file integration pass.
> **B.** Require developers to submit PRs of no more than 5 files.
> **C.** Use a larger context window so all 14 files fit in a single pass comfortably.
> **D.** Run the same prompt three times and take a consensus across the three results.

**Correct answer: A.** Per-file passes catch line-level issues where full context is available for each file. The cross-file integration pass then looks specifically for interface mismatches, contract violations, and inconsistencies *between* files — which a per-file pass can't see. P5 disaggregated measurement: per-file correctness and cross-file structural correctness are different things; measure them separately. B doesn't fix review quality — it just makes the problem less likely to surface. C: a larger context window doesn't fix attention dilution, it increases the input over which attention is diluted. D: three inconsistent reviews averaged together produce averaged inconsistency.

**Pass bar: 72%**

---

#### Apply / Transfer
In `MY_SYSTEM.md`, add an **Execution Mode Decisions** section covering: plan mode triggers (architectural, multi-file, scope-unknown work), direct execution triggers (single-file, mechanical, one-sentence fixes), CI/CD config (`-p`, `--output-format json`, `--json-schema`, CLAUDE.md for context), Batch API eligibility (blocks human or deployment → standard API; can wait 24 hours → Batch candidate; always use `custom_id`), and review strategy (per-file pass → cross-file integration pass → independent instance).

---

#### Review Hooks
- Is there any Claude Code invocation in your CI/CD pipeline missing `-p`? It will hang.
- Are you using Batch for anything that blocks a human or deployment? Move it to the standard API.
- Have you run a same-session self-review recently? That's The Self-Marker. Next time: separate instance.
- Do large PRs get reviewed in one pass? Split them — per-file first, integration pass second.
- Can you state the plan mode decision rule in one sentence? (Complex/architectural/multi-file → plan; simple/well-scoped/single-file → direct.)

<!-- phase-2 complete: 4 sessions -->
## Phase 3 — Prompting, Reliability & Context

---

