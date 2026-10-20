import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, test } from "node:test";
import { JSDOM } from "jsdom";
import { act } from "react";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import CliTerminalPreview from "../src/components/CliTerminalPreview";
import { initializePortfolio } from "../src/scripts/portfolio";
import { copy, vendors } from "../src/data/portfolioData";

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
let dom: JSDOM;
let cleanup: (() => void) | undefined;
let reactRoot: Root | undefined;
const originalGlobals = new Map<string, PropertyDescriptor | undefined>();

function setGlobal(name: string, value: unknown) {
  if (!originalGlobals.has(name)) originalGlobals.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
  Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
}

beforeEach(() => {
  dom = new JSDOM(html, { url: "http://localhost:4321", pretendToBeVisual: true });
  for (const name of ["window", "document", "navigator", "HTMLElement", "HTMLImageElement", "CustomEvent", "Event", "KeyboardEvent", "MouseEvent", "localStorage"] as const) {
    setGlobal(name, name === "window" ? dom.window : dom.window[name]);
  }
  setGlobal("IS_REACT_ACT_ENVIRONMENT", true);
});

afterEach(async () => {
  if (reactRoot) await act(async () => reactRoot?.unmount());
  reactRoot = undefined;
  cleanup?.();
  cleanup = undefined;
  dom.window.close();
  for (const [name, descriptor] of originalGlobals) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else Reflect.deleteProperty(globalThis, name);
  }
  originalGlobals.clear();
});

function button(selector: string) {
  const element = document.querySelector<HTMLButtonElement>(selector);
  assert.ok(element, `Missing ${selector}`);
  return element;
}

test("build emits substantive static HTML and exactly one visible React island", () => {
  const islands = document.querySelectorAll("astro-island[component-url]");
  assert.equal(islands.length, 1);
  assert.equal(islands[0].getAttribute("client"), "visible");
  assert.equal(document.querySelectorAll("h1").length, 1);
  assert.ok(document.querySelector("h1")?.textContent?.includes(copy.hero.en));
  assert.equal(document.querySelectorAll("article.project").length, 3);
  assert.equal(document.querySelectorAll(".credential-card").length, 2);
  assert.ok(!document.querySelector(".credential-grid")?.textContent?.includes("Data Science & Engineering Track"));
  assert.equal(document.querySelectorAll(".log-table tbody tr").length, 8);
  for (const id of ["main", "statement", "education", "engineering", "telemetry", "contact"]) {
    assert.equal(document.querySelectorAll(`#${id}`).length, 1);
  }
  assert.ok(!html.includes("/_next/"));
  assert.ok(!html.includes("fonts.googleapis.com"));
  document.querySelectorAll("[data-en]").forEach(element => {
    assert.ok(element.getAttribute("data-en"));
    assert.ok(element.getAttribute("data-id"));
  });
});

test("every emitted local image, document, and script exists; missing assets retain wireframes", () => {
  for (const element of document.querySelectorAll("[src], link[href], a[href^='/assets/']")) {
    const url = element.getAttribute("src") ?? element.getAttribute("href");
    if (url?.startsWith("/") && !url.startsWith("//")) {
      assert.ok(existsSync(path.join(process.cwd(), "dist", url.slice(1))), `Missing asset ${url}`);
    }
  }
  assert.equal(document.querySelectorAll(".asset-frame").length, 5);
  assert.ok(document.querySelector(".wireframe-building svg"));
});

test("provided campus, MXC, certificate preview, and SATU images are embedded with source links", () => {
  for (const src of ["/assets/itb-campus.jpg", "/assets/mxc-last-day.jpg", "/assets/ixplore-certificate.png", "/assets/satu-innovation-top30.jpg"]) {
    assert.ok(document.querySelector(`img[src="${src}"]`), `Missing supplied image ${src}`);
  }
  assert.ok(document.querySelector('a.credential-source[href="/assets/ixplore-certificate.pdf"]'));
  assert.ok(document.querySelector('a.credential-source[href="/assets/satu-innovation-top30.jpg"]'));
  assert.ok(document.querySelector('.certificate-preview img[src="/assets/ixplore-certificate.png"]'));
  assert.ok(document.querySelector('.award-preview img[src="/assets/satu-innovation-top30.jpg"]'));
});

