#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const cp = require("child_process");

const sourceRoot = path.resolve(process.argv[2] || process.cwd());

function runNode(args, cwd) {
  return cp.execFileSync("node", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else if (entry.isFile()) fs.copyFileSync(srcPath, destPath);
  }
}

function readJson(root, relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

function writeJson(root, relPath, value) {
  fs.writeFileSync(path.join(root, relPath), `${JSON.stringify(value, null, 2)}\n`);
}

function readText(root, relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

function writeText(root, relPath, value) {
  fs.writeFileSync(path.join(root, relPath), value);
}

function exists(root, relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function main() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cca-course-smoke-"));
  const copiedRoot = path.join(tempRoot, "claude-course");
  copyDir(sourceRoot, copiedRoot);

  const initialProofStatus = runNode(["scripts/runtime-proof-status.js", "."], copiedRoot);
  assert(initialProofStatus.includes("Status: NO_LIVE_PROOF_RECORDED"), "Initial proof status should show no live proof recorded");

  const freshOutput = runNode(["scripts/course-control.js", "."], copiedRoot);
  assert(freshOutput.includes("State: Fresh or reset"), "Fresh-state control output missing");
  assert(freshOutput.includes("type: start"), "Fresh-state should recommend start");
  assert(freshOutput.includes("/help"), "Fresh-state should surface /help");
  assert(freshOutput.includes("/start-course"), "Fresh-state should still mention /start-course");
  assert(freshOutput.includes("/practice-exam"), "Fresh-state should surface /practice-exam");

  const config = readJson(copiedRoot, ".claude/cca-course-config.json");
  const progress = readJson(copiedRoot, ".claude/cca-course-progress.json");
  config.student_name = "Test Learner";
  progress.current_week = "Week 2";
  progress.current_session = "Session 2.2";
  progress.current_mode = "lesson";
  progress.completed_sessions = ["W1-S1", "W1-S2", "W1-S3"];
  progress.due_reviews = ["d1.1"];
  progress.weak_domains = ["d3.2"];
  writeJson(copiedRoot, ".claude/cca-course-config.json", config);
  writeJson(copiedRoot, ".claude/cca-course-progress.json", progress);

  const resumeOutput = runNode(["scripts/course-control.js", "."], copiedRoot);
  assert(resumeOutput.includes("State: In progress"), "In-progress control output missing");
  assert(resumeOutput.includes("type: continue"), "In-progress should recommend continue");
  assert(resumeOutput.includes("/help"), "In-progress should surface /help");
  assert(resumeOutput.includes("/resume-course"), "In-progress should still mention /resume-course");
  assert(resumeOutput.includes("/practice-exam"), "In-progress should surface /practice-exam");

  progress.completion_status = "completed";
  progress.course_completed = true;
  progress.course_completed_at = "2026-06-08";
  progress.course_completion_basis = "Passed final mock exam after completing all four weeks";
  progress.last_completed_item = "Mock Exam";
  writeJson(copiedRoot, ".claude/cca-course-progress.json", progress);

  const completedControlOutput = runNode(["scripts/course-control.js", "."], copiedRoot);
  assert(completedControlOutput.includes("State: Course completed"), "Completed-state control output missing");
  assert(completedControlOutput.includes("/quiz-me"), "Completed-state should recommend /quiz-me");
  assert(completedControlOutput.includes("/help"), "Completed-state should surface /help");
  assert(completedControlOutput.includes("/mock-exam"), "Completed-state should still mention /mock-exam");
  assert(completedControlOutput.includes("/practice-exam"), "Completed-state should surface /practice-exam");

  const completedStartOutput = runNode(["scripts/start-or-resume.js", "."], copiedRoot);
  assert(completedStartOutput.includes("Status: Completed learner state found"), "Completed-state start helper missing");
  assert(completedStartOutput.includes("Completion: completed"), "Completed-state should show completion status");

  const evidencePath = "RUNTIME-EVIDENCE.md";
  let evidenceText = readText(copiedRoot, evidencePath);
  evidenceText = evidenceText
    .replace("- Date:\n", "- Date: 2026-06-08\n")
    .replace("- Maintainer:\n", "- Maintainer: Smoke Test\n")
    .replace("- Course folder path used:\n", "- Course folder path used: /tmp/cca-course-smoke\n")
    .replace("| 1 | `start` | Fresh learner routing works |  |  |  |  |\n", "| 1 | `start` | Fresh learner routing works | Routed to fresh learner path | `.claude/cca-course-progress.json` | Pass | Smoke test evidence |\n");
  writeText(copiedRoot, evidencePath, evidenceText);

  const partialProofStatus = runNode(["scripts/runtime-proof-status.js", "."], copiedRoot);
  assert(partialProofStatus.includes("Status: LIVE_PROOF_LOG_PARTIAL"), "Proof status should show partial live proof after evidence is added");
  assert(partialProofStatus.includes("Command steps recorded: 1/15"), "Proof status should count recorded evidence rows");

  const resetOutput = runNode(["scripts/reset-course-state.js", "."], copiedRoot);
  assert(resetOutput.includes("COURSE STATE RESET"), "Reset script did not report success");

  const postResetOutput = runNode(["scripts/course-control.js", "."], copiedRoot);
  assert(postResetOutput.includes("State: Fresh or reset"), "Post-reset control output missing");

  const resetConfig = readJson(copiedRoot, ".claude/cca-course-config.json");
  const resetProgress = readJson(copiedRoot, ".claude/cca-course-progress.json");
  assert(resetConfig.student_name === "", "Reset should clear learner name");
  assert(resetProgress.completion_status === "not-started", "Reset should clear completion status");
  assert(resetProgress.course_completed === false, "Reset should clear completed flag");
  assert(resetProgress.course_completed_at === "", "Reset should clear completion date");
  assert(resetProgress.course_completion_basis === "", "Reset should clear completion basis");
  assert(resetProgress.last_completed_item === "", "Reset should clear last completed item");
  assert(Array.isArray(resetProgress.completed_sessions) && resetProgress.completed_sessions.length === 0, "Reset should clear completed sessions");
  assert(Array.isArray(resetProgress.completed_gates) && resetProgress.completed_gates.length === 0, "Reset should clear completed gates");
  assert(Array.isArray(resetProgress.due_reviews) && resetProgress.due_reviews.length === 0, "Reset should clear due reviews");
  assert(Array.isArray(resetProgress.weak_domains) && resetProgress.weak_domains.length === 0, "Reset should clear weak domains");

  const validateOutput = runNode(["scripts/validate-course.js", "."], copiedRoot);
  assert(validateOutput.includes("COURSE VALIDATION PASSED"), "Copied course failed validation");

  console.log("COURSE SMOKE TEST PASSED");
  console.log(`Source: ${sourceRoot}`);
  console.log(`Temp copy: ${copiedRoot}`);
  console.log("Verified: fresh controls, in-progress controls, completed controls, reset metadata, reset proof log, validation");
}

try {
  main();
} catch (error) {
  console.error("COURSE SMOKE TEST FAILED");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
