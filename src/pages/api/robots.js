/**
 * Dynamic robots.txt generation for SEO optimization
 * Controls search engine crawling behavior
 */

export default function handler(req, res) {
  // Set appropriate headers
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400'); // Cache for 24 hours

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indian-forests.vercel.app';
  
  // Generate robots.txt content
  const robotsTxt = `# Robots.txt for Indian Forests Encyclopedia
# Generated automatically for optimal SEO

User-agent: *
Allow: /

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

# Disallow admin and API routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Disallow development and debug files
Disallow: /*.json$
Disallow: /*.log$
Disallow: /debug/

# Allow important directories
Allow: /img/
Allow: /image/
Allow: /video/
Allow: /sounds/

# Crawl delay (be respectful)
Crawl-delay: 1

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml

# Additional information
# Website: Indian Forests Encyclopedia
# Purpose: Educational content about Indian forests and ecosystems
# Contact: info@indian-forests.org
`;

  res.status(200).end(robotsTxt);
}