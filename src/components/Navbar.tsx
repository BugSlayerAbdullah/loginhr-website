
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, Home } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when navigating
    setIsOpen(false);
  }, [location]);


  const navItems = [
    {
      name: t("nav.services"),
      path: "/services",
      subItems: [
        { name: t("nav.recruitment"), path: "/services/recruitment" },
        { name: t("nav.attendance"), path: "/services/attendance" },
        { name: t("nav.payroll"), path: "/services/payroll" },
        { name: t("nav.performance"), path: "/services/performance" },
        { name: t("nav.learning"), path: "/services/learning" }
      ]
    },
    {
      name: t("nav.about"),
      path: "/about",
      subItems: [
        { name: t("nav.personalized"), path: "/about/personalized-software" },
        { name: t("nav.testing"), path: "/about/rigorous-testing" },
        { name: t("nav.quality"), path: "/about/quality-guaranteed" },
        { name: t("nav.mission"), path: "/about/mission" }
      ]
    },
    { name: t("nav.clients"), path: "/clients" },
    { name: t("nav.careers"), path: "/careers" },
  ]



  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-loginhr-800 backdrop-blur-lg shadow-md py-1.5" : "bg-transparent py-4"
        }`}
    >
      <div className="px-10 mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link
            to="/"
            className="flex items-center text-xl font-bold text-loginhr-700 space-x-1 rtl:space-x-reverse rtl:flex-row-reverse"
          >
            <img src="/logo.png" alt="Logo" className="w-12 h-12" />
            <div className="hidden md:block">
              <span className="text-white">Login</span>
              <span className="text-primary-foreground">HR</span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Items */}
        <div className="hidden lg:flex items-center gap-6 rtl:space-x-reverse">
          {navItems.map((item) => (
            <div key={item.path} className="relative group">
              <Link
                to={item.path}
                className={`font-medium transition-colors duration-300 ${isActive(item.path)
                  ? "text-loginhr-600"
                  : "text-gray-600 hover:text-loginhr-600"
                  }`}
              >
                <span className="flex items-center px-4 py-2 rounded-lg text-white hover:text-primary-foreground transition-all duration-200">
                  {item.name}
                  {item.subItems && (
                    <ChevronDown className="w-4 h-4 ms-1 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </span>
              </Link>

              {item.subItems && (
                <div className="absolute left-0 rtl:left-auto rtl:right-0 mt-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 bg-loginhr-500/80 backdrop-blur-3xl rounded-xl shadow-lg z-50 min-w-max">
                  <div className="py-2 bg-loginhr-500/80 rounded-xl">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-white bg-loginhr-500/80 backdrop-blur-3xl hover:bg-loginhr-400 whitespace-nowrap transition-colors duration-200"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Language + Let’s Talk */}
        <div className="hidden lg:flex items-center gap-4 rtl:space-x-reverse">
          <button
            onClick={toggleLanguage}
            className="flex items-center rounded-lg text-white hover:text-primary-foreground transition-all duration-300"
          >
            <Globe size={18} className="inline-block" />
          </button>

          <Link
            to="/contact"
            className="px-4 py-2 rounded-lg bg-primary-foreground text-white hover:bg-loginhr-700 transition-all duration-300 text-sm"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile: Language + Menu */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleLanguage}
            className="flex items-center py-2 rounded-lg text-white hover:text-primary-foreground transition-all duration-300 mr-4 rtl:mr-0 rtl:ml-4"
          >
            <Globe size={18} className="inline-block" />
          </button>

          <button
            onClick={toggleMenu}
            className="text-loginhr-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg absolute w-full">
          <div className="container-custom mx-auto py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 px-4 rounded ${isActive(item.path)
                  ? "bg-loginhr-50 text-loginhr-600"
                  : "text-gray-600 hover:bg-loginhr-50 hover:text-loginhr-600"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
