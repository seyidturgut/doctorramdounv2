const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const XML_PATH = path.join(__dirname, '../doctorramdoun.xml');
const OUTPUT_JSON = path.join(__dirname, '../src/data/blog-posts.json');
const IMAGE_DIR = path.join(__dirname, '../public/blog-images');

// Ensure image directory exists
if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

function parseXML() {
    console.log('Reading XML file...');
    const xmlContent = fs.readFileSync(XML_PATH, 'utf8');

    // Simple regex-based parsing (since we can't depend on xml2js)
    // This splits by <item> tags
    const items = xmlContent.split('<item>');

    const posts = [];
    const attachments = new Map(); // ID -> URL

    console.log(`Found ${items.length - 1} items. Processing...`);

    // First pass: Collect all attachments
    items.forEach((item, index) => {
        if (index === 0) return; // Skip header

        const postTypeMatch = item.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
        const postType = postTypeMatch ? postTypeMatch[1] : null;

        const postIdMatch = item.match(/<wp:post_id>(\d+)<\/wp:post_id>/);
        const postId = postIdMatch ? postIdMatch[1] : null;

        if (postType === 'attachment' && postId) {
            const urlMatch = item.match(/<wp:attachment_url><!\[CDATA\[(.*?)\]\]><\/wp:attachment_url>/);
            if (urlMatch) {
                attachments.set(postId, urlMatch[1]);
            }
        }
    });

    console.log(`Found ${attachments.size} attachments.`);

    // Second pass: Collect posts
    items.forEach((item, index) => {
        if (index === 0) return;

        const postTypeMatch = item.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
        const postType = postTypeMatch ? postTypeMatch[1] : null;

        if (postType === 'post') {
            const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
            const contentMatch = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
            const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
            const langMatch = item.match(/<category domain="language" nicename="(.*?)">/);
            const thumbnailMatch = item.match(/<wp:meta_key><!\[CDATA\[_thumbnail_id\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(\d+)\]\]><\/wp:meta_value>/);
            const slugMatch = item.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/);

            if (titleMatch && contentMatch) {
                const decodeEntities = (str) => {
                    return str
                        .replace(/&amp;/g, '&')
                        .replace(/&#038;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#8217;/g, "'")
                        .replace(/&#8211;/g, "–")
                        .replace(/&#8212;/g, "—")
                        .replace(/&#8220;/g, "“")
                        .replace(/&#8221;/g, "”")
                        .replace(/&#8230;/g, "…")
                        .replace(/&#039;/g, "'");
                };

                const title = decodeEntities(titleMatch[1]);
                let content = contentMatch[1];
                const date = dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString();
                const language = langMatch ? (langMatch[1] === 'ar' ? 'ar' : 'en') : 'en'; // Default to en if not ar
                const thumbnailId = thumbnailMatch ? thumbnailMatch[1] : null;
                const slug = slugMatch ? slugMatch[1] : crypto.randomBytes(8).toString('hex');

                let imageUrl = null;
                if (thumbnailId && attachments.has(thumbnailId)) {
                    imageUrl = attachments.get(thumbnailId);
                }

                // Initial cleanup of content
                // Remove WP comments
                content = content.replace(/<!-- \/?wp:.*? -->/g, '');

                posts.push({
                    id: crypto.randomUUID(),
                    title,
                    content,
                    date,
                    language,
                    slug,
                    originalImageUrl: imageUrl,
                    localImage: null
                });
            }
        }
    });

    return posts;
}

async function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const dest = path.join(IMAGE_DIR, filename);
        const file = fs.createWriteStream(dest);

        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(() => resolve(filename));
                });
            } else {
                fs.unlink(dest, () => { }); // Delete failed file
                resolve(null); // Resolve null on error to not crash script
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            resolve(null);
        });
    });
}

async function main() {
    const posts = parseXML();
    console.log(`Extracted ${posts.length} posts.`);

    // Download images
    for (const post of posts) {
        if (post.originalImageUrl) {
            console.log(`Downloading image for "${post.title}"...`);
            const ext = path.extname(post.originalImageUrl) || '.jpg';
            const filename = `${post.slug}${ext}`;
            const downloaded = await downloadImage(post.originalImageUrl, filename);

            if (downloaded) {
                post.localImage = `/blog-images/${downloaded}`;
            }
        }
    }

    // Sort by date desc
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(posts, null, 2));
    console.log(`Successfully saved ${posts.length} blog posts to ${OUTPUT_JSON}`);
}

main();
