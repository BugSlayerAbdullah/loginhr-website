import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Award, Users, Globe, Sparkles, BarChart3, CalendarClock, Users2, HousePlus } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HRInsightsDashboard from "../components/sections/HRInsightsDashboard";
import EmployeeMobileApp from "../components/sections/EmployeeMobileApp";
import ClientLogoCarousel from "../components/sections/ClientLogoCarousel";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { t, direction, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const heroImagesRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations with improved visual impact
    const heroTl = gsap.timeline();

    // Animate the blurred shapes
    gsap.fromTo(
      ".hero-blob",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 0.7,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out"
      }
    );

    // Animate the mesh grid
    gsap.fromTo(
      ".hero-mesh",
      { opacity: 0 },
      { opacity: 0.15, duration: 1.5, ease: "power1.inOut" }
    );

    // Animate hero title with split text effect
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
      const titleText = heroTitle.innerHTML;
      heroTitle.innerHTML = "";

      const words = titleText.split(" ");
      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = `hero-word relative inline-block ${index > 0 ? 'ml-2 rtl:ml-0 rtl:mr-2' : ''}`;
        span.innerHTML = word;
        heroTitle.appendChild(span);
      });

      gsap.fromTo(
        ".hero-word",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        }
      );
    }

    // Animate subtitle with reveal effect
    heroTl.fromTo(
      ".hero-subtitle",
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.4"
    );

    // Animate badge
    heroTl.fromTo(
      ".hero-badge",
      {
        opacity: 0,
        scale: 0.8,
        y: 10
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(2)"
      },
      "-=0.6"
    );

    // Animate CTA buttons with staggered appearance
    heroTl.fromTo(
      ".cta-button",
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      },
      "-=0.4"
    );

    // Animate the dashboard mockup
    heroTl.fromTo(
      ".dashboard-mockup",
      {
        opacity: 0,
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.7"
    );

    // Animate the notification elements
    heroTl.fromTo(
      ".notification-element",
      {
        opacity: 0,
        x: 20,
        y: 10
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Add floating animation to dashboard
    gsap.to(".dashboard-mockup", {
      y: "-1px",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Add pulse animation to notification dots
    gsap.to(".notification-dot", {
      scale: 1.2,
      opacity: 0.7,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Hero image scroll animation - start small and expand to full width
    gsap.set(".hero-image-container", {
      width: "100%",
      scale: 0.9,
      opacity: 0.9,
      transformOrigin: "center center"
    });

    gsap.to(".hero-image-container", {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        markers: false,
      },
      width: "100%",
      scale: 1,
      opacity: 1,
      ease: "power2.inOut"
    });

    // Enhanced floating badges animation with scroll effect
    gsap.to(".floating-badge", {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
      scale: 1.15,
      stagger: 0.15,
      ease: "power2.inOut"
    });

    const stats = [
      { el: "#stat-clients", value: 60 },
      { el: "#stat-employees", value: 50000 },
      { el: "#stat-sectors", value: 12 },
      { el: "#stat-years", value: 8 },
    ];

    // Stats section animations
    // Animate title and subtitle with fade up effect
    gsap.fromTo(
      ".stats-title",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top bottom-=100",
        },
      }
    );

    gsap.fromTo(
      ".stats-subtitle",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top bottom-=100",
        },
      }
    );

    // Animate stat cards with staggered appearance
    gsap.fromTo(
      ".stats-card",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top bottom-=50",
        },
      }
    );

    // Animate icons with rotation and scale
    gsap.fromTo(
      ".stats-icon",
      { opacity: 0, scale: 0.5, rotation: -15 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top bottom-=50",
        },
      }
    );

    // Add pulse animation to the plus signs
    gsap.to(".stats-plus", {
      scale: 1.2,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    stats.forEach((stat) => {
      const el = document.querySelector(stat.el);
      if (el) {
        let startValue = 0;
        const endValue = stat.value;
        const duration = 2;

        gsap.to({}, {
          duration,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=100",
          },
          onUpdate: function () {
            const progress = this.progress();
            const currentValue = Math.round(progress * endValue);
            if (currentValue !== startValue) {
              startValue = currentValue;
              el.textContent = startValue.toString();
            }
          }
        });
      }
    });

    // Features animation
    gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          }
        }
      );
    });
  }, []);

  const features = [
    {
      title: t("services.recruitment.title"),
      description: t("services.recruitment.description"),
      icon: <Users className="h-10 w-10 text-loginhr-600" />,
    },
    {
      title: t("services.attendance.title"),
      description: t("services.attendance.description"),
      icon: <CalendarClock className="h-10 w-10 text-loginhr-600" />,
    },
    {
      title: t("services.personnel.title"),
      description: t("services.personnel.description"),
      icon: <Users2 className="h-10 w-10 text-loginhr-600" />,
    },
    {
      title: t("services.payroll.title"),
      description: t("services.payroll.description"),
      icon: <Award className="h-10 w-10 text-loginhr-600" />,
    },
    {
      title: t("services.performance.title"),
      description: t("services.performance.description"),
      icon: <CheckCircle className="h-10 w-10 text-loginhr-600" />,
    },
    {
      title: t("services.fleet.title"),
      description: t("services.fleet.description"),
      icon: <HousePlus className="h-10 w-10 text-loginhr-600" />,
    },
  ];

  const companies = ["/companies/egyptfoods.png", "/companies/concord.png",
    "/companies/imtenan.png", "/companies/bingo.png"
    , "/companies/mersal.png", "/companies/rsm.png"]

  return (
    <>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-loginhr-800 via-loginhr-800 to-loginhr-800 pt-[100px]"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Abstract blurred shapes */}
          <div className="hero-blob absolute -top-20 -left-20 w-96 h-96 rounded-full bg-loginhr-700 opacity-10 blur-[100px]"></div>
          <div className="hero-blob absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-loginhr-800 opacity-10 blur-[80px]"></div>
          <div className="hero-blob absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-loginhr-500 opacity-10 blur-[120px]"></div>

          {/* Mesh grid pattern */}
          <div
            className="hero-mesh absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: 0,
            }}
          ></div>

          {/* Particle dots */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom mx-auto flex flex-col items-center text-center">
          {/* Text Content */}
          <div className={`max-w-3xl ${direction === 'rtl' ? 'rtl:text-right' : ''}`}>
            {/* Badge */}
            <div className="hero-badge inline-flex mb-5 justify-center">
              <div className="bg-primary-foreground/30 backdrop-blur-sm rounded-full px-4 py-2 flex items-center rtl:flex-row-reverse">
                <span className="notification-dot w-2 h-2 rounded-full bg-primary-foreground mr-2 rtl:mr-0 rtl:ml-2"></span>
                <span className="text-sm font-medium text-white">
                  {language === 'en' ? 'Transforming HR Management' : 'تحويل إدارة الموارد البشرية'}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="hero-title w-full text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              {language === 'en'
                ? 'Empower Your Workforce With Intelligent HR Solutions'
                : 'تمكين القوى العاملة مع حلول ذكية للموارد البشرية'}
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-lg md:text-xl text-loginhr-100 mb-8 font-light leading-relaxed">
              {language === 'en'
                ? 'Streamline your HR operations with our all-in-one platform that eliminates tedious tasks and provides actionable data insights to build exceptional workplace experiences.'
                : 'قم بتبسيط عمليات الموارد البشرية من خلال منصتنا الشاملة التي تلغي المهام المملة وتوفر رؤى قائمة على البيانات لبناء تجارب عمل استثنائية.'}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaButtonRef} className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link
                to="/services"
                className="cta-button relative bg-primary-foreground hover:bg-loginhr-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span>{language === 'en' ? 'Book a Demo' : 'احجز عرضًا توضيحيًا'}</span>
                  <ArrowRight
                    className={`ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform ${direction === 'rtl' ? 'rotate-180' : ''
                      }`}
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-loginhr-500 to-loginhr-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
              </Link>

              <Link
                to="/contact"
                className="cta-button border border-loginhr-400 text-loginhr-100 hover:bg-loginhr-400 hover:text-white px-8 py-4 rounded-lg font-medium transition-all duration-300"
              >
                {language === 'en' ? 'Discover Our Solutions' : 'اكتشف حلولنا'}
              </Link>
            </div>
          </div>

          {/* Hero Image + Floating Badges */}
          <div className="relative mt-16 w-full max-w-2xl md:max-w-4xl  mx-auto hero-image-container">
            {/* Main Image */}
            <img
              src="/HeroImage/main.png"
              alt="Hero Illustration"
              className="w-full relative rounded-xl z-10"
            />

            {/* Floating Badges on the edges */}
            <img
              src="/HeroImage/benfits.png"
              alt="Benfits Badge"
              className="floating-badge absolute bottom-2/3 right-[-120px] max-w-[160px] z-20 shadow-lg"
            />
            <img
              src="/HeroImage/payroll.png"
              alt="Payroll Badge"
              className="floating-badge absolute top-2/3 left-[-120px] max-w-[160px] z-20 shadow-lg"
            />
            <img
              src="/HeroImage/preformance.png"
              alt="Performance Badge"
              className="floating-badge absolute top-1/3 left-[-120px] max-w-[160px] z-20 shadow-lg"
            />
            <img
              src="/HeroImage/timeOff.png"
              alt="Time Off Badge"
              className="floating-badge absolute bottom-1/3 right-[-120px] max-w-[160px] z-20 shadow-lg"
            />
          </div>

          {/* Trusted Companies */}
          <div className="mt-10 py-8 border-t border-white/10 w-full text-center">
            <p className="text-loginhr-100 text-sm mb-3">
              {language === 'en'
                ? 'Trusted by leading Egyptian companies'
                : 'موثوق به من قبل الشركات الرائدة في مصر'}
            </p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              {companies.map((i) => (
                <div
                  key={i}
                  className="h-12 rounded-md w-16 hover:scale-105 transition-all duration-200"
                >
                  <div className="text-center w-full block pt-2">
                    <img src={i} alt="Company Logo" className="h-10 w-auto mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        ref={statsRef}
        className="relative py-20 bg-white overflow-hidden px-4"
      >

        <div className="container-custom mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-loginhr-800 mb-4 tracking-tight drop-shadow stats-title">
              {t("home.stats.title") || "Why Invest in Login HR"}
            </h2>
            <p className="text-loginhr-600 text-lg md:text-xl max-w-3xl mx-auto stats-subtitle">
              {t("home.stats.subtitle") || "A reliable HR partner offering scalable solutions that support organizational growth and operational excellence."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: <Users className="h-8 w-8" />, id: "stat-clients", label: t("home.stats.clients") },
              { icon: <BarChart3 className="h-8 w-8" />, id: "stat-employees", label: t("home.stats.employees") },
              { icon: <Globe className="h-8 w-8" />, id: "stat-sectors", label: t("home.stats.countries") },
              { icon: <Sparkles className="h-8 w-8" />, id: "stat-years", label: t("home.stats.years") }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="cursor-default group bg-white/20 backdrop-blur-md hover:bg-white/40 hover:scale-105 transition-all duration-500 border rounded-3xl p-10 flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-loginhr-50 opacity-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                <div className="flex items-center justify-center mb-6 w-16 h-16 bg-loginhr-100 group-hover:bg-primary text-primary group-hover:text-white rounded-full transition-all duration-300 shadow-inner">
                  {stat.icon}
                </div>
                <div className="text-5xl font-extrabold text-loginhr-800 mb-2 leading-none flex justify-center">
                  <span id={stat.id} className="tabular-nums stats-number">0</span>
                  <span className="ml-1 stats-plus">+</span>
                </div>
                <p className="text-loginhr-700 text-sm font-semibold uppercase tracking-wide stats-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-primary-foreground/5">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="gsap-reveal section-title text-loginhr-900">{t("home.solutions.title")}</h2>
            <p className="gsap-reveal section-subtitle text-loginhr-700">{t("home.solutions.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-white  shadow-md p-8 border rounded-3xl hover:shadow-lg transition-all  group"
              >
                <div className="mb-6 bg-loginhr-50 p-4 rounded-xl inline-block group-hover:bg-loginhr-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-loginhr-900">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <Link
                  to="/services"
                  className="text-loginhr-600 font-semibold flex items-center hover:text-loginhr-700 transition-colors group"
                >
                  <span>{language === "en" ? "Learn More" : "المزيد"}</span>
                  <ArrowRight className={`ml-2 rtl:mr-2 rtl:ml-0 h-4 w-4 transition-transform group-hover:translate-x-1 ${direction === "rtl" ? "transform rotate-180" : ""}`} />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/services"
              className="btn-primary bg-loginhr-700 inline-flex items-center"
            >
              <span>{language === "en" ? "View All Services" : "عرض جميع الخدمات"}</span>
              <ArrowRight className={`ml-2 rtl:mr-2 rtl:ml-0 h-5 w-5 ${direction === "rtl" ? "transform rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </div>
      {/* Employee Mobile App Section */}
      <EmployeeMobileApp />

      {/* Insert HR Analytics Dashboard Section */}
      <HRInsightsDashboard />

      {/* Testimonial Section */}
      <div className="py-24 bg-gradient-to-b from-white to-primary-foreground/5">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="gsap-reveal section-title text-loginhr-900">{t("home.testimonials.title")}</h2>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 md:p-12 shadow-md gsap-reveal border-t-4 border-loginhr-600">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-8 md:mb-0 md:mr-8 rtl:mr-0 rtl:ml-8">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-1 border-loginhr-100 shadow-md mx-auto">
                  <img
                    src="/kareem.jpg"
                    alt="Client"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-loginhr-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-md text-loginhr-900 mb-8 font-light leading-relaxed italic">
                  {language === "en"
                    ? "As a systems administrator in MasryaGroup (FlamingoHyperMarket ,Abdulaziz stores,Masrya Market ,Masrya Trading),  I'll talk about the I.T department. It's one of the strongest systems I've seen for HR and technical support. They know what they're doing. Thanks, Login HR."
                    : "لقد غيرت LoginHR عمليات الموارد البشرية لدينا. ما كان يستغرق أياماً أصبح يستغرق دقائق، وموظفونا أكثر سعادة بالتجربة المبسطة."
                  }
                </p>
                <div className="border-t border-loginhr-100 pt-6">
                  <h4 className="font-bold text-loginhr-900 text-lg">
                    {language === "en" ? "Kareeem Mokbel" : "كريم مقبل"}
                  </h4>
                  <p className="text-loginhr-600">
                    {language === "en" ? "System Administrator." : "مديرة الموارد البشرية، شركة الحلول العالمية"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Client Logo Carousel Section */}
      <ClientLogoCarousel />
    </>
  );
};

export default Home;
