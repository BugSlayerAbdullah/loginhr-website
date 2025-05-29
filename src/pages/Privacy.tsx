
import React, { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";

const Privacy = () => {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    // Animate content sections
    gsap.utils.toArray<HTMLElement>(".policy-section").forEach((section, i) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: i * 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=50",
          }
        }
      );
    });
  }, []);

  // Privacy policy content based on language
  const policyContent = language === "en" ? {
    introduction: "LOGIN HR System is the controller of the personal data you disclose to us and therefore responsible for your personal data under applicable laws.",
    commitmentTitle: "Our Commitment to Your Privacy",
    commitmentContent: "LOGIN is committed to protecting the privacy of our customers. The LOGIN privacy policy (the \"Privacy Policy\") applies to all personal information collected by us, or submitted to us, whether offline or online, including personal information collected or submitted through our websites (our \"Websites\") and any mobile sites, applications, widgets, and other mobile interactive features (collectively, our \"Apps\"). If you do not agree with any of the terms of this Privacy Policy, please do not use the website or submit any personal information.",
    collectionTitle: "Personal Information",
    collectionContent: "\"Personal Information\" is information or pieces of information that could allow you to be personally identified such as: Name, User name, Postal address, Telephone number, Email address, Profile picture.",
    securityTitle: "Security",
    securityContent: "We use reasonable organizational, technical and administrative measures to protect Personal Information under our control. Unfortunately, no data transmission over the Internet or data storage system can be guaranteed to be 100% secure. If you have reason to believe that your interaction with us is no longer secure (for example, if you feel that the security of any account you might have with us has been compromised), please immediately notify us of the problem by contacting us in accordance with the \"Contact Us\" section form.",
    retentionTitle: "Retention Period",
    retentionContent: "We will retain your Personal Information for the period necessary to fulfill the purposes outlined in this Privacy Policy.",
    sensitiveTitle: "Sensitive Information",
    sensitiveContent: "We generally ask that you do not send us, and you do not disclose, any sensitive Personal Information (e.g., information related to racial or ethnic origin, political opinions, religion or other beliefs, health or medical condition, criminal background or trade union membership) on or through the Sites or otherwise to us. In specific exceptions, such as insurance requests, we will make clear how you can do this securely.",
    contactTitle: "Contact Us",
    contactContent: "Please do not hesitate to contact us if you have any questions, comments or concerns about this Privacy Policy.",
    lastUpdated: "Last Updated: May 12, 2025"
  } : {
    introduction: "نظام LOGIN HR هو المتحكم في البيانات الشخصية التي تكشف عنها لنا وبالتالي مسؤول عن بياناتك الشخصية بموجب القوانين المعمول بها.",
    commitmentTitle: "التزامنا بخصوصيتك",
    commitmentContent: "تلتزم LOGIN بحماية خصوصية عملائنا. تنطبق سياسة خصوصية LOGIN (\"سياسة الخصوصية\") على جميع المعلومات الشخصية التي نجمعها، أو تقدم إلينا، سواء كان ذلك عبر الإنترنت أو بدونه، بما في ذلك المعلومات الشخصية التي يتم جمعها أو تقديمها من خلال مواقعنا الإلكترونية (\"مواقعنا\") وأي مواقع جوال، وتطبيقات، وأدوات، وميزات تفاعلية أخرى للجوال (مجتمعة، \"تطبيقاتنا\"). إذا كنت لا توافق على أي من شروط سياسة الخصوصية هذه، فيرجى عدم استخدام الموقع الإلكتروني أو تقديم أي معلومات شخصية.",
    collectionTitle: "المعلومات الشخصية",
    collectionContent: "\"المعلومات الشخصية\" هي معلومات أو أجزاء من المعلومات التي يمكن أن تسمح بالتعرف عليك شخصيًا مثل: الاسم، اسم المستخدم، العنوان البريدي، رقم الهاتف، عنوان البريد الإلكتروني، صورة الملف الشخصي.",
    securityTitle: "الأمان",
    securityContent: "نستخدم تدابير تنظيمية وتقنية وإدارية معقولة لحماية المعلومات الشخصية تحت سيطرتنا. لسوء الحظ، لا يمكن ضمان أن تكون أي عملية نقل للبيانات عبر الإنترنت أو نظام تخزين البيانات آمنة بنسبة 100٪. إذا كان لديك سبب للاعتقاد بأن تفاعلك معنا لم يعد آمنًا (على سبيل المثال، إذا كنت تشعر أن أمان أي حساب قد يكون لديك معنا قد تم المساس به)، فيرجى إخطارنا على الفور بالمشكلة من خلال الاتصال بنا وفقًا لقسم \"اتصل بنا\".",
    retentionTitle: "فترة الاحتفاظ",
    retentionContent: "سنحتفظ بمعلوماتك الشخصية للفترة اللازمة لتحقيق الأغراض الموضحة في سياسة الخصوصية هذه.",
    sensitiveTitle: "المعلومات الحساسة",
    sensitiveContent: "نطلب منك بشكل عام عدم إرسال أي معلومات شخصية حساسة إلينا، وعدم الكشف عنها (مثل المعلومات المتعلقة بالأصل العرقي أو الإثني، أو الآراء السياسية، أو الدين أو المعتقدات الأخرى، أو الحالة الصحية أو الطبية، أو الخلفية الجنائية أو عضوية النقابة) على المواقع أو من خلالها أو بطريقة أخرى إلينا. في استثناءات محددة، مثل طلبات التأمين، سنوضح كيف يمكنك القيام بذلك بشكل آمن.",
    contactTitle: "اتصل بنا",
    contactContent: "لا تتردد في الاتصال بنا إذا كان لديك أي أسئلة أو تعليقات أو مخاوف حول سياسة الخصوصية هذه.",
    lastUpdated: "آخر تحديث: 12 مايو 2025"
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-loginhr-800 via-loginhr-800 to-loginhr-800 pt-32 pb-20">
        <div className="container-custom mx-auto text-center">
          <h1 className="gsap-reveal section-title">{t("privacy.title")}</h1>
          <p className="gsap-reveal section-subtitle">{t("privacy.subtitle")}</p>
        </div>
      </div>
      
      {/* Policy Content */}
      <div className="py-20 bg-white">
        <div className="container-custom mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="policy-section mb-12">
              <p className="text-lg text-gray-700 mb-6">{policyContent.introduction}</p>
            </div>
            
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-loginhr-900">{policyContent.commitmentTitle}</h2>
              <p className="text-gray-700">{policyContent.commitmentContent}</p>
            </div>
            
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-loginhr-900">{policyContent.collectionTitle}</h2>
              <p className="text-gray-700">{policyContent.collectionContent}</p>
            </div>
            
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-loginhr-900">{policyContent.securityTitle}</h2>
              <p className="text-gray-700">{policyContent.securityContent}</p>
            </div>
            
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-loginhr-900">{policyContent.retentionTitle}</h2>
              <p className="text-gray-700">{policyContent.retentionContent}</p>
            </div>
            
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-loginhr-900">{policyContent.sensitiveTitle}</h2>
              <p className="text-gray-700">{policyContent.sensitiveContent}</p>
            </div>
            
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-loginhr-900">{policyContent.contactTitle}</h2>
              <p className="text-gray-700">{policyContent.contactContent}</p>
            </div>
            
            <div className="policy-section text-right rtl:text-left italic text-gray-500">
              {policyContent.lastUpdated}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
