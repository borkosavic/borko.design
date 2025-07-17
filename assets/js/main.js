// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile navigation toggle
function toggleMobileNav() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    
    // Toggle hamburger animation
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
    
    if (mobileMenu.classList.contains('hidden')) {
        // Show menu
        mobileMenu.classList.remove('hidden');
        // Small delay to ensure display change happens first
        setTimeout(() => {
            mobileMenu.classList.add('active');
        }, 10);
    } else {
        // Hide menu
        mobileMenu.classList.remove('active');
        // Wait for animation to complete before hiding
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav toggle button
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Mobile menu links
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', toggleMobileNav);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const navButton = document.getElementById('mobile-nav-toggle');
    
    if (mobileMenu && !mobileMenu.contains(event.target) && !navButton?.contains(event.target)) {
        const hamburger = document.querySelector('.hamburger-menu');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        mobileMenu.classList.remove('active');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
});

// Close mobile menu when window is resized to desktop
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburger = document.querySelector('.hamburger-menu');
        if (mobileMenu) {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            mobileMenu.classList.remove('active');
            mobileMenu.classList.add('hidden');
        }
    }
});
