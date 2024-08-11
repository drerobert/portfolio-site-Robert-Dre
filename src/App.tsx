// App.tsx
import "./styles/App.css";
import NavBar from "./components/NavBar";
import Heading from "./components/Heading";
import TechStackImageBox from "./components/TechStackImageBox";
import React, { useState, useEffect, useRef } from "react";
import SelfTestingSection from "./components/SelfTestingSection";
import ContactForm from "./components/ContactForm";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const techStackRef = useRef<HTMLDivElement>(null);
  const selfTestingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);

      // Adjust gradient position based on scroll position
      const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const gradientOffset = scrollPercentage * 100;

      const gradientStop1 = document.getElementById('gradientStop1');
      const gradientStop2 = document.getElementById('gradientStop2');

      if (gradientStop1 && gradientStop2) {
        gradientStop1.setAttribute('offset', `${gradientOffset}%`);
        gradientStop2.setAttribute('offset', `${gradientOffset + 20}%`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app-container">
      <Heading/>
      <NavBar
        isScrolled={isScrolled}
        headingRef={headingRef}
        techStackRef={techStackRef}
        selfTestingRef={selfTestingRef}
        contactRef={contactRef}
        scrollToSection={scrollToSection}
      />

      <div className={`main-content ${isScrolled ? "scrolled" : ""}`}>
        <section className="section" id="welcome" ref={headingRef}>
          <h1>Hello, I'm Robert</h1>
        </section>
        <section className="section" id="technologies" ref={techStackRef}>
          <TechStackImageBox />
        </section>
        <section className="section" id="self-testing" ref={selfTestingRef}>
          <SelfTestingSection />
        </section>
        <section className="section" id="contact" ref={contactRef}>
          <ContactForm />
        </section>
      </div>
      <section className={`svg-container ${isScrolled ? "scrolled" : ""}`}>
        <svg className="vertical-text">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop id="gradientStop1" offset="0%" stopColor="#f7350a" />
              <stop id="gradientStop2" offset="20%" stopColor="#09c0fd" />
            </linearGradient>
          </defs>
          <text x="10" y="50" transform="rotate(90 10,50)">
            D. Robert
          </text>
        </svg>
      </section>
    </div>
  );
}

export default App;
