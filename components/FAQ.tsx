import React, { useState } from 'react';
import { SectionWrapper, SectionHeader } from './ui/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Do you provide airport pickup and accommodation?",
    answer: "Yes, absolutely. Our VIP International Patient package includes luxury airport transfers (Mercedes Vito) and discounted rates at 5-star partner hotels located near our clinic."
  },
  {
    question: "How soon can I start treatment after arriving?",
    answer: "Typically, you will have your initial consultation with Dr. Ramdoun on the day of your arrival or the very next morning. Treatment plans usually commence immediately after the assessment."
  },
  {
    question: "Do you accept international insurance?",
    answer: "We work with many international insurance providers. Please share your policy details with our coordinators via WhatsApp, and we will check your coverage eligibility before you travel."
  },
  {
    question: "Is there a language barrier?",
    answer: "Not at all. Our team speaks fluent English, Arabic, and Turkish. We also provide personal translators for other languages to ensure you are comfortable throughout your stay."
  },
  {
    question: "What if I need follow-up care after returning home?",
    answer: "We provide lifetime digital follow-up. You can schedule video calls with Dr. Ramdoun to monitor your progress, and we can coordinate with your local physiotherapist if needed."
  }
];

export const FAQ: React.FC = () => {
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
                <span>Support Center</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-bold font-heading text-medical-primary mb-4">
               Frequently Asked Questions
             </h2>
             <p className="text-gray-600 mb-6">
               Can't find the answer you're looking for? Chat with our team directly.
             </p>
             <button 
               onClick={() => window.open('https://wa.me/905539362222', '_blank')}
               className="text-medical-secondary font-bold hover:text-teal-800 transition-colors flex items-center gap-2"
             >
               Ask on WhatsApp &rarr;
             </button>
           </div>
        </div>

        {/* Right: Accordion */}
        <div className="md:w-2/3 space-y-4">
          {faqs.map((faq, index) => (
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
                  {faq.question}
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
                      {faq.answer}
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