
import React, { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";

const About = () => {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    // Team member animation
    gsap.utils.toArray<HTMLElement>(".team-member").forEach((member, i) => {
      gsap.fromTo(
        member,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: i * 0.2,
          scrollTrigger: {
            trigger: member,
            start: "top bottom-=100",
          }
        }
      );
    });
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: language === "en" ? "Michael Johnson" : "مايكل جونسون",
      position: language === "en" ? "CEO & Co-Founder" : "الرئيس التنفيذي والمؤسس المشارك",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      bio: language === "en" 
        ? "With over 20 years in HR technology, Michael leads LoginHR's vision and strategy."
        : "مع أكثر من 20 عامًا في تكنولوجيا الموارد البشرية، يقود مايكل رؤية واستراتيجية LoginHR."
    },
    {
      name: language === "en" ? "Sarah Chen" : "سارة تشن",
      position: language === "en" ? "CTO" : "المدير التقني",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: language === "en" 
        ? "Sarah oversees the development of LoginHR's cutting-edge technology solutions."
        : "تشرف سارة على تطوير حلول التكنولوجيا المتطورة في LoginHR."
    },
    {
      name: language === "en" ? "David Rodriguez" : "ديفيد رودريغيز",
      position: language === "en" ? "Head of Product" : "رئيس المنتجات",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      bio: language === "en" 
        ? "David ensures LoginHR's products meet the evolving needs of our clients."
        : "يضمن ديفيد أن منتجات LoginHR تلبي الاحتياجات المتطورة لعملائنا."
    },
    {
      name: language === "en" ? "Aisha Patel" : "عائشة باتيل",
      position: language === "en" ? "Global Sales Director" : "مديرة المبيعات العالمية",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      bio: language === "en" 
        ? "Aisha leads our global sales team with a focus on client success and growth."
        : "تقود عائشة فريق المبيعات العالمي لدينا مع التركيز على نجاح العملاء والنمو."
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-loginhr-50 pt-32 pb-20">
        <div className="container-custom mx-auto text-center">
          <h1 className="gsap-reveal section-title">{t("about.title")}</h1>
          <p className="gsap-reveal section-subtitle">{t("about.subtitle")}</p>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="py-20 bg-white">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="gsap-reveal">
                <h2 className="text-3xl font-bold mb-6 text-loginhr-900">{t("about.story.title")}</h2>
                <p className="text-lg text-gray-700 mb-6">{t("about.story.content")}</p>
                <p className="text-lg text-gray-700">
                  {language === "en" 
                    ? "Today, LoginHR serves over 500 businesses worldwide, from startups to Fortune 500 companies. Our mission remains the same: to empower organizations with innovative HR solutions that enhance efficiency, promote employee satisfaction, and drive business growth."
                    : "اليوم، تخدم LoginHR أكثر من 500 شركة في جميع أنحاء العالم، من الشركات الناشئة إلى شركات فورتشن 500. وتبقى مهمتنا كما هي: تمكين المنظمات من خلال حلول موارد بشرية مبتكرة تعزز الكفاءة وتعزز رضا الموظفين وتدفع نمو الأعمال."
                  }
                </p>
              </div>
            </div>
            <div>
              <div className="gsap-reveal relative">
                <div className="bg-loginhr-100 rounded-xl p-4 md:p-8 relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1527576539890-dfa815648363" 
                    alt="LoginHR Building" 
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
      
      {/* Our Values */}
      <div className="py-20 bg-gray-50">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="gsap-reveal text-3xl font-bold mb-6 text-loginhr-900">
              {language === "en" ? "Our Values" : "قيمنا"}
            </h2>
            <p className="gsap-reveal text-lg text-loginhr-700 max-w-3xl mx-auto">
              {language === "en" 
                ? "The core principles that guide everything we do at LoginHR"
                : "المبادئ الأساسية التي توجه كل ما نقوم به في LoginHR"
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="gsap-stagger-fade bg-white rounded-xl shadow-md p-8 border-t-4 border-loginhr-600">
              <h3 className="text-xl font-semibold mb-4 text-loginhr-900">{t("mission.values.innovation")}</h3>
              <p className="text-gray-600">
                {language === "en" 
                  ? "We constantly push boundaries to create forward-thinking solutions."
                  : "نحن نتخطى الحدود باستمرار لإنشاء حلول مبتكرة."
                }
              </p>
            </div>
            <div className="gsap-stagger-fade bg-white rounded-xl shadow-md p-8 border-t-4 border-loginhr-600">
              <h3 className="text-xl font-semibold mb-4 text-loginhr-900">{t("mission.values.integrity")}</h3>
              <p className="text-gray-600">
                {language === "en" 
                  ? "We operate with honesty, transparency and the highest ethical standards."
                  : "نعمل بصدق وشفافية وأعلى المعايير الأخلاقية."
                }
              </p>
            </div>
            <div className="gsap-stagger-fade bg-white rounded-xl shadow-md p-8 border-t-4 border-loginhr-600">
              <h3 className="text-xl font-semibold mb-4 text-loginhr-900">{t("mission.values.excellence")}</h3>
              <p className="text-gray-600">
                {language === "en" 
                  ? "We strive for excellence in every aspect of our business."
                  : "نسعى للتميز في كل جانب من جوانب أعمالنا."
                }
              </p>
            </div>
            <div className="gsap-stagger-fade bg-white rounded-xl shadow-md p-8 border-t-4 border-loginhr-600">
              <h3 className="text-xl font-semibold mb-4 text-loginhr-900">{t("mission.values.collaboration")}</h3>
              <p className="text-gray-600">
                {language === "en" 
                  ? "We believe in the power of teamwork and partnerships."
                  : "نؤمن بقوة العمل الجماعي والشراكات."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Leadership Team */}
      <div className="py-20 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="gsap-reveal section-title">{t("about.team.title")}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member text-center">
                <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden shadow-md border-4 border-white">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-loginhr-900">{member.name}</h3>
                <p className="text-loginhr-600 mb-3">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
