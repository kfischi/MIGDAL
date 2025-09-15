/**
 * Magdal Resort Website Configuration
 * All site settings, constants, and configuration options
 */

// Site Configuration
export const SITE_CONFIG = {
  name: 'מגדל של חיים',
  tagline: 'ריזורט משפחתי יוקרתי בצפון',
  description: 'ריזורט משפחתי יוקרתי במושב מגדל - מתחם גדול עם בריכה לשבתות חתן, אירועים משפחתיים וחופשות מושלמות בצפון',
  url: 'https://magdalresort.co.il',
  logo: '/assets/images/logos/logo-main.png',
  favicon: '/assets/images/logos/favicon.ico',
  established: 2024,
  capacity: 50
};

// Contact Information
export const CONTACT_INFO = {
  phone: '050-123-4567',
  phoneLink: 'tel:+972501234567',
  whatsapp: '972501234567',
  whatsappLink: 'https://wa.me/972501234567',
  email: 'info@magdalresort.co.il',
  emailLink: 'mailto:info@magdalresort.co.il',
  address: 'מושב מגדל, הגליל העליון',
  hours: '24/7 - תמיד זמינים עבורכם',
  coordinates: {
    lat: 33.1651,
    lng: 35.5928
  }
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/magdalresort',
  instagram: 'https://instagram.com/magdalresort',
  youtube: 'https://youtube.com/magdalresort',
  whatsapp: 'https://wa.me/972501234567'
};

// Statistics Data
export const STATS_DATA = [
  {
    id: 'satisfaction',
    value: 98,
    label: '% שביעות רצון',
    icon: '⭐',
    color: 'gold',
    animationDelay: 100
  },
  {
    id: 'families',
    value: 500,
    label: 'משפחות מאושרות',
    icon: '👨‍👩‍👧‍👦',
    color: 'blue',
    animationDelay: 200
  },
  {
    id: 'capacity',
    value: 50,
    label: 'אנשים במתחם',
    icon: '🏡',
    color: 'green',
    animationDelay: 300
  },
  {
    id: 'service',
    value: 24,
    label: 'שעות שירות',
    icon: '🕐',
    color: 'blue',
    animationDelay: 400
  }
];

// Features Data
export const FEATURES_DATA = [
  {
    id: 'pool',
    icon: '🏊‍♂️',
    title: 'בריכה פרטית גדולה',
    description: 'בריכה מחוממת ומטופחת, מתאימה לכל הגילאים עם אזור רדוד לילדים וחלק עמוק למבוגרים',
    image: '/assets/images/facilities/pool-main.jpg',
    animationDelay: 100
  },
  {
    id: 'house',
    icon: '🏡',
    title: 'מתחם גדול ומרווח',
    description: 'מתחם בשטח של דונם שלם עם חצרות ירוקות, פינות ישיבה ואזורי משחק לילדים',
    image: '/assets/images/facilities/garden-area.jpg',
    animationDelay: 200
  },
  {
    id: 'family',
    icon: '👨‍👩‍👧‍👦',
    title: 'מתאים לקבוצות גדולות',
    description: 'מקום עד 50 אנשים עם חדרי שינה מרווחים, מטבח גדול ואזורי אירוח נפרדים',
    image: '/assets/images/facilities/living-room.jpg',
    animationDelay: 300
  },
  {
    id: 'kitchen',
    icon: '🍽️',
    title: 'מטבח מאובזר במלואו',
    description: 'מטבח גדול ומעוצב עם כל המכשירים הדרושים לבישול לקבוצות גדולות',
    image: '/assets/images/facilities/kitchen-full.jpg',
    animationDelay: 400
  },
  {
    id: 'nature',
    icon: '🌿',
    title: 'סביבה טבעית מדהימה',
    description: 'נופים פנוראמיים של הגליל, אוויר נקי וטבע ירוק שמקיף את המתחם',
    image: '/assets/images/facilities/nature-view.jpg',
    animationDelay: 500
  },
  {
    id: 'pricing',
    icon: '💎',
    title: 'מחיר שווה לכל הכיס',
    description: 'חוויה יוקרתית במחיר הוגן - ככל שהקבוצה גדולה יותר, המחיר לאדם נמוך יותר',
    image: '/assets/images/facilities/pricing.jpg',
    animationDelay: 600
  }
];

