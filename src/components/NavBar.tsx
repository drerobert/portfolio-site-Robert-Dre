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

  const ListItems = ["Home", "Welcome", "Technologies", "Testing", "Contact"];
  
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

  return (
    <nav className={`navbar navbar-expand ${stickyClass}`}>
      <div>
        <ul className="nav navbar-nav">
          {ListItems.map((item) => (
            <li key={item} className="nav-item px-5">
              <a className="nav-link" onClick={() => handleClick(item)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
