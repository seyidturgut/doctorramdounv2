import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { SymptomChecker } from './components/SymptomChecker';
import { WhyChooseUs } from './components/WhyChooseUs';
import { DoctorProfile } from './components/DoctorProfile';
import { Testimonials } from './components/Testimonials';
import { News } from './components/News';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/ui/MobileActionBar';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

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

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-medical-light font-sans text-slate-900 scroll-smooth selection:bg-medical-secondary selection:text-white overflow-x-hidden">
      <SEOManager />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <SymptomChecker />
        <WhyChooseUs />
        <DoctorProfile />
        <Testimonials />
        <News />
        <FAQ />
        <Contact />
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