import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../locales/en';
import { ar } from '../locales/ar';

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
  const [language, setLanguage] = useState<Language>('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    // Handle Direction
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    setDir(direction);
    // Note: document.dir and document.lang are now managed by SEOManager in App.tsx
  }, [language]);

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
