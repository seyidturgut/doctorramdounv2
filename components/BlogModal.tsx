import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, ExternalLink, MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { MedicalInsightSummary } from '../src/data/medicalInsights.generated';

interface BlogModalProps {
  isOpen: boolean;
  post: MedicalInsightSummary | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ isOpen, post, onClose }) => {
  const { language, dir, t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  const publishedDate = new Date(post.publishedAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[160] flex items-center justify-center p-0 md:p-6" dir={dir}>
        <motion.button
          type="button"
          aria-label="Close blog detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-medical-primary/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="relative z-10 flex h-full w-full max-w-5xl flex-col overflow-hidden bg-white shadow-2xl md:h-auto md:max-h-[92vh] md:rounded-[2rem]"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-black/10 p-2 text-white backdrop-blur md:right-6 md:top-6 md:bg-white md:text-slate-700 rtl:right-auto rtl:left-4 md:rtl:left-6"
          >
            <X size={22} />
          </button>

          <div className="relative h-64 shrink-0 bg-medical-primary md:h-[340px]">
            <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-medical-primary via-medical-primary/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
                <Calendar size={12} />
                <span>{publishedDate}</span>
              </div>
              <h2 className="max-w-3xl text-2xl font-bold leading-tight md:text-4xl">{post.title}</h2>
              <p className="mt-3 max-w-2xl text-sm text-white/85 md:text-base">{post.excerpt}</p>
            </div>
          </div>

          <div className="overflow-y-auto px-5 py-6 md:px-8 md:py-8">
            <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
              <a
                href={post.canonicalPath}
                className="inline-flex items-center gap-2 text-sm font-bold text-medical-secondary transition-colors hover:text-medical-primary"
              >
                <ExternalLink size={16} />
                <span>{language === 'ar' ? 'افتح الصفحة الكاملة' : 'Open full article page'}</span>
              </a>

              <button
                onClick={() => window.open('https://wa.me/905539362222', '_blank')}
                className="inline-flex items-center gap-2 text-sm font-bold text-medical-primary transition-colors hover:text-medical-secondary"
              >
                <MessageCircle size={16} />
                <span>{t.blog_section?.btn_ask || 'Ask a Question'}</span>
                <ArrowRight size={14} className={language === 'ar' ? 'rotate-180' : ''} />
              </button>
            </div>

            <article
              className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-medical-primary prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-medical-secondary"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
