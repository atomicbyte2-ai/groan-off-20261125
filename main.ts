import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original dad joke: a magician dad, an allowance, and a vanishing act.
// The em dash gives the turn a spoken beat: laugh, pause, gone.
const LINE =
  "I told my son I'd become a magician. He laughed — until I made his allowance disappear.";

function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`line must be 1-140 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("line must not contain control characters");
  }
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
