import React, { Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/ui/MobileActionBar';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Lazy Load heavy components below the fold
const Services = React.lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const SymptomChecker = React.lazy(() => import('./components/SymptomChecker').then(module => ({ default: module.SymptomChecker })));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs').then(module => ({ default: module.WhyChooseUs })));
const DoctorProfile = React.lazy(() => import('./components/DoctorProfile').then(module => ({ default: module.DoctorProfile })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));
const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));

import { SchemaMarkup } from './components/SEO/SchemaMarkup';

// SEO Manager to update meta tags dynamically
const SEOManager = () => {
  const { t, language } = useLanguage();

  React.useEffect(() => {
    // 1. Title
    document.title = t.seo.title;

    // 2. Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.seo.description);

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

    updateMeta('og:title', t.seo.title);
    updateMeta('og:description', t.seo.description);
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
    linkCanonical.setAttribute('href', 'https://doctorramdoun.com');

    // 6. HTML Lang Attribute
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
  return (
    <div className="min-h-screen bg-medical-light font-sans text-slate-900 scroll-smooth selection:bg-medical-secondary selection:text-white overflow-x-hidden">
      <SEOManager />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <Services />
          <SymptomChecker />
          <WhyChooseUs />
          <DoctorProfile />
          <Testimonials />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <MobileActionBar />
      <ScrollToTop />
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