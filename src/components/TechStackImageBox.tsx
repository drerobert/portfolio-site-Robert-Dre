import React, { useState, useEffect, useRef } from "react";
import "../styles/TechStackImageBox.css";

function TechStackImageBox() {
  const images = [
    { src: "Icons/android_espresso_icon.png", className: "", text: "Android Espresso" },
    { src: "Icons/Appelium_icon.png", className: "", text: "Appium" },
    { src: "Icons/atlassian_jira_icon.png", className: "", text: "Jira" },
    { src: "Icons/bitbucket_icon.png", className: "", text: "Bitbucket" },
    { src: "Icons/java-icon.png", className: "", text: "Java" },
    { src: "Icons/Jenkins_icon.png", className: "", text: "Jenkins" },
    { src: "Icons/jetpack-compose-icon.png", className: "", text: "Jetpack Compose" },
    { src: "Icons/Kotlin_icon.png", className: "", text: "Kotlin" },
    { src: "Icons/playwright_icon.png", className: "", text: "Playwright" },
    { src: "Icons/Robot-framework-icon.png", className: "", text: "Robot Framework" },
    { src: "Icons/selenium_icon.png", className: "", text: "Selenium" }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 } // Adjust as needed
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className={`tech-stack-image-box ${isVisible ? "visible" : ""}`} ref={containerRef}>
      <div className="image-container">
        {images.map((image, index) => (
          <div
            key={index}
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
