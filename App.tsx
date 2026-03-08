import React, { Suspense, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/ui/MobileActionBar';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { SectionCTA } from './components/ui/SectionCTA';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { SchemaMarkup } from './components/SEO/SchemaMarkup';
import { medicalInsights, type MedicalInsightSummary } from './src/data/medicalInsights.generated';
import { getCurrentSitePage, getHomepageAnchorPath, getSectionTargetFromPath, normalizePathname } from './src/lib/siteRouting';

const Services = React.lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const SymptomChecker = React.lazy(() => import('./components/SymptomChecker').then(module => ({ default: module.SymptomChecker })));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs').then(module => ({ default: module.WhyChooseUs })));
const DoctorProfile = React.lazy(() => import('./components/DoctorProfile').then(module => ({ default: module.DoctorProfile })));
const BioModal = React.lazy(() => import('./components/DoctorProfile').then(module => ({ default: module.BioModal })));
const Blog = React.lazy(() => import('./components/Blog').then(module => ({ default: module.Blog })));
const BlogModal = React.lazy(() => import('./components/BlogModal').then(module => ({ default: module.BlogModal })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));
const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));

const SEOManager: React.FC = () => {
  const { t, language } = useLanguage();

  React.useEffect(() => {
    const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
    const currentPage = getCurrentSitePage(pathname);
    const title = currentPage?.metaTitle || t.seo.title;
    const description = currentPage?.metaDescription || t.seo.description;
    const url = `https://doctorramdoun.com${currentPage?.canonicalPath || '/'}`;
    const image = 'https://doctorramdoun.com/dr-ramdoun-final.webp';
    const alternateLinks = currentPage
      ? [
        { hreflang: currentPage.locale, href: `https://doctorramdoun.com${currentPage.canonicalPath}` },
        (() => {
          const alternatePage = getCurrentSitePage(language === 'ar'
            ? pathname.replace(/^\/ar\//, '/en/')
            : pathname.replace(/^\/en\//, '/ar/'));
          return alternatePage
            ? { hreflang: alternatePage.locale, href: `https://doctorramdoun.com${alternatePage.canonicalPath}` }
            : null;
        })(),
        { hreflang: 'x-default', href: `https://doctorramdoun.com${currentPage.translationKey === 'home' ? '/' : (currentPage.locale === 'en' ? currentPage.canonicalPath : (language === 'ar' ? '/en/' : '/'))}` },
      ].filter(Boolean) as Array<{ hreflang: string; href: string }>
      : [
        { hreflang: 'en', href: 'https://doctorramdoun.com/' },
        { hreflang: 'ar', href: 'https://doctorramdoun.com/ar/' },
        { hreflang: 'x-default', href: 'https://doctorramdoun.com/' },
      ];

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', t.seo.keywords);

    const updateMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateNamedMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', url);
    updateMeta('og:image', image);
    updateMeta('og:type', 'website');
    updateMeta('og:locale', language === 'ar' ? 'ar' : 'en_US');
    updateMeta('og:locale:alternate', language === 'ar' ? 'en_US' : 'ar');

    updateNamedMeta('twitter:title', title);
    updateNamedMeta('twitter:description', description);
    updateNamedMeta('twitter:image', image);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', url);

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove());
    alternateLinks.forEach((item) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', item.hreflang);
      link.setAttribute('href', item.href);
      document.head.appendChild(link);
    });

    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [t, language]);

  return <SchemaMarkup />;
};

const LoadingFallback = () => (
  <div className="w-full py-20 flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-medical-primary/30 border-t-medical-primary rounded-full animate-spin"></div>
  </div>
);

const AppContent: React.FC = () => {
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [activePost, setActivePost] = useState<MedicalInsightSummary | null>(null);
  const { language } = useLanguage();

  React.useEffect(() => {
    const scrollToTarget = () => {
      const currentPath = window.location.pathname;
      const homepagePath = getHomepageAnchorPath(language);
      const hashTarget = window.location.hash.replace(/^#/, '');
      const sectionTarget = hashTarget || getSectionTargetFromPath(currentPath);

      if (hashTarget && normalizePathname(currentPath) !== normalizePathname(homepagePath)) {
        window.location.replace(`${homepagePath}${window.location.hash}`);
        return;
      }

      window.requestAnimationFrame(() => {
        if (!sectionTarget || sectionTarget === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const element = document.getElementById(sectionTarget);
        if (!element) return;

        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      });
    };

    scrollToTarget();
    window.addEventListener('hashchange', scrollToTarget);
    window.addEventListener('popstate', scrollToTarget);

    return () => {
      window.removeEventListener('hashchange', scrollToTarget);
      window.removeEventListener('popstate', scrollToTarget);
    };
  }, [language]);

  React.useEffect(() => {
    if (!activePost) return;
    if (activePost.locale !== language) {
      const translatedPost = medicalInsights.find((post) => post.translationKey === activePost.translationKey && post.locale === language) || null;
      setActivePost(translatedPost);
    }
  }, [activePost, language]);

  return (
    <div className="min-h-screen bg-medical-light font-sans text-slate-900 scroll-smooth selection:bg-medical-secondary selection:text-white overflow-x-hidden">
      <SEOManager />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <Services />
          <SectionCTA variant="light" />
          <SymptomChecker />
          <WhyChooseUs />
          <DoctorProfile onOpenBio={() => setIsBioModalOpen(true)} />
          <Blog onOpenPost={setActivePost} />
          <Testimonials />
          <SectionCTA />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <MobileActionBar />
      <ScrollToTop />

      <Suspense fallback={null}>
        <BioModal isOpen={isBioModalOpen} onClose={() => setIsBioModalOpen(false)} />
        <BlogModal isOpen={activePost !== null} post={activePost} onClose={() => setActivePost(null)} />
      </Suspense>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
