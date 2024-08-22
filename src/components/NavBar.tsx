import React, { useState, useEffect, RefObject } from "react";
import "../styles/NavBar.css";

interface NavBarProps {
  isScrolled: boolean;
  headingRef: RefObject<HTMLElement>;
  techStackRef: RefObject<HTMLElement>;
  selfTestingRef: RefObject<HTMLElement>;
  contactRef: RefObject<HTMLElement>;
  scrollToSection: (ref: RefObject<HTMLElement>) => void;
}

function NavBar({
  isScrolled,
  headingRef,
  techStackRef,
  selfTestingRef,
  contactRef,
  scrollToSection,
}: NavBarProps) {
  const [stickyClass, setStickyClass] = useState("justify-content-center");
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const ListItems = ["Welcome", "Technologies", "Testing", "Contact"];
  
  useEffect(() => {
    const handleResize = () => {
      const isDesktopOrLaptop = window.innerWidth >= 768;
      if (isDesktopOrLaptop) {
        setStickyClass(isScrolled ? "float-left" : "justify-content-center");
      } else {
        setStickyClass(isScrolled ? "justify-content-center fixed-top" : "justify-content-center");
      }
    };

    handleResize(); // Call on mount
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isScrolled]);

  const handleClick = (item: string) => {
    switch (item) {
      case "Welcome":
        scrollToSection(headingRef);
        break;
      case "Technologies":
        scrollToSection(techStackRef);
        break;
      case "Testing":
        scrollToSection(selfTestingRef);
        break;
      case "Contact":
        scrollToSection(contactRef);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: headingRef, name: "Welcome" },
        { ref: techStackRef, name: "Technologies" },
        { ref: selfTestingRef, name: "Testing" },
        { ref: contactRef, name: "Contact" },
      ];

      const topOffset = window.innerHeight / 3;

      const currentSection = sections.find(
        ({ ref }) =>
          ref.current &&
          ref.current.offsetTop - topOffset <= window.scrollY &&
          ref.current.offsetTop + ref.current.offsetHeight - topOffset > window.scrollY
      );

      if (currentSection && currentSection.name !== activeSection) {
        setActiveSection(currentSection.name);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection, headingRef, techStackRef, selfTestingRef, contactRef]);

  return (
    <nav className={`navbar navbar-expand ${stickyClass}`}>
      
        <ul className="nav navbar-nav">
          {ListItems.map((item) => (
            <li
            key={item}
            className={`nav-item px-5 ${activeSection === item ? "active" : ""}`}
            >
              <a className="nav-link" onClick={() => handleClick(item)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      
    </nav>
  );
}

export default NavBar;
