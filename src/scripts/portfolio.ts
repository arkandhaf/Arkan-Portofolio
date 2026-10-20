import type { Language } from "../data/portfolioData";

/** Progressive enhancement for static Astro content; React owns only the CLI island. */
export function initializePortfolio() {
  const root = document.documentElement;
  const languageButtons = document.querySelectorAll<HTMLButtonElement>("[data-language]");
  const themeButton = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  const menuButton = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.getElementById("mobile-nav");

  function save(key: string, value: string) {
    try { localStorage.setItem(key, value); } catch { /* Preferences still work without storage. */ }
  }

  function updateThemeLabel() {
    if (!themeButton) return;
    const mode = root.dataset.theme === "light" ? "dark" : "light";
    const language = root.lang === "id" ? "id" : "en";
    themeButton.setAttribute("aria-label", themeButton.getAttribute(`data-${mode}-${language}`) ?? "");
  }

  function applyLanguage(language: Language) {
    root.lang = language;
    document.querySelectorAll<HTMLElement | SVGElement>("[data-en][data-id]").forEach(element => {
      element.textContent = element.getAttribute(`data-${language}`);
    });
    for (const [selector, attribute, prefix] of [
      ["[data-aria-en]", "aria-label", "data-aria"],
      ["[data-alt-en]", "alt", "data-alt"],
      ["[data-meta-en]", "content", "data-meta"],
    ]) {
      document.querySelectorAll(selector).forEach(element => {
        const value = element.getAttribute(`${prefix}-${language}`);
        if (value !== null) element.setAttribute(attribute, value);
      });
    }
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", language === "id" ? "id_ID" : "en_US");
    document.querySelector('meta[property="og:locale:alternate"]')?.setAttribute("content", language === "id" ? "en_US" : "id_ID");
    languageButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.language === language)));
    updateThemeLabel();
    document.dispatchEvent(new CustomEvent<Language>("portfolio:language", { detail: language }));
  }

  function toggleLanguage(event: Event) {
    const language = (event.currentTarget as HTMLButtonElement).dataset.language;
    if (language !== "en" && language !== "id") return;
    applyLanguage(language);
    save("arkan-language", language);
  }

  function toggleTheme() {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    updateThemeLabel();
    save("arkan-theme", root.dataset.theme);
  }

  function closeMenu(returnFocus = false) {
    if (menu) menu.hidden = true;
    menuButton?.setAttribute("aria-expanded", "false");
    if (returnFocus) menuButton?.focus();
  }

  function toggleMenu() {
    if (!menu) return;
    menu.hidden = !menu.hidden;
    menuButton?.setAttribute("aria-expanded", String(!menu.hidden));
  }

  function handleEscape(event: KeyboardEvent) {
    if (event.key === "Escape" && menu && !menu.hidden) closeMenu(true);
  }

  function handleMenuClick(event: Event) {
    if ((event.target as Element).closest("a")) closeMenu();
  }

  function handleAssetError(event: Event) {
    const target = event.target;
    if (target instanceof HTMLImageElement && target.hasAttribute("data-portfolio-asset")) target.remove();
  }

  let language: Language = "en";
  try {
    language = localStorage.getItem("arkan-language") === "id" ? "id" : "en";
    root.dataset.theme = localStorage.getItem("arkan-theme") === "light" ? "light" : "dark";
  } catch { /* Use defaults if storage is blocked. */ }
  applyLanguage(language);

  languageButtons.forEach(button => button.addEventListener("click", toggleLanguage));
  themeButton?.addEventListener("click", toggleTheme);
  menuButton?.addEventListener("click", toggleMenu);
  menu?.addEventListener("click", handleMenuClick);
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("error", handleAssetError, true);
  document.querySelectorAll<HTMLImageElement>("img[data-portfolio-asset]").forEach(image => {
    if (image.complete && image.naturalWidth === 0) image.remove();
  });

  const desktop = window.matchMedia?.("(min-width: 701px)");
  const handleResize = () => { if (desktop?.matches) closeMenu(); };
  desktop?.addEventListener("change", handleResize);

  const observers: IntersectionObserver[] = [];
  if (typeof IntersectionObserver !== "undefined") {
    const navigationObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll<HTMLAnchorElement>("[data-nav]").forEach(link => {
          const active = link.dataset.nav === entry.target.id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    document.querySelectorAll("#statement, #education, #engineering, #telemetry, #contact").forEach(section => navigationObserver.observe(section));
    observers.push(navigationObserver);

  }

  return () => {
    languageButtons.forEach(button => button.removeEventListener("click", toggleLanguage));
    themeButton?.removeEventListener("click", toggleTheme);
    menuButton?.removeEventListener("click", toggleMenu);
    menu?.removeEventListener("click", handleMenuClick);
    document.removeEventListener("keydown", handleEscape);
    document.removeEventListener("error", handleAssetError, true);
    desktop?.removeEventListener("change", handleResize);
    observers.forEach(observer => observer.disconnect());
  };
}
