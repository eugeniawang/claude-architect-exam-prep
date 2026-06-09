#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || process.cwd());
const evidencePath = path.join(root, "RUNTIME-EVIDENCE.md");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readLineValue(text, label) {
  const match = text.match(new RegExp(`^- ${label}:[ \\t]*(.*)$`, "m"));
  return match ? match[1].trim() : "";
}

function hasMetadata(text) {
  return [
    "Date",
    "Maintainer",
    "Course folder path used",
  ].every((label) => readLineValue(text, label).length > 0);
}

function countRecordedRows(text) {
  const rows = text.split("\n").filter((line) => /^\|\s*\d+\s*\|/.test(line));
  let recorded = 0;
  for (const row of rows) {
    const cols = row.split("|").map((col) => col.trim());
    const observed = cols[4] || "";
    const mutated = cols[5] || "";
    const passFail = cols[6] || "";
    const notes = cols[7] || "";
    if ([observed, mutated, passFail, notes].some((value) => value.length > 0)) {
      recorded += 1;
    }
  }
  return { total: rows.length, recorded };
}

function main() {
  const text = readText(evidencePath);
  const metadataRecorded = hasMetadata(text);
  const { total, recorded } = countRecordedRows(text);
  const runtimeProofStatus = readLineValue(text, "Runtime proof status");
  const shareVerdict = readLineValue(text, "Safe to share broadly");
  const followUp = readLineValue(text, "Follow-up fixes required");

  let status = "NO_LIVE_PROOF_RECORDED";
  if (metadataRecorded || recorded > 0 || runtimeProofStatus || shareVerdict || followUp) {
    status = recorded === total && total > 0 ? "LIVE_PROOF_LOG_SUBSTANTIAL" : "LIVE_PROOF_LOG_PARTIAL";
  }

  console.log("CCA-F RUNTIME PROOF STATUS");
  console.log(`Root: ${root}`);
  console.log(`Evidence file: ${evidencePath}`);
  console.log(`Status: ${status}`);
  console.log(`Metadata recorded: ${metadataRecorded ? "yes" : "no"}`);
  console.log(`Command steps recorded: ${recorded}/${total}`);
  console.log(`Runtime proof status field: ${runtimeProofStatus || "blank"}`);
  console.log(`Share verdict field: ${shareVerdict || "blank"}`);
  console.log(`Follow-up fixes field: ${followUp || "blank"}`);
}

try {
  main();
} catch (error) {
  console.error("RUNTIME PROOF STATUS FAILED");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
