#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || process.cwd());

const requiredFiles = [
  "README.md",
  "CLAUDE.md",
  "course/LESSONS.md",
  "study/SYLLABUS.md",
  "session-guides/week-1-session-1.md",
  "session-guides/week-1-session-2.md",
  "session-guides/week-1-session-3.md",
  "session-guides/week-2-session-1.md",
  "session-guides/week-2-session-2.md",
  "session-guides/week-2-session-3.md",
  "session-guides/week-3-session-1.md",
  "session-guides/week-3-session-2.md",
  "session-guides/week-3-session-3.md",
  "session-guides/week-4-session-1.md",
  "session-guides/week-4-session-2.md",
  "session-guides/week-4-session-3.md",
  "course/SOURCE.md",
  "SOURCE-MATERIALS.md",
  "sources/anthropic/exam-overview.md",
  "sources/anthropic/exam-overview.md",
  "sources/anthropic/links.md",
  "course/GLOSSARY.md",
  "CHECKPOINTS.md",
  "COMPETENCY-CHECKS.md",
  "COURSE-MANIFEST.json",
  "study/DOMAIN-MAP.md",
  "COVERAGE-AUDIT.md",
  "COMPLETION-AUDIT.md",
  "study/OFFICIAL-EXAM-ANCHORS.md",
  "study/FOUNDATIONS-SCAFFOLD.md",
  "study/SCENARIOS.md",
  "study/SKILLS-MATRIX.md",
  "course/DISTRACTOR-PATTERNS.md",
  "REVIEW-SYSTEM.md",
  "study/PRACTICAL-LABS.md",
  "TESTING-SYSTEM.md",
  "study/READINESS-RUBRIC.md",
  "LESSON-RUNTIME.md",
  "COURSE-CONTROLS.md",
  "RUNTIME-MUTATION-MAP.md",
  "MAINTAINER-VALIDATION.md",
  "LIVE-PROOF-QUICKSTART.md",
  "LIVE-RUNTIME-CHECKLIST.md",
  "RUNTIME-EVIDENCE.md",
  "SHARE.md",
  "START-HERE.md",
  "study/RESUME-GUIDE.md",
  "scripts/start-or-resume.js",
  "scripts/course-control.js",
  "scripts/runtime-proof-status.js",
  "scripts/build-share-package.js",
  "scripts/build-share-zip.js",
  "scripts/validate-share-artifacts.js",
  "scripts/smoke-test-course.js",
  "scripts/reset-course-state.js",
  ".claude/cca-course-config.json",
  ".claude/cca-course-progress.json",
  ".claude/settings.json",
  ".claude/settings.local.json",
  ".claude/hooks/cca-course-statusline.js",
  ".claude/rules/teaching-rules.md",
  "templates/learning-log.md",
  "templates/session-notes.md",
  "templates/mock-exam-results.md",
  "templates/feedback-log.md",
  "templates/domain-notes.md",
  "templates/runtime-evidence.md",
  "learner/learner-profile.md",
  "learner/progress-log.md",
  "learner/quiz-results.md",
  "learner/learning-log.md",
  "learner/mock-exam-results.md",
  "learner/feedback-log.md",
];

const requiredCommands = [
  "setup",
  "start-course",
  "resume-course",
  "help",
  "course-menu",
  "reset-course-state",
  "daily-review",
  "scenario-drill",
  "weak-areas",
  "progress",
  "recap",
  "reference",
  "define",
  "quiz-me",
  "practice-exam",
  "grade-readiness",
  "give-feedback",
  "notes",
  "mock-exam",
  "start-w1-s1",
  "start-w1-s2",
  "start-w1-s3",
  "start-w2-s1",
  "start-w2-s2",
  "start-w2-s3",
  "start-w3-s1",
  "start-w3-s2",
  "start-w3-s3",
  "start-w4-s1",
  "start-w4-s2",
  "start-w4-s3",
];