// Gallery Categories
export const GALLERY_CATEGORIES = [
  {
    id: 'all',
    name: 'הכל',
    filter: '*'
  },
  {
    id: 'pool',
    name: 'בריכה',
    filter: '.pool'
  },
  {
    id: 'rooms',
    name: 'חדרים',
    filter: '.rooms'
  },
  {
    id: 'kitchen',
    name: 'מטבח',
    filter: '.kitchen'
  },
  {
    id: 'garden',
    name: 'גינה',
    filter: '.garden'
  },
  {
    id: 'view',
    name: 'נוף',
    filter: '.view'
  }
];

// Gallery Images Data
export const GALLERY_IMAGES = [
  {
    id: 1,
    src: '/assets/images/gallery/pool-1.jpg',
    alt: 'בריכה פרטית גדולה',
    category: 'pool',
    title: 'בריכה פרטית',
    description: 'בריכה מחוממת ומטופחת'
  },
  {
    id: 2,
    src: '/assets/images/gallery/pool-2.jpg',
    alt: 'אזור בריכה בערב',
    category: 'pool',
    title: 'בריכה בערב',
    description: 'תאורה רומנטית בערב'
  },
  {
    id: 3,
    src: '/assets/images/gallery/rooms-1.jpg',
    alt: 'חדר שינה ראשי',
    category: 'rooms',
    title: 'חדר שינה ראשי',
    description: 'חדר מרווח ומעוצב'
  },
  {
    id: 4,
    src: '/assets/images/gallery/rooms-2.jpg',
    alt: 'חדר ילדים',
    category: 'rooms',
    title: 'חדר ילדים',
    description: 'מתאים למשפחות עם ילדים'
  },
  {
    id: 5,
    src: '/assets/images/gallery/kitchen.jpg',
    alt: 'מטבח מאובזר',
    category: 'kitchen',
    title: 'מטבח מאובזר',
    description: 'כל הציוד לבישול קבוצתי'
  },
  {
    id: 6,
    src: '/assets/images/gallery/garden.jpg',
    alt: 'גינה ואזור ישיבה',
    category: 'garden',
    title: 'גינה ירוקה',
    description: 'מקום להרגעה ומנוחה'
  },
  {
    id: 7,
    src: '/assets/images/gallery/bbq-area.jpg',
    alt: 'אזור ברביקיו',
    category: 'garden',
    title: 'אזור ברביקיו',
    description: 'פינת גריל מעוצבת'
  },
  {
    id: 8,
    src: '/assets/images/gallery/view.jpg',
    alt: 'נוף הגליל',
    category: 'view',
    title: 'נוף הגליל',
    description: 'פנוראמה מרהיבה'
  }
];

// Navigation Menu
export const NAVIGATION_MENU = [
  {
    id: 'home',
    name: 'בית',
    href: '#home',
    icon: '🏠'
  },
  {
    id: 'about',
    name: 'אודות',
    href: '#about',
    icon: '💫'
  },
  {
    id: 'facilities',
    name: 'מתקנים',
    href: '#facilities',
    icon: '🏊‍♂️'
  },
  {
    id: 'gallery',
    name: 'גלריה',
    href: '#gallery',
    icon: '📸'
  },
  {
    id: 'contact',
    name: 'יצירת קשר',
    href: '#contact',
    icon: '📞'
  }
];

