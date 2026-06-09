### Session 11 — Escalation, Error Propagation & Provenance

**Domain 5.2, 5.3, 5.6 · Principles P1, P4, P7 · Nemeses: The Sentiment-Based Escalator, The Silent Reconciler**

---

#### Overview
Three failures at once: the escalation agent is routing based on how annoyed customers sound; a subagent timed out and returned an empty result marked "success"; a research synthesiser quietly chose one of two conflicting source values without flagging the conflict. Each failure is distinct. Each has a different fix.

---

#### Skill Built
Define valid and invalid escalation triggers. Design structured error context for multi-agent failure propagation. Preserve claim-source mappings and handle conflicting sources with annotation rather than silent resolution.

---

#### Prerequisites / Foundations
- P1 (determinism for correctness-critical tasks), P4 (make failure legible), P7 (preserve provenance and uncertainty).
- Session 8: self-reported confidence is poorly calibrated — that principle returns here in the escalation context.
- Session 9's structured error design — the same pattern applies to subagent failure propagation.

---

#### Do This First
Classify each escalation trigger as VALID or INVALID before reading What Just Happened:

- Trigger A: The customer explicitly asks to speak to a human.
- Trigger B: The model's self-reported confidence score is below 6 out of 10.
- Trigger C: Sentiment analysis detects frustration or anger.
- Trigger D: The customer's request requires a policy exception not covered in the guidelines.
- Trigger E: The agent has made two attempts and cannot make meaningful progress.

Answers: A — valid. B — invalid. C — invalid. D — valid. E — valid.

---

#### What Just Happened
The valid triggers share one characteristic: they are observable, categorical, and independent of the model's internal state. The invalid triggers (B and C) rely on signals — sentiment and self-reported confidence — that correlate poorly with actual case complexity.

**Jargon decoded:**
- **Escalation trigger** — a condition that causes handoff to a human agent rather than further autonomous resolution.
- **Structured error context** — a failure payload that tells the coordinator what failed, how, and what was retrieved — not just that something went wrong.
- **Claim-source mapping** — a record linking each claim in a synthesised output to the source that supports it (URL, document name, excerpt). It survives the synthesis step and enables downstream verification.
- **Conflict annotation** — when two credible sources disagree, flagging the disagreement explicitly with attribution, rather than picking one value silently.
- **`isError`** — the field in a structured error payload that distinguishes a genuine error from a valid empty result (a successful query that found nothing).

---

#### Guided Practice
**Exercise A — Escalation Criteria**

Write explicit escalation criteria for a support agent using categorical conditions and at least one few-shot example per criterion (the Session 8 pattern). Cover:
- Escalate immediately (no investigation first) when the customer explicitly requests a human — no exceptions. Distinguish "Transfer me" (valid trigger) from "You're useless" (frustration, not a transfer request).
- Escalate after one attempt when: the request requires a policy exception not covered by any listed policy, contradicts a listed policy, or requires manager approval; OR the agent has made two resolution attempts without meaningful progress (one failure is not "no meaningful progress").
- Explicitly list what does NOT trigger escalation: customer sentiment, model self-reported confidence score, case complexity as perceived by the model.

Also add: when a record lookup returns multiple matching records, always request an additional identifier (order number, email address, postcode) before proceeding. Never select heuristically (e.g., "most recent activity" — that is a guess, not a criterion; P1 requires deterministic handling for correctness-critical decisions).

**Exercise B — Structured Error Propagation**

Design the error payload a web-search subagent should return when it times out mid-query. The payload must convey: `error_type` (e.g., `"timeout"`), `attempted_query` (the exact query string), `partial_results` (any sources retrieved before failure, each with source URL, excerpt, and `retrieved_at` timestamp), `failure_point` (where in the process it stopped), `potential_alternatives` (suggested recovery paths), `recoverable` (boolean).

This tells the coordinator what was attempted, what was retrieved, where failure occurred, and how to recover. It does not say "search unavailable." It does not return an empty result marked "success." The `isError` field distinguishes a genuine error from a valid empty result.

`EXAM:` Silent suppression — returning an empty result marked "success" — violates P4. The coordinator is told the search completed and found nothing, which is false and leaves it unable to act correctly. Propagating a raw exception and terminating the whole workflow is over-reaction — one subagent failing does not justify aborting the entire pipeline.

---

#### Explain It Back
**Prompt:** "A source lookup returns multiple customer records matching 'J. Smith.' The agent picks the one with the most recent activity. What is wrong, and what should it do instead?"

Good answer: heuristic selection is not an escalation criterion — it's a guess. If the agent picks the wrong J. Smith, downstream actions (refunds, account changes) affect the wrong customer. Correct behaviour: ask for an additional identifier before proceeding. This is P1 — correctness-critical decisions need deterministic criteria, not heuristics. "Most recent activity" might be right 90% of the time; the other 10% is a data-integrity incident. The heuristic can also be systematically wrong for specific customer types (recently reactivated dormant accounts would always score high on recency).

---

#### Pattern / Anti-pattern
**Escalation:** explicit customer request for a human → escalate immediately. Policy gap or exception → escalate after one attempt. No meaningful progress after two attempts → escalate. Multiple matching records → request an additional identifier; never guess.

