import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

// --- Translations ---
const translations = {
  en: {
    seo: {
      title: "Dr. Ramdoun | Expert Physiotherapy & Rehabilitation in Turkey",
      description: "Expert medical rehabilitation in Istanbul by Dr. Ramdoun. Specialized stroke, neuro & orthopedic physical therapy for international patients."
    },
    nav: {
      about: "About",
      services: "Services",
      process: "Process",
      stories: "Stories",
      faq: "FAQ",
      contact: "Contact",
      whatsapp: "WhatsApp",
      ready: "Ready to start your journey?",
      chat: "Chat via WhatsApp"
    },
    hero: {
      eyebrow: {
        patients: "International Patients",
        clinic: "Top Rated Clinic"
      },
      title_start: "World-Class",
      title_highlight: "Physiotherapy",
      title_end: "& Rehab",
      description: "Expert guidance in neurological and orthopedic rehabilitation, with facilitation of Deep Brain Stimulation (DBS) for Parkinson’s disease, smart spinal cord stimulation, baclofen pump therapy, psychological support, and general medical consultations.",
      tagline: "Personalized care. Advanced solutions. Compassionate guidance.",
      cta_whatsapp: "WhatsApp",
      cta_assess: "Quick Check",
      badges: {
        support: "24/7 Medical Support",
        language: "English & Arabic Speaking",
        accredited: "JCI Accredited Partners"
      },
      fast_response: "Fast response",
      consultation: "Online Consultation",
      agent_name: "Patient Coordinator",
      agent_status: "Online Now",
      agent_msg: "Hi! I can help with treatment prices and travel plans to Turkey."
    },
    services: {
      heading: "Specialized Therapy",
      subheading: "Expert rehabilitation programs tailored to your needs.",
      items: [
        {
          title: 'Neurological Rehab',
          subtitle: 'Stroke & Spinal Recovery',
          benefits: ['Robotic-Assisted Therapy', 'Motor Function Recovery'],
          note: 'Specialized Team',
        },
        {
          title: 'Orthopedic Rehab',
          subtitle: 'Post-Op & Sports Injury',
          benefits: ['Joint Mobilization', 'Performance Return'],
          note: 'Personalized',
        },
        {
          title: 'Manual Therapy',
          subtitle: 'Spine Care & Pain Relief',
          benefits: ['Myofascial Release', 'Chronic Pain Mgmt'],
          note: 'Fast Relief',
        },
      ],
      chat_btn: "Chat Now"
    },
    assessment: {
      badge: "AI-Powered Check",
      trigger_title: "Not sure about your treatment?",
      trigger_desc: "Answer 4 quick questions. Get a preliminary profile to share with Dr. Ramdoun for a faster diagnosis.",
      btn_start: "Start Assessment",
      btn_back: "Back to Home",
      step: "Question",
      done: "Done",
      questions: [
        {
          question: "What is your primary concern?",
          options: ["Stroke / Neuro Issue", "Orthopedic / Joint Pain", "Spinal Cord Injury", "Post-Surgery Recovery", "Sports Injury"]
        },
        {
          question: "Duration of symptoms?",
          options: ["Less than 1 month", "1 - 6 months", "6 months - 1 year", "More than 1 year"]
        },
        {
          question: "Current mobility level?",
          options: ["Fully Independent", "Needs Assistance (Cane/Walker)", "Wheelchair bound", "Bedridden"]
        },
        {
          question: "Main treatment goal?",
          options: ["Pain Relief", "Walking Again", "Daily Independence", "Avoiding Surgery"]
        }
      ],
      result_title: "Profile Ready!",
      result_desc: "Review your answers below. Send this summary to our team for a fast pre-diagnosis.",
      summary_title: "Assessment Summary",
      btn_send: "Send via WhatsApp",
      btn_retake: "Retake Assessment",
      quote_badge: "Expert Review",
      quote: "A correct diagnosis is the first step towards a full recovery."
    },
    process: {
      title: "Your Journey to Recovery",
      description: "We handle every detail of your medical trip, so you can focus entirely on getting better. Here is how it works.",
      steps: [
        { title: "Initial Consultation", desc: "Contact us via WhatsApp. Share your medical reports and get a preliminary assessment from Dr. Ramdoun within 24 hours." },
        { title: "Personalized Plan", desc: "We design your treatment plan, arrange your VIP airport transfer, and book your 5-star hotel accommodation." },
        { title: "Treatment in Türkiye", desc: "Arrive in Istanbul. Our coordinator greets you. Your treatment is performed in our JCI-accredited facility." },
        { title: "Recovery & Follow-up", desc: "After a successful procedure, return home safely. We provide lifetime follow-up support to monitor your progress." }
      ],
      cta_title: "Ready to start?",
      cta_desc: "The first step is complimentary. Send us a message to discuss your condition.",
      cta_btn: "Start Consultation"
    },
    profile: {
      eyebrow: "Meet Your Specialist",
      name: "Dr. Abdulalim Ramdoun",
      bio_short_1: "With over 10 years of experience in internal medicine and a specialization in preventive cardiology and rehabilitation, Dr. Ramdoun has dedicated his life to improving patient outcomes.",
      bio_short_2: "He serves as a visiting consultant at top international hospitals and leads with a vision of blending compassion with cutting-edge medical technology.",
      stats: { exp: "Years Exp.", proc: "Procedures", awards: "Awards" },
      btn_bio: "Read Full Bio",
      modal: {
        badge: "10+ Years Experience",
        title: "Expert Care. Trusted Guidance. Global Reach.",
        intro: "General practitioner with over 10 years of experience in treating neurological injuries and providing physiotherapy rehabilitation in Türkiye.",
        p1: "At Doctor Ramdoun, we bring together a global network of experienced and compassionate medical professionals dedicated to your well-being. Whether you’re seeking a second opinion, a diagnosis review, or guidance on advanced treatment options, our team is here to support you every step of the way.",
        p2: "We offer a wide range of services — from general consultations to specialized medical advice across various fields — ensuring that every patient receives a tailored care plan based on the latest global standards.",
        bullets: ["Internationally certified medical experts", "Accurate, timely, and confidential evaluations", "Personalized, patient-centered approach"],
        mission_title: "Our Mission",
        mission_desc: "Our mission is to empower individuals to make informed medical decisions by providing trusted second opinions, expert treatment recommendations, and personalized care plans.",
        team_title: "Our Team",
        team_desc: "Our team consists of experienced physicians, consultants, and healthcare professionals affiliated with leading international medical centers.",
        footer_quote: "Your health deserves the best.",
        btn_start: "Start Your Journey"
      }
    },
    faq: {
      badge: "Support Center",
      title: "Frequently Asked Questions",
      desc: "Can't find the answer you're looking for? Chat with our team directly.",
      ask_btn: "Ask on WhatsApp",
      items: [
        { q: "Do you provide airport pickup and accommodation?", a: "Yes, absolutely. Our VIP International Patient package includes luxury airport transfers and discounted rates at 5-star partner hotels." },
        { q: "How soon can I start treatment after arriving?", a: "Typically, you will have your initial consultation with Dr. Ramdoun on the day of your arrival or the very next morning." },
        { q: "Do you accept international insurance?", a: "We work with many international insurance providers. Please share your policy details with our coordinators via WhatsApp." },
        { q: "Is there a language barrier?", a: "Not at all. Our team speaks fluent English, Arabic, and Turkish. We also provide personal translators." },
        { q: "What if I need follow-up care after returning home?", a: "We provide lifetime digital follow-up. You can schedule video calls with Dr. Ramdoun to monitor your progress." }
      ]
    },
    contact: {
      title: "Contact Me",
      desc: "I understand you may have many questions. My team and I are ready to answer them via WhatsApp or call instantly.",
      email: "Email",
      hours_title: "Online Consultation Hours",
      hours_val: "Mon - Sat: 8:00 AM - 8:00 PM",
      hours_note: "24/7 WhatsApp Support for Emergencies",
      instant_title: "Instant Connection",
      instant_desc: "Skip the forms. Talk to my patient coordinator right now.",
      btn_wa: "Chat on WhatsApp",
      wa_note: "Average response: 5 mins",
      btn_call: "Call Directly",
      footer_note: "Our international patient coordinators speak English, Arabic, and Turkish. We are ready to assist with your travel plans."
    },
    footer: {
      desc: "Together Toward Better Health. I am committed to providing world-class medical care with a focus on your safety, comfort, and sustainable recovery.",
      menu: "Menu",
      connect: "Stay Connected",
      subscribe_desc: "Subscribe to receive health tips and updates directly from Dr. Ramdoun.",
      btn_sub: "Subscribe",
      rights: "Dr. Ramdoun. All rights reserved.",
      made_with: "Made with"
    }
  },
  ar: {
    seo: {
      title: "د. رمدون | العلاج الطبيعي وإعادة التأهيل المتخصص في تركيا",
      description: "إعادة تأهيل طبي خبير في إسطنبول مع د. رمدون. علاج طبيعي متخصص للجلطات، الأعصاب والعظام للمرضى الدوليين."
    },
    nav: {
      about: "من نحن",
      services: "الخدمات",
      process: "العملية",
      stories: "قصص نجاح",
      faq: "الأسئلة",
      contact: "اتصل بنا",
      whatsapp: "واتساب",
      ready: "هل أنت مستعد لبدء رحلتك؟",
      chat: "دردشة عبر واتساب"
    },
    hero: {
      eyebrow: {
        patients: "المرضى الدوليين",
        clinic: "عيادة مصنفة عالمياً"
      },
      title_start: "مستوى عالمي في",
      title_highlight: "العلاج الطبيعي",
      title_end: "وإعادة التأهيل في تركيا",
      description: "توجيه خبير في إعادة التأهيل العصبي والعظمي، مع تسهيل التحفيز العميق للدماغ (DBS) لمرض باركنسون، وتحفيز الحبل الشوكي الذكي، وعلاج مضخة باكلوفين، والدعم النفسي، والاستشارات الطبية العامة.",
      tagline: "رعاية شخصية. حلول متقدمة. توجيه رحيم.",
      cta_whatsapp: "دردشة عبر واتساب",
      cta_assess: "ابدأ التقييم المجاني",
      badges: {
        support: "دعم طبي 24/7",
        language: "نتحدث العربية والإنجليزية",
        accredited: "شركاء معتمدون من JCI"
      },
      fast_response: "رد سريع",
      consultation: "استشارة مجانية عبر الإنترنت",
      agent_name: "منسق المرضى",
      agent_status: "متصل الآن",
      agent_msg: "مرحبا! يمكنني المساعدة في أسعار العلاج وخطط السفر إلى تركيا."
    },
    services: {
      heading: "العلاجات المتخصصة",
      subheading: "برامج إعادة تأهيل مصممة خصيصاً لاحتياجاتك.",
      items: [
        {
          title: 'إعادة التأهيل العصبي',
          subtitle: 'التعافي من الجلطات والعمود الفقري',
          benefits: ['علاج بمساعدة الروبوت', 'استعادة الوظائف الحركية'],
          note: 'فريق متخصص',
        },
        {
          title: 'إعادة التأهيل العظمي',
          subtitle: 'بعد الجراحة والإصابات الرياضية',
          benefits: ['تحريك المفاصل', 'استعادة الأداء'],
          note: 'رعاية شخصية',
        },
        {
          title: 'العلاج اليدوي',
          subtitle: 'رعاية العمود الفقري وتخفيف الألم',
          benefits: ['تحرير اللفافة العضلية', 'إدارة الألم المزمن'],
          note: 'راحة سريعة',
        },
      ],
      chat_btn: "ابدأ المحادثة"
    },
    assessment: {
      badge: "مدعوم بالذكاء الاصطناعي",
      trigger_title: "غير متأكد من علاجك؟",
      trigger_desc: "أجب عن 4 أسئلة سريعة. احصل على ملف تعريف أولي لمشاركته مع د. رمدون لتشخيص أسرع.",
      btn_start: "ابدأ التقييم",
      btn_back: "العودة للرئيسية",
      step: "سؤال",
      done: "تم",
      questions: [
        {
          question: "ما هو قلقك الأساسي؟",
          options: ["جلطة / مشكلة عصبية", "عظام / ألم مفاصل", "إصابة الحبل الشوكي", "تعافي ما بعد الجراحة", "إصابة رياضية"]
        },
        {
          question: "مدة الأعراض؟",
          options: ["أقل من شهر", "1 - 6 أشهر", "6 أشهر - سنة", "أكثر من سنة"]
        },
        {
          question: "مستوى الحركة الحالي؟",
          options: ["مستقل تماماً", "يحتاج مساعدة (عكاز/مشاية)", "على كرسي متحرك", "طريح الفراش"]
        },
        {
          question: "هدف العلاج الرئيسي؟",
          options: ["تخفيف الألم", "المشي مجدداً", "الاستقلالية اليومية", "تجنب الجراحة"]
        }
      ],
      result_title: "الملف جاهز!",
      result_desc: "راجع إجاباتك أدناه. أرسل هذا الملخص لفريقنا للحصول على تشخيص أولي سريع.",
      summary_title: "ملخص التقييم",
      btn_send: "إرسال عبر واتساب",
      btn_retake: "إعادة التقييم",
      quote_badge: "مراجعة خبير",
      quote: "التشخيص الصحيح هو الخطوة الأولى نحو الشفاء التام."
    },
    process: {
      title: "رحلتك للشفاء",
      description: "نتولى كل تفاصيل رحلتك الطبية، لتركز بالكامل على التحسن. هكذا تتم العملية.",
      steps: [
        { title: "استشارة مجانية", desc: "تواصل معنا عبر واتساب. شارك تقاريرك الطبية واحصل على تقييم أولي من د. رمدون خلال 24 ساعة." },
        { title: "خطة مخصصة", desc: "نصمم خطة علاجك، ونرتب نقلك من المطار بسيارة VIP، ونحجز إقامتك في فندق 5 نجوم." },
        { title: "العلاج في تركيا", desc: "الوصول إلى إسطنبول. يستقبلك منسقنا. يتم إجراء علاجك في منشأتنا المعتمدة من JCI." },
        { title: "التعافي والمتابعة", desc: "بعد إجراء ناجح، تعود للمنزل بأمان. نوفر دعماً للمتابعة مدى الحياة لمراقبة تقدمك." }
      ],
      cta_title: "مستعد للبدء؟",
      cta_desc: "الخطوة الأولى مجانية تماماً. أرسل لنا رسالة لمناقشة حالتك.",
      cta_btn: "ابدأ استشارة مجانية"
    },
    profile: {
      eyebrow: "تعرف على طبيبك",
      name: "د. عبد العليم رمدون",
      bio_short_1: "مع أكثر من 10 سنوات من الخبرة في الطب الباطني وتخصص في أمراض القلب الوقائية وإعادة التأهيل، كرس د. رمدون حياته لتحسين نتائج المرضى.",
      bio_short_2: "يعمل كمستشار زائر في أفضل المستشفيات الدولية ويقود برؤية تمزج الرحمة مع أحدث التقنيات الطبية.",
      stats: { exp: "سنوات خبرة", proc: "إجراء", awards: "جائزة" },
      btn_bio: "اقرأ السيرة الذاتية",
      modal: {
        badge: "خبرة 10+ سنوات",
        title: "رعاية خبيرة. توجيه موثوق. وصول عالمي.",
        intro: "طبيب عام يتمتع بخبرة تزيد عن 10 سنوات في علاج الإصابات العصبية وتقديم العلاج الطبيعي في تركيا.",
        p1: "في دكتور رمدون، نجمع شبكة عالمية من المهنيين الطبيين ذوي الخبرة والرحمة المكرسين لرفاهيتك. سواء كنت تبحث عن رأي ثانٍ، أو مراجعة تشخيص، أو توجيه حول خيارات العلاج المتقدمة، فريقنا هنا لدعمك في كل خطوة.",
        p2: "نقدم مجموعة واسعة من الخدمات - من الاستشارات العامة إلى النصائح الطبية المتخصصة في مختلف المجالات - لضمان حصول كل مريض على خطة رعاية مصممة خصيصاً بناءً على أحدث المعايير العالمية.",
        bullets: ["خبراء طبيون معتمدون دولياً", "تقييمات دقيقة وفي الوقت المناسب وسرية", "نهج شخصي يركز على المريض"],
        mission_title: "مهمتنا",
        mission_desc: "مهمتنا هي تمكين الأفراد من اتخاذ قرارات طبية مستنيرة من خلال تقديم آراء ثانية موثوقة، وتوصيات علاجية خبيرة، وخطط رعاية شخصية.",
        team_title: "فريقنا",
        team_desc: "يتكون فريقنا من أطباء واستشاريين ومتخصصين في الرعاية الصحية ذوي خبرة تابعين لمراكز طبية دولية رائدة.",
        footer_quote: "صحتك تستحق الأفضل.",
        btn_start: "ابدأ رحلتك"
      }
    },
    faq: {
      badge: "مركز الدعم",
      title: "الأسئلة الشائعة",
      desc: "لا تجد الإجابة التي تبحث عنها؟ تحدث مع فريقنا مباشرة.",
      ask_btn: "اسأل عبر واتساب",
      items: [
        { q: "هل توفرون استقبال من المطار وإقامة؟", a: "نعم، بالتأكيد. تشمل باقة المرضى الدوليين VIP نقل مطار فاخر وأسعار مخفضة في فنادق 5 نجوم شريكة." },
        { q: "متى يمكنني بدء العلاج بعد الوصول؟", a: "عادة، ستكون استشارتك الأولية مع د. رمدون في يوم وصولك أو في صباح اليوم التالي مباشرة." },
        { q: "هل تقبلون التأمين الدولي؟", a: "نعمل مع العديد من مقدمي التأمين الدوليين. يرجى مشاركة تفاصيل بوليصتك مع منسقينا عبر واتساب." },
        { q: "هل يوجد حاجز لغة؟", a: "على الإطلاق. يتحدث فريقنا الإنجليزية والعربية والتركية بطلاقة. نوفر أيضاً مترجمين شخصيين." },
        { q: "ماذا لو احتجت لرعاية متابعة بعد العودة؟", a: "نوفر متابعة رقمية مدى الحياة. يمكنك جدولة مكالمات فيديو مع د. رمدون لمراقبة تقدمك." }
      ]
    },
    contact: {
      title: "تواصل معي",
      desc: "أفهم أنه قد يكون لديك العديد من الأسئلة حول علاجك أو سفرك. فريقي وأنا مستعدون للإجابة عليها عبر واتساب أو الاتصال فوراً.",
      email: "البريد الإلكتروني",
      hours_title: "ساعات الاستشارة عبر الإنترنت",
      hours_val: "الإثنين - السبت: 8:00 ص - 8:00 م",
      hours_note: "دعم واتساب 24/7 للحالات الطارئة",
      instant_title: "اتصال فوري",
      instant_desc: "تجاوز النماذج. تحدث إلى منسق المرضى الخاص بي الآن.",
      btn_wa: "دردشة عبر واتساب",
      wa_note: "متوسط الرد: 5 دقائق",
      btn_call: "اتصال مباشر",
      footer_note: "يتحدث منسقو المرضى الدوليين لدينا الإنجليزية والعربية والتركية. نحن مستعدون للمساعدة في خطط سفرك."
    },
    footer: {
      desc: "معاً نحو صحة أفضل. أنا ملتزم بتقديم رعاية طبية عالمية المستوى مع التركيز على سلامتك وراحتك وتعافيك المستدام.",
      menu: "القائمة",
      connect: "ابق على تواصل",
      subscribe_desc: "اشترك لتلقي نصائح صحية وتحديثات مباشرة من د. رمدون.",
      btn_sub: "اشترك",
      rights: "د. رمدون. جميع الحقوق محفوظة.",
      made_with: "صنع بـ"
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    // Handle Direction
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    setDir(direction);
    document.documentElement.dir = direction;
    document.documentElement.lang = language;

    // Handle Title SEO dynamically
    document.title = translations[language].seo.title;

  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
