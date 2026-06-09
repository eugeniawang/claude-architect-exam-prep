### Session 3 — Hooks, Enforcement & Handoff

**Domains 1.4, 2.3 · Principles P1, P4 · Nemesis: The Polite Asker**

#### Overview
Replace prompt-based compliance for business-critical rules with deterministic enforcement via hooks and prerequisite gates — and structure handoffs so the human receiving them can actually act.

#### Skill Built
Given a production incident where an agent skips a mandatory verification step, identify whether the fix is a prompt change (probabilistic, wrong) or a programmatic prerequisite gate (deterministic, correct) — and explain why those two approaches are categorically different.

#### Prerequisites / Foundations
Four terms you need:

**Deterministic** — same input, same output, every time. A Python `if` statement is deterministic. The model's response to a prompt is not.

**Hook** — code that intercepts an event (a tool call going out or a result coming in) and can inspect it, modify it, block it, or redirect it before the main flow continues. `PreToolUse` fires before a tool call executes. `PostToolUse` fires after the result comes back.

**Prerequisite gate** — a check that must pass before a subsequent action is allowed. Not a suggestion. If it fails, the action is blocked at the code level. No exceptions.

**Handoff** — the structured transfer of an in-progress case to a human who has no prior knowledge of the session. A handoff that omits the customer's ID forces the human to start from scratch.

#### Do This First
A customer support agent's system prompt says: *"Before processing any refund, you MUST verify the customer's identity by calling `get_customer` first. This is mandatory. Never skip this step."*

Post-launch monitoring shows 12% of refund sessions called `process_refund` directly, skipping `get_customer` entirely.

Before reading on: write down the structural reason the system prompt failed — not "the model didn't follow instructions." Why couldn't it have worked?

#### What Just Happened
A system prompt is a request. A very emphatic request. The model is probabilistic: given the same prompt and different conversation histories, different token pressures, different session contexts, it will occasionally not follow the instruction. 12% is not a model bug. It is the expected behavior of a probabilistic system asked to enforce a deterministic rule.

"MUST" and "mandatory" and "never skip" are tokens. They shift probability. They do not modify control flow.

The fix is to take the decision out of the model's hands entirely. A programmatic prerequisite gate checks whether `get_customer` has returned a verified customer ID before `lookup_order` or `process_refund` is even allowed to fire. Not "usually checks." Every single time.

This is P1: *Determinism for the correctness-critical; the model for judgment.* Identity verification before financial operations is correctness-critical. It belongs in code.

#### Guided Practice
**Exercise A — Write the prerequisite gate.**

Describe a `PreToolUse` hook that blocks `lookup_order` and `process_refund` if no verified customer ID exists in session state. Answer these questions:

1. What happens if `get_customer` is called but the customer is NOT verified — does the gate still block `process_refund`?
2. What would happen if this same logic were in the system prompt instead?
3. Where in the agentic loop does `PreToolUse` fire relative to the model's tool call request?

**Exercise B — Write the redirect hook.**

The business rule: refunds over $500 must go to a human. Describe a `PreToolUse` hook that intercepts `process_refund`, checks the `amount` field, and redirects to `escalate_to_human` when the threshold is exceeded. What must the agent runtime do when a hook returns a redirect object instead of `None`?

**Exercise C — Write a structured handoff.**

A support session ends with the agent unable to resolve the issue. Write the structured handoff object passed to `escalate_to_human`. It must include four fields: customer ID (verified, from `get_customer`), root cause (one sentence, factual), refund amount, and recommended action.

Why is "root cause" required rather than "conversation summary"? *(The human needs to know what the problem is, not what was said. A transcript is not a handoff.)*

#### Explain It Back
Explain to a product manager — no jargon — why "we added 'MUST verify customer identity' to the system prompt" is not sufficient for a financial operation.

A good answer covers:
- The model is probabilistic
- "MUST" is a token that influences probability — it is not a guarantee
- 12% failure rate on a financial operation is a catastrophe, not an edge case
- Hooks run every time, regardless of what the model decided

If the product manager says "but we made the prompt really emphatic" — that's The Polite Asker. Smile politely. Then write the hook.

#### Pattern / Anti-pattern
**Good pattern — Programmatic gates for correctness-critical rules:**

