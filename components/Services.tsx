import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Bone,
  Clock,
  CheckCircle2,
  HelpingHand,
  Zap,
  Activity,
  HeartHandshake
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Authentic WhatsApp Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

interface Service {
  id: string;
  title: string;
  subtitle: string;
  benefits: string[];
  note: string;
  icon?: React.ReactNode; // Optional because we attach it dynamically
}

const getIcon = (id: string) => {
  switch (id) {
    case '1': return <Brain className="w-7 h-7" />;
    case '2': return <Bone className="w-7 h-7" />;
    case '3': return <HelpingHand className="w-7 h-7" />;
    case '4': return <Zap className="w-7 h-7" />;
    case '5': return <Activity className="w-7 h-7" />;
    case '6': return <HeartHandshake className="w-7 h-7" />;
    default: return <Brain className="w-7 h-7" />;
  }
};

// --- Components ---

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 50 }}
      className="
        bg-white rounded-2xl p-5
        border border-gray-100
        shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)]
        hover:shadow-[0_10px_30px_-10px_rgba(20,184,166,0.15)] 
        hover:border-medical-secondary/30 hover:-translate-y-1
        transition-all duration-300 ease-out group flex flex-col h-full relative overflow-hidden
      "
    >
      {/* Soft Glow Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-medical-light via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Decor Line with Animation */}
      <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-medical-secondary to-teal-400 group-hover:w-full transition-all duration-700 ease-in-out"></div>

      {/* Header: Icon & Note */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-medical-secondary group-hover:text-white text-medical-primary flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:rotate-3">
          {service.icon}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wide group-hover:bg-white/80 transition-colors">
          <Clock size={10} className="text-medical-secondary" />
          {service.note}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow">
        <h3 className="text-lg md:text-xl font-bold font-heading text-medical-primary mb-1 group-hover:text-teal-700 transition-colors leading-tight">
          {service.title}
        </h3>
        <p className="text-sm text-gray-500 font-medium mb-4 line-clamp-2">
          {service.subtitle}
        </p>

        {/* Compact Benefits List */}
        <div className="space-y-2">
          {service.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-teal-100 transition-colors">
                <CheckCircle2 size={10} className="text-medical-secondary" />
              </div>
              <span className="text-xs md:text-sm text-slate-600 font-medium leading-snug group-hover:text-slate-800">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="services" bg="light" className="relative py-12 md:py-24 overflow-hidden">
      {/* Background Blobs - Animated */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-0 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 pointer-events-none mix-blend-multiply"
      />
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl translate-x-1/3 pointer-events-none mix-blend-multiply"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16 px-4">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold font-heading text-medical-primary mb-3"
            >
              {t.services.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-xl text-gray-500 font-light"
            >
              Expert rehabilitation programs tailored to your needs.
            </motion.p>
          </div>
        </div>

        {/* Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 md:px-0">
          <AnimatePresence>
            {t.services.items.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={{ ...service, icon: getIcon(service.id) }}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </SectionWrapper>
  );
};