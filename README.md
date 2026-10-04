# 墨隐 · INKVEIL

> 以数成形 · 以墨成画 — *shape from numbers, paint with ink*

A minimalist logic-puzzle game with a Chinese ink-wash aesthetic. Solve a grid by pure deduction and the shape you reveal is painted back to you in ink.

This repository is a clean **TypeScript web rewrite** of an earlier single-file HTML prototype — same puzzle logic, rebuilt as a typed, testable core with a thin web UI.

---

## The puzzle

An `n×n` grid. Column `c` carries weight `c+1` (shown along the top); row `r` carries weight `r+1` (shown down the left).

- In **every row**, the weights of your inked cells must sum to that row's right-hand **target**.
- In **every column**, the inked cells' row-weights must sum to its bottom **target**.

Satisfy all `2n` targets and the grid is solved — a monochrome ink painting blooms from the cells you filled.

Every level is solvable by **pure logic, with no guessing** — and that property is proven mechanically (see below), not just claimed.

---

## Project structure

```
src/core/            pure, typed, DOM-free game logic
  puzzle.ts            grid model, weights, rowSum/colSum, solved()
  solver.ts            humanSolve() guess-free prover, buildLevel, validateLevel
  levels.ts            auto-generated levels — each proven unique & guess-free
src/ui/              thin view layer (vanilla DOM, no framework)
  app.ts               title / board / input / live targets / win flow
  reveal.ts            canvas ink-painting rendered FROM the solved grid
  save.ts              localStorage progress (storage-blocked safe)
scripts/validate.mjs generates candidate shapes and culls them via the solver
index.html · styles.css · build.mjs · tsconfig.json
```

The core carries zero DOM dependencies, so the same logic can be reused across web, a desktop/mobile wrapper, or a WeChat mini-game.

---

## Running it

```bash
npm install
npm run typecheck     # strict TypeScript, no emit
npm run build         # bundles to dist/bundle.js via esbuild (~18 KB)
python3 -m http.server 8891
# open http://localhost:8891
```

| Script | Does |
|---|---|
| `npm run typecheck` | strict type check (`tsc --noEmit`) |
| `npm run build` | bundle `src/main.ts` → `dist/bundle.js` |
| `npm run levels` | regenerate & revalidate the level set |

---

## How levels are guaranteed solvable

`src/core/solver.ts` simulates human deduction — row/column arc-consistency propagation only, **no guessing**. If that closes the whole grid, the level is both *uniquely* and *guess-free* solvable.

`scripts/validate.mjs` generates candidate shapes across sizes 4–9, runs each through the solver, and keeps **only** those that pass. The shipped `levels.ts` is the validated output — a broken or ambiguous board can never make it in. (The current build generated 29 candidates and rejected 11, baking in 18.)

---

## Status & scope

**Working:** typed core + solver + generator, title screen, playable board (ink / blank-mark modes, undo, reset), live per-axis target feedback (green ✓ / red overshoot), win → grid-rendered ink reveal, localStorage progress, collection counter.

**Intentionally out of scope** (replaceable shell, not core logic):
- Original hand-painted art and audio (author IP — not reproduced; levels here are generated geometric pictographs).
- Passcode gate, guided tutorial, chapter grouping.
- A deeper difficulty ceiling — generated shapes currently need only ~2–3 deduction rounds; raising this requires new clue mechanics (a design task).

---

## Tech

TypeScript · esbuild · vanilla DOM + Canvas · no runtime dependencies.
