# Task List: UX Portfolio Implementation

Based on PRD: `prd-ux-portfolio.md`

## Current State Assessment

The project is starting from scratch - no HTML, CSS, or JavaScript files exist yet. The codebase contains:
- Design system documentation (`DESIGN_SYSTEM.md`)
- Project guidelines (`CLAUDE.md`)
- Content files for 5 case studies (SciProfiles, act2access, belimo, fxtt, homeRules)
- CV content (`cv.md`)

## Relevant Files

- `index.html` - Main single-page application structure with semantic HTML5 (CREATED - Complete semantic structure with nav, main, sections, articles, and accessibility attributes)
- `style.css` - TailwindCSS implementation with semantic classes using @apply methodology (CREATED - Base styles with theme system CSS custom properties)
- `tailwind.config.js` - TailwindCSS v4 configuration with design system tokens (CREATED - Custom themes, typography, spacing)
- `src/input.css` - TailwindCSS source file with imports (CREATED - Base configuration for build process)
- `src/fonts/satoshi.css` - Satoshi font face declarations (CREATED - Font loading with display swap)
- `src/fonts/README.md` - Font installation instructions (CREATED - Download guide for Satoshi fonts)
- `package.json` - Node.js dependencies and build scripts (CREATED - TailwindCSS CLI setup)
- `script.js` - Minimal JavaScript for interactions (card expansion, modal toggles, smooth scrolling)
- `assets/images/` - Directory for case study images, wireframes, and professional photos
- `assets/resume.pdf` - Downloadable PDF version of resume

### Notes

- No testing framework is specified in the PRD, focusing on implementation
- Single-page application means all functionality lives in one HTML file
- TailwindCSS v4.11 will be used via CDN or local build
- Performance optimization requires image compression and lazy loading

## Tasks

- [ ] 1.0 Setup Project Foundation & Design System Implementation
  - [x] 1.1 Create basic HTML5 structure with semantic elements (nav, main, section, article)
  - [x] 1.2 Set up TailwindCSS v4.11 cli with custom configuration
  - [x] 1.3 Import Satoshi font from /src/fonts
  - [x] 1.4 Create CSS custom properties for design system tokens (bg-base, text-main, accent, etc.)
  - [ ] 1.5 Establish semantic CSS classes (.project-card, .title, .metadata) with @apply methodology
  - [ ] 1.6 Set up 12-column fluid grid system with 1280px max-width container
  - [ ] 1.7 Implement mobile-first responsive padding (1rem mobile, 2rem desktop)

- [ ] 2.0 Build Core Navigation & Layout Structure
  - [ ] 2.1 Create sticky navigation bar with Work and About links
  - [ ] 2.2 Implement smooth anchor scrolling to sections (#work, #about)
  - [ ] 2.3 Add current section highlighting in navigation
  - [ ] 2.4 Build hero section with professional photo and value proposition
  - [ ] 2.5 Create About section with UX methodology and collaboration approach
  - [ ] 2.6 Set up main container with proper spacing and grid layout

- [ ] 3.0 Implement Project Showcase System with Card Interactions
  - [ ] 3.1 Create 5 project card components with title, company, year, and visual preview
  - [ ] 3.2 Implement card expand animation (height, scale, opacity, transform over 500ms)
  - [ ] 3.3 Add metadata-to-hero-title transformation during expansion
  - [ ] 3.4 Create auto-scroll to top with smooth transition on card expansion
  - [ ] 3.5 Build 5-section case study structure (Context, Discovery, Process, Solution, Impact)
  - [ ] 3.6 Add hover states with group-hover for card interactions
  - [ ] 3.7 Implement custom cursor hints for desktop ("Click to explore" messaging)
  - [ ] 3.8 Add card collapse functionality to return to grid view

- [ ] 4.0 Create Theme System & Visual Design Implementation
  - [ ] 4.1 Implement Modern Neutral theme (F9FAFB, 1F2937, D1D5DB colors)
  - [ ] 4.2 Implement Lemon & Graphite theme (1E1E1E, FAFAFA, F4D35E colors)
  - [ ] 4.3 Implement Deep Blue & Yellow theme (0A0F1C, F8FAFC, FACC15 colors)
  - [ ] 4.4 Implement Architectural Warm Gray theme (FAF9F7, 2E2E2E, BF360C colors)
  - [ ] 4.5 Create theme switching functionality via settings or key combination
  - [ ] 4.6 Apply typography scale (h1: 2.75rem, h2: 1.875rem, body: 1rem)
  - [ ] 4.7 Ensure all animations use transition-all ease-in-out duration-500

- [ ] 5.0 Build Resume Modal & Contact Integration
  - [ ] 5.1 Create resume modal that slides in from right or bottom
  - [ ] 5.2 Add education, tools/skills, and contact information to resume
  - [ ] 5.3 Implement modal toggle functionality with .open class
  - [ ] 5.4 Add PDF download button for resume (link to assets/resume.pdf)
  - [ ] 5.5 Create direct email link and social media connections
  - [ ] 5.6 Add modal close functionality and background click to close

- [ ] 6.0 Content Integration & Storytelling Case Studies
  - [ ] 6.1 Transform SciProfiles.md into Context-Discovery-Process-Solution-Impact narrative
  - [ ] 6.2 Transform act2access.md into full case study with quantifiable metrics
  - [ ] 6.3 Transform belimo.md into storytelling format with process documentation
  - [ ] 6.4 Transform fxtt.md into case study showing iterations and learnings
  - [ ] 6.5 Transform homeRules.md into narrative with business impact
  - [ ] 6.6 Add proper alt text for all images and ensure accessibility compliance
  - [ ] 6.7 Write all case studies in first person showing personal thought process
  - [ ] 6.8 Include cross-functional collaboration examples in each case study

- [ ] 7.0 Performance Optimization & Accessibility Compliance
  - [ ] 7.1 Optimize all images for web and implement lazy loading
  - [ ] 7.2 Ensure WCAG AA compliance with 4.5:1 contrast ratios across all themes
  - [ ] 7.3 Test keyboard navigation and focus states for all interactive elements
  - [ ] 7.4 Optimize animations for 60fps performance using transform and opacity
  - [ ] 7.5 Test responsive design across mobile and desktop breakpoints
  - [ ] 7.6 Validate HTML5 semantic structure and screen reader compatibility
  - [ ] 7.7 Test page load time to achieve <3 second target on 3G connection
  - [ ] 7.8 Cross-browser testing (Chrome 90+, Firefox 88+, Safari 14+)