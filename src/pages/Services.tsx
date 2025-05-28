
import React, { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";
import { Users, DollarSign, BarChart2, GraduationCap, FileText, Gift } from "lucide-react";

const Services = () => {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    // Service card animation
    gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          }
        }
      );
    });
    
    // Process animation
    gsap.utils.toArray<HTMLElement>(".process-item").forEach((item, i) => {
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

  const services = [
    {
      icon: <Users className="h-12 w-12 text-loginhr-600" />,
      title: t("services.recruitment.title"),
      description: t("services.recruitment.description"),
    },
    {
      icon: <DollarSign className="h-12 w-12 text-loginhr-600" />,
      title: t("services.payroll.title"),
      description: t("services.payroll.description"),
    },
    {
      icon: <BarChart2 className="h-12 w-12 text-loginhr-600" />,
      title: t("services.performance.title"),
      description: t("services.performance.description"),
    },
    {
      icon: <GraduationCap className="h-12 w-12 text-loginhr-600" />,
      title: t("services.learning.title"),
      description: t("services.learning.description"),
    },
    {
      icon: <FileText className="h-12 w-12 text-loginhr-600" />,
      title: t("services.compliance.title"),
      description: t("services.compliance.description"),
    },
    {
      icon: <Gift className="h-12 w-12 text-loginhr-600" />,
      title: t("services.benefits.title"),
      description: t("services.benefits.description"),
    },
  ];

  const processList = [
    {
      number: "01",
      title: language === "en" ? "Discovery & Analysis" : "الاكتشاف والتحليل",
      description: language === "en"
        ? "We begin by understanding your specific HR challenges and goals."
        : "نبدأ بفهم تحديات وأهداف الموارد البشرية الخاصة بك.",
    },
    {
      number: "02",
      title: language === "en" ? "Solution Design" : "تصميم الحل",
      description: language === "en"
        ? "Our team designs a customized solution tailored to your business needs."
        : "يقوم فريقنا بتصميم حل مخصص مصمم وفقًا لاحتياجات عملك.",
    },
    {
      number: "03",
      title: language === "en" ? "Implementation" : "التنفيذ",
      description: language === "en"
        ? "We smoothly integrate our solutions into your existing workflows."
        : "نقوم بدمج حلولنا بسلاسة في سير عملك الحالي.",
    },
    {
      number: "04",
      title: language === "en" ? "Training & Support" : "التدريب والدعم",
      description: language === "en"
        ? "We provide comprehensive training and ongoing support for your team."
        : "نقدم تدريبًا شاملاً ودعمًا مستمرًا لفريقك.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-loginhr-50 pt-32 pb-20">
        <div className="container-custom mx-auto text-center">
          <h1 className="gsap-reveal section-title">{t("services.title")}</h1>
          <p className="gsap-reveal section-subtitle">{t("services.subtitle")}</p>
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="py-20 bg-white">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-loginhr-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* How We Work */}
      <div className="py-20 bg-gray-50">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="gsap-reveal text-3xl font-bold mb-6 text-loginhr-900">
              {language === "en" ? "How We Work" : "كيف نعمل"}
            </h2>
            <p className="gsap-reveal text-lg text-loginhr-700 max-w-3xl mx-auto">
              {language === "en" 
                ? "Our proven process ensures a smooth implementation and maximum value from your LoginHR solutions"
                : "تضمن عمليتنا المثبتة تنفيذًا سلسًا وقيمة قصوى من حلول LoginHR الخاصة بك"
              }
            </p>
          </div>
          
          <div className="space-y-12 max-w-4xl mx-auto">
            {processList.map((item, index) => (
              <div 
                key={index} 
                className={`process-item flex flex-col md:flex-row items-center ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-shrink-0 mb-6 md:mb-0">
                  <div className="w-20 h-20 rounded-full bg-loginhr-600 text-white flex items-center justify-center text-3xl font-bold">
                    {item.number}
                  </div>
                </div>
                <div className={`md:mx-8 text-center md:text-left ${index % 2 !== 0 ? "md:text-right" : ""}`}>
                  <h3 className="text-2xl font-semibold mb-2 text-loginhr-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-loginhr-900 text-white">
        <div className="container-custom mx-auto text-center">
          <h2 className="gsap-reveal text-3xl md:text-4xl font-bold mb-6">
            {language === "en" 
              ? "Ready to transform your HR processes?" 
              : "هل أنت مستعد لتحويل عمليات الموارد البشرية الخاصة بك؟"
            }
          </h2>
          <p className="gsap-reveal text-xl mb-8 max-w-3xl mx-auto opacity-90">
            {language === "en" 
              ? "Contact us today for a free consultation and demo of our LoginHR solutions." 
              : "اتصل بنا اليوم للحصول على استشارة مجانية وعرض توضيحي لحلول LoginHR الخاصة بنا."
            }
          </p>
          <a 
            href="/contact" 
            className="gsap-reveal inline-block bg-white text-loginhr-900 px-8 py-4 rounded-lg font-medium text-lg hover:bg-loginhr-50 transition-colors"
          >
            {language === "en" ? "Schedule a Demo" : "جدولة عرض توضيحي"}
          </a>
        </div>
      </div>
    </>
  );
};

export default Services;