**Error propagation (multi-agent):** return `error_type`, `attempted_query`, `partial_results`, `failure_point`, `potential_alternatives`, `recoverable`. Distinguish access failures (need retry decisions) from valid empty results (successful query, genuinely no matches). Local recovery for transient failures (subagent retries once). Propagate only what can't be resolved locally, with context. Never: empty result marked success (silent suppression). Never: raw exception that kills the whole workflow (over-reaction).

**Provenance:** preserve claim-source mappings through synthesis (source URL, document, excerpt, publication date, collection date). When sources conflict: annotate with attribution — do not pick one silently. Coverage gaps: annotate explicitly. Separate well-established from contested findings in the output structure.

**Named Villain: The Sentiment-Based Escalator**

Routes angry-sounding customers to humans and calm customers to automation. A calm customer asking for a policy exception needs a human. A furious customer wanting a standard refund within the return window does not. Sentiment is a proxy for complexity. It's a bad one. The intuitive design — resist it.

**Named Villain: The Silent Reconciler**

Sees two sources that disagree. One says the policy changed in January; one says March. Picks March (more recent), uses it, produces a clean-looking report. Nobody is told about the January source. Nobody checks whether January was the correct enforcement date for the customer's contract period. The Silent Reconciler hates ambiguity more than it values accuracy.

**Root principles violated:**
- Sentiment-Based Escalator: P1 — escalation routing is correctness-critical; sentiment is non-deterministic and poorly correlated with the actual classification task.
- Silent Reconciler: P7 — synthesising without annotation discards the uncertainty signal and presents false confidence to downstream consumers.

---

#### Scenario Check
**Question A:** A customer support agent resolves 55% of contacts on first touch, escalating easy cases and attempting hard policy-exception cases itself. What is the best fix?

- **A.** Add explicit escalation criteria with few-shot examples of when to escalate versus resolve.
- **B.** Ask the agent to self-report confidence on a 1–10 scale and escalate below 5.
- **C.** Train a separate classifier to route tickets before the agent sees them.
- **D.** Escalate all tickets where customer sentiment is negative.

**Correct answer: A**

The agent lacks a categorical decision boundary for escalation — it's guessing. Explicit criteria with examples (Session 8 applied here) directly fixes the decision boundary at minimal cost. B — LLM self-confidence is poorly calibrated; the agent is already confidently wrong on policy-exception cases; a confidence threshold makes it worse. C — over-engineered before prompt optimisation is tried; requires labelled training data, a deployment pipeline, and ongoing maintenance. D — sentiment doesn't correlate with escalation need; this is The Sentiment-Based Escalator.

`NOW:` This is the official Q8 scenario. The same question appears in Session 8 as a preview. The answer is identical and the reasoning mirrors exactly — explicit criteria + examples (P1, P3) is the fix in both contexts.

---

**Question B:** A web-search subagent times out retrieving regulatory timeline data. How should the failure flow to the coordinator?

- **A.** Return structured error context: failure type, attempted query, partial results retrieved before timeout, and suggested alternatives.
- **B.** Retry with exponential backoff (up to 3 retries), then return a generic `"search unavailable"` status.
- **C.** Catch the timeout exception, return an empty result array with status `"success"`.
- **D.** Propagate the raw timeout exception to the coordinator and terminate the workflow.

**Correct answer: A**

Structured error context gives the coordinator everything needed to make a recovery decision: what was tried, what was retrieved, and what alternatives exist. B — retry-then-generic-status hides failure context behind a vague message and adds token cost with no guaranteed benefit; partial results and query context are more valuable than another retry. C — silent suppression: an empty result marked "success" tells the coordinator the search completed and found nothing, which is false (P4). D — one search failing doesn't justify aborting the whole workflow; over-reaction as anti-pattern.

---

#### Apply / Transfer
For each agent or multi-agent pipeline in `MY_SYSTEM.md`:
1. **Escalation:** write or update explicit escalation criteria with categorical conditions and at least one few-shot example per criterion. Explicitly list what does NOT trigger escalation (sentiment, confidence score). Add a rule for multiple-record matches: always request an additional identifier.
2. **Error propagation:** for each subagent that can fail, define the structured error payload: `error_type`, `attempted_query`, `partial_results`, `failure_point`, `potential_alternatives`, `recoverable`. Confirm you distinguish access failure from valid-empty-result (`isError`).
3. **Provenance:** for any synthesis step, add claim-source mappings to the output schema. Add a `conflicting_sources` array with attribution and temporal data on each source. Add a `coverage_gaps` field. Separate well-established from contested findings in the output structure.

---

#### Review Hooks
- Can you list three valid escalation triggers and two invalid ones?
- Why is customer sentiment an invalid escalation trigger?
- Why is model self-confidence an invalid escalation trigger?
- What are the two things a structured error payload must distinguish that a generic status string cannot?
- What should an agent do when a record lookup returns multiple matches?
- Can you name both villains and the principle each violates?
- What is the difference between silent suppression and structured error propagation in terms of what the coordinator can do next?

---
---

<!-- phase-3 complete: 4 sessions -->
## Phase 4 — Capstone

