import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";

interface NavBarProps {
  isScrolled: boolean;
  techStackRef: React.RefObject<HTMLDivElement>;
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
}

function NavBar({ isScrolled, techStackRef, scrollToSection }: NavBarProps) {
  const [stickyClass, setStickyClass] = useState("justify-content-center");
  let ListItems = ["Home", "Technologies", "Projects", "Contact"];
  const desktopWidthThreshold = 768;
  const isDesktopOrLaptop = window.innerWidth >= desktopWidthThreshold;

  useEffect(() => {
    const handleResize = () => {
      if (isDesktopOrLaptop) {
        isScrolled ? setStickyClass("float-left") : setStickyClass("justify-content-center");
      } else {
        isScrolled ? setStickyClass("justify-content-center fixed-top") : setStickyClass("justify-content-center");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
   
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isScrolled, isDesktopOrLaptop]);

  const handleClick = (item: string) => {
    if (item === "Technologies") {
      scrollToSection(techStackRef);
    }
    // Add more conditions for other sections as needed
  };

  return (
    <nav className={`navbar navbar-expand ${stickyClass}`}>
      <div>
        <div className={`${stickyClass}`}>
          <ul className="nav navbar-nav">
            {ListItems.map((item) => (
              <li key={item} className="nav-item px-5">
                <a className="nav-link" href="#" onClick={() => handleClick(item)}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;