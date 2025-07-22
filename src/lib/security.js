/**
 * Security utilities for handling external links and donations
 */

/**
 * Validates if a URL is from a trusted donation organization
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is from a trusted source
 */
export const isTrustedDonationUrl = (url) => {
  const trustedDomains = [
    'wwfindia.org',
    'wti.org.in',
    'fauna-flora.org',
    'greenpeace.org',
    'cauvery.org',
    'isha.sadhguru.org',
    'ishafoundation.org'
  ];

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    // Remove 'www.' prefix if present
    const cleanHostname = hostname.startsWith('www.') ? hostname.slice(4) : hostname;
    
    return trustedDomains.some(domain => 
      cleanHostname === domain || cleanHostname.endsWith('.' + domain)
    );
  } catch (error) {
    console.error('Invalid URL provided:', url);
    return false;
  }
};

/**
 * Safely opens an external donation link with security measures
 * @param {string} url - The donation URL to open
 * @param {string} organizationName - Name of the organization for logging
 */
export const openDonationLink = (url, organizationName = 'Unknown') => {
  if (!url) {
    console.error('No donation URL provided');
    return;
  }

  if (!isTrustedDonationUrl(url)) {
    console.warn(`Untrusted donation URL blocked: ${url}`);
    alert('This donation link could not be verified. Please visit the organization\'s official website directly.');
    return;
  }

  try {
    // Log the donation link click for analytics (without personal data)
    console.log(`Donation link clicked: ${organizationName}`);
    
    // Open link with security measures
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    
    if (!newWindow) {
      // Fallback if popup was blocked
      console.warn('Popup blocked, redirecting in current tab');
      window.location.href = url;
    }
  } catch (error) {
    console.error('Error opening donation link:', error);
    alert('Unable to open donation link. Please try again or visit the organization\'s website directly.');
  }
};

/**
 * Validates and sanitizes organization data
 * @param {Object} organization - Organization data to validate
 * @returns {boolean} - Whether the organization data is valid
 */
export const validateOrganizationData = (organization) => {
  const requiredFields = ['id', 'name', 'donationUrl', 'websiteUrl', 'verified'];
  
  for (const field of requiredFields) {
    if (!organization[field]) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  if (!organization.verified) {
    console.warn(`Organization not verified: ${organization.name}`);
    return false;
  }

  if (!isTrustedDonationUrl(organization.donationUrl)) {
    console.error(`Untrusted donation URL for ${organization.name}: ${organization.donationUrl}`);
    return false;
  }

  return true;
};

/**
 * Sanitizes user input to prevent XSS attacks
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Validates email addresses for newsletter signup
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Rate limiting for API calls (simple client-side implementation)
 */
class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  isAllowed() {
    const now = Date.now();
    // Remove old requests outside the window
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
}

export const apiRateLimiter = new RateLimiter(20, 60000); // 20 requests per minute

/**
 * Content Security Policy helpers
 */
export const CSP_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.* https://*.org https://*.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ')
};

export default {
  isTrustedDonationUrl,
  openDonationLink,
  validateOrganizationData,
  sanitizeInput,
  isValidEmail,
  apiRateLimiter,
  CSP_HEADERS
};