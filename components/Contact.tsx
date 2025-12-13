import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Button } from './ui/Button';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

// Authentic WhatsApp Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const Contact: React.FC = () => {
  return (
    <SectionWrapper id="contact" bg="light">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Contact Info (Left) */}
        <div className="bg-medical-primary p-10 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-medical-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">Contact Me</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 md:mb-14 leading-relaxed">
              I understand you may have many questions about your treatment or travel. My team and I are ready to answer them via WhatsApp or call instantly.
            </p>

            <div className="space-y-10">
              <div className="flex items-start space-x-5">
                <Mail className="w-8 h-8 text-medical-secondary mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-xl md:text-2xl mb-1">Email</h3>
                  <p className="text-gray-300 text-base md:text-lg">contact@doctorramdoun.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <Clock className="w-8 h-8 text-medical-secondary mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-xl md:text-2xl mb-1">Online Consultation Hours</h3>
                  <p className="text-gray-300 text-base md:text-lg">Mon - Sat: 8:00 AM - 8:00 PM</p>
                  <p className="text-gray-400 text-sm mt-1">24/7 WhatsApp Support for Emergencies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Actions (Right) - Replacing Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold font-heading text-medical-primary mb-3">Instant Connection</h2>
          <p className="text-lg text-gray-600 mb-10">Skip the forms. Talk to my patient coordinator right now.</p>

          <div className="space-y-5">
            {/* WhatsApp - Primary */}
            <button
              onClick={() => window.open('https://wa.me/905539362222', '_blank')}
              className="w-full group bg-[#25D366] hover:bg-[#128C7E] text-white p-5 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between border border-transparent"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <WhatsAppIcon className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-xl md:text-2xl leading-tight">Chat on WhatsApp</h4>
                  <p className="text-green-100 text-base">Average response: 5 mins</p>
                </div>
              </div>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Phone Call - Secondary */}
            <button
              onClick={() => window.location.href = 'tel:+905539362222'}
              className="w-full group bg-white hover:bg-gray-50 text-medical-primary p-5 md:p-8 rounded-2xl shadow-sm border border-gray-200 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-medical-light rounded-full flex items-center justify-center text-medical-primary">
                  <Phone size={28} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-xl md:text-2xl leading-tight">Call Directly</h4>
                  <p className="text-gray-500 text-base">+90 553 936 22 22</p>
                </div>
              </div>
              <ArrowRight className="w-7 h-7 text-gray-400 group-hover:text-medical-primary group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-10 p-5 bg-blue-50 rounded-xl border border-blue-100 text-base text-blue-800 flex gap-3 items-start">
            <Clock className="w-6 h-6 shrink-0 mt-0.5" />
            <p>Our international patient coordinators speak English, Arabic, and Turkish. We are ready to assist with your travel plans.</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};