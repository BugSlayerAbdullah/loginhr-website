import React, { useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";
import ClientNetwork from "../components/ClientNetwork";

interface ClientCategory {
  id: string;
  name: string;
  clients: Client[];
  color: string;
}

interface Client {
  id: string;
  name: string;
  logo?: string;
  description?: string;
}

const Clients = () => {
  const { t, language } = useLanguage();
  const clientsRef = useRef<HTMLDivElement>(null);
  
  // Client data organized by category with colors for the network visualization
  const clientCategories: ClientCategory[] = [
    {
      id: "medical",
      name: t("clients.categories.medical"),
      color: "#6E59A5", // Updated to harmonious color palette
      clients: [
        { 
          id: "med1", 
          name: language === "en" ? "City General Hospital" : "مستشفى المدينة العام", 
          logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
          description: language === "en" ? "Healthcare provider with 500+ staff" : "مزود خدمات صحية مع أكثر من 500 موظف"
        },
        { 
          id: "med2", 
          name: language === "en" ? "MedLife Clinics" : "عيادات ميدلايف", 
          logo: "https://images.unsplash.com/photo-1516841273335-e39b37888115",
          description: language === "en" ? "Network of specialty clinics" : "شبكة من العيادات المتخصصة"
        },
        { 
          id: "med3", 
          name: language === "en" ? "Global Pharmaceuticals" : "العالمية للأدوية", 
          logo: "https://images.unsplash.com/photo-1563213126-a4273aed2016",
          description: language === "en" ? "Pharmaceutical research and manufacturing" : "أبحاث وتصنيع الأدوية"
        },
      ]
    },
    {
      id: "factories",
      name: t("clients.categories.factories"),
      color: "#E5893D", // Updated to harmonious color palette
      clients: [
        { 
          id: "fact1", 
          name: language === "en" ? "TechManufacturing Inc." : "تك مانوفاكتشرنج للصناعات", 
          logo: "https://images.unsplash.com/photo-1518866586379-6da4f122e4e4",
          description: language === "en" ? "Electronics production facility" : "منشأة إنتاج الإلكترونيات"
        },
        { 
          id: "fact2", 
          name: language === "en" ? "AutoParts Global" : "أوتو بارتس العالمية", 
          logo: "https://images.unsplash.com/photo-1565043589221-1a6fd9bd2ff8",
          description: language === "en" ? "Automotive parts manufacturing" : "تصنيع قطع غيار السيارات"
        },
        { 
          id: "fact3", 
          name: language === "en" ? "FoodProcess Solutions" : "حلول معالجة الأغذية", 
          logo: "https://images.unsplash.com/photo-1556767576-5ec41e3239ea",
          description: language === "en" ? "Food processing and packaging" : "معالجة وتعبئة المواد الغذائية"
        },
      ]
    },
    {
      id: "education",
      name: t("clients.categories.education"),
      color: "#51A894", // Updated to harmonious color palette
      clients: [
        { 
          id: "edu1", 
          name: language === "en" ? "Global University" : "الجامعة العالمية", 
          logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
          description: language === "en" ? "Research university with 2000+ staff" : "جامعة بحثية مع أكثر من 2000 موظف"
        },
        { 
          id: "edu2", 
          name: language === "en" ? "TechAcademy" : "أكاديمية التكنولوجيا", 
          logo: "https://images.unsplash.com/photo-1546953304-5d96f43c2e94",
          description: language === "en" ? "Technical training institution" : "مؤسسة تدريب تقني"
        },
        { 
          id: "edu3", 
          name: language === "en" ? "International School Network" : "شبكة المدارس الدولية", 
          logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
          description: language === "en" ? "K-12 educational system" : "نظام تعليمي من الروضة إلى الثانوية"
        },
      ]
    },
    {
      id: "retail",
      name: t("clients.categories.retail"),
      color: "#7E69AB", // Updated to harmonious color palette
      clients: [
        { 
          id: "ret1", 
          name: language === "en" ? "MegaMart Stores" : "متاجر ميجا مارت", 
          logo: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0",
          description: language === "en" ? "Retail chain with 50+ locations" : "سلسلة متاجر بأكثر من 50 موقعًا"
        },
        { 
          id: "ret2", 
          name: language === "en" ? "Fashion Forward" : "فاشن فورورد", 
          logo: "https://images.unsplash.com/photo-1560243563-062bfc001d68",
          description: language === "en" ? "Clothing retail company" : "شركة بيع ملابس بالتجزئة"
        },
        { 
          id: "ret3", 
          name: language === "en" ? "HomeGoods Plus" : "هوم جودز بلس", 
          logo: "https://images.unsplash.com/photo-1555596333-d7952e88c16f",
          description: language === "en" ? "Home furnishing and decor" : "المفروشات والديكور المنزلي"
        },
      ]
    },
    {
      id: "technology",
      name: t("clients.categories.technology"),
      color: "#D6707B", // Updated to harmonious color palette
      clients: [
        { 
          id: "tech1", 
          name: language === "en" ? "InnovateTech Solutions" : "حلول إنوفيت تك", 
          logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
          description: language === "en" ? "Software development company" : "شركة تطوير البرمجيات"
        },
        { 
          id: "tech2", 
          name: language === "en" ? "DataCorp Analytics" : "داتا كورب للتحليلات", 
          logo: "https://images.unsplash.com/photo-1661956602153-23384936a1d3",
          description: language === "en" ? "Data analytics and AI solutions" : "تحليل البيانات وحلول الذكاء الاصطناعي"
        },
        { 
          id: "tech3", 
          name: language === "en" ? "CloudSecure Systems" : "كلاود سيكيور سيستمز", 
          logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          description: language === "en" ? "Cloud infrastructure provider" : "مزود البنية التحتية السحابية"
        },
      ]
    }
  ];
  
  useEffect(() => {
    // Main animation for sections
    gsap.utils.toArray<HTMLElement>(".gsap-section").forEach((section, i) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=50",
          }
        }
      );
    });
  }, []);

  return (
    <>
      {/* Hero Section with enhanced styling */}
      <div className="bg-gradient-to-br from-loginhr-50 to-blue-50 pt-32 pb-20">
        <div className="container-custom mx-auto text-center relative overflow-hidden">
          {/* Abstract shapes background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-70">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-200 blur-3xl opacity-30"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-indigo-200 blur-3xl opacity-30"></div>
            <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-purple-200 blur-3xl opacity-20"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="gsap-reveal section-title bg-clip-text text-transparent bg-gradient-to-r from-loginhr-700 to-indigo-600">
              {t("clients.title")}
            </h1>
            <p className="gsap-reveal section-subtitle">
              {t("clients.subtitle")}
            </p>
          </div>
        </div>
      </div>
      
      {/* Client Network Visualization */}
      <div ref={clientsRef} className="py-12 bg-white gsap-section">
        <div className="container-custom mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-loginhr-900 mb-3">
              {language === "en" ? "Our Client Network" : "شبكة عملائنا"}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              {language === "en" 
                ? "Explore our diverse network of clients across various industries. Click on a category to see the clients within that sector."
                : "استكشف شبكتنا المتنوعة من العملاء عبر مختلف الصناعات. انقر على فئة لمشاهدة العملاء داخل هذا القطاع."
              }
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-3xl shadow-sm p-2 md:p-6">
            <ClientNetwork clientCategories={clientCategories} />
          </div>
        </div>
      </div>
      
      {/* Testimonials - keeping this section as is */}
      {/* <div className="py-20 bg-gray-50 gsap-section">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="gsap-reveal text-3xl font-bold mb-6 text-loginhr-900">
              {language === "en" ? "What Our Clients Say" : "ماذا يقول عملاؤنا"}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="gsap-stagger-fade bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-50">
              <div className="text-loginhr-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                {language === "en" 
                  ? "LoginHR's payroll system has saved us countless hours every month. The accuracy and reliability are outstanding."
                  : "وفر نظام الرواتب من LoginHR لنا ساعات لا تحصى كل شهر. الدقة والموثوقية ممتازة."
                }
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-loginhr-100 rounded-full flex items-center justify-center text-loginhr-600 font-bold text-lg">
                  JM
                </div>
                <div className="ml-4 rtl:ml-0 rtl:mr-4">
                  <h4 className="font-bold text-loginhr-900">
                    {language === "en" ? "John Matthews" : "جون ماثيوز"}
                  </h4>
                  <p className="text-gray-600">
                    {language === "en" ? "CFO, TechManufacturing Inc." : "المدير المالي، تك مانوفاكتشرنج للصناعات"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="gsap-stagger-fade bg-white p-6 rounded-lg shadow-md">
              <div className="text-loginhr-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <p className="text-gray-700 mb-6">
                {language === "en" 
                  ? "The recruitment module has transformed how we hire talent. The entire process is now streamlined, from job posting to onboarding."
                  : "لقد غير نموذج التوظيف الطريقة التي نوظف بها المواهب. أصبحت العملية بأكملها الآن مبسطة، من نشر الوظائف إلى التعيين."
                }
              </p>
              <div>
                <h4 className="font-bold text-loginhr-900">
                  {language === "en" ? "Aisha Patel" : "عائشة باتيل"}
                </h4>
                <p className="text-gray-600">
                  {language === "en" ? "HR Director, Global University" : "مديرة الموارد البشرية، الجامعة العالمية"}
                </p>
              </div>
            </div>
            
            <div className="gsap-stagger-fade bg-white p-6 rounded-lg shadow-md">
              <div className="text-loginhr-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <p className="text-gray-700 mb-6">
                {language === "en" 
                  ? "The customer support team at LoginHR is exceptional. They're always available to help and genuinely care about our success."
                  : "فريق دعم العملاء في LoginHR استثنائي. إنهم متاحون دا��مًا للمساعدة ويهتمون حقًا بنجاحنا."
                }
              </p>
              <div>
                <h4 className="font-bold text-loginhr-900">
                  {language === "en" ? "Carlos Mendez" : "كارلوس مينديز"}
                </h4>
                <p className="text-gray-600">
                  {language === "en" ? "Operations Manager, MegaMart Stores" : "مدير العمليات، متاجر ميجا مارت"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Clients;
