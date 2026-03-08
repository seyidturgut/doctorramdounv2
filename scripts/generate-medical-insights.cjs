const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MEDICAL_CONTENT_DIR = path.join(ROOT, 'content', 'medical-insights');
const SITE_CONTENT_DIR = path.join(ROOT, 'content', 'site-pages');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');
const BASE_URL = 'https://doctorramdoun.com';
const BRAND = require(path.join(ROOT, 'src', 'config', 'brand.json'));

const GENERATED_MEDICAL_TS_PATH = path.join(ROOT, 'src', 'data', 'medicalInsights.generated.ts');
const GENERATED_SITE_TS_PATH = path.join(ROOT, 'src', 'data', 'sitePages.generated.ts');

const MEDICAL_REQUIRED_FIELDS = ['title', 'slug', 'locale', 'publishedAt', 'excerpt', 'coverImage', 'canonicalPath', 'translationKey'];
const SITE_REQUIRED_FIELDS = ['title', 'slug', 'locale', 'metaTitle', 'metaDescription', 'canonicalPath', 'translationKey', 'schemaType'];
const SITE_PAGE_ORDER = ['home', 'about', 'services', 'faq', 'contact', 'medical-insights'];

const ARTICLE_LABELS = {
  en: {
    otherLanguage: 'Read this article in Arabic',
    insights: 'Medical Insights',
    publishedOn: 'Published on',
    author: 'By Dr. Abdulalim Ramdoun',
    summary: 'Article Summary',
  },
  ar: {
    otherLanguage: 'اقرأ هذه المقالة بالإنجليزية',
    insights: 'المقالات الطبية',
    publishedOn: 'تاريخ النشر',
    author: 'بقلم د. عبدالعليم رمضون',
    summary: 'ملخص المقال',
  },
};

const SITE_LABELS = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      faq: 'FAQ',
      contact: 'Contact',
      'medical-insights': 'Medical Insights',
    },
    languageSwitch: 'Read this page in Arabic',
    breadcrumbsHome: 'Homepage',
    pageIntro: 'Trusted care for international patients in Turkey.',
    blogIndexHeading: 'Latest Medical Insights',
    readArticle: 'Read article',
    whatsapp: 'WhatsApp Consultation',
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      faq: 'الأسئلة الشائعة',
      contact: 'اتصل بنا',
      'medical-insights': 'المقالات الطبية',
    },
    languageSwitch: 'اقرأ هذه الصفحة بالإنجليزية',
    breadcrumbsHome: 'الصفحة الرئيسية',
    pageIntro: 'رعاية موثوقة للمرضى الدوليين في تركيا.',
    blogIndexHeading: 'أحدث المقالات الطبية',
    readArticle: 'اقرأ المقال',
    whatsapp: 'استشارة عبر واتساب',
  },
};

const FAQ_ITEMS = {
  en: [
    ['Do you provide airport pickup and accommodation?', 'Yes. Our VIP international patient package includes airport transfers and support with 5-star partner accommodation.'],
    ['How soon can treatment start after arrival?', 'Most patients are scheduled for their initial medical review on the day of arrival or the following morning.'],
    ['Do you accept international insurance?', 'We can review international insurance details in advance and help you understand what documentation is needed.'],
    ['Is there a language barrier?', 'No. The team supports English, Arabic and Turkish communication, with translator support when needed.'],
    ['Do you provide follow-up after treatment?', 'Yes. Digital follow-up and post-treatment coordination remain available after patients return home.'],
  ],
  ar: [
    ['هل توفرون استقبال من المطار وإقامة؟', 'نعم. تشمل باقة المرضى الدوليين خدمة النقل من المطار والدعم في ترتيبات الإقامة الفندقية المناسبة.'],
    ['متى يمكنني بدء العلاج بعد الوصول؟', 'يتم ترتيب المراجعة الطبية الأولى عادة في يوم الوصول أو في صباح اليوم التالي مباشرة.'],
    ['هل تقبلون التأمين الدولي؟', 'يمكننا مراجعة تفاصيل التأمين الدولي مسبقاً وتوضيح المستندات المطلوبة قبل السفر.'],
    ['هل يوجد حاجز لغة؟', 'لا. يتوفر الدعم بالعربية والإنجليزية والتركية مع إمكانية التنسيق مع مترجم عند الحاجة.'],
    ['هل توجد متابعة بعد العلاج؟', 'نعم. تبقى المتابعة الرقمية والتنسيق بعد العلاج متاحة بعد عودة المريض إلى بلده.'],
  ],
};

