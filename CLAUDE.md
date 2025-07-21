# CLAUDE.md

This file guides Claude when working on Borko Savić's UX portfolio website.

## 📁 Project Setup

- Static single-page HTML (may migrate to AstroJS later)
- TailwindCSS v4.11
- Font: Satoshi (via @import)
- Semantic class names + @apply (used in external CSS)
- Layout: Fluid 12-column grid, full witdh. For project pages use 1/2 of the width (left-text, right-images or blank)
- Mobile-first responsive design
- Padding: `1rem` (mobile), `2rem` (desktop)
- 5 case stydues, 4 projects, each with its own color scheme
- Password protection for projects (future feature)
- spam protection for contact form / email (future feature)


## 🔀 Git & Deployment Setup

### Remotes
- `origin`: git@github.com:borkosavic/borko.design.git
- `production`: ssh://zaboleme@redakcija.rs/home/zaboleme/borko.design/borko-design-git.git

### Deployment Workflow
1. `git push origin master` → Updates GitHub + GitHub Pages preview
2. `git push production master` → Deploys to live site (borko.design)

### Important Notes
- Using `master` branch (not `main`)
- Production uses a post-receive hook for auto-deployment
- Current site remains live until new version is pushed

## 🎨 Design System Reference

**Full design specifications are in `DESIGN_SYSTEM.md`** - reference that document for:
- Complete color token definitions and usage guidelines
- Typography scale and hierarchy
- Spacing system and grid details
- Component specifications and behavior

### Available Themes (Complete Color Tokens)

**Theme A: Modern Neutral (Monochrome)**
- `bg-base`: `#F9FAFB` | `bg-alt`: `#ECEFF1` | `text-main`: `#1F2937` | `text-subtle`: `#6B7280` | `accent`: `#D1D5DB`

**Theme B: Lemon & Graphite**
- `bg-base`: `#1E1E1E` | `bg-alt`: `#2D2D2D` | `text-main`: `#FAFAFA` | `text-subtle`: `#9CA3AF` | `accent`: `#F4D35E`

**Theme C: Deep Blue & Yellow**
- `bg-base`: `#0A0F1C` | `text-main`: `#F8FAFC` | `text-subtle`: `#64748B` | `accent`: `#FACC15` | `border`: `#1E293B`

**Theme D: Architectural Warm Gray**
- `bg-base`: `#FAF9F7` | `bg-alt`: `#EDEAE3` | `text-main`: `#2E2E2E` | `text-subtle`: `#7C7C7C` | `accent`: `#BF360C`

Use only one theme at a time. Apply via CSS custom properties and semantic class names.

## 📖 Storytelling Flow for Case Studies

**CRITICAL:** All project case studies must follow a narrative storytelling structure, not static project showcases.

### Case Study Structure
Each project should unfold as a story with these key sections:

1. **Context & Challenge** - Set the scene, introduce the problem
2. **Discovery & Research** - Show your investigative process  
3. **Ideation & Process** - Walk through your design thinking
4. **Solution & Design** - Present the final outcome
5. **Impact & Results** - Quantify success and learnings

### Storytelling Implementation
- **Progressive disclosure:** Each section reveals naturally as user scrolls
- **Visual narrative:** Use images, sketches, wireframes to support the story
- **Personal voice:** Write in first person, show your thought process
- **Problem-solution arc:** Clear journey from challenge to resolution
- **Emotional connection:** Help readers feel the user's pain points

### Content Flow Guidelines
- **Hook immediately:** Start with the most compelling challenge/outcome
- **Show process:** Don't just show final designs, show how you got there
- **Include failures:** Mention iterations, pivots, what didn't work
- **Quantify impact:** Numbers, metrics, user feedback where possible
- **End with reflection:** Key learnings, what you'd do differently

## 🧩 Components Implementation

### Project Card
**States:** `collapsed` and `expanded`

```html
<div class="project-card group">
  <h2 class="title">Project Title</h2>
  <p class="metadata">Company · Year</p>
</div>
```

**Animation Behavior:**
- On click: card animates into full-page view
- Use `transition-all ease-in-out duration-500`
- Animate: `height`, `scale`, `opacity`, and `transform`
- Metadata transforms into hero title
- Auto-scroll to top with smooth transition

