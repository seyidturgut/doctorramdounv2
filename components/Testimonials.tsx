import React from 'react';
import { SectionWrapper, SectionHeader } from './ui/SectionWrapper';
import { Star, Quote, BadgeCheck, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TestimonialCard: React.FC<{
  name: string;
  location: string;
  text: string;
  treatment?: string;
  outcome?: string;
  verifiedLabel: string;
}> = ({ name, location, text, treatment, outcome, verifiedLabel }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300 group">

    {/* Header: Stars & Verified Badge */}
    <div className="flex justify-between items-start mb-6">
      <div className="flex text-yellow-500 space-x-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={18} fill="currentColor" className="drop-shadow-sm" />
        ))}
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
        <BadgeCheck size={14} className="fill-green-100" />
        <span className="text-[10px] font-bold uppercase tracking-wide">{verifiedLabel}</span>
      </div>
    </div>

    {/* Result Tag (New) */}
    {(treatment || outcome) && (
      <div className="mb-4 inline-flex flex-wrap gap-2">
        {treatment && <span className="px-2 py-1 bg-medical-primary/5 text-medical-primary text-xs font-semibold rounded-md flex items-center gap-1"><Activity size={12} /> {treatment}</span>}
      </div>
    )}

    {/* Body: Quote */}
    <div className="relative mb-6 flex-grow">
      <Quote className="text-gray-100 w-12 h-12 absolute -top-4 -left-2 transform -scale-x-100" />
      <p className="text-gray-700 text-lg leading-relaxed font-medium relative z-10">"{text}"</p>
    </div>

    {/* Outcome Highlight */}
    {outcome && (
      <div className="mb-6 p-3 bg-teal-50 border-l-4 border-teal-500 rounded-r-lg">
        <p className="text-sm text-teal-800 font-bold">Result: <span className="font-normal">{outcome}</span></p>
      </div>
    )}

    {/* Footer: Author */}
    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-base">{name}</h4>
        <p className="text-xs text-gray-500 font-medium">{location}</p>
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
            treatment={story.treatment}
            outcome={story.outcome}
            verifiedLabel={t.stories.verified_customer || "Verified Patient"}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};