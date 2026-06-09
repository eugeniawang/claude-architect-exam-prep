### Session 10 — Context Management & Reliability

**Domain 5.1, 5.4, 5.5 · Principles P2, P5 · Nemeses: The Summarizer of Doom, The Average-Hider**

---

#### Overview
A support agent has been running a long session. The customer mentioned a specific refund amount — £347.82 — forty messages ago. The agent has summarised twice. It is now about to process a refund for "approximately £350."

This session is about what happens to information over a long context, and how to build structures that keep critical facts safe.

---

#### Skill Built
Identify context degradation patterns. Design prompts resilient to long-session drift using case-facts blocks and scratchpad structures. Interpret accuracy metrics without being misled by aggregates.

---

#### Prerequisites / Foundations
- P2 (context is finite, ordered, and decaying) and P5 (verification independent of generation; disaggregated measurement).
- A model's attention is not uniform across its context window — content in the middle gets underweighted.
- You know what progressive summarisation is.

---

#### Do This First
Read this agent-generated summary and identify what has been lost:

> "Customer has been waiting a while and is frustrated about a delivery issue. They mentioned wanting some kind of compensation. Previous agent attempted to resolve but the customer was not satisfied. Case is ongoing."

The original transcript contained: order `#UK-2024-88341`, promised delivery 14 March, actual delivery 29 March (15 days late), customer explicitly requested a refund of £347.82 (the full order value), and had already been offered and declined a £30 voucher.

Every specific fact needed to take action has been replaced with a vague impression. The summary isn't wrong. It's useless.

---

#### What Just Happened
Summarisation is a compression operation. It saves tokens — and it loses precision in exactly the fields that matter most: numbers, dates, specific statements, stated preferences.

**Jargon decoded:**
- **Progressive summarisation** — condensing prior conversation into a shorter summary as the session grows. Saves tokens; risks destroying actionable specifics.
- **"Lost in the middle"** — models reliably attend to content at the start and end of long inputs and underweight content in the middle. This isn't a bug; it's a characteristic. Design around it.
- **Context degradation** — a gradual shift from "model uses the specific facts it was given" to "model references what typically happens in this kind of case." Subtle. Consequential.
- **`/compact`** — use when context grows large; run a structured state export first so the new context starts from known-good facts, not a drift-prone summary.

---

#### Guided Practice
**Exercise A — Case-Facts Block**

Design a case-facts block for a support case. It must be included in every prompt outside the summarised history, contain only exact unambiguous values (no prose), and be updatable as new facts are confirmed.

A correct block for this case holds: `order_id`, `order_value` (exact amount), `promised_delivery` (ISO date), `actual_delivery` (ISO date), `delay_days`, `customer_request` (verbatim statement with turn number), `offers_declined` (amount and turn number), `policy_threshold` (e.g., refunds over £200 require supervisor approval), `status`. Short, exact, never summarised. The prose history around it can decay; this block does not.

`NOW:` Add a case-facts block to every long-running session in `MY_SYSTEM.md`. Every number, date, and stated commitment that must survive to resolution goes in this block.

**Exercise B — Scratchpad Structure**

For a multi-step investigation task, design a scratchpad file that persists confirmed facts, open questions, delegated subagent results, and pending actions. The structure must support crash recovery (structured state export / manifest) and allow subagent delegation for verbose exploration without polluting the main context. Key findings and section headers go at the **start** of each section — not in the middle, where "lost in the middle" makes them unreliable.

---

#### Explain It Back
**Prompt:** "Your pipeline shows 97% accuracy on invoice extraction. The business wants to automate fully. What do you need to check before agreeing?"

Good answer: aggregate accuracy can hide category-specific failure. A system that is 99.5% accurate on simple single-page invoices and 61% accurate on multi-page credit notes with partial payments will report roughly 97% overall if simple invoices dominate the test set. Before automating: break down accuracy by document type, field type, and structural variable (number of pages, foreign-currency amounts, etc.) — measure per group. Have the model emit field-level confidence scores, calibrate them against a labelled validation set, and route low-confidence outputs to human review. The Average-Hider isn't lying — the aggregate is correct. It just isn't the number that tells you whether automation is safe.

