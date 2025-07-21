# Product Requirements Document: Borko Savić UX Portfolio

## 1. Introduction/Overview

This PRD defines the requirements for building Borko Savić's personal UX design portfolio - a single-page, storytelling-focused website that showcases 5 case studies with clear problem-solving methodology and design thinking processes. The portfolio targets hiring managers at tech companies and potential clients, emphasizing narrative flow and professional presentation to secure full-time UX roles, freelance opportunities, and peer recognition.

**Problem Statement:** Current portfolio approaches often showcase static project galleries without demonstrating the designer's thought process, problem-solving methodology, or business impact - missing opportunities to connect with hiring managers and clients.

**Solution:** A narrative-driven, single-page portfolio that transforms each case study into an engaging story, demonstrating design thinking, process methodology, and measurable outcomes.

## 2. Goals

- **Primary:** Secure interviews for senior UX roles at tech companies
- **Secondary:** Attract high-quality freelance clients and consulting opportunities  
- **Tertiary:** Establish professional credibility within the UX design community
- **Measurable:** Generate 5+ qualified leads per month from portfolio traffic
- **User Experience:** Achieve <3 second load times with smooth 60fps animations

## 3. User Stories

### Hiring Managers
- **As a hiring manager**, I want to quickly understand Borko's design process and problem-solving approach so I can assess fit for our open UX role
- **As a hiring manager**, I want to see quantifiable business impact from his projects so I can justify the hiring decision
- **As a hiring manager**, I want to view his work on mobile during commutes so I can review candidates efficiently

### Potential Clients
- **As a startup founder**, I want to understand how Borko approaches UX challenges similar to ours so I can evaluate him for our project
- **As a product manager**, I want to see evidence of cross-functional collaboration so I know he can work with our development team
- **As a business owner**, I want to contact him easily after reviewing his work so I can discuss potential engagements

### Peer Designers
- **As a fellow UX designer**, I want to learn from his methodology and process documentation so I can improve my own practice
- **As a design leader**, I want to refer qualified designers to my network so I can share his portfolio when opportunities arise

## 4. Functional Requirements

