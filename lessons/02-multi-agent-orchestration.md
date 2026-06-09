### Session 2 — Multi-Agent Orchestration & Context Isolation

**Domains 1.2, 1.3 · Principles P2, P6 · Nemeses: The Mind-Reader, The Narrow Decomposer**

#### Overview
Design a hub-and-spoke multi-agent system where each subagent is genuinely isolated — and understand why "the coordinator knows, so the subagent knows" is a bug, not a shortcut.

#### Skill Built
Given a multi-agent architecture description, identify: (a) whether the coordinator can actually spawn subagents, (b) whether context is explicitly passed or assumed, (c) whether task decomposition covers the full domain, (d) whether subagents return structured findings or raw dumps.

#### Prerequisites / Foundations
Three terms you need:

**Hub-and-spoke** — one central coordinator handles all routing. Subagents talk only to the coordinator, never to each other.

**Tool call vs agent spawn** — a tool call invokes a function. An agent spawn (the `Task` tool) creates a separate model invocation with its own context window, its own system prompt, and its own tool restrictions. Not the same thing.

**Context window** — the fixed-size token buffer the model sees on a single API call. It does not carry over between calls unless you explicitly append the content. Think of it as working memory with a hard limit and no background sync.

#### Do This First
A coordinator is configured with `allowed_tools=["web_search", "summarize"]`. Its system prompt says to spawn subagents to research each sub-domain in parallel. At runtime, it writes a response describing which subagents it will spawn — but no `Task` calls appear in `response.content`.

Separately, when a `Task` call is made, it passes only: `"Research the visual arts sub-domain."` No system prompt, no tool restrictions, no context.

Before reading on: write down the two things that will cause this to silently produce wrong or empty results.

#### What Just Happened
Two problems, both invisible at runtime.

**Problem 1 — `Task` missing from `allowed_tools`.** The coordinator cannot spawn subagents because `Task` isn't listed. The model may describe what it wants to do — but no actual spawns happen. No error is raised. You find out when the report comes back empty.

**Problem 2 — subagent context starvation.** Subagents do not inherit the coordinator's context. The one-line `Task` prompt gives the subagent no brief, no output format, no scope. It starts with a blank slate and researches whatever it guesses "visual arts sub-domain" means. Could be fine. Could be a shallow Wikipedia summary when you needed contemporary digital art market analysis. You won't know until a human reads the output.

The system ran. It just didn't do what you thought.

#### Guided Practice
**Exercise A — Fix the coordinator.**

Add the single missing tool to `allowed_tools`. Then explain: why must subagents NOT have that same tool in their own `allowed_tools`?

*(Answer: add `"Task"`. A subagent with `Task` access can spawn further subagents. That creates uncontrolled recursive trees. Subagents are leaves, not hubs.)*

**Exercise B — Write a context-complete Task call.**

Write a `Task` invocation for the music sub-domain that includes everything the subagent needs: context about the research brief, the output format, and appropriate tool restrictions. The `system_prompt` value should cover at minimum: what the project is, what this subagent is responsible for, what the output format should be, and what's out of scope.

**Exercise C — Parallel spawn.**

Describe what the coordinator's `response.content` array looks like when it emits three parallel `Task` calls for visual arts, music, and film in a single response turn.

*(Answer: three `tool_use` blocks of type `Task` in the same `response.content` list. The API executes them in parallel. The coordinator receives three `tool_result` blocks back.)*

#### Explain It Back
Explain to a colleague why subagents don't automatically know what the coordinator knows — and what breaks when you assume they do.

A good answer covers:
- Each agent call is an independent API call with its own context window
- "Context isolation" is the correct mental model, not a bug to work around
- The fix is always explicit passing — everything the subagent needs goes into its `Task` prompt
- The difference between passing raw verbose content (a 40KB research dump) vs structured findings (claim + evidence + source)

