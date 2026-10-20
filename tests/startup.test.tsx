import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { JSDOM, VirtualConsole } from "jsdom";

test("the shipped Astro entry plays GSAP automatically even with a legacy saved pause preference", async () => {
  const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
  const errors: unknown[] = [];
  const console = new VirtualConsole();
  console.on("jsdomError", error => errors.push(error));
  console.on("warn", error => errors.push(error));
  const dom = new JSDOM(html, { url: "http://localhost:4321", pretendToBeVisual: true, runScripts: "outside-only", virtualConsole: console });
  const window = dom.window;
  const document = window.document;
  window.scrollTo = () => {};
  Object.defineProperty(window, "matchMedia", { value: (query: string) => ({
    matches: !query.includes("no-preference"), media: query,
    addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {},
  }) });
  Object.defineProperty(window.HTMLElement.prototype, "offsetHeight", { get: () => 600 });
  Object.defineProperty(window.HTMLElement.prototype, "getBoundingClientRect", { value() {
    return { x: 0, y: 100, left: 0, right: 800, top: 100, bottom: 700, width: 800, height: 600, toJSON() {} };
  } });
  try {
    const script = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="module"][src]')).find(element => element.src.includes("BaseLayout"));
    assert.ok(script, "Built HTML must load the main entry script");
    const source = readFileSync(path.join(process.cwd(), "dist", new URL(script.src).pathname), "utf8");
    // Run the actual shipped JS, including startup and UI wiring.
    window.localStorage.setItem("arkan-motion", "off");
    window.eval(source);
    document.dispatchEvent(new window.Event("DOMContentLoaded"));
    const heading = document.querySelector<HTMLElement>("h1")!;
    assert.equal(document.querySelector("[data-motion-replay], [data-motion-toggle]"), null);
    assert.ok(heading.style.opacity, "Loading the actual entry must start a tween without a click");
    assert.ok(heading.style.transform.includes("48"), "The actual entry must start a visible slide, not only a brief fade");
    const packet = document.querySelector<SVGElement>(".packet-path")!;
    const firstDashOffset = Number(packet.style.strokeDashoffset);
    const firstOpacity = Number(heading.style.opacity);
    await new Promise<void>(resolve => window.setTimeout(resolve, 120));
    assert.ok(Number(heading.style.opacity) > firstOpacity, "GSAP must advance frames, not merely set inline styles");
    assert.ok(Number(packet.style.strokeDashoffset) < firstDashOffset, "The visible network packet animation must continue after startup");
    assert.equal(errors.length, 0, `Unexpected startup errors: ${errors.join("; ")}`);
    document.dispatchEvent(new window.Event("astro:before-swap"));
    assert.equal(heading.style.opacity, "");
    assert.equal(heading.style.transform, "");
  } finally { dom.window.close(); }
});
