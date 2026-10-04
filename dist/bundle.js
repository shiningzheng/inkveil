// src/core/levels.ts
var LEVELS = [
  {
    "name": "\u83F1\xB74",
    "en": "Diamond 4",
    "n": 4,
    "rows": [
      0,
      5,
      5,
      0
    ],
    "cols": [
      0,
      5,
      5,
      0
    ],
    "solution": [
      "0000",
      "0110",
      "0110",
      "0000"
    ],
    "rounds": 2
  },
  {
    "name": "\u5341\xB74",
    "en": "Cross 4",
    "n": 4,
    "rows": [
      3,
      3,
      10,
      3
    ],
    "cols": [
      3,
      3,
      10,
      3
    ],
    "solution": [
      "0010",
      "0010",
      "1111",
      "0010"
    ],
    "rounds": 2
  },
  {
    "name": "\u53E3\xB74",
    "en": "Frame 4",
    "n": 4,
    "rows": [
      10,
      5,
      5,
      10
    ],
    "cols": [
      10,
      5,
      5,
      10
    ],
    "solution": [
      "1111",
      "1001",
      "1001",
      "1111"
    ],
    "rounds": 2
  },
  {
    "name": "\u5341\xB75",
    "en": "Cross 5",
    "n": 5,
    "rows": [
      3,
      3,
      15,
      3,
      3
    ],
    "cols": [
      3,
      3,
      15,
      3,
      3
    ],
    "solution": [
      "00100",
      "00100",
      "11111",
      "00100",
      "00100"
    ],
    "rounds": 2
  },
  {
    "name": "\u53E3\xB75",
    "en": "Frame 5",
    "n": 5,
    "rows": [
      15,
      6,
      6,
      6,
      15
    ],
    "cols": [
      15,
      6,
      6,
      6,
      15
    ],
    "solution": [
      "11111",
      "10001",
      "10001",
      "10001",
      "11111"
    ],
    "rounds": 2
  },
  {
    "name": "\u5C71\xB75",
    "en": "Mountain 5",
    "n": 5,
    "rows": [
      0,
      0,
      3,
      9,
      15
    ],
    "cols": [
      5,
      9,
      12,
      9,
      5
    ],
    "solution": [
      "00000",
      "00000",
      "00100",
      "01110",
      "11111"
    ],
    "rounds": 2
  },
  {
    "name": "\u5341\xB76",
    "en": "Cross 6",
    "n": 6,
    "rows": [
      4,
      4,
      4,
      21,
      4,
      4
    ],
    "cols": [
      4,
      4,
      4,
      21,
      4,
      4
    ],
    "solution": [
      "000100",
      "000100",
      "000100",
      "111111",
      "000100",
      "000100"
    ],
    "rounds": 2
  },
  {
    "name": "\u53E3\xB76",
    "en": "Frame 6",
    "n": 6,
    "rows": [
      21,
      7,
      7,
      7,
      7,
      21
    ],
    "cols": [
      21,
      7,
      7,
      7,
      7,
      21
    ],
    "solution": [
      "111111",
      "100001",
      "100001",
      "100001",
      "100001",
      "111111"
    ],
    "rounds": 2
  },
  {
    "name": "\u5C71\xB76",
    "en": "Mountain 6",
    "n": 6,
    "rows": [
      0,
      0,
      0,
      7,
      14,
      21
    ],
    "cols": [
      6,
      11,
      15,
      15,
      11,
      6
    ],
    "solution": [
      "000000",
      "000000",
      "000000",
      "001100",
      "011110",
      "111111"
    ],
    "rounds": 2
  },
  {
    "name": "\u5341\xB77",
    "en": "Cross 7",
    "n": 7,
    "rows": [
      4,
      4,
      4,
      28,
      4,
      4,
      4
    ],
    "cols": [
      4,
      4,
      4,
      28,
      4,
      4,
      4
    ],
    "solution": [
      "0001000",
      "0001000",
      "0001000",
      "1111111",
      "0001000",
      "0001000",
      "0001000"
    ],
    "rounds": 2
  },
  {
    "name": "\u53E3\xB77",
    "en": "Frame 7",
    "n": 7,
    "rows": [
      28,
      8,
      8,
      8,
      8,
      8,
      28
    ],
    "cols": [
      28,
      8,
      8,
      8,
      8,
      8,
      28
    ],
    "solution": [
      "1111111",
      "1000001",
      "1000001",
      "1000001",
      "1000001",
      "1000001",
      "1111111"
    ],
    "rounds": 2
  },
  {
    "name": "\u5C71\xB77",
    "en": "Mountain 7",
    "n": 7,
    "rows": [
      0,
      0,
      0,
      4,
      12,
      20,
      28
    ],
    "cols": [
      7,
      13,
      18,
      22,
      18,
      13,
      7
    ],
    "solution": [
      "0000000",
      "0000000",
      "0000000",
      "0001000",
      "0011100",
      "0111110",
      "1111111"
    ],
    "rounds": 2
  },
  {
    "name": "\u5341\xB78",
    "en": "Cross 8",
    "n": 8,
    "rows": [
      5,
      5,
      5,
      5,
      36,
      5,
      5,
      5
    ],
    "cols": [
      5,
      5,
      5,
      5,
      36,
      5,
      5,
      5
    ],
    "solution": [
      "00001000",
      "00001000",
      "00001000",
      "00001000",
      "11111111",
      "00001000",
      "00001000",
      "00001000"
    ],
    "rounds": 2
  },
  {
    "name": "\u53E3\xB78",
    "en": "Frame 8",
    "n": 8,
    "rows": [
      36,
      9,
      9,
      9,
      9,
      9,
      9,
      36
    ],
    "cols": [
      36,
      9,
      9,
      9,
      9,
      9,
      9,
      36
    ],
    "solution": [
      "11111111",
      "10000001",
      "10000001",
      "10000001",
      "10000001",
      "10000001",
      "10000001",
      "11111111"
    ],
    "rounds": 2
  },
  {
    "name": "\u5C71\xB78",
    "en": "Mountain 8",
    "n": 8,
    "rows": [
      0,
      0,
      0,
      0,
      9,
      18,
      27,
      36
    ],
    "cols": [
      8,
      15,
      21,
      26,
      26,
      21,
      15,
      8
    ],
    "solution": [
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00011000",
      "00111100",
      "01111110",
      "11111111"
    ],
    "rounds": 2
  },
  {
    "name": "\u53E3\xB79",
    "en": "Frame 9",
    "n": 9,
    "rows": [
      45,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      45
    ],
    "cols": [
      45,
      10,
      10,
      10,
      10,
      10,
      10,
      10,
      45
    ],
    "solution": [
      "111111111",
      "100000001",
      "100000001",
      "100000001",
      "100000001",
      "100000001",
      "100000001",
      "100000001",
      "111111111"
    ],
    "rounds": 2
  },
  {
    "name": "\u5C71\xB79",
    "en": "Mountain 9",
    "n": 9,
    "rows": [
      0,
      0,
      0,
      0,
      5,
      15,
      25,
      35,
      45
    ],
    "cols": [
      9,
      17,
      24,
      30,
      35,
      30,
      24,
      17,
      9
    ],
    "solution": [
      "000000000",
      "000000000",
      "000000000",
      "000000000",
      "000010000",
      "000111000",
      "001111100",
      "011111110",
      "111111111"
    ],
    "rounds": 2
  },
  {
    "name": "\u83F1\xB79",
    "en": "Diamond 9",
    "n": 9,
    "rows": [
      5,
      15,
      25,
      35,
      45,
      35,
      25,
      15,
      5
    ],
    "cols": [
      5,
      15,
      25,
      35,
      45,
      35,
      25,
      15,
      5
    ],
    "solution": [
      "000010000",
      "000111000",
      "001111100",
      "011111110",
      "111111111",
      "011111110",
      "001111100",
      "000111000",
      "000010000"
    ],
    "rounds": 3
  }
];

