const heroMarkHost = document.querySelector("[data-hero-mark]");
const logoAnchor = document.querySelector("[data-logo-anchor]");
const wordWrap = document.querySelector("[data-word-wrap]");
const wordImg = document.querySelector(".logoWord");

if (!heroMarkHost || !logoAnchor || !wordWrap || !wordImg) {
  console.warn("Logo animacija: fali data-hero-mark / data-logo-anchor / data-word-wrap / .logoWord");
}

let fromRect = null;
let toRect = null;
let mouthPath = null;
let wordFullWidth = 0;

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

async function inlineMarkSvg() {
  const res = await fetch("../public/assets/logo-mark.svg");
  const svgText = await res.text();
  heroMarkHost.innerHTML = svgText;

  const svg = heroMarkHost.querySelector("svg");
  if (!svg) {
    console.warn("Nisam našao <svg> u logo-mark.svg");
    return;
  }

  // u tvom mark SVG-u usta su prvi path
  mouthPath = svg.querySelector("path");
}

function measure() {
  fromRect = heroMarkHost.getBoundingClientRect();
  toRect = logoAnchor.getBoundingClientRect();
}

function apply(progress) {
  if (!fromRect || !toRect) return;

  // 2 faze:
  // A) 0 -> split: mark se pomera i scale-uje do headera
  // B) split -> 1: usta nestanu + wordmark se širi (slova ulaze)
  const split = 0.55;

  const pA = clamp(progress / split, 0, 1);
  const pB = clamp((progress - split) / (1 - split), 0, 1);

  const dx = toRect.left - fromRect.left;
  const dy = toRect.top - fromRect.top;

  const sx = toRect.width / fromRect.width;
  const sy = toRect.height / fromRect.height;

  heroMarkHost.style.transformOrigin = "top left";
  heroMarkHost.style.transform = `
    translate(${dx * pA}px, ${dy * pA}px)
    scale(${1 + (sx - 1) * pA}, ${1 + (sy - 1) * pA})
  `;

  if (mouthPath) {
    mouthPath.style.opacity = pB > 0 ? "0" : "1";
  }

  if (pB > 0) wordWrap.classList.add("is-on");
  if (pB === 0) wordWrap.classList.remove("is-on");

  wordWrap.style.width = `${wordFullWidth * pB}px`;
}

function onScroll() {
  // koliko px skrola treba da se ceo prelaz završi
  const triggerDistance = 260;

  const progress = clamp(window.scrollY / triggerDistance, 0, 1);
  apply(progress);
}

function onResize() {
  measure();
  onScroll();
}

window.addEventListener("load", async () => {
  await inlineMarkSvg();

  // izmerim wordmark širinu preko probe-a, jer wrapper je width:0 pa bi uvek bilo 0
  const probe = wordImg.cloneNode(true);
  probe.style.position = "fixed";
  probe.style.left = "-9999px";
  probe.style.top = "-9999px";
  probe.style.height = "14px";
  probe.style.width = "auto";
  probe.style.opacity = "0";
  document.body.appendChild(probe);
  wordFullWidth = probe.getBoundingClientRect().width;
  probe.remove();

  wordWrap.style.width = "0px";
  wordWrap.classList.remove("is-on");

  measure();
  onScroll();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
});