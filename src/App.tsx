import "./styles/App.css";
import NavBar from "./components/NavBar";
import Heading from "./components/Heading";
import TechStackImageBox from "./components/TechStackImageBox";
import React, { useState, useEffect } from "react";

function App() {


  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <>
      <div className={"app-container"}>
      <Heading />
      <NavBar  isScrolled={isScrolled}/>
        <div className={`main-content ${isScrolled ? "scrolled" : ""}`}>
          <TechStackImageBox />
          {/* Other components/content on the right */}
       </div>
      
      </div>
    </>
  );
}

export default App;
