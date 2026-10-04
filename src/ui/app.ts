import { LEVELS } from "../core/levels";
import { Grid, Level, newGrid, cloneGrid, rowSum, colSum, solved } from "../core/puzzle";
import { loadSave, writeSave, SaveData } from "./save";
import { paintReveal } from "./reveal";

type Mode = "ink" | "blank";

let save: SaveData = loadSave();
let idx = 0;
let grid: Grid = newGrid(LEVELS[0].n);
let mode: Mode = "ink";
let history: Grid[] = [];
const root = () => document.getElementById("app")!;

// ---------- tiny DOM helper ----------
function el<K extends keyof HTMLElementTagNameMap>(
  tag: K, props: Partial<HTMLElementTagNameMap[K]> & { class?: string } = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  const { class: cls, ...rest } = props as any;
  if (cls) node.className = cls;
  Object.assign(node, rest);
  for (const c of children) node.append(typeof c === "string" ? document.createTextNode(c) : c);
  return node;
}

// ---------- level preview (silhouette drawn from the grid) ----------
function miniPreview(lv: Level, size = 74): HTMLCanvasElement {
  const cv = el("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = size * dpr; cv.height = size * dpr;
  cv.style.width = cv.style.height = size + "px";
  const ctx = cv.getContext("2d")!;
  ctx.scale(dpr, dpr);
  const n = lv.n, pad = 6, cell = (size - pad * 2) / n;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (lv.solution[r][c] !== "1") continue;
    ctx.fillStyle = "#2a2f2a";
    ctx.fillRect(pad + c * cell + 0.5, pad + r * cell + 0.5, cell - 1, cell - 1);
  }
  return cv;
}

// ---------- title screen ----------
function renderTitle(): void {
  const r = root();
  r.innerHTML = "";
  r.className = "screen title";

  const header = el("header", { class: "brand" },
    el("div", { class: "logo" }, "墨"),
    el("h1", { class: "cn" }, "墨隐"),
    el("div", { class: "en" }, "INKVEIL"),
    el("p", { class: "tag" }, "以数成形 · 以墨成画  —  shape from numbers, paint with ink"),
  );

  const rules = el("details", { class: "rules" },
    el("summary", {}, "How to play"),
    el("p", {},
      "Each column is weighted 1…n (top), each row 1…n (left). In every row, the " +
      "weights of your inked cells must sum to the right-hand target; every column " +
      "must sum to its bottom target. Satisfy all targets and the painting appears. " +
      "Every level is solvable by pure logic — no guessing."),
  );

  const grid = el("div", { class: "level-grid" });
  LEVELS.forEach((lv, i) => {
    const isDone = save.done.includes(i);
    const card = el("button", { class: "level-card" + (isDone ? " done" : "") },
      miniPreview(lv),
      el("div", { class: "lc-name" }, lv.name),
      el("div", { class: "lc-meta" }, `${lv.n}×${lv.n}` + (isDone ? "  ✓" : "")),
    );
    card.onclick = () => openLevel(i);
    grid.append(card);
  });

  const collected = el("p", { class: "collected" }, `已收集 ${save.done.length} / ${LEVELS.length}`);
  r.append(header, rules, collected, grid);
}

// ---------- board ----------
function openLevel(i: number): void {
  idx = i;
  save.current = i;
  const lv = LEVELS[i];
  const saved = save.states[i];
  grid = saved && saved.length === lv.n ? (saved.map((row) => row.slice()) as Grid) : newGrid(lv.n);
  history = [];
  mode = "ink";
  writeSave(save);
  renderBoard();
}

function renderBoard(): void {
  const lv = LEVELS[idx];
  const n = lv.n;
  const r = root();
  r.innerHTML = "";
  r.className = "screen board";

  const bar = el("div", { class: "topbar" },
    btn("‹ 返回", "ghost", backToTitle),
    el("div", { class: "lvl-title" }, el("b", {}, lv.name), ` · ${n}×${n}`),
    el("div", { class: "modes" },
      modeBtn("落墨 ink", "ink"),
      modeBtn("留白 ✕", "blank"),
    ),
  );

  const matrix = el("div", { class: "matrix" });
  matrix.style.gridTemplateColumns = `var(--hd) repeat(${n}, 1fr) var(--tg)`;

  matrix.append(el("div", { class: "corner" }));                       // top-left
  for (let c = 0; c < n; c++) matrix.append(el("div", { class: "axis top" }, String(c + 1)));
  matrix.append(el("div", { class: "corner" }));                       // top-right

  for (let rr = 0; rr < n; rr++) {
    matrix.append(el("div", { class: "axis left" }, String(rr + 1)));
    for (let c = 0; c < n; c++) {
      const cell = el("button", { class: "cell" });
      cell.dataset.r = String(rr); cell.dataset.c = String(c);
      cell.setAttribute("aria-label", `row ${rr + 1} col ${c + 1}`);
      cell.onclick = () => onCell(rr, c);
      matrix.append(cell);
    }
    const tg = el("div", { class: "target row" }); tg.id = `rt-${rr}`;
    matrix.append(tg);
  }

  matrix.append(el("div", { class: "corner" }));
  for (let c = 0; c < n; c++) {
    const tg = el("div", { class: "target col" }); tg.id = `ct-${c}`;
    matrix.append(tg);
  }
  matrix.append(el("div", { class: "corner" }));

  const tools = el("div", { class: "tools" },
    btn("↶ 撤一步 undo", "ghost", undo),
    btn("重置 reset", "ghost", reset),
  );

  r.append(bar, el("div", { class: "board-wrap" }, matrix), tools);
  paintCells();
  updateTargets();
}

