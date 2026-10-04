import { Grid, Level } from "../core/puzzle";

// Deterministic per-cell jitter so the ink texture is stable across repaints.
function hash(r: number, c: number, k: number): number {
  const x = Math.sin(r * 127.1 + c * 311.7 + k * 74.7) * 43758.5453;
  return x - Math.floor(x); // 0..1
}

/**
 * Render a solved board as a monochrome ink painting — drawn FROM the grid the
 * player actually built (not a pre-made image masked by a silhouette). Each
 * inked cell becomes an ink blob with a little bleed into solved neighbours.
 */
export function paintReveal(canvas: HTMLCanvasElement, lv: Level, grid: Grid): void {
  const n = lv.n;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const px = 340;
  canvas.width = px * dpr;
  canvas.height = px * dpr;
  canvas.style.width = px + "px";
  canvas.style.height = px + "px";
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  // paper
  ctx.fillStyle = "#f3ecdc";
  ctx.fillRect(0, 0, px, px);

  const pad = 22;
  const cell = (px - pad * 2) / n;
  const filled = (r: number, c: number) =>
    r >= 0 && c >= 0 && r < n && c < n && lv.solution[r][c] === "1";

  ctx.fillStyle = "#23272300";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!filled(r, c)) continue;
      const x = pad + c * cell;
      const y = pad + r * cell;
      // bleed outward slightly less at exposed edges, more inside the mass
      const neigh =
        (filled(r - 1, c) ? 1 : 0) + (filled(r + 1, c) ? 1 : 0) +
        (filled(r, c - 1) ? 1 : 0) + (filled(r, c + 1) ? 1 : 0);
      const grow = 0.5 + neigh * 0.35;              // overlap neighbours
      const j = (k: number) => (hash(r, c, k) - 0.5) * cell * 0.14;

      ctx.save();
      // two tones for depth
      const g = ctx.createRadialGradient(
        x + cell / 2, y + cell / 2, cell * 0.1,
        x + cell / 2, y + cell / 2, cell * 0.75
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
      // a few dry-brush speckles near edges
      ctx.fillStyle = "rgba(243,236,220,0.28)";
      for (let s = 0; s < 3; s++) {
        const sx = x + hash(r, c, 10 + s) * cell;
        const sy = y + hash(r, c, 20 + s) * cell;
        ctx.fillRect(sx, sy, 1.4, 1.4);
      }
      ctx.restore();
    }
  }
  // faint vignette
  const vg = ctx.createRadialGradient(px / 2, px / 2, px * 0.3, px / 2, px / 2, px * 0.72);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(90,70,40,0.10)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, px, px);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
}
