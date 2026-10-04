/**
 * Solver + generator for INKVEIL.
 *
 * The whole game design hinges on each puzzle having exactly one answer that a
 * player can reach by pure logic (no guessing). This module proves that
 * property mechanically and refuses any level that fails it — so a generated
 * or hand-authored board can never ship broken.
 */

import { Level } from "./puzzle";

/**
 * All subsets of {0..n-1} whose weighted sum (index i contributes i+1) equals
 * `target`. Used as the candidate fills for one row (over columns) or one
 * column (over rows).
 */
export function linePatterns(n: number, target: number): number[][] {
  const res: number[][] = [];
  const cur: number[] = [];
  (function rec(i: number, rem: number) {
    if (i === n) {
      if (rem === 0) res.push(cur.slice());
      return;
    }
    const w = i + 1;
    if (w <= rem) {
      cur.push(i);
      rec(i + 1, rem - w);
      cur.pop();
    }
    rec(i + 1, rem);
  })(0, target);
  return res;
}

export interface SolveResult {
  full: boolean;        // did pure deduction determine every cell?
  known: number[][];    // -1 unknown, 0 empty, 1 inked
  rounds: number;       // propagation sweeps used
  contradiction: boolean;
}

/**
 * Simulate human deduction: row/column arc-consistency propagation only, no
 * guessing. If this closes the whole grid, the level is both uniquely and
 * guess-free solvable. `rounds` is a difficulty proxy.
 */
export function humanSolve(n: number, rows: number[], cols: number[]): SolveResult {
  const known: number[][] = Array.from({ length: n }, () => Array<number>(n).fill(-1));
  const rowP = rows.map((t) => linePatterns(n, t));
  const colP = cols.map((t) => linePatterns(n, t));

  const refineRow = (r: number): boolean | null => {
    // returns null on contradiction, true if something changed
    const surv = rowP[r].filter((p) => {
      for (let c = 0; c < n; c++) {
        const has = p.includes(c);
        if (known[r][c] === 1 && !has) return false;
        if (known[r][c] === 0 && has) return false;
      }
      return true;
    });
    rowP[r] = surv;
    if (surv.length === 0) return null;
    let changed = false;
    for (let c = 0; c < n; c++) {
      let inAll = true, inNone = true;
      for (const p of surv) { if (p.includes(c)) inNone = false; else inAll = false; }
      if (inAll && known[r][c] !== 1) { known[r][c] = 1; changed = true; }
      else if (inNone && known[r][c] !== 0) { known[r][c] = 0; changed = true; }
    }
    return changed;
  };

  const refineCol = (c: number): boolean | null => {
    const surv = colP[c].filter((p) => {
      for (let r = 0; r < n; r++) {
        const has = p.includes(r);
        if (known[r][c] === 1 && !has) return false;
        if (known[r][c] === 0 && has) return false;
      }
      return true;
    });
    colP[c] = surv;
    if (surv.length === 0) return null;
    let changed = false;
    for (let r = 0; r < n; r++) {
      let inAll = true, inNone = true;
      for (const p of surv) { if (p.includes(r)) inNone = false; else inAll = false; }
      if (inAll && known[r][c] !== 1) { known[r][c] = 1; changed = true; }
      else if (inNone && known[r][c] !== 0) { known[r][c] = 0; changed = true; }
    }
    return changed;
  };

  let changed = true, rounds = 0;
  while (changed) {
    changed = false;
    rounds++;
    for (let r = 0; r < n; r++) {
      const res = refineRow(r);
      if (res === null) return { full: false, known, rounds, contradiction: true };
      if (res) changed = true;
    }
    for (let c = 0; c < n; c++) {
      const res = refineCol(c);
      if (res === null) return { full: false, known, rounds, contradiction: true };
      if (res) changed = true;
    }
  }
  const full = known.every((row) => row.every((v) => v !== -1));
  return { full, known, rounds, contradiction: false };
}

/** Derive clue targets from a bitmap and package a Level. */
export function buildLevel(name: string, en: string, bitmap: string[]): Level {
  const n = bitmap.length;
  const rows = bitmap.map((row) => {
    let s = 0;
    for (let c = 0; c < n; c++) if (row[c] === "1") s += c + 1;
    return s;
  });
  const cols = Array.from({ length: n }, (_, c) => {
    let s = 0;
    for (let r = 0; r < n; r++) if (bitmap[r][c] === "1") s += r + 1;
    return s;
  });
  return { name, en, n, rows, cols, solution: bitmap };
}

export interface Validation {
  ok: boolean;
  reason?: string;
  rounds?: number;
}

/**
 * A level is valid iff pure deduction closes the whole grid AND the result
 * equals the intended solution (which also proves uniqueness).
 */
export function validateLevel(lv: Level): Validation {
  const res = humanSolve(lv.n, lv.rows, lv.cols);
  if (res.contradiction) return { ok: false, reason: "contradiction" };
  if (!res.full) return { ok: false, reason: "requires guessing / not unique" };
  for (let r = 0; r < lv.n; r++) {
    for (let c = 0; c < lv.n; c++) {
      const want = lv.solution[r][c] === "1" ? 1 : 0;
      if (res.known[r][c] !== want) return { ok: false, reason: "determined != solution" };
    }
  }
  return { ok: true, rounds: res.rounds };
}
