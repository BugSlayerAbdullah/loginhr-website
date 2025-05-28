
import React, { useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";

const Mission = () => {
  const { t, language, direction } = useLanguage();
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate mission section
    gsap.fromTo(
      ".mission-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top center",
        }
      }
    );
    
    // Animate vision section
    gsap.fromTo(
      ".vision-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: visionRef.current,
          start: "top center",
        }
      }
    );
    
    // Timeline animation
    gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.7, 
          delay: i * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
          }
        }
      );
    });
  }, []);
  
  const timeline = [
    {
      year: "2012",
      title: language === "en" ? "Foundation" : "التأسيس",
      description: language === "en" 
        ? "LoginHR was founded with a mission to simplify HR management."
        : "تم تأسيس LoginHR بهدف تبسيط إدارة الموارد البشرية.",
    },
    {
      year: "2015",
      title: language === "en" ? "Global Expansion" : "التوسع العالمي",
      description: language === "en"
        ? "We expanded our services to international markets."
        : "قمنا بتوسيع خدماتنا إلى الأسواق العالمية.",
    },
    {
      year: "2018",
      title: language === "en" ? "AI Integration" : "دمج الذكاء الاصطناعي",
      description: language === "en"
        ? "We integrated AI technology into our HR solutions."
        : "قمنا بدمج تقنية الذكاء الاصطناعي في حلول الموارد البشرية لدينا.",
    },
    {
      year: "2022",
      title: language === "en" ? "Next Generation" : "الجيل القادم",
      description: language === "en"
        ? "Launch of our next-generation platform with enhanced features."
        : "إطلاق منصتنا من الجيل التالي مع ميزات محسنة.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-loginhr-50 pt-32 pb-20">
        <div className="container-custom mx-auto text-center">
          <h1 className="gsap-reveal section-title">{t("mission.title")}</h1>
          <p className="gsap-reveal section-subtitle">{t("mission.subtitle")}</p>
        </div>
      </div>
      
      {/* Mission Section */}
      <div ref={missionRef} className="py-20 bg-white">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`${direction === "rtl" ? "lg:order-2" : ""}`}>
              <div className="mission-content">
                <h2 className="text-3xl font-bold mb-6 text-loginhr-900">{t("mission.mission.title")}</h2>
                <p className="text-lg text-gray-700 mb-6">{t("mission.mission.content")}</p>
                <p className="text-lg text-gray-700">
                  {language === "en" 
                    ? "At LoginHR, we believe in putting people first. By creating intuitive, powerful HR tools, we help businesses focus on what matters most: their employees. Our solutions are designed to reduce administrative burden, enhance data accuracy, and provide valuable insights for better decision-making."
                    : "في LoginHR، نؤمن بوضع الناس أولاً. من خلال إنشاء أدوات موارد بشرية بديهية وقوية، نساعد الشركات على التركيز على ما هو أكثر أهمية: موظفيها. تم تصميم حلولنا لتقليل العبء الإداري، وتحسين دقة البيانات، وتوفير رؤى قيمة لاتخاذ قرارات أفضل."
                  }
                </p>
              </div>
            </div>
            <div className={`${direction === "rtl" ? "lg:order-1" : ""}`}>
              <div className="mission-content relative">
                <div className="bg-loginhr-100 rounded-xl p-6 relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                    alt="Team collaboration" 
                    className="rounded-lg w-full h-auto object-cover shadow-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-loginhr-200 rounded-full z-0"></div>
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-loginhr-300 rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vision Section */}
      <div ref={visionRef} className="py-20 bg-gray-50">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`${direction === "rtl" ? "lg:order-1" : "lg:order-2"}`}>
              <div className="vision-content">
                <h2 className="text-3xl font-bold mb-6 text-loginhr-900">{t("mission.vision.title")}</h2>
                <p className="text-lg text-gray-700 mb-6">{t("mission.vision.content")}</p>
                <p className="text-lg text-gray-700">
                  {language === "en" 
                    ? "We envision a future where HR processes are seamlessly integrated into the daily workflow, allowing HR professionals to focus on strategic initiatives rather than administrative tasks. Our vision extends beyond software – we aim to transform how organizations view and manage their human capital."
                    : "نحن نتصور مستقبلاً تتكامل فيه عمليات الموارد البشرية بسلاسة في سير العمل اليومي، مما يسمح لمحترفي الموارد البشرية بالتركيز على المبادرات الاستراتيجية بدلاً من المهام الإدارية. تمتد رؤيتنا إلى ما وراء البرامج - نهدف إلى تغيير كيفية نظرة المؤسسات وإدارتها لرأس المال البشري."
                  }
                </p>
              </div>
            </div>
            <div className={`${direction === "rtl" ? "lg:order-2" : "lg:order-1"}`}>
              <div className="vision-content relative">
                <div className="bg-loginhr-100 rounded-xl p-6 relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                    alt="Future vision" 
                    className="rounded-lg w-full h-auto object-cover shadow-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-loginhr-200 rounded-full z-0"></div>
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-loginhr-300 rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* History Timeline */}
      <div className="py-20 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="gsap-reveal text-3xl font-bold mb-6 text-loginhr-900">
              {language === "en" ? "Our Journey" : "رحلتنا"}
            </h2>
            <p className="gsap-reveal text-lg text-loginhr-700 max-w-3xl mx-auto">
              {language === "en" 
                ? "The key milestones that have shaped LoginHR over the years"
                : "المعالم الرئيسية التي شكلت LoginHR على مر السنين"
              }
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-loginhr-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-24">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-loginhr-600 border-4 border-white z-10"></div>
                  
                  {/* Content */}
                  <div className={`flex flex-col md:flex-row items-center justify-center ${
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}>
                    {/* Year */}
                    <div className={`mb-4 md:mb-0 ${index % 2 !== 0 ? "md:ml-8" : "md:mr-8"} md:w-1/4 ${
                      index % 2 !== 0 ? "md:text-left" : "md:text-right"
                    }`}>
                      <span className="inline-block bg-loginhr-50 text-loginhr-900 text-2xl font-bold py-2 px-4 rounded">
                        {item.year}
                      </span>
                    </div>
                    
                    {/* Details */}
                    <div className={`md:w-1/4 ${index % 2 === 0 ? "md:ml-8" : "md:mr-8"} ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}>
                      <h3 className="text-xl font-semibold mb-2 text-loginhr-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mission;
