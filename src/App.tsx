// App.tsx

import NavBar from "./components/NavBar";
import TechStackImageBox from "./components/TechStackImageBox";
import React, { useState, useEffect, useRef } from "react";
import SelfTestingSection from "./components/SelfTestingSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import "./styles/App.css";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const techStackRef = useRef<HTMLDivElement>(null);
  const selfTestingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [showName, setShowName] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [, setOverlayTextVisible] = useState(false);
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

      if (gradientStop1 && gradientStop2 && gradientStop3) {
        gradientStop1.setAttribute('offset', `${gradientOffset}%`);
        gradientStop2.setAttribute('offset', `${gradientOffset + 50}%`);
        gradientStop3.setAttribute('offset', `${gradientOffset + 100}%`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled, animationStarted]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
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
              <span>Drenyovszki</span> Robert
            </div>
            <div className={`welcome-item title ${showTitle ? "visible" : ""}`}>
            <span>QA</span> Engineer
            </div>
            <div className={`welcome-item image ${showImage ? "visible" : ""}`}>
              <img src="Images\portrait.jfif" alt="Drenyovszki Robert" />
              <div className="overlay-text">
              <p><span>This</span> site is made from scratch with the intention of trying out new things and in the mean time show people my work experience.
                It started as a simple site to show my CV and techstack. It became a little creative project. I used Ai heavly during the creation process
                since I am new to React an typescript.
                It's not much, but <mark>I enjoyed making it and in my opinion that's the point.</mark></p>

                <p><span>My</span> name is Drenyovszki Robert. I am currently an automation engineer dabbling in some new technologies.
                The main idea was that this site can test itself. I thought it is a fun idea and I wanted to see what would come out of it.
                This is a bit of a personal site so let me tell you about myself. When I was young... Just kidding, I was never young.
                So anyway Im curious about anything and everything creative. I also like to solve problems in my job and everyday life. Its not always easy, but
                the payoff is always worth it. Please enjoy the site, <mark>I hope you like it</mark>.</p>
              </div>
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
            <div className="download-cv">
              <a href="Files/Drenyovszki_Robert_CV.pdf" download="Drenyovszki_Robert_CV.pdf">
                <button className="btn btn-info btn-lg">Download CV</button>
              </a>
            </div>
          </div>
        </section>
      </div>
      <section className={`svg-container ${isScrolled ? "scrolled" : ""}`}>
        <svg className="vertical-text">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop id="gradientStop1" offset="0%" stopColor="#0e9479" />
              <stop id="gradientStop2" offset="50%" stopColor="#07cc7a" />
              <stop id="gradientStop3" offset="100%" stopColor="#1ccfac" />
            </linearGradient>
          </defs>
          <text x="10" y="50" transform="rotate(90 10,50)">
            D. Robert
          </text>
        </svg>
      </section>
        <svg
      width="100%"
      height="120"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      style={{ display: 'block' }}
    >
      <path
        d="M0 50 C 720 0, 720 100, 1440 50" // A single bump from left to right
        fill="none"
        stroke="#77cccc" // Your line color
        strokeWidth="3" // Slightly thicker for better visibility
        className="waving-line" // Class for animation
      />
    </svg>
      <Footer />
    </div>
  );
}

export default App;
