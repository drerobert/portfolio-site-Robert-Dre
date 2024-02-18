import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  let ListItems = ["Home", "Technologies", "Git Repository", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      // Set a scroll threshold (e.g., 100 pixels)
      const scrollThreshold = 100;
      const scrolled = window.scrollY > scrollThreshold;
      setIsScrolled(scrolled);
    };

    // Attach event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg ${
          isScrolled ? "float-left" : "justify-content-center"
        }`}
      >
        <div className="container-fluid">
          <div
            className={`navbar-collapse ${
              isScrolled ? "float-left" : "justify-content-center"
            }`}
          >
            <ul className="nav navbar-nav">
              {ListItems.map((item) => (
                <li key={item} className="nav-item">
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
