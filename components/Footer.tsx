import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const navLinks = [
    { name: t.nav.about, href: '#profile' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.process, href: '#process' },
    { name: t.nav.stories, href: '#testimonials' },
    { name: t.nav.faq, href: '#faq' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-medical-primary text-white pt-16 pb-10 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-10">

          {/* Brand */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-2">
              <img
                src="/doctorramdoun-logo.svg"
                alt="Dr. Ramdoun"
                className="h-8 md:h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex space-x-5 pt-1">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-medical-secondary transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Synced with Header */}
          <div className="w-full md:w-auto">
            <h4 className="font-heading font-bold text-lg mb-4 md:mb-0 md:hidden">{t.footer.menu}</h4>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-base font-medium text-gray-300">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white hover:underline transition-all decoration-medical-secondary decoration-2 underline-offset-4">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="https://www.behance.net/seyidturgut" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              by : Seyid Turgut
            </a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="flex items-center gap-1">{t.footer.made_with} <Heart size={12} className="text-red-500" fill="currentColor" /> for Health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};