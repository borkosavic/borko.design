import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const WATCH_FILES = ["index.html", "src/input.css", "src/app.js"];
const BUILD_ARGS = ["@tailwindcss/cli", "-i", "./src/input.css", "-o", "./style.css"];
const POLL_MS = 700;

let building = false;
let queued = false;
let timer = null;
const mtimes = new Map();

function runBuild() {
  if (building) {
    queued = true;
    return;
  }

  building = true;
  const child = spawn("npx", BUILD_ARGS, {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
  });

  child.on("exit", () => {
    building = false;
    if (queued) {
      queued = false;
      runBuild();
    }
  });
}

function scheduleBuild() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => runBuild(), 100);
}

function snapshotMtimes() {
  for (const relPath of WATCH_FILES) {
    const absPath = resolve(ROOT, relPath);
    if (!existsSync(absPath)) continue;
    mtimes.set(relPath, statSync(absPath).mtimeMs);
  }
}

function pollForAtomicSaves() {
  for (const relPath of WATCH_FILES) {
    const absPath = resolve(ROOT, relPath);
    if (!existsSync(absPath)) continue;
    const next = statSync(absPath).mtimeMs;
    const prev = mtimes.get(relPath);
    if (prev !== undefined && next !== prev) {
      mtimes.set(relPath, next);
      scheduleBuild();
    } else if (prev === undefined) {
      mtimes.set(relPath, next);
    }
  }
}

runBuild();
snapshotMtimes();
setInterval(pollForAtomicSaves, POLL_MS);

console.log("Polling index.html, src/input.css, src/app.js and rebuilding style.css...");
