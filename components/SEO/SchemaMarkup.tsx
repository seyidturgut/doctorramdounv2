import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export const SchemaMarkup: React.FC = () => {
    const { language, t } = useLanguage();

    const baseUrl = 'https://doctorramdoun.com';
    const logoUrl = `${baseUrl}/doctorramdoun-logo.svg`;
    const doctorImage = `${baseUrl}/dr-ramdoun-final.webp`;

    // 1. MedicalOrganization Schema
    const medicalOrgSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization', // Specific type for clinics
        '@id': `${baseUrl}/#organization`,
        name: 'Dr. Ramdoun - Expert Physiotherapy & Rehab Center',
        alternateName: language === 'ar' ? 'Dr. Ramdoun - Physiotherapy & Rehabilitation' : 'Dr. Ramdoun Clinic',
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
            streetAddress: 'Ataköy 7-8-9-10. Kısım Mah. Çobançeşme E-5 Yan Yol Cad., Ataköy Towers B Blok No: 20/1, İç Kapı No: 110',
            addressLocality: 'Bakırköy',
            addressRegion: 'Istanbul',
            postalCode: '34158',
            addressCountry: 'TR'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '40.9888', // Approximation based on location
            longitude: '28.8344'
        },
        telephone: '+905539362222',
        email: 'info@doctorramdoun.com',
        priceRange: '$$',
        medicalSpecialty: [
            'Physiotherapy',
            'Neurological Rehabilitation',
            'Orthopedic Rehabilitation',
            'Deep Brain Stimulation (DBS) Support'
        ],
        availableService: [
            {
                '@type': 'MedicalTherapy',
                name: 'Neurological Rehabilitation'
            },
            {
                '@type': 'MedicalTherapy',
                name: 'Orthopedic Rehabilitation'
            },
            {
                '@type': 'MedicalTherapy',
                name: 'Manual Therapy'
            }
        ],
        sameAs: [
            'https://www.facebook.com/Dr.Ramdoun',
            'https://www.instagram.com/dr.ramdoun',
            'https://www.youtube.com/@DrRamdoun'
        ]
    };

    // 2. Physician Schema
    const physicianSchema = {
        '@context': 'https://schema.org',
        '@type': 'Physician',
        '@id': `${baseUrl}/#physician`,
        name: 'Dr. Ramdoun',
        url: `${baseUrl}/#profile`,
        image: doctorImage,
        medicalSpecialty: 'Physiotherapy',
        worksFor: {
            '@id': `${baseUrl}/#organization`
        },
        knowsLanguage: ['English', 'Arabic', 'Turkish']
    };

    // 3. WebPage Schema
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
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([medicalOrgSchema, physicianSchema, webPageSchema]) }}
            />
        </head>
    );
};
