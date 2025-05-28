
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-loginhr-900 text-white pt-16 pb-8">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-loginhr-300">Login</span>
              <span className="text-white">HR</span>
            </h3>
            <p className="text-gray-300 mb-6">{t("home.hero.subtitle")}</p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-white hover:text-loginhr-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-loginhr-300 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{language === "en" ? "Quick Links" : "روابط سريعة"}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-loginhr-300 transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-loginhr-300 transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-loginhr-300 transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link to="/mission" className="text-gray-300 hover:text-loginhr-300 transition-colors">
                  {t("nav.mission")}
                </Link>
              </li>
              <li>
                <Link to="/clients" className="text-gray-300 hover:text-loginhr-300 transition-colors">
                  {t("nav.clients")}
                </Link>
              </li>
            </ul>
          </div>


          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t("nav.services")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-loginhr-300 transition-colors">
                  {t("services.recruitment.title")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-loginhr-300 transition-colors">
                  {t("services.attendance.title")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-loginhr-300 transition-colors">
                  {t("services.payroll.title")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-loginhr-300 transition-colors">
                  {t("services.performance.title")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-loginhr-300 transition-colors">
                  {t("services.learning.title")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t("nav.contact")}</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={20} className="text-loginhr-300 mr-3 rtl:mr-0 rtl:ml-3 mt-1" />
                <span className="text-gray-300">Nasr Cit, El Kawthar Street, from Hassan Al Mamoun</span>
              </div>
              <div className="flex items-start">
                <MapPin size={20} className="text-loginhr-300 mr-3 rtl:mr-0 rtl:ml-3 mt-1" />
                <span className="text-gray-300">Tanta, El-Geish Street, at the intersection with El-Fateh Street</span>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="text-loginhr-300 mr-3 rtl:mr-0 rtl:ml-3" />
                <span className="text-gray-300" dir="ltr">+20 102 221 6099</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-loginhr-300 mr-3 rtl:mr-0 rtl:ml-3" />
                <span className="text-gray-300">info@login-sys.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start gap-2 border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} LoginHR. {t("footer.rights")}
          </p>

          <Link to="/privacy" className="text-gray-400 hover:text-loginhr-300  transition-colors">
            {t("footer.privacy")}
          </Link>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
