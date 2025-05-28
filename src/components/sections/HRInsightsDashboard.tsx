
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
    { name: language === "en" ? "Engineering" : "هندسة", value: 40, color: "#4f46e5" },
    { name: language === "en" ? "Sales" : "مبيعات", value: 30, color: "#0ea5e9" },
    { name: language === "en" ? "Support" : "دعم", value: 15, color: "#10b981" },
    { name: language === "en" ? "Management" : "إدارة", value: 15, color: "#f59e0b" },
  ];

  const performanceData = [
    { name: language === "en" ? "Jan" : "يناير", value: 68 },
    { name: language === "en" ? "Feb" : "فبراير", value: 72 },
    { name: language === "en" ? "Mar" : "مارس", value: 75 },
    { name: language === "en" ? "Apr" : "أبريل", value: 73 },
    { name: language === "en" ? "May" : "مايو", value: 80 },
    { name: language === "en" ? "Jun" : "يونيو", value: 82 },
  ];

  const recruitmentData = [
    { name: language === "en" ? "Q1" : "ر١", applications: 150, hires: 45 },
    { name: language === "en" ? "Q2" : "ر٢", applications: 200, hires: 60 },
    { name: language === "en" ? "Q3" : "ر٣", applications: 180, hires: 50 },
    { name: language === "en" ? "Q4" : "ر٤", applications: 220, hires: 70 },
  ];

  const engagementTrendsData = [
    {
      name: language === "en" ? "Jan" : "يناير",
      satisfaction: 72,
      retention: 85,
      engagement: 70
    },
    {
      name: language === "en" ? "Feb" : "فبراير",
      satisfaction: 75,
      retention: 83,
      engagement: 72
    },
    {
      name: language === "en" ? "Mar" : "مارس",
      satisfaction: 78,
      retention: 85,
      engagement: 75
    },
    {
      name: language === "en" ? "Apr" : "أبريل",
      satisfaction: 80,
      retention: 88,
      engagement: 79
    },
    {
      name: language === "en" ? "May" : "مايو",
      satisfaction: 85,
      retention: 90,
      engagement: 84
    },
    {
      name: language === "en" ? "Jun" : "يونيو",
      satisfaction: 88,
      retention: 92,
      engagement: 86
    },
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
      className="py-24 bg-gradient-to-b from-white to-loginhr-50 overflow-hidden"
    >
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="section-title">
            {(language === "en" ? "Data-Driven HR Insights" : "تحليل بيانات الموارد البشرية")}
          </h2>
          <p ref={descriptionRef} className="section-subtitle">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="chart-card h-80">
            <HRDonutChart
              data={employeeDistribution}
              title={language === "en" ? "Employee Distribution" : "توزيع الموظفين"}
            />
          </div>

          <div className="chart-card h-80">
            <HRBarChart
              data={performanceData}
              dataKey="value"
              title={language === "en" ? "Performance Metrics" : "مقاييس الأداء"}
              color="#6366f1"
            />
          </div>

          <div className="chart-card lg:col-span-2 h-80">
            <HRLineChart
              data={engagementTrendsData}
              lines={[
                { dataKey: "satisfaction", color: "#4f46e5", name: language === "en" ? "Satisfaction" : "الرضا" },
                { dataKey: "retention", color: "#10b981", name: language === "en" ? "Retention" : "الاحتفاظ" },
                { dataKey: "engagement", color: "#f59e0b", name: language === "en" ? "Engagement" : "المشاركة" }
              ]}
              title={language === "en" ? "Employee Trends" : "اتجاهات الموظفين"}
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
