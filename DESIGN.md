# INKVEIL — Design

This document explains how 墨隐 · INKVEIL is built and why. It is the companion
to `README.md` (which covers *what* it is and how to run it).

---

## 1. Design goals

1. **Correctness is the product.** The puzzle's whole appeal is that it can be
   solved by pure reasoning. That property must be *guaranteed mechanically*,
   not hoped for — a level that is ambiguous or requires guessing is a bug, and
   the build should make it impossible to ship one.
2. **Logic separate from presentation.** The rules, the solver, and the level
   data must have zero dependency on the DOM, so the same core can drive a web
   page today and a desktop/mobile wrapper or a WeChat mini-game later.
3. **Small and dependency-free at runtime.** The game is a grid and some text;
   it should bundle to tens of kilobytes, not megabytes, with no framework.
4. **Honest reveal.** The payoff image should be the thing the player actually
   built, not a pre-rendered picture masked by their work.

---

## 2. The puzzle

An `n × n` grid of cells, each empty or inked.

- Column `c` (0-based) has weight `c + 1`; row `r` has weight `r + 1`.
- Each **row** has a target. A row is satisfied when the weights of its inked
  cells (i.e. the sum of `c + 1` over inked columns `c`) equals that target.
- Each **column** has a target, satisfied symmetrically by summing `r + 1` over
  inked rows.
- The board is **solved** iff all `n` row targets and all `n` column targets
  are satisfied simultaneously.

The clues are *positional weighted sums*, not run-lengths — this is what makes
it distinct from nonograms/picross, and what makes a 2-D constraint (rows and
columns coupled through the same cells) interesting.

### Why "solved = sums match" and not "solved = bitmap matches"

The win check compares sums only (`solved()` in `core/puzzle.ts`). It never
compares the player's grid to a stored answer. This keeps the rule honest — you
win by *satisfying the constraints*, exactly as the clues state. The cost is
that it only works if each puzzle's constraints admit **exactly one** solution.
Guaranteeing that uniqueness is the solver's job (§4), and it is enforced before
any level is allowed into the game.

---

## 3. Architecture

```
core/   pure TypeScript, no DOM          ui/   vanilla DOM + Canvas
  puzzle.ts   model + rules                 app.ts     screens, input, state
  solver.ts   solver + validator            reveal.ts  grid → ink painting
  levels.ts   validated level data          save.ts    localStorage
                                          main.ts   entry: start()
scripts/validate.mjs  build-time level generation + culling
```

**`core/` never imports from `ui/`.** It has no reference to `document`,
`window`, or any browser global. That boundary is the main structural
investment: it is what lets the correctness-critical code be unit-tested and
reused, and keeps the renderer swappable.

The UI is deliberately plain DOM. A grid of buttons with CSS Grid layout is a
perfect fit for an `n × n` board, is accessible for free (each cell is a real
`<button>` with an `aria-label`), and needs no framework. Canvas is used only
for the final painting, where pixel-level control matters.

---

## 4. The solver (`core/solver.ts`)

The solver is the heart of the project. It answers one question: *can this board
be solved by a human using pure deduction, and is that solution unique?*

### 4.1 Line patterns

`linePatterns(n, target)` enumerates every subset of `{0..n-1}` whose weighted
sum equals `target`. For a row, these are the candidate sets of columns that
could legally be inked; for a column, the candidate sets of rows. This is a
bounded recursive subset-sum enumeration — cheap for the sizes in play.

### 4.2 Deduction by arc-consistency (`humanSolve`)

`humanSolve` models exactly the reasoning a player does, and nothing more:

1. Give each row and column its list of legal patterns.
2. Maintain a `known` grid of `-1` (unknown) / `0` (empty) / `1` (inked).
3. Repeatedly sweep every line:
   - Drop any pattern inconsistent with the cells already known in that line.
   - If a cell is inked in **all** surviving patterns, it must be inked; if in
     **none**, it must be empty. Record it.
4. Stop when a sweep changes nothing.

Crucially, it **never guesses** — no branching, no backtracking, no
trial-and-error. If this process alone fills the entire grid, the puzzle is both
*uniquely* and *guess-free* solvable (if a cell were ambiguous, no amount of pure
propagation could decide it, and the grid would stall with unknowns left). The
sweep count (`rounds`) is kept as a difficulty proxy.

### 4.3 Validation (`validateLevel`)

A level passes validation iff:
- `humanSolve` reaches no contradiction,
- it determines **every** cell (`full === true`), and
- the determined grid equals the level's own `solution`.

The third check closes the loop: it proves the deduced answer is *the* intended
one. Any level failing any clause is rejected.

`buildLevel(name, en, bitmap)` is the inverse direction: given a desired picture
(a bitmap), it derives the row/column targets, so clues are always consistent
with the art by construction.

---

## 5. Level generation (`scripts/validate.mjs`)

