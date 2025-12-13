const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const blogPostsRaw = require('../src/data/blog-posts.json');

const PUBLIC_DIR = path.join(__dirname, '../public');
const BLOG_IMAGES_DIR = path.join(PUBLIC_DIR, 'blog-images');
const DATA_FILE = path.join(__dirname, '../src/data/blog-posts.json');

async function optimizeImages() {
    console.log('Starting image optimization...');

    // 1. Optimize specific static assets
    const staticImages = ['dr-ramdoun-final.webp', 'favicon.png']; // Add more if needed
    // Note: dr-ramdoun-final is already webp, maybe checks needed.

    // 2. Process Blog Images
    if (fs.existsSync(BLOG_IMAGES_DIR)) {
        const files = fs.readdirSync(BLOG_IMAGES_DIR);
        for (const file of files) {
            if (file.match(/\.(png|jpg|jpeg)$/i)) {
                const inputPath = path.join(BLOG_IMAGES_DIR, file);
                const filename = path.parse(file).name;
                const outputPath = path.join(BLOG_IMAGES_DIR, `${filename}.webp`);

                if (!fs.existsSync(outputPath)) {
                    console.log(`Converting: ${file} -> ${filename}.webp`);
                    try {
                        await sharp(inputPath)
                            .resize({ width: 1200, withoutEnlargement: true }) // Max width 1200
                            .webp({ quality: 80 })
                            .toFile(outputPath);
                    } catch (err) {
                        console.error(`Error converting ${file}:`, err);
                    }
                }
            }
        }
    }

    // 3. Update blog-posts.json references
    let updated = false;
    const newPosts = blogPostsRaw.map(post => {
        if (post.localImage && (post.localImage.endsWith('.png') || post.localImage.endsWith('.jpg'))) {
            const currentPath = post.localImage; // e.g., /blog-images/xyz.png
            const newPath = currentPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

            // Verify file exists
            const absoluteNewPath = path.join(PUBLIC_DIR, newPath);
            if (fs.existsSync(absoluteNewPath)) {
                post.localImage = newPath;
                updated = true;
                console.log(`Updated post reference: ${post.title} -> ${newPath}`);
            }
        }
        return post;
    });

    if (updated) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(newPosts, null, 2));
        console.log('Updated blog-posts.json with WebP paths.');
    }

    console.log('Optimization complete.');
}

optimizeImages().catch(console.error);
