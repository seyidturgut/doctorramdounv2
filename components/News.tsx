import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { ArrowRight } from 'lucide-react';

export const News: React.FC = () => {
  return (
    <SectionWrapper id="news" bg="white">
      <div className="flex justify-between items-end mb-10 md:mb-14 px-2 max-w-7xl mx-auto">
        <div className="max-w-2xl">
           <h2 className="text-3xl md:text-4xl font-bold font-heading text-medical-primary mb-3">Medical Insights</h2>
           <p className="text-base md:text-xl text-gray-600">Latest health tips and announcements.</p>
        </div>
        <a href="#" className="hidden md:flex items-center text-base font-bold text-medical-secondary hover:text-teal-700 transition-colors group">
          View All <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="group cursor-pointer flex flex-col">
            <div className="rounded-2xl overflow-hidden h-56 mb-5 relative shadow-sm group-hover:shadow-lg transition-shadow duration-300">
              <img 
                src={`https://picsum.photos/400/300?random=${item + 10}`} 
                alt="News" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-medical-primary uppercase tracking-wide">
                Oct 24
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-medical-secondary transition-colors">
              New Breakthrough in Minimally Invasive Cardiac Surgery
            </h3>
            <p className="text-gray-500 text-base md:text-lg line-clamp-2 mb-4">
              Our team is proud to announce the adoption of the latest robotic-assisted surgical systems...
            </p>
            <div className="mt-auto flex items-center text-sm font-bold text-medical-secondary opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              Read More <ArrowRight className="ml-1 w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};