// src/core/puzzle.ts
var colWeight = (c) => c + 1;
var rowWeight = (r) => r + 1;
function newGrid(n) {
  return Array.from({ length: n }, () => Array(n).fill(0));
}
function cloneGrid(g) {
  return g.map((row) => row.slice());
}
function rowSum(g, r) {
  let s = 0;
  for (let c = 0; c < g.length; c++) if (g[r][c] === 1) s += colWeight(c);
  return s;
}
function colSum(g, c) {
  let s = 0;
  for (let r = 0; r < g.length; r++) if (g[r][c] === 1) s += rowWeight(r);
  return s;
}
function solved(g, lv) {
  for (let r = 0; r < lv.n; r++) if (rowSum(g, r) !== lv.rows[r]) return false;
  for (let c = 0; c < lv.n; c++) if (colSum(g, c) !== lv.cols[c]) return false;
  return true;
}

// src/ui/save.ts
var KEY = "inkveil-ts-v1";
function safeGet() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
function safeSet(v) {
  try {
    localStorage.setItem(KEY, v);
  } catch {
  }
}
function loadSave() {
  try {
    const s = JSON.parse(safeGet() || "null");
    if (s && Array.isArray(s.done) && typeof s.current === "number") return s;
  } catch {
  }
  return { current: 0, done: [], states: {} };
}
function writeSave(s) {
  safeSet(JSON.stringify(s));
}

