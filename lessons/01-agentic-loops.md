### Session 1 — Agentic Loops & stop_reason

**Domains 1.1, 1.5 · Principle P1 · Nemesis: The Text Whisperer**

#### Overview
How an agentic loop terminates — and why the field that controls it is not a sentence.

#### Skill Built
You'll be able to read an agentic loop and spot when it's using the wrong exit condition — then explain exactly why that breaks and what the correct fix is.

#### Prerequisites / Foundations
Three terms you need before this makes sense:

**Token** — the model doesn't write whole sentences at once. It predicts and emits one small chunk of text at a time (roughly a word or punctuation mark). It doesn't "think then speak"; it streams tokens sequentially.

**Tool call** — when the model wants to use a function, it emits a structured `tool_use` block. It does not run the function itself. It requests the run; your code does the rest.

**Conversation turns** — the message array you maintain. Every user message, every assistant reply, every tool result you add extends this array. The model sees the whole array on every API call.

#### Do This First
A travel booking agent runs in a loop. After each model response, the loop checks whether the assistant's reply contains `"booking confirmed"`. If it does, the loop exits. Otherwise it keeps going.

Before reading on: write down one way this exits too early and one way it loops forever.

#### What Just Happened
The loop is watching the model's words instead of reading the API's signal.

The model is probabilistic — the same intent can come out as "booking confirmed", "all set for Edinburgh", or "done". The text match either fires too early (false positive) or never fires (the model phrased it differently, so the loop runs forever). When the model emits a tool call with no text at all, the match has nothing to check and the loop never exits.

The fix is not a smarter regex. Stop reading the model's lips.

The API gives you `stop_reason` — a structured field drawn from a defined set of values. Read that instead.

#### Guided Practice
**Exercise A — Fix the loop.**

Rewrite the loop so it exits based on `stop_reason` only. Handle at minimum:
- `tool_use` → run the tool, append the result, continue
- `end_turn` → clean exit
- `max_tokens` → log it, break
- anything else → log it, break (fail safe, not fail silent)

The result is a single `if/elif` chain. No text inspection anywhere.

**Exercise B — Trace a three-turn loop.**

On paper, trace the `messages` array step by step:

1. User: "What's the status of order #4421?"
2. Model emits `tool_use` → `lookup_order(order_id="4421")`
3. You append the tool result: `{status: "shipped", eta: "Thursday"}`
4. Model emits `end_turn` → "Your order ships Thursday."

After step 4: how many items are in `messages`? What are their roles in order?

*(Expected: 4 — user, assistant[tool_use], user[tool_result], assistant[text]. `stop_reason = end_turn`. Loop exits.)*

#### Explain It Back
Explain to a junior engineer — two minutes, no jargon — why you never parse the assistant's text to decide when to stop.

A good answer covers:
- The model is probabilistic — same intent, different words every time
- One example of false positive (exits too early), one of infinite loop (never exits)
- The correct alternative: `stop_reason` is a structured API field, not prose. `tool_use` means "call a tool." `end_turn` means "I'm done."

If you catch yourself saying "the model will always say X when..." — that's The Text Whisperer. That's the wrong path.

#### Pattern / Anti-pattern
**Good pattern — `stop_reason`-driven loop:**

- `tool_use` → execute tools, append results, continue
- `end_turn` → clean exit
- `max_tokens` → handle truncation
- anything else → log + break (fail safe)

Every exit path is explicit. The loop is deterministic. No English comprehension required.

**The Nemesis: The Text Whisperer**

Trusts natural language to carry control-flow decisions. Cousins:
- **The Cap Optimist** — sets `max_iterations = 10` as the only stop condition. This does guarantee the loop ends. It doesn't fix the broken exit logic, and it silently cuts off correct long-running tasks.
- **The Keyword Parser** — instructs the model to always say "DONE" when finished. The model will not always say it. On day one in production, it won't say it when it matters most.

**Root principle violated:** P1 — *Determinism for the correctness-critical; the model for judgment.* When to stop the loop is correctness-critical. The model's prose is probabilistic. The API gives you `stop_reason` so you don't have to guess.

#### Scenario Check
**Question**

A production booking agent occasionally loops forever on simple requests. The loop exits by checking whether the assistant's response contains `"booking confirmed"`. Which fix addresses the root cause?

**A.** Replace string-matching with a `stop_reason`-driven exit: break on `end_turn`, execute tools on `tool_use`, handle `max_tokens` and all other values explicitly.

**B.** Add a hard `max_iterations = 20` cap so the loop always terminates eventually.

**C.** Update the system prompt to instruct the model to always end its response with `"booking confirmed"` when it finishes.

**D.** Add a retry-with-backoff wrapper so that when the loop runs long, the request is restarted with a fresh context.

**Correct answer: A**

**Rationale:**

- **A is correct.** The root cause is probabilistic termination logic — a P1 violation. `stop_reason` is a guaranteed, structured API field from a defined set of values. It was designed for exactly this purpose.

- **B is tempting** because it does guarantee the loop ends. But the text-matching exit is still there. You've capped the damage, not fixed the bug. Correct long-running tasks get silently cut short.

- **C is tempting** because it closes the gap between what the model says and what the code expects. But instruction-following is not guaranteed — especially under tool call sequences or long contexts. Now two probabilistic things depend on each other.

- **D is a distraction.** Retrying doesn't fix the termination logic. It also resets accumulated context, making the problem worse. That's a P2 violation layered on top of a P1 violation.

#### Apply / Transfer
In `MY_SYSTEM.md`, under `## Agentic Loops`, answer:

1. Which loop termination strategy does your agent use — `stop_reason`, text match, iteration cap, something else?
2. If you received a `pause_turn` or `refusal` stop reason today, would your loop handle it or break silently?
3. Name the three `stop_reason` values the exam tests. Name four additional values the live API returns. Mark which you handle and which you ignore.

This is your gap register. Return to it at review.

#### Review Hooks
**Revisit if shaky:**
- What is appended to `messages` after a tool call — and in which role? (User, not assistant.)
- Why `max_tokens` is a stop reason, not just an error.
- The difference between a `tool_use` content block and a `text` content block in `response.content`.

**Cumulative review prompt:**

> "I'm running an agentic loop. The model makes two tool calls in a row, emits no text, and then returns `end_turn`. Walk me through: what is in the messages array, what does my loop do at each step, and where does it exit?"

If you can answer that fluently, you own Session 1.

---