const SERVICE_ITEMS = {
  en: [
    'Neurological rehabilitation',
    'Orthopedic rehabilitation',
    'Manual therapy',
    'Deep Brain Stimulation support',
    'Smart spinal cord stimulation support',
    'Psychological support',
  ],
  ar: [
    'إعادة التأهيل العصبي',
    'إعادة التأهيل العظمي',
    'العلاج اليدوي',
    'دعم تحفيز الدماغ العميق',
    'دعم تحفيز الحبل الشوكي الذكي',
    'الدعم النفسي',
  ],
};

const SECTION_TARGETS = {
  home: 'top',
  about: 'about',
  services: 'services',
  faq: 'faq',
  contact: 'contact',
  'medical-insights': 'blog',
};

function getBrandName(locale) {
  return locale === 'ar' ? BRAND.ar : BRAND.en;
}

function getOrganizationName(locale) {
  return locale === 'ar' ? BRAND.organization.ar : BRAND.organization.en;
}

function getOrganizationAlternateNames(locale) {
  return locale === 'ar' ? BRAND.organizationAlternate.ar : BRAND.organizationAlternate.en;
}

function getPhysicianAlternateNames(locale) {
  return locale === 'ar'
    ? [BRAND.en, ...BRAND.arVariants]
    : [BRAND.ar, ...BRAND.arVariants.slice(1)];
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function stripTags(value) {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/'/g, '&#39;');
}

function normalizePath(pathname) {
  if (!pathname) return '/';
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error('Missing frontmatter block');

  const [, frontmatterRaw, body] = match;
  const data = {};

  for (const line of frontmatterRaw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const separatorIndex = trimmed.indexOf(':');
    if (separatorIndex === -1) throw new Error(`Invalid frontmatter line: ${trimmed}`);
    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return { data, body: body.trim() };
}

function renderInlineMarkdown(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let paragraph = [];
  let listMode = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${renderInlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!listMode) return;
    html.push(listMode === 'ol' ? '</ol>' : '</ul>');
    listMode = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }

    if (line.startsWith('<')) {
      flushParagraph();
      closeList();
      html.push(line);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const orderedItem = line.match(/^\d+\.\s+(.*)$/);
    if (orderedItem) {
      flushParagraph();
      if (listMode !== 'ol') {
        closeList();
        html.push('<ol>');
        listMode = 'ol';
      }
      html.push(`<li>${renderInlineMarkdown(orderedItem[1])}</li>`);
      continue;
    }

    const unorderedItem = line.match(/^[-*]\s+(.*)$/);
    if (unorderedItem) {
      flushParagraph();
      if (listMode !== 'ul') {
        closeList();
        html.push('<ul>');
        listMode = 'ul';
      }
      html.push(`<li>${renderInlineMarkdown(unorderedItem[1])}</li>`);
      continue;
    }

    closeList();
    paragraph.push(line);
  }

  flushParagraph();
  closeList();
  return html.join('\n');
}

function collectMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];

  const files = [];
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) files.push(...collectMarkdownFiles(entryPath));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(entryPath);
  }
  return files;
}

function loadEntries(contentDir, requiredFields, dateField = null) {
  return collectMarkdownFiles(contentDir).map((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, body } = parseFrontmatter(raw);
    const html = markdownToHtml(body);
    const plainText = stripTags(html);
    const entry = {
      ...data,
      body,
      html,
      plainText,
      sourceFile: path.relative(ROOT, filePath),
    };

    for (const field of requiredFields) {
      if (!entry[field]) throw new Error(`Missing required field "${field}" in ${entry.sourceFile}`);
    }

    if (dateField) {
      entry[dateField] = new Date(entry[dateField]).toISOString();
    }

    return entry;
  });
}

function validateTranslationPairs(entries, label) {
  const slugByLocale = new Map();
  const translationGroups = new Map();

  for (const entry of entries) {
    const localeKey = `${entry.locale}:${entry.slug}`;
    if (slugByLocale.has(localeKey)) throw new Error(`Duplicate slug for ${label} locale "${localeKey}"`);
    slugByLocale.set(localeKey, entry.sourceFile);

    if (!translationGroups.has(entry.translationKey)) translationGroups.set(entry.translationKey, new Set());
    translationGroups.get(entry.translationKey).add(entry.locale);
  }

  for (const [translationKey, locales] of translationGroups.entries()) {
    if (!locales.has('en') || !locales.has('ar') || locales.size !== 2) {
      throw new Error(`${label} translation group "${translationKey}" must contain exactly EN and AR entries`);
    }
  }
}

