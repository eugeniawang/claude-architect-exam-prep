### Session 9 — Structured Output & Validation-Retry

**Domain 4.3, 4.4 · Principles P3, P4, P5 · Nemesis: The Eternal Retrier**

---

#### Overview
An invoice-extraction pipeline has been retrying for three minutes on a single document. It will keep retrying. The field it wants is not in the document. Nobody told it to stop.

This session is about getting structured output right, validating it at the right layer, and knowing when to stop trying.

---

#### Skill Built
Use `tool_use` with a JSON schema to obtain structured output. Design schemas that handle absent and ambiguous data gracefully. Write a validation-retry loop that distinguishes format errors (retries help) from absent data (retries do not help).

---

#### Prerequisites / Foundations
- You know what a JSON schema is and what `required` means.
- P3 (match mechanism to shape and cost), P4 (make failure legible), P5 (verification independent of generation).
- The model generates tokens probabilistically — it does not "know" whether a field actually exists in the source document.

---

#### Do This First
Picture a schema with three fields — vendor name, invoice total, and line items — all marked required. Invoice total is typed as a number. There are no self-checking fields.

Identify the two problems before reading further.

Problem one: invoice total is required — so if a document has no total, the model will make one up to satisfy the schema. Problem two: there's no self-checking field, so you can't tell whether the returned total actually matches the sum of the line items.

---