### Navigation
- Sticky top positioning
- Minimal text links or icons
- Smooth scroll to sections (`#work`, `#about`)
- Highlight current section

```html
<nav class="nav-bar">
  <a href="#work" class="nav-link">Work</a>
  <a href="#about" class="nav-link">About</a>
</nav>
```

### Resume Modal
- Slide-in from right or bottom
- Toggle with `.open` class
- Includes education, tools, contact info
- Optional PDF download button

## 📦 Tailwind Usage Guidelines

### CSS Architecture
- **Prefer semantic classes:** `.card`, `.title`, `.section`, `.metadata`
- **Use `@apply` in `style.css`** to define custom class bundles
- **Avoid overloading HTML** with utility classes
- **Reference design tokens** from design system

### Animation Standards
- Use `transition-all ease-in-out duration-500` for smooth transitions
- Apply `group-hover` for card interactions
- Implement `will-change` for performance on animated elements

### Example Class Structure
```css
.project-card {
  @apply bg-white rounded-lg shadow-md overflow-hidden;
  @apply transition-all ease-in-out duration-500;
  @apply hover:shadow-lg hover:scale-105;
}

.title {
  @apply text-2xl font-semibold text-gray-900;
}

.metadata {
  @apply text-sm text-gray-600;
}
```

## 📐 Layout Implementation

### Grid System
- **12-column fluid grid** with consistent gutters
- **Mobile-first approach:** 1-2 columns on mobile, expand on larger screens
- **Max-width container:** 1280px centered
- **No nested grids** inside project cards

### Spacing Application
Use consistent spacing scale from design system:
- `space-xs` (4px), `space-sm` (8px), `space-md` (16px)
- `space-lg` (32px), `space-xl` (64px)

## 🧠 Claude-Specific Tasks

### When Expanding a Project Card:
1. **Copy metadata** into hero section with larger typography
2. **Animate card** to full viewport height
3. **Update section** title and apply scroll lock to body
4. **Transition elements** offscreen smoothly
5. **Maintain** single-file structure (no separate pages)

### When Generating New Sections:
1. **Use semantic HTML5** elements (`<section>`, `<article>`, `<nav>`)
2. **Apply utility classes** via `@apply` in CSS
3. **Follow visual tone:** minimal, modern, UX-forward
4. **Reference design system** for colors, typography, spacing
5. **Ensure accessibility:** proper contrast, alt tags, semantic markup

### When Creating Components:
1. **Start with design system** component specifications
2. **Implement with semantic CSS** classes using `@apply`
3. **Add microinteractions** where specified (hover states, transitions)
4. **Test responsive behavior** across breakpoints
5. **Maintain theme consistency** throughout

### When Building Case Study Layouts:
1. **Structure content** using semantic sections for each story beat
2. **Implement progressive scroll** animations to reveal content naturally  
3. **Create visual hierarchy** that guides the reader through the narrative
4. **Support mixed media** (text, images, videos, prototypes) seamlessly
5. **Maintain storytelling momentum** with smooth transitions between sections
6. **Design for engagement** - each section should pull the reader to the next

### Case Study Section Components:
```html
<article class="case-study">
  <section class="context"><!-- Challenge/Context --></section>
  <section class="discovery"><!-- Research/Discovery --></section>
  <section class="process"><!-- Ideation/Process --></section>  
  <section class="solution"><!-- Solution/Design --></section>
  <section class="impact"><!-- Results/Impact --></section>
</article>
```

### Animation Guidelines:
- **Project grow transition:** Smooth card-to-fullscreen expansion
- **Cursor interactions:** Subtle custom cursor hints on desktop
- **Smooth scrolling:** With depth fade effects for section transitions
- **Performance:** Use `transform` and `opacity` for GPU acceleration

## 🎯 Quality Standards

- **Accessibility:** WCAG compliant contrast ratios and keyboard navigation
- **Performance:** Optimized animations and minimal JavaScript
- **Visual Polish:** Consistent with design system specifications
- **Code Quality:** Clean, semantic HTML with organized CSS structure

---

*Always reference the full DESIGN_SYSTEM.md for detailed specifications, color usage, and component behavior guidelines.*