Levels are not hand-tuned for solvability — they are **generated and filtered**:

1. Procedurally render candidate shapes (diamond, cross, frame, X, lattice,
   mountain, steps…) across sizes 4–9.
2. Discard trivially empty or near-full shapes by fill ratio.
3. Run each through `buildLevel` → `validateLevel`.
4. Keep only the ones proven unique and guess-free; curate a spread by size.
5. Emit `src/core/levels.ts`.

This is the concrete expression of design goal #1: the solver is a gate in the
content pipeline. The current run generated 29 candidates and **rejected 11**,
baking in 18. Re-run anytime with `npm run levels`.

---

## 6. Data model (`core/puzzle.ts`)

```ts
type Cell = 0 | 1 | 2;        // empty | inked | marked-blank
type Grid = Cell[][];

interface Level {
  name: string; en: string;   // display names
  n: number;                  // grid size
  rows: number[];             // right-side targets (length n)
  cols: number[];             // bottom targets (length n)
  solution: string[];         // n strings of '0'/'1' — the unique answer
  rounds?: number;            // deduction sweeps needed (difficulty proxy)
}
```

- Cell state `2` ("marked blank") is a player annotation — a note that a cell is
  *known* empty. It is treated exactly as empty (`0`) for every sum; only the
  UI distinguishes it. This keeps the rules simple while giving players the
  pencil-mark they expect from logic puzzles.
- `solution` is stored for validation and for the reveal, not for win detection.

---

## 7. UI layer (`ui/`)

- **State** is a handful of module-level values in `app.ts`: current level
  index, the working `grid`, the input `mode`, and an undo `history` of grid
  snapshots. Deliberately not a framework store — the app is small enough that
  explicit `renderBoard()` / `paintCells()` / `updateTargets()` calls are
  clearer than reactive machinery.
- **Board layout** is one CSS Grid: `var(--hd) repeat(n, 1fr) var(--tg)` columns,
  laying out the corner, the top weight axis, the cells, and the right/bottom
  target strips in a single pass.
- **Live feedback**: after every input, `updateTargets()` recomputes each line's
  remaining amount (`target − current`) and tags it `good` (met) or `bad`
  (overshot, shown as a negative number in red). This turns the clue strip into
  a running scoreboard.
- **Persistence** (`save.ts`) stores progress in `localStorage` behind a
  try/catch wrapper so a blocked or full storage can never crash startup.

### 7.1 Reveal (`ui/reveal.ts`)

The win screen paints the solved board onto a Canvas, cell by cell, directly
from the player's grid. Each inked cell becomes a rounded ink blob that grows
toward its inked neighbours (so a connected shape reads as one brush mass rather
than tiles), with a radial two-tone fill, deterministic per-cell jitter, and a
few dry-brush speckles. The jitter is seeded from `(r, c)` so the texture is
stable across repaints. The picture is literally a rendering of what the player
deduced — fulfilling design goal #4.

---

## 8. Guarantees and invariants

- **Every shipped level is uniquely and guess-free solvable** — enforced at
  generation time by `validateLevel`; nothing else can enter `levels.ts`.
- **Clues always match the art** — targets are derived from the bitmap by
  `buildLevel`, never written by hand.
- **The core is DOM-free** — enforced by convention and the `core/`↔`ui/` import
  direction; verified by `tsc` with the DOM lib only reachable from `ui/`.
- **Startup is storage-safe** — all `localStorage` access is guarded.

---

## 9. Known limitations

- **Shallow difficulty ceiling.** The current generated shapes all fall to basic
  line-propagation in ~2–3 sweeps. There is no level that forces deeper
  inference. Raising the ceiling needs *new clue mechanics* (e.g. hidden or
  partial targets, non-contiguous weights, overlapping regions), not merely
  larger grids — a design change, tracked separately from this engine.
- **Geometric art.** Levels here are generated pictographs, not the hand-painted
  ink art of the original prototype (that art is the author's IP and is not
  reproduced).
- **No tutorial/onboarding shell.** The rules are a single expandable panel;
  there is no guided first-run coach yet.

---

## 10. Extension points

- **New platforms:** wrap `dist/` in Tauri/Capacitor, or target the WeChat
  mini-game runtime. The DOM-free `core/` ports unchanged; only `ui/` adapters
  (input, storage, canvas) change.
- **Procedural generator with a difficulty target:** reuse `humanSolve`'s
  `rounds` output as a fitness signal — generate, measure, and keep levels that
  hit a desired deduction depth. The validation gate stays identical.
- **Richer reveal:** `ui/reveal.ts` is self-contained; animated ink-bleed or a
  per-stroke draw-on can be added without touching game logic.
- **Harder clue variants:** add a rule flag to `Level`, extend `linePatterns`
  / `humanSolve` to understand it, and the generator + validator continue to
  guarantee solvability for the new mechanic for free.
