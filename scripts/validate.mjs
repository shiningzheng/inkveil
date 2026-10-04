// Generates candidate shapes, validates each through the guess-free solver,
// and prints the winners as JSON. Run after bundling the core to /tmp/core.mjs.
import { buildLevel, validateLevel } from "/tmp/core.mjs";

const mid = (n) => (n - 1) / 2;
const gens = {
  "墨印|Seal":        (n) => (r, c) => true,
  "菱|Diamond":       (n) => (r, c) => Math.abs(r - mid(n)) + Math.abs(c - mid(n)) <= mid(n),
  "十|Cross":         (n) => (r, c) => Math.round(r) === Math.round(mid(n)) || Math.round(c) === Math.round(mid(n)),
  "口|Frame":         (n) => (r, c) => r === 0 || c === 0 || r === n - 1 || c === n - 1,
  "叉|X":             (n) => (r, c) => r === c || r === n - 1 - c,
  "棋|Lattice":       (n) => (r, c) => (r + c) % 2 === 0,
  "山|Mountain":      (n) => (r, c) => r >= n - 1 - Math.min(c, n - 1 - c),
  "阶|Steps":         (n) => (r, c) => c <= r,
};

function bitmap(n, fn) {
  const f = fn(n);
  return Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => (f(r, c) ? "1" : "0")).join("")
  );
}

const winners = [];
const seen = new Set();
for (let n = 4; n <= 9; n++) {
  for (const [label, gen] of Object.entries(gens)) {
    const [name, en] = label.split("|");
    const bm = bitmap(n, gen);
    const fill = bm.join("").split("").filter((x) => x === "1").length / (n * n);
    if (fill < 0.22 || fill > 0.82) continue;       // skip trivial / near-full
    const key = n + ":" + bm.join("");
    if (seen.has(key)) continue;
    seen.add(key);
    const lv = buildLevel(`${name}·${n}`, `${en} ${n}`, bm);
    const v = validateLevel(lv);
    if (v.ok) winners.push({ ...lv, rounds: v.rounds, fill: +fill.toFixed(2) });
  }
}

// Curate: sort by size then difficulty, cap to a nice spread.
winners.sort((a, b) => a.n - b.n || (a.rounds || 0) - (b.rounds || 0));
const bySize = {};
const curated = [];
for (const w of winners) {
  bySize[w.n] = (bySize[w.n] || 0) + 1;
  if (bySize[w.n] <= 3) curated.push(w);   // up to 3 per size
}
console.error(`validated ${winners.length} shapes, curated ${curated.length}`);
for (const w of curated) console.error(`  ${w.name.padEnd(8)} n=${w.n} rounds=${w.rounds} fill=${w.fill}`);
console.log(JSON.stringify(curated.map(({ fill, ...lv }) => lv), null, 0));
