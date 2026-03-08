import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { medicalInsights, type MedicalInsightSummary } from '../src/data/medicalInsights.generated';

export const Blog: React.FC<{ onOpenPost: (post: MedicalInsightSummary) => void }> = ({ onOpenPost }) => {
    const { language, t } = useLanguage();

    const filteredPosts = medicalInsights
        .filter((post) => post.locale === language)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    if (filteredPosts.length === 0) return null;

    const visiblePosts = filteredPosts.slice(0, 3);
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };

    return (
        <SectionWrapper id="blog" bg="gray" className="py-20">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-800 mb-2 opacity-90">
                    {t.blog_section?.title || (language === 'ar' ? 'المقالات الطبية' : 'Medical Insights')}
                </h2>
                <div className="w-16 h-1 bg-gray-300 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {visiblePosts.map((post) => (
                    <motion.a
                        key={`${post.locale}-${post.slug}`}
                        href={post.canonicalPath}
                        onClick={(event) => {
                            event.preventDefault();
                            onOpenPost(post);
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group"
                    >
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover transition-all duration-700 opacity-90 group-hover:opacity-100 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                <Calendar size={12} className="text-gray-400" />
                                <span>{new Date(post.publishedAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', dateOptions)}</span>
                            </div>

                            <h3 className="text-base font-bold font-heading text-slate-800 mb-2 line-clamp-2 leading-tight group-hover:text-medical-secondary transition-colors">
                                {post.title}
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                <span className="text-xs font-bold text-medical-primary group-hover:text-medical-secondary transition-colors inline-flex items-center gap-1">
                                    {t.blog_section?.read_more || 'Read Article'}
                                    <ArrowRight size={12} className={`transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                                </span>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>

            <div className="max-w-3xl mx-auto mt-12 bg-white rounded-xl border border-medical-secondary/20 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-medical-secondary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="text-medical-secondary w-6 h-6" />
                </div>
                <div className="text-center md:text-start flex-grow">
                    <p className="text-slate-700 font-medium text-lg">
                        {t.blog_section?.soft_cta || 'Have questions about these conditions?'}
                    </p>
                </div>
                <button
                    onClick={() => window.open('https://wa.me/905539362222', '_blank')}
                    className="inline-flex items-center gap-2 text-medical-secondary font-bold hover:text-medical-primary transition-colors whitespace-nowrap"
                >
                    {t.blog_section?.btn_ask || 'Ask a Question'}
                    <ArrowRight size={18} className={language === 'ar' ? 'rotate-180' : ''} />
                </button>
            </div>
        </SectionWrapper>
    );
};
