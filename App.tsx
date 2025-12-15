import React, { Suspense, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/ui/MobileActionBar';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { SectionCTA } from './components/ui/SectionCTA';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Lazy Load heavy components below the fold
const Services = React.lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const SymptomChecker = React.lazy(() => import('./components/SymptomChecker').then(module => ({ default: module.SymptomChecker })));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs').then(module => ({ default: module.WhyChooseUs })));
const DoctorProfile = React.lazy(() => import('./components/DoctorProfile').then(module => ({ default: module.DoctorProfile })));
const BioModal = React.lazy(() => import('./components/DoctorProfile').then(module => ({ default: module.BioModal })));
const Blog = React.lazy(() => import('./components/Blog').then(module => ({ default: module.Blog })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));
const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));

import { SchemaMarkup } from './components/SEO/SchemaMarkup';

import { getPostBySlug, urlFor, toPlainText } from './src/lib/sanity';

// SEO Manager to update meta tags dynamically
interface SEOManagerProps {
  activeBlogPost?: any;
}

const SEOManager: React.FC<SEOManagerProps> = ({ activeBlogPost }) => {
  const { t, language } = useLanguage();

  React.useEffect(() => {
    // Determine content
    const title = activeBlogPost ? `${activeBlogPost.title} | Dr. Ramdoun` : t.seo.title;
    // Handle both old structure (if any legacy) and new Portable Text structure
    let rawDescription = '';
    try {
      if (activeBlogPost?.body) {
        rawDescription = toPlainText(activeBlogPost.body) || '';
      } else if (activeBlogPost?.content) {
        rawDescription = activeBlogPost.content || '';
      }
    } catch (err) {
      console.error('Error generating description:', err);
    }

    const description = activeBlogPost ? (rawDescription || '').substring(0, 160).replace(/<[^>]*>/g, '') : t.seo.description;
    const slug = activeBlogPost?.slug?.current || activeBlogPost?.slug;
    const url = activeBlogPost ? `https://doctorramdoun.com/?blog=${slug}` : 'https://doctorramdoun.com';
    const image = activeBlogPost?.mainImage ? urlFor(activeBlogPost.mainImage).url() : (activeBlogPost?.originalImageUrl || 'https://doctorramdoun.com/dr-ramdoun-final.webp');

    // 1. Title
    document.title = title;

    // 2. Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // 3. Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', t.seo.keywords);

    // 4. Open Graph (OG)
    const updateMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', url);
    updateMeta('og:image', image);
    updateMeta('og:type', activeBlogPost ? 'article' : 'website');
    updateMeta('og:locale', language === 'ar' ? 'ar_TR' : 'en_US');
    if (language === 'ar') updateMeta('og:locale:alternate', 'en_US');
    else updateMeta('og:locale:alternate', 'ar_TR');

    // 5. Canonical & Hreflang
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', url);

    // 6. HTML Lang Attribute
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

  }, [t, language, activeBlogPost]);

  return <SchemaMarkup activeBlogPost={activeBlogPost} />;
};

const LoadingFallback = () => (
  <div className="w-full py-20 flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-medical-primary/30 border-t-medical-primary rounded-full animate-spin"></div>
  </div>
);

const AppContent: React.FC = () => {
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [activeBlogPost, setActiveBlogPost] = useState<any>(null);

  // Check URL params on mount
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const blogSlug = params.get('blog');
    if (blogSlug) {
      getPostBySlug(blogSlug).then(post => {
        if (post) setActiveBlogPost(post);
      }).catch(console.error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-medical-light font-sans text-slate-900 scroll-smooth selection:bg-medical-secondary selection:text-white overflow-x-hidden">
      <SEOManager activeBlogPost={activeBlogPost} />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <Services />
          <SectionCTA variant="light" />
          <SymptomChecker />
          <WhyChooseUs />
          <DoctorProfile onOpenBio={() => setIsBioModalOpen(true)} />
          <Blog
            onOpenBio={() => setIsBioModalOpen(true)}
            activePost={activeBlogPost}
            onPostChange={(post: any | null) => {
              setActiveBlogPost(post);
              if (post) {
                const slug = post.slug?.current || post.slug;
                const newUrl = `${window.location.pathname}?blog=${slug}`;
                window.history.pushState({ path: newUrl }, '', newUrl);
              } else {
                const newUrl = window.location.pathname;
                window.history.pushState({ path: newUrl }, '', newUrl);
              }
            }}
          />
          <Testimonials />
          <SectionCTA />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <MobileActionBar />
      <ScrollToTop />

      {/* Global Bio Modal */}
      <Suspense fallback={null}>
        <BioModal isOpen={isBioModalOpen} onClose={() => setIsBioModalOpen(false)} />
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