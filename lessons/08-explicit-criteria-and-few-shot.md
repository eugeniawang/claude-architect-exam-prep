### Session 8 — Explicit Criteria & Few-Shot

**Domain 4.1, 4.2 · Principles P1, P3 · Nemesis: The Vague Vizier**

---

#### Overview
A comment-review agent has been running for a week and flagging nearly everything. Developers have stopped reading its output.

The problem: the instructions it was given are vague. This session is about replacing soft instructions with sharp, testable criteria — and using examples to show where the line sits.

---

#### Skill Built
Write specific, categorical criteria for classification tasks. Pair them with 2–4 targeted few-shot examples including at least one edge case. Know when to disable a noisy category and why self-reported confidence thresholds fix nothing.

---

#### Prerequisites / Foundations
- A prompt is a specification, not a wish.
- P1 (determinism for correctness-critical tasks) and P3 (match mechanism to shape and cost).
- False-positive rates stack up across categories — one noisy label poisons trust in all of them.

---

#### Do This First
Find a classification task in your system. Write down the instruction you currently give the model — something like "check that comments are accurate" or "flag issues."

Now write the single sharpest one-sentence criterion you can for what counts as a true positive. Concrete and testable. Don't deploy it yet — you're diagnosing.

---

#### What Just Happened
You just separated a **vague instruction** ("be accurate") from a **categorical criterion** ("flag only when the comment claims behaviour that contradicts what the code actually does"). The first asks the model to exercise judgment without a frame. The second gives it a clear decision boundary.

**Jargon decoded:**
- **Categorical criterion** — a condition that gives a yes/no answer. A human looking at the same input should reach the same verdict. No guessing required.
- **False-positive rate** — how often the model flags something that isn't actually a problem. When this is high, people stop reading flags entirely.

---

#### Guided Practice
**Exercise A — Criterion Surgery**

Take your instruction from Do This First. Rewrite it as: "Flag a [THING] only when [CONCRETE OBSERVABLE CONDITION]." Write three candidates. Pick the sharpest one. For each of the other two, identify which inputs it would mis-classify and why.

**Exercise B — Few-Shot Construction**

For your sharpest criterion, write three examples:
1. Clear true positive — meets the criterion exactly.
2. Clear true negative — looks suspicious but does not meet it.
3. Edge case — reasonable people might disagree; resolve it with an explicit verdict.

Label each with a verdict and one sentence explaining why. For example: a function whose comment says "Returns the user" but queries the orders table is a clear FLAG (claimed behaviour contradicts actual behaviour); a function that sums prices with a comment that just says "Sums prices" is NO FLAG (vague, but not contradictory); a function that silently filters soft-deleted records while the comment says "Returns all users" is NO FLAG (it omits a filter but asserts nothing false — incompleteness isn't contradiction).

Run the same ten inputs from last week. Count how the flags changed.

---

#### Explain It Back
**Prompt:** "Why does 'be conservative' or 'only flag high-confidence issues' fail to reduce false positives? What does fix it?"

Good answer: "Be conservative" is unmeasurable — the model can't ground it against evidence. It changes hedging language, not what the model actually attends to. What works: (a) a categorical criterion that narrows what counts as a true positive, and (b) few-shot examples that show where the line sits, including edge cases. Examples also help the model generalise to new patterns and reduce fabrication in extraction tasks by giving it a template to match against.

---

#### Pattern / Anti-pattern
A categorical criterion paired with a severity table anchored to concrete examples — HIGH (contradicts core logic: wrong return type, wrong table, wrong sign), MEDIUM (contradicts a named parameter or documented side-effect), LOW (omits a material filter but asserts nothing false) — followed by labelled examples.

**Named Villain: The Vague Vizier**

Shows up as soft, unmeasurable guidance: "be thorough," "use good judgment," "flag anything that seems off." Sounds wise. Actually offloads the specification work onto the model, then complains about the results. A criterion is vague if a human can't evaluate it by looking at the same input. It's categorical when human and model should reach the same verdict.

**Tactical note:** if a category is generating too many false positives while you're iterating, disable it temporarily. Developer trust is finite. One noisy category damages credibility across all of them. Fix it in staging; re-enable when precision is acceptable.

**Root principle violated:** P1 — vague instructions leave the decision boundary underspecified, so the output is non-deterministic in exactly the ways that matter.

---

#### Scenario Check
**Question:** A customer support agent resolves 55% of contacts on first touch. Analysis shows it escalates easy, clearly-in-policy cases and attempts hard policy-exception cases itself. What is the best fix?

- **A.** Add explicit escalation criteria with few-shot examples of when to escalate versus resolve.
- **B.** Ask the agent to self-report confidence on a 1–10 scale and escalate below 5.
- **C.** Train a separate classifier to route tickets before they reach the agent.
- **D.** Escalate all tickets where customer sentiment is negative.

**Correct answer: A**

The agent has a misaligned decision boundary — it lacks a categorical definition of "escalate vs resolve." Explicit criteria with examples fixes it directly and cheaply (P1, P3). B is tempting because self-reported confidence sounds principled — it isn't. LLM self-confidence is poorly calibrated, so a threshold on a miscalibrated signal is just noise. C is over-engineered before prompt optimisation has been tried. D fails because sentiment doesn't tell you how complex a case is — a frustrated customer with a simple in-policy request doesn't need escalating.

**Pass bar: 72%**

---

#### Apply / Transfer
Under each classification or review task in `MY_SYSTEM.md`:
1. Replace any vague instruction with a categorical criterion: "Flag only when [CONCRETE CONDITION]."
2. Add a severity table with at least two levels, each anchored to a concrete example.
3. Add 2–4 few-shot examples — include at least one edge case with an explicit verdict.
4. Note any currently noisy category and mark it `[DISABLED — iterating on criterion]`.

---

#### Review Hooks
- Can you state your classification criterion as a one-sentence testable condition?
- Does your few-shot set include an ambiguous case with an explicit resolution?
- Do your severity levels have concrete anchors, or are they just adjectives?
- If a category is noisy, have you disabled it rather than letting it contaminate developer trust?
- Which principle does The Vague Vizier violate, and why is "be conservative" not a criterion?

---
---

