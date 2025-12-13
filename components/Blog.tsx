import React, { useState, useEffect } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, User, ArrowRight, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import blogPostsRaw from '../src/data/blog-posts.json';

// Type definition for blog posts
interface BlogPost {
    id: string;
    title: string;
    content: string;
    date: string;
    language: string;
    slug: string;
    originalImageUrl: string | null;
    localImage: string | null;
}

const blogPosts = blogPostsRaw as BlogPost[];

interface BlogProps {
    onOpenBio: () => void;
    activePost?: BlogPost | null;
    onPostChange?: (post: BlogPost | null) => void;
}

export const Blog: React.FC<BlogProps> = ({ onOpenBio, activePost, onPostChange }) => {
    const { language, t, dir } = useLanguage();
    const [localExpandedId, setLocalExpandedId] = useState<string | null>(null);

    // Sync prop with local state or vice versa
    useEffect(() => {
        if (activePost) {
            setLocalExpandedId(activePost.id);
        } else {
            setLocalExpandedId(null);
        }
    }, [activePost]);

    const handleExpand = (post: BlogPost) => {
        setLocalExpandedId(post.id);
        if (onPostChange) onPostChange(post);
    };

    const handleClose = () => {
        setLocalExpandedId(null);
        if (onPostChange) onPostChange(null);
    };

    // Filter posts by current language
    const filteredPosts = blogPosts.filter(post => post.language === language);
    const expandedPost = localExpandedId ? filteredPosts.find(p => p.id === localExpandedId) : (activePost?.language === language ? activePost : null);

    if (filteredPosts.length === 0) return null;

    const visiblePosts = filteredPosts.slice(0, 3);
    const hiddenPosts = filteredPosts.slice(3);

    return (
        <SectionWrapper id="blog" bg="gray" className="py-20">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-800 mb-2 opacity-90">
                    {t.blog_section?.title || (language === 'ar' ? 'المقالات الطبية' : 'Medical Insights')}
                </h2>
                <div className="w-16 h-1 bg-gray-300 mx-auto rounded-full"></div>
            </div>

            {/* Grid Layout (Simplified Cards) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {visiblePosts.map((post) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group cursor-pointer"
                        onClick={() => handleExpand(post)}
                    >
                        {/* Image (Muted until hover) */}
                        <div className="h-48 overflow-hidden relative">
                            {post.localImage ? (
                                <img
                                    src={post.localImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-all duration-700 opacity-90 group-hover:opacity-100 group-hover:scale-105"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                    <span className="text-slate-300 font-bold">Dr. Ramdoun</span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                <Calendar size={12} className="text-gray-400" />
                                <span>{new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>

                            <h3 className="text-base font-bold font-heading text-slate-800 mb-2 line-clamp-2 leading-tight group-hover:text-medical-secondary transition-colors">
                                {post.title}
                            </h3>

                            <div
                                className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2"
                                dangerouslySetInnerHTML={{ __html: post.content.split('</p>')[0] + '</p>' }}
                            />

                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                <span className="text-xs font-bold text-medical-primary group-hover:text-medical-secondary transition-colors inline-flex items-center gap-1">
                                    {t.blog_section?.read_more || 'Read Article'}
                                    <ArrowRight size={12} className={`transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Soft CTA Block */}
            <div className="max-w-3xl mx-auto mt-12 bg-white rounded-xl border border-medical-secondary/20 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-medical-secondary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="text-medical-secondary w-6 h-6" />
                </div>
                <div className="text-center md:text-start flex-grow">
                    <p className="text-slate-700 font-medium text-lg">
                        {t.blog_section?.soft_cta || "Have questions about these conditions?"}
                    </p>
                </div>
                <button
                    onClick={() => window.open('https://wa.me/905539362222', '_blank')}
                    className="inline-flex items-center gap-2 text-medical-secondary font-bold hover:text-medical-primary transition-colors whitespace-nowrap"
                >
                    {t.blog_section?.btn_ask || "Ask a Question"}
                    <ArrowRight size={18} className={language === 'ar' ? 'rotate-180' : ''} />
                </button>
            </div>

            {/* Hidden Posts for SEO */}
            <div className="hidden">
                {hiddenPosts.map(post => (
                    <article key={post.id} itemScope itemType="http://schema.org/BlogPosting">
                        <h2 itemProp="headline">{post.title}</h2>
                        <div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.content }} />
                        <time itemProp="datePublished" dateTime={post.date}>{post.date}</time>
                        <span itemProp="author" itemScope itemType="http://schema.org/Person">
                            <span itemProp="name">Dr. Abdulalim Ramdoun</span>
                        </span>
                    </article>
                ))}
            </div>

            {/* Full Post Modal */}
            <AnimatePresence>
                {expandedPost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-sm"
                        onClick={handleClose}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-4xl h-full md:h-[90vh] md:rounded-2xl shadow-2xl overflow-hidden relative flex flex-col"
                            dir={dir}
                        >
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur rounded-full text-slate-900 hover:bg-slate-100 transition-colors shadow-sm rtl:right-auto rtl:left-4"
                            >
                                <X size={24} />
                            </button>
                            {/* ... Modal Content Reuse ... */}
                            <div className="overflow-y-auto h-full customs-scroll">
                                {expandedPost?.localImage && (
                                    <div className="w-full h-64 md:h-80 relative">
                                        <img
                                            src={expandedPost.localImage}
                                            alt="Article Cover"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 right-6 text-white rtl:text-right">
                                            <div className="flex items-center gap-4 text-sm font-medium mb-2 opacity-90">
                                                <span className="bg-medical-secondary px-3 py-1 rounded-full text-white text-xs font-bold">
                                                    {language === 'ar' ? 'طب وصحة' : 'Medical & Health'}
                                                </span>
                                                <span>
                                                    {new Date(expandedPost.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl md:text-4xl font-bold font-heading leading-tight shadow-sm">
                                                {expandedPost.title}
                                            </h2>
                                        </div>
                                    </div>
                                )}
                                <div className="p-6 md:p-10 lg:p-12">
                                    {/* Author Bar */}
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border-2 border-medical-secondary/20">
                                                <img src="/favicon.png" alt="Author" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{language === 'ar' ? 'كتب بواسطة' : 'Written by'}</p>
                                                <button onClick={() => { handleClose(); onOpenBio(); }} className="text-medical-primary font-bold hover:text-medical-secondary transition-colors text-sm">
                                                    {language === 'ar' ? 'د. عبد العليم رمضان' : 'Dr. Abdulalim Ramdoun'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-medical-primary prose-a:text-medical-secondary hover:prose-a:text-medical-primary prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8 prose-li:marker:text-medical-secondary prose-strong:text-medical-primary prose-strong:font-bold prose-blockquote:border-l-4 prose-blockquote:border-medical-secondary prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg" dangerouslySetInnerHTML={{ __html: expandedPost.content }} />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper >
    );
};
