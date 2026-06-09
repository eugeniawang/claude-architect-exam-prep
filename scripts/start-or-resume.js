#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || process.cwd());

function readJson(relPath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
  } catch {
    return {};
  }
}

function hasNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function main() {
  const config = readJson(".claude/cca-course-config.json");
  const progress = readJson(".claude/cca-course-progress.json");

  const learnerName = hasNonEmptyString(config.student_name) ? config.student_name.trim() : "";
  const currentWeek = hasNonEmptyString(progress.current_week) ? progress.current_week.trim() : "";
  const currentSession = hasNonEmptyString(progress.current_session) ? progress.current_session.trim() : "";
  const completionStatus = hasNonEmptyString(progress.completion_status) ? progress.completion_status.trim() : "not-started";
  const completedSessions = Array.isArray(progress.completed_sessions) ? progress.completed_sessions.length : 0;
  const completedAt = hasNonEmptyString(progress.course_completed_at) ? progress.course_completed_at.trim() : "";

  const freshState =
    !learnerName &&
    !currentWeek &&
    !currentSession &&
    completedSessions === 0;

  console.log("CCA-F START OR RESUME");
  console.log(`Root: ${root}`);
  console.log("");

  if (progress.course_completed === true) {
    console.log("Status: Completed learner state found");
    if (learnerName) console.log(`Learner: ${learnerName}`);
    console.log(`Completion: ${completionStatus}${completedAt ? ` (${completedAt})` : ""}`);
    console.log("Do this in Claude Code:");
    console.log("  1. /progress");
    console.log("  2. /quiz-me");
    console.log("  3. /mock-exam");
  } else if (freshState) {
    console.log("Status: Fresh or reset folder");
    console.log("Do this in Claude Code:");
    console.log("  1. type: start");
    console.log("  2. or type: start next lesson");
    console.log("  3. or use: /start-course");
  } else {
    console.log("Status: Existing learner state found");
    if (learnerName) console.log(`Learner: ${learnerName}`);
    if (currentWeek || currentSession) {
      console.log(`Last known point: ${currentWeek || "Unknown week"} / ${currentSession || "Unknown session"}`);
    }
    console.log(`Completion: ${completionStatus}`);
    console.log("Do this in Claude Code:");
    console.log("  1. type: continue");
    console.log("  2. or type: start next lesson");
    console.log("  3. or use: /resume-course");
  }

  console.log("");
  console.log("If this folder should be blank first:");
  console.log("  /reset-course-state");
  console.log("  or node scripts/reset-course-state.js .");
}

try {
  main();
} catch (error) {
  console.error("START OR RESUME FAILED");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
