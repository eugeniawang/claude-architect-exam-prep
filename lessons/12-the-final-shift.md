### Session 12 — The Final Shift

#### Overview
Pull the seven principles together across unfamiliar scenarios, then clear a real-format mock at the 720 bar.

#### Skill built
Integrating all seven principles under exam conditions, and defending an architecture you could hand to a team.

#### Prerequisites / foundations
Sessions 0–11 done, each phase gate cleared at 72%. If a phase gate is still short, the instructor sends
you back there first.

#### Do This First — the Distractor Gauntlet
Twelve rapid-fire scenarios, one at a time, modelled on the official sample questions. For each, call the
answer and name the nemesis. The instructor keeps a streak. Themes: prerequisite gate vs prompt;
vague vs structured tool descriptions; escalation criteria; where a shared command lives; plan mode for a
monolith split; conventions across scattered files; coverage gaps in decomposition; structured error
context on a subagent timeout; a scoped verify tool vs all tools; the `-p` flag for a hung pipeline;
batching only the non-blocking job; per-file plus cross-file review.

#### What Just Happened
Each one is a principle in disguise. Name the principle and the answer follows — even on wording you've
never seen. That's the exam.

#### Guided Practice — your architecture brief
Assemble the per-session notes in `MY_SYSTEM.md` into a one-page brief: how the loop stops; which rules
are hooks/gates not prompts; tool-set size, error shape, and config scope; plan-vs-direct calls; prompting,
schema, and validation-retry; context preservation, escalation triggers, provenance; and the top three
risks today with the systems fix for each. This brief is also your night-before revision sheet.

#### Explain It Back
Pick the weakest part of your own architecture and say, plainly, what you'd change and which principle
drives it. (Good answer names a systems fix and the principle — not "I'd prompt it better.")

#### Pattern / Anti-pattern
Under time pressure: name the principle first, then cut the two or three options that "ask the model
harder" or over-build. The anti-pattern is picking whatever "sounds thorough."

#### Scenario Check — the Mock
A timed mock of **4 of the 6 official scenarios, chosen at random**, MCQs across all five domains,
calibrated to the official samples. **Pass bar: 72%.** Below it, the instructor gives a per-domain repair
plan (exact sessions and nemeses) and re-tests only the weak areas, then logs the result and readiness.

#### Apply / Transfer
Finalise the `MY_SYSTEM.md` brief, and write the one change you'd propose to your team — the part that
outlasts the exam.

#### Review Hooks
Green mock → book the exam. Short → run `practice-exam` on the flagged domains and re-sit. Final check:
can you teach the seven principles to someone else in five minutes, using your own system as the example?

<!-- capstone complete: session 12 -->
