
import React, { useEffect, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import HRDonutChart from "../charts/HRDonutChart";
import HRBarChart from "../charts/HRBarChart";
import HRLineChart from "../charts/HRLineChart";
import { Users, BadgeCheck, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HRInsightsDashboard: React.FC = () => {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // Simulated data for the charts
  const employeeDistribution = [
    { name: language === "en" ? "Engineering" : "هندسة", value: 20, color: "#4e2e73" },
    { name: language === "en" ? "Sales" : "مبيعات", value: 18, color: "#5a3485" },
    { name: language === "en" ? "Support" : "دعم", value: 15, color: "#663a96" },
    { name: language === "en" ? "Management" : "إدارة", value: 12, color: "#6a3d9a" },
    { name: language === "en" ? "Marketing" : "تسويق", value: 10, color: "#7e52a6" },
    { name: language === "en" ? "HR" : "الموارد البشرية", value: 8, color: "#9267b2" },
    { name: language === "en" ? "Finance" : "مالية", value: 7, color: "#a67cbe" },
    { name: language === "en" ? "Legal" : "قانونية", value: 5, color: "#bb91ca" },
    { name: language === "en" ? "IT" : "تقنية المعلومات", value: 3, color: "#cfaae0" },
    { name: language === "en" ? "Operations" : "العمليات", value: 2, color: "#e4c2f5" },
  ];

  const performanceData = [
    { name: language === "en" ? "Jan" : "يناير", value: 90 },
    { name: language === "en" ? "Feb" : "فبراير", value: 70 },
    { name: language === "en" ? "Mar" : "مارس", value: 95 },
    { name: language === "en" ? "Apr" : "أبريل", value: 60 },
    { name: language === "en" ? "May" : "مايو", value: 80 },
    { name: language === "en" ? "Jun" : "يونيو", value: 70 },
  ];

  useEffect(() => {
    // Animate the section on scroll
    const headerElements = [headingRef.current, descriptionRef.current];

    gsap.fromTo(
      headerElements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // Animate the cards
    gsap.utils.toArray<HTMLElement>(".chart-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 + i * 0.2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    });

    // Animate the stats
    gsap.utils.toArray<HTMLElement>(".insight-stat").forEach((stat, i) => {
      gsap.fromTo(
        stat,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.4 + i * 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    });
  }, [language]);

  return (
    <div
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-primary-foreground/5 overflow-hidden"
    >
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="section-title text-loginhr-800">
            {(language === "en" ? "Data-Driven HR Insights" : "تحليل بيانات الموارد البشرية")}
          </h2>
          <p ref={descriptionRef} className="section-subtitle text-loginhr-600">
            {(language === "en"
              ? "Make better decisions with real-time analytics and interactive data visualizations"
              : "اتخذ قرارات أفضل باستخدام التحليلات في الوقت الفعلي وتصورات البيانات التفاعلية")}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="insight-stat bg-white p-6 rounded-2xl shadow-md border-t-4 border-loginhr-600">
            <div className="flex items-start gap-4">
              <div className="bg-loginhr-50 p-3 rounded-xl">
                <Users className="h-6 w-6 text-loginhr-600" />
              </div>
              <div>
                <p className="text-sm text-loginhr-700">{language === "en" ? "Employee Retention" : "معدل الاحتفاظ بالموظفين"}</p>
                <p className="text-2xl font-bold text-loginhr-900">95%</p>
              </div>
            </div>
          </div>

          <div className="insight-stat bg-white p-6 rounded-2xl shadow-md border-t-4 border-loginhr-600">
            <div className="flex items-start gap-4">
              <div className="bg-loginhr-50 p-3 rounded-xl">
                <BadgeCheck className="h-6 w-6 text-loginhr-600" />
              </div>
              <div>
                <p className="text-sm text-loginhr-700">{language === "en" ? "Time to Hire" : "وقت التوظيف"}</p>
                <p className="text-2xl font-bold text-loginhr-900">-35%</p>
              </div>
            </div>
          </div>

          <div className="insight-stat bg-white p-6 rounded-2xl shadow-md border-t-4 border-loginhr-600">
            <div className="flex items-start gap-4">
              <div className="bg-loginhr-50 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-loginhr-600" />
              </div>
              <div>
                <p className="text-sm text-loginhr-700">{language === "en" ? "Employee Satisfaction" : "رضا الموظفين"}</p>
                <p className="text-2xl font-bold text-loginhr-900">92%</p>
              </div>
            </div>
          </div>

          <div className="insight-stat bg-white p-6 rounded-2xl shadow-md border-t-4 border-loginhr-600">
            <div className="flex items-start gap-4">
              <div className="bg-loginhr-50 p-3 rounded-xl">
                <Users className="h-6 w-6 text-loginhr-600" />
              </div>
              <div>
                <p className="text-sm text-loginhr-700">{language === "en" ? "Performance Index" : "مؤشر الأداء"}</p>
                <p className="text-2xl font-bold text-loginhr-900">+27%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="chart-card">
            <HRDonutChart
              data={employeeDistribution}
              title={language === "en" ? "Employee Distribution" : "توزيع الموظفين"}
            />
          </div>

          <div className="chart-card">
            <HRBarChart
              data={performanceData}
              dataKey="value"
              title={language === "en" ? "Performance Metrics" : "مقاييس الأداء"}
              color="#6a3d9a"
            />
          </div>

          <div className="chart-card lg:col-span-2">
            <HRLineChart
            />
          </div>
        </div>
      </div>

      {/* Abstract Decorative Elements */}
      <div className="absolute right-0 top-1/3 w-64 h-64 bg-loginhr-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute left-10 bottom-1/4 w-80 h-80 bg-indigo-300 rounded-full opacity-10 blur-3xl"></div>
    </div>
  );
};

export default HRInsightsDashboard;
