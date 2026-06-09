# Week 3 Session 3 Guide

## Title

Validation, Retries, and Reliability

## Official Mapping

- d4.4
- d5.2
- d5.4

## Scenario Anchor

An extractor returns valid output, but one value is wrong and another is missing from the source.

## Teaching Flow

1. Teach semantic validation vs structural validation.
2. Teach when retry helps and when it does not.
3. Add provenance and escalation decisions.
4. Run the lesson checkpoint.
5. Run `C6: Extraction Reliability Decision`.
6. End with the session quiz.

## Watch For

- learner retrying absent-source-data problems
- learner skipping provenance when sources conflict

## Official Anchor

- anti-pattern: retrying when the source does not contain the needed fact
- code mechanic: validation errors feed retry; absent facts feed escalation or null handling

## Good Next Step

- if solid: Week 3 gate or `/start-w4-s1`
- if shaky: `labs/lab-4-structured-extraction.md`