const requiredSkills = [
  "setup",
  "help",
  "course-menu",
  "reset-course-state",
  "start-course",
  "resume-course",
  "daily-review",
  "scenario-drill",
  "weak-areas",
  "progress",
  "recap",
  "reference",
  "define",
  "quiz-me",
  "practice-exam",
  "give-feedback",
  "notes",
  "grade-readiness",
  "mock-exam",
  "start-w1-s1",
  "start-w1-s2",
  "start-w1-s3",
  "start-w2-s1",
  "start-w2-s2",
  "start-w2-s3",
  "start-w3-s1",
  "start-w3-s2",
  "start-w3-s3",
  "start-w4-s1",
  "start-w4-s2",
  "start-w4-s3",
];

const requiredLabs = [
  "labs/lab-1-support-loop.md",
  "labs/lab-2-claude-config.md",
  "labs/lab-3-plan-vs-execute.md",
  "labs/lab-4-structured-extraction.md",
  "labs/lab-5-mixed-scenario-repair.md",
];

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function safeRead(rel) {
  try {
    return fs.readFileSync(path.join(root, rel), "utf8");
  } catch {
    return "";
  }
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

function listMissing(items, label, failures) {
  for (const item of items) {
    assert(exists(item), `Missing ${label}: ${item}`, failures);
  }
}

function expectContains(rel, snippets, failures) {
  const text = safeRead(rel);
  for (const snippet of snippets) {
    assert(text.includes(snippet), `${rel} missing expected content: ${snippet}`, failures);
  }
}

function validateLessonSkills(root, failures) {
  const lessonSkills = requiredSkills.filter((name) => /^start-w\d-s\d$/.test(name));
  for (const name of lessonSkills) {
    const rel = `.claude/skills/${name}/SKILL.md`;
    expectContains(
      rel,
      [
        "LESSON-RUNTIME.md",
        "session-guides/",
        "competency check",
        "session quiz",
        "learner/quiz-results.md",
        "learner/progress-log.md",
        "learner/learning-log.md",
        ".claude/cca-course-progress.json",
        "completion_status",
        "completed_sessions",
        "last_completed_item",
      ],
      failures
    );
  }
}

function validateRuntimeMutationExpectations(failures) {
  expectContains(
    "RUNTIME-MUTATION-MAP.md",
    [
      "/setup",
      "/start-course",
      "/resume-course",
      "/reset-course-state",
      "/daily-review",
      "/scenario-drill",
      "/weak-areas",
      "/quiz-me",
      "/mock-exam",
      "/notes",
      "/give-feedback",
      "/start-w*-s*",
      "/course-menu",
      "/progress",
      "/recap",
      "/reference",
      "/grade-readiness",
      ".claude/cca-course-progress.json",
      ".claude/cca-course-config.json",
      "learner/learning-log.md",
      "learner/progress-log.md",
      "learner/quiz-results.md",
      "learner/mock-exam-results.md",
      "learner/feedback-log.md",
    ],
    failures
  );

  expectContains(
    ".claude/skills/setup/SKILL.md",
    [".claude/cca-course-config.json", ".claude/cca-course-progress.json"],
    failures
  );

  expectContains(
    ".claude/skills/start-course/SKILL.md",
    [".claude/cca-course-progress.json", ".claude/cca-course-config.json", "learner/learner-profile.md"],
    failures
  );

  expectContains(
    ".claude/skills/resume-course/SKILL.md",
    [".claude/cca-course-progress.json"],
    failures
  );

  expectContains(
    ".claude/skills/daily-review/SKILL.md",
    [".claude/cca-course-progress.json", "learner/learning-log.md", "learner/progress-log.md"],
    failures
  );

  expectContains(
    ".claude/skills/scenario-drill/SKILL.md",
    [".claude/cca-course-progress.json", "learner/progress-log.md", "learner/quiz-results.md"],
    failures
  );

  expectContains(
    ".claude/skills/weak-areas/SKILL.md",
    [".claude/cca-course-progress.json", "learner/progress-log.md", "learner/learning-log.md", "learner/domain-*-notes.md"],
    failures
  );

  expectContains(
    ".claude/skills/quiz-me/SKILL.md",
    [
      "completed_sessions",
      "completed_gates",
      "do not use unfinished or future sessions",
      "learner/quiz-results.md",
    ],
    failures
  );

  expectContains(
    ".claude/skills/mock-exam/SKILL.md",
    [".claude/cca-course-progress.json", "learner/mock-exam-results.md", "learner/progress-log.md"],
    failures
  );

  expectContains(
    ".claude/skills/notes/SKILL.md",
    ["learner/session-notes.md", "learner/domain-*-notes.md"],
    failures
  );

  expectContains(
    ".claude/skills/give-feedback/SKILL.md",
    ["learner/feedback-log.md"],
    failures
  );
}

function main() {
  const failures = [];

  listMissing(requiredFiles, "file", failures);
  listMissing(requiredLabs, "lab", failures);

  for (const name of requiredCommands) {
    assert(
      exists(`.claude/commands/${name}.md`),
      `Missing command: .claude/commands/${name}.md`,
      failures
    );
  }

  for (const name of requiredSkills) {
    assert(
      exists(`.claude/skills/${name}/SKILL.md`),
      `Missing skill: .claude/skills/${name}/SKILL.md`,
      failures
    );
  }

  const readme = safeRead("README.md");
  const syllabus = safeRead("study/SYLLABUS.md");
  const lessons = safeRead("course/LESSONS.md");
  const domainMap = safeRead("study/DOMAIN-MAP.md");
  const checkpoints = safeRead("CHECKPOINTS.md");
  const claude = safeRead("CLAUDE.md");
  const manifest = safeRead("COURSE-MANIFEST.json");

  const scenarios = [
    "Customer Support Resolution Agent",
    "Code Generation with Claude Code",
    "Multi-Agent Research System",
    "Developer Productivity with Claude",
    "Claude Code for Continuous Integration",
    "Structured Data Extraction",
  ];

  const domains = ["d1.1", "d2.1", "d3.1", "d4.1", "d5.1"];
  const allSubdomains = [
    "d1.1","d1.2","d1.3","d1.4",
    "d2.1","d2.2","d2.3","d2.4","d2.5",
    "d3.1","d3.2","d3.3","d3.4",
    "d4.1","d4.2","d4.3","d4.4",
    "d5.1","d5.2","d5.3","d5.4",
  ];

  for (const scenario of scenarios) {
    assert(
      lessons.includes(scenario) || safeRead("study/SCENARIOS.md").includes(scenario),
      `Scenario coverage missing: ${scenario}`,
      failures
    );
  }

  for (const domain of domains) {
    assert(domainMap.includes(domain), `Domain mapping missing anchor: ${domain}`, failures);
  }

  for (const subdomain of allSubdomains) {
    assert(domainMap.includes(subdomain), `study/DOMAIN-MAP.md missing subdomain: ${subdomain}`, failures);
    assert(lessons.includes(subdomain), `course/LESSONS.md missing subdomain mapping: ${subdomain}`, failures);
    assert(
      safeRead("COVERAGE-AUDIT.md").includes(subdomain),
      `COVERAGE-AUDIT.md missing subdomain proof: ${subdomain}`,
      failures
    );
  }

  const requiredReadmeCommands = [
    "/setup",
    "/start-course",
    "/resume-course",
    "/help",
    "/course-menu",
    "/reset-course-state",
    "/daily-review",
    "/scenario-drill",
    "/weak-areas",
    "/progress",
    "/recap",
    "/reference",
    "/define",
    "/quiz-me",
    "/practice-exam",
    "/grade-readiness",
    "/mock-exam",
  ];

  for (const cmd of requiredReadmeCommands) {
    assert(readme.includes(cmd), `README missing command reference: ${cmd}`, failures);
  }

  assert(
    claude.includes("COMPETENCY-CHECKS.md") &&
      claude.includes("course/DISTRACTOR-PATTERNS.md") &&
      claude.includes("REVIEW-SYSTEM.md"),
    "CLAUDE.md missing core runtime references",
    failures
  );

  assert(
    checkpoints.includes("24 questions") && checkpoints.includes("75%"),
    "CHECKPOINTS.md missing weekly/mock exam thresholds",
    failures
  );

  expectContains(
    "COVERAGE-AUDIT.md",
    [
      "https://everpath-course-content.s3-accelerate.amazonaws.com",
      "sources/anthropic/exam-overview.md",
      "https://claudecertifications.com/claude-certified-architect/domains/agentic-architecture",
      "https://claudecertifications.com/claude-certified-architect/domains/tool-design-mcp",
      "https://claudecertifications.com/claude-certified-architect/domains/claude-code-config",
      "https://claudecertifications.com/claude-certified-architect/domains/prompt-engineering",
      "https://claudecertifications.com/claude-certified-architect/domains/context-management",
      "Customer Support Resolution Agent",
      "Code Generation with Claude Code",
      "Multi-Agent Research System",
      "Developer Productivity with Claude",
      "Claude Code for Continuous Integration",
      "Structured Data Extraction",
      "What Is Proven vs Not Yet Proven",
      "START-HERE.md",
      "SOURCE-MATERIALS.md",
      "study/RESUME-GUIDE.md",
      "COURSE-CONTROLS.md",
      "scripts/start-or-resume.js",
      "scripts/course-control.js",
      "scripts/runtime-proof-status.js",
      "scripts/build-share-package.js",
      "scripts/build-share-zip.js",
      "scripts/validate-share-artifacts.js",
      "scripts/smoke-test-course.js",
      "LIVE-PROOF-QUICKSTART.md",
      "LIVE-RUNTIME-CHECKLIST.md",
      "RUNTIME-EVIDENCE.md",
      "COURSE-MANIFEST.json",
      "COMPLETION-AUDIT.md",
    ],
    failures
  );

  expectContains(
    "MAINTAINER-VALIDATION.md",
    [
      "https://everpath-course-content.s3-accelerate.amazonaws.com",
      "sources/anthropic/exam-overview.md",
      "https://claudecertifications.com/claude-certified-architect/domains/agentic-architecture",
      "https://claudecertifications.com/claude-certified-architect/domains/tool-design-mcp",
      "https://claudecertifications.com/claude-certified-architect/domains/claude-code-config",
      "https://claudecertifications.com/claude-certified-architect/domains/prompt-engineering",
      "https://claudecertifications.com/claude-certified-architect/domains/context-management",
      "START-HERE.md",
      "SOURCE-MATERIALS.md",
      "scripts/start-or-resume.js",
      "scripts/course-control.js",
      "scripts/runtime-proof-status.js",
      "scripts/build-share-package.js",
      "scripts/build-share-zip.js",
      "scripts/validate-share-artifacts.js",
      "scripts/smoke-test-course.js",
      "LIVE-PROOF-QUICKSTART.md",
      "LIVE-RUNTIME-CHECKLIST.md",
      "RUNTIME-EVIDENCE.md",
      "COURSE-MANIFEST.json",
      "COMPLETION-AUDIT.md",
    ],
    failures
  );

  expectContains(
    "COURSE-MANIFEST.json",
    [
      "\"delivery_engine\": \"Claude Code\"",
      "\"version\": \"0.7\"",
      "\"last_updated\": \"2026-06-08\"",
      "\"setup\": \"/setup\"",
      "\"start\": \"/start-course\"",
      "\"resume\": \"/resume-course\"",
      "\"help\": \"/help\"",
      "\"define\": \"/define\"",
      "\"quiz_me\": \"/quiz-me\"",
      "\"practice_exam\": \"/practice-exam\"",
      "\"start_or_resume\": \"scripts/start-or-resume.js\"",
      "\"course_controls\": \"scripts/course-control.js\"",
      "\"runtime_proof_status\": \"scripts/runtime-proof-status.js\"",
      "\"build_share_package\": \"scripts/build-share-package.js\"",
      "\"build_share_zip\": \"scripts/build-share-zip.js\"",
      "\"validate_share_artifacts\": \"scripts/validate-share-artifacts.js\"",
      "\"validate\": \"scripts/validate-course.js\"",
      "\"reset_state\": \"scripts/reset-course-state.js\"",
      "\"smoke_test\": \"scripts/smoke-test-course.js\"",
      "\"status_line_scope\": \"project-only\"",
      "\"global_setup_required\": false",
      "\"completion_tracking\"",
      "\"course_completed\"",
      "\"course_completed_at\"",
      "\"live_proof_quickstart\": \"LIVE-PROOF-QUICKSTART.md\"",
      "\"live_runtime_checklist\": \"LIVE-RUNTIME-CHECKLIST.md\"",
      "\"runtime_evidence_log\": \"RUNTIME-EVIDENCE.md\"",
      "\"reference_index\": \"SOURCE-MATERIALS.md\"",
      "\"foundations_guide_pdf\": \"sources/anthropic/exam-overview.md\"",
      "\"exam_overview\": \"sources/anthropic/exam-overview.md\"",
      "\"link_hub\": \"sources/anthropic/links.md\"",
      "\"delivery_model\"",
      "\"primary_learner_prompts\"",
    ],
    failures
  );

  expectContains(
    "SOURCE-MATERIALS.md",
    [
      "sources/anthropic/exam-overview.md",
      "sources/anthropic/exam-overview.md",
      "sources/anthropic/links.md",
      "study/OFFICIAL-EXAM-ANCHORS.md",
      "study/DOMAIN-MAP.md",
      "study/SCENARIOS.md",
      "course/SOURCE.md",
      "COVERAGE-AUDIT.md",
      "https://claudecertifications.com/claude-certified-architect/domains/agentic-architecture",
      "https://claudecertifications.com/claude-certified-architect/domains/tool-design-mcp",
      "https://claudecertifications.com/claude-certified-architect/domains/claude-code-config",
      "https://claudecertifications.com/claude-certified-architect/domains/prompt-engineering",
      "https://claudecertifications.com/claude-certified-architect/domains/context-management",
      "../INTERNAL-BUILD-REFERENCES.md",
    ],
    failures
  );

  expectContains(
    "SHARE.md",
    [
      "start`, `continue`, or `start next lesson`",
      "LIVE-RUNTIME-CHECKLIST.md",
      "node scripts/smoke-test-course.js .",
      "RUNTIME-EVIDENCE.md",
      "node scripts/build-share-package.js .",
      "node scripts/build-share-zip.js .",
      "node scripts/validate-share-artifacts.js .",
    ],
    failures
  );

  expectContains(
    "LIVE-RUNTIME-CHECKLIST.md",
    [
      "plain-language `start` routes correctly",
      "plain-language `continue` routes correctly",
      "/help` shows available commands",
      "/quiz-me` only tests completed sections",
      "/practice-exam` runs the mixed practice-exam flow",
      "completion_status",
      "course_completed",
    ],
    failures
  );

  expectContains(
    "RUNTIME-EVIDENCE.md",
    [
      "Command Evidence",
      "`/help`",
      "Files Confirmed Mutated",
      "`/practice-exam`",
      "completion_status",
      "course_completed",
      "Runtime proof status",
    ],
    failures
  );

  assert(manifest.includes("\"local_state_files\""), "COURSE-MANIFEST.json missing local_state_files", failures);

  expectContains(
    ".claude/skills/define/SKILL.md",
    ["course/GLOSSARY.md", "plain English", "analogy", "add the new term"],
    failures
  );

  expectContains(
    ".claude/skills/help/SKILL.md",
    [
      "total lessons in the course",
      "how many lessons the learner has completed so far",
      "how many lessons remain",
      "/quiz-me",
      "/practice-exam",
      "/mock-exam",
    ],
    failures
  );

  expectContains(
    ".claude/skills/practice-exam/SKILL.md",
    [
      "24-question practice exam",
      "spaced retrieval",
      "misconception repair",
      "/quiz-me",
      "/weak-areas",
      "continue",
    ],
    failures
  );

  expectContains(
    "COMPLETION-AUDIT.md",
    [
      "Requirement Audit",
      "Live Claude Code slash-command execution works end-to-end",
      "Not Yet Proven",
      "/setup",
      "/start-course",
      "/resume-course",
      "/help",
      "/progress",
      "/define",
      "/quiz-me",
      "/daily-review",
      "/scenario-drill",
      "/weak-areas",
      "/practice-exam",
      "/mock-exam",
      "/reset-course-state",
    ],
    failures
  );

  expectContains(
    "START-HERE.md",
    [
      "/setup",
      "/start-course",
      "/resume-course",
      "/help",
      "/quiz-me",
      "/define",
      "/practice-exam",
      "/reset-course-state",
      "scripts/start-or-resume.js",
      "scripts/course-control.js",
      "COURSE-CONTROLS.md",
      "SHARE.md",
      ".claude/cca-course-progress.json",
    ],
    failures
  );

  expectContains(
    "study/RESUME-GUIDE.md",
    [
      "/resume-course",
      "/reset-course-state",
      ".claude/cca-course-progress.json",
      "learner/progress-log.md",
      "learner/quiz-results.md",
      "learner/learning-log.md",
    ],
    failures
  );

  expectContains(
    "COURSE-CONTROLS.md",
    [
      "/setup",
      "/start-course",
      "/resume-course",
      "/help",
      "/define",
      "/quiz-me",
      "/practice-exam",
      "/reset-course-state",
      "scripts/course-control.js",
      "SHARE.md",
      "MAINTAINER-VALIDATION.md",
    ],
    failures
  );

  assert(
    syllabus.includes("/start-w1-s1") && syllabus.includes("/start-w4-s3"),
    "study/SYLLABUS.md missing full lesson command map",
    failures
  );

  assert(
    syllabus.includes("/reset-course-state"),
    "study/SYLLABUS.md missing reset/share entrypoint",
    failures
  );

  assert(
    readme.includes("project-only") && readme.includes("SHARE.md"),
    "README missing project-only share/reset guidance",
    failures
  );

  expectContains(
    "README.md",
    [
      "Course version: `0.7`",
      "Last updated: `2026-06-08`",
    ],
    failures
  );

  expectContains(
    ".claude/cca-course-progress.json",
    [
      "\"completion_status\": \"not-started\"",
      "\"course_completed\": false",
      "\"course_completed_at\": \"\"",
      "\"course_completion_basis\": \"\"",
      "\"last_completed_item\": \"\"",
    ],
    failures
  );

  expectContains(
    "learner/domain-2-notes.md",
    ["## d2.1", "## d2.2", "## d2.3", "## d2.4", "## d2.5"],
    failures
  );

  expectContains(
    "learner/domain-3-notes.md",
    ["## d3.1", "## d3.2", "## d3.3", "## d3.4"],
    failures
  );

  expectContains(
    "learner/domain-4-notes.md",
    ["## d4.1", "## d4.2", "## d4.3", "## d4.4"],
    failures
  );

  expectContains(
    "learner/domain-5-notes.md",
    ["## d5.1", "## d5.2", "## d5.3", "## d5.4"],
    failures
  );

  expectContains(
    ".claude/commands/start-course.md",
    [".claude/skills/start-course/SKILL.md"],
    failures
  );

  expectContains(
    ".claude/commands/help.md",
    [".claude/skills/help/SKILL.md"],
    failures
  );

  expectContains(
    ".claude/commands/resume-course.md",
    [".claude/skills/resume-course/SKILL.md"],
    failures
  );

  expectContains(
    ".claude/commands/daily-review.md",
    [".claude/skills/daily-review/SKILL.md"],
    failures
  );

  expectContains(
    ".claude/commands/scenario-drill.md",
    [".claude/skills/scenario-drill/SKILL.md"],
    failures
  );

  expectContains(
    ".claude/commands/weak-areas.md",
    [".claude/skills/weak-areas/SKILL.md"],
    failures
  );

  expectContains(
    ".claude/commands/mock-exam.md",
    [".claude/skills/mock-exam/SKILL.md"],
    failures
  );

  expectContains(
    ".claude/commands/practice-exam.md",
    [".claude/skills/practice-exam/SKILL.md"],
    failures
  );

  validateLessonSkills(root, failures);
  validateRuntimeMutationExpectations(failures);

  if (failures.length) {
    console.error("COURSE VALIDATION FAILED");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log("COURSE VALIDATION PASSED");
  console.log(`Root: ${root}`);
  console.log(`Commands: ${requiredCommands.length}`);
  console.log(`Skills: ${requiredSkills.length}`);
  console.log(`Scenarios: ${scenarios.length}`);
}

main();
