/**
 * Main JavaScript for Magdal Resort Website
 * All functionality in one file for easy deployment
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        whatsappNumber: '972501234567',
        animationDuration: 1000,
        scrollOffset: 100,
        debounceDelay: 250
    };

    // Utility functions
    const utils = {
        // Get element by selector
        $: (selector) => document.querySelector(selector),
        
        // Get all elements by selector
        $$: (selector) => document.querySelectorAll(selector),
        
        // Add event listener
        on: (element, event, handler) => {
            if (element) element.addEventListener(event, handler);
        },
        
        // Debounce function
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Throttle function
        throttle: (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        },
        
        // Check if element is in viewport
        isInViewport: (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    };

    // Header functionality
    const header = {
        init() {
            this.headerEl = utils.$('.header');
            this.setupScrollEffect();
            this.setupMobileMenu();
        },

        setupScrollEffect() {
            const handleScroll = utils.throttle(() => {
                if (window.scrollY > 50) {
                    this.headerEl?.classList.add('scrolled');
                } else {
                    this.headerEl?.classList.remove('scrolled');
                }
            }, 100);

            window.addEventListener('scroll', handleScroll);
        },

        setupMobileMenu() {
            const toggle = utils.$('.mobile-menu-toggle');
            const menu = utils.$('.nav-menu');
            
            utils.on(toggle, 'click', () => {
                menu?.classList.toggle('active');
                toggle?.classList.toggle('active');
            });
        }
    };

    // Smooth scrolling
    const smoothScroll = {
        init() {
            const links = utils.$$('a[href^="#"]');
            links.forEach(link => {
                utils.on(link, 'click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = utils.$(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    // Counter animation
    const counters = {
        init() {
            this.countersEl = utils.$$('.stat-number[data-count]');
            this.setupIntersectionObserver();
        },

        setupIntersectionObserver() {
            if (!window.IntersectionObserver) {
                // Fallback for older browsers
                this.animateAllCounters();
                return;
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateCounter(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            this
