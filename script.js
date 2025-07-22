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
    const navContact = document.getElementById('nav-contact');
    const contactPage = document.getElementById('contact-page');
    const caseStudies = document.querySelector('.case-studies');
    
    // Navigation state tracking
    let currentView = 'home'; // 'home', 'about', 'contact', 'case-study'
    let currentProject = null; // Track current project for case studies
    
    // Page view management for SPA experience
    function updatePageView(view, data = {}) {
        let url = window.location.origin + window.location.pathname;
        let title = 'Borko Savić - UX Designer';
        
        switch(view) {
            case 'home':
                url += '#/';
                title = 'Borko Savić - UX Designer';
                break;
            case 'about':
                url += '#/about';
                title = 'About Me - Borko Savić';
                break;
            case 'contact':
                url += '#/contact';
                title = 'Contact - Borko Savić';
                break;
            case 'case-study':
                url += `#/work/${data.project}`;
                title = `${data.title} - Borko Savić`;
                currentProject = data.project;
                break;
        }
        
        // Update browser history and title
        window.history.pushState({ view, data }, title, url);
        document.title = title;
        currentView = view;
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        if (event.state) {
            navigateToView(event.state.view, event.state.data, false);
        } else {
            // Fallback for initial page load or direct navigation
            handleDirectNavigation();
        }
    });
    
    // Handle direct navigation from URL hash
    function handleDirectNavigation() {
        const hash = window.location.hash;
        
        if (hash.startsWith('#/about')) {
            navigateToView('about', {}, false);
        } else if (hash.startsWith('#/contact')) {
            navigateToView('contact', {}, false);
        } else if (hash.startsWith('#/work/')) {
            const project = hash.split('/')[2];
            const projectTitles = {
                'sciprofiles': 'SciProfiles',
                'act2access': 'Act2Access',
                'belimo': 'Belimo Assistant',
                'fxtt': 'FX Trading Tool',
                'homerules': 'HomeRules Poker'
            };
            navigateToView('case-study', { project, title: projectTitles[project] || 'Project' }, false);
        } else {
            navigateToView('home', {}, false);
        }
    }
    
    // Navigate to a specific view (with or without history update)
    function navigateToView(view, data = {}, updateHistory = true) {
        switch(view) {
            case 'home':
                showHome();
                break;
            case 'about':
                showAbout();
                break;
            case 'contact':
                showContact();
                break;
            case 'case-study':
                showCaseStudy(data.project);
                break;
        }
        
        if (updateHistory) {
            updatePageView(view, data);
        } else {
            currentView = view;
            if (data.project) currentProject = data.project;
        }
        
        updateNavState(view);
    }
    
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
        } else if (view === 'contact') {
            navContact.classList.add('nav-active');
        }
        
        currentView = view;
    }

    // View display functions
    function showHome() {
        // Close about page if open
        if (aboutPage && aboutPage.style.display !== 'none') {
            aboutPage.style.display = 'none';
            aboutPage.setAttribute('aria-hidden', 'true');
        }
        
        // Close contact page if open
        if (contactPage && contactPage.style.display !== 'none') {
            contactPage.style.display = 'none';
            contactPage.setAttribute('aria-hidden', 'true');
        }
        
        // Close case studies if open
        document.querySelectorAll('.case-study').forEach(study => {
            study.style.display = 'none';
        });
        if (caseStudies) {
            caseStudies.style.display = 'none';
        }
        
        // Show main content
        document.querySelector('main').style.display = 'block';
        
        // Always scroll to hero section (top of page)
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function showAbout() {
        // Close case studies if open
        document.querySelectorAll('.case-study').forEach(study => {
            study.style.display = 'none';
        });
        if (caseStudies) {
            caseStudies.style.display = 'none';
        }
        
        // Close contact page if open
        if (contactPage && contactPage.style.display !== 'none') {
            contactPage.style.display = 'none';
            contactPage.setAttribute('aria-hidden', 'true');
        }
        
        // Open about page
        if (aboutPage) {
            aboutPage.style.display = 'block';
            aboutPage.setAttribute('aria-hidden', 'false');
        }
    }

    function showContact() {
        // Close case studies if open
        document.querySelectorAll('.case-study').forEach(study => {
            study.style.display = 'none';
        });
        if (caseStudies) {
            caseStudies.style.display = 'none';
        }
        
        // Close about page if open
        if (aboutPage && aboutPage.style.display !== 'none') {
            aboutPage.style.display = 'none';
            aboutPage.setAttribute('aria-hidden', 'true');
        }
        
        // Open contact page
        if (contactPage) {
            contactPage.style.display = 'block';
            contactPage.setAttribute('aria-hidden', 'false');
        }
    }

    // Legacy function wrappers for existing event handlers
    function goToHome() {
        navigateToView('home');
    }

    function openAboutPage() {
        navigateToView('about');
    }

    function closeAboutPage() {
        navigateToView('home');
    }

    function openContactPage() {
        navigateToView('contact');
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
    
    if (navContact) {
        navContact.addEventListener('click', openContactPage);
    }
    
    if (aboutToggle) {
        aboutToggle.addEventListener('click', openAboutPage);
    }

    if (aboutPageClose) {
        aboutPageClose.addEventListener('click', closeAboutPage);
    }
    
    // Epic Contact Form Functionality
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                projectType: formData.get('project-type'),
                budget: formData.get('budget'),
                message: formData.get('message')
            };
            
            // Create mailto link with all the data
            const subject = encodeURIComponent(`Project Inquiry from ${data.name}`);
            let body = encodeURIComponent(
                `Hi Borko,\n\n` +
                `I'm ${data.name} and I'd like to discuss a potential project.\n\n` +
                `${data.company ? `Company: ${data.company}\n` : ''}` +
                `Project Type: ${data.projectType}\n` +
                `${data.budget ? `Budget Range: ${data.budget}\n` : ''}` +
                `\nProject Details:\n${data.message}\n\n` +
                `Please get back to me at your earliest convenience.\n\n` +
                `Best regards,\n${data.name}\n${data.email}`
            );
            
            // Open email client
            window.location.href = `mailto:hello@borko.design?subject=${subject}&body=${body}`;
            
            // Show success feedback
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="btn-text">Message Sent! 🎉</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // Initialize page based on URL hash
    handleDirectNavigation();

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
        const projectTitles = {
            'sciprofiles': 'SciProfiles',
            'act2access': 'Act2Access',
            'belimo': 'Belimo Assistant',
            'fxtt': 'FX Trading Tool',
            'homerules': 'HomeRules Poker'
        };
        
        // Add expanding class for animation
        card.classList.add('expanding');
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // After scroll animation, navigate to case study with history
        setTimeout(() => {
            navigateToView('case-study', { 
                project: projectId, 
                title: projectTitles[projectId] || 'Project'
            });
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
        
        currentProject = projectId;
    }

    function closeCaseStudy() {
        // Hide case study
        const caseStudyContainer = document.querySelector('.case-studies');
        caseStudyContainer.style.display = 'none';
        caseStudyContainer.setAttribute('aria-hidden', 'true');
        
        // Show main content
        document.querySelector('main').style.display = 'block';
        
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