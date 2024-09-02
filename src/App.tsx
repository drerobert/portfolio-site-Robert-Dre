// App.tsx
import "./styles/App.css";
import NavBar from "./components/NavBar";
import TechStackImageBox from "./components/TechStackImageBox";
import React, { useState, useEffect, useRef } from "react";
import SelfTestingSection from "./components/SelfTestingSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const techStackRef = useRef<HTMLDivElement>(null);
  const selfTestingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [showName, setShowName] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [,setOverlayTextVisible] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    if (!animationStarted) {
      setAnimationStarted(true);

      setTimeout(() => {
        setShowName(true);
      }, 1000); // Name appears after 1 second

      setTimeout(() => {
        setShowName(false);
        setShowTitle(true);
      }, 2000); // Title appears after 2 seconds

      setTimeout(() => {
        setShowTitle(false);
        setShowImage(true);
      }, 4000); // Image appears after 3.5 seconds

      setTimeout(() => {
        setOverlayTextVisible(true); // Show overlay text after image is fully visible
      }, 5000); // Adjust timing based on the total duration of image transition
    }
  

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);

      // Adjust gradient position based on scroll position
      const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const gradientOffset = scrollPercentage * 100;

      const gradientStop1 = document.getElementById('gradientStop1');
      const gradientStop2 = document.getElementById('gradientStop2');
      const gradientStop3 = document.getElementById('gradientStop3');

      if (gradientStop1 && gradientStop2) {
        gradientStop1.setAttribute('offset', `${gradientOffset}%`);
        gradientStop2.setAttribute('offset', `${gradientOffset + 50}%`);
        gradientStop2.setAttribute('offset', `${gradientOffset + 100}%`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled,animationStarted]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app-container">
      <div className={`main-content ${isScrolled ? "scrolled" : ""}`}>
        <NavBar
          isScrolled={isScrolled}
          headingRef={headingRef}
          techStackRef={techStackRef}
          selfTestingRef={selfTestingRef}
          contactRef={contactRef}
          scrollToSection={scrollToSection}
        />
        <section className="section" id="welcome" ref={headingRef}>
          <div id="welcome-wrapper">
            <div className={`welcome-item name ${showName ? "visible" : ""}`}>
              Drenyovszki Robert
            </div>
            <div className={`welcome-item title ${showTitle ? "visible" : ""}`}>
              QA Engineer
            </div>
            <div className={`welcome-item image ${showImage ? "visible" : ""}`}>
              <img src="Images\portrait.jfif" alt="Drenyovszki Robert" />
              <div className="overlay-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</div>
            </div>
          </div>
        </section>
        <section className="section" id="technologies" ref={techStackRef}>
          <div className="section-wrapper" id="tech-wrapper">
            <TechStackImageBox />
          </div>
        </section>
        <section className="section" id="self-testing" ref={selfTestingRef}>
          <div className="section-wrapper">
            <SelfTestingSection />
          </div>
        </section>
        <section className="section" id="contact" ref={contactRef}>
          <div className="section-wrapper">
            <ContactForm />
          </div>
        </section>
      </div>
      <section className={`svg-container ${isScrolled ? "scrolled" : ""}`}>
        <svg className="vertical-text">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop id="gradientStop1" offset="0%" stopColor="#1ABC9C" />
              <stop id="gradientStop2" offset="50%" stopColor="#1bbd9c" />
              
            </linearGradient>
          </defs>
          <text x="10" y="50" transform="rotate(90 10,50)">
            D. Robert
          </text>
        </svg>
      </section>
      <Footer />
    </div>
  );
}

export default App;
