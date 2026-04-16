// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');

// Setup
function init() {
    setupMobileMenu();
    setupNavigation();
}

// Setup mobile menu
function setupMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', closeMobileMenu);

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

// Setup smooth navigation
function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
