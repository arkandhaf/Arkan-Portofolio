import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { JSDOM } from "jsdom";

test("GSAP starts full motion automatically regardless of OS animation settings and cleans up", async () => {
  const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
  const dom = new JSDOM(html, { url: "http://localhost:4321", pretendToBeVisual: true });
  const originals = new Map<string, PropertyDescriptor | undefined>();
  const expose = (name: string, value: unknown) => {
    originals.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
  };
  for (const name of ["window", "document", "navigator", "HTMLElement", "SVGElement", "Element", "CustomEvent"] as const) {
    expose(name, name === "window" ? dom.window : dom.window[name]);
  }
  expose("getComputedStyle", dom.window.getComputedStyle.bind(dom.window));
  expose("requestAnimationFrame", dom.window.requestAnimationFrame.bind(dom.window));
  expose("cancelAnimationFrame", dom.window.cancelAnimationFrame.bind(dom.window));
  dom.window.scrollTo = () => {};
  let reduced = true;
  const mediaListeners = new Set<() => void>();
  Object.defineProperty(dom.window, "matchMedia", {
    value: (query: string) => ({
      media: query,
      get matches() {
        if (query.includes("prefers-reduced-motion: no-preference")) return !reduced;
        if (query.includes("prefers-reduced-motion: reduce")) return reduced;
        return true;
      },
      addListener(listener: () => void) { mediaListeners.add(listener); },
      removeListener(listener: () => void) { mediaListeners.delete(listener); },
      addEventListener(_event: string, listener: () => void) { mediaListeners.add(listener); },
      removeEventListener(_event: string, listener: () => void) { mediaListeners.delete(listener); },
    }),
  });
  // JSDOM has no layout engine. Supply geometry so real ScrollTriggers can initialize.
  Object.defineProperty(dom.window.HTMLElement.prototype, "getBoundingClientRect", {
    value() { return { x: 0, y: 200, top: 200, left: 0, right: 600, bottom: 600, width: 600, height: 400, toJSON() {} }; },
  });
  Object.defineProperty(dom.window.HTMLElement.prototype, "offsetHeight", { get: () => 400 });
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  const { initializeMotion } = await import("../src/scripts/animations");
  let stop: (() => void) | undefined;
  try {
    stop = initializeMotion();
    assert.ok(ScrollTrigger.getAll().length > 0, "Motion must initialize without a toggle");
    assert.equal(gsap.getProperty(document.querySelector("h1"), "y"), 48, "The owner requested full automatic movement even with OS animations disabled");
    assert.ok(Number(document.querySelector<HTMLElement>("h1")!.style.opacity) < 1);
    stop();

    reduced = false;
    stop = initializeMotion();
    assert.ok(ScrollTrigger.getAll().length > 0, "Scroll effects should initialize when motion is allowed");
    const heading = document.querySelector<HTMLElement>("h1")!;
    assert.ok(heading.style.transform, "Hero timeline should enhance the heading");
    let refreshed = 0;
    const countRefresh = () => { refreshed++; };
    ScrollTrigger.addEventListener("refresh", countRefresh);
    document.dispatchEvent(new CustomEvent("portfolio:language", { detail: "id" }));
    await new Promise<void>(resolve => dom.window.requestAnimationFrame(() => resolve()));
    assert.ok(refreshed > 0, "Language changes must recompute trigger positions");
    ScrollTrigger.removeEventListener("refresh", countRefresh);

    // Simulate changing the system preference while the page is open.
    reduced = true;
    gsap.matchMediaRefresh();
    assert.ok(ScrollTrigger.getAll().length > 0);
    assert.ok(gsap.getProperty(heading, "y") !== undefined);

    stop();
    assert.equal(ScrollTrigger.getAll().length, 0);
    assert.ok(document.querySelector("h1")?.textContent?.includes("Most engineers"));
  } finally {
    stop?.();
    ScrollTrigger.disable();
    gsap.ticker.sleep();
    dom.window.close();
    for (const [name, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else Reflect.deleteProperty(globalThis, name);
    }
  }
});