function loadPosts() {
  const posts = loadEntries(MEDICAL_CONTENT_DIR, MEDICAL_REQUIRED_FIELDS, 'publishedAt');
  validateTranslationPairs(posts, 'Medical insight');
  return posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

function loadSitePages() {
  const pages = loadEntries(SITE_CONTENT_DIR, SITE_REQUIRED_FIELDS);
  validateTranslationPairs(pages, 'Site page');
  return pages.sort((a, b) => {
    const aIndex = SITE_PAGE_ORDER.indexOf(a.translationKey);
    const bIndex = SITE_PAGE_ORDER.indexOf(b.translationKey);
    return aIndex - bIndex;
  });
}

function writeGeneratedMedicalModule(posts) {
  ensureDir(path.dirname(GENERATED_MEDICAL_TS_PATH));
  const summaries = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    locale: post.locale,
    publishedAt: post.publishedAt,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    canonicalPath: post.canonicalPath,
    translationKey: post.translationKey,
    html: post.html,
  }));

  const fileContent = `export type MedicalInsightLocale = 'en' | 'ar';\n\nexport interface MedicalInsightSummary {\n  title: string;\n  slug: string;\n  locale: MedicalInsightLocale;\n  publishedAt: string;\n  excerpt: string;\n  coverImage: string;\n  canonicalPath: string;\n  translationKey: string;\n  html: string;\n}\n\nexport const medicalInsights: MedicalInsightSummary[] = ${JSON.stringify(summaries, null, 2)};\n`;
  fs.writeFileSync(GENERATED_MEDICAL_TS_PATH, fileContent);
}

function writeGeneratedSitePageModule(pages) {
  ensureDir(path.dirname(GENERATED_SITE_TS_PATH));
  const summaries = pages.map((page) => ({
    title: page.title,
    slug: page.slug,
    locale: page.locale,
    canonicalPath: page.canonicalPath,
    translationKey: page.translationKey,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    schemaType: page.schemaType,
  }));

  const fileContent = `export type SitePageLocale = 'en' | 'ar';\n\nexport interface SitePageSummary {\n  title: string;\n  slug: string;\n  locale: SitePageLocale;\n  canonicalPath: string;\n  translationKey: string;\n  metaTitle: string;\n  metaDescription: string;\n  schemaType: string;\n}\n\nexport const sitePages: SitePageSummary[] = ${JSON.stringify(summaries, null, 2)};\n`;
  fs.writeFileSync(GENERATED_SITE_TS_PATH, fileContent);
}

function renderAlternateLinks(entry, alternateEntry) {
  const links = [
    `<link rel="canonical" href="${BASE_URL}${entry.canonicalPath}" />`,
    `<link rel="alternate" hreflang="${entry.locale}" href="${BASE_URL}${entry.canonicalPath}" />`,
  ];

  if (alternateEntry) {
    links.push(`<link rel="alternate" hreflang="${alternateEntry.locale}" href="${BASE_URL}${alternateEntry.canonicalPath}" />`);
    const isHomePair = entry.translationKey === 'home' || alternateEntry.translationKey === 'home';
    const xDefaultPath = isHomePair ? '/' : (alternateEntry.locale === 'en' ? alternateEntry.canonicalPath : entry.canonicalPath);
    links.push(`<link rel="alternate" hreflang="x-default" href="${BASE_URL}${xDefaultPath}" />`);
  } else {
    const xDefaultPath = entry.translationKey === 'home' ? '/' : entry.canonicalPath;
    links.push(`<link rel="alternate" hreflang="x-default" href="${BASE_URL}${xDefaultPath}" />`);
  }

  return links.join('\n  ');
}

function upsertTag(html, pattern, replacement, fallbackNeedle = '</head>') {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }

  return html.replace(fallbackNeedle, `  ${replacement}\n${fallbackNeedle}`);
}

function renderSeoMetaBlock(page, alternatePage) {
  return `<!-- SEO Meta Tags -->
  <title>${escapeHtml(page.metaTitle)}</title>
  <meta name="description" content="${escapeAttribute(page.metaDescription)}" />
  <meta name="keywords" content="Physiotherapy, Rehabilitation Center, Dr Abdulalim Ramdoun, Stroke Recovery, Neurological Rehab, Orthopedic Rehab, Medical Tourism" />
  <meta name="author" content="Dr. Abdulalim Ramdoun" />
  <meta name="robots" content="index, follow" />
  <link rel="preload" as="image" href="/dr-ramdoun-final.webp">

  ${renderAlternateLinks(page, alternatePage)}

  <!-- Open Graph / Facebook / WhatsApp Preview -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${BASE_URL}${page.canonicalPath}" />
  <meta property="og:title" content="${escapeAttribute(page.metaTitle)}" />
  <meta property="og:description" content="${escapeAttribute(page.metaDescription)}" />
  <meta property="og:image" content="${BASE_URL}/dr-ramdoun-final.webp" />
  <meta property="og:locale" content="${page.locale === 'ar' ? 'ar' : 'en_US'}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttribute(page.metaTitle)}" />
  <meta name="twitter:description" content="${escapeAttribute(page.metaDescription)}" />
  <meta name="twitter:image" content="${BASE_URL}/dr-ramdoun-final.webp" />`;
}

