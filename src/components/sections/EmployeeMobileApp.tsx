
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";
import { Smartphone, Check, Clock, FileText, UserCircle, Download } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EmployeeMobileApp = () => {
  const { t, direction, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Phone mockup animation
    gsap.fromTo(
      phoneRef.current,
      { 
        y: 60, 
        opacity: 0,
        rotationY: direction === "rtl" ? 10 : -10
      },
      { 
        y: 0, 
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
        }
      }
    );

    // Screen elements animation
    gsap.fromTo(
      ".app-screen-element",
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=150",
        }
      }
    );

    // Content animation
    gsap.fromTo(
      ".app-content-element",
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.7, 
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom-=100",
        }
      }
    );
    
    // Features animation
    gsap.fromTo(
      ".app-feature",
      { scale: 0.9, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom-=50",
        }
      }
    );
    
    // Store buttons animation
    gsap.fromTo(
      ".store-button",
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "center bottom",
        }
      }
    );
  }, [direction]);

  const features = [
    {
      icon: <Clock className="h-5 w-5 text-loginhr-500" />,
      title: language === "en" ? "Leave Requests" : "طلبات الإجازة",
      description: language === "en" ? "Request and track time off easily" : "طلب وتتبع الإجازات بسهولة"
    },
    {
      icon: <FileText className="h-5 w-5 text-loginhr-500" />,
      title: language === "en" ? "Payslip Access" : "الوصول إلى قسيمة الراتب",
      description: language === "en" ? "View and download salary details" : "عرض وتنزيل تفاصيل الراتب"
    },
    {
      icon: <UserCircle className="h-5 w-5 text-loginhr-500" />,
      title: language === "en" ? "Profile Updates" : "تحديثات الملف الشخصي",
      description: language === "en" ? "Manage personal information" : "إدارة المعلومات الشخصية"
    },
    {
      icon: <Check className="h-5 w-5 text-loginhr-500" />,
      title: language === "en" ? "Attendance Tracking" : "تتبع الحضور",
      description: language === "en" ? "Check-in and view attendance history" : "تسجيل الدخول وعرض سجل الحضور"
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-br from-white to-primary-foreground/5 overflow-hidden"
    >
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Phone Mockup */}
          <div 
            ref={phoneRef}
            className={`relative ${direction === "rtl" ? "lg:order-2" : ""}`}
          >
            <div className="relative max-w-[280px] mx-auto">
              {/* Phone frame */}
              <div className="relative z-10 bg-loginhr-950 rounded-[32px] p-3 shadow-2xl">
                <div className="bg-white rounded-[24px] overflow-hidden aspect-[9/19]">
                  {/* Phone notch */}
                  <div className="bg-loginhr-950 h-6 w-24 mx-auto rounded-b-xl flex items-center justify-center">
                    <div className="h-2 w-2 bg-loginhr-600 rounded-full mx-1"></div>
                  </div>
                  
                  {/* App screen */}
                  <div className="bg-loginhr-50 h-full p-3 pt-8">
                    {/* App header */}
                    <div className="app-screen-element bg-white rounded-xl p-3 shadow-sm mb-3">
                      <div className="flex items-center">
                        <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center text-white">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div className="ml-2 rtl:ml-0 rtl:mr-2">
                          <h5 className="text-sm font-medium">LoginHR</h5>
                          <p className="text-xs text-gray-500">Employee Portal</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dashboard tiles */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="app-screen-element bg-white p-3 rounded-xl shadow-sm">
                        <div className="h-6 w-6 bg-loginhr-700 mb-2 rounded flex items-center justify-center">
                          <Clock className="h-3 w-3 text-loginhr-50" />
                        </div>
                        <p className="text-xs font-medium">Leave</p>
                        <p className="text-[10px] text-gray-500">2 pending</p>
                      </div>
                      <div className="app-screen-element bg-white p-3 rounded-xl shadow-sm">
                        <div className="h-6 w-6 bg-loginhr-700 mb-2 rounded flex items-center justify-center">
                          <Check className="h-3 w-3 text-loginhr-50" />
                        </div>
                        <p className="text-xs font-medium">Attendance</p>
                        <p className="text-[10px] text-gray-500">Check in</p>
                      </div>
                    </div>
                    
                    {/* Payslip card */}
                    <div className="app-screen-element bg-loginhr-700 rounded-xl p-3 text-white mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-medium opacity-80">Net Salary</p>
                          <p className="text-sm font-semibold mt-1">15,250.00 EGP</p>
                        </div>
                        <div className="bg-white/20 rounded-full h-6 w-6 flex items-center justify-center backdrop-blur-sm">
                          <FileText className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/20 flex justify-between items-center">
                        <p className="text-[10px] opacity-80">April Payslip</p>
                        <div className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">View</div>
                      </div>
                    </div>
                    
                    {/* Profile preview */}
                    <div className="app-screen-element bg-white rounded-xl p-3 shadow-sm">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                          <UserCircle className="h-4 w-4 text-loginhr-50" />
                        </div>
                        <div className="ml-2 rtl:ml-0 rtl:mr-2">
                          <p className="text-xs font-medium">Profile</p>
                          <p className="text-[10px] text-gray-500">Update info</p>
                        </div>
                        <div className="ml-auto rtl:mr-auto rtl:ml-0">
                          <div className="h-5 w-5 bg-loginhr-50 rounded-full flex items-center justify-center">
                            <div className="h-1 w-1 bg-loginhr-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -left-6 -bottom-8 h-32 w-32 bg-loginhr-200 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -right-10 top-20 h-24 w-24 bg-loginhr-300 rounded-full opacity-20 blur-xl"></div>
              
              {/* Notification popups */}
              <div className="app-screen-element absolute -right-24 top-1/4 bg-white p-3 rounded-lg shadow-lg transform rotate-6 z-20 max-w-[180px]">
                <div className="flex items-center">
                  <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-white">
                    <Check className="h-3 w-3" />
                  </div>
                  <div className="ms-2">
                    <p className="text-xs font-medium">Leave Approved</p>
                    <p className="text-[10px] text-gray-500">Just now</p>
                  </div>
                </div>
              </div>
              <div className="app-screen-element absolute -left-16 top-3/4 bg-white p-3 rounded-lg shadow-lg transform -rotate-3 z-20 max-w-[180px]">
                <div className="flex items-center">
                  <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-white">
                    <FileText className="h-3 w-3" />
                  </div>
                  <div className="ml-2 rtl:ml-0 rtl:mr-2">
                    <p className="text-xs font-medium">Payslip Ready</p>
                    <p className="text-[10px] text-gray-500">5m ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div 
            ref={contentRef}
            className={`${direction === "rtl" ? "lg:order-1" : ""}`}
          >
            <div className="app-content-element inline-flex mb-3">
              <span className="bg-loginhr-100 text-loginhr-700 px-3 py-1 rounded-full text-sm font-medium">
                {language === "en" ? "Mobile Application" : "تطبيق الجوال"}
              </span>
            </div>
            <h2 className="app-content-element text-3xl md:text-4xl font-bold text-loginhr-900 mb-4">
              {language === "en" 
                ? "HR Management in Your Pocket" 
                : "إدارة الموارد البشرية في جيبك"
              }
            </h2>
            <p className="app-content-element text-lg text-loginhr-700 mb-8">
              {language === "en"
                ? "Access everything you need anytime, anywhere with our secure and user-friendly employee self-service mobile application."
                : "الوصول إلى كل ما تحتاجه في أي وقت وأي مكان مع تطبيق الخدمة الذاتية للموظفين الآمن وسهل الاستخدام."
              }
            </p>
            
            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="app-feature bg-white rounded-xl p-4 shadow-sm border border-loginhr-100/50">
                  <div className="h-10 w-10 bg-loginhr-50 rounded-lg flex items-center justify-center mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium text-loginhr-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-loginhr-700">{feature.description}</p>
                </div>
              ))}
            </div>
            
            {/* App store buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="default" 
                size="lg"
                className="store-button bg-black hover:bg-gray-900 text-loginhr-50 flex items-center justify-center py-6"
              >
                <div className="mr-2 rtl:ml-2 rtl:mr-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.68 1.32-1.53 2.6-2.53 4.08zm-6.84-15C10.71 3.25 13.16 3.16 14 5.28c-1.82.92-2.89 3.08-2.89 5.28-.2 0-3.15.1-3.32-5.28.32 0 .59 0 .42 0z" />
                  </svg>
                </div>
                <div className="text-left rtl:text-right">
                  <div className="text-xs">{language === "en" ? "Download on the" : "تنزيل من"}</div>
                  <div className="text-sm font-medium">App Store</div>
                </div>
              </Button>
              
              <Button 
                variant="default" 
                size="lg"
                className="store-button bg-black hover:bg-gray-900 text-loginhr-50 flex items-center justify-center py-6"
              >
                <div className="mr-2 rtl:ml-2 rtl:mr-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="m12.954 11.616 2.957-2.957L6.36 3.17c-.633-.342-1.226-.39-1.746-.016l8.34 8.462zm-1.908 1.913L2.692 5.158c-.36.574-.342 1.28.017 1.946l8.35 8.426h-.013zm1.907 1.902 8.322-4.363c.79-.416 1.136-.982 1.136-1.543 0-.562-.347-1.126-1.135-1.542l-8.336-4.37 8.35 8.425-8.337 3.393zm-1.906 1.904 8.325 8.432c.52.376 1.113.328 1.746-.016L5.4 15.44l5.647 1.895z" />
                  </svg>
                </div>
                <div className="text-left rtl:text-right">
                  <div className="text-xs">{language === "en" ? "Get it on" : "احصل عليه من"}</div>
                  <div className="text-sm font-medium">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeMobileApp;
