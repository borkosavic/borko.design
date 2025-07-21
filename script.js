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

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
            closeModal();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project card interactions (placeholder for future expansion)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            // Future: expand card to full case study view
            console.log('Project clicked:', this.dataset.project);
        });
    });
});