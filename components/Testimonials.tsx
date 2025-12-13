import React from 'react';
import { SectionWrapper, SectionHeader } from './ui/SectionWrapper';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TestimonialCard: React.FC<{ name: string; location: string; text: string }> = ({ name, location, text }) => (
  <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
    <div className="flex text-yellow-400 mb-4 space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={18} fill="currentColor" />
      ))}
    </div>

    <div className="relative mb-6">
      <Quote className="text-medical-secondary/10 w-10 h-10 absolute -top-3 -left-3" />
      <p className="text-gray-700 text-lg md:text-xl italic relative z-10 pl-4 leading-relaxed font-medium">"{text}"</p>
    </div>

    <div className="mt-auto pt-6 border-t border-gray-50">
      <div>
        <h4 className="font-bold text-gray-900 text-base md:text-lg">{name}</h4>
        <p className="text-xs md:text-sm text-gray-500 uppercase font-semibold">{location}</p>
      </div>
    </div>
  </div>
);

export const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="stories" bg="light">
      <SectionHeader title={t.stories.title} subtitle={t.stories.subtitle} />
      <div className="grid md:grid-cols-3 gap-8">
        {t.stories.items.map((story, index) => (
          <TestimonialCard
            key={index}
            name={story.name}
            location={story.location}
            text={story.text}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};