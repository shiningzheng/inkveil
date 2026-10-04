/**
 * Core puzzle model for INKVEIL (墨隐).
 *
 * The puzzle: an n×n grid. Column c (0-based) carries weight (c+1); row r
 * carries weight (r+1). In every row the weights of the inked cells must sum
 * to that row's right-side target; in every column the inked cells' row
 * weights must sum to that column's bottom target. Satisfy all 2n targets and
 * the grid is solved. (Same logic as the original HTML prototype.)
 */

/** 0 = empty, 1 = inked, 2 = marked-blank (treated as empty for sums). */
export type Cell = 0 | 1 | 2;
export type Grid = Cell[][];

export interface Level {
  name: string;   // Chinese name
  en: string;     // English name
  n: number;      // grid size
  rows: number[]; // right-side targets, length n
  cols: number[]; // bottom targets, length n
  solution: string[]; // n strings of '0'/'1', the intended (and unique) answer
  rounds?: number;    // deduction sweeps a basic solver needs (difficulty proxy)
}

export const colWeight = (c: number): number => c + 1;
export const rowWeight = (r: number): number => r + 1;

export function newGrid(n: number): Grid {
  return Array.from({ length: n }, () => Array<Cell>(n).fill(0));
}

export function cloneGrid(g: Grid): Grid {
  return g.map((row) => row.slice() as Cell[]);
}

export function rowSum(g: Grid, r: number): number {
  let s = 0;
  for (let c = 0; c < g.length; c++) if (g[r][c] === 1) s += colWeight(c);
  return s;
}

export function colSum(g: Grid, c: number): number {
  let s = 0;
  for (let r = 0; r < g.length; r++) if (g[r][c] === 1) s += rowWeight(r);
  return s;
}

/** Solved iff every row sum and every column sum matches its target. */
export function solved(g: Grid, lv: Level): boolean {
  for (let r = 0; r < lv.n; r++) if (rowSum(g, r) !== lv.rows[r]) return false;
  for (let c = 0; c < lv.n; c++) if (colSum(g, c) !== lv.cols[c]) return false;
  return true;
}
