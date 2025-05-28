
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  translations: Record<string, any>;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.mission": "Mission & Vision",
    "nav.clients": "Clients",
    "nav.careers": "Careers",
    "nav.contact": "Contact Us",
    "nav.privacy": "Privacy Policy",
    
    // Home Page
    "home.hero.title": "Modern HR Solutions for Modern Business",
    "home.hero.subtitle": "Streamline your HR processes with LoginHR's comprehensive suite of tools designed for modern businesses",
    "home.hero.cta": "Discover Our Solutions",
    "home.hero.secondary": "Contact Us",
    "home.stats.title" : "LoginHR Edge",
    "home.stats.subtitle": "Trusted HR technologies designed to enhance performance and drive results.",
    "home.stats.clients": "Trusted Clients",
    "home.stats.employees": "Employees Managed",
    "home.stats.countries": "Sectors",
    "home.stats.years": "Years of Experience",
    "home.solutions.title": "HR Solutions That Work",
    "home.solutions.subtitle": "Our integrated platform handles all your HR needs, from recruitment to retirement",
    "home.testimonials.title": "What Our Clients Say",
    
    // About Page
    "about.title": "About LoginHR",
    "about.subtitle": "We are a team of HR professionals and technology experts dedicated to simplifying human resource management",
    "about.story.title": "Our Story",
    "about.story.content": "Founded in 2012, LoginHR set out to transform the way businesses handle their human resources. We identified the pain points that HR departments face daily and built solutions that address these challenges head-on.",
    "about.team.title": "Our Leadership Team",
    
    // Services Page
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive HR solutions tailored to your business needs",
    "services.recruitment.title": "Recruitment & Onboarding",
    "services.personnel.title": "Personnel Management",
    "services.personnel.description":"Streamline employee data, simplify HR tasks, and enhance workforce oversight.",
    "services.attendance.title" : "Attendance Management",
    "services.attendance.description": "Monitor work hours and attendance with ease.",
    "services.recruitment.description": "Streamline your hiring process from job posting to employee onboarding",
    "services.fleet.title": "Fleet and Accommodations",
    "services.fleet.description": "Manage employee transportation and housing efficiently, all in one place.",
    "services.payroll.title": "Payroll Management",
    "services.payroll.description": "Accurate and timely payroll processing that ensures compliance with local regulations",
    "services.performance.title": "Performance Management",
    "services.performance.description": "Set goals, track progress, and evaluate employee performance effectively",
    "services.learning.title": "Learning & Development",
    "services.learning.description": "Enhance employee skills with customized training programs",
    "services.compliance.title": "Compliance & Documentation",
    "services.compliance.description": "Stay compliant with labor laws and maintain proper documentation",
    "services.benefits.title": "Benefits Administration",
    "services.benefits.description": "Manage employee benefits efficiently and transparently",
    
    // Mission & Vision
    "mission.title": "Our Mission & Vision",
    "mission.subtitle": "Driving excellence in human resource management",
    "mission.mission.title": "Our Mission",
    "mission.mission.content": "To empower organizations with innovative HR solutions that enhance efficiency, promote employee satisfaction, and drive business growth.",
    "mission.vision.title": "Our Vision",
    "mission.vision.content": "To be the leading HR solutions provider globally, recognized for excellence in service, innovation, and customer satisfaction.",
    "mission.values.title": "Our Values",
    "mission.values.innovation": "Innovation",
    "mission.values.integrity": "Integrity",
    "mission.values.excellence": "Excellence",
    "mission.values.collaboration": "Collaboration",
    
    // Clients Page
    "clients.title": "Our Clients",
    "clients.subtitle": "Trusted by leading organizations across industries",
    "clients.categories.medical": "Medical",
    "clients.categories.factories": "Factories",
    "clients.categories.education": "Education",
    "clients.categories.retail": "Retail",
    "clients.categories.technology": "Technology",
    "clients.viewall": "View All",
    
    // Contact Page
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with our team to learn how we can help your business",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email Address",
    "contact.form.phone": "Phone Number",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.info.address": "Address",
    "contact.info.email": "Email",
    "contact.info.phone": "Phone",
    
    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.subtitle": "How we collect, use, and protect your information",
    
    // Footer
    "footer.rights": "All Rights Reserved",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.mission": "رؤيتنا ورسالتنا",
    "nav.clients": "عملاؤنا",
    "nav.careers": "الوظائف",
    "nav.contact": "اتصل بنا",
    "nav.privacy": "سياسة الخصوصية",
    
    // Home Page
    "home.hero.title": "حلول موارد بشرية حديثة للأعمال الحديثة",
    "home.hero.subtitle": "قم بتبسيط عمليات الموارد البشرية الخاصة بك من خلال مجموعة شاملة من أدوات LoginHR المصممة للشركات الحديثة",
    "home.hero.cta": "اكتشف حلولنا",
    "home.hero.secondary": "اتصل بنا",
    "home.stats.clients": "نجاحات مشتركة",
    "home.stats.employees": "موظفين تمت إدارتهم",
    "home.stats.countries": "قطاع",
    "home.stats.years": "سنوات من الخبرة",
    "home.solutions.title": "حلول موارد بشرية فعالة",
    "home.solutions.subtitle": "تتعامل منصتنا المتكاملة مع جميع احتياجات الموارد البشرية الخاصة بك، من التوظيف إلى التقاعد",
    "home.testimonials.title": "ماذا يقول عملاؤنا",
    
    // About Page
    "about.title": "عن LoginHR",
    "about.subtitle": "نحن فريق من محترفي الموارد البشرية وخبراء التكنولوجيا متخصصون في تبسيط إدارة الموارد البشرية",
    "about.story.title": "قصتنا",
    "about.story.content": "تأسست LoginHR في عام 2012، بهدف تحويل طريقة تعامل الشركات مع مواردها البشرية. حددنا نقاط الألم التي تواجهها أقسام الموارد البشرية يوميًا وبنينا حلولًا تعالج هذه التحديات مباشرة.",
    "about.team.title": "فريق القيادة لدينا",
    
    // Services Page
    "services.title": "خدماتنا",
    "services.subtitle": "حلول شاملة للموارد البشرية مصممة خصيصًا لاحتياجات عملك",
    "services.recruitment.title": "التوظيف والتعيين",
    "services.attendance.title": "تتبع الحضور والإنصراف",
    "services.recruitment.description": "تبسيط عملية التوظيف من نشر الوظائف إلى تعيين الموظفين",
    "services.payroll.title": "إدارة الرواتب",
    "services.payroll.description": "معالجة دقيقة وفي الوقت المناسب للرواتب تضمن الامتثال للوائح المحلية",
    "services.performance.title": "إدارة الأداء",
    "services.performance.description": "تحديد الأهداف وتتبع التقدم وتقييم أداء الموظفين بفعالية",
    "services.learning.title": "التعلم والتطوير",
    "services.learning.description": "تعزيز مهارات الموظفين من خلال برامج تدريبية مخصصة",
    "services.compliance.title": "الامتثال والتوثيق",
    "services.compliance.description": "البقاء ممتثلاً لقوانين العمل والحفاظ على الوثائق المناسبة",
    "services.benefits.title": "إدارة المزايا",
    "services.benefits.description": "إدارة مزايا الموظفين بكفاءة وشفافية",
    
    // Mission & Vision
    "mission.title": "رؤيتنا ورسالتنا",
    "mission.subtitle": "دفع التميز في إدارة الموارد البشرية",
    "mission.mission.title": "رسالتنا",
    "mission.mission.content": "تمكين المؤسسات من خلال حلول موارد بشرية مبتكرة تعزز الكفاءة وتعزز رضا الموظفين وتدفع نمو الأعمال.",
    "mission.vision.title": "رؤيتنا",
    "mission.vision.content": "أن نكون المزود الرائد لحلول الموارد البشرية عالمياً، معروفين بالتميز في الخدمة والابتكار ورضا العملاء.",
    "mission.values.title": "قيمنا",
    "mission.values.innovation": "الابتكار",
    "mission.values.integrity": "النزاهة",
    "mission.values.excellence": "التميز",
    "mission.values.collaboration": "التعاون",
    
    // Clients Page
    "clients.title": "عملاؤنا",
    "clients.subtitle": "موثوق به من قبل المؤسسات الرائدة عبر الصناعات",
    "clients.categories.medical": "الطبي",
    "clients.categories.factories": "المصانع",
    "clients.categories.education": "التعليم",
    "clients.categories.retail": "التجزئة",
    "clients.categories.technology": "التكنولوجيا",
    "clients.viewall": "عرض الكل",
    
    // Contact Page
    "contact.title": "اتصل بنا",
    "contact.subtitle": "تواصل مع فريقنا لمعرفة كيف يمكننا مساعدة عملك",
    "contact.form.name": "الاسم الكامل",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.phone": "رقم الهاتف",
    "contact.form.message": "الرسالة",
    "contact.form.submit": "إرسال الرسالة",
    "contact.info.address": "العنوان",
    "contact.info.email": "البريد الإلكتروني",
    "contact.info.phone": "الهاتف",
    
    // Privacy Policy
    "privacy.title": "سياسة الخصوصية",
    "privacy.subtitle": "كيف نجمع واستخدام وحماية معلوماتك",
    
    // Footer
    "footer.rights": "جميع الحقوق محفوظة",
    "footer.terms": "شروط الخدمة",
    "footer.privacy": "سياسة الخصوصية",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const direction: Direction = language === "ar" ? "rtl" : "ltr";

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = direction;
    document.body.className = direction;
    document.title = language === "en" ? "LoginHR - HR Solutions" : "LoginHR - حلول الموارد البشرية";
  }, [language, direction]);

  const value = {
    language,
    direction,
    translations: translations[language],
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
