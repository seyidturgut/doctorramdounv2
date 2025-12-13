import React from 'react';
import { Button } from './ui/Button';
import { ShieldCheck, Globe, Star, Phone, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// Authentic WhatsApp Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// --- Sub-Components ---

const Eyebrow: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 py-1.5 px-3 md:py-2 md:px-4 rounded-full bg-white/80 backdrop-blur-md border border-medical-secondary/20 shadow-sm text-[10px] md:text-sm font-bold text-gray-600 uppercase tracking-wide mb-6 max-w-full">
      <div className="flex items-center gap-1.5 text-medical-secondary whitespace-nowrap">
        <Globe size={14} />
        <span>{t.hero.eyebrow.patients}</span>
      </div>
      <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300"></span>
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <Star size={14} className="text-yellow-400 fill-yellow-400" />
        <span>{t.hero.eyebrow.clinic}</span>
      </div>
    </div>
  );
};

const HeroText: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 text-center md:text-start w-full relative z-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-bold font-heading text-medical-primary tracking-tight rtl:tracking-normal break-words">
        {t.hero.title_start} <br className="hidden xs:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-secondary to-teal-500 relative">
          {t.hero.title_highlight}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute -top-1 -right-4 text-yellow-400 text-2xl rtl:right-auto rtl:-left-4"
          >
            ✦
          </motion.span>
        </span>
        <br /> {t.hero.title_end}
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto md:mx-0 font-normal px-2 md:px-0">
        {t.hero.description}
        <br className="hidden md:block my-3" />
        <span className="font-semibold text-medical-primary block mt-3">{t.hero.tagline}</span>
      </p>
    </div>
  );
};

const HeroCTAs: React.FC = () => {
  const { t } = useLanguage();

  const scrollToAssessment = () => {
    const element = document.getElementById('assessment');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col items-center md:items-start space-y-5 w-full max-w-lg mx-auto md:mx-0 relative z-10">
      <div className="flex flex-row w-full gap-3 px-2 md:px-0">
        <Button
          fullWidth
          className="group relative overflow-hidden flex items-center justify-center gap-2 text-sm sm:text-base font-bold bg-[#25D366] hover:bg-[#128C7E] border-transparent py-3 md:py-4 whitespace-nowrap flex-1"
          onClick={() => window.open('https://wa.me/905539362222', '_blank')}
          aria-label="Start WhatsApp Chat"
        >
          <WhatsAppIcon className="w-5 h-5 text-white" />
          <span className="relative z-10">{t.hero.cta_whatsapp}</span>
        </Button>

        <Button
          variant="white"
          fullWidth
          aria-label="Get assessment"
          className="group flex items-center justify-center gap-2 text-[11px] xs:text-sm sm:text-base font-bold border-2 border-medical-secondary/20 hover:border-medical-secondary text-medical-primary relative overflow-hidden py-3 md:py-4 whitespace-nowrap flex-1"
          onClick={scrollToAssessment}
        >
          <span className="relative z-10 flex items-center gap-1.5 xs:gap-2">
            <Activity size={18} className="text-medical-secondary group-hover:scale-110 transition-transform shrink-0" />
            <span className="truncate">{t.hero.cta_assess}</span>
          </span>
        </Button>
      </div>
      <div className="flex items-center gap-4 text-xs md:text-sm text-slate-500 font-medium">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {t.hero.fast_response}</span>
        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
        <span>{t.hero.consultation}</span>
      </div>
    </div>
  );
};