function renderSpaShellPage(page, alternatePage, templateHtml, posts) {
  const schemaJson = renderPageSchema(page, posts);
  const sectionTarget = SECTION_TARGETS[page.translationKey] || 'top';
  let html = templateHtml;

  html = html.replace(/<html lang="[^"]+"/, `<html lang="${page.locale}"`);
  html = html.replace(/<html([^>]*)class="([^"]*)"/, `<html$1class="$2" dir="${page.locale === 'ar' ? 'rtl' : 'ltr'}"`);
  html = html.replace(/<!-- SEO Meta Tags -->[\s\S]*?<!-- Fonts -->/, `${renderSeoMetaBlock(page, alternatePage)}\n\n  <!-- Fonts -->`);
  html = upsertTag(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${schemaJson}</script>`);
  html = upsertTag(html, /<script>\s*window\.__SEO_ROUTE__ = [\s\S]*?<\/script>/, `<script>window.__SEO_ROUTE__ = ${JSON.stringify({ locale: page.locale, translationKey: page.translationKey, sectionTarget, canonicalPath: page.canonicalPath })};</script>`);
  html = html.replace(/<body([^>]*)>/, `<body$1 data-locale="${page.locale}" data-translation-key="${page.translationKey}" data-section-target="${sectionTarget}">`);

  return html;
}

function renderOrganizationSchema(locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: getOrganizationName(locale),
    alternateName: getOrganizationAlternateNames(locale),
    url: BASE_URL,
    logo: `${BASE_URL}/doctorramdoun-logo.svg`,
    image: `${BASE_URL}/dr-ramdoun-final.webp`,
    telephone: '+905539362222',
    email: 'info@doctorramdoun.com',
    sameAs: BRAND.sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Atakoy Towers, B Blok No: 20/1, Ic Kapi No: 110',
      addressLocality: 'Bakirkoy',
      addressRegion: 'Istanbul',
      addressCountry: 'TR',
    },
  };
}

function renderPhysicianSchema(locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${BASE_URL}/#physician`,
    name: getBrandName(locale),
    alternateName: getPhysicianAlternateNames(locale),
    image: `${BASE_URL}/dr-ramdoun-final.webp`,
    medicalSpecialty: 'Physiotherapy',
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsLanguage: ['English', 'Arabic', 'Turkish'],
    sameAs: BRAND.sameAs,
  };
}

function renderPageSpecificSchema(page, posts) {
  const filteredPosts = posts.filter((post) => post.locale === page.locale);
  const basePageSchema = {
    '@context': 'https://schema.org',
    '@type': page.schemaType,
    name: page.metaTitle,
    description: page.metaDescription,
    inLanguage: page.locale,
    url: `${BASE_URL}${page.canonicalPath}`,
    isPartOf: { '@id': `${BASE_URL}/#organization` },
  };

  if (page.translationKey === 'services') {
    basePageSchema.mainEntity = {
      '@type': 'ItemList',
      itemListElement: SERVICE_ITEMS[page.locale].map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
      })),
    };
  }

  if (page.translationKey === 'faq') {
    basePageSchema.mainEntity = FAQ_ITEMS[page.locale].map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    }));
  }

  if (page.translationKey === 'contact') {
    basePageSchema.mainEntity = {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: '+905539362222',
      email: 'info@doctorramdoun.com',
      availableLanguage: ['English', 'Arabic', 'Turkish'],
    };
  }

  if (page.translationKey === 'medical-insights') {
    basePageSchema.blogPost = filteredPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${BASE_URL}${post.canonicalPath}`,
      datePublished: post.publishedAt,
    }));
  }

  return basePageSchema;
}

function renderPageSchema(page, posts) {
  return JSON.stringify([
    renderOrganizationSchema(page.locale),
    renderPhysicianSchema(page.locale),
    renderPageSpecificSchema(page, posts),
  ]);
}

function renderArticleSchema(post, alternatePost) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: post.locale,
    image: `${BASE_URL}${post.coverImage}`,
    mainEntityOfPage: `${BASE_URL}${post.canonicalPath}`,
    author: { '@type': 'Person', name: getBrandName(post.locale), alternateName: getPhysicianAlternateNames(post.locale) },
    publisher: {
      '@type': 'MedicalOrganization',
      name: getOrganizationName(post.locale),
      alternateName: getOrganizationAlternateNames(post.locale),
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/doctorramdoun-logo.svg` },
    },
  };

  if (alternatePost) {
    schema.hasPart = {
      '@type': 'WebPage',
      inLanguage: alternatePost.locale,
      url: `${BASE_URL}${alternatePost.canonicalPath}`,
    };
  }

  return JSON.stringify(schema);
}

