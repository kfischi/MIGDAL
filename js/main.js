/*
 * Magdal Resort Website - Main JavaScript
 * Full functionality including animations, forms, navigation, etc.
 */

// Configuration and Constants
const CONFIG = {
    selectors: {
        header: '#header',
        mobileToggle: '#mobileToggle',
        navMenu: '.nav-menu',
        scrollTop: '#scrollTop',
        form: '#quickBookingForm',
        statNumbers: '.stat-number'
    },
    classes: {
        hidden: 'hidden',
        show: 'show',
        visible: 'visible',
        loading: 'loading',
        error: 'error'
    },
    animation: {
        duration: 300,
        easing: 'ease-in-out'
    },
    whatsapp: {
        number: '972501234567',
        baseUrl: 'https://wa.me/'
    }
};

// Utility Functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
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

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Smooth scroll to element
    scrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Format phone number for WhatsApp
    formatPhoneForWhatsApp(phone) {
        return phone.replace(/\D/g, '').replace(/^0/, '972');
    },

    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone number (Israeli format)
    isValidPhone(phone) {
        const phoneRegex = /^(\+972|972|0)?[2-9]\d{7,8}$/;
        return phoneRegex.test(phone.replace(/[-\s]/g, ''));
    }
};

// Header Management
const headerManager = {
    init() {
        this.header = document.querySelector(CONFIG.selectors.header);
        this.lastScrollTop = 0;
        this.bindEvents();
    },

    bindEvents() {
        window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 10));
    },

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show header based on scroll direction
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
            this.header.classList.add(CONFIG.classes.hidden);
        } else {
            this.header.classList.remove(CONFIG.classes.hidden);
        }
        
        this.lastScrollTop = scrollTop;
    }
};

// Mobile Navigation
const mobileNav = {
    init() {
        this.toggle = document.querySelector(CONFIG.selectors.mobileToggle);
        this.menu = document.querySelector(CONFIG.selectors.navMenu);
        this.isOpen = false;
        this.bindEvents();
    },

    bindEvents() {
        if (this.toggle) {
            this.toggle.addEventListener('click', this.toggleMenu.bind(this));
        }

        // Close menu when clicking on nav links
        const navLinks = this.menu?.querySelectorAll('.nav-link');
        navLinks?.forEach(link => {
            link.addEventListener('click', this.closeMenu.bind(this));
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
                this.closeMenu();
            }
        });
    },

    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    },

    openMenu() {
        this.menu.classList.add(CONFIG.classes.show);
        this.toggle.setAttribute('aria-expanded', 'true');
        this.toggle.classList.add('active');
        this.isOpen = true;
    },

    closeMenu() {
        this.menu.classList.remove(CONFIG.classes.show);
        this.toggle.setAttribute('aria-expanded', 'false');
        this.toggle.classList.remove('active');
        this.isOpen = false;
    }
};

// Smooth Scrolling for Navigation
const smoothScrolling = {
    init() {
        this.bindEvents();
    },

    bindEvents() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleAnchorClick.bind(this));
        });
    },

    handleAnchorClick(e) {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector(CONFIG.selectors.header).offsetHeight;
            utils.scrollTo(target, headerHeight + 20);
        }
    }
};

// Statistics Counter Animation
const statsCounter = {
    init() {
        this.counters = document.querySelectorAll(CONFIG.selectors.statNumbers);
        this.animated = new Set();
        this.bindEvents();
    },

    bindEvents() {
        window.addEventListener('scroll', utils.throttle(this.checkCounters.bind(this), 100));
    },

    checkCounters() {
        this.counters.forEach(counter => {
            if (!this.animated.has(counter) && utils.isInViewport(counter)) {
                this.animateCounter(counter);
                this.animated.add(counter);
            }
        });
    },

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const start = performance.now();
        const startValue = 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startValue + (target - startValue) * easeOut);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    }
};

