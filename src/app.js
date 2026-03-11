const nav = document.querySelector("[data-floating-nav]");
const highlight = document.querySelector("[data-nav-highlight]");
const links = Array.from(document.querySelectorAll("[data-nav-link]"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!nav || !highlight || links.length === 0) {
  console.warn("Floating nav: missing required nodes");
}

const state = {
  metrics: [],
  sections: [],
  currentX: 0,
  currentWidth: 0,
  targetX: 0,
  targetWidth: 0,
  activeIndex: 0,
  rafId: null,
  ticking: false,
};

function isReady() {
  return nav && highlight && links.length > 0;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(from, to, amount) {
  return from + (to - from) * amount;
}

function readMetrics() {
  const navRect = nav.getBoundingClientRect();
  const navInset = Number.parseFloat(getComputedStyle(nav).getPropertyValue("--nav-inset")) || 0;

  state.metrics = links.map((link) => {
    const rect = link.getBoundingClientRect();
    return {
      x: rect.left - navRect.left - navInset,
      width: rect.width,
    };
  });

  state.sections = links
    .map((link, index) => {
      const selector = link.getAttribute("href");
      if (!selector || !selector.startsWith("#")) return null;

      const section = document.querySelector(selector);
      if (!section) return null;

      return {
        index,
        node: section,
        top: 0,
      };
    })
    .filter(Boolean);

  updateSectionPositions();
}

function updateSectionPositions() {
  state.sections.forEach((section) => {
    section.top = section.node.offsetTop;
  });
}

function getActiveSectionIndex() {
  if (state.sections.length === 0) {
    return 0;
  }

  const scrollBottom = window.scrollY + window.innerHeight;
  const documentBottom = document.documentElement.scrollHeight;
  if (documentBottom - scrollBottom <= 8) {
    return state.sections.length - 1;
  }

  const probe = window.scrollY + window.innerHeight * 0.32;
  let activeSectionIndex = 0;

  for (let i = 0; i < state.sections.length; i += 1) {
    if (probe >= state.sections[i].top) {
      activeSectionIndex = i;
      continue;
    }

    break;
  }

  return activeSectionIndex;
}

function updateTargets() {
  const activeSectionIndex = getActiveSectionIndex();
  const activeMetric = state.metrics[activeSectionIndex];

  if (!activeMetric) return;

  state.targetX = activeMetric.x;
  state.targetWidth = activeMetric.width;

  if (activeSectionIndex !== state.activeIndex) {
    state.activeIndex = activeSectionIndex;
    links.forEach((link, index) => {
      link.classList.toggle("is-current", index === activeSectionIndex);
    });
  }

  if (reduceMotion.matches) {
    state.currentX = state.targetX;
    state.currentWidth = state.targetWidth;
  }
}

function paint() {
  if (!isReady()) return;

  const ease = reduceMotion.matches ? 1 : 0.18;
  state.currentX = lerp(state.currentX, state.targetX, ease);
  state.currentWidth = lerp(state.currentWidth, state.targetWidth, ease);

  highlight.style.transform = `translate3d(${state.currentX}px, 0, 0)`;
  highlight.style.width = `${state.currentWidth}px`;

  if (
    Math.abs(state.currentX - state.targetX) > 0.2 ||
    Math.abs(state.currentWidth - state.targetWidth) > 0.2
  ) {
    state.rafId = window.requestAnimationFrame(paint);
    return;
  }

  state.currentX = state.targetX;
  state.currentWidth = state.targetWidth;
  highlight.style.transform = `translate3d(${state.currentX}px, 0, 0)`;
  highlight.style.width = `${state.currentWidth}px`;
  state.rafId = null;
}

function requestPaint() {
  if (state.rafId) return;
  state.rafId = window.requestAnimationFrame(paint);
}

function sync() {
  if (!isReady()) return;
  updateTargets();
  requestPaint();
}

function onScroll() {
  if (state.ticking) return;
  state.ticking = true;

  window.requestAnimationFrame(() => {
    state.ticking = false;
    sync();
  });
}

function onResize() {
  readMetrics();
  updateTargets();

  if (state.metrics[0]) {
    state.currentX = state.targetX;
    state.currentWidth = state.targetWidth;
  }

  requestPaint();
}

window.addEventListener("load", () => {
  if (!isReady()) return;

  readMetrics();
  updateTargets();

  if (state.metrics[0]) {
    state.currentX = state.targetX;
    state.currentWidth = state.targetWidth;
  }

  links.forEach((link, index) => {
    link.classList.toggle("is-current", index === state.activeIndex);
  });

  requestPaint();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", sync);
  } else if (typeof reduceMotion.addListener === "function") {
    reduceMotion.addListener(sync);
  }
});