function btn(label: string, cls: string, onClick: () => void): HTMLButtonElement {
  const b = el("button", { class: `btn ${cls}` }, label);
  b.onclick = onClick;
  return b;
}
function modeBtn(label: string, m: Mode): HTMLButtonElement {
  const b = el("button", { class: "btn mode" + (mode === m ? " active" : "") }, label);
  b.onclick = () => { mode = m; document.querySelectorAll(".btn.mode").forEach((x) => x.classList.remove("active")); b.classList.add("active"); };
  return b;
}

function paintCells(): void {
  const n = LEVELS[idx].n;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const cell = document.querySelector<HTMLButtonElement>(`.cell[data-r="${r}"][data-c="${c}"]`)!;
    cell.classList.toggle("ink", grid[r][c] === 1);
    cell.classList.toggle("mark", grid[r][c] === 2);
    cell.textContent = grid[r][c] === 2 ? "✕" : "";
  }
}

function updateTargets(): void {
  const lv = LEVELS[idx], n = lv.n;
  for (let r = 0; r < n; r++) {
    const cur = rowSum(grid, r), goal = lv.rows[r], rem = goal - cur;
    const node = document.getElementById(`rt-${r}`)!;
    node.textContent = cur === goal ? "✓" : String(rem);
    node.className = "target row" + (cur === goal ? " good" : rem < 0 ? " bad" : "");
  }
  for (let c = 0; c < n; c++) {
    const cur = colSum(grid, c), goal = lv.cols[c], rem = goal - cur;
    const node = document.getElementById(`ct-${c}`)!;
    node.textContent = cur === goal ? "✓" : String(rem);
    node.className = "target col" + (cur === goal ? " good" : rem < 0 ? " bad" : "");
  }
}

function onCell(r: number, c: number): void {
  history.push(cloneGrid(grid));
  if (mode === "ink") grid[r][c] = grid[r][c] === 1 ? 0 : 1;
  else grid[r][c] = grid[r][c] === 2 ? 0 : 2;
  save.states[idx] = grid.map((row) => row.slice());
  writeSave(save);
  paintCells();
  updateTargets();
  if (solved(grid, LEVELS[idx])) win();
}

function undo(): void {
  const prev = history.pop();
  if (!prev) return;
  grid = prev;
  save.states[idx] = grid.map((row) => row.slice());
  writeSave(save);
  paintCells();
  updateTargets();
}
function reset(): void {
  history.push(cloneGrid(grid));
  grid = newGrid(LEVELS[idx].n);
  save.states[idx] = grid.map((row) => row.slice());
  writeSave(save);
  paintCells();
  updateTargets();
}

function backToTitle(): void {
  save = loadSave();                 // reflect any newly-done levels
  renderTitle();
}

// ---------- win / reveal ----------
function win(): void {
  const lv = LEVELS[idx];
  if (!save.done.includes(idx)) save.done.push(idx);
  writeSave(save);

  const overlay = el("div", { class: "overlay" });
  const canvas = el("canvas", { class: "reveal-art" });
  const sheet = el("div", { class: "reveal" },
    el("div", { class: "reveal-cap" }, "墨形成画"),
    canvas,
    el("h2", {}, lv.name),
    el("div", { class: "reveal-en" }, lv.en),
    el("div", { class: "reveal-actions" },
      btn("再看 gallery", "ghost", backToTitle),
      btn(idx + 1 < LEVELS.length ? "下一局 next ›" : "回到画册", "primary",
        () => { overlay.remove(); if (idx + 1 < LEVELS.length) openLevel(idx + 1); else backToTitle(); }),
    ),
  );
  overlay.append(sheet);
  root().append(overlay);
  // paint after it's in the DOM
  requestAnimationFrame(() => paintReveal(canvas, lv, grid));
}

// ---------- boot ----------
export function start(): void {
  save = loadSave();
  renderTitle();
}