// Form Management
const formManager = {
    init() {
        this.form = document.querySelector(CONFIG.selectors.form);
        if (!this.form) return;

        this.submitButton = this.form.querySelector('.form-submit');
        this.bindEvents();
    },

    bindEvents() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },

    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        this.sendToWhatsApp();
    },

    validateForm() {
        const fields = [
            { name: 'name', label: 'שם מלא', required: true },
            { name: 'phone', label: 'טלפון', required: true, type: 'phone' },
            { name: 'checkin', label: 'תאריך הגעה', required: true, type: 'date' },
            { name: 'guests', label: 'מספר אורחים', required: true, type: 'number' }
        ];

        let isValid = true;

        fields.forEach(field => {
            const input = this.form.querySelector(`[name="${field.name}"]`);
            if (!this.validateField(input, field)) {
                isValid = false;
            }
        });

        return isValid;
    },

    validateField(input, fieldConfig = null) {
        const value = input.value.trim();
        const fieldName = input.name;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'שדה זה הוא חובה';
        }

        // Specific field validations
        if (value && fieldName === 'phone' && !utils.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'מספר טלפון לא תקין';
        }

        if (value && fieldName === 'email' && !utils.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'כתובת אימייל לא תקינה';
        }

        if (fieldName === 'guests') {
            const guests = parseInt(value);
            if (guests < 1 || guests > 50) {
                isValid = false;
                errorMessage = 'מספר האורחים חייב להיות בין 1 ל-50';
            }
        }

        if (fieldName === 'checkin' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                isValid = false;
                errorMessage = 'לא ניתן לבחור תאריך בעבר';
            }
        }

        this.displayFieldError(input, isValid ? '' : errorMessage);
        return isValid;
    },

    displayFieldError(input, message) {
        const errorElement = document.getElementById(`${input.name}-error`);
        
        if (message) {
            input.classList.add(CONFIG.classes.error);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add(CONFIG.classes.show);
            }
        } else {
            input.classList.remove(CONFIG.classes.error);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove(CONFIG.classes.show);
            }
        }
    },

    clearError(input) {
        input.classList.remove(CONFIG.classes.error);
        const errorElement = document.getElementById(`${input.name}-error`);
        if (errorElement) {
            errorElement.classList.remove(CONFIG.classes.show);
        }
    },

    sendToWhatsApp() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Format the message
        const message = this.formatWhatsAppMessage(data);
        const phoneNumber = CONFIG.whatsapp.number;
        const url = `${CONFIG.whatsapp.baseUrl}${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Show loading state
        this.setLoadingState(true);

        // Open WhatsApp in new tab
        window.open(url, '_blank', 'noopener,noreferrer');

        // Show success message
        setTimeout(() => {
            this.setLoadingState(false);
            this.showSuccessMessage();
            this.form.reset();
        }, 1000);
    },

    formatWhatsAppMessage(data) {
        const lines = [
            '🏔️ *בקשה להזמנה - מגדל של חיים*',
            '',
            `👤 *שם:* ${data.name}`,
            `📱 *טלפון:* ${data.phone}`,
            `📅 *תאריך הגעה:* ${this.formatDate(data.checkin)}`,
            `👥 *מספר אורחים:* ${data.guests}`,
        ];

        if (data.message) {
            lines.push('', `💬 *הודעה נוספת:*`, data.message);
        }

        lines.push('', '📍 *המיקום:* מושב מגדל, הגליל העליון');
        lines.push('🕒 *נשלח ב:* ' + new Date().toLocaleString('he-IL'));

        return lines.join('\n');
    },

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitButton.classList.add(CONFIG.classes.loading);
            this.submitButton.disabled = true;
        } else {
            this.submitButton.classList.remove(CONFIG.classes.loading);
            this.submitButton.disabled = false;
        }
    },

    showSuccessMessage() {
        const successElement = document.getElementById('form-success');
        if (successElement) {
            successElement.textContent = 'הבקשה נשלחה בהצלחה! אנחנו ניצור איתכם קשר בקרוב.';
            successElement.classList.add(CONFIG.classes.show);
            
            setTimeout(() => {
                successElement.classList.remove(CONFIG.classes.show);
            }, 5000);
        }
    }
};

// Scroll to Top Button
const scrollTopButton = {
    init() {
        this.button = document.querySelector(CONFIG.selectors.scrollTop);
        if (!this.button) return;

        this.bindEvents();
    },

    bindEvents() {
        window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 100));
        this.button.addEventListener('click', this.scrollToTop.bind(this));
    },

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            this.button.classList.add(CONFIG.classes.show);
        } else {
            this.button.classList.remove(CONFIG.classes.show);
        }
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// Gallery Interactions
const galleryManager = {
    init() {
        this.items = document.querySelectorAll('.gallery-item');
        this.bindEvents();
    },

    bindEvents() {
        this.items.forEach(item => {
            item.addEventListener('click', this.handleItemClick.bind(this));
            item.addEventListener('mouseenter', this.handleItemHover.bind(this));
        });
    },

    handleItemClick(e) {
        const item = e.currentTarget;
        // Add click animation
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 150);
        
        // You could add lightbox functionality here
        console.log('Gallery item clicked');
    },

    handleItemHover(e) {
        const item = e.currentTarget;
        // Add subtle hover effect
        item.style.transition = 'transform 0.3s ease';
    }
};

// Simple Animation Observer (instead of AOS)
const animationObserver = {
    init() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        this.observeElements();
    },

    observeElements() {
        const animatedElements = document.querySelectorAll(
            '.hero-content, .section-header, .feature-card, .stat-item, .gallery-item, .contact-item'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    },

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
};

// Performance Monitoring
const performanceMonitor = {
    init() {
        this.measurePerformance();
        this.optimizeImages();
    },

    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.now();
                console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
                
                // Send to analytics if needed
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_load_time', {
                        'custom_parameter': loadTime
                    });
                }
            });
        }
    },

    optimizeImages() {
        // Lazy loading for images (if not supported natively)
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.loading = 'lazy';
            });
        }
    }
};

// Error Handling
const errorHandler = {
    init() {
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    },

    handleError(event) {
        console.error('JavaScript Error:', event.error);
        // Log to analytics or error reporting service
    },

    handlePromiseRejection(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
        // Log to analytics or error reporting service
    }
};

// Main Application Initialization
const app = {
    init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this.start.bind(this));
            } else {
                this.start();
            }
        } catch (error) {
            console.error('App initialization failed:', error);
        }
    },

    start() {
        // Initialize all modules
        errorHandler.init();
        headerManager.init();
        mobileNav.init();
        smoothScrolling.init();
        statsCounter.init();
        formManager.init();
        scrollTopButton.init();
        galleryManager.init();
        animationObserver.init();
        performanceMonitor.init();

        console.log('Magdal Resort website initialized successfully! 🏔️');
    }
};

// Start the application
app.init();
