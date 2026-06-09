# Week 1 Session 2 Guide

## Title

Agentic Loops and Stop Reasons

## Official Mapping

- d1.1
- d5.1

## Scenario Anchor

A support agent loops forever because the developer watches assistant text instead of the API control signal.

## Teaching Flow

1. Re-anchor the loop in plain English.
2. Teach `tool_use` vs `end_turn`.
3. Contrast correct loop control with text-parsing anti-patterns.
4. Run the lesson checkpoint.
5. Use `C1: Support Loop Safety` if transfer is needed.
6. End with the session quiz.

## Watch For

- learner using natural language as the termination signal
- learner memorizing labels without understanding the loop lifecycle

## Official Anchor

- anti-pattern: parsing assistant text instead of checking `stop_reason`
- code mechanic: loop control checks `tool_use` vs `end_turn`

## Good Next Step

- if solid: `/start-w1-s3`
- if shaky: `labs/lab-1-support-loop.md`
