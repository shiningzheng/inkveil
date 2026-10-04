import { build } from "esbuild";

const watch = process.argv.includes("--watch");
const opts = {
  entryPoints: ["src/main.ts"],
  bundle: true,
  format: "esm",
  target: "es2020",
  outfile: "dist/bundle.js",
  sourcemap: true,
  logLevel: "info",
};

if (watch) {
  const ctx = await (await import("esbuild")).context(opts);
  await ctx.watch();
  console.log("watching…");
} else {
  await build(opts);
  console.log("built dist/bundle.js");
}
