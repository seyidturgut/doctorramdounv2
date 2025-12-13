import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';

// --- Assets: High Quality Flag Icons (SVG) ---

const FlagTR = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#E30A17" />
    <path d="M13 10.5C11.5 10.5 10.1 11 9 11.9C10.8 10.8 13.2 10.8 15 11.9C16.8 13 17.5 15.2 16.6 17.1C15.7 19 13.8 20.1 11.8 19.8C12.8 20.9 14.3 21.5 15.8 21.3C18.8 20.9 21 18.2 20.6 15.2C20.3 12.8 18.6 10.9 16.4 10.2C15.4 9.9 14.2 10.5 13 10.5Z" fill="white" />
    <path d="M22.0988 13.5615L22.9529 15.3582L24.872 15.892L23.6335 17.4308L23.7196 19.4147L22.0988 18.336L20.4779 19.4147L20.564 17.4308L19.3255 15.892L21.2446 15.3582L22.0988 13.5615Z" fill="white" />
  </svg>
);

const FlagUK = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#012169" />
    <path d="M4.6875 4.6875L27.3125 27.3125M27.3125 4.6875L4.6875 27.3125" stroke="white" strokeWidth="3" />
    <path d="M4.6875 4.6875L27.3125 27.3125M27.3125 4.6875L4.6875 27.3125" stroke="#C8102E" strokeWidth="1.5" />
    <path d="M16 0V32M0 16H32" stroke="white" strokeWidth="5" />
    <path d="M16 0V32M0 16H32" stroke="#C8102E" strokeWidth="3" />
  </svg>
);

const FlagAR = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#007A3D" />
    {/* Abstract Sword */}
    <path d="M10 21L20 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 22L11 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    {/* Abstract Shahada Script (Lines) */}
    <path d="M11 14C12 13 13 13 14 14C15 15 17 15 18 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M19 13C20 12 21 12 22 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M15 11L15 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 16C15 16 19 16 21 16" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
  </svg>
);

// Authentic WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t, dir } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#profile' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.process, href: '#process' },
    { name: t.nav.stories, href: '#testimonials' },
    { name: t.nav.faq, href: '#faq' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  // --- New Compact Dropdown Language Switcher ---
  const LanguageSelector = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = [
      { code: 'en', label: 'English', short: 'EN', Flag: FlagUK },
      { code: 'tr', label: 'Türkçe', short: 'TR', Flag: FlagTR },
      { code: 'ar', label: 'العربية', short: 'AR', Flag: FlagAR },
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
      <div className="relative z-[110]" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`
            flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full border transition-all duration-300 shadow-sm
            ${scrolled || isOpen ? 'bg-white border-gray-200 hover:border-medical-secondary/50' : 'bg-white/90 backdrop-blur-md border-white/50 hover:bg-white'}
          `}
        >
          <currentLang.Flag className="w-5 h-5 rounded-full object-cover shrink-0" />
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">{currentLang.short}</span>
          <ChevronDown size={12} className={`text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className={`
            absolute top-full mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 p-1 z-50 animate-fade-in
            ${dir === 'rtl' ? 'left-0' : 'right-0'}
          `}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as any);
                  setDropdownOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group
                  ${language === lang.code ? 'bg-medical-light text-medical-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}
                `}
              >
                <div className="flex items-center gap-2">
                  <lang.Flag className="w-4 h-4 rounded-full" />
                  <span>{lang.label}</span>
                </div>
                {language === lang.code && <Check size={14} className="text-medical-secondary" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 h-[80px] flex items-center
      ${scrolled || isOpen ? 'bg-white shadow-sm' : 'bg-transparent'}`}
      dir={dir}
    >
      <div className="max-w-[1200px] w-full mx-auto px-5 md:px-10 lg:px-20 relative z-[101]">
        <div className="flex justify-between items-center">

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="/doctorramdoun-logo.svg"
              alt="Dr. Ramdoun"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-base font-medium transition-colors hover:text-medical-secondary ${scrolled ? 'text-medical-primary' : 'text-medical-primary'}`}
              >
                {link.name}
              </a>
            ))}

            {/* Desktop Language Switcher */}
            <LanguageSelector />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Compact CTA - Visible on scroll or Desktop */}
            <div className={`transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              <Button
                size="sm"
                variant="primary"
                aria-label="Chat on WhatsApp"
                className="text-sm font-bold px-3 md:px-4 py-2 h-auto min-h-[40px] flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] shadow-green-200"
                onClick={() => window.open('https://wa.me/905539362222', '_blank')}
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span className="hidden sm:inline">{t.nav.whatsapp}</span>
              </Button>
            </div>

            {/* Mobile: Show Language Switcher in Header (Compact) */}
            <div className="lg:hidden flex items-center">
              <LanguageSelector />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-[#0A2239] hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[90] bg-white lg:hidden pt-[80px] animate-fade-in flex flex-col">
          <div className="flex-1 overflow-y-auto py-6 px-5 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-4 py-5 rounded-xl text-xl font-bold text-medical-primary border-b border-gray-50 hover:bg-medical-light hover:text-medical-secondary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4 pb-10">
            <p className="text-center text-sm text-gray-500 font-medium">{t.nav.ready}</p>
            <Button
              fullWidth
              size="lg"
              aria-label="Chat via WhatsApp"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] border-transparent text-lg shadow-lg"
              onClick={() => window.open('https://wa.me/905539362222', '_blank')}
            >
              <WhatsAppIcon className="w-6 h-6 text-white" />
              {t.nav.chat}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};