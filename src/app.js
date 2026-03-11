const nav = document.querySelector("[data-floating-nav]");
const highlight = document.querySelector("[data-nav-highlight]");
const links = Array.from(document.querySelectorAll("[data-nav-link]"));
const heroMark = document.querySelector("[data-hero-mark]");
const logoSlot = document.querySelector("[data-logo-slot]");
const logoAnchor = document.querySelector("[data-logo-anchor]");
const wordChunks = Array.from(document.querySelectorAll("[data-word-chunk]"));
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
  phaseOneDistance: 180,
  phaseTwoDistance: 150,
  startRect: null,
  rafId: null,
  ticking: false,
};

function isReady() {
  return (
    nav &&
    highlight &&
    links.length > 0 &&
    heroMark &&
    logoSlot &&
    logoAnchor &&
    wordChunks.length > 0
  );
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(from, to, amount) {
  return from + (to - from) * amount;
}

function createMotionLayer() {
  const layer = document.createElement("div");
  layer.className = "motionLayer";
  layer.hidden = true;

  const flight = document.createElement("div");
  flight.className = "flightMark";
  flight.innerHTML = '<span class="markCore">b.d</span><span class="markSmile">)</span>';
  layer.appendChild(flight);

  document.body.appendChild(layer);

  return { layer, flight, smile: flight.querySelector(".markSmile") };
}

function updatePhaseDistances() {
  state.phaseOneDistance = clamp(window.innerHeight * 0.22, 120, 240);
  state.phaseTwoDistance = clamp(window.innerHeight * 0.16, 90, 180);
}

function hideHeroMark(hidden) {
  heroMark.classList.toggle("is-hidden", hidden);
}

function setDocked(docked) {
  logoSlot.classList.toggle("is-docked", docked);
}

function setChunkState(count) {
  wordChunks.forEach((chunk, index) => {
    chunk.classList.toggle("is-on", index < count);
  });
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

  const y = Math.max(window.scrollY || window.pageYOffset || 0, 0);
  const phaseOne = clamp(y / state.phaseOneDistance, 0, 1);
  const phaseTwo = clamp((y - state.phaseOneDistance) / state.phaseTwoDistance, 0, 1);

  if (reduceMotion.matches) {
    motion.layer.hidden = true;
    hideHeroMark(y > 0);
    setDocked(y > 0);
    setChunkState(y > state.phaseOneDistance ? wordChunks.length : 0);
  } else if (y <= 0.5) {
    motion.layer.hidden = true;
    state.startRect = null;
    hideHeroMark(false);
    setDocked(false);
    setChunkState(0);
    if (motion.smile) motion.smile.style.opacity = "1";
  } else {
    if (!state.startRect) {
      state.startRect = heroMark.getBoundingClientRect();
    }

    if (phaseOne < 1) {
      const from = state.startRect;
      const to = logoAnchor.getBoundingClientRect();
      const dx = to.left - from.left;
      const dy = to.top - from.top;
      const scale = lerp(1, to.width / Math.max(from.width, 1), phaseOne);

      const tx = from.left + dx * phaseOne;
      const ty = from.top + dy * phaseOne;

      motion.flight.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

      if (motion.smile) {
        const smileFade = clamp((phaseOne - 0.55) / 0.45, 0, 1);
        motion.smile.style.opacity = `${1 - smileFade}`;
      }

      motion.layer.hidden = false;
      hideHeroMark(true);
      setDocked(false);
      setChunkState(0);
    } else {
      motion.layer.hidden = true;
      hideHeroMark(true);
      setDocked(true);
      const visibleCount = clamp(Math.floor(phaseTwo * wordChunks.length), 0, wordChunks.length);
      setChunkState(visibleCount);
    }
  }

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
  updatePhaseDistances();
  if (window.scrollY <= 0.5) state.startRect = null;
  updateTargets();

  if (state.metrics[0]) {
    state.currentX = state.targetX;
    state.currentWidth = state.targetWidth;
  }

  requestPaint();
}

const motion = createMotionLayer();

window.addEventListener("load", () => {
  if (!isReady()) return;

  readMetrics();
  updatePhaseDistances();
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
