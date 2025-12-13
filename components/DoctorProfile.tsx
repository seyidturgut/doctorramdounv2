import React, { useState, useEffect } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Globe, Users, Target, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// --- Modal Component ---
const BioModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
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
              src="https://doctorramdoun.com/wp-content/uploads/2025/08/home-hero-image-2025-08-17-1-2-1.png" 
              alt="Dr. Ramdoun" 
              className="w-full h-full object-cover object-top"
            />
            
            <div className="absolute bottom-6 left-6 z-20 text-white md:hidden pr-6 rtl:left-auto rtl:right-6 rtl:pr-0 rtl:pl-6 text-start">
               <h3 className="font-heading font-bold text-2xl leading-tight">{t.profile.name}</h3>
               <p className="opacity-90 text-sm mt-1">{t.profile.modal.intro.split(' ').slice(0, 5).join(' ')}...</p>
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

                <p className="text-lg md:text-xl font-medium text-slate-700 leading-relaxed border-l-4 border-medical-secondary pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-4">
                  {t.profile.modal.intro}
                </p>

                <div className="text-gray-600 leading-relaxed space-y-4 text-base md:text-lg">
                  <p>{t.profile.modal.p1}</p>
                  <p>{t.profile.modal.p2}</p>
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

export const DoctorProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <SectionWrapper id="profile" bg="dark" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-20 rtl:right-auto rtl:left-0 rtl:-translate-x-20 rtl:-skew-x-12"></div>

        <div className="relative z-10 grid md:grid-cols-3 gap-12 lg:gap-16 items-center">
          
          <div className="md:col-span-2 text-white text-center md:text-start">
            <h3 className="text-medical-secondary font-bold text-xl mb-3">{t.profile.eyebrow}</h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-8">{t.profile.name}</h2>
            
            <div className="space-y-6 text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed font-light">
              <p>{t.profile.bio_short_1}</p>
              <p>{t.profile.bio_short_2}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10">
              <div>
                <div className="text-4xl font-bold text-white">10+</div>
                <div className="text-sm uppercase tracking-wide text-gray-400 mt-1">{t.profile.stats.exp}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">5k+</div>
                <div className="text-sm uppercase tracking-wide text-gray-400 mt-1">{t.profile.stats.proc}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">12</div>
                <div className="text-sm uppercase tracking-wide text-gray-400 mt-1">{t.profile.stats.awards}</div>
              </div>
            </div>

            <div className="mt-10">
              <Button 
                variant="white" 
                size="lg" 
                className="text-lg"
                onClick={() => setIsModalOpen(true)}
              >
                {t.profile.btn_bio}
              </Button>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="relative">
              <div className="absolute inset-0 bg-medical-secondary rounded-2xl rotate-3"></div>
              <img 
                src="https://doctorramdoun.com/wp-content/uploads/2025/08/home-hero-image-2025-08-17-1-2-1.png" 
                alt="Dr. Abdulalim Ramdoun" 
                className="relative rounded-2xl w-full object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

        </div>
      </SectionWrapper>

      <BioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};