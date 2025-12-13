import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  bg?: 'white' | 'light' | 'dark';
  className?: string;
  id?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  bg = 'white',
  className = '',
  id
}) => {
  const bgColors = {
    white: 'bg-white',
    light: 'bg-medical-light',
    dark: 'bg-medical-primary text-white',
  };

  return (
    <section id={id} className={`py-12 md:py-24 ${bgColors[bg]} ${className}`}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string; align?: 'left' | 'center' | 'right', dark?: boolean }> = ({
  title,
  subtitle,
  align = 'center',
  dark = false
}) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-4xl mb-12 md:mb-16 ${alignClass[align]}`}
    >
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 ${dark ? 'text-white' : 'text-medical-primary'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
      <div className={`h-1.5 w-24 bg-medical-secondary mt-6 rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
};