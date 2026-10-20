import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** GSAP enhances rendered HTML; content never depends on an animation to appear. */
export function initializeMotion(scope: HTMLElement = document.body) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  let disposed = false;
  let refreshFrame: number | undefined;

  media.add({ all: "all", desktop: "(min-width: 701px)" }, context => {
    // The portfolio owner requested automatic full motion, independent of OS animation settings.
    const hero = scope.querySelector<HTMLElement>("#statement");
    // Deep links and restored scroll positions should not replay the hero above the viewport.
    if (hero && hero.getBoundingClientRect().bottom > 0 && window.scrollY < hero.offsetHeight) {
      const intro = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.15 } });
      intro.fromTo(hero.querySelectorAll(".eyebrow, h1, .hero-description, .primary-link"),
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.16, clearProps: "transform,opacity" });
      intro.fromTo(hero.querySelectorAll(".topology-panel"),
        { scale: 0.9, y: 24, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1.4, clearProps: "transform,opacity" }, 0.2);
      intro.fromTo(hero.querySelectorAll(".pillar"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.14, clearProps: "transform,opacity" }, 0.6);
    }

    scope.querySelectorAll<HTMLElement>(".reveal:not(.hero-copy)").forEach(element => {
      if (element.getBoundingClientRect().bottom <= 0) return;
      gsap.fromTo(element, { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
      });
    });

    scope.querySelectorAll<HTMLElement>(".metrics-grid").forEach(grid => {
      if (grid.getBoundingClientRect().bottom <= 0) return;
      gsap.fromTo(grid.querySelectorAll(".metric"), { y: 14, opacity: 0 }, {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.85,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: grid, start: "top 90%", once: true },
      });
    });

    const listeners: Array<() => void> = [];
    scope.querySelectorAll<HTMLElement>(".primary-link, .contact-links > a, .back-top").forEach(link => {
      const icon = link.querySelector<SVGElement>("svg:last-child");
      if (!icon) return;
      const enter = () => {
        context.add(() => {
          gsap.to(icon, { x: 2, y: -2, duration: 0.22, ease: "power2.out", overwrite: "auto" });
        });
      };
      const leave = () => {
        context.add(() => {
          gsap.to(icon, { x: 0, y: 0, duration: 0.25, ease: "power2.out", overwrite: "auto", clearProps: "transform" });
        });
      };
      link.addEventListener("pointerenter", enter);
      link.addEventListener("pointerleave", leave);
      link.addEventListener("focus", enter);
      link.addEventListener("blur", leave);
      listeners.push(() => {
        link.removeEventListener("pointerenter", enter);
        link.removeEventListener("pointerleave", leave);
        link.removeEventListener("focus", enter);
        link.removeEventListener("blur", leave);
      });
    });
    const diagram = scope.querySelector(".topology");
    const parallaxHero = scope.querySelector("#statement");
    if (context.conditions?.desktop && diagram && parallaxHero) {
      gsap.to(diagram, {
        y: -18,
        ease: "none",
        scrollTrigger: { trigger: parallaxHero, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }
    const packet = scope.querySelector(".packet-path");
    if (packet) {
      const flow = gsap.fromTo(packet, { strokeDashoffset: 0 }, {
        strokeDashoffset: -376, duration: 5, repeat: -1, ease: "none",
      });
      ScrollTrigger.create({ trigger: ".topology-panel", start: "top bottom", end: "bottom top",
        onToggle: self => { if (self.isActive) flow.play(); else flow.pause(); },
      });
    }
    return () => listeners.forEach(remove => remove());
  }, scope);

  const refresh = () => {
    if (disposed || refreshFrame !== undefined) return;
    refreshFrame = window.requestAnimationFrame(() => {
      refreshFrame = undefined;
      if (!disposed) ScrollTrigger.refresh();
    });
  };

  document.addEventListener("portfolio:language", refresh);
  document.addEventListener("astro:hydrate", refresh, true);
  scope.addEventListener("load", refresh, true);
  void document.fonts?.ready.then(refresh);
  refresh();

  return () => {
    disposed = true;
    if (refreshFrame !== undefined) window.cancelAnimationFrame(refreshFrame);
    document.removeEventListener("portfolio:language", refresh);
    document.removeEventListener("astro:hydrate", refresh, true);
    scope.removeEventListener("load", refresh, true);
    media.revert();
  };
}
