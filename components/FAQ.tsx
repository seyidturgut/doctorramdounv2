import React, { useState } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq" bg="white">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">

        {/* Left: Visual/Context */}
        <div className="md:w-1/3">
          <div className="sticky top-28">
            <div className="inline-flex items-center gap-2 text-medical-secondary font-bold mb-4 bg-teal-50 px-3 py-1 rounded-full text-sm">
              <HelpCircle size={16} />
              <span>{t.faq.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-medical-primary mb-4">
              {t.faq.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {t.faq.desc}
            </p>
            <button
              onClick={() => window.open('https://wa.me/905539362222', '_blank')}
              className="text-medical-secondary font-bold hover:text-teal-800 transition-colors flex items-center gap-2"
            >
              {t.faq.ask_btn} &rarr;
            </button>
          </div>
        </div>

        {/* Right: Accordion */}
        <div className="md:w-2/3 space-y-4">
          {t.faq.items.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-2xl transition-all duration-300 ${activeIndex === index ? 'border-medical-secondary bg-teal-50/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center p-5 md:p-6 text-left focus:outline-none"
                aria-expanded={activeIndex === index}
              >
                <span className={`text-lg font-bold font-heading ${activeIndex === index ? 'text-medical-primary' : 'text-gray-700'}`}>
                  {faq.q}
                </span>
                <span className={`ml-4 shrink-0 transition-colors ${activeIndex === index ? 'text-medical-secondary' : 'text-gray-400'}`}>
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};