#### What Just Happened
You spotted two failure modes: a **fabrication trap** (marking a field `required` when the source may not contain it forces the model to invent a value) and a **semantic gap** (valid JSON that passes schema validation but contains numbers that don't add up).

**Jargon decoded:**
- **`tool_use` / forced tool call** — routes generation through a named tool and its schema, guaranteeing the output matches the schema's shape. This eliminates syntax errors. It does not eliminate semantic errors (wrong values that still fit the types).
- **`tool_choice` forced** — setting `tool_choice` to a specific tool name forces exactly that tool to be called. Setting it to `"any"` guarantees some tool is called, but not which one.
- **Semantic validation** — checking that values are internally consistent and logically plausible. Schema validation only checks types and required fields. Semantic validation goes further: does `calculated_total` match `stated_total`? Does the math add up?
- **`enum`/`"other"`/`"unclear"`** — categorical fields should include `"other"` (with a companion detail string, for cases that don't fit any category) and `"unclear"` (for genuinely ambiguous inputs). Never force the model to guess.
- **`calculated_total`/`stated_total`/`conflict_detected`** — the self-checking triple: `stated_total` is the number as printed on the document; `calculated_total` is the sum of line-item amounts; `conflict_detected` is a boolean set to true when they differ by more than rounding tolerance.
- **`detected_pattern`** — a nullable string field for recording systematic failure patterns (for example, a non-standard currency symbol appearing on every amount in a batch), so an operator can investigate.

---

#### Guided Practice
**Exercise A — Schema Redesign**

Redesign the invoice schema so that: invoice total is replaced by a nullable `stated_total` (null if absent — never fabricate) and a nullable `calculated_total` (sum of line-item amounts); `conflict_detected` is a required boolean; `payment_terms` is an enum of `"net_30"`, `"net_60"`, `"due_on_receipt"`, `"other"`, `"unclear"` — with a nullable `payment_terms_detail` string that is required when `payment_terms` is `"other"`; and `detected_pattern` is a nullable string. Every field that may be absent in a real document is typed as nullable, not required.

**Exercise B — Validation-Retry Logic**

Write the logic for a validation-retry loop in plain prose, then check it against these rules:
1. Call the extraction tool (with forced `tool_choice`).
2. Run semantic validation: check `conflict_detected`; check that `payment_terms_detail` is present when `payment_terms` is `"other"`.
3. Classify any errors by type — `"structural"` (the information exists in the document, the model just formatted it badly) versus `"absent_in_source"` (the document never contained this field).
4. Absent data → return `null` for that field, set `validation_status: "absent_data"`, stop. Do not retry.
5. Structural error → retry once, appending the **specific** error message to the prompt (not a generic "please try again" — that gives the model no new information).
6. After at most one retry, return with `validation_status: "clean"` or `"validation_failed"`.

`EXAM:` The retry prompt must contain the specific error. Generic retry prompts give the model no new information and don't improve results.

---

#### Explain It Back
**Prompt:** "Your invoice pipeline retries on every validation failure. What is wrong with this, and how do you fix it?"

Good answer: retries fix format or structural errors — the information exists in the document, the model just formatted it badly. They don't fix absent data — if the field was never in the document, retrying generates the same fabricated value over and over. The Eternal Retrier keeps paying for the same failure. Token cost stacks up; results never improve. Fix: classify the error type before deciding to retry. Absent data → return null and escalate. Structural error → retry once with the specific error message appended. Also: `conflict_detected` plus comparing `calculated_total` against `stated_total` catches semantic errors that schema validation misses entirely.

---

#### Pattern / Anti-pattern
Force the tool call via `tool_choice`. Schema: nullable fields for absent data; `enum` with `"other"` plus a detail string plus `"unclear"`; `calculated_total` / `stated_total` / `conflict_detected` for self-checking; `detected_pattern` for systematic failure. Keep a semantic validation layer that is independent of generation (P5). Retry decision: structural error → retry once with the specific error message; absent data → return null, do not retry.

**Named Villain: The Eternal Retrier**

Sees a validation failure and retries. Then retries again. Never asks whether the information was present in the first place. Believes trying harder is a strategy. It isn't — it's a billing event. Especially dangerous in unattended pipelines: three retries across ten thousand documents is thirty thousand extra API calls on inputs that will never improve.

**Root principles violated:** P4 — treats all failure as one type (formatting error, fixable by retry) and never surfaces the real failure mode (absent data). P3 — the mechanism (retry loop) doesn't match the failure shape (absent data has a different shape than malformed output).

---

#### Scenario Check
**Question A:** A pipeline retries three times on an invoice field. The source document is a purchase order that never contained that field. What should happen?

- **A.** Stop after the first attempt, return `null` for that field, and route to human review or downstream handling.
- **B.** Continue retrying with larger context windows until the field appears.
- **C.** Mark the field as `required` in the schema and force a value.
- **D.** Remove the field from the schema to avoid the error.

**Correct answer: A**

B — a larger context window doesn't conjure data that was never there. C — this is the fabrication trap: a `required` field on absent data produces invented values that pass validation and corrupt downstream systems silently. D — hides the gap; downstream systems get no signal that the field was unresolvable.

---

**Question B:** A pipeline returns valid JSON that passes schema validation. `stated_total` is £1,240.00. The sum of `line_items[*].amount` is £1,190.00. What layer caught this, and what should the pipeline do?

- **A.** Schema validation caught it; reject and retry.
- **B.** Semantic validation caught it; set `conflict_detected: true` and route for human review.
- **C.** This is within normal floating-point tolerance; accept the result.
- **D.** Retry with a prompt asking the model to recalculate.

**Correct answer: B**

Schema validation only checks types and required fields — that's why it passed. A £50 discrepancy is well beyond floating-point tolerance. `conflict_detected` exists exactly for this case. Route for human review. Asking the model to "recalculate" will likely produce agreement with itself, not the correct figure.

---

#### Apply / Transfer
For each extraction or classification tool call in `MY_SYSTEM.md`:
1. Audit every `required` field — could it be absent from a real input? If yes, make it nullable.
2. Add `"unclear"` to any categorical enum. Add `"other"` plus a detail string for extensibility.
3. Add at least one self-checking field (e.g., `conflict_detected`).
4. Add `detected_pattern` for any extraction over heterogeneous document types.
5. Update your validation-retry logic to classify error type before deciding to retry.
6. Set `tool_choice` to forced mode for any extraction where schema compliance is non-negotiable.

---

#### Review Hooks
- Can you name two things `tool_use` guarantees and one thing it does not?
- Does your schema have nullable fields for data that may be absent?
- Does your retry logic distinguish structural errors from absent data?
- Does your retry prompt contain the specific error, not a generic plea?
- What is The Eternal Retrier and which principles does it violate?
- Why is `conflict_detected` a semantic check and not a schema check?

---
---

