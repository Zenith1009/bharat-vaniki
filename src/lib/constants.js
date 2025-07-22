// Application constants for Indian Forests Encyclopedia

export const APP_CONFIG = {
  name: 'Indian Forests Encyclopedia',
  description: 'Explore the rich biodiversity and conservation efforts of Indian forests',
  version: '2.0.0',
  author: 'Angela, Naishadh, Rudray, Smit',
  competition: 'Web Wonders \'24 Finalists',
}

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about_us',
  QUIZ: '/quiz',
  INSIGHTS: '/insights',
  DONATE: '/donate',
  CONSERVATION: '/insights',
  DESTINATIONS: '/destinations',
  PHOTOGRAPHY: '/photography',
  CREDITS: '/Credits',
}

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: ROUTES.HOME },
  { name: 'About', href: ROUTES.ABOUT },
  { name: 'Quiz', href: ROUTES.QUIZ },
  { name: 'Insights', href: ROUTES.INSIGHTS },
  { name: 'Conservation', href: ROUTES.CONSERVATION },
  { name: 'Destinations', href: ROUTES.DESTINATIONS },
  { name: 'Photography', href: ROUTES.PHOTOGRAPHY },
  { name: 'Donate', href: ROUTES.DONATE },
]

export const FOREST_THEMES = {
  PRIMARY_GREEN: '#16a34a',
  SECONDARY_GREEN: '#15803d',
  ACCENT_ORANGE: '#ea580c',
  BACKGROUND: '#f8fafc',
  TEXT_PRIMARY: '#1e293b',
  TEXT_SECONDARY: '#64748b',
}

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
}

export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  PARALLAX: 3000,
}

export const QUIZ_CONFIG = {
  QUESTIONS_PER_QUIZ: 10,
  TIME_PER_QUESTION: 30, // seconds
  PASSING_SCORE: 70, // percentage
  CATEGORIES: [
    'biodiversity',
    'conservation',
    'ecology',
    'general'
  ],
  DIFFICULTY_LEVELS: [
    'easy',
    'medium',
    'hard'
  ]
}

export const SOCIAL_LINKS = {
  FACEBOOK: '#',
  TWITTER: '#',
  INSTAGRAM: '#',
  YOUTUBE: '#',
  LINKEDIN: '#',
}

export const META_DEFAULTS = {
  TITLE: 'Indian Forests Encyclopedia',
  DESCRIPTION: 'Discover the incredible biodiversity, conservation efforts, and ecological importance of Indian forests through our comprehensive encyclopedia.',
  KEYWORDS: 'Indian forests, biodiversity, conservation, ecology, wildlife, environment, nature',
  OG_IMAGE: '/images/og-forest-cover.jpg',
}

export const API_ENDPOINTS = {
  // Quiz endpoints
  QUIZ_QUESTIONS: '/api/quiz/questions',
  QUIZ_CATEGORIES: '/api/quiz/categories',
  QUIZ_STATS: '/api/quiz/stats',
  
  // Insights endpoints
  INSIGHTS_STATS: '/api/insights/stats',
  
  // Donations endpoints
  DONATIONS_CAUSES: '/api/donations/causes',
  DONATIONS_ORGANIZATIONS: '/api/donations/organizations',
  
  // Contact and Newsletter endpoints
  CONTACT: '/api/contact',
  NEWSLETTER_SUBSCRIBE: '/api/newsletter/subscribe',
}

export const IMAGE_SIZES = {
  THUMBNAIL: { width: 150, height: 150 },
  CARD: { width: 300, height: 200 },
  HERO: { width: 1200, height: 600 },
  FULL: { width: 1920, height: 1080 },
}