function renderNav(locale, currentTranslationKey, pages) {
  const labels = SITE_LABELS[locale];
  const navPages = pages.filter((page) => page.locale === locale).sort((a, b) => SITE_PAGE_ORDER.indexOf(a.translationKey) - SITE_PAGE_ORDER.indexOf(b.translationKey));

  return navPages.map((page) => {
    const isCurrent = page.translationKey === currentTranslationKey;
    return `<a class="nav-link${isCurrent ? ' current' : ''}" href="${page.canonicalPath}">${labels.nav[page.translationKey] || page.title}</a>`;
  }).join('\n        ');
}

function renderMedicalInsightCards(locale, posts) {
  const labels = SITE_LABELS[locale];
  const filteredPosts = posts
    .filter((post) => post.locale === locale)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return filteredPosts.map((post) => {
    const date = new Date(post.publishedAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `<article class="card">
      <img src="${post.coverImage}" alt="${escapeAttribute(post.title)}" />
      <div class="card-body">
        <span class="card-date">${escapeHtml(date)}</span>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt)}</p>
        <a class="card-link" href="${post.canonicalPath}">${labels.readArticle}</a>
      </div>
    </article>`;
  }).join('\n');
}

function renderPageHtml(page, alternatePage, pages, posts) {
  const locale = page.locale;
  const isArabic = locale === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';
  const labels = SITE_LABELS[locale];
  const alternateLink = alternatePage
    ? `<a class="lang-link" href="${alternatePage.canonicalPath}">${labels.languageSwitch}</a>`
    : '';
  const cardsSection = page.translationKey === 'medical-insights'
    ? `<section class="cards-shell">
        <div class="section-head">
          <h2>${labels.blogIndexHeading}</h2>
        </div>
        <div class="cards-grid">
          ${renderMedicalInsightCards(locale, posts)}
        </div>
      </section>`
    : '';

  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(page.metaTitle)}</title>
  <meta name="description" content="${escapeAttribute(page.metaDescription)}" />
  <meta name="robots" content="index,follow" />
  ${renderAlternateLinks(page, alternatePage)}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeAttribute(page.metaTitle)}" />
  <meta property="og:description" content="${escapeAttribute(page.metaDescription)}" />
  <meta property="og:url" content="${BASE_URL}${page.canonicalPath}" />
  <meta property="og:image" content="${BASE_URL}/dr-ramdoun-final.webp" />
  <meta property="og:locale" content="${locale === 'ar' ? 'ar' : 'en_US'}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttribute(page.metaTitle)}" />
  <meta name="twitter:description" content="${escapeAttribute(page.metaDescription)}" />
  <meta name="twitter:image" content="${BASE_URL}/dr-ramdoun-final.webp" />
  <script type="application/ld+json">${renderPageSchema(page, posts)}</script>
  <style>
    :root {
      --bg: #eff5f7;
      --surface: rgba(255,255,255,0.92);
      --text: #123048;
      --muted: #5f7787;
      --line: rgba(18,48,72,0.12);
      --brand: #0a2239;
      --accent: #14b8a6;
      --shadow: 0 24px 70px rgba(18,48,72,0.08);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(20,184,166,0.13), transparent 28%),
        linear-gradient(180deg, #f8fbfc 0%, #eef4f6 100%);
      line-height: 1.75;
    }
    a { color: inherit; }
    .page { width: min(1140px, calc(100% - 28px)); margin: 0 auto; padding: 24px 0 64px; }
    .shell {
      background: linear-gradient(135deg, rgba(10,34,57,0.97), rgba(20,184,166,0.9));
      color: white;
      border-radius: 34px;
      padding: 24px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    .topbar {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: white;
      font-weight: 700;
    }
    .brand img {
      height: 40px;
      width: auto;
      filter: brightness(0) invert(1);
    }
    .lang-link {
      text-decoration: none;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.16);
      font-size: 14px;
      font-weight: 600;
    }
    .nav {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 20px;
    }
    .nav-link {
      text-decoration: none;
      padding: 9px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      font-size: 14px;
    }
    .nav-link.current {
      background: rgba(255,255,255,0.18);
      border-color: rgba(255,255,255,0.24);
    }
    .hero {
      margin-top: 24px;
      display: grid;
      gap: 18px;
    }
    .eyebrow {
      display: inline-flex;
      width: fit-content;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.14);
      font-size: 12px;
      letter-spacing: .05em;
      text-transform: uppercase;
    }
    h1 {
      margin: 0;
      font-size: clamp(34px, 4vw, 56px);
      line-height: 1.05;
      max-width: 860px;
    }
    .lead {
      margin: 0;
      max-width: 760px;
      color: rgba(255,255,255,0.92);
      font-size: 18px;
    }
    .content-shell {
      margin-top: 24px;
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 30px;
      padding: 28px;
      box-shadow: var(--shadow);
    }
    .content-shell h2, .content-shell h3, .content-shell h4 {
      color: var(--brand);
      line-height: 1.2;
      margin: 28px 0 12px;
    }
    .content-shell p, .content-shell ul, .content-shell ol {
      margin: 0 0 16px;
      color: var(--text);
    }
    .content-shell ul, .content-shell ol {
      padding-inline-start: 22px;
    }
    .content-shell a {
      color: #0f7990;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .cards-shell {
      margin-top: 24px;
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 30px;
      padding: 28px;
      box-shadow: var(--shadow);
    }
    .section-head h2 {
      margin: 0 0 18px;
      color: var(--brand);
      font-size: 28px;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }
    .card {
      background: white;
      border: 1px solid var(--line);
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(18,48,72,0.08);
    }
    .card img {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      display: block;
    }
    .card-body {
      padding: 18px;
    }
    .card-date {
      font-size: 12px;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: .04em;
    }
    .card h3 {
      margin: 10px 0 10px;
      color: var(--brand);
      font-size: 20px;
      line-height: 1.25;
    }
    .card p {
      margin: 0 0 14px;
      color: var(--muted);
    }
    .card-link {
      text-decoration: none;
      color: var(--accent);
      font-weight: 700;
    }
    .footer-cta {
      margin-top: 24px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      background: var(--accent);
      color: var(--brand);
      padding: 13px 18px;
      border-radius: 999px;
      font-weight: 700;
    }
    @media (max-width: 920px) {
      .cards-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 720px) {
      .page { width: min(100% - 18px, 1140px); }
      .shell, .content-shell, .cards-shell { padding: 20px; border-radius: 24px; }
    }
  </style>
