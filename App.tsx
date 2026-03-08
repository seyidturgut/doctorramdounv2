import React, { Suspense, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/ui/MobileActionBar';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { SectionCTA } from './components/ui/SectionCTA';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { SchemaMarkup } from './components/SEO/SchemaMarkup';

const Services = React.lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const SymptomChecker = React.lazy(() => import('./components/SymptomChecker').then(module => ({ default: module.SymptomChecker })));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs').then(module => ({ default: module.WhyChooseUs })));
const DoctorProfile = React.lazy(() => import('./components/DoctorProfile').then(module => ({ default: module.DoctorProfile })));
const BioModal = React.lazy(() => import('./components/DoctorProfile').then(module => ({ default: module.BioModal })));
const Blog = React.lazy(() => import('./components/Blog').then(module => ({ default: module.Blog })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));
const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));

const SEOManager: React.FC = () => {
  const { t, language } = useLanguage();

  React.useEffect(() => {
    const title = t.seo.title;
    const description = t.seo.description;
    const url = 'https://doctorramdoun.com/';
    const image = 'https://doctorramdoun.com/dr-ramdoun-final.webp';

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
          <Blog />
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
