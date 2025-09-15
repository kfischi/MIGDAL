// Get Optimal Image Source
  async getOptimalImageSrc(img) {
    const dataSrc = img.dataset.src;
    const dataSrcset = img.dataset.srcset;
    
    if (!dataSrc && !dataSrcset) {
      return null;
    }

    // For srcset, return as is
    if (dataSrcset) {
      return dataSrc; // Use data-src as fallback
    }

    // For single images, check for WebP support
    if (await this.options.webpSupport) {
      const webpSrc = this.getWebpVersion(dataSrc);
      if (webpSrc && await this.imageExists(webpSrc)) {
        return webpSrc;
      }
    }

    return dataSrc;
  }

  // Get WebP Version of Image
  getWebpVersion(src) {
    if (!src) return null;
    
    // Replace extension with .webp
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Check if it's actually different (avoid .webp.webp)
    return webpSrc !== src ? webpSrc : null;
  }

  // Check if Image Exists
  imageExists(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  // Load All Images (Fallback)
  loadAllImages() {
    const lazyImages = DOM.queryAll('img[data-src], img[data-srcset]');
    lazyImages.forEach(img => this.loadImage(img));
  }

  // Error Handling
  initErrorHandling() {
    // Global image error handler
    Events.on(document, 'error', (e) => {
      if (e.target.tagName === 'IMG') {
        this.handleImageError(e.target);
      }
    }, true);
  }

  handleImageError(img) {
    if (!DOM.hasClass(img, 'error-handled')) {
      DOM.addClass(img, 'error-handled');
      
      // Try to load WebP fallback or original
      const originalSrc = img.dataset.src || img.src;
      if (originalSrc && !img.src.includes('error.svg')) {
        img.src = this.options.errorPlaceholder;
      }
    }
  }

  // Preload Critical Images
  preloadCriticalImages() {
    const criticalImages = DOM.queryAll('img[data-critical="true"]');
    const preloadPromises = [];

    criticalImages.forEach(img => {
      const src = img.dataset.src || img.src;
      if (src) {
        preloadPromises.push(this.preloadImage(src));
      }
    });

    return Promise.allSettled(preloadPromises);
  }

  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  }

  // Refresh Lazy Loading (for dynamic content)
  refresh() {
    this.observeLazyImages();
  }

  // Destroy
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Gallery Manager Class
export class GalleryManager {
  constructor(galleryElement, options = {}) {
    this.gallery = galleryElement;
    this.options = {
      lightbox: true,
      filter: true,
      masonry: false,
      itemsPerPage: 12,
      loadMore: true,
      animationDuration: 300,
      ...options
    };

    this.items = [];
    this.filteredItems = [];
    this.currentCategory = 'all';
    this.currentPage = 1;
    this.lightboxInstance = null;

    this.init();
  }

  async init() {
    try {
      await this.loadGalleryData();
      this.render();
      this.bindEvents();
      
      if (this.options.lightbox) {
        this.initLightbox();
      }
      
      if (this.options.masonry) {
        this.initMasonry();
      }
    } catch (error) {
      console.error('Failed to initialize gallery:', error);
    }
  }

  async loadGalleryData() {
    try {
      const response = await fetch('/data/gallery-data.json');
      const data = await response.json();
      
      this.categories = data.categories || [];
      this.items = data.images || [];
      this.settings = data.settings || {};
      
      // Merge settings with options
      Object.assign(this.options, this.settings);
      
      // Initialize filtered items
      this.filterItems(this.currentCategory);
    } catch (error) {
      console.error('Failed to load gallery data:', error);
      throw error;
    }
  }

  render() {
    this.renderFilters();
    this.renderItems();
    this.renderLoadMore();
  }

  renderFilters() {
    if (!this.options.filter || !this.categories.length) return;

    const filtersContainer = DOM.query('.gallery-filters') || this.createFiltersContainer();
    
    const filtersHTML = this.categories.map(category => 
      `<button class="filter-btn ${category.id === this.currentCategory ? 'active' : ''}" 
               data-category="${category.id}">
         <span class="filter-icon">${category.icon || ''}</span>
         <span class="filter-name">${category.name}</span>
         <span class="filter-count">(${this.getItemCount(category.id)})</span>
       </button>`
    ).join('');

    filtersContainer.innerHTML = filtersHTML;
  }

  createFiltersContainer() {
    const container = DOM.create('div', { className: 'gallery-filters' });
    this.gallery.parentNode.insertBefore(container, this.gallery);
    return container;
  }

