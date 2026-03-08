const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const XML_PATH = path.join(ROOT, 'doctorramdoun.xml');
const CONTENT_DIR = path.join(ROOT, 'content', 'medical-insights');
const IMAGE_DIR = path.join(ROOT, 'public', 'blog-images');

const TRANSLATION_KEYS = {
  'understanding-deep-brain-stimulation-a-comprehensive-guide': 'deep-brain-stimulation',
  'deep-brain-stimulation': 'deep-brain-stimulation',
  'the-da-vinci-robot-revolutionizing-modern-surgery': 'da-vinci-robot',
  'the-da-vinci-robot': 'da-vinci-robot',
  'knee-hip-joint-replacement-surgeries-in-turkey-a-comprehensive-guide': 'joint-replacement',
  'knee-hip-joint-replacement-surgeries-in-turkey': 'joint-replacement',
  'achieving-a-hollywood-smile-guaranteed-results-and-high-expertise-in-dental-health': 'hollywood-smile',
  'hollywood-smile': 'hollywood-smile',
  'choosing-the-best-prosthetics-exceptional-quality-competitive-prices': 'prosthetics',
  'choosing-the-best-prosthetics': 'prosthetics',
};

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&#038;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '-')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function toPlainText(html) {
  return decodeEntities(html)
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanHtml(rawHtml) {
  return decodeEntities(rawHtml)
    .replace(/<!-- \/?wp:.*?-->/g, '')
    .replace(/\[(\/?vc_[^\]]+)\]/g, '')
    .replace(/<div[^>]*>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<h2[^>]*>/gi, '\n## ')
    .replace(/<\/h2>/gi, '\n\n')
    .replace(/<h3[^>]*>/gi, '\n### ')
    .replace(/<\/h3>/gi, '\n\n')
    .replace(/<h4[^>]*>/gi, '\n#### ')
    .replace(/<\/h4>/gi, '\n\n')
    .replace(/<strong[^>]*>/gi, '**')
    .replace(/<\/strong>/gi, '**')
    .replace(/<b[^>]*>/gi, '**')
    .replace(/<\/b>/gi, '**')
    .replace(/<em[^>]*>/gi, '*')
    .replace(/<\/em>/gi, '*')
    .replace(/<i[^>]*>/gi, '*')
    .replace(/<\/i>/gi, '*')
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)')
    .replace(/<img[^>]*src="([^"]+)"[^>]*>/gi, '![]($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

function resolveCoverImage(slug) {
  const extensions = ['.webp', '.png', '.jpg', '.jpeg'];
  for (const ext of extensions) {
    const absolutePath = path.join(IMAGE_DIR, `${slug}${ext}`);
    if (fs.existsSync(absolutePath)) {
      return `/blog-images/${slug}${ext}`;
    }
  }
  return '/dr-ramdoun-final.webp';
}

function parsePosts() {
  const xml = fs.readFileSync(XML_PATH, 'utf8');
  const items = xml.split('<item>').slice(1);
  const posts = [];

  for (const item of items) {
    const postType = (item.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/) || [])[1];
    if (postType !== 'post') continue;

    const title = (item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || [])[1];
    const content = (item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) || [])[1];
    const slug = (item.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/) || [])[1];
    const pubDate = (item.match(/<pubDate>(.*?)<\/pubDate>/) || [])[1];
    const locale = (item.match(/<category domain="language" nicename="(.*?)">/) || [])[1] === 'ar' ? 'ar' : 'en';

    if (!title || !content || !slug || !pubDate) continue;

    const markdownBody = cleanHtml(content);
    const excerptSource = toPlainText(content);
    const excerpt = excerptSource.length > 180 ? `${excerptSource.slice(0, 177).trim()}...` : excerptSource;
    const translationKey = TRANSLATION_KEYS[slug];

    if (!translationKey) {
      throw new Error(`Missing translation key mapping for slug "${slug}"`);
    }

    posts.push({
      title: decodeEntities(title),
      slug,
      locale,
      publishedAt: new Date(pubDate).toISOString(),
      excerpt,
      coverImage: resolveCoverImage(slug),
      canonicalPath: `/${locale}/medical-insights/${slug}/`,
      translationKey,
      body: markdownBody,
    });
  }

  return posts;
}

function writeMarkdownPosts(posts) {
  fs.rmSync(CONTENT_DIR, { recursive: true, force: true });

  for (const post of posts) {
    const outputDir = path.join(CONTENT_DIR, post.locale);
    ensureDir(outputDir);
    const filePath = path.join(outputDir, `${post.slug}.md`);

    const frontmatter = [
      '---',
      `title: "${post.title.replace(/"/g, '\\"')}"`,
      `slug: "${post.slug}"`,
      `locale: "${post.locale}"`,
      `publishedAt: "${post.publishedAt}"`,
      `excerpt: "${post.excerpt.replace(/"/g, '\\"')}"`,
      `coverImage: "${post.coverImage}"`,
      `canonicalPath: "${post.canonicalPath}"`,
      `translationKey: "${post.translationKey}"`,
      '---',
      '',
      post.body,
      '',
    ].join('\n');

    fs.writeFileSync(filePath, frontmatter);
  }
}

function migrateMedicalInsightsToMarkdown() {
  const posts = parsePosts();
  writeMarkdownPosts(posts);
  console.log(`Migrated ${posts.length} Medical Insights posts to Markdown.`);
}

if (require.main === module) {
  migrateMedicalInsightsToMarkdown();
}

module.exports = {
  migrateMedicalInsightsToMarkdown,
};
