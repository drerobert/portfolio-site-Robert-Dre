import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [stickyClass, setStickyClass] = useState("justify-content-center");
  let ListItems = ["Home", "Technologies", "Git Repository", "Contact"];
  // Set a width threshold for desktop/laptop monitors (e.g., 768 pixels)
  // Set scroll treshold
  const desktopWidthThreshold = 768;
  const scrollThreshold = 150;
  const isDesktopOrLaptop = window.innerWidth >= desktopWidthThreshold;

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setIsScrolled(scrolled);
    };

    const handleResize = () => {
      
      handleScroll();
      if (isDesktopOrLaptop) {
        isScrolled ? setStickyClass("float-left") : setStickyClass("justify-content-center");
      } else {
        isScrolled ? setStickyClass("justify-content-center fixed-top") : setStickyClass("justify-content-center");
      }
    };

    // Initial check on component mount
    handleResize();
    // Add event listener for scroll and resize
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
   
    // Cleanup: remove event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isScrolled]);

  return (
    <>
      <nav
        className={`navbar navbar-expand ${stickyClass}`}
      >
        <div>
          <div className={`${stickyClass}`}>
            <ul className="nav navbar-nav">
              {ListItems.map((item) => (
                <li key={item} className="nav-item px-5">
                  <a className="nav-link" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