const TrustBadges: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="relative z-10 w-full overflow-hidden">
      <div className="flex flex-nowrap overflow-x-auto items-center justify-start gap-3 pb-2 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide w-[calc(100%+2.5rem)] md:w-auto">
        {[
          { icon: Phone, text: t.hero.badges.support },
          { icon: Globe, text: t.hero.badges.language },
          { icon: ShieldCheck, text: t.hero.badges.accredited },
        ].map((badge, idx) => (
          <div key={idx} className="shrink-0 flex items-center gap-1.5 text-slate-600 bg-white/60 backdrop-blur-md px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg border border-white/60 shadow-sm whitespace-nowrap">
            <badge.icon size={13} className="text-medical-secondary" />
            <span className="text-[10px] sm:text-xs font-semibold">{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickConnectCard: React.FC = () => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/50 w-full max-w-[280px]"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="relative">
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-white rounded-full z-10 animate-pulse rtl:right-auto rtl:left-0"></span>
          <img src="/favicon.png" className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md p-1 bg-white" alt="Patient Support Agent" />
        </div>
        <div className="text-start">
          <p className="text-sm font-bold text-gray-900">{t.hero.agent_name}</p>
          <p className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full inline-block mt-0.5">{t.hero.agent_status}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed font-medium text-start">
        {t.hero.agent_msg}
      </p>
      <Button size="sm" fullWidth className="text-sm flex items-center justify-center gap-2 rounded-lg" onClick={() => window.open('https://wa.me/905539362222', '_blank')}>
        <WhatsAppIcon className="w-4 h-4 text-white" /> {t.hero.cta_whatsapp}
      </Button>
    </motion.div>
  );
};

// --- Background Components ---

const MedicalBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-[#F8FAFC]">

      {/* 1. Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#0A2239 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* 2. Soft Gradient Orbs (Reduced Intensity) */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-teal-200/40 rounded-full blur-[120px]"
      />

      {/* 3. Floating Medical Symbols (+) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-medical-secondary/10 font-bold text-4xl"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0.5,
            opacity: 0
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0, 0.4, 0],
            rotate: [0, 90]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          +
        </motion.div>
      ))}
    </div>
  );
};

// --- Main Hero Component ---

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative pt-[110px] md:pt-[150px] pb-12 md:pb-28 overflow-hidden">

      <MedicalBackground />

      <div className="max-w-[1400px] w-full mx-auto px-5 md:px-10 lg:px-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">

          {/* Left Column: Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="flex flex-col gap-6 md:gap-8 order-1 text-center md:text-start items-center md:items-start"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="w-full flex justify-center md:justify-start">
              <Eyebrow />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="w-full">
              <HeroText />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="w-full pt-2">
              <HeroCTAs />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <TrustBadges />
            </motion.div>
          </motion.div>

          {/* Right Column: Visuals & QuickConnect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="order-2 relative"
          >
            {/* Reduced height on mobile for better visibility of content below */}
            <div className="relative w-full max-w-sm md:max-w-full mx-auto">

              {/* Main Image with Modern Mask */}
              <div className="group relative w-full rounded-[40px] overflow-hidden shadow-2xl border-[6px] border-white bg-gray-100">
                <img
                  src="/dr-ramdoun-final.webp"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop";
                  }}
                  alt="Dr. Ramdoun - Leading Physiotherapy Specialist"
                  className="w-full h-auto object-contain"
                  width="600"
                  height="800"
                  loading="eager"
                  // @ts-ignore
                  fetchpriority="high"
                />

                {/* Desktop Quick Connect Card Position (Animated) */}
                <div className="hidden md:block absolute bottom-8 left-8 rtl:left-auto rtl:right-8 z-20">
                  <QuickConnectCard />
                </div>
              </div>

              {/* Floating Badge - Fixed position inside container to avoid cutoff */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 md:top-8 md:-right-4 rtl:md:-left-4 z-20 bg-white/95 backdrop-blur-md pl-2 pr-4 py-2 rounded-l-full rounded-r-full md:rounded-r-none rtl:md:rounded-l-none rtl:md:rounded-r-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center gap-2 md:gap-3 cursor-pointer hover:pr-7 transition-all"
                onClick={() => window.open('https://wa.me/905539362222', '_blank')}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center text-[#25D366]">
                  <WhatsAppIcon className="w-[18px] h-[18px] text-[#25D366]" />
                </div>
                <div className="text-start">
                  <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</p>
                  <p className="text-xs md:text-sm font-bold text-gray-800">{t.hero.agent_status}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};