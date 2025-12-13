import React from 'react';
import { SectionWrapper, SectionHeader } from './ui/SectionWrapper';
import { Quote, Star } from 'lucide-react';

const TestimonialCard: React.FC<{ name: string; location: string; text: string }> = ({ name, location, text }) => (
  <div className="
    bg-white p-8 rounded-2xl border border-gray-100 
    shadow-sm hover:shadow-xl hover:-translate-y-1 
    transition-all duration-300 flex flex-col h-full
  ">
    <div className="flex text-yellow-400 mb-4 space-x-1">
      {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
    </div>
    <div className="relative mb-6">
      <Quote className="text-medical-secondary/10 w-10 h-10 absolute -top-3 -left-3" />
      <p className="text-gray-700 text-lg md:text-xl italic relative z-10 pl-4 leading-relaxed font-medium">"{text}"</p>
    </div>
    <div className="mt-auto flex items-center gap-4 pt-6 border-t border-gray-50">
      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
      <div>
        <h4 className="font-bold text-gray-900 text-base md:text-lg">{name}</h4>
        <p className="text-xs md:text-sm text-gray-500 uppercase font-semibold">{location}</p>
      </div>
    </div>
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <SectionWrapper id="testimonials" bg="light">
      <SectionHeader title="Patient Stories" subtitle="Hear from those who trusted us." />
      
      <div className="grid md:grid-cols-3 gap-8">
        <TestimonialCard 
          name="Sarah Jenkins" 
          location="London, UK"
          text="The level of care I received was outstanding. From the airport pickup to the post-op follow-up, Dr. Ramdoun's team made me feel safe."
        />
        <TestimonialCard 
          name="Michael Chen" 
          location="Singapore"
          text="World-class facilities and a doctor who actually listens. The international patient center handled all my insurance paperwork seamlessly."
        />
        <TestimonialCard 
          name="Ahmed Al-Fayed" 
          location="Dubai, UAE"
          text="Professionalism at its finest. The clinic is spotless, modern, and the staff treats you like family. Highly recommended."
        />
      </div>
    </SectionWrapper>
  );
};