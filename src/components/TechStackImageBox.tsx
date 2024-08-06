import React, { useState, useEffect, useRef } from "react";
import "../styles/TechStackImageBox.css";

function TechStackImageBox() {
  const images = [
    { src: "Icons/android_espresso_icon.png", className: "android", text: "Android Espresso" },
    { src: "Icons/Appelium_icon.png", className: "", text: "Appium" },
    { src: "Icons/atlassian_jira_icon.png", className: "", text: "Jira" },
    { src: "Icons/bitbucket_icon.png", className: "", text: "Bitbucket" },
    { src: "Icons/java-icon.png", className: "", text: "Java" },
    { src: "Icons/Jenkins_icon.png", className: "", text: "Jenkins" },
    { src: "Icons/jetpack-compose-icon.png", className: "android-compose", text: "Jetpack Compose" },
    { src: "Icons/Kotlin_icon.png", className: "kotlin", text: "Kotlin" },
    { src: "Icons/playwright_icon.png", className: "", text: "Playwright" },
    { src: "Icons/Robot-framework-icon.png", className: "", text: "Robot Framework" },
    { src: "Icons/selenium_icon.png", className: "", text: "Selenium" }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Key to force re-render
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the container is in view
        if (containerRect.top < windowHeight && containerRect.bottom > 0) {
          setIsVisible(true);
          setAnimationKey(prevKey => prevKey + 1); // Force re-render to restart animations
        } else {
          setIsVisible(false);
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`tech-stack-image-box ${isVisible ? "visible" : ""}`} ref={containerRef}>
      <div className="image-container">
        {images.map((image, index) => (
          <div
            key={`${index}-${animationKey}`} // Use unique key to force re-render
            className="image-item"
            style={{
              animationDelay: isVisible ? `${index * 0.2}s` : "0s", // Stagger appearance only when visible
            }}
          >
            <img
              src={image.src}
              alt={`Tech Stack Image ${index + 1}`}
              className={image.className}
            />
            <p className="image-text">{image.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechStackImageBox;
