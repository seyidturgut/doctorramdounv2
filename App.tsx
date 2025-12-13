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

// SEO Manager to update meta tags dynamically
const SEOManager = () => {
  const { t } = useLanguage();

  React.useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t.seo.description);
    }
  }, [t]);

  return null;
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