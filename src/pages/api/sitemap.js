/**
 * Dynamic sitemap generation for SEO optimization
 * Generates XML sitemap for all pages and content
 */

export default function handler(req, res) {
  // Set appropriate headers
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400'); // Cache for 24 hours

  // Define all static pages
  const staticPages = [
    {
      url: '/',
      changefreq: 'weekly',
      priority: '1.0',
      lastmod: new Date().toISOString()
    },
    {
      url: '/destinations',
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: new Date().toISOString()
    },
    {
      url: '/itineraries',
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: new Date().toISOString()
    },
    {
      url: '/photography',
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: new Date().toISOString()
    },
    {
      url: '/quiz',
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: new Date().toISOString()
    },
    {
      url: '/insights',
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: new Date().toISOString()
    },
    {
      url: '/donate',
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: new Date().toISOString()
    },
    {
      url: '/organizations',
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: new Date().toISOString()
    },
    {
      url: '/cportals',
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: new Date().toISOString()
    },
    {
      url: '/about_us',
      changefreq: 'monthly',
      priority: '0.5',
      lastmod: new Date().toISOString()
    }
  ];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${staticPages.map(page => `  <url>
    <loc>${process.env.NEXT_PUBLIC_SITE_URL || 'https://indian-forests.vercel.app'}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.status(200).end(sitemap);
}