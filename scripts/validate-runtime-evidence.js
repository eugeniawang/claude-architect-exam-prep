#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || process.cwd());
const evidencePath = path.join(root, "RUNTIME-EVIDENCE.md");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function readLineValue(text, label) {
  const match = text.match(new RegExp(`^- ${label}:[ \\t]*(.*)$`, "m"));
  return match ? match[1].trim() : "";
}

function parseCommandRows(text) {
  return text
    .split("\n")
    .filter((line) => /^\|\s*\d+\s*\|/.test(line))
    .map((line) => {
      const cols = line.split("|").map((col) => col.trim());
      return {
        step: cols[1] || "",
        command: cols[2] || "",
        expected: cols[3] || "",
        observed: cols[4] || "",
        mutated: cols[5] || "",
        passFail: cols[6] || "",
        notes: cols[7] || "",
      };
    });
}

function isFilled(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function main() {
  assert(fs.existsSync(evidencePath), "RUNTIME-EVIDENCE.md missing");
  const text = readText(evidencePath);

  const requiredMetadata = [
    "Date",
    "Maintainer",
    "Course folder path used",
    "Fresh learner or returning learner",
  ];

  for (const label of requiredMetadata) {
    assert(isFilled(readLineValue(text, label)), `Missing runtime evidence metadata: ${label}`);
  }

  const rows = parseCommandRows(text);
  assert(rows.length === 15, `Expected 15 command evidence rows, found ${rows.length}`);

  for (const row of rows) {
    assert(isFilled(row.command), `Row ${row.step} missing command or prompt`);
    assert(isFilled(row.expected), `Row ${row.step} missing expected behavior`);
    assert(isFilled(row.observed), `Row ${row.step} missing observed result`);
    assert(isFilled(row.passFail), `Row ${row.step} missing pass/fail result`);
    assert(
      ["pass", "fail"].includes(row.passFail.toLowerCase()),
      `Row ${row.step} pass/fail must be Pass or Fail`
    );
  }

  const requiredVerdicts = [
    "Runtime proof status",
    "Safe to share broadly",
    "Follow-up fixes required",
  ];

  for (const label of requiredVerdicts) {
    assert(isFilled(readLineValue(text, label)), `Missing verdict field: ${label}`);
  }

  const completionChecks = [
    "Was `completion_status` updated correctly?",
    "Was `course_completed` updated correctly?",
    "Was `course_completed_at` written?",
    "Was `course_completion_basis` written?",
    "Was `last_completed_item` written?",
  ];

  for (const label of completionChecks) {
    const pattern = new RegExp(`^- ${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*(.+)$`, "m");
    const match = text.match(pattern);
    assert(match && isFilled(match[1]), `Missing completion evidence answer: ${label}`);
  }

  console.log("CCA-F RUNTIME EVIDENCE VALIDATED");
  console.log(`Root: ${root}`);
  console.log(`Evidence file: ${evidencePath}`);
  console.log(`Verified command rows: ${rows.length}`);
  console.log("Verified: required metadata, command evidence, completion evidence, and verdict fields are filled");
}

try {
  main();
} catch (error) {
  console.error("CCA-F RUNTIME EVIDENCE VALIDATION FAILED");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