// src/ui/reveal.ts
function hash(r, c, k) {
  const x = Math.sin(r * 127.1 + c * 311.7 + k * 74.7) * 43758.5453;
  return x - Math.floor(x);
}
function paintReveal(canvas, lv, grid2) {
  const n = lv.n;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const px = 340;
  canvas.width = px * dpr;
  canvas.height = px * dpr;
  canvas.style.width = px + "px";
  canvas.style.height = px + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.fillStyle = "#f3ecdc";
  ctx.fillRect(0, 0, px, px);
  const pad = 22;
  const cell = (px - pad * 2) / n;
  const filled = (r, c) => r >= 0 && c >= 0 && r < n && c < n && lv.solution[r][c] === "1";
  ctx.fillStyle = "#23272300";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!filled(r, c)) continue;
      const x = pad + c * cell;
      const y = pad + r * cell;
      const neigh = (filled(r - 1, c) ? 1 : 0) + (filled(r + 1, c) ? 1 : 0) + (filled(r, c - 1) ? 1 : 0) + (filled(r, c + 1) ? 1 : 0);
      const grow = 0.5 + neigh * 0.35;
      const j = (k) => (hash(r, c, k) - 0.5) * cell * 0.14;
      ctx.save();
      const g = ctx.createRadialGradient(
        x + cell / 2,
        y + cell / 2,
        cell * 0.1,
        x + cell / 2,
        y + cell / 2,
        cell * 0.75
      );
      g.addColorStop(0, "#1b201c");
      g.addColorStop(1, "#2f352f");
      ctx.fillStyle = g;
      ctx.beginPath();
      const x0 = x - grow + j(1), y0 = y - grow + j(2);
      const w = cell + grow * 2 + j(3), h = cell + grow * 2 + j(4);
      const rad = cell * 0.28;
      roundRect(ctx, x0, y0, w, h, rad);
      ctx.fill();
      ctx.fillStyle = "rgba(243,236,220,0.28)";
      for (let s = 0; s < 3; s++) {
        const sx = x + hash(r, c, 10 + s) * cell;
        const sy = y + hash(r, c, 20 + s) * cell;
        ctx.fillRect(sx, sy, 1.4, 1.4);
      }
      ctx.restore();
    }
  }
  const vg = ctx.createRadialGradient(px / 2, px / 2, px * 0.3, px / 2, px / 2, px * 0.72);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(90,70,40,0.10)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, px, px);
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
}

