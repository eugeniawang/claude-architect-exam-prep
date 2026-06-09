# Week 3 Workbook: Prompting and Reliability

## Lab 1: Criteria Upgrade

Rewrite:

`Check for problems in this code.`

Add:

- what counts as a problem
- what does not count
- severity expectation

## Lab 2: Tiny Schema

Design a mini schema for extracting:

- invoice number
- invoice date
- total amount
- whether confidence is unclear

## Lab 3: Retry or Escalate

Case A: The output JSON is missing a required field because the value was present but formatted oddly.

Case B: The source document never mentions the field.

For each, choose:

- retry with feedback
- escalate / mark unavailable

## Lab 4: Provenance

Why should a downstream summary include:

- source URL or file
- page or section
- date or context