// Form Configuration
export const FORM_CONFIG = {
  booking: {
    action: 'whatsapp', // 'whatsapp' | 'email' | 'api'
    whatsappMessage: (data) => `היי! אני מעוניין להזמין את הריזורט:

שם: ${data.name}
טלפון: ${data.phone}
תאריך הגעה: ${data.checkin}
מספר אורחים: ${data.guests}
הודעה: ${data.message || 'אין'}

אשמח לפרטים נוספים ובדיקת זמינות. תודה!`,
    
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'שם מלא',
        required: true,
        placeholder: 'הכנס שם מלא',
        validation: {
          minLength: 2,
          pattern: /^[א-ת\s]+$/,
          message: 'נא להכניס שם תקין בעברית'
        }
      },
      {
        id: 'phone',
        type: 'tel',
        label: 'טלפון',
        required: true,
        placeholder: '050-123-4567',
        validation: {
          pattern: /^0\d{1,2}-?\d{7}$/,
          message: 'נא להכניס מספר טלפון תקין'
        }
      },
      {
        id: 'checkin',
        type: 'date',
        label: 'תאריך הגעה',
        required: true,
        validation: {
          min: new Date().toISOString().split('T')[0],
          message: 'תאריך חייב להיות בעתיד'
        }
      },
      {
        id: 'guests',
        type: 'number',
        label: 'מספר אורחים',
        required: true,
        min: 1,
        max: 50,
        placeholder: 'עד 50 אורחים',
        validation: {
          min: 1,
          max: 50,
          message: 'מספר אורחים חייב להיות בין 1 ל-50'
        }
      },
      {
        id: 'message',
        type: 'textarea',
        label: 'הודעה נוספת',
        required: false,
        placeholder: 'ספרו לנו על האירוע שלכם...',
        rows: 3
      }
    ]
  }
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  aos: {
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
  },
  counters: {
    duration: 2000,
    easing: 'ease-out',
    increment: (target) => target / 100
  },
  scroll: {
    behavior: 'smooth',
    block: 'start'
  },
  typing: {
    speed: 50,
    deleteSpeed: 30,
    delay: 2000
  }
};

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  lazyLoading: {
    enabled: true,
    rootMargin: '50px',
    threshold: 0.1
  },
  imageOptimization: {
    formats: ['webp', 'jpg'],
    quality: 80,
    placeholder: 'blur'
  },
  caching: {
    enabled: true,
    version: '1.0.0',
    assets: [
      '/assets/css/styles.css',
      '/assets/js/main.js',
      '/assets/images/logos/logo-main.png'
    ]
  }
};

// SEO Configuration
export const SEO_CONFIG = {
  defaultTitle: 'מגדל של חיים - ריזורט משפחתי יוקרתי בצפון',
  titleTemplate: '%s | מגדל של חיים',
  defaultDescription: 'ריזורט משפחתי יוקרתי במושב מגדל - מתחם גדול עם בריכה לשבתות חתן ואירועים משפחתיים',
  keywords: [
    'ריזורט בצפון',
    'שבתות חתן',
    'אירוח משפחתי',
    'בריכה פרטית',
    'מושב מגדל',
    'חופשות משפחתיות',
    'אירועים'
  ],
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://magdalresort.co.il',
    siteName: 'מגדל של חיים',
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'מגדל של חיים - ריזורט משפחתי בצפון'
      }
    ]
  },
  twitter: {
    cardType: 'summary_large_image',
    site: '@magdalresort',
    creator: '@magdalresort'
  }
};

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  googleAnalytics: {
    trackingId: 'G-XXXXXXXXXX',
    enabled: true,
    anonymizeIp: true
  },
  facebookPixel: {
    pixelId: 'XXXXXXXXXX',
    enabled: true
  },
  hotjar: {
    hjid: 'XXXXXXXXXX',
    enabled: false
  },
  events: {
    pageView: 'page_view',
    contact: 'contact_submit',
    booking: 'booking_request',
    gallery: 'gallery_view',
    phone: 'phone_click',
    whatsapp: 'whatsapp_click'
  }
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

// Theme Configuration
export const THEME_CONFIG = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    gold: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    }
  },
  fonts: {
    primary: 'Assistant, sans-serif',
    secondary: 'Heebo, sans-serif',
    mono: 'SF Mono, Monaco, monospace'
  },
  spacing: {
    section: '80px',
    container: '20px'
  }
};

// API Endpoints (for future use)
export const API_CONFIG = {
  baseUrl: 'https://api.magdalresort.co.il',
  endpoints: {
    booking: '/api/booking',
    availability: '/api/availability',
    contact: '/api/contact',
    newsletter: '/api/newsletter',
    testimonials: '/api/testimonials'
  },
  timeout: 10000,
  retries: 3
};