test("navbar and footer languages stay synchronized, including metadata and SVG copy", () => {
  cleanup = initializePortfolio();
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-language="id"]');
  assert.equal(buttons.length, 2);
  buttons[1].click();
  assert.equal(document.documentElement.lang, "id");
  assert.equal(localStorage.getItem("arkan-language"), "id");
  assert.ok(document.querySelector("h1")?.textContent?.includes(copy.hero.id));
  assert.ok(document.title.includes("Otomasi"));
  assert.equal(document.querySelector('meta[property="og:locale"]')?.getAttribute("content"), "id_ID");
  assert.ok(document.querySelector(".topology")?.textContent?.includes("03 / OTOMASI"));
  buttons.forEach(item => assert.equal(item.getAttribute("aria-pressed"), "true"));
  button('[data-language="en"]').click();
  assert.ok(document.querySelector("h1")?.textContent?.includes(copy.hero.en));
  assert.equal(document.documentElement.lang, "en");
});

test("saved language/theme restore and both theme labels follow the language", () => {
  localStorage.setItem("arkan-language", "id");
  localStorage.setItem("arkan-theme", "light");
  cleanup = initializePortfolio();
  assert.equal(document.documentElement.lang, "id");
  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(button("[data-theme-toggle]").getAttribute("aria-label"), copy.dark.id);
  button("[data-theme-toggle]").click();
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(localStorage.getItem("arkan-theme"), "dark");
  assert.equal(button("[data-theme-toggle]").getAttribute("aria-label"), copy.light.id);
});

test("blocked localStorage preserves functional language and theme controls", () => {
  Object.defineProperty(globalThis, "localStorage", { configurable: true, get() { throw new Error("Storage blocked"); } });
  cleanup = initializePortfolio();
  button('[data-language="id"]').click();
  button("[data-theme-toggle]").click();
  assert.equal(document.documentElement.lang, "id");
  assert.equal(document.documentElement.dataset.theme, "light");
});

test("mobile navigation opens, closes on Escape with focus, and closes on selection", () => {
  cleanup = initializePortfolio();
  const toggle = button("[data-menu-toggle]");
  const menu = document.getElementById("mobile-nav")!;
  toggle.click();
  assert.equal(menu.hidden, false);
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  assert.equal(menu.hidden, true);
  assert.equal(document.activeElement, toggle);
  toggle.click();
  menu.querySelector<HTMLElement>("a span[data-en]")!.click();
  assert.equal(menu.hidden, true);
  assert.equal(toggle.getAttribute("aria-expanded"), "false");
});

async function mountTerminal() {
  const container = document.createElement("div");
  document.body.append(container);
  reactRoot = createRoot(container);
  await act(async () => reactRoot!.render(<CliTerminalPreview />));
  return container;
}

test("terminal vendor selection, keyboard navigation, and clipboard use the active workflow", async () => {
  const container = await mountTerminal();
  const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  for (let i = 0; i < vendors.length; i++) {
    await act(async () => tabs[i].click());
    assert.equal(tabs[i].getAttribute("aria-selected"), "true");
    assert.ok(container.querySelector('[role="tabpanel"]')?.textContent?.includes(vendors[i].commands[0].command));
  }
  await act(async () => tabs[3].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })));
  assert.equal(document.activeElement, tabs[0]);
  await act(async () => tabs[0].dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true })));
  assert.equal(document.activeElement, tabs[3]);
  let clipboard = "";
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (value: string) => { clipboard = value; } } });
  await act(async () => container.querySelector<HTMLButtonElement>(".copy-button")!.click());
  assert.equal(clipboard, vendors[3].commands.map(command => command.command).join("\n"));
  assert.equal(container.querySelector('[role="status"]')?.textContent, copy.copied.en);
});

test("lazy island hydrates after language selection and responds to later language events", async () => {
  const container = document.createElement("div");
  container.innerHTML = renderToString(<CliTerminalPreview />);
  document.body.append(container);
  localStorage.setItem("arkan-language", "id");
  cleanup = initializePortfolio();
  const hydrationErrors: unknown[] = [];
  await act(async () => {
    reactRoot = hydrateRoot(container, <CliTerminalPreview />, { onRecoverableError: error => hydrationErrors.push(error) });
  });
  assert.equal(hydrationErrors.length, 0);
  assert.ok(container.textContent?.includes(copy.telemetry.id));
  await act(async () => button('[data-language="en"]').click());
  assert.ok(container.textContent?.includes(copy.telemetry.en));
});

test("clipboard failure is reported without losing the diagnostic session", async () => {
  const container = await mountTerminal();
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("Denied"); } } });
  await act(async () => container.querySelector<HTMLButtonElement>(".copy-button")!.click());
  assert.equal(container.querySelector('[role="status"]')?.textContent, copy.copyFailed.en);
  assert.ok(container.querySelector('[role="tabpanel"]')?.textContent?.includes(vendors[0].commands[0].command));
});
