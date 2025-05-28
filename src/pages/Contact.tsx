
import React, { useEffect, useState, FormEvent } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const { t, language, direction } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Form animation
    gsap.fromTo(
      ".contact-form",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top bottom-=100",
        }
      }
    );
    
    // Contact info animation
    gsap.fromTo(
      ".contact-info",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top bottom-=100",
        }
      }
    );
    
    // Map animation
    gsap.fromTo(
      ".contact-map",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-map",
          start: "top bottom-=100",
        }
      }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        language === "en" 
          ? "Message sent successfully! We'll get back to you soon." 
          : "تم إرسال الرسالة بنجاح! سنعود إليك قريبًا."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-loginhr-50 pt-32 pb-20">
        <div className="container-custom mx-auto text-center">
          <h1 className="gsap-reveal section-title">{t("contact.title")}</h1>
          <p className="gsap-reveal section-subtitle">{t("contact.subtitle")}</p>
        </div>
      </div>
      
      {/* Contact Form and Info */}
      <div className="py-20 bg-white">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="contact-form">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-semibold mb-6 text-loginhr-900">
                  {language === "en" ? "Send us a Message" : "أرسل لنا رسالة"}
                </h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-700 mb-2">{t("contact.form.name")}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-loginhr-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 mb-2">{t("contact.form.email")}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-loginhr-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-gray-700 mb-2">{t("contact.form.phone")}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-loginhr-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">{t("contact.form.message")}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-loginhr-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-loginhr-600 text-white py-3 rounded-lg font-medium hover:bg-loginhr-700 transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting 
                      ? (language === "en" ? "Sending..." : "جارِ الإرسال...") 
                      : t("contact.form.submit")
                    }
                  </button>
                </form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <div className="contact-info bg-loginhr-50 rounded-xl p-8 shadow-md mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-loginhr-900">
                  {language === "en" ? "Contact Information" : "معلومات الاتصال"}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-loginhr-600 mt-1 mr-4 rtl:mr-0 rtl:ml-4" size={24} />
                    <div>
                      <h4 className="font-medium text-loginhr-900 mb-1">{t("contact.info.address")}</h4>
                      <p className="text-gray-600">123 Business Ave, Suite 100<br />New York, NY 10001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-loginhr-600 mt-1 mr-4 rtl:mr-0 rtl:ml-4" size={24} />
                    <div>
                      <h4 className="font-medium text-loginhr-900 mb-1">{t("contact.info.email")}</h4>
                      <p className="text-gray-600">info@loginhr.com<br />support@loginhr.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-loginhr-600 mt-1 mr-4 rtl:mr-0 rtl:ml-4" size={24} />
                    <div>
                      <h4 className="font-medium text-loginhr-900 mb-1">{t("contact.info.phone")}</h4>
                      <p className="text-gray-600">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-loginhr-600 mt-1 mr-4 rtl:mr-0 rtl:ml-4" size={24} />
                    <div>
                      <h4 className="font-medium text-loginhr-900 mb-1">
                        {language === "en" ? "Business Hours" : "ساعات العمل"}
                      </h4>
                      <p className="text-gray-600">
                        {language === "en" 
                          ? "Monday - Friday: 9:00 AM - 5:00 PM" 
                          : "الاثنين - الجمعة: 9:00 صباحًا - 5:00 مساءً"}
                        <br />
                        {language === "en" 
                          ? "Saturday - Sunday: Closed" 
                          : "السبت - الأحد: مغلق"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map placeholder */}
              <div className="contact-map bg-gray-200 rounded-xl overflow-hidden h-64 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">
                      {language === "en" ? "Map placeholder" : "موضع الخريطة"}
                    </p>
                    <span className="bg-loginhr-600 text-white px-3 py-1 rounded text-sm">
                      {language === "en" ? "LoginHR Headquarters" : "المقر الرئيسي لـ LoginHR"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Offices Section */}
      <div className="py-20 bg-gray-50">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="gsap-reveal text-3xl font-bold mb-6 text-loginhr-900">
              {language === "en" ? "Our Global Offices" : "مكاتبنا حول العالم"}
            </h2>
            <p className="gsap-reveal text-lg text-loginhr-700 max-w-3xl mx-auto">
              {language === "en" 
                ? "Visit us at any of our international locations for personalized support"
                : "قم بزيارتنا في أي من مواقعنا الدولية للحصول على دعم مخصص"
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gsap-stagger-fade bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-loginhr-900">
                {language === "en" ? "New York" : "نيويورك"}
              </h3>
              <p className="text-gray-600 mb-4">
                123 Business Ave, Suite 100<br />
                New York, NY 10001<br />
                United States
              </p>
              <a href="tel:+15551234567" className="text-loginhr-600 hover:underline">+1 (555) 123-4567</a>
            </div>
            
            <div className="gsap-stagger-fade bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-loginhr-900">
                {language === "en" ? "London" : "لندن"}
              </h3>
              <p className="text-gray-600 mb-4">
                45 Tech Square<br />
                London, EC2A 4BX<br />
                United Kingdom
              </p>
              <a href="tel:+442071234567" className="text-loginhr-600 hover:underline">+44 20 7123 4567</a>
            </div>
            
            <div className="gsap-stagger-fade bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-loginhr-900">
                {language === "en" ? "Dubai" : "دبي"}
              </h3>
              <p className="text-gray-600 mb-4">
                Business Bay Tower<br />
                Sheikh Zayed Road<br />
                Dubai, UAE
              </p>
              <a href="tel:+97143456789" className="text-loginhr-600 hover:underline">+971 4 345 6789</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
