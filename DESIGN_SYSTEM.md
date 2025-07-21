# 📐 Borko Savić – Portfolio Design System

*A design system for a single-page, modern, minimalist UX portfolio that conveys innovation, usability, and clarity. Built to impress fellow product designers and hiring teams.*

---

## 1. 🎨 Color Themes

Each theme includes a full scale of shades for establishing **hierarchy** and **depth**.

### Theme A: Modern Neutral (Monochrome)

| Token         | HEX       | Usage                       |
| ------------- | --------- | --------------------------- |
| `bg-base`     | `#F9FAFB` | Main background             |
| `bg-alt`      | `#ECEFF1` | Section contrast background |
| `text-main`   | `#1F2937` | Primary text                |
| `text-subtle` | `#6B7280` | Subtext, metadata           |
| `accent`      | `#D1D5DB` | Borders, dividers           |

> ✅ **Do:** Use contrast between `text-main` and `bg-base` for clarity.
> ❌ **Don't:** Mix too many background shades within one section.

---

### Theme B: Lemon & Graphite

| Token         | HEX       | Usage                |
| ------------- | --------- | -------------------- |
| `bg-base`     | `#1E1E1E` | Main dark background |
| `bg-alt`      | `#2D2D2D` | Alternate section    |
| `text-main`   | `#FAFAFA` | Body text            |
| `text-subtle` | `#9CA3AF` | Metadata             |
| `accent`      | `#F4D35E` | Hover, CTA, titles   |

> ✅ Use `accent` to draw attention to project titles or CTAs
> ❌ Avoid placing `accent` on top of `bg-alt`—too little contrast.

---

### Theme C: Deep Blue & Yellow

| Token         | HEX       | Usage                     |
| ------------- | --------- | ------------------------- |
| `bg-base`     | `#0A0F1C` | Background                |
| `text-main`   | `#F8FAFC` | Primary text              |
| `text-subtle` | `#64748B` | Metadata                  |
| `accent`      | `#FACC15` | Call to action            |
| `border`      | `#1E293B` | Card outlines, separators |

---

### Theme D: Architectural Warm Gray

| Token         | HEX       | Usage                         |
| ------------- | --------- | ----------------------------- |
| `bg-base`     | `#FAF9F7` | Light background              |
| `bg-alt`      | `#EDEAE3` | Section alt                   |
| `text-main`   | `#2E2E2E` | Primary text                  |
| `text-subtle` | `#7C7C7C` | Secondary info                |
| `accent`      | `#BF360C` | Link hover, button, underline |

---

## 2. 🔤 Typography

### Primary Font: `Satoshi`, sans-serif

Modern, clean, geometric. Works well for both headings and body text.

```css
font-family: 'Satoshi', sans-serif;
```

| Type    | Size (rem) | Weight | Use                 |
| ------- | ---------- | ------ | ------------------- |
| `h1`    | 2.75rem    | 700    | Name, page titles   |
| `h2`    | 1.875rem   | 600    | Project titles      |
| `h3`    | 1.25rem    | 500    | Metadata headers    |
| `body`  | 1rem       | 400    | Paragraphs          |
| `small` | 0.875rem   | 400    | Tags, labels, dates |

> ✅ Use consistent `h2` for all projects
> ❌ Don't use `h1` more than once

---

## 3. 📏 Spacing & Grid

### Layout Grid

* **12-column fluid grid**, 1280px max-width container
* Mobile-first with 1–2 columns
* Padding: `1rem` (mobile), `2rem` (desktop)

### Spacing Scale

| Token      | Value |
| ---------- | ----- |
| `space-xs` | 4px   |
| `space-sm` | 8px   |
| `space-md` | 16px  |
| `space-lg` | 32px  |
| `space-xl` | 64px  |

Use utility spacing with `@apply` and semantic classes like `.card`, `.section`, `.metadata`.

---

## 4. 🧩 Components

### A. Project Card

**Collapsed (home view):**

```html
<div class="project-card group">
  <h2 class="title">FX Trading Tool</h2>
  <p class="metadata">HSBC · 2023</p>
</div>
```

**Expanded (project case view):**

* Card animates full screen via transform
* Metadata grows into hero title
* Section auto-scrolls to top with smooth transition

**Animation Behavior**

* Use Tailwind `transition-all` with `ease-in-out duration-500`
* Animate `height`, `scale`, and `opacity`

> ✅ Add `group-hover` to animate card UI
> ❌ Avoid separate pages: it's a single HTML file

---

### B. Navigation Bar

* Sticky top
* Simple text links or icons
* Highlight current section

```html
<nav class="nav-bar">
  <a href="#work" class="nav-link">Work</a>
  <a href="#about" class="nav-link">About</a>
</nav>
```

---

### C. Resume Modal (or Slide-in)

* Slides in from right or bottom
* Includes education, tools, and contact
* Optional Download PDF button

---

## 5. ✨ Microinteractions & Delight

### 1. **Project Grow Transition**

* When clicked, card expands smoothly into full project
* Metadata animates into heading
* Scroll locks during transition

### 2. **Cursor-as-Guide**

* On desktop, a minimal custom cursor reveals contextual hints like "Click to explore" or shows subtle icon

### 3. **Smooth Anchor Scroll with Depth Fade**

* Transitions to #about and #resume fade background slightly and highlight destination section

---

## 6. ✅ Do's and Don'ts

| ✅ Do                                                                      | ❌ Don't                                      |
| ------------------------------------------------------------------------- | -------------------------------------------- |
| Use semantic class names (`.project-card`, `.resume-slide`) with `@apply` | Avoid purely atomic Tailwind classes in HTML |
| Keep typography aligned to grid                                           | Don't center everything unless intentional   |
| Apply minimal color per section                                           | Avoid using all accents in one viewport      |
| Use `transition` to soften page switches                                  | Don't hard-swap between content              |

---