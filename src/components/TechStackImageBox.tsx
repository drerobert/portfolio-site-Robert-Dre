import "../styles/TechStackImageBox.css";
import React, { useState, useEffect } from "react";

function TechStackImageBox() {
  const images = [
    "Icons/android_espresso_icon.png",
    "Icons/Appelium_icon.png",
    "Icons/atlassian_jira_icon.png",
    "Icons/bitbucket_icon.png",
    "Icons/java-icon.png",
    "Icons/Jenkins_icon.png",
    "Icons/jetpack-compose-icon.png",
    "Icons/Kotlin_icon.png",
    "Icons/playwright_icon.png",
    "Icons/Robot-framework-icon.png",
    "Icons/selenium_icon.png"

    // Add more image paths as needed
  ];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 150; // Adjust this threshold as needed

      // Check if the user has scrolled past the threshold
      setIsVisible(scrollY > threshold);
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);

  return (
    <div className={`tech-stack-image-box ${isVisible ? "visible" : ""}`}>
      {isVisible && (
        <div className="image-container">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Tech Stack Image ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );

}

export default TechStackImageBox;