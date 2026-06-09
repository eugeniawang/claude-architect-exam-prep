### Session 4 — Tool Design & Structured Errors

**Domain 2.1, 2.2, 2.3 · Principles P3, P4 · Nemeses: The Hoarder, The Mumbler, Old Faithful Failure**

---

#### Overview
When your agent calls `analyze_content` to look up an order and gets a weather summary instead, the model isn't broken — the tool description is. Tool descriptions are routing instructions. This session fixes the two places tool calls break: picking the wrong tool, and returning errors the agent can't act on.

---

#### Skill Built
Write tool descriptions that route correctly, configure `tool_choice` for each calling pattern, and return structured errors that enable real recovery.

---

#### Prerequisites / Foundations
- Every tool definition has three parts: name, description, `input_schema`.
- The model reads descriptions at inference time. It never sees your source code.
- A tool call returns a result block — that's where errors live.

---

#### Do This First
Open `MY_SYSTEM.md`. List every tool your system exposes. Next to each name, write one sentence: *what does this tool refuse to do?* If you can't write the refusal, the boundary isn't clear — and the model can't infer it either.

---

#### What Just Happened
A description that only says what a tool *does* leaves the model guessing when it should go somewhere else. Two tools with near-identical descriptions — say, `analyze_content` and `analyze_document` — create a coin-flip. That's not the model's fault. Boundaries, input formats, example queries, and explicit exclusions are the signal. Without them, the model has nothing to route on.

---

#### Guided Practice
**Exercise 4a — Rename and re-describe.** You have two tools with interchangeable descriptions. Rewrite each to include: input format, one example query, and one explicit exclusion that names the other tool. Goal: a model reading both can never confuse them.

**Exercise 4b — Tool count audit.** List every tool in your agent. If the count exceeds 8, flag each one: does it overlap with another? Could it be a more specific version of a well-described tool? Aim for 4–5. The Hoarder will resist. Resist back.

---

#### Explain It Back
Why does the number of available tools affect which tool gets called?

- Tool selection is probabilistic. The model matches the user's request against description similarity.
- More tools means more chances for two descriptions to look alike. Overlapping descriptions degrade routing — even when the names look different.
- The sweet spot is roughly 4–5 tools. Eighteen tools is a well-documented degradation case.
- The fix is not "try harder with the model" — it's making descriptions non-overlapping and specific.

---

#### Pattern / Anti-pattern
**Good pattern:** each tool description states what it accepts, gives one example, and names what it explicitly refuses — including which other tool handles that case instead.

**Nemesis: The Hoarder**

Keeps adding tools "just in case." Ends up with eighteen tools, half of them overlapping, all described with the word "handles." The model calls the wrong one on every third request. The Hoarder's fix is tool nineteen. Violates **P3 — match mechanism to problem shape and cost**. More tools means a harder routing problem, not a more capable agent.

**Nemesis: The Mumbler**

Writes descriptions like `"Performs the operation on the given input."` The model guesses. It guesses wrong. The Mumbler's fix is a keyword-routing layer in front of the model — complex, brittle, and it misses the whole point of having a model. Violates **P4 — make failure legible**. If the model can't tell what a tool does, you can't tell why it called the wrong one.

**Nemesis: Old Faithful Failure**

Every error returns `"Operation failed."` No category, no flag, nothing to act on. There's no difference between "the database is down" and "that customer ID doesn't exist." Structured errors use `isError: true`, an `errorCategory` field, a human-readable message, and `isRetryable: true/false`. Setting `isRetryable: false` on a business-rule violation stops the retry loop. Setting `errorCategory: "transient"` signals that a retry is reasonable.

One more trap: access failures must never silently return empty results. An empty array when the lookup actually failed causes the model to confidently summarise nothing.

**Root principle:** P4 and P3. A tool that can't be selected and can't report failure clearly is a liability.

---

#### Scenario Check
> An agent handles customer profile lookups and order history queries. Developers notice it calls `get_customer` when users ask about orders. Both tools have minimal, nearly identical descriptions. What is the **best first step**?
>
> **A.** Add 5–8 few-shot examples to the system prompt showing which tool to call.
> **B.** Expand each tool's description to include input formats, example queries, and explicit boundaries.
> **C.** Build a pre-processing routing layer that keyword-parses the user message and forces the correct tool call.
> **D.** Consolidate both tools into a single `lookup_entity` tool that handles both.

**Correct answer: B.** Tool descriptions are the primary mechanism the model uses to select tools — fix them first. A adds token overhead without touching the root cause. C works eventually but is over-engineered as a first step and creates ongoing maintenance. D is a valid later move but is disproportionate as a first fix.

**Pass bar: 72%**

---

#### Apply / Transfer
In `MY_SYSTEM.md`, add a **Tools** section with a table: tool name · what it accepts · example query · explicit exclusion · `isRetryable` on failure. Fill at least two rows. Flag any tools that overlap.

---

#### Review Hooks
- Can you state in one sentence what each tool *refuses* to do?
- Do any two tool descriptions share more than three words in their opening clause?
- Does every error path return `isError`, `errorCategory`, and `isRetryable`?
- Could any access failure silently return an empty result? Find it. Fix it.

---

---

