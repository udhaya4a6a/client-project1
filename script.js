/**
 * PROFESSIONAL PORTFOLIO ANIMATIONS
 * Premium parallax scrolling, reveal animations, and interactive effects
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    parallaxEnabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    animationDuration: 300,
    parallaxThrottle: 16, // ~60fps
    scrollThrottle: 16,
};

// ============================================
// PARALLAX SCROLL HANDLER
// ============================================

const parallaxElements = document.querySelectorAll('[data-parallax]');
let parallaxTicking = false;

function handleParallaxScroll() {
    if (!CONFIG.parallaxEnabled) return;

    parallaxElements.forEach(element => {
        const parallaxValue = parseFloat(element.getAttribute('data-parallax'));
        const rect = element.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        const elementPosition = scrollPosition + rect.top;
        
        const distance = window.scrollY - (elementPosition - window.innerHeight / 2);
        const offset = distance * parallaxValue;
        
        element.style.transform = `translateY(${offset}px)`;
    });
}

function throttleParallax() {
    if (!parallaxTicking) {
        window.requestAnimationFrame(handleParallaxScroll);
        parallaxTicking = true;
        setTimeout(() => {
            parallaxTicking = false;
        }, CONFIG.parallaxThrottle);
    }
}

window.addEventListener('scroll', throttleParallax, { passive: true });

// ============================================
// INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(25px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// ============================================
// ENHANCED SCROLL INDICATOR
// ============================================

const scrollIndicator = document.querySelector('.scroll-indicator');

function handleScrollIndicator() {
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
}

window.addEventListener('scroll', handleScrollIndicator, { passive: true });

// ============================================
// NAVIGATION ACTIVE LINK HANDLER
// ============================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        
        if (href === currentSection) {
            link.style.color = 'var(--color-primary)';
        } else {
            link.style.color = 'var(--color-text-secondary)';
        }
    });
}

let navTicking = false;
window.addEventListener('scroll', () => {
    if (!navTicking) {
        window.requestAnimationFrame(updateActiveNavLink);
        navTicking = true;
        setTimeout(() => {
            navTicking = false;
        }, CONFIG.scrollThrottle);
    }
}, { passive: true });

// ============================================
// SMOOTH SCROLL ENHANCEMENT
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');

function handleNavbarEffect() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.style.boxShadow = '0 8px 24px rgba(46,42,38,0.08)';
        navbar.style.background = 'rgba(245,241,232,0.98)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(245,241,232,0.95)';
    }
}

window.addEventListener('scroll', handleNavbarEffect, { passive: true });

// ============================================
// INTERACTIVE HOVER EFFECTS
// ============================================

const skillChips = document.querySelectorAll('.skill-chip');
const projectCards = document.querySelectorAll('.project-card');
const aboutCards = document.querySelectorAll('.about-card');

// Skill chip ripple effect
skillChips.forEach(chip => {
    chip.addEventListener('mouseenter', function() {
        if (!CONFIG.parallaxEnabled) return;
        this.style.animation = 'none';
        void this.offsetWidth; // Trigger reflow
        this.style.animation = 'chipGlow 0.5s ease-out';
    });
});

// Project card depth effect
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ============================================
// PAGE INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    handleParallaxScroll();
    updateActiveNavLink();
    handleScrollIndicator();
    handleNavbarEffect();
    
    console.log('✨ Portfolio loaded with premium animations');
});

// ============================================
// PERFORMANCE: REDUCE MOTION SUPPORT
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    parallaxElements.forEach(element => {
        element.removeAttribute('data-parallax');
    });
}

// ============================================
// TOUCH DEVICE OPTIMIZATION
// ============================================

const isTouchDevice = () => {
    return (
        (typeof window !== 'undefined' &&
            ('ontouchstart' in window ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)))
    );
};

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
    parallaxElements.forEach(element => {
        const value = parseFloat(element.getAttribute('data-parallax'));
        element.setAttribute('data-parallax', value * 0.5);
    });
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

window.addEventListener('resize', () => {
    if (window.requestAnimationFrame) {
        window.requestAnimationFrame(handleParallaxScroll);
    }
}, { passive: true });

