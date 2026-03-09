const heroMark = document.querySelector("[data-hero-mark]");
const logoSlot = document.querySelector("[data-logo-slot]");
const logoAnchor = document.querySelector("[data-logo-anchor]");
const headerCore = document.querySelector("[data-header-core]");
const wordChunks = Array.from(document.querySelectorAll("[data-word-chunk]"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!heroMark || !logoSlot || !logoAnchor || !headerCore || wordChunks.length === 0) {
  console.warn("Logo animation: missing required nodes");
}

const state = {
  phaseOneDistance: 180,
  phaseTwoDistance: 150,
  startRect: null,
  rafId: null,
};

function isReady() {
  return heroMark && logoSlot && logoAnchor && headerCore && wordChunks.length > 0;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
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
  state.phaseOneDistance = clamp(window.innerHeight * 0.23, 130, 290);
  state.phaseTwoDistance = clamp(window.innerHeight * 0.2, 100, 240);
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

function render() {
  if (!isReady()) return;

  const y = Math.max(window.scrollY || window.pageYOffset || 0, 0);
  const phaseOne = clamp(y / state.phaseOneDistance, 0, 1);
  const phaseTwo = clamp((y - state.phaseOneDistance) / state.phaseTwoDistance, 0, 1);

  if (reduceMotion.matches) {
    const active = y > 0;
    motion.layer.hidden = true;
    state.startRect = null;
    hideHeroMark(active);
    setDocked(active);
    setChunkState(active ? wordChunks.length : 0);
    return;
  }

  if (y <= 0.5) {
    motion.layer.hidden = true;
    state.startRect = null;
    hideHeroMark(false);
    setDocked(false);
    setChunkState(0);
    if (motion.smile) motion.smile.style.opacity = "1";
    return;
  }

  if (!state.startRect) {
    state.startRect = heroMark.getBoundingClientRect();
  }

  if (phaseOne < 1) {
    const from = state.startRect;
    const to = logoAnchor.getBoundingClientRect();
    const dx = to.left - from.left;
    const dy = to.top - from.top;

    const tx = from.left + dx * phaseOne;
    const ty = from.top + dy * phaseOne;

    motion.flight.style.transform = `translate(${tx}px, ${ty}px)`;

    if (motion.smile) {
      const smileFade = clamp((phaseOne - 0.72) / 0.28, 0, 1);
      motion.smile.style.opacity = `${1 - smileFade}`;
    }

    motion.layer.hidden = false;
    hideHeroMark(true);
    setDocked(false);
    setChunkState(0);
    return;
  }

  motion.layer.hidden = true;
  hideHeroMark(true);
  setDocked(true);

  const steps = wordChunks.length;
  const visibleCount = clamp(Math.floor(phaseTwo * steps), 0, steps);
  setChunkState(visibleCount);
}

function requestRender() {
  if (state.rafId) return;
  state.rafId = window.requestAnimationFrame(() => {
    state.rafId = null;
    render();
  });
}

function onResize() {
  updatePhaseDistances();
  if (window.scrollY <= 0.5) state.startRect = null;
  requestRender();
}

const motion = createMotionLayer();

window.addEventListener("load", () => {
  if (!isReady()) return;
  updatePhaseDistances();
  requestRender();

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", onResize);
  if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", requestRender);
  } else if (typeof reduceMotion.addListener === "function") {
    reduceMotion.addListener(requestRender);
  }
});
