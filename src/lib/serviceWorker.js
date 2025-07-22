/**
 * Service Worker registration and management
 * Handles offline functionality and caching
 */

const isProduction = process.env.NODE_ENV === 'production';
const swPath = '/sw.js';

/**
 * Register service worker
 */
export async function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('[SW] Service workers not supported');
    return false;
  }

  try {
    console.log('[SW] Registering service worker...');
    
    const registration = await navigator.serviceWorker.register(swPath, {
      scope: '/',
      updateViaCache: 'none'
    });

    console.log('[SW] Service worker registered successfully:', registration);

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[SW] New service worker available');
            
            // Notify user about update
            if (isProduction) {
              showUpdateNotification();
            }
          }
        });
      }
    });

    // Check for updates periodically
    setInterval(() => {
      registration.update();
    }, 60000); // Check every minute

    return registration;
  } catch (error) {
    console.error('[SW] Service worker registration failed:', error);
    return false;
  }
}

/**
 * Unregister service worker
 */
export async function unregisterServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    
    if (registration) {
      const unregistered = await registration.unregister();
      console.log('[SW] Service worker unregistered:', unregistered);
      return unregistered;
    }
    
    return false;
  } catch (error) {
    console.error('[SW] Service worker unregistration failed:', error);
    return false;
  }
}

/**
 * Check if app is running offline
 */
export function isOffline() {
  return typeof window !== 'undefined' && !navigator.onLine;
}

/**
 * Listen for online/offline events
 */
export function setupOfflineListener(onOnline, onOffline) {
  if (typeof window === 'undefined') return;

  const handleOnline = () => {
    console.log('[SW] App is online');
    if (onOnline) onOnline();
  };

  const handleOffline = () => {
    console.log('[SW] App is offline');
    if (onOffline) onOffline();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

/**
 * Show update notification to user
 */
function showUpdateNotification() {
  // Create a simple notification
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 300px;
    ">
      <div style="font-weight: 600; margin-bottom: 8px;">
        🌲 Update Available
      </div>
      <div style="font-size: 14px; margin-bottom: 12px;">
        A new version of the app is available. Refresh to update.
      </div>
      <div style="display: flex; gap: 8px;">
        <button onclick="window.location.reload()" style="
          background: white;
          color: #10b981;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        ">
          Refresh
        </button>
        <button onclick="this.closest('div').remove()" style="
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        ">
          Later
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(notification);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 10000);
}

/**
 * Clear all caches
 */
export async function clearAllCaches() {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }

  try {
    const cacheNames = await caches.keys();
    
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    
    console.log('[SW] All caches cleared');
    return true;
  } catch (error) {
    console.error('[SW] Failed to clear caches:', error);
    return false;
  }
}

/**
 * Get cache storage usage
 */
export async function getCacheStorageUsage() {
  if (typeof window === 'undefined' || !('navigator' in window) || !('storage' in navigator)) {
    return null;
  }

  try {
    const estimate = await navigator.storage.estimate();
    
    return {
      quota: estimate.quota,
      usage: estimate.usage,
      usagePercentage: estimate.quota ? (estimate.usage / estimate.quota) * 100 : 0,
      available: estimate.quota ? estimate.quota - estimate.usage : 0
    };
  } catch (error) {
    console.error('[SW] Failed to get storage usage:', error);
    return null;
  }
}

/**
 * Preload critical resources
 */
export async function preloadCriticalResources() {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }

  const criticalResources = [
    '/',
    '/destinations',
    '/photography',
    '/insights',
    '/image/logo.png'
  ];

  try {
    const cache = await caches.open('critical-v1');
    
    await Promise.all(
      criticalResources.map(async (resource) => {
        try {
          const response = await fetch(resource);
          if (response.ok) {
            await cache.put(resource, response);
          }
        } catch (error) {
          console.warn(`[SW] Failed to preload ${resource}:`, error);
        }
      })
    );

    console.log('[SW] Critical resources preloaded');
    return true;
  } catch (error) {
    console.error('[SW] Failed to preload critical resources:', error);
    return false;
  }
}

/**
 * Background sync for form submissions
 */
export async function scheduleBackgroundSync(tag = 'background-sync') {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    if ('sync' in registration) {
      await registration.sync.register(tag);
      console.log('[SW] Background sync scheduled');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('[SW] Failed to schedule background sync:', error);
    return false;
  }
}

// Auto-register service worker in production
if (isProduction && typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    registerServiceWorker();
  });
}