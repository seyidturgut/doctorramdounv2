import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  FileSearch,
  Stethoscope,
  Home,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Free Consultation",
    description: "Contact us via WhatsApp. Share your medical reports and get a preliminary assessment from Dr. Ramdoun within 24 hours.",
    icon: <MessageCircle className="w-8 h-8 md:w-10 md:h-10" />,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    title: "Personalized Plan",
    description: "We design your treatment plan, arrange your VIP airport transfer, and book your 5-star hotel accommodation.",
    icon: <FileSearch className="w-8 h-8 md:w-10 md:h-10" />,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: 3,
    title: "Treatment in Türkiye",
    description: "Arrive in Istanbul. Our coordinator greets you. Your treatment is performed in our JCI-accredited facility.",
    icon: <Stethoscope className="w-8 h-8 md:w-10 md:h-10" />,
    color: "bg-teal-100 text-teal-600"
  },
  {
    id: 4,
    title: "Recovery & Follow-up",
    description: "After a successful procedure, return home safely. We provide lifetime follow-up support to monitor your progress.",
    icon: <Home className="w-8 h-8 md:w-10 md:h-10" />,
    color: "bg-orange-100 text-orange-600"
  }
];

export const WhyChooseUs: React.FC = () => {
  return (
    <SectionWrapper id="process" bg="white" className="relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative text-center max-w-4xl mx-auto mb-16 md:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-medical-primary mb-6"
        >
          Your Journey to Recovery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
        >
          We handle every detail of your medical trip, so you can focus entirely on getting better. Here is how it works.
        </motion.p>
      </div>

      {/* Steps Grid */}
      <div className="relative max-w-[1400px] mx-auto">
        {/* Connecting Line (Desktop Only) */}
        <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-1 bg-gray-100 z-0">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-medical-secondary/20 via-medical-secondary to-medical-secondary/20 w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
              className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center h-full"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 bg-medical-primary text-white font-bold text-sm px-3 py-1 rounded-full shadow-md z-20">
                Step 0{step.id}
              </div>

              {/* Icon */}
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${step.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-medical-primary mb-4">
                {step.title}
              </h3>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Mobile Arrow (Visual cue) */}
              <div className="lg:hidden mt-auto pt-4 text-gray-300">
                <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0 mx-auto" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Area */}
      <div className="mt-16 md:mt-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex flex-col items-center bg-medical-light p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm max-w-3xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-medical-primary mb-4">Ready to start?</h3>
          <p className="text-lg text-gray-600 mb-8">
            The first step is completely free. Send us a message to discuss your condition.
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-4 shadow-xl shadow-teal-500/20"
            onClick={() => window.open('https://wa.me/905539362222', '_blank')}
          >
            Start Free Consultation
          </Button>
        </motion.div>
      </div>

    </SectionWrapper>
  );
};