// Basic portfolio interactions
document.addEventListener('DOMContentLoaded', function() {
    // Resume modal functionality
    const resumeToggle = document.getElementById('resume-toggle');
    const resumeModal = document.getElementById('resume-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Open resume modal
    if (resumeToggle) {
        resumeToggle.addEventListener('click', function() {
            resumeModal.classList.add('open');
            resumeModal.setAttribute('aria-hidden', 'false');
        });
    }

    // Close resume modal
    function closeModal() {
        resumeModal.classList.remove('open');
        resumeModal.setAttribute('aria-hidden', 'true');
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Escape key to close modal and pages
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (resumeModal && resumeModal.classList.contains('open')) {
                closeModal();
            } else if (aboutPage && aboutPage.style.display !== 'none') {
                closeAboutPage();
            } else if (currentView === 'case-study') {
                goToHome();
            }
        }
    });

    // Global Navigation State Management
    const aboutToggle = document.getElementById('about-toggle');
    const aboutPage = document.getElementById('about-page');
    const aboutPageClose = document.getElementById('about-page-close');
    const brandHome = document.getElementById('brand-home');
    const navWork = document.getElementById('nav-work');
    const navAbout = document.getElementById('nav-about');
    const caseStudies = document.querySelector('.case-studies');
    
    // Navigation state tracking
    let currentView = 'home'; // 'home', 'about', 'case-study'
    
    // Update navigation active states
    function updateNavState(view) {
        // Remove all active states
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('nav-active');
        });
        
        // Add active state based on current view
        if (view === 'home') {
            navWork.classList.add('nav-active');
        } else if (view === 'about') {
            navAbout.classList.add('nav-active');
        }
        
        currentView = view;
    }

    // Function to go to home/work section
    function goToHome() {
        // Close about page if open
        if (aboutPage && aboutPage.style.display !== 'none') {
            aboutPage.style.display = 'none';
            aboutPage.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        
        // Close case studies if open
        document.querySelectorAll('.case-study').forEach(study => {
            study.style.display = 'none';
        });
        if (caseStudies) {
            caseStudies.style.display = 'none';
        }
        
        // Scroll to hero or work section
        const targetSection = document.getElementById('work') || document.getElementById('hero');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        updateNavState('home');
    }

    // Function to open about page
    function openAboutPage() {
        // Close case studies if open
        document.querySelectorAll('.case-study').forEach(study => {
            study.style.display = 'none';
        });
        if (caseStudies) {
            caseStudies.style.display = 'none';
        }
        
        // Open about page
        if (aboutPage) {
            aboutPage.style.display = 'block';
            aboutPage.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
        
        updateNavState('about');
    }

    // Function to close about page
    function closeAboutPage() {
        if (aboutPage) {
            aboutPage.style.display = 'none';
            aboutPage.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        updateNavState('home');
    }

    // Navigation event listeners
    if (brandHome) {
        brandHome.addEventListener('click', goToHome);
    }
    
    if (navWork) {
        navWork.addEventListener('click', goToHome);
    }
    
    if (navAbout) {
        navAbout.addEventListener('click', openAboutPage);
    }
    
    if (aboutToggle) {
        aboutToggle.addEventListener('click', openAboutPage);
    }

    if (aboutPageClose) {
        aboutPageClose.addEventListener('click', closeAboutPage);
    }
    
    // Initialize navigation state
    updateNavState('home');

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add offset for sticky navigation
                const navHeight = document.querySelector('.nav-bar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation state
                updateActiveNavLink(this);
            }
        });
    });

    // Update active navigation link based on current section
    function updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Highlight current section on scroll
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        const navHeight = document.querySelector('.nav-bar').offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Listen for scroll events to update active navigation
    window.addEventListener('scroll', highlightCurrentSection);
    
    // Initial call to set active state
    highlightCurrentSection();

    // Theme switching functionality
    const themes = ['theme-a', 'theme-b', 'theme-c', 'theme-d'];
    let currentThemeIndex = 0;
    
    const themeSwitcher = document.getElementById('theme-switcher');
    const themeEmojis = ['🎨', '🌙', '🌊', '🏛️'];
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themes.includes(savedTheme)) {
        currentThemeIndex = themes.indexOf(savedTheme);
        applyTheme(savedTheme);
    }
    
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function() {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            const newTheme = themes[currentThemeIndex];
            applyTheme(newTheme);
            
            // Save theme preference
            localStorage.setItem('portfolio-theme', newTheme);
            
            // Update button emoji
            this.textContent = themeEmojis[currentThemeIndex];
        });
        
        // Set initial emoji
        themeSwitcher.textContent = themeEmojis[currentThemeIndex];
    }
    
    function applyTheme(theme) {
        // Remove existing theme classes
        themes.forEach(t => {
            document.documentElement.classList.remove(t);
            document.documentElement.removeAttribute('data-theme');
        });
        
        // Apply new theme
        if (theme !== 'theme-a') { // theme-a is the default, no class needed
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    // Project card interactions and expansion
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            expandProjectCard(this);
        });
    });

    function expandProjectCard(card) {
        const projectId = card.dataset.project;
        
        // Add expanding class for animation
        card.classList.add('expanding');
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // After scroll animation, show case study
        setTimeout(() => {
            showCaseStudy(projectId);
            card.classList.remove('expanding');
        }, 600);
    }

    function showCaseStudy(projectId) {
        // Hide main sections
        document.querySelector('main').style.display = 'none';
        
        // Hide about page if open
        if (aboutPage && aboutPage.style.display !== 'none') {
            aboutPage.style.display = 'none';
            aboutPage.setAttribute('aria-hidden', 'true');
        }
        
        // Show case study container
        const caseStudyContainer = document.querySelector('.case-studies');
        caseStudyContainer.style.display = 'block';
        caseStudyContainer.setAttribute('aria-hidden', 'false');
        
        // Hide all case studies
        const allCaseStudies = caseStudyContainer.querySelectorAll('.case-study');
        allCaseStudies.forEach(study => {
            study.style.display = 'none';
        });
        
        // Show the selected case study
        const selectedCaseStudy = caseStudyContainer.querySelector(`[data-project="${projectId}"]`);
        if (selectedCaseStudy) {
            selectedCaseStudy.style.display = 'block';
        }
        
        // Add close functionality to all close buttons
        const closeButtons = caseStudyContainer.querySelectorAll('.case-study-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', closeCaseStudy);
        });
        
        // Update navigation state
        updateNavState('case-study');
    }

    function closeCaseStudy() {
        // Hide case study
        const caseStudyContainer = document.querySelector('.case-studies');
        caseStudyContainer.style.display = 'none';
        caseStudyContainer.setAttribute('aria-hidden', 'true');
        
        // Show main content
        document.querySelector('main').style.display = 'block';
        
        // Restore body scrolling
        document.body.style.overflow = '';
        
        // Update navigation state and scroll to work section
        goToHome();
    }

    function generateCaseStudyHTML(projectId) {
        const projects = {
            'sciprofiles': {
                title: 'SciProfiles',
                company: 'Research Platform',
                year: '2024',
                description: 'Transforming scientific research discovery and collaboration.'
            },
            'act2access': {
                title: 'Act2Access',
                company: 'Accessibility Platform',
                year: '2023',
                description: 'Making digital experiences accessible to everyone.'
            },
            'belimo': {
                title: 'Belimo',
                company: 'Industrial IoT',
                year: '2023',
                description: 'Simplifying complex industrial automation systems.'
            },
            'fxtt': {
                title: 'FX Trading Tool',
                company: 'HSBC',
                year: '2022',
                description: 'Streamlining foreign exchange trading workflows.'
            },
            'homerules': {
                title: 'Home Rules',
                company: 'Smart Home App',
                year: '2022',
                description: 'Intuitive smart home management and automation.'
            }
        };

        const project = projects[projectId];
        
        return `
            <article class="case-study" data-project="${projectId}">
                <header class="case-study-header">
                    <button class="case-study-close" aria-label="Close case study">←</button>
                    <div class="case-study-hero">
                        <h1 class="hero-title">${project.title}</h1>
                        <p class="hero-subtitle">${project.company} · ${project.year}</p>
                        <p class="hero-description">${project.description}</p>
                    </div>
                </header>
                
                <div class="case-study-content">
                    <section class="context">
                        <h2>Context & Challenge</h2>
                        <p>Case study content for ${project.title} will be integrated here from the markdown files.</p>
                    </section>
                    
                    <section class="discovery">
                        <h2>Discovery & Research</h2>
                        <p>Research process and findings...</p>
                    </section>
                    
                    <section class="process">
                        <h2>Design Process</h2>
                        <p>Ideation and design thinking...</p>
                    </section>
                    
                    <section class="solution">
                        <h2>Solution & Design</h2>
                        <p>Final design outcome...</p>
                    </section>
                    
                    <section class="impact">
                        <h2>Impact & Results</h2>
                        <p>Quantified success and learnings...</p>
                    </section>
                </div>
            </article>
        `;
    }

});