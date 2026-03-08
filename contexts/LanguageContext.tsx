import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../locales/en';
import { ar } from '../locales/ar';
import { getAlternateUrl, getLocaleFromPath } from '../src/lib/siteRouting';

type Language = 'en' | 'ar';

// --- Translations Map ---
const translations = {
  en,
  ar
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof en;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    return getLocaleFromPath(window.location.pathname);
  });
  const [dir, setDir] = useState<'ltr' | 'rtl'>(language === 'ar' ? 'rtl' : 'ltr');

  useEffect(() => {
    const syncLanguageFromUrl = () => {
      setLanguageState(getLocaleFromPath(window.location.pathname));
    };

    syncLanguageFromUrl();
    window.addEventListener('popstate', syncLanguageFromUrl);
    return () => window.removeEventListener('popstate', syncLanguageFromUrl);
  }, []);

  useEffect(() => {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    setDir(direction);
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    if (typeof window === 'undefined') {
      setLanguageState(nextLanguage);
      return;
    }

    const targetUrl = getAlternateUrl(window.location.pathname, window.location.hash, nextLanguage);
    if (targetUrl === `${window.location.pathname}${window.location.hash}`) {
      setLanguageState(nextLanguage);
      return;
    }

    window.location.href = targetUrl;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