Bonus: explain why passing raw verbose content back to the coordinator is a P2 violation. (It bloats the coordinator's context with noise, accelerating context decay and increasing hallucination risk.)

#### Pattern / Anti-pattern
**Good pattern — Explicit context, minimal tools, structured findings:**

- Coordinator: `allowed_tools` includes `Task`; spawns subagents with fully-specified prompts and scoped tools; receives structured findings, not raw dumps
- Parallel spawn: multiple `Task` calls in a single response turn
- Subagents: scoped tools only; no `Task` tool; return structured `{claim, evidence, source}` findings

**Nemesis 1: The Mind-Reader**

Assumes subagents know what the coordinator knows. Writes one-line `Task` prompts ("research music"), expects the subagent to figure out the brief from nowhere, and is baffled when it returns generic summaries. Fix: write the full context into every `Task` invocation. Every time. No exceptions.

**Root principle violated:** P2 — *Context is a finite, ordered, decaying working set.* No background sync. No shared memory. Only what you put into the message array on that API call.

**Nemesis 2: The Narrow Decomposer**

Breaks a broad topic into subtasks that look complete but aren't. Decomposes "creative industries" into painting, sculpture, photography. Every subagent runs. Every subagent succeeds. Music, film, literature, and video games are missing entirely. The Narrow Decomposer is subtle: each individual subagent did its job. The gap only shows up when you look at the whole.

**Root principle violated:** P6 — *Decomposition buys reliability only if coverage is complete and the seams are managed.* Covering 30% of a domain is an omission with extra steps.

**The `fork_session` and `--resume` question**

- `--resume <session-name>` — use when prior tool results are still valid and re-running them would be expensive.
- `fork_session` — use to branch from a shared baseline for divergent experiments.
- **Start fresh with a structured summary** — use when prior results are stale, context is polluted with failed attempts, or significant time has passed. Stale tool results in a resumed session can mislead the model.

`EXAM:` If a question mentions "stale tool results" or "context from a failed run," the answer is almost always "start fresh with a structured summary."

#### Scenario Check
**Question** *(mirrors official sample Q7)*

A multi-agent research system is tasked with a comprehensive report on "the creative industries." Each subagent returns results and reports success. The coordinator aggregates them. The client notes that music, film, and literature are entirely missing — only visual arts sub-domains are covered. What is the root cause?

**A.** The subagents responsible for music, film, and literature failed silently and did not report errors.

**B.** The coordinator's task decomposition was too narrow — it only generated `Task` invocations for visual-arts sub-domains, failing to cover the full scope of "creative industries."

**C.** The subagents inherited an incomplete version of the coordinator's context and focused only on the topics mentioned in the system prompt.

**D.** The `Task` tool was not in the coordinator's `allowed_tools`, so only some subagents were actually spawned.

**Correct answer: B**

**Rationale:**

- **B is correct.** Each subagent reported success — they ran and returned results. The gap is in what was asked, not what was executed. This is The Narrow Decomposer: a coverage failure at the decomposition step, not the execution step. Root principle: P6.

- **A is tempting** because silent failure sounds like a real systems problem. But the question says each subagent reported success. A is answering a different question.

- **C is tempting** because context isolation is a real issue (P2). But context isolation causes quality problems within a task — the subagent doesn't know the brief well enough. It doesn't cause scope problems — the subagent was never assigned music in the first place. A subagent can't do work it was never asked to do.

- **D is tempting** because missing `Task` in `allowed_tools` is a real failure mode from this session. But D would cause no subagents to spawn at all — the report would be empty, not missing specific domains.

#### Apply / Transfer
In `MY_SYSTEM.md`, under `## Multi-Agent Architecture`, answer:

1. Does your system have a coordinator-subagent pattern? If yes: is `Task` explicitly listed in the coordinator's `allowed_tools`?
2. Pick one subagent. List every piece of context it needs to do its job. Is all of it explicitly passed in the `Task` prompt, or is any of it "expected to be known"?
3. Write out your system's task decomposition for its primary workflow. Does it achieve full domain coverage? Name any sub-domains that might be missing.
4. When your coordinator aggregates results, does it receive structured findings or raw text dumps?

A gap in item 2 or 3 means The Mind-Reader or The Narrow Decomposer lives in your system. Note it.

#### Review Hooks
**Revisit if shaky:**
- The difference between `fork_session` and `--resume` — and when "start fresh" beats both.
- Why passing raw verbose content back to the coordinator is a P2 violation, not just a style choice.
- Casing: `allowed_tools` (Agent SDK / snake_case) vs `allowed-tools` (Claude Code YAML / hyphen) — same concept, different format.

**Cumulative review prompt:**

> "I have a coordinator that spawns three subagents in parallel to research a topic. Subagent 2 returns results, but subagents 1 and 3 return errors. Walk me through: what does the coordinator's context window look like after it receives all three results? How should it handle the partial failure? Where does the structured findings format matter?"

If you can walk through that without notes, you own Session 2.

---

