### Session 0 — The Prime Directive

#### Overview
Learn the one idea the whole exam rests on, and the lens you'll read every scenario through.

#### Skill built
Reading any scenario as: *systems fix, or asking the model harder?*

#### Prerequisites / foundations
None. If a term is unfamiliar, say so and it gets repaired as it comes up.

> Setup happens first, in the background: the instructor asks four quick things — name, bad-joke
> tolerance, comfort 1–5 per domain, and a 1/2/3-month timeline — then begins. No system details needed yet.

#### Do This First
A refund agent occasionally issues refunds above the $500 policy limit. A teammate says: "add a line to
the prompt telling it never to exceed $500." Will that *guarantee* the limit holds? Yes or no — decide.

#### What Just Happened
No. The model is probabilistic, so a prompt instruction has a non-zero failure rate. A guarantee needs
code that can't be talked out of it. That's the Prime Directive: **the LLM is one probabilistic component;
architecture is everything you wrap around it.** (You meet the proper fix — a hook — in Session 3.)

#### Guided Practice
Name one place in your own work where something relies on the model "remembering" or "being careful"
where it really needs a hard rule.

#### Explain It Back
In one line: why can't a prompt guarantee the $500 rule? (Good answer: probabilistic component → non-zero
failure rate → needs deterministic enforcement. That's principle **P1**.)

#### Pattern / Anti-pattern
**Pattern:** ask "what's the systems fix?" first. **Anti-pattern:** reach for a better prompt, more
retries, a confidence score, or a bigger model — "asking the model harder." Every nemesis you'll meet is
one of seven principles, broken.

#### Scenario Check
Which is the systems answer to the $500 problem?
A) Tell the model to be more careful. B) Have it rate its own confidence and stop if low.
C) Block any refund over $500 in code before it executes. D) Add three correct examples to the prompt.
**Answer: C.** A and D are prompt tweaks (probabilistic). B trusts the model to grade itself (it's poorly
calibrated). C is the only thing that can't be talked out of it.

#### Apply / Transfer
In `MY_SYSTEM.md`: note one place your system "asks the model harder" where it should enforce in code.

#### Review Hooks
The Prime Directive returns every session. Carry one question: *systems fix, or asking the model harder?*
## Phase 1 — The Agent's Spine

---

