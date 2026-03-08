import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getCurrentSitePage, normalizePathname } from '../../src/lib/siteRouting';
import brandConfig from '../../src/config/brand.json';

export const SchemaMarkup: React.FC = () => {
    const { language, t } = useLanguage();
    const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
    const currentPage = getCurrentSitePage(pathname);
    const homepagePath = language === 'ar' ? '/ar/' : '/en/';

    if (currentPage && normalizePathname(currentPage.canonicalPath) !== normalizePathname(homepagePath)) {
        return null;
    }

    const baseUrl = 'https://doctorramdoun.com';
    const logoUrl = `${baseUrl}/doctorramdoun-logo.svg`;
    const doctorImage = `${baseUrl}/dr-ramdoun-final.webp`;
    const brandName = language === 'ar' ? brandConfig.ar : brandConfig.en;
    const organizationName = language === 'ar' ? brandConfig.organization.ar : brandConfig.organization.en;
    const organizationAlternateNames = language === 'ar'
        ? brandConfig.organizationAlternate.ar
        : brandConfig.organizationAlternate.en;
    const physicianAlternateNames = language === 'ar'
        ? [brandConfig.en, ...brandConfig.arVariants]
        : [brandConfig.ar, ...brandConfig.arVariants.slice(1)];

    const medicalOrgSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization',
        '@id': `${baseUrl}/#organization`,
        name: organizationName,
        alternateName: organizationAlternateNames,
        url: baseUrl,
        logo: {
            '@type': 'ImageObject',
            url: logoUrl,
            width: 180,
            height: 60
        },
        image: doctorImage,
        description: t.seo.description,
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Atakoy 7-8-9-10. Kisim Mah. Cobancesme E-5 Yan Yol Cad., Atakoy Towers B Blok No: 20/1, Ic Kapi No: 110',
            addressLocality: 'Bakirkoy',
            addressRegion: 'Istanbul',
            postalCode: '34158',
            addressCountry: 'TR'
        },
        telephone: '+905539362222',
        email: 'info@doctorramdoun.com',
        sameAs: brandConfig.sameAs,
        priceRange: '$$',
        medicalSpecialty: [
            'Physiotherapy',
            'Neurological Rehabilitation',
            'Orthopedic Rehabilitation',
            'Deep Brain Stimulation (DBS) Support'
        ]
    };

    const physicianSchema = {
        '@context': 'https://schema.org',
        '@type': 'Physician',
        '@id': `${baseUrl}/#physician`,
        name: brandName,
        alternateName: physicianAlternateNames,
        url: `${baseUrl}${language === 'ar' ? '/ar/#about' : '/#about'}`,
        image: doctorImage,
        medicalSpecialty: 'Physiotherapy',
        worksFor: {
            '@id': `${baseUrl}/#organization`
        },
        knowsLanguage: ['English', 'Arabic', 'Turkish'],
        sameAs: brandConfig.sameAs
    };

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        '@id': `${baseUrl}/#webpage`,
        url: baseUrl,
        name: t.seo.title,
        description: t.seo.description,
        inLanguage: language,
        primaryImageOfPage: {
            '@type': 'ImageObject',
            url: doctorImage
        },
        isPartOf: {
            '@id': `${baseUrl}/#organization`
        },
        about: {
            '@id': `${baseUrl}/#physician`
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify([medicalOrgSchema, physicianSchema, webPageSchema]) }}
        />
    );
};
