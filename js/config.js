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