// Error Messages
export const ERROR_MESSAGES = {
  network: 'שגיאת רשת. אנא נסה שוב.',
  validation: 'אנא מלא את כל השדות הנדרשים.',
  booking: 'שגיאה בשליחת הבקשה. אנא נסה שוב או צור קשר טלפונית.',
  general: 'אירעה שגיאה. אנא נסה שוב או צור איתנו קשר.',
  phone: 'מספר טלפון לא תקין.',
  email: 'כתובת אימייל לא תקינה.',
  date: 'תאריך לא תקין.',
  required: 'שדה נדרש.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  booking: 'הבקשה נשלחה בהצלחה! אנו ניצור איתכם קשר בקרוב.',
  contact: 'ההודעה נשלחה בהצלחה! תודה על פנייתכם.',
  newsletter: 'נרשמתם בהצלחה לניוזלטר!',
  general: 'הפעולה בוצעה בהצלחה!'
};

// Feature Flags
export const FEATURE_FLAGS = {
  enableBookingForm: true,
  enableNewsletter: false,
  enableChatBot: false,
  enablePWA: false,
  enableDarkMode: false,
  enableMultiLanguage: false,
  enablePaymentGateway: false,
  enableReviews: true,
  enableBlog: false,
  enableVirtualTour: false
};

// Pricing Configuration (for future pricing page)
export const PRICING_CONFIG = {
  currency: '₪',
  seasons: {
    high: {
      name: 'עונת שיא',
      months: [7, 8, 9], // July, August, September
      multiplier: 1.5
    },
    regular: {
      name: 'עונה רגילה',
      months: [4, 5, 6, 10, 11],
      multiplier: 1.0
    },
    low: {
      name: 'עונה שקטה',
      months: [12, 1, 2, 3],
      multiplier: 0.8
    }
  },
  packages: [
    {
      id: 'weekend',
      name: 'סוף שבוע',
      description: 'חבילה לסוף שבוע מושלם',
      basePrice: 1200,
      duration: '2 לילות',
      features: ['בריכה פרטית', 'מטבח מאובזר', 'גינה', 'חניה']
    },
    {
      id: 'week',
      name: 'שבוע מלא',
      description: 'שבוע של חופשה מושלמת',
      basePrice: 4000,
      duration: '7 לילות',
      features: ['הכל כלול', 'הנחה 15%', 'ניקיון יומי', 'תמיכה 24/7']
    }
  ]
};

// Loading States
export const LOADING_STATES = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'magdal_theme',
  language: 'magdal_language',
  userPreferences: 'magdal_preferences',
  bookingDraft: 'magdal_booking_draft',
  visitCount: 'magdal_visit_count',
  lastVisit: 'magdal_last_visit'
};

// Regular Expressions for Validation
export const REGEX_PATTERNS = {
  phone: /^0\d{1,2}-?\d{7}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  hebrewName: /^[א-ת\s]+$/,
  englishName: /^[a-zA-Z\s]+$/,
  numbers: /^\d+$/,
  url: /^https?:\/\/.+/
};

// Default Configuration Object
export const DEFAULT_CONFIG = {
  site: SITE_CONFIG,
  contact: CONTACT_INFO,
  social: SOCIAL_LINKS,
  navigation: NAVIGATION_MENU,
  stats: STATS_DATA,
  features: FEATURES_DATA,
  gallery: {
    categories: GALLERY_CATEGORIES,
    images: GALLERY_IMAGES
  },
  forms: FORM_CONFIG,
  animations: ANIMATION_CONFIG,
  performance: PERFORMANCE_CONFIG,
  seo: SEO_CONFIG,
  analytics: ANALYTICS_CONFIG,
  theme: THEME_CONFIG,
  api: API_CONFIG,
  messages: {
    errors: ERROR_MESSAGES,
    success: SUCCESS_MESSAGES
  },
  features: FEATURE_FLAGS,
  pricing: PRICING_CONFIG
};

// Export default configuration
export default DEFAULT_CONFIG;
