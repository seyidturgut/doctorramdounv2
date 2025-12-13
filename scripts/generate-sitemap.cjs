const fs = require('fs');
const path = require('path');

const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blog-posts.json');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const BASE_URL = 'https://doctorramdoun.com';

function generateSitemap() {
    const posts = JSON.parse(fs.readFileSync(BLOG_POSTS_PATH, 'utf8'));

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Homepage
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';

    // Blog Posts
    posts.forEach(post => {
        xml += '  <url>\n';
        // Using query param strategy: ?blog=slug
        xml += `    <loc>${BASE_URL}/?blog=${post.slug}</loc>\n`;
        xml += `    <lastmod>${post.date.split('T')[0]}</lastmod>\n`;
        xml += '    <changefreq>monthly</changefreq>\n';
        xml += '    <priority>0.8</priority>\n';
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log(`Generated sitemap with ${posts.length + 1} URLs at ${SITEMAP_PATH}`);
}

generateSitemap();
