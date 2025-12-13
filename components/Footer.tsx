import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-medical-primary text-white pt-20 pb-28 md:pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-16 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img
                src="/doctorramdoun-logo.svg"
                alt="Dr. Ramdoun"
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
              Together Toward Better Health. I am committed to providing world-class medical care with a focus on your safety, comfort, and sustainable recovery.
            </p>
            <div className="flex space-x-6 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-medical-secondary transition-colors">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-xl mb-8">Menu</h4>
            <ul className="space-y-4 text-base text-gray-400">
              <li><a href="#profile" className="hover:text-medical-secondary transition-colors">About Dr. Ramdoun</a></li>
              <li><a href="#services" className="hover:text-medical-secondary transition-colors">Medical Services</a></li>
              <li><a href="#testimonials" className="hover:text-medical-secondary transition-colors">Patient Stories</a></li>
              <li><a href="#news" className="hover:text-medical-secondary transition-colors">Medical Insights</a></li>
              <li><a href="#contact" className="hover:text-medical-secondary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter / Contact Hint */}
          <div>
            <h4 className="font-heading font-bold text-xl mb-8">Stay Connected</h4>
            <p className="text-base text-gray-400 mb-6">Subscribe to receive health tips and updates directly from Dr. Ramdoun.</p>
            <form className="flex flex-col gap-3 max-w-xs">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border border-white/10 rounded-lg px-5 py-3 text-base text-white focus:outline-none focus:border-medical-secondary transition-colors"
              />
              <button className="bg-medical-secondary text-white text-base font-bold py-3 rounded-lg hover:bg-teal-600 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Dr. Ramdoun. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="flex items-center gap-1">Made with <Heart size={14} className="text-red-500" fill="currentColor" /> for Health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};