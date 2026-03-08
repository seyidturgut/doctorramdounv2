export type SitePageLocale = 'en' | 'ar';

export interface SitePageSummary {
  title: string;
  slug: string;
  locale: SitePageLocale;
  canonicalPath: string;
  translationKey: string;
  metaTitle: string;
  metaDescription: string;
  schemaType: string;
}

export const sitePages: SitePageSummary[] = [
  {
    "title": "العلاج الطبيعي وإعادة التأهيل المتخصص في تركيا",
    "slug": "home",
    "locale": "ar",
    "canonicalPath": "/ar/",
    "translationKey": "home",
    "metaTitle": "د. عبدالعليم رمضون | العلاج الطبيعي وإعادة التأهيل في تركيا",
    "metaDescription": "د. عبدالعليم رمضون يقدم العلاج الطبيعي وإعادة التأهيل في تركيا للمرضى الدوليين، مع دعم متكامل وخطط علاج شخصية للتأهيل العصبي والعظمي في إسطنبول.",
    "schemaType": "MedicalWebPage"
  },
  {
    "title": "Expert Physiotherapy and Rehabilitation in Turkey",
    "slug": "home",
    "locale": "en",
    "canonicalPath": "/en/",
    "translationKey": "home",
    "metaTitle": "Physiotherapy & Rehabilitation in Turkey | Dr. Abdulalim Ramdoun",
    "metaDescription": "Explore expert physiotherapy and rehabilitation in Turkey with Dr. Abdulalim Ramdoun. International patient support, neurological rehab, orthopedic rehab and advanced care planning.",
    "schemaType": "MedicalWebPage"
  },
  {
    "title": "من هو د. عبدالعليم رمضون",
    "slug": "about",
    "locale": "ar",
    "canonicalPath": "/ar/about/",
    "translationKey": "about",
    "metaTitle": "د. عبدالعليم رمضون | أخصائي إعادة التأهيل في تركيا",
    "metaDescription": "تعرّف على د. عبدالعليم رمضون وخبرته في العلاج الطبيعي وإعادة التأهيل في تركيا، ونهجه القائم على الرعاية الشخصية والتخطيط الدقيق لعلاج المرضى الدوليين.",
    "schemaType": "AboutPage"
  },
  {
    "title": "About Dr. Abdulalim Ramdoun",
    "slug": "about",
    "locale": "en",
    "canonicalPath": "/en/about/",
    "translationKey": "about",
    "metaTitle": "About Dr. Abdulalim Ramdoun | Rehabilitation Specialist in Turkey",
    "metaDescription": "Learn about Dr. Abdulalim Ramdoun, his rehabilitation philosophy, international patient experience, and patient-centered approach to physiotherapy and recovery planning.",
    "schemaType": "AboutPage"
  },
  {
    "title": "خدمات إعادة التأهيل في تركيا",
    "slug": "services",
    "locale": "ar",
    "canonicalPath": "/ar/services/",
    "translationKey": "services",
    "metaTitle": "خدمات إعادة التأهيل في تركيا | التأهيل العصبي والعظمي",
    "metaDescription": "اكتشف خدمات إعادة التأهيل في تركيا، بما يشمل التأهيل العصبي والعظمي والعلاج اليدوي ودعم تحفيز الدماغ العميق والتحفيز الشوكي والدعم النفسي.",
    "schemaType": "CollectionPage"
  },
  {
    "title": "Rehabilitation Services in Turkey",
    "slug": "services",
    "locale": "en",
    "canonicalPath": "/en/services/",
    "translationKey": "services",
    "metaTitle": "Rehabilitation Services in Turkey | Neurological and Orthopedic Care",
    "metaDescription": "Explore rehabilitation services in Turkey including neurological rehab, orthopedic rehab, manual therapy, DBS support, spinal stimulation support and psychological guidance.",
    "schemaType": "CollectionPage"
  },
  {
    "title": "الأسئلة الشائعة",
    "slug": "faq",
    "locale": "ar",
    "canonicalPath": "/ar/faq/",
    "translationKey": "faq",
    "metaTitle": "الأسئلة الشائعة للمرضى الدوليين في إعادة التأهيل بتركيا",
    "metaDescription": "اطلع على الأسئلة الشائعة حول إعادة التأهيل في تركيا، ودعم المرضى الدوليين، والإقامة، والتأمين، والمساعدة اللغوية، والمتابعة بعد العلاج.",
    "schemaType": "FAQPage"
  },
  {
    "title": "Frequently Asked Questions",
    "slug": "faq",
    "locale": "en",
    "canonicalPath": "/en/faq/",
    "translationKey": "faq",
    "metaTitle": "FAQ for International Rehabilitation Patients in Turkey",
    "metaDescription": "Read frequently asked questions about rehabilitation treatment in Turkey, international patient support, accommodation, insurance, language assistance and follow-up care.",
    "schemaType": "FAQPage"
  },
  {
    "title": "تواصل مع د. عبدالعليم رمضون",
    "slug": "contact",
    "locale": "ar",
    "canonicalPath": "/ar/contact/",
    "translationKey": "contact",
    "metaTitle": "د. عبدالعليم رمضون | تواصل ودعم المرضى الدوليين",
    "metaDescription": "تواصل مع د. عبدالعليم رمضون في إسطنبول، تركيا، للتخطيط لعلاج إعادة التأهيل عبر واتساب أو الهاتف أو البريد الإلكتروني مع دعم كامل للمرضى الدوليين.",
    "schemaType": "ContactPage"
  },
  {
    "title": "Contact Dr. Abdulalim Ramdoun",
    "slug": "contact",
    "locale": "en",
    "canonicalPath": "/en/contact/",
    "translationKey": "contact",
    "metaTitle": "Contact Dr. Abdulalim Ramdoun | International Patient Support",
    "metaDescription": "Contact Dr. Abdulalim Ramdoun for rehabilitation treatment planning in Turkey. Reach the team via WhatsApp, phone, or email for international patient coordination.",
    "schemaType": "ContactPage"
  },
  {
    "title": "المقالات الطبية",
    "slug": "medical-insights",
    "locale": "ar",
    "canonicalPath": "/ar/medical-insights/",
    "translationKey": "medical-insights",
    "metaTitle": "المقالات الطبية | مقالات إعادة التأهيل باللغة العربية",
    "metaDescription": "تصفح المقالات الطبية العربية حول إعادة التأهيل والرعاية العصبية والتعافي العظمي والموضوعات العلاجية المتقدمة للمرضى الدوليين.",
    "schemaType": "Blog"
  },
  {
    "title": "Medical Insights",
    "slug": "medical-insights",
    "locale": "en",
    "canonicalPath": "/en/medical-insights/",
    "translationKey": "medical-insights",
    "metaTitle": "Medical Insights | Rehabilitation Articles in English",
    "metaDescription": "Browse English medical insight articles covering rehabilitation, neurological care, orthopedic recovery and advanced treatment topics for international patients.",
    "schemaType": "Blog"
  }
];
