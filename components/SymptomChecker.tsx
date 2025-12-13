import React, { useState, useEffect } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  CheckCircle2,
  RefreshCcw,
  MessageCircle,
  ArrowLeft,
  ChevronRight,
  Stethoscope,
  FileText
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// --- Background Animation Component ---
const ModalBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-teal-50/50"></div>
    <motion.div
      animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 right-0 w-96 h-96 bg-medical-secondary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"
    />
  </div>
);

export const SymptomChecker: React.FC = () => {
  const { t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const questions = t.assessment.questions;
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [isFinished, setIsFinished] = useState(false);

  // Lock body scroll when full screen modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = option;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 200);
    } else {
      setTimeout(() => setIsFinished(true), 200);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers(Array(questions.length).fill(""));
    setIsFinished(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "905539362222";
    let message = `Hello, I completed the assessment:\n\n`;
    questions.forEach((q, index) => {
      message += `🔹 ${q.question}: ${answers[index]}\n`;
    });
    message += `\nI need a consultation.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const progressPercentage = ((currentStep + (isFinished ? 1 : 0)) / questions.length) * 100;

  return (
    <SectionWrapper id="assessment" bg="white" className="relative py-12 md:py-24">

      {/* 1. Trigger Card */}
      <div className="max-w-4xl mx-auto relative group perspective-1000">
        <div className="absolute -inset-1 bg-gradient-to-r from-medical-secondary to-teal-400 rounded-[2rem] blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
        <div className="bg-gradient-to-br from-medical-primary to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 ring-1 ring-white/10">

          <div className="absolute top-0 right-0 w-64 h-64 bg-medical-secondary rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>

          <div className="relative z-10 text-center md:text-start">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-medical-secondary mb-4 border border-white/10">
              <Activity size={14} />
              <span>{t.assessment.badge}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className="text-xs font-bold text-teal-200 bg-teal-900/40 px-2 py-1 rounded border border-teal-700/50">{t.assessment.time_badge}</span>
              <span className="text-xs font-bold text-green-200 bg-green-900/40 px-2 py-1 rounded border border-green-700/50">{t.assessment.free_badge}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold font-heading mb-3">
              {t.assessment.trigger_title}
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-lg">
              {t.assessment.trigger_desc}
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Button
              variant="white"
              size="lg"
              onClick={() => setIsOpen(true)}
              className="shadow-xl px-8 py-6 text-lg group border-none hover:ring-4 ring-white/30 transition-all duration-300 relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              {t.assessment.btn_start}
              {dir === 'rtl' ? (
                <ChevronRight className="mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-white w-full h-[100dvh] flex flex-row overflow-hidden"
            dir={dir}
          >
            {/* === LEFT COLUMN === */}
            <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col relative z-20 bg-white/95 md:bg-white shadow-2xl">
              <ModalBackground />

              {/* Top Bar */}
              <div className="shrink-0 h-16 px-5 md:px-8 flex items-center justify-between border-b border-gray-100/60 bg-white/80 backdrop-blur-md z-30">
                <button
                  onClick={handleClose}
                  className="flex items-center gap-2 text-gray-500 hover:text-medical-primary font-bold text-sm px-3 py-2 rounded-lg hover:bg-gray-100/50 transition-colors"
                >
                  <ArrowLeft size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
                  {t.assessment.btn_back}
                </button>

                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-3 py-1 rounded-full">
                  {!isFinished ? `${t.assessment.step} ${currentStep + 1} / ${questions.length}` : t.assessment.done}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-gray-100 shrink-0 relative z-30">
                <motion.div
                  className="h-full bg-gradient-to-r from-medical-secondary to-teal-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                />
              </div>

              {/* Main Interactive Area */}
              <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 w-full relative z-20 overflow-y-auto">
                <AnimatePresence mode='wait'>

                  {!isFinished ? (
                    <motion.div
                      key={`step-${currentStep}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full justify-center pb-10 max-w-lg mx-auto w-full"
                    >
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-medical-primary mb-8 md:mb-10 text-center md:text-start leading-tight">
                        {questions[currentStep].question}
                      </h3>

                      <div className="space-y-3 md:space-y-4">
                        {questions[currentStep].options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(option)}
                            className={`
                              w-full p-4 md:p-5 rounded-2xl border-2 text-start transition-all duration-200 flex items-center justify-between group
                              ${answers[currentStep] === option
                                ? 'border-medical-secondary bg-teal-50 text-medical-primary shadow-md scale-[1.02]'
                                : 'border-white bg-white shadow-sm text-gray-600 hover:border-medical-secondary/40 hover:bg-gray-50'}
                            `}
                          >
                            <span className="text-base md:text-lg font-semibold">{option}</span>
                            <div className={`
                              w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                              ${answers[currentStep] === option ? 'border-medical-secondary bg-medical-secondary text-white' : 'border-gray-200 group-hover:border-medical-secondary/50'}
                            `}>
                              {answers[currentStep] === option && <CheckCircle2 size={14} />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="finish"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col h-full justify-center items-center text-center pb-10 max-w-md mx-auto"
                    >
                      <div className="w-20 h-20 bg-gradient-to-tr from-green-100 to-emerald-50 text-[#25D366] rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100 ring-4 ring-white shrink-0">
                        <CheckCircle2 size={40} />
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-medical-primary mb-2 font-heading">
                        {t.assessment.result_title}
                      </h3>
                      <p className="text-gray-500 mb-6 text-base px-2 leading-relaxed">
                        {t.assessment.result_desc}
                      </p>

                      {/* Summary Section */}
                      <div className="w-full bg-white rounded-2xl p-5 mb-8 border border-gray-100 shadow-sm text-start">
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                          <FileText size={16} className="text-medical-secondary" />
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.assessment.summary_title}</h4>
                        </div>
                        <div className="space-y-4">
                          {questions.map((q, index) => (
                            <div key={index} className="group">
                              <p className="text-[11px] font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">{q.question}</p>
                              <p className="text-sm md:text-base font-bold text-medical-primary">{answers[index]}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="w-full space-y-4">
                        <Button
                          fullWidth
                          size="lg"
                          className="bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center gap-3 py-5 text-lg shadow-xl shadow-green-500/20 rounded-2xl"
                          onClick={sendToWhatsApp}
                        >
                          <MessageCircle size={22} fill="white" />
                          {t.assessment.btn_send}
                        </Button>

                        <button
                          onClick={handleRestart}
                          className="flex items-center justify-center gap-2 text-gray-400 hover:text-medical-primary transition-colors py-2 font-medium text-sm"
                        >
                          <RefreshCcw size={14} />
                          {t.assessment.btn_retake}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* === RIGHT COLUMN: Image & Decor (Desktop Only) === */}
            <div className="hidden md:block md:w-1/2 lg:w-7/12 relative bg-medical-primary overflow-hidden">
              <img
                src="https://doctorramdoun.com/wp-content/uploads/2025/08/home-hero-image-2025-08-17-1-2-1.png"
                alt="Dr. Ramdoun Medical Assessment"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-primary via-medical-primary/40 to-transparent opacity-90"></div>

              <div className="absolute bottom-12 left-12 right-12 z-10 text-white text-start">
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-semibold text-medical-secondary">
                  <Stethoscope size={16} />
                  <span>{t.assessment.quote_badge}</span>
                </div>
                <blockquote className="text-3xl font-heading font-bold leading-tight mb-4">
                  "{t.assessment.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-medical-secondary rounded-full"></div>
                  <p className="text-lg font-medium text-gray-300">Dr. Abdulalim Ramdoun</p>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </SectionWrapper>
  );
};