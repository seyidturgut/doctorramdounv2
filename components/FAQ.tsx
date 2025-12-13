import React, { useState } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq" bg="white">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

        {/* Left: Visual/Context */}
        <div className="lg:w-1/3">
          <div className="sticky top-32">
            <div className="inline-flex items-center gap-2 text-medical-secondary font-bold mb-6 bg-yellow-50 px-4 py-1.5 rounded-full text-sm">
              <HelpCircle size={16} />
              <span>{t.faq.badge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-medical-primary mb-6 leading-tight">
              {t.faq.title}
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {t.faq.desc}
            </p>
            <button
              onClick={() => window.open('https://wa.me/905539362222', '_blank')}
              className="hidden lg:flex items-center gap-3 bg-medical-secondary text-medical-primary font-bold px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-500/20"
            >
              <MessageCircle size={20} />
              {t.faq.ask_btn}
            </button>
          </div>
        </div>

        {/* Right: Accordion */}
        <div className="lg:w-2/3 space-y-4">
          {t.faq.items.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${activeIndex === index ? 'bg-medical-primary/5 ring-1 ring-medical-secondary/30' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-start gap-4 p-6 text-left focus:outline-none"
                aria-expanded={activeIndex === index}
              >
                <span className={`text-lg md:text-xl font-bold font-heading leading-tight ${activeIndex === index ? 'text-medical-primary' : 'text-gray-800'}`}>
                  {faq.q}
                </span>
                <span className={`shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-medical-secondary' : 'text-gray-400'}`}>
                  {activeIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-8 text-gray-600 leading-relaxed text-base md:text-lg border-t border-medical-primary/5 pt-4 mx-6 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Bottom Conversion Assist */}
          <div className="bg-medical-primary text-white p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 mt-8 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <MessageCircle className="text-medical-secondary w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg md:text-xl">{t.faq.soft_cta || "Still have questions?"}</p>
                <p className="text-white/70 text-sm">{t.faq.desc}</p>
              </div>
            </div>
            <button
              onClick={() => window.open('https://wa.me/905539362222', '_blank')}
              className="whitespace-nowrap bg-white text-medical-primary font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
            >
              {t.faq.cta_btn || "Chat with us"}
            </button>
          </div>

        </div>

      </div>
    </SectionWrapper>
  );
};