  getItemCount(categoryId) {
    if (categoryId === 'all') return this.items.length;
    return this.items.filter(item => item.category === categoryId).length;
  }

  renderItems() {
    const itemsToShow = this.getItemsToShow();
    const itemsHTML = itemsToShow.map(item => this.createItemHTML(item)).join('');
    
    if (this.currentPage === 1) {
      this.gallery.innerHTML = itemsHTML;
    } else {
      this.gallery.insertAdjacentHTML('beforeend', itemsHTML);
    }

    // Trigger lazy loading refresh
    if (window.mediaManager) {
      window.mediaManager.refresh();
    }

    // Animate items
    this.animateItems();
  }

  createItemHTML(item) {
    const imageSrc = this.getImageSrc(item);
    const thumbnailSrc = this.getThumbnailSrc(item);
    
    return `
      <div class="gallery-item" data-category="${item.category}" data-id="${item.id}">
        <div class="gallery-item-inner">
          <img data-src="${thumbnailSrc}" 
               alt="${item.alt}" 
               class="gallery-image"
               data-large="${imageSrc}"
               data-title="${item.title}"
               data-description="${item.description}">
          
          <div class="gallery-overlay">
            <div class="gallery-info">
              <h3 class="gallery-title">${item.title}</h3>
              <p class="gallery-description">${item.description}</p>
            </div>
            
            <div class="gallery-actions">
              <button class="gallery-btn gallery-view" data-action="view" aria-label="צפה בתמונה">
                <span>👁️</span>
              </button>
              ${this.options.enableShare ? `
                <button class="gallery-btn gallery-share" data-action="share" aria-label="שתף תמונה">
                  <span>📤</span>
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getImageSrc(item) {
    // Use WebP if supported, otherwise use original
    if (this.options.webpSupport && item.webp && item.webp.large) {
      return item.webp.large;
    }
    return item.sizes ? item.sizes.large : item.src;
  }

  getThumbnailSrc(item) {
    // Use WebP thumbnail if supported
    if (this.options.webpSupport && item.webp && item.webp.thumbnail) {
      return item.webp.thumbnail;
    }
    return item.sizes ? item.sizes.thumbnail : item.src;
  }

  getItemsToShow() {
    const startIndex = (this.currentPage - 1) * this.options.itemsPerPage;
    const endIndex = startIndex + this.options.itemsPerPage;
    return this.filteredItems.slice(0, endIndex);
  }

  animateItems() {
    const newItems = DOM.queryAll('.gallery-item:not(.animated)', this.gallery);
    
    newItems.forEach((item, index) => {
      DOM.addClass(item, 'gallery-item-enter');
      
      setTimeout(() => {
        DOM.addClass(item, 'animated');
        DOM.removeClass(item, 'gallery-item-enter');
      }, index * 50);
    });
  }

  filterItems(categoryId) {
    this.currentCategory = categoryId;
    this.currentPage = 1;
    
    if (categoryId === 'all') {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter(item => item.category === categoryId);
    }
  }

  renderLoadMore() {
    if (!this.options.loadMore) return;

    const loadMoreContainer = DOM.query('.gallery-load-more') || this.createLoadMoreContainer();
    const hasMoreItems = this.currentPage * this.options.itemsPerPage < this.filteredItems.length;
    
    if (hasMoreItems) {
      loadMoreContainer.innerHTML = `
        <button class="btn btn-primary load-more-btn">
          <span class="load-more-text">טען עוד תמונות</span>
          <span class="load-more-loading" style="display: none;">טוען...</span>
        </button>
      `;
      loadMoreContainer.style.display = 'block';
    } else {
      loadMoreContainer.style.display = 'none';
    }
  }

  createLoadMoreContainer() {
    const container = DOM.create('div', { className: 'gallery-load-more' });
    this.gallery.parentNode.appendChild(container);
    return container;
  }

  bindEvents() {
    // Filter buttons
    Events.on(document, 'click', (e) => {
      if (e.target.closest('.filter-btn')) {
        const btn = e.target.closest('.filter-btn');
        const categoryId = btn.dataset.category;
        this.handleFilterClick(categoryId);
      }
    });

    // Gallery items
    Events.on(this.gallery, 'click', (e) => {
      const galleryItem = e.target.closest('.gallery-item');
      if (!galleryItem) return;

      const action = e.target.closest('[data-action]')?.dataset.action;
      
      switch (action) {
        case 'view':
          this.handleViewClick(galleryItem);
          break;
        case 'share':
          this.handleShareClick(galleryItem);
          break;
        default:
          // Click on item itself
          this.handleViewClick(galleryItem);
          break;
      }
    });

    // Load more button
    Events.on(document, 'click', (e) => {
      if (e.target.closest('.load-more-btn')) {
        this.handleLoadMoreClick();
      }
    });

    // Keyboard navigation
    Events.on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.lightboxInstance) {
        this.closeLightbox();
      }
    });
  }

  handleFilterClick(categoryId) {
    // Update active filter
    DOM.queryAll('.filter-btn').forEach(btn => {
      DOM.removeClass(btn, 'active');
    });
    DOM.addClass(DOM.query(`[data-category="${categoryId}"]`), 'active');

    // Filter and render items
    this.filterItems(categoryId);
    this.renderItems();
    this.renderLoadMore();

    // Analytics
    if (window.gtag) {
      gtag('event', 'filter_gallery', {
        category: 'Gallery',
        label: categoryId
      });
    }
  }

  handleViewClick(galleryItem) {
    if (this.options.lightbox) {
      this.openLightbox(galleryItem);
    }
  }

  handleShareClick(galleryItem) {
    const image = DOM.query('img', galleryItem);
    const imageUrl = image.dataset.large;
    const title = image.dataset.title;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `צפו בתמונה: ${title}`,
        url: window.location.href + '?image=' + galleryItem.dataset.id
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href + '?image=' + galleryItem.dataset.id);
      this.showToast('הקישור הועתק ללוח');
    }
  }

  handleLoadMoreClick() {
    const btn = DOM.query('.load-more-btn');
    const textEl = DOM.query('.load-more-text', btn);
    const loadingEl = DOM.query('.load-more-loading', btn);
    
    // Show loading state
    textEl.style.display = 'none';
    loadingEl.style.display = 'inline';
    btn.disabled = true;
    
    // Simulate loading delay
    setTimeout(() => {
      this.currentPage++;
      this.renderItems();
      this.renderLoadMore();
      
      // Reset button state
      textEl.style.display = 'inline';
      loadingEl.style.display = 'none';
      btn.disabled = false;
    }, 500);
  }

  // Lightbox functionality
  initLightbox() {
    this.createLightboxHTML();
  }

  createLightboxHTML() {
    const lightboxHTML = `
      <div class="lightbox" id="galleryLightbox" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="lightbox-overlay"></div>
        <div class="lightbox-container">
          <button class="lightbox-close" aria-label="סגור גלריה">×</button>
          
          <div class="lightbox-content">
            <img class="lightbox-image" alt="" data-loading="true">
            <div class="lightbox-loading">טוען...</div>
          </div>
          
          <div class="lightbox-info">
            <h3 class="lightbox-title"></h3>
            <p class="lightbox-description"></p>
          </div>
          
          <div class="lightbox-navigation">
            <button class="lightbox-prev" aria-label="תמונה קודמת">‹</button>
            <button class="lightbox-next" aria-label="תמונה הבאה">›</button>
          </div>
          
          <div class="lightbox-counter">
            <span class="lightbox-current">1</span> / <span class="lightbox-total">10</span>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    this.lightboxElement = DOM.get('galleryLightbox');
    this.bindLightboxEvents();
  }

  bindLightboxEvents() {
    // Close lightbox
    Events.on(this.lightboxElement, 'click', (e) => {
      if (e.target.classList.contains('lightbox-overlay') || 
          e.target.classList.contains('lightbox-close')) {
        this.closeLightbox();
      }
    });

    // Navigation
    Events.on(DOM.query('.lightbox-prev', this.lightboxElement), 'click', () => {
      this.showPreviousImage();
    });

    Events.on(DOM.query('.lightbox-next', this.lightboxElement), 'click', () => {
      this.showNextImage();
    });

    // Keyboard navigation
    Events.on(document, 'keydown', (e) => {
      if (!this.lightboxInstance) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.showPreviousImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.showNextImage();
          break;
        case 'Escape':
          e.preventDefault();
          this.closeLightbox();
          break;
      }
    });
  }

  openLightbox(galleryItem) {
    const image = DOM.query('img', galleryItem);
    const itemId = parseInt(galleryItem.dataset.id);
    
    this.currentLightboxIndex = this.filteredItems.findIndex(item => item.id === itemId);
    this.lightboxInstance = true;
    
    // Show lightbox
    this.lightboxElement.setAttribute('aria-hidden', 'false');
    DOM.addClass(document.body, 'lightbox-open');
    DOM.addClass(this.lightboxElement, 'active');
    
    // Load image
    this.loadLightboxImage(this.currentLightboxIndex);
    
    // Focus management
    this.lightboxElement.focus();
  }

  loadLightboxImage(index) {
    const item = this.filteredItems[index];
    if (!item) return;
    
    const lightboxImg = DOM.query('.lightbox-image', this.lightboxElement);
    const lightboxTitle = DOM.query('.lightbox-title', this.lightboxElement);
    const lightboxDescription = DOM.query('.lightbox-description', this.lightboxElement);
    const lightboxCurrent = DOM.query('.lightbox-current', this.lightboxElement);
    const lightboxTotal = DOM.query('.lightbox-total', this.lightboxElement);
    const lightboxLoading = DOM.query('.lightbox-loading', this.lightboxElement);
    
    // Show loading
    lightboxLoading.style.display = 'block';
    lightboxImg.style.opacity = '0';
    
    // Update info
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    lightboxCurrent.textContent = index + 1;
    lightboxTotal.textContent = this.filteredItems.length;
    
    // Load image
    const imageSrc = this.getImageSrc(item);
    const imageLoader = new Image();
    
    imageLoader.onload = () => {
      lightboxImg.src = imageSrc;
      lightboxImg.alt = item.alt;
      lightboxLoading.style.display = 'none';
      lightboxImg.style.opacity = '1';
    };
    
    imageLoader.onerror = () => {
      lightboxLoading.textContent = 'שגיאה בטעינת התמונה';
    };
    
    imageLoader.src = imageSrc;
  }

  showPreviousImage() {
    if (this.currentLightboxIndex > 0) {
      this.currentLightboxIndex--;
      this.loadLightboxImage(this.currentLightboxIndex);
    }
  }

  showNextImage() {
    if (this.currentLightboxIndex < this.filteredItems.length - 1) {
      this.currentLightboxIndex++;
      this.loadLightboxImage(this.currentLightboxIndex);
    }
  }

  closeLightbox() {
    this.lightboxInstance = false;
    this.lightboxElement.setAttribute('aria-hidden', 'true');
    DOM.removeClass(document.body, 'lightbox-open');
    DOM.removeClass(this.lightboxElement, 'active');
  }

  showToast(message) {
    const toast = DOM.create('div', {
      className: 'toast',
      innerHTML: message
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      DOM.addClass(toast, 'show');
    }, 100);
    
    setTimeout(() => {
      DOM.removeClass(toast, 'show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Masonry Layout (if enabled)
  initMasonry() {
    // Simple masonry implementation
    this.resizeMasonry();
    
    Events.on(window, 'resize', Events.debounce(() => {
      this.resizeMasonry();
    }, 250));
  }

  resizeMasonry() {
    const items = DOM.queryAll('.gallery-item', this.gallery);
    const containerWidth = this.gallery.offsetWidth;
    const itemWidth = 300; // Base item width
    const gap = 20;
    const columns = Math.floor(containerWidth / (itemWidth + gap));
    
    if (columns <= 1) return; // Skip masonry on small screens
    
    const columnHeights = new Array(columns).fill(0);
    
    items.forEach(item => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      const x = shortestColumn * (itemWidth + gap);
      const y = columnHeights[shortestColumn];
      
      item.style.position = 'absolute';
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      item.style.width = `${itemWidth}px`;
      
      columnHeights[shortestColumn] += item.offsetHeight + gap;
    });
    
    // Set container height
    this.gallery.style.height = `${Math.max(...columnHeights)}px`;
  }

  // Public API
  destroy() {
    if (this.lightboxElement) {
      this.lightboxElement.remove();
    }
  }
}

// Video Manager Class
export class VideoManager {
  constructor(options = {}) {
    this.options = {
      autoplay: false,
      muted: true,
      controls: true,
      preload: 'metadata',
      playsinline: true,
      ...options
    };

    this.videos = new Map();
    this.observers = new Map();
    
    this.init();
  }

  async init() {
    try {
      await this.loadVideoData();
      this.initLazyVideoLoading();
      this.bindEvents();
    } catch (error) {
      console.error('Failed to initialize video manager:', error);
    }
  }

  async loadVideoData() {
    try {
      const response = await fetch('/data/video-data.json');
      const data = await response.json();
      
      this.videoData = data.videos || [];
      this.categories = data.categories || [];
      this.settings = data.settings || {};
      
      // Merge settings with options
      Object.assign(this.options, this.settings);
    } catch (error) {
      console.error('Failed to load video data:', error);
      throw error;
    }
  }

  initLazyVideoLoading() {
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadVideo(entry.target);
              videoObserver.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '100px 0px',
          threshold: 0.25
        }
      );

      this.observers.set('videos', videoObserver);
      this.observeLazyVideos();
    }
  }

  observeLazyVideos() {
    const lazyVideos = DOM.queryAll('video[data-src]');
    const observer = this.observers.get('videos');
    
    lazyVideos.forEach(video => {
      observer.observe(video);
    });
  }

  loadVideo(videoElement) {
    const videoId = videoElement.dataset.videoId;
    const videoData = this.videoData.find(v => v.id == videoId);
    
    if (!videoData) {
      console.warn('Video data not found for ID:', videoId);
      return;
    }

    // Set video sources
    this.setVideoSources(videoElement, videoData);
    
    // Set attributes
    Object.entries(this.options).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        videoElement[key] = value;
      } else {
        videoElement.setAttribute(key, value);
      }
    });

    // Load video
    videoElement.load();
    
    // Track video
    this.videos.set(videoElement, videoData);
    
    // Analytics
    this.trackVideoLoad(videoData);
  }

  setVideoSources(videoElement, videoData) {
    // Clear existing sources
    const existingSources = DOM.queryAll('source', videoElement);
    existingSources.forEach(source => source.remove());
    
    // Add poster
    if (videoData.poster) {
      videoElement.poster = videoData.poster;
    }

    // Add sources
    const sources = videoData.sources;
    const deviceType = Device.isMobile() ? 'mobile' : 'desktop';
    
    // Determine best quality based on device
    const qualities = Device.isMobile() ? ['720p', '480p'] : ['1080p', '720p', '480p'];
    
    // Add MP4 sources
    if (sources.mp4) {
      qualities.forEach(quality => {
        if (sources.mp4[quality]) {
          const source = DOM.create('source', {
            src: sources.mp4[quality],
            type: 'video/mp4'
          });
          videoElement.appendChild(source);
        }
      });
    }

    // Add WebM sources
    if (sources.webm) {
      qualities.forEach(quality => {
        if (sources.webm[quality]) {
          const source = DOM.create('source', {
            src: sources.webm[quality],
            type: 'video/webm'
          });
          videoElement.appendChild(source);
        }
      });
    }

    // Add subtitles
    if (videoData.subtitles) {
      Object.entries(videoData.subtitles).forEach(([lang, src]) => {
        const track = DOM.create('track', {
          kind: 'subtitles',
          src: src,
          srclang: lang,
          label: lang === 'he' ? 'עברית' : 'English'
        });
        videoElement.appendChild(track);
      });
    }
  }

  bindEvents() {
    // Video events
    Events.on(document, 'loadstart', (e) => {
      if (e.target.tagName === 'VIDEO' && this.videos.has(e.target)) {
        this.handleVideoLoadStart(e.target);
      }
    }, true);

    Events.on(document, 'play', (e) => {
      if (e.target.tagName === 'VIDEO' && this.videos.has(e.target)) {
        this.handleVideoPlay(e.target);
      }
    }, true);

    Events.on(document, 'ended', (e) => {
      if (e.target.tagName === 'VIDEO' && this.videos.has(e.target)) {
        this.handleVideoEnd(e.target);
      }
    }, true);
  }

  handleVideoLoadStart(video) {
    const videoData = this.videos.get(video);
    if (videoData) {
      DOM.addClass(video.parentNode, 'video-loading');
    }
  }

  handleVideoPlay(video) {
    const videoData = this.videos.get(video);
    if (videoData) {
      DOM.removeClass(video.parentNode, 'video-loading');
      this.trackVideoPlay(videoData);
      
      // Pause other videos
      this.pauseOtherVideos(video);
    }
  }

  handleVideoEnd(video) {
    const videoData = this.videos.get(video);
    if (videoData) {
      this.trackVideoComplete(videoData);
    }
  }

  pauseOtherVideos(currentVideo) {
    this.videos.forEach((data, video) => {
      if (video !== currentVideo && !video.paused) {
        video.pause();
      }
    });
  }

  trackVideoLoad(videoData) {
    if (window.gtag) {
      gtag('event', 'video_load', {
        video_title: videoData.title,
        video_id: videoData.id,
        video_category: videoData.category
      });
    }
  }

  trackVideoPlay(videoData) {
    if (window.gtag) {
      gtag('event', 'video_play', {
        video_title: videoData.title,
        video_id: videoData.id,
        video_category: videoData.category
      });
    }
  }

  trackVideoComplete(videoData) {
    if (window.gtag) {
      gtag('event', 'video_complete', {
        video_title: videoData.title,
        video_id: videoData.id,
        video_category: videoData.category
      });
    }
  }

  // Public API
  getVideoById(id) {
    return this.videoData.find(video => video.id == id);
  }

  playVideo(videoElement) {
    if (videoElement && typeof videoElement.play === 'function') {
      videoElement.play().catch(console.warn);
    }
  }

  pauseVideo(videoElement) {
    if (videoElement && typeof videoElement.pause === 'function') {
      videoElement.pause();
    }
  }

  pauseAllVideos() {
    this.videos.forEach((data, video) => {
      this.pauseVideo(video);
    });
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.videos.clear();
  }
}

// Initialize media managers
export function initMediaManagers() {
  // Initialize global media manager
  window.mediaManager = new MediaManager();
  
  // Initialize gallery if element exists
  const galleryElement = DOM.query('.gallery-grid');
  if (galleryElement) {
    window.galleryManager = new GalleryManager(galleryElement);
  }
  
  // Initialize video manager
  window.videoManager = new VideoManager();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMediaManagers);
} else {
  initMediaManagers();
}/**
 * Media Management System for Magdal Resort
 * Handles images, videos, lazy loading, and gallery functionality
 */

import { DOM, Events, Performance, Device } from './utils.js';

// Media Manager Class
export class MediaManager {
  constructor(options = {}) {
    this.options = {
      lazyLoading: true,
      webpSupport: this.detectWebpSupport(),
      retryAttempts: 3,
      loadingPlaceholder: '/assets/images/placeholder.svg',
      errorPlaceholder: '/assets/images/error.svg',
      ...options
    };

    this.loadedImages = new Set();
    this.failedImages = new Set();
    this.observers = new Map();
    
    this.init();
  }

  init() {
    if (this.options.lazyLoading) {
      this.initLazyLoading();
    }
    this.initErrorHandling();
    this.preloadCriticalImages();
  }

  // WebP Support Detection
  detectWebpSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  // Lazy Loading Implementation
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadImage(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );

      this.observers.set('images', imageObserver);
      this.observeLazyImages();
    } else {
      // Fallback for older browsers
      this.loadAllImages();
    }
  }

  observeLazyImages() {
    const lazyImages = DOM.queryAll('img[data-src], img[data-srcset]');
    const observer = this.observers.get('images');
    
    lazyImages.forEach(img => {
      // Add loading placeholder
      if (!img.src && this.options.loadingPlaceholder) {
        img.src = this.options.loadingPlaceholder;
      }
      
      // Add loading class
      DOM.addClass(img, 'lazy-loading');
      
      observer.observe(img);
    });
  }

  // Load Individual Image
  async loadImage(img, attempt = 1) {
    try {
      const src = await this.getOptimalImageSrc(img);
      
      if (!src) {
        throw new Error('No image source available');
      }

      // Preload image
      const imageLoader = new Image();
      
      return new Promise((resolve, reject) => {
        imageLoader.onload = () => {
          // Apply loaded image
          img.src = src;
          
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }

          // Update classes
          DOM.removeClass(img, 'lazy-loading');
          DOM.addClass(img, 'lazy-loaded');
          
          // Mark as loaded
          this.loadedImages.add(img.dataset.src || img.dataset.srcset);
          
          // Fade in animation
          img.style.opacity = '0';
          requestAnimationFrame(() => {
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '1';
          });

          resolve(img);
        };

        imageLoader.onerror = () => {
          if (attempt < this.options.retryAttempts) {
            // Retry loading
            setTimeout(() => {
              this.loadImage(img, attempt + 1).then(resolve).catch(reject);
            }, 1000 * attempt);
          } else {
            // Use error placeholder
            img.src = this.options.errorPlaceholder;
            DOM.removeClass(img, 'lazy-loading');
            DOM.addClass(img, 'lazy-error');
            this.failedImages.add(img.dataset.src || img.dataset.srcset);
            reject(new Error(`Failed to load image after ${this.options.retryAttempts} attempts`));
          }
        };

        imageLoader.src = src;
      });

    } catch (error) {
      console.warn('Error loading image:', error);
      img.src = this.options.errorPlaceholder;
      DOM.addClass(img, 'lazy-error');
    }
  }