</head>
<body>
  <main class="page">
    <section class="shell">
      <div class="topbar">
        <a class="brand" href="${locale === 'en' ? '/en/' : '/ar/'}">
          <img src="/doctorramdoun-logo.svg" alt="Doctor Ramdoun" />
          <span>${escapeHtml(labels.breadcrumbsHome)}</span>
        </a>
        ${alternateLink}
      </div>
      <nav class="nav">
        ${renderNav(locale, page.translationKey, pages)}
      </nav>
      <div class="hero">
        <span class="eyebrow">${escapeHtml(labels.nav[page.translationKey] || page.title)}</span>
        <h1>${escapeHtml(page.title)}</h1>
        <p class="lead">${escapeHtml(page.metaDescription || labels.pageIntro)}</p>
      </div>
    </section>
    <section class="content-shell">
      ${page.html}
      <a class="footer-cta" href="https://wa.me/905539362222">${escapeHtml(labels.whatsapp)}</a>
    </section>
    ${cardsSection}
  </main>
</body>
</html>`;
}

function renderArticlePage(post, alternatePost) {
  const isArabic = post.locale === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';
  const labels = ARTICLE_LABELS[post.locale];
  const publishedDate = new Date(post.publishedAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const alternateLink = alternatePost ? `<a class="lang-link" href="${alternatePost.canonicalPath}">${labels.otherLanguage}</a>` : '';

  return `<!DOCTYPE html>
