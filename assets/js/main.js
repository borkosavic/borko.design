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
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('animate-in');
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('animate-in');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const navButton = document.querySelector('.nav-mobile button');
    
    if (mobileMenu && !mobileMenu.contains(event.target) && !navButton?.contains(event.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('animate-in');
    }
});

// Close mobile menu when window is resized to desktop
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('animate-in');
        }
    }
});
