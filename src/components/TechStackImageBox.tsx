// TechStackImageBox.tsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/TechStackImageBox.css"; // Ensure this path is correct

function TechStackImageBox() {
  const images = [
    { src: "Icons/Espresso_icon.png", bg: "Backgrounds/espresso_bg.png", text: "Android Espresso" },
    { src: "Icons/Appelium_icon.png", bg: "Backgrounds/appelium_bg.png", text: "Appium" },
    { src: "Icons/atlassian_jira_icon.png", bg: "Backgrounds/jira_bg.png", text: "Jira" },
    { src: "Icons/bitbucket_icon.png", bg: "Backgrounds/bitbucket_background.jpg", text: "Bitbucket" },
    { src: "Icons/java-icon.png", bg: "Backgrounds/java_bg.png", text: "Java" },
    { src: "Icons/Jenkins_icon.png", bg: "Backgrounds/jenkins_bg.png", text: "Jenkins" },
    { src: "Icons/jetpack-compose-icon.png", bg: "Backgrounds/jetpack_compose_background.jpg", text: "Jetpack Compose" },
    { src: "Icons/Kotlin_icon.png", bg: "Backgrounds/kotlin_background.jpg", text: "Kotlin" },
    { src: "Icons/playwright_icon.png", bg: "Backgrounds/playwright_background.jpg", text: "Playwright" },
    { src: "Icons/Robot-framework-icon.png", bg: "Backgrounds/robot_framework_background.jpg", text: "Robot Framework" },
    { src: "Icons/selenium_icon.png", bg: "Backgrounds/selenium_background.jpg", text: "Selenium" }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredBackground, setHoveredBackground] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
    <div
      className={`tech-stack-image-box ${isVisible ? "visible" : ""}`}
      ref={containerRef}
    >
      {/* Overlay for the hovered background */}
      {hoveredBackground && (
        <div
          className="background-overlay"
          style={{ backgroundImage: `url(${hoveredBackground})` }}
        ></div>
      )}

      <div className="image-container">
        {images.map((image, index) => (
          <div
            key={index}
            className="image-item"
            style={{
              animationDelay: isVisible ? `${index * 0.2}s` : "0s",
            }}
            onMouseEnter={() => setHoveredBackground(image.bg)} 
            onMouseLeave={() => setHoveredBackground(null)} 
          >
            <img
              src={image.src}
              alt={`Tech Stack Image ${index + 1}`}
              className="image-icon"
            />
            <p className="image-text">{image.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechStackImageBox;