### 4.1 Core Navigation & Structure
1. Single-page application with smooth anchor scrolling to sections (#work, #about)
2. Sticky navigation bar that highlights current section
3. Mobile-responsive design with 1-2 columns (mobile) expanding to 12-column grid (desktop)
4. Maximum container width of 1280px with 1rem padding (mobile) / 2rem padding (desktop)

### 4.2 Project Showcase System
5. Display exactly 5 case studies as interactive project cards in collapsed state
6. Each project card must show: project title, company name, year, and visual preview
7. Project cards must expand to full-screen case study view on click with smooth animation
8. Expanded case studies must follow 5-section narrative structure:
   - Context & Challenge (problem introduction)
   - Discovery & Research (investigative process)
   - Ideation & Process (design thinking methodology)
   - Solution & Design (final outcome presentation)
   - Impact & Results (quantified success metrics)
9. All case studies must be written in first person, showcasing personal thought process
10. Each case study must include process documentation (wireframes, iterations, failures)

### 4.3 Animation & Interaction System
11. Project card expansion must animate height, scale, opacity, and transform over 500ms
12. Metadata must transform into hero title during card expansion
13. Page must auto-scroll to top with smooth transition during expansion
14. All animations must use `transition-all ease-in-out duration-500`
15. Hover states must use `group-hover` for card interactions
16. Custom cursor hints must appear on desktop ("Click to explore" contextual messaging)

### 4.4 Theme & Visual System
17. Support 4 complete color themes (Modern Neutral, Lemon & Graphite, Deep Blue & Yellow, Architectural Warm Gray)
18. Theme switching functionality accessible via settings or key combination
19. Typography must use Satoshi font with defined scale (h1: 2.75rem, h2: 1.875rem, body: 1rem)
20. Implement semantic CSS classes (.project-card, .title, .metadata) with @apply methodology
21. All colors must reference design system tokens (bg-base, text-main, accent, etc.)

### 4.5 Resume & Contact System
22. Resume modal must slide in from right or bottom
23. Resume must include: education, tools/skills, contact information
24. Optional PDF download button for resume
25. Contact form integration with spam protection (future enhancement)
26. Direct email link and social media connections

### 4.6 Content Requirements
27. Hero section with professional photo and compelling value proposition
28. About section highlighting UX methodology and collaboration approach
29. Each case study must include quantifiable business impact metrics
30. Process documentation must show iterations, pivots, and lessons learned
31. All images must have proper alt text for accessibility
32. Content must demonstrate cross-functional collaboration examples

### 4.7 Technical Implementation
33. Static HTML structure (single index.html file)
34. TailwindCSS v4.11 for styling with semantic class approach
35. Minimal JavaScript for interactions (card expansion, modal toggles, smooth scrolling)
36. Mobile-first responsive design approach
37. WCAG compliant contrast ratios across all themes
38. Optimized images and assets for <3 second load time

## 5. Non-Goals (Out of Scope)

- **Multi-page architecture:** Portfolio must remain single-page application
- **Blog or article publishing:** No content management system required
- **User authentication:** No login/signup functionality needed
- **E-commerce integration:** No payment processing for services
- **Real-time chat:** No live messaging system
- **Social media integration:** Beyond basic profile links
- **Analytics dashboard:** No admin interface for traffic analysis
- **Password protection:** Case studies remain public (future enhancement)
- **Multilingual support:** English-only content

## 6. Design Considerations

### 6.1 Visual Design
- Reference complete design system in `DESIGN_SYSTEM.md`
- Use one theme at a time with consistent application
- Implement fluid 12-column grid with consistent gutters
- Follow established spacing scale (space-xs: 4px through space-xl: 64px)

### 6.2 User Experience
- Progressive disclosure: Each case study section reveals naturally on scroll
- Visual narrative: Support mixed media (text, images, videos, prototypes)
- Emotional connection: Help readers feel user pain points from case studies
- Clear hierarchy: Guide readers through narrative with visual cues

### 6.3 Interaction Design
- Project grow transition: Smooth card-to-fullscreen expansion
- Depth fade effects: Background dimming during section transitions
- Performance optimization: Use transform and opacity for GPU acceleration
- Keyboard navigation: Full accessibility support for non-mouse users

## 7. Technical Considerations

### 7.1 Performance
- Optimize all animations for 60fps performance
- Implement lazy loading for case study images
- Use CSS transforms for smooth animations
- Minimize JavaScript bundle size

### 7.2 Accessibility
- Ensure WCAG AA compliance across all themes
- Implement proper semantic HTML5 structure
- Support keyboard-only navigation
- Maintain 4.5:1 contrast ratios minimum

### 7.3 Browser Support
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

### 7.4 Deployment
- GitHub Pages integration for preview
- Production deployment via SSH to borko.design
- Git workflow: master branch for both origin and production remotes

## 8. Success Metrics

### 8.1 User Engagement
- Average time on site: >3 minutes
- Case study completion rate: >60% of visitors view at least one full case study
- Mobile bounce rate: <40%
- Return visitor rate: >15%

### 8.2 Business Outcomes
- Generate 5+ qualified leads per month
- Interview conversion rate: >20% of interested contacts
- Portfolio shares on professional networks: >10 per month
- Direct referrals from portfolio viewers: 2+ per quarter

### 8.3 Technical Performance
- Page load time: <3 seconds on 3G connection
- Lighthouse performance score: >90
- Animation frame rate: Consistent 60fps
- Cross-browser compatibility: >95% feature parity

## 9. Open Questions

1. **Case Study Content:** Are all 5 case studies ready with complete process documentation and outcome metrics?

2. **Image Assets:** Do we have high-quality images, wireframes, and process documentation for all case studies?

3. **Theme Selection:** Should theme switching be automatic based on case study context, or manual user selection?

4. **Analytics:** Which analytics platform should be integrated to track success metrics?

5. **Hosting:** Any specific requirements for the production hosting environment beyond current SSH setup?

6. **Content Updates:** How frequently will case studies need updates, and should there be a simple content management approach?

7. **Professional Photography:** Is a professional headshot available for the hero section and about page?

8. **PDF Resume:** Is an up-to-date PDF version of the resume ready for download functionality?

---

**Document Version:** 1.0  
**Created:** 2025-01-21  
**Author:** Claude (based on Borko Savić requirements)  
**Status:** Ready for Development