<html lang="${post.locale}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(post.title)} | Dr. Abdulalim Ramdoun</title>
  <meta name="description" content="${escapeAttribute(post.excerpt)}" />
  <meta name="robots" content="index,follow" />
  ${renderAlternateLinks(post, alternatePost)}
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeAttribute(post.title)}" />
  <meta property="og:description" content="${escapeAttribute(post.excerpt)}" />
  <meta property="og:url" content="${BASE_URL}${post.canonicalPath}" />
  <meta property="og:image" content="${BASE_URL}${post.coverImage}" />
  <meta property="og:locale" content="${post.locale === 'ar' ? 'ar' : 'en_US'}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttribute(post.title)}" />
  <meta name="twitter:description" content="${escapeAttribute(post.excerpt)}" />
  <meta name="twitter:image" content="${BASE_URL}${post.coverImage}" />
  <script type="application/ld+json">${renderArticleSchema(post, alternatePost)}</script>
  <style>
    :root { --surface: #ffffff; --text: #123048; --muted: #5a7384; --line: rgba(18, 48, 72, 0.12); --brand: #0a2239; --accent: #14b8a6; --shadow: 0 24px 70px rgba(18, 48, 72, 0.09); }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; color: var(--text); background: radial-gradient(circle at top left, rgba(20, 184, 166, 0.12), transparent 30%), linear-gradient(180deg, #f8fbfc 0%, #eef3f5 100%); line-height: 1.75; }
    a { color: inherit; }
    .page { width: min(980px, calc(100% - 28px)); margin: 0 auto; padding: 28px 0 60px; }
    .hero { background: linear-gradient(135deg, rgba(10, 34, 57, 0.97), rgba(20, 184, 166, 0.88)); color: white; border-radius: 30px; padding: 28px; box-shadow: var(--shadow); }
    .topbar { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; align-items: center; margin-bottom: 16px; }
    .crumb, .lang-link { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.15); color: white; font-size: 14px; font-weight: 600; }
    .eyebrow { display: inline-flex; align-items: center; padding: 7px 12px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.14); border-radius: 999px; font-size: 12px; letter-spacing: .05em; text-transform: uppercase; }
    h1 { margin: 18px 0 12px; font-size: clamp(32px, 4vw, 50px); line-height: 1.08; }
    .meta { display: flex; flex-wrap: wrap; gap: 12px; color: rgba(255,255,255,0.92); font-size: 14px; }
    .excerpt { margin-top: 18px; font-size: 18px; color: rgba(255,255,255,0.94); max-width: 760px; }
    .cover { width: 100%; border-radius: 26px; overflow: hidden; margin: 24px 0 0; border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.08); }
    .cover img { display: block; width: 100%; height: auto; object-fit: cover; aspect-ratio: 16 / 9; }
    .content { margin-top: 24px; background: var(--surface); border: 1px solid var(--line); border-radius: 30px; padding: 30px; box-shadow: var(--shadow); }
    .summary { padding: 18px 20px; background: #f3fbfa; border: 1px solid rgba(20, 184, 166, 0.18); border-radius: 20px; margin-bottom: 24px; }
    .summary strong { display: block; margin-bottom: 6px; color: var(--brand); }
    .article-body h2, .article-body h3, .article-body h4 { color: var(--brand); line-height: 1.2; margin: 28px 0 12px; }
    .article-body p, .article-body ul, .article-body ol, .article-body blockquote { margin: 0 0 16px; color: var(--text); }
    .article-body ul, .article-body ol { padding-inline-start: 22px; }
    .article-body a { color: #0f7990; text-decoration: underline; text-underline-offset: 3px; }
    .article-body img { width: 100%; max-width: 100%; border-radius: 22px; margin: 22px 0; box-shadow: 0 18px 40px rgba(18, 48, 72, 0.12); }
    .article-body blockquote { padding: 18px 20px; border-inline-start: 4px solid var(--accent); background: #f8fbfc; border-radius: 0 16px 16px 0; }
    @media (max-width: 720px) { .page { width: min(100% - 18px, 980px); } .hero, .content { padding: 20px; border-radius: 24px; } }
  </style>
</head>
<body>
  <main class="page">
    <section class="hero">
      <div class="topbar">
        <a class="crumb" href="/${post.locale}/medical-insights/">${ARTICLE_LABELS[post.locale].insights}</a>
        ${alternateLink}
      </div>
      <span class="eyebrow">${labels.insights}</span>
      <h1>${escapeHtml(post.title)}</h1>
      <div class="meta">
        <span>${labels.publishedOn}: ${escapeHtml(publishedDate)}</span>
        <span>${labels.author}</span>
      </div>
      <p class="excerpt">${escapeHtml(post.excerpt)}</p>
      <div class="cover"><img src="${post.coverImage}" alt="${escapeAttribute(post.title)}" /></div>
    </section>
    <section class="content">
      <div class="summary"><strong>${labels.summary}</strong><span>${escapeHtml(post.excerpt)}</span></div>
      <article class="article-body">${post.html}</article>
    </section>
  </main>
</body>
</html>`;
}

function cleanGeneratedLocaleDirs() {
  fs.rmSync(path.join(PUBLIC_DIR, 'en'), { recursive: true, force: true });
  fs.rmSync(path.join(PUBLIC_DIR, 'ar'), { recursive: true, force: true });
}

function writeStaticSitePages(sitePages, posts, outputRoot, templateHtml) {
  const pageMap = new Map(sitePages.map((page) => [`${page.translationKey}:${page.locale}`, page]));

  for (const page of sitePages) {
    const alternatePage = pageMap.get(`${page.translationKey}:${page.locale === 'en' ? 'ar' : 'en'}`) || null;
    const outputDir = path.join(outputRoot, page.canonicalPath.replace(/^\/+/, ''));
    ensureDir(outputDir);
    fs.writeFileSync(path.join(outputDir, 'index.html'), renderSpaShellPage(page, alternatePage, templateHtml, posts));
  }
}

function writeStaticArticlePages(posts) {
  const postsByTranslation = new Map(posts.map((post) => [`${post.translationKey}:${post.locale}`, post]));

  for (const post of posts) {
    const alternatePost = postsByTranslation.get(`${post.translationKey}:${post.locale === 'en' ? 'ar' : 'en'}`) || null;
    const outputDir = path.join(PUBLIC_DIR, post.canonicalPath.replace(/^\/+/, ''));
    ensureDir(outputDir);
    fs.writeFileSync(path.join(outputDir, 'index.html'), renderArticlePage(post, alternatePost));
  }
}

function writeSitemap(sitePages, posts) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${BASE_URL}/</loc>`,
    `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
  ];

  for (const page of sitePages) {
    lines.push('  <url>');
    lines.push(`    <loc>${BASE_URL}${page.canonicalPath}</loc>`);
    lines.push(`    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`);
    lines.push('    <changefreq>monthly</changefreq>');
    lines.push(`    <priority>${page.translationKey === 'home' ? '0.95' : '0.85'}</priority>`);
    lines.push('  </url>');
  }

  for (const post of posts) {
    lines.push('  <url>');
    lines.push(`    <loc>${BASE_URL}${post.canonicalPath}</loc>`);
    lines.push(`    <lastmod>${post.publishedAt.split('T')[0]}</lastmod>`);
    lines.push('    <changefreq>monthly</changefreq>');
    lines.push('    <priority>0.8</priority>');
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), `${lines.join('\n')}\n`);
}

function writeLLMFile(sitePages, posts) {
  const groupedPages = {
    en: sitePages.filter((page) => page.locale === 'en'),
    ar: sitePages.filter((page) => page.locale === 'ar'),
  };

  const content = `# ${BRAND.organization.en}

## About
${BRAND.en} is a rehabilitation and physiotherapy specialist serving international patients in Istanbul, Turkey. The website provides bilingual English and Arabic landing pages plus medical insight articles.

## Languages
- English routes under \`/en/\`
- Arabic routes under \`/ar/\`

## Key Information
- Doctor (EN): ${BRAND.en}
- Doctor (AR): ${BRAND.ar}
- Arabic brand variants: ${BRAND.arVariants.join(' / ')}
- Location: Istanbul, Turkey
- Contact: +90 553 936 22 22
- Email: info@doctorramdoun.com
- Website: ${BASE_URL}

## Route Structure
${groupedPages.en.map((page) => `- \`${page.canonicalPath}\`: English ${page.translationKey} landing page.`).join('\n')}
${groupedPages.ar.map((page) => `- \`${page.canonicalPath}\`: Arabic ${page.translationKey} landing page.`).join('\n')}
- \`/en/medical-insights/[slug]/\`: English medical insight article.
- \`/ar/medical-insights/[slug]/\`: Arabic medical insight article.

## Content Inventory
- Static EN/AR landing pages: ${sitePages.length}
- Static EN/AR medical insight articles: ${posts.length}
`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'llm.txt'), `${content.trim()}\n`);
}

function generateMedicalInsights() {
  const posts = loadPosts();
  const sitePages = loadSitePages();
  const appShellTemplate = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  cleanGeneratedLocaleDirs();
  writeGeneratedMedicalModule(posts);
  writeGeneratedSitePageModule(sitePages);
  writeStaticSitePages(sitePages, posts, PUBLIC_DIR, appShellTemplate);
  writeStaticArticlePages(posts);
  writeSitemap(sitePages, posts);
  writeLLMFile(sitePages, posts);

  return { posts, sitePages };
}

function generateDistSeoShellPages() {
  if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    throw new Error('dist/index.html not found. Run the Vite build before generating dist SEO pages.');
  }

  const posts = loadPosts();
  const sitePages = loadSitePages();
  const distTemplate = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
  writeStaticSitePages(sitePages, posts, DIST_DIR, distTemplate);

  return { posts, sitePages };
}

if (require.main === module) {
  const isDistMode = process.argv.includes('--dist');
  const { posts, sitePages } = isDistMode ? generateDistSeoShellPages() : generateMedicalInsights();
  console.log(`Generated ${sitePages.length} site pages and ${posts.length} Medical Insights posts.`);
}

module.exports = {
  generateMedicalInsights,
  generateDistSeoShellPages,
};
