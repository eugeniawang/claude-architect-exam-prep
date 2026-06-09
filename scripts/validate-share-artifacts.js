#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const cp = require("child_process");

const root = path.resolve(process.argv[2] || process.cwd());
const shareFolder = path.join(root, "dist", "cca-f-course-share");
const shareZip = path.join(root, "dist", "cca-f-course-share.zip");
const sourceManifestPath = path.join(root, "COURSE-MANIFEST.json");

function runNode(args, cwd) {
  return cp.execFileSync("node", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function runUnzipList(zipFile) {
  return cp.execFileSync("unzip", ["-l", zipFile], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function unzipTo(zipFile, destDir) {
  return cp.execFileSync("unzip", ["-q", zipFile, "-d", destDir], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function main() {
  assert(fs.existsSync(shareFolder), "Share folder missing");
  assert(fs.existsSync(shareZip), "Share zip missing");
  assert(fs.existsSync(sourceManifestPath), "Source manifest missing");

  const sourceManifest = readJson(sourceManifestPath);
  const expectedVersion = sourceManifest.version;
  const expectedLastUpdated = sourceManifest.last_updated;

  assert(typeof expectedVersion === "string" && expectedVersion.length > 0, "Source manifest version missing");
  assert(typeof expectedLastUpdated === "string" && expectedLastUpdated.length > 0, "Source manifest last_updated missing");

  const validation = runNode(["scripts/validate-course.js", "."], shareFolder);
  assert(validation.includes("COURSE VALIDATION PASSED"), "Share folder validation failed");

  const shareManifest = readJson(path.join(shareFolder, "COURSE-MANIFEST.json"));
  assert(shareManifest.version === expectedVersion, "Share folder manifest version mismatch");
  assert(shareManifest.last_updated === expectedLastUpdated, "Share folder manifest last_updated mismatch");

  const shareReadme = readText(path.join(shareFolder, "README.md"));
  assert(shareReadme.includes(`Course version: \`${expectedVersion}\``), "Share folder README version mismatch");
  assert(shareReadme.includes(`Last updated: \`${expectedLastUpdated}\``), "Share folder README last_updated mismatch");

  const buildNote = readText(path.join(shareFolder, "SHARE-PACKAGE-BUILD.md"));
  assert(buildNote.includes(`Course version: ${expectedVersion}`), "Share build note version mismatch");
  assert(buildNote.includes(`Course last updated: ${expectedLastUpdated}`), "Share build note last_updated mismatch");

  const proofStatus = runNode(["scripts/runtime-proof-status.js", "."], shareFolder);
  assert(proofStatus.includes("Status: NO_LIVE_PROOF_RECORDED"), "Share folder should not carry recorded runtime proof");

  const progress = readJson(path.join(shareFolder, ".claude", "cca-course-progress.json"));
  assert(progress.completion_status === "not-started", "Share folder should have reset completion status");
  assert(progress.course_completed === false, "Share folder should have reset completed flag");
  assert(Array.isArray(progress.completed_sessions) && progress.completed_sessions.length === 0, "Share folder should have no completed sessions");

  const zipListing = runUnzipList(shareZip);
  assert(zipListing.includes("cca-f-course-share/START-HERE.md"), "Share zip missing START-HERE.md");
  assert(zipListing.includes("cca-f-course-share/.claude/cca-course-progress.json"), "Share zip missing progress file");
  assert(zipListing.includes("cca-f-course-share/SHARE-PACKAGE-BUILD.md"), "Share zip missing build note");
  assert(zipListing.includes("cca-f-course-share/RUNTIME-EVIDENCE.md"), "Share zip missing runtime evidence template");

  const unzipRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cca-share-artifacts-"));
  unzipTo(shareZip, unzipRoot);
  const extractedRoot = path.join(unzipRoot, "cca-f-course-share");
  assert(fs.existsSync(extractedRoot), "Extracted share folder missing");

  const extractedValidation = runNode(["scripts/validate-course.js", "."], extractedRoot);
  assert(extractedValidation.includes("COURSE VALIDATION PASSED"), "Extracted share folder validation failed");

  const extractedManifest = readJson(path.join(extractedRoot, "COURSE-MANIFEST.json"));
  assert(extractedManifest.version === expectedVersion, "Extracted share folder manifest version mismatch");
  assert(extractedManifest.last_updated === expectedLastUpdated, "Extracted share folder manifest last_updated mismatch");

  const extractedReadme = readText(path.join(extractedRoot, "README.md"));
  assert(extractedReadme.includes(`Course version: \`${expectedVersion}\``), "Extracted share folder README version mismatch");
  assert(extractedReadme.includes(`Last updated: \`${expectedLastUpdated}\``), "Extracted share folder README last_updated mismatch");

  const extractedProofStatus = runNode(["scripts/runtime-proof-status.js", "."], extractedRoot);
  assert(extractedProofStatus.includes("Status: NO_LIVE_PROOF_RECORDED"), "Extracted share folder should not carry recorded runtime proof");

  const extractedProgress = readJson(path.join(extractedRoot, ".claude", "cca-course-progress.json"));
  assert(extractedProgress.completion_status === "not-started", "Extracted share folder should have reset completion status");
  assert(extractedProgress.course_completed === false, "Extracted share folder should have reset completed flag");

  console.log("CCA-F SHARE ARTIFACTS VALIDATED");
  console.log(`Root: ${root}`);
  console.log(`Share folder: ${shareFolder}`);
  console.log(`Share zip: ${shareZip}`);
  console.log(`Verified version: ${expectedVersion}`);
  console.log(`Verified last updated: ${expectedLastUpdated}`);
  console.log("Verified: share folder exists, zip exists, copied course validates, extracted archive validates, version metadata matches source, reset state present, proof log reset, zip contains key files");
}

try {
  main();
} catch (error) {
  console.error("CCA-F SHARE ARTIFACT VALIDATION FAILED");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
