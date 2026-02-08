import type { APIRoute } from 'astro';
import countriesData from '../data/countries.json';

const SITE_URL = 'https://internationalautomobileauthority.com';

// Static pages with priority and change frequency
const staticPages = [
  { url: '', priority: 1.0, changefreq: 'daily' },
  { url: '/countries', priority: 0.9, changefreq: 'weekly' },
  { url: '/what-is-idp', priority: 0.8, changefreq: 'monthly' },
  { url: '/pricing', priority: 0.9, changefreq: 'weekly' },
  { url: '/about', priority: 0.6, changefreq: 'monthly' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly' },
  { url: '/verify', priority: 0.8, changefreq: 'monthly' },
  { url: '/privacy', priority: 0.5, changefreq: 'yearly' },
  { url: '/terms', priority: 0.5, changefreq: 'yearly' },
];

// Generate country pages
const countryPages = [];
Object.values(countriesData.regions).forEach(region => {
  region.countries.forEach(country => {
    countryPages.push({
      url: `/countries/${country.slug}`,
      priority: 0.7,
      changefreq: 'monthly'
    });
  });
});

export const GET: APIRoute = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${countryPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};