export interface SaveData {
  current: number;
  done: number[];
  states: Record<number, number[][]>;
}

const KEY = "inkveil-ts-v1";

function safeGet(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}
function safeSet(v: string): void {
  try { localStorage.setItem(KEY, v); } catch { /* storage blocked — ignore */ }
}

export function loadSave(): SaveData {
  try {
    const s = JSON.parse(safeGet() || "null");
    if (s && Array.isArray(s.done) && typeof s.current === "number") return s as SaveData;
  } catch { /* fall through */ }
  return { current: 0, done: [], states: {} };
}

export function writeSave(s: SaveData): void {
  safeSet(JSON.stringify(s));
}
