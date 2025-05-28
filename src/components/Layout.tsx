
import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { direction } = useLanguage();
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Animate in elements with the gsap-reveal class
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((elem) => {
        gsap.fromTo(
          elem,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: elem,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Animate staggered elements
      gsap.utils.toArray<HTMLElement>(".gsap-stagger-fade").forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: elem,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
            stagger: 0.1
          }
        );
      });
    }, layoutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={layoutRef}
      className={`flex min-h-screen flex-col ${direction === "rtl" ? "rtl" : "ltr"}`}
    >
      <Navbar />
      <main className="flex-grow">{children}</main>
       <Footer /> 
    </div>
  );
};

export default Layout;
