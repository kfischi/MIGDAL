/**
 * Utility Functions for Magdal Resort Website
 * Common helper functions used throughout the application
 */

// DOM Utilities
export const DOM = {
  /**
   * Get element by ID
   * @param {string} id - Element ID
   * @returns {Element|null}
   */
  get: (id) => document.getElementById(id),

  /**
   * Get element by selector
   * @param {string} selector - CSS selector
   * @returns {Element|null}
   */
  query: (selector) => document.querySelector(selector),

  /**
   * Get multiple elements by selector
   * @param {string} selector - CSS selector
   * @returns {NodeList}
   */
  queryAll: (selector) => document.querySelectorAll(selector),

  /**
   * Create element with attributes
   * @param {string} tag - HTML tag name
   * @param {Object} attributes - Element attributes
   * @param {string} content - Element content
   * @returns {Element}
   */
  create: (tag, attributes = {}, content = '') => {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    
    if (content) {
      element.textContent = content;
    }
    
    return element;
  },

  /**
   * Add class to element
   * @param {Element} element - DOM element
   * @param {string} className - Class name to add
   */
  addClass: (element, className) => {
    if (element) element.classList.add(className);
  },

  /**
   * Remove class from element
   * @param {Element} element - DOM element
   * @param {string} className - Class name to remove
   */
  removeClass: (element, className) => {
    if (element) element.classList.remove(className);
  },

  /**
   * Toggle class on element
   * @param {Element} element - DOM element
   * @param {string} className - Class name to toggle
   */
  toggleClass: (element, className) => {
    if (element) element.classList.toggle(className);
  },

  /**
   * Check if element has class
   * @param {Element} element - DOM element
   * @param {string} className - Class name to check
   * @returns {boolean}
   */
  hasClass: (element, className) => {
    return element ? element.classList.contains(className) : false;
  },

  /**
   * Get element's position relative to viewport
   * @param {Element} element - DOM element
   * @returns {Object} - Position object
   */
  getPosition: (element) => {
    if (!element) return { top: 0, left: 0, width: 0, height: 0 };
    return element.getBoundingClientRect();
  },

  /**
   * Check if element is in viewport
   * @param {Element} element - DOM element
   * @param {number} threshold - Visibility threshold (0-1)
   * @returns {boolean}
   */
  isInViewport: (element, threshold = 0.1) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
    
    return vertInView && horInView;
  }
};

// Event Utilities
export const Events = {
  /**
   * Add event listener with options
   * @param {Element} element - DOM element
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   */
  on: (element, event, handler, options = {}) => {
    if (element && typeof handler === 'function') {
      element.addEventListener(event, handler, options);
    }
  },

  /**
   * Remove event listener
   * @param {Element} element - DOM element
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  off: (element, event, handler) => {
    if (element && typeof handler === 'function') {
      element.removeEventListener(event, handler);
    }
  },

  /**
   * Add event listener that fires only once
   * @param {Element} element - DOM element
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  once: (element, event, handler) => {
    Events.on(element, event, handler, { once: true });
  },

  /**
   * Throttle function execution
   * @param {Function} func - Function to throttle
   * @param {number} delay - Delay in milliseconds
   * @returns {Function}
   */
  throttle: (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  },

  /**
   * Debounce function execution
   * @param {Function} func - Function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function}
   */
  debounce: (func, delay) => {
    let timeoutId;
    
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
};

// Animation Utilities
export const Animation = {
  /**
   * Animate element with CSS transitions
   * @param {Element} element - DOM element
   * @param {Object} properties - CSS properties to animate
   * @param {number} duration - Animation duration in ms
   * @param {string} easing - Easing function
   * @returns {Promise}
   */
  animate: (element, properties, duration = 300, easing = 'ease') => {
    return new Promise((resolve) => {
      if (!element) {
        resolve();
        return;
      }

      const originalTransition = element.style.transition;
      element.style.transition = `all ${duration}ms ${easing}`;

      Object.entries(properties).forEach(([property, value]) => {
        element.style[property] = value;
      });

      const cleanup = () => {
        element.style.transition = originalTransition;
        resolve();
      };

      setTimeout(cleanup, duration);
    });
  },

  /**
   * Fade in element
   * @param {Element} element - DOM element
   * @param {number} duration - Animation duration
   * @returns {Promise}
   */
  fadeIn: (element, duration = 300) => {
    if (!element) return Promise.resolve();
    
    element.style.opacity = '0';
    element.style.display = 'block';
    
    return Animation.animate(element, { opacity: '1' }, duration);
  },

  /**
   * Fade out element
   * @param {Element} element - DOM element
   * @param {number} duration - Animation duration
   * @returns {Promise}
   */
  fadeOut: (element, duration = 300) => {
    if (!element) return Promise.resolve();
    
    return Animation.animate(element, { opacity: '0' }, duration)
      .then(() => {
        element.style.display = 'none';
      });
  },

  /**
   * Slide down element
   * @param {Element} element - DOM element
   * @param {number} duration - Animation duration
   * @returns {Promise}
   */
  slideDown: (element, duration = 300) => {
    if (!element) return Promise.resolve();
    
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.display = 'block';
    
    const targetHeight = element.scrollHeight + 'px';
    
    return Animation.animate(element, { height: targetHeight }, duration)
      .then(() => {
        element.style.height = 'auto';
        element.style.overflow = 'visible';
      });
  },

  /**
   * Slide up element
   * @param {Element} element - DOM element
   * @param {number} duration - Animation duration
   * @returns {Promise}
   */
  slideUp: (element, duration = 300) => {
    if (!element) return Promise.resolve();
    
    element.style.height = element.scrollHeight + 'px';
    element.style.overflow = 'hidden';
    
    return Animation.animate(element, { height: '0' }, duration)
      .then(() => {
        element.style.display = 'none';
        element.style.height = 'auto';
        element.style.overflow = 'visible';
      });
  }
};

// Validation Utilities
export const Validation = {
  /**
   * Validate email address
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  email: (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  },

  /**
   * Validate phone number (Israeli format)
   * @param {string} phone - Phone number to validate
   * @returns {boolean}
   */
  phone: (phone) => {
    const pattern = /^0\d{1,2}-?\d{7}$/;
    return pattern.test(phone);
  },

  /**
   * Validate Hebrew name
   * @param {string} name - Name to validate
   * @returns {boolean}
   */
  hebrewName: (name) => {
    const pattern = /^[א-ת\s]+$/;
    return pattern.test(name) && name.trim().length >= 2;
  },

  /**
   * Validate required field
   * @param {string} value - Value to validate
   * @returns {boolean}
   */
  required: (value) => {
    return value && value.toString().trim().length > 0;
  },

  /**
   * Validate minimum length
   * @param {string} value - Value to validate
   * @param {number} minLength - Minimum length
   * @returns {boolean}
   */
  minLength: (value, minLength) => {
    return value && value.toString().length >= minLength;
  },

  /**
   * Validate maximum length
   * @param {string} value - Value to validate
   * @param {number} maxLength - Maximum length
   * @returns {boolean}
   */
  maxLength: (value, maxLength) => {
    return !value || value.toString().length <= maxLength;
  },

  /**
   * Validate number range
   * @param {number} value - Value to validate
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {boolean}
   */
  range: (value, min, max) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  },

  /**
   * Validate date (not in past)
   * @param {string} dateString - Date string to validate
   * @returns {boolean}
   */
  futureDate: (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }
};

