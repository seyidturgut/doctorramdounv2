import React, { useState, useEffect } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, User, ArrowRight } from 'lucide-react';
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
        <SectionWrapper id="blog" bg="gray">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-medical-primary mb-4">
                    {language === 'ar' ? 'المقالات الطبية' : 'Medical Insights'}
                </h2>
                <div className="w-24 h-1.5 bg-medical-secondary mx-auto rounded-full"></div>
            </div>

            {/* Grid Layout for Top 3 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visiblePosts.map((post) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full border border-gray-100"
                    >
                        {/* Image */}
                        <div className="h-56 overflow-hidden relative group cursor-pointer" onClick={() => handleExpand(post)}>
                            {post.localImage ? (
                                <img
                                    src={post.localImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full bg-medical-primary/5 flex items-center justify-center">
                                    <span className="text-medical-primary opacity-30 font-bold text-xl">Dr. Ramdoun</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <span className="text-white font-bold text-sm bg-medical-secondary/90 px-4 py-1.5 rounded-full backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    {language === 'ar' ? 'اقرأ المقال' : 'Read Article'}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-medical-secondary" />
                                    <span>{new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </div>

                            <h3
                                className="text-lg font-bold font-heading text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-medical-primary transition-colors cursor-pointer"
                                onClick={() => handleExpand(post)}
                            >
                                {post.title}
                            </h3>

                            <div
                                className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: post.content.split('</p>')[0] + '</p>' }}
                            />

                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                <button
                                    onClick={() => handleExpand(post)}
                                    className="inline-flex items-center gap-2 text-medical-primary font-bold text-sm hover:text-medical-secondary transition-colors group/btn"
                                >
                                    {language === 'ar' ? 'اقرأ المزيد' : 'Read Article'}
                                    <ArrowRight size={16} className={`transition-transform ${language === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onOpenBio(); }}
                                    className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-medical-secondary transition-colors"
                                >
                                    <User size={14} />
                                    <span>{language === 'ar' ? 'د. رمدون' : 'Dr. Ramdoun'}</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
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
                                <XIcon size={24} />
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

// Helper for Close Icon
const XIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
