import { medicalInsights } from '../data/medicalInsights.generated';
import { sitePages } from '../data/sitePages.generated';

export type SiteLocale = 'en' | 'ar';
type TranslationKey =
  | 'home'
  | 'about'
  | 'services'
  | 'faq'
  | 'contact'
  | 'medical-insights';

const DEFAULT_PATHS: Record<SiteLocale, string> = {
  en: '/en/',
  ar: '/ar/',
};

const EXPERIENCE_HOME_PATHS: Record<SiteLocale, string> = {
  en: '/',
  ar: '/ar/',
};

const SECTION_TARGETS: Record<TranslationKey, string> = {
  home: 'top',
  about: 'about',
  services: 'services',
  faq: 'faq',
  contact: 'contact',
  'medical-insights': 'blog',
};

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') + '/';
}

export function getLocaleFromPath(pathname: string): SiteLocale {
  const normalized = normalizePathname(pathname);
  return normalized.startsWith('/ar/') ? 'ar' : 'en';
}

export function getCurrentTranslationKey(pathname: string): TranslationKey | null {
  const normalized = normalizePathname(pathname);
  const match = sitePages.find((page) => normalizePathname(page.canonicalPath) === normalized);
  return (match?.translationKey as TranslationKey | undefined) || null;
}

export function getSitePagePath(locale: SiteLocale, translationKey: TranslationKey): string {
  return sitePages.find((page) => page.locale === locale && page.translationKey === translationKey)?.canonicalPath || DEFAULT_PATHS[locale];
}

export function getHomepageAnchorPath(locale: SiteLocale, sectionId?: string): string {
  const homepagePath = EXPERIENCE_HOME_PATHS[locale];
  return sectionId ? `${homepagePath}#${sectionId}` : homepagePath;
}

export function getSectionTargetFromPath(pathname: string): string {
  const normalized = normalizePathname(pathname);
  const pageMatch = sitePages.find((page) => normalizePathname(page.canonicalPath) === normalized);
  if (!pageMatch) return 'top';
  return SECTION_TARGETS[pageMatch.translationKey as TranslationKey] || 'top';
}

export function getCurrentSitePage(pathname: string) {
  const normalized = normalizePathname(pathname);
  return sitePages.find((page) => normalizePathname(page.canonicalPath) === normalized) || null;
}

export function getAlternatePath(pathname: string, targetLocale: SiteLocale): string {
  const normalized = normalizePathname(pathname);
  if (normalized === '/') {
    return EXPERIENCE_HOME_PATHS[targetLocale];
  }

  const pageMatch = sitePages.find((page) => normalizePathname(page.canonicalPath) === normalized);
  if (pageMatch) {
    if (pageMatch.translationKey === 'home') {
      return EXPERIENCE_HOME_PATHS[targetLocale];
    }
    return getSitePagePath(targetLocale, pageMatch.translationKey as TranslationKey);
  }

  const articleMatch = medicalInsights.find((post) => normalizePathname(post.canonicalPath) === normalized);
  if (articleMatch) {
    return medicalInsights.find((post) => post.translationKey === articleMatch.translationKey && post.locale === targetLocale)?.canonicalPath || getSitePagePath(targetLocale, 'medical-insights');
  }

  return getSitePagePath(targetLocale, 'home');
}

export function getAlternateUrl(pathname: string, hash: string, targetLocale: SiteLocale): string {
  const alternatePath = getAlternatePath(pathname, targetLocale);
  const normalized = normalizePathname(pathname);
  const currentPage = sitePages.find((page) => normalizePathname(page.canonicalPath) === normalized);

  if (hash && (normalized === '/' || currentPage?.translationKey === 'home')) {
    return `${alternatePath}${hash}`;
  }

  return alternatePath;
}
