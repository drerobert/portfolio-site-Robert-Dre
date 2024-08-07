import "./styles/App.css";
import NavBar from "./components/NavBar";
import Heading from "./components/Heading";
import TechStackImageBox from "./components/TechStackImageBox";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const techStackRef = useRef<HTMLDivElement>(null);

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
    <>
      <div className="app-container">
        <Heading />
        <NavBar isScrolled={isScrolled} techStackRef={techStackRef} scrollToSection={scrollToSection} />
        <div className={`main-content ${isScrolled ? "scrolled" : ""}`}>
          <div ref={techStackRef}>
            <TechStackImageBox />
          </div>
          {/* Other components/content on the right */}
        </div>
        <div className={`svg-container ${isScrolled ? "scrolled" : ""}`}>
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
        </div>
      </div>
    </>
  );
}

export default App;