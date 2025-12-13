import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  FileSearch,
  HeartFirst,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const stepsMetadata = [
  {
    id: 1,
    icon: <MessageCircle className="w-8 h-8 md:w-10 md:h-10" />,
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    id: 2,
    icon: <FileSearch className="w-8 h-8 md:w-10 md:h-10" />,
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    id: 3,
    icon: <HeartFirst className="w-8 h-8 md:w-10 md:h-10" />,
    color: "bg-teal-50 text-teal-600 border-teal-200"
  }
];

export const WhyChooseUs: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <SectionWrapper id="process" bg="white" className="relative overflow-hidden py-16 md:py-24">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative text-center max-w-4xl mx-auto mb-16 md:mb-24 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold font-heading text-medical-primary mb-6"
        >
          {t.process.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
        >
          {t.process.description}
        </motion.p>
      </div>

      {/* 3-Step Timeline */}
      <div className="relative max-w-6xl mx-auto px-4">

        {/* Connector Line (Desktop Only) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 z-0">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className={`h-full bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 ${dir === 'rtl' ? 'origin-right' : 'origin-left'}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
          {t.process.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Number Badge */}
              <div className="bg-white border-4 border-white shadow-lg w-24 h-24 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                <div className={`w-full h-full rounded-full flex items-center justify-center border-2 ${stepsMetadata[index].color}`}>
                  {stepsMetadata[index].icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-medical-primary text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-white">
                  {index + 1}
                </div>
              </div>

              {/* Content Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 w-full max-w-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-medical-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  {step.desc}
                </p>
              </div>

              {/* Mobile Arrow */}
              {index < 2 && (
                <div className="md:hidden mt-6 text-gray-300 animate-bounce">
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 md:mt-24 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex flex-col md:flex-row items-center gap-6 bg-teal-50 border border-teal-100 p-6 md:p-8 rounded-2xl max-w-2xl mx-auto"
        >
          <div className="bg-teal-100 p-3 rounded-full shrink-0">
            <CheckCircle2 className="w-8 h-8 text-teal-600" />
          </div>
          <div className="text-center md:text-start flex-1">
            <h4 className="text-xl font-bold text-medical-primary mb-1">{t.process.cta_title}</h4>
            <p className="text-gray-600">{t.process.cta_desc}</p>
          </div>
          <Button
            onClick={() => window.open('https://wa.me/905539362222', '_blank')}
            className="bg-medical-primary text-white shadow-lg shadow-blue-900/20 whitespace-nowrap"
          >
            {t.process.cta_btn}
          </Button>
        </motion.div>
      </div>

    </SectionWrapper>
  );
};