// src/ui/app.ts
var save = loadSave();
var idx = 0;
var grid = newGrid(LEVELS[0].n);
var mode = "ink";
var history = [];
var root = () => document.getElementById("app");
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  const { class: cls, ...rest } = props;
  if (cls) node.className = cls;
  Object.assign(node, rest);
  for (const c of children) node.append(typeof c === "string" ? document.createTextNode(c) : c);
  return node;
}
function miniPreview(lv, size = 74) {
  const cv = el("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = size * dpr;
  cv.height = size * dpr;
  cv.style.width = cv.style.height = size + "px";
  const ctx = cv.getContext("2d");
  ctx.scale(dpr, dpr);
  const n = lv.n, pad = 6, cell = (size - pad * 2) / n;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (lv.solution[r][c] !== "1") continue;
    ctx.fillStyle = "#2a2f2a";
    ctx.fillRect(pad + c * cell + 0.5, pad + r * cell + 0.5, cell - 1, cell - 1);
  }
  return cv;
}
function renderTitle() {
  const r = root();
  r.innerHTML = "";
  r.className = "screen title";
  const header = el(
    "header",
    { class: "brand" },
    el("div", { class: "logo" }, "\u58A8"),
    el("h1", { class: "cn" }, "\u58A8\u9690"),
    el("div", { class: "en" }, "INKVEIL"),
    el("p", { class: "tag" }, "\u4EE5\u6570\u6210\u5F62 \xB7 \u4EE5\u58A8\u6210\u753B  \u2014  shape from numbers, paint with ink")
  );
  const rules = el(
    "details",
    { class: "rules" },
    el("summary", {}, "How to play"),
    el(
      "p",
      {},
      "Each column is weighted 1\u2026n (top), each row 1\u2026n (left). In every row, the weights of your inked cells must sum to the right-hand target; every column must sum to its bottom target. Satisfy all targets and the painting appears. Every level is solvable by pure logic \u2014 no guessing."
    )
  );
  const grid2 = el("div", { class: "level-grid" });
  LEVELS.forEach((lv, i) => {
    const isDone = save.done.includes(i);
    const card = el(
      "button",
      { class: "level-card" + (isDone ? " done" : "") },
      miniPreview(lv),
      el("div", { class: "lc-name" }, lv.name),
      el("div", { class: "lc-meta" }, `${lv.n}\xD7${lv.n}` + (isDone ? "  \u2713" : ""))
    );
    card.onclick = () => openLevel(i);
    grid2.append(card);
  });
  const collected = el("p", { class: "collected" }, `\u5DF2\u6536\u96C6 ${save.done.length} / ${LEVELS.length}`);
  r.append(header, rules, collected, grid2);
}
function openLevel(i) {
  idx = i;
  save.current = i;
  const lv = LEVELS[i];
  const saved = save.states[i];
  grid = saved && saved.length === lv.n ? saved.map((row) => row.slice()) : newGrid(lv.n);
  history = [];
  mode = "ink";
  writeSave(save);
  renderBoard();
}
function renderBoard() {
  const lv = LEVELS[idx];
  const n = lv.n;
  const r = root();
  r.innerHTML = "";
  r.className = "screen board";
  const bar = el(
    "div",
    { class: "topbar" },
    btn("\u2039 \u8FD4\u56DE", "ghost", backToTitle),
    el("div", { class: "lvl-title" }, el("b", {}, lv.name), ` \xB7 ${n}\xD7${n}`),
    el(
      "div",
      { class: "modes" },
      modeBtn("\u843D\u58A8 ink", "ink"),
      modeBtn("\u7559\u767D \u2715", "blank")
    )
  );
  const matrix = el("div", { class: "matrix" });
  matrix.style.gridTemplateColumns = `var(--hd) repeat(${n}, 1fr) var(--tg)`;
  matrix.append(el("div", { class: "corner" }));
  for (let c = 0; c < n; c++) matrix.append(el("div", { class: "axis top" }, String(c + 1)));
  matrix.append(el("div", { class: "corner" }));
  for (let rr = 0; rr < n; rr++) {
    matrix.append(el("div", { class: "axis left" }, String(rr + 1)));
    for (let c = 0; c < n; c++) {
      const cell = el("button", { class: "cell" });
      cell.dataset.r = String(rr);
      cell.dataset.c = String(c);
      cell.setAttribute("aria-label", `row ${rr + 1} col ${c + 1}`);
      cell.onclick = () => onCell(rr, c);
      matrix.append(cell);
    }
    const tg = el("div", { class: "target row" });
    tg.id = `rt-${rr}`;
    matrix.append(tg);
  }
  matrix.append(el("div", { class: "corner" }));
  for (let c = 0; c < n; c++) {
    const tg = el("div", { class: "target col" });
    tg.id = `ct-${c}`;
    matrix.append(tg);
  }
  matrix.append(el("div", { class: "corner" }));
  const tools = el(
    "div",
    { class: "tools" },
    btn("\u21B6 \u64A4\u4E00\u6B65 undo", "ghost", undo),
    btn("\u91CD\u7F6E reset", "ghost", reset)
  );
  r.append(bar, el("div", { class: "board-wrap" }, matrix), tools);
  paintCells();
  updateTargets();
}
function btn(label, cls, onClick) {
  const b = el("button", { class: `btn ${cls}` }, label);
  b.onclick = onClick;
  return b;
}
function modeBtn(label, m) {
  const b = el("button", { class: "btn mode" + (mode === m ? " active" : "") }, label);
  b.onclick = () => {
    mode = m;
    document.querySelectorAll(".btn.mode").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
  };
  return b;
}
function paintCells() {
  const n = LEVELS[idx].n;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const cell = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
    cell.classList.toggle("ink", grid[r][c] === 1);
    cell.classList.toggle("mark", grid[r][c] === 2);
    cell.textContent = grid[r][c] === 2 ? "\u2715" : "";
  }
}
function updateTargets() {
  const lv = LEVELS[idx], n = lv.n;
  for (let r = 0; r < n; r++) {
    const cur = rowSum(grid, r), goal = lv.rows[r], rem = goal - cur;
    const node = document.getElementById(`rt-${r}`);
    node.textContent = cur === goal ? "\u2713" : String(rem);
    node.className = "target row" + (cur === goal ? " good" : rem < 0 ? " bad" : "");
  }
  for (let c = 0; c < n; c++) {
    const cur = colSum(grid, c), goal = lv.cols[c], rem = goal - cur;
    const node = document.getElementById(`ct-${c}`);
    node.textContent = cur === goal ? "\u2713" : String(rem);
    node.className = "target col" + (cur === goal ? " good" : rem < 0 ? " bad" : "");
  }
}
function onCell(r, c) {
  history.push(cloneGrid(grid));
  if (mode === "ink") grid[r][c] = grid[r][c] === 1 ? 0 : 1;
  else grid[r][c] = grid[r][c] === 2 ? 0 : 2;
  save.states[idx] = grid.map((row) => row.slice());
  writeSave(save);
  paintCells();
  updateTargets();
  if (solved(grid, LEVELS[idx])) win();
}
function undo() {
  const prev = history.pop();
  if (!prev) return;
  grid = prev;
  save.states[idx] = grid.map((row) => row.slice());
  writeSave(save);
  paintCells();
  updateTargets();
}
function reset() {
  history.push(cloneGrid(grid));
  grid = newGrid(LEVELS[idx].n);
  save.states[idx] = grid.map((row) => row.slice());
  writeSave(save);
  paintCells();
  updateTargets();
}
function backToTitle() {
  save = loadSave();
  renderTitle();
}
function win() {
  const lv = LEVELS[idx];
  if (!save.done.includes(idx)) save.done.push(idx);
  writeSave(save);
  const overlay = el("div", { class: "overlay" });
  const canvas = el("canvas", { class: "reveal-art" });
  const sheet = el(
    "div",
    { class: "reveal" },
    el("div", { class: "reveal-cap" }, "\u58A8\u5F62\u6210\u753B"),
    canvas,
    el("h2", {}, lv.name),
    el("div", { class: "reveal-en" }, lv.en),
    el(
      "div",
      { class: "reveal-actions" },
      btn("\u518D\u770B gallery", "ghost", backToTitle),
      btn(
        idx + 1 < LEVELS.length ? "\u4E0B\u4E00\u5C40 next \u203A" : "\u56DE\u5230\u753B\u518C",
        "primary",
        () => {
          overlay.remove();
          if (idx + 1 < LEVELS.length) openLevel(idx + 1);
          else backToTitle();
        }
      )
    )
  );
  overlay.append(sheet);
  root().append(overlay);
  requestAnimationFrame(() => paintReveal(canvas, lv, grid));
}
function start() {
  save = loadSave();
  renderTitle();
}

// src/main.ts
start();
//# sourceMappingURL=bundle.js.map
