
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
    introduction: "This Privacy Policy describes how LoginHR collects, uses, and shares your personal information when you use our services, website, or applications.",
    collectionTitle: "Information We Collect",
    collectionContent: "We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, phone number, company information, and payment details. We also collect information automatically when you use our services, including log data, device information, location information, and cookies.",
    useTitle: "How We Use Your Information",
    useContent: "We use your information to provide, maintain, and improve our services; to process transactions; to send you technical notices and support messages; to communicate with you about products, services, offers, and events; and to monitor and analyze trends and usage of our services. We may also use your information to detect, prevent, and address technical issues and fraudulent or illegal activities.",
    sharingTitle: "Information Sharing",
    sharingContent: "We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, and customer service. We may also share information if required by law, in connection with a merger or acquisition, or with your consent.",
    securityTitle: "Data Security",
    securityContent: "We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.",
    retentionTitle: "Data Retention",
    retentionContent: "We retain your information for as long as necessary to provide our services and fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.",
    choicesTitle: "Your Rights and Choices",
    choicesContent: "You can access, update, and delete certain information by logging into your account. You can also opt out of receiving promotional communications from us by following the instructions in those communications. If you have any questions about your data or this privacy policy, please contact us.",
    changesTitle: "Changes to This Policy",
    changesContent: "We may update this Privacy Policy from time to time. If we make material changes, we will notify you through our services or by other means, such as email.",
    contactTitle: "Contact Us",
    contactContent: "If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@loginhr.com or by mail at LoginHR, 123 Business Ave, Suite 100, New York, NY 10001, United States.",
    lastUpdated: "Last Updated: May 12, 2025"
  } : {
    introduction: "تصف سياسة الخصوصية هذه كيفية جمع LoginHR واستخدام ومشاركة معلوماتك الشخصية عند استخدام خدماتنا أو موقعنا الإلكتروني أو تطبيقاتنا.",
    collectionTitle: "المعلومات التي نجمعها",
    collectionContent: "نقوم بجمع المعلومات التي تقدمها لنا مباشرة، مثل عندما تقوم بإنشاء حساب، أو ملء نموذج، أو التواصل معنا. قد يشمل ذلك اسمك، وعنوان بريدك الإلكتروني، ورقم هاتفك، ومعلومات الشركة، وتفاصيل الدفع. كما نقوم أيضًا بجمع المعلومات تلقائيًا عند استخدام خدماتنا، بما في ذلك بيانات السجل، ومعلومات الجهاز، ومعلومات الموقع، وملفات تعريف الارتباط.",
    useTitle: "كيفية استخدام معلوماتك",
    useContent: "نستخدم معلوماتك لتقديم خدماتنا وصيانتها وتحسينها؛ لمعالجة المعاملات؛ لإرسال إشعارات فنية ورسائل دعم إليك؛ للتواصل معك بشأن المنتجات والخدمات والعروض والأحداث؛ ولمراقبة وتحليل الاتجاهات واستخدام خدماتنا. قد نستخدم معلوماتك أيضًا للكشف عن المشكلات الفنية والأنشطة الاحتيالية أو غير القانونية ومنعها ومعالجتها.",
    sharingTitle: "مشاركة المعلومات",
    sharingContent: "قد نشارك معلوماتك مع مقدمي الخدمات من الطرف الثالث الذين يؤدون الخدمات نيابة عنا، مثل معالجة الدفع، وتحليل البيانات، وتسليم البريد الإلكتروني، وخدمة العملاء. قد نشارك أيضًا المعلومات إذا كان ذلك مطلوبًا بموجب القانون، فيما يتعلق بعملية دمج أو استحواذ، أو بموافقتك.",
    securityTitle: "أمن البيانات",
    securityContent: "نتخذ تدابير معقولة للمساعدة في حماية معلوماتك الشخصية من الضياع أو السرقة أو سوء الاستخدام أو الوصول غير المصرح به أو الكشف أو التغيير أو التدمير. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة 100٪.",
    retentionTitle: "الاحتفاظ بالبيانات",
    retentionContent: "نحتفظ بمعلوماتك طالما كان ذلك ضروريًا لتقديم خدماتنا وتحقيق الأغراض الموضحة في سياسة الخصوصية هذه، ما لم تكن هناك فترة احتفاظ أطول مطلوبة أو مسموح بها بموجب القانون.",
    choicesTitle: "حقوقك وخياراتك",
    choicesContent: "يمكنك الوصول إلى معلومات معينة وتحديثها وحذفها عن طريق تسجيل الدخول إلى حسابك. يمكنك أيضًا إلغاء الاشتراك في تلقي الاتصالات الترويجية منا باتباع التعليمات الواردة في تلك الاتصالات. إذا كان لديك أي أسئلة حول بياناتك أو سياسة الخصوصية هذه، فيرجى الاتصال بنا.",
    changesTitle: "التغييرات في هذه السياسة",
    changesContent: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. إذا أجرينا تغييرات جوهرية، سنخطرك من خلال خدماتنا أو بوسائل أخرى، مثل البريد الإلكتروني.",
    contactTitle: "اتصل بنا",
    contactContent: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات البيانات لدينا، فيرجى الاتصال بنا على privacy@loginhr.com أو عن طريق البريد على LoginHR، 123 Business Ave، Suite 100، New York، NY 10001، الولايات المتحدة.",
    lastUpdated: "آخر تحديث: 12 مايو 2025"
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-loginhr-50 pt-32 pb-20">
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
              <h2 className="text-2xl font-semibold mb-4 text-loginhr-900">{policyContent.collectionTitle}</h2>
              <p className="text-gray-700">{policyContent.collectionContent}</p>
            </div>
            
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-loginhr-900">{policyContent.useTitle}</h2>
              <p className="text-gray-700">{policyContent.useContent}</p>
            </div>
            
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-loginhr-900">{policyContent.sharingTitle}</h2>
              <p className="text-gray-700">{policyContent.sharingContent}</p>
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
              <h2 className="text-2xl font-semibold mb-4 text-loginhr-900">{policyContent.choicesTitle}</h2>
              <p className="text-gray-700">{policyContent.choicesContent}</p>
            </div>
            
            <div className="policy-section mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-loginhr-900">{policyContent.changesTitle}</h2>
              <p className="text-gray-700">{policyContent.changesContent}</p>
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