// Format Utilities
export const Format = {
  /**
   * Format phone number for display
   * @param {string} phone - Phone number
   * @returns {string}
   */
  phone: (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  },

  /**
   * Format currency
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency symbol
   * @returns {string}
   */
  currency: (amount, currency = '₪') => {
    if (isNaN(amount)) return '';
    return `${amount.toLocaleString('he-IL')} ${currency}`;
  },

  /**
   * Format date for display
   * @param {Date|string} date - Date to format
   * @param {string} locale - Locale for formatting
   * @returns {string}
   */
  date: (date, locale = 'he-IL') => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale);
  },

  /**
   * Format time for display
   * @param {Date|string} time - Time to format
   * @param {string} locale - Locale for formatting
   * @returns {string}
   */
  time: (time, locale = 'he-IL') => {
    if (!time) return '';
    const timeObj = typeof time === 'string' ? new Date(time) : time;
    return timeObj.toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  },

  /**
   * Truncate text with ellipsis
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string}
   */
  truncate: (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  },

  /**
   * Capitalize first letter
   * @param {string} text - Text to capitalize
   * @returns {string}
   */
  capitalize: (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
};

// Storage Utilities
export const Storage = {
  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if not found
   * @returns {any}
   */
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  },

  /**
   * Clear all localStorage
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
};

// URL Utilities
export const URL = {
  /**
   * Get URL parameter
   * @param {string} name - Parameter name
   * @returns {string|null}
   */
  getParam: (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  },

  /**
   * Set URL parameter
   * @param {string} name - Parameter name
   * @param {string} value - Parameter value
   */
  setParam: (name, value) => {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.pushState({}, '', url);
  },

  /**
   * Remove URL parameter
   * @param {string} name - Parameter name
   */
  removeParam: (name) => {
    const url = new URL(window.location);
    url.searchParams.delete(name);
    window.history.pushState({}, '', url);
  },

  /**
   * Get hash from URL
   * @returns {string}
   */
  getHash: () => {
    return window.location.hash.slice(1);
  },

  /**
   * Set hash in URL
   * @param {string} hash - Hash value
   */
  setHash: (hash) => {
    window.location.hash = hash;
  }
};

// Device Detection Utilities
export const Device = {
  /**
   * Check if device is mobile
   * @returns {boolean}
   */
  isMobile: () => {
    return window.innerWidth <= 768;
  },

  /**
   * Check if device is tablet
   * @returns {boolean}
   */
  isTablet: () => {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  },

  /**
   * Check if device is desktop
   * @returns {boolean}
   */
  isDesktop: () => {
    return window.innerWidth > 1024;
  },

  /**
   * Check if device supports touch
   * @returns {boolean}
   */
  isTouch: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  /**
   * Get viewport dimensions
   * @returns {Object}
   */
  getViewport: () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
};

// Performance Utilities
export const Performance = {
