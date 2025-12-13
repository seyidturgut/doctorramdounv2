import React, { useState, useEffect } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Globe, Users, Target, Award, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// --- Modal Component ---
export const BioModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t, dir } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6" dir={dir}>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-medical-primary/90 backdrop-blur-md transition-opacity"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/10 backdrop-blur rounded-full text-white md:hidden rtl:right-auto rtl:left-4"
          >
            <X size={24} />
          </button>

          <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-medical-primary shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/90 via-transparent to-transparent z-10 md:hidden"></div>
            <img
              src="/dr-ramdoun-final.webp"
              alt="Dr. Ramdoun"
              className="w-full h-full object-cover object-top"
            />

            <div className="absolute bottom-6 left-6 z-20 text-white md:hidden pr-6 rtl:left-auto rtl:right-6 rtl:pr-0 rtl:pl-6 text-start">
              <h3 className="font-heading font-bold text-2xl leading-tight">{t.profile.name}</h3>
              <p className="opacity-90 text-sm mt-1">{t.profile.modal.intro.replace(/<[^>]*>?/gm, '').split(' ').slice(0, 8).join(' ')}...</p>
            </div>
          </div>

          <div className="w-full md:w-3/5 overflow-y-auto modal-scroll bg-white relative flex flex-col h-full">
            <button
              onClick={onClose}
              className="hidden md:flex absolute top-6 right-6 z-20 p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors rtl:right-auto rtl:left-6"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-12 space-y-10 text-start">

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-medical-secondary/10 text-medical-secondary rounded-full text-xs font-bold uppercase tracking-wider">
                  <Award size={14} />
                  <span>{t.profile.modal.badge}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-heading font-bold text-medical-primary leading-[1.2]">
                  {t.profile.modal.title}
                </h2>

                <p
                  className="text-lg md:text-xl font-medium text-slate-700 leading-relaxed border-l-4 border-medical-secondary pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-4"
                  dangerouslySetInnerHTML={{ __html: t.profile.modal.intro }}
                />

                <div className="text-gray-600 leading-relaxed space-y-4 text-base md:text-lg">
                  <p dangerouslySetInnerHTML={{ __html: t.profile.modal.p1 }} />
                  <p dangerouslySetInnerHTML={{ __html: t.profile.modal.p2 }} />
                </div>

                <div className="grid gap-3 pt-2">
                  {t.profile.modal.bullets.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <CheckCircle className="text-medical-secondary w-5 h-5 shrink-0 mt-0.5" />
                      <span className="font-semibold text-medical-primary text-sm md:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-gray-100"></div>

              <div className="bg-medical-primary text-white p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-medical-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
                  <Globe size={20} className="text-medical-secondary" />
                  {t.nav.about}
                </h3>
                <p className="text-gray-300 leading-relaxed relative z-10">
                  {t.profile.modal.p1.split('.')[0]}.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Target size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-medical-primary">{t.profile.modal.mission_title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t.profile.modal.mission_desc}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-medical-primary">{t.profile.modal.team_title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t.profile.modal.team_desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 pb-8">
                <div className="mt-8 text-center">
                  <p className="font-bold text-medical-primary mb-4">{t.profile.modal.footer_quote}</p>
                  <Button
                    fullWidth
                    size="lg"
                    onClick={() => window.open('https://wa.me/905539362222', '_blank')}
                    className="shadow-xl shadow-teal-500/20"
                  >
                    {t.profile.modal.btn_start}
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const DoctorProfile: React.FC<{ onOpenBio: () => void }> = ({ onOpenBio }) => {
  const { t, dir } = useLanguage();

  return (
    <SectionWrapper id="profile" bg="dark" className="relative overflow-hidden py-0 md:py-0">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-medical-primary to-slate-900 opacity-90"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>

      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-12 min-h-[500px] md:min-h-[600px] items-center">

        {/* 1. Image Half (Compact) */}
        <div className="order-1 md:order-2 md:col-span-1 lg:col-span-5 relative h-[40vh] md:h-full min-h-[500px] overflow-hidden group">
          <div className="absolute inset-0 bg-medical-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent z-20 md:hidden"></div>
          <motion.img
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            src="/dr-ramdoun-final.webp"
            alt="Dr. Abdulalim Ramdoun"
            className="w-full h-full object-cover object-top md:object-center"
          />
          {/* Floating Badge (Desktop) */}
          <div className="hidden md:flex absolute bottom-8 -left-8 z-30 bg-white p-5 rounded-2xl shadow-2xl max-w-xs border-l-4 border-medical-secondary animate-fade-in-up rtl:left-auto rtl:-right-8 rtl:border-l-0 rtl:border-r-4">
            <Quote className="text-medical-secondary w-6 h-6 mb-2 opacity-50" />
            <p className="text-medical-primary font-medium italic leading-relaxed text-sm">
              "{t.profile.modal.footer_quote}"
            </p>
          </div>
        </div>

        {/* 2. Content Half */}
        <div className="order-2 md:order-1 md:col-span-1 lg:col-span-7 flex flex-col justify-center p-6 md:p-10 lg:p-14 relative">

          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-0.5 bg-medical-secondary"></span>
              <span className="text-medical-secondary font-bold uppercase tracking-widest text-xs">{t.profile.eyebrow}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-6 leading-[1.1]"
            >
              {t.profile.name.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 block' : 'block'}>
                  {word}
                </span>
              ))}
            </motion.h2>

            <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed font-light border-l-2 border-white/10 pl-5 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-5">
              <p dangerouslySetInnerHTML={{ __html: t.profile.bio_short_1 }} />
              <p dangerouslySetInnerHTML={{ __html: t.profile.bio_short_2 }} className="hidden md:block" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mt-8 mb-8">
              {[
                { val: "10+", label: t.profile.stats.exp },
                { val: "5k+", label: t.profile.stats.proc },
                { val: "12", label: t.profile.stats.awards }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg text-center md:text-start transition-colors hover:bg-white/10">
                  <div className="text-xl md:text-3xl font-bold text-white mb-0.5">{stat.val}</div>
                  <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => window.open('https://wa.me/905539362222', '_blank')}
                size="lg"
                className="bg-medical-secondary hover:bg-yellow-600 text-medical-primary font-bold px-6 py-3 text-base shadow-lg shadow-yellow-500/20"
              >
                {t.profile.cta_book}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onOpenBio}
                className="border-white/20 text-white hover:bg-white/10 px-6 py-3 text-base"
              >
                {t.profile.btn_bio}
              </Button>
            </div>

          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};