- Business-critical sequencing (verify before transact) → `PreToolUse` hook, not system prompt
- Threshold-based routing (refunds over $500 → human) → `PreToolUse` hook
- `PreToolUse` returns: `None` = allow; modified input = redirect; exception = block
- Human handoffs: structured object with customer ID, root cause, amount, recommended action

**The Nemesis: The Polite Asker**

Believes that strong enough language in the system prompt enforces compliance. Writes "MUST", "MANDATORY", "NEVER SKIP." Watches the model comply 88% of the time. Concludes the prompt works. The 12% that don't comply are the financial errors, the misidentified accounts, the audits.

The Polite Asker treats the model as if it were a rule engine. It is not. It is a probabilistic predictor. Rule engines belong in code.

**Root principle violated:** P1 — Correctness-critical rules require deterministic enforcement. Hooks give you that. Prompts do not.

**`NOW:`** Whenever you see "MUST" or "mandatory" in a system prompt for something financial, legal, or safety-critical — that's a candidate for a hook. No exceptions.

#### Scenario Check
**Question** *(mirrors official sample Q1)*

A production customer support agent processes refunds. Post-launch monitoring shows 12% of sessions call `process_refund` without first calling `get_customer`, leading to misidentified accounts and erroneous refunds. What is the most effective fix?

**A.** Add a programmatic prerequisite gate: a `PreToolUse` hook that blocks `lookup_order` and `process_refund` from firing unless `get_customer` has already returned a verified customer ID in the current session.

**B.** Update the system prompt to add explicit instructions stating that customer verification is mandatory before any refund processing, with clear consequences described.

**C.** Add few-shot examples to the system prompt demonstrating the correct `get_customer → lookup_order → process_refund` sequence.

**D.** Add a routing classifier that detects refund-intent requests and routes them to a specialised refund subagent that has customer verification built into its instructions.

**Correct answer: A**

**Rationale:**

- **A is correct.** The root cause is a probabilistic component making a compliance decision that requires a deterministic guarantee. A `PreToolUse` hook enforces the prerequisite at the code layer — runs before every tool call, cannot be skipped, does not depend on what the model decided. P1 applied directly.

- **B is tempting** because stronger instructions is the instinctive first response to a compliance failure — and the system prompt is already the right place to guide judgment. But the current prompt already has instructions. 12% failure is the result. More emphasis changes probability; it doesn't change the architecture.

- **C is tempting** because few-shot examples genuinely improve instruction-following. They are still tokens. The skip rate might drop to 8% or 4%. It will not reach zero. "Not zero" is unacceptable for financial operations.

- **D is tempting** because it sounds like a systems-level fix. But the problem is not which agent handles the refund — it's that any agent handling it must be prevented from skipping verification. A specialised subagent with instructions still has the probabilistic compliance problem.

#### Apply / Transfer
In `MY_SYSTEM.md`, under `## Hooks & Enforcement`, answer:

1. Identify one business-critical rule currently enforced only through the system prompt (e.g., "always verify X before Y", "never do Z without approval").
2. For that rule: sketch the `PreToolUse` or `PostToolUse` hook that would enforce it deterministically. Pseudocode counts.
3. Does your system have a human handoff path? If yes: list the four fields a handoff object must contain for the receiving human to act without reading the full transcript. If no: describe what those fields would be.
4. Find every place you wrote "MUST", "MANDATORY", or "NEVER SKIP" in a system prompt for a correctness-critical rule. These are candidates for replacement with hooks.

This surfaces two or three findings per system. That's normal and the point.

#### Review Hooks
**Revisit if shaky:**
- What a `PreToolUse` hook can return: `None` = allow; modified input = redirect; exception = block.
- Why "add a routing classifier" is almost never the right answer when the problem is tool-call ordering. Classifiers solve routing; gates solve sequencing.
- What P4 means in the handoff context: "make failure legible" means structured, actionable information — not a narrative the human has to decode.

**Cumulative review prompt** (covers all three sessions):

> "Walk me through a complete customer support refund flow: the agent receives a refund request, calls `get_customer`, then `lookup_order`, then `process_refund`. Describe: what stops the loop, what enforces the call order, what happens if the refund is $750, and what the human receives if escalation fires. Use `stop_reason`, hooks, and the handoff object in your answer."

If you can walk through that end-to-end — stop conditions, gates, hooks, handoff fields — without notes, you own Phase 1.

<!-- phase-1 complete: 3 sessions -->
## Phase 2 — Tools, Code & Context

---

