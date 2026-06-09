# Distractor Patterns — wrong answers, and the principle each one breaks

Every distractor on this exam is a **violated principle wearing a hat** (a nemesis). Learn to spot the
*reflex* behind the wrong answer and you can eliminate 2–3 options before you even reach the right one.

## The meta-tell (true of almost every distractor)
A wrong answer almost always does one of two things. Train your eye for these first:
1. **Asks the model harder** — "improve the prompt", "add more examples", "have it rate its own
   confidence", "tell it to be careful", "escalate when the customer sounds upset". The model is
   probabilistic; none of these *guarantee* anything. (Breaks **P1**.)
2. **Reaches for a disproportionate fix** — a new classifier, a fine-tune, a bigger context window, a
   routing layer — when a small, root-cause fix exists. (Breaks **P3**.)

When two options are "ask harder" and "build a cathedral", the right answer is usually the calm,
proportionate, deterministic one sitting between them.

## The named patterns (each → principle → nemesis)
| Pattern | What it looks like | Principle broken | Nemesis | Diagnostic rule |
|---|---|---|---|---|
| **Parse text to stop the loop** | decide termination by reading the model's words | P1 | The Text Whisperer | loop control is `stop_reason`, not prose |
| **Iteration cap as the stop** | a max-turns counter is the *primary* stopping mechanism | P1 | The Text Whisperer | the cap is a backstop, not the control |
| **Prompt when deterministic needed** | enforce a business rule with prose | P1 | The Polite Asker | money/compliance/safety → hook or gate |
| **Self-reported confidence routing** | route on the model's 1–10 confidence | P1/P5 | The Sentiment-Based Escalator | LLM self-confidence is poorly calibrated |
| **Sentiment-based escalation** | escalate because the customer is upset | P1/P5 | The Sentiment-Based Escalator | escalate on policy gap / explicit request / no progress, not mood |
| **Hoard the tools** | one agent, ~18 tools | P3 | The Hoarder | ~4–5 per agent; scope to role |
| **Vague/overlapping descriptions** | two tools, near-identical blurbs | P3 | The Mumbler | descriptions are the selection mechanism — make them distinct |
| **Sledgehammer on a thumbtack** | plan mode / classifier / fine-tune for a tiny job | P3 | The Sledgehammer | match the mechanism to the size of the job |
| **Wrong lever** | a real feature aimed at the wrong problem (e.g. routing classifier to fix tool *ordering*) | P3 | The Sledgehammer | ask what mechanism the problem actually needs |
| **Hardcode the secret** | API key written into `.mcp.json` | P3 | The Secret-Spiller | `${ENV_VAR}` expansion; project vs user scope |
| **Bash for everything** | shell out when a built-in tool fits | P3 | The Bash Bludgeon | Grep=content, Glob=names, Edit/Read/Write for files |
| **Personal prefs in project scope** | put your taste in shared config (or team rules in user scope) | P3 | The Oversharer | shared→project, personal→user |
| **Fabricated feature** | invents a flag/key/behavior (`--batch`, `CLAUDE_HEADLESS`) | P3 | (impostor) | if it sounds official but isn't documented, suspect it |
| **Generic error** | "Operation failed" with no structure | P4 | Old Faithful Failure | return `isError`/`errorCategory`/`isRetryable` |
| **Access failure = empty result** | treat a failed lookup as "no matches" | P4 | Old Faithful Failure | distinguish failure from genuine empty |
| **Pay for failure repeatedly** | more retries when the data is simply absent | P3/P4 | The Eternal Retrier | retries fix format, not missing facts |
| **Schema means semantics** | trust valid JSON as correct | P5 | The Eternal Retrier | validate meaning after shape |
| **Same-session self-review** | the generator reviews its own work | P5 | The Self-Marker | use an independent instance / pass |
| **Aggregate masks the failure** | report one average accuracy | P5 | The Average-Hider | stratify by type/field; field-level confidence |
| **Summarize the facts away** | condense exact amounts/dates into a vague summary | P2 | The Summarizer of Doom | keep a case-facts block outside the summary |
| **Cause as cure** | "summarize harder" / "bigger context" for a context bug | P2 | The Summarizer of Doom | if the cure is more of the disease, reject it |
| **Mind-reader subagents** | assume subagents inherit context | P2/P6 | The Mind-Reader | pass context explicitly in the Task prompt |
| **Narrow decomposition** | split a broad task so it misses whole areas | P6 | The Narrow Decomposer | check coverage of the *whole* problem |
| **Silent reconciliation** | quietly pick one of two conflicting sources | P7 | The Silent Reconciler | annotate the conflict with attribution |
| **Be conservative** | "use good judgment" / "only high-confidence" as criteria | P1 | The Vague Vizier | replace soft restraint with measurable criteria |
| **Fine-tune / custom model** | jump to training | P3 (out of scope) | (impostor) | this exam is system design with existing Claude |

## How to use this file
- In any scenario, first run the **meta-tell**: which options are "ask harder" or "build a cathedral"? Cross them off.
- For the survivors, name the **principle** the wrong ones break and the **nemesis** — that's the explain-back the exam rewards.
- If a new recurring distractor shows up, add a row: pattern · principle · nemesis · diagnostic rule.