---

#### Pattern / Anti-pattern
1. Case-facts block — exact numbers, dates, stated expectations — included in every prompt, outside the summarised history. Never compressed.
2. Section headers and key findings at the START of long inputs (not the middle) — middle content is unreliable under "lost in the middle."
3. Trim verbose tool output before injecting into context — a response with 40+ fields → extract the 5 relevant ones.
4. Scratchpad files for multi-step tasks: persist key findings, enable subagent delegation, support crash recovery via a structured state manifest.
5. `/compact` when context grows large; run a structured state export before compacting.
6. Stratified accuracy measurement before automation: by document type, field, and structural variable. Field-level confidence scores plus human-review routing for low-confidence outputs.

**Named Villain: The Summarizer of Doom**

Compresses everything. Turns "£347.82, 15 days late, customer declined £30 voucher" into "the customer had a delivery problem and wants some compensation." Believes a good summary captures the gist. What it captures is the gist — and it discards every number, date, and specific commitment needed to act correctly.

**Named Villain: The Average-Hider**

Shows 97% accuracy and calls it good. Not lying — just never checked whether that 97% includes the documents that will break automation. Lives in aggregate metrics. Disappears when you stratify.

**Root principles violated:**
- Summarizer of Doom: P2 — context is finite, ordered, and decaying. The architect designs structures that protect critical information from that decay. The case-facts block is that structure.
- Average-Hider: P5 — disaggregated measurement. Verification is only independent of generation when it measures the actual input distribution, not a weighted average that buries failure cases.

---

#### Scenario Check
**Question A:** A long support session has been progressively summarised. The agent is about to process a refund but the exact amount has been replaced in the summary with "the full order value." What is the correct fix?

- **A.** Persist a case-facts block containing exact values (order value, stated request, offers declined) outside the summarised history, included in every prompt verbatim.
- **B.** Summarise more aggressively to keep the context shorter and reduce drift.
- **C.** Upgrade to a model with a larger context window.
- **D.** Trust the summary — the agent captured the gist correctly.

**Correct answer: A**

B — more aggressive summarisation makes it worse; more compression destroys more precision. C — a larger context window delays the problem, it doesn't fix it; the agent will still summarise, and facts will still be lost. D — "the gist" is not the amount; the exact amount is what the system must act on. This is The Summarizer of Doom.

---

**Question B:** An extraction pipeline reports 97% accuracy. Stratification reveals single-page standard invoices score 99.5% but multi-page invoices with partial payments score 61%. What should you do?

- **A.** The aggregate is the right number; the 61% is a small category and won't affect overall performance.
- **B.** The 61% category is not safe for full automation; route multi-page partial-payment invoices to human review while improving extraction for that stratum.
- **C.** Retrain the model on more multi-page invoices.
- **D.** Lower the confidence threshold to accept more results from the 61% category.

**Correct answer: B**

The 97% aggregate is The Average-Hider. A 39% error rate on financial documents is unacceptable for automation. Route to humans immediately. Retraining (C) is a longer-term option, not the immediate fix. Lowering thresholds (D) accepts more wrong answers — the opposite of what's needed.

---

#### Apply / Transfer
For each long-running session or multi-step pipeline in `MY_SYSTEM.md`:
1. Identify every piece of information that must survive summarisation (amounts, dates, commitments, order numbers). Add a case-facts block outside the history — never compressed.
2. Audit prompts with long tool output. Trim to relevant fields before injection. Document the trim logic.
3. Design or document your scratchpad structure for multi-step tasks. Ensure it supports structured state export for crash recovery.
4. For any accuracy metric you report: document the corpus, whether it is stratified by input type, and whether field-level confidence scores are emitted and calibrated.

---

#### Review Hooks
- Can you name two things the case-facts block protects against?
- Where in a long input should key findings go, and why?
- What does "lost in the middle" mean and what is its practical implication for prompt design?
- Why might 97% aggregate accuracy be insufficient to automate?
- What is stratified measurement and why does it matter here?
- Can you name both villains and the principle each violates?

---
---

