import "@/styles/globals.css";
import '../styles/globals2.css'
import "@/styles/igstyle.css"
import "@/styles/globals.scss"
import { Layout } from '@/components/layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { initWebVitals, initResourceMonitoring } from '@/lib/webVitals'
import { registerServiceWorker, setupOfflineListener } from '@/lib/serviceWorker'
import { initAnalytics, trackPageView } from '@/lib/analytics'
import { startMonitoring } from '@/lib/monitoring'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  // Initialize performance monitoring, analytics, and service worker
  useEffect(() => {
    // Initialize Web Vitals monitoring
    initWebVitals()
    initResourceMonitoring()

    // Initialize analytics and monitoring for production
    if (process.env.NODE_ENV === 'production') {
      initAnalytics()
      const monitoringCleanup = startMonitoring()
      
      // Register service worker for offline functionality
      registerServiceWorker()

      // Setup offline/online listeners
      const offlineCleanup = setupOfflineListener(
        () => {
          // Handle online event
          console.log('App is back online')
        },
        () => {
          // Handle offline event
          console.log('App is offline')
        }
      )

      // Cleanup on unmount
      return () => {
        if (monitoringCleanup) monitoringCleanup()
        if (offlineCleanup) offlineCleanup()
      }
    } else {
      // Development mode - minimal setup
      const offlineCleanup = setupOfflineListener(
        () => console.log('App is back online'),
        () => console.log('App is offline')
      )
      return offlineCleanup
    }
  }, [])

  // Track page changes for analytics
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (process.env.NODE_ENV === 'production') {
        trackPageView(url, document.title)
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // Pages that should use the Layout wrapper
  const layoutPages = [
    '/',
    '/destinations',
    '/itineraries', 
    '/photography',
    '/quiz',
    '/insights',
    '/donate',
    '/organizations',
    '/cportals',
    '/about_us'
  ];

  const shouldUseLayout = layoutPages.includes(router.pathname);

  if (shouldUseLayout) {
    return (
      <Layout pageKey={router.asPath}>
        <Component {...pageProps} />
      </Layout>
    )
  }

  return <Component {...pageProps} />
}


// import "@/styles/globals.css";
// import '../styles/globals2.css'
// import "@/styles/igstyle.css"
// import "@/styles/globals.scss"
// import {Layout} from '@/components'
// import { useRouter } from 'next/router'

// export default function App({ Component, pageProps }) {
//   const router = useRouter()

//   if (router.pathname === '/blog') {
//     return (
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     )
//   }

//   return <Component {...pageProps} />
// }