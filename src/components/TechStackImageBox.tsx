import React, { useState, useEffect, useRef } from "react";
import "../styles/TechStackImageBox.css";

function TechStackImageBox() {
   const images = [
    { src: "Icons/android_espresso_icon.png",className: "", bg: "Backgrounds/espresso_bg.jpg", text: "Android Espresso" },
    { src: "Icons/Appelium_icon.png",className: "", bg: "Backgrounds/appium_background.jpg", text: "Appium" },
    { src: "Icons/atlassian_jira_icon.png",className: "", bg: "Backgrounds/jira_background.jpg", text: "Jira" },
    { src: "Icons/bitbucket_icon.png",className: "" ,bg: "Backgrounds/bitbucket_background.jpg", text: "Bitbucket" },
    { src: "Icons/java-icon.png", className: "",bg: "Backgrounds/java_background.jpg", text: "Java" },
    { src: "Icons/Jenkins_icon.png",className: "" ,bg: "Backgrounds/jenkins_background.jpg", text: "Jenkins" },
    { src: "Icons/jetpack-compose-icon.png",className: "" ,bg: "Backgrounds/jetpack_compose_background.jpg", text: "Jetpack Compose" },
    { src: "Icons/Kotlin_icon.png",className: "" ,bg: "Backgrounds/kotlin_background.jpg", text: "Kotlin" },
    { src: "Icons/playwright_icon.png",className: "" ,bg: "Backgrounds/playwright_background.jpg", text: "Playwright" },
    { src: "Icons/Robot-framework-icon.png",className: "" ,bg: "Backgrounds/robot_framework_background.jpg", text: "Robot Framework" },
    { src: "Icons/selenium_icon.png",className: "" ,bg: "Backgrounds/selenium_background.jpg", text: "Selenium" }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

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
    <div
      className={`tech-stack-image-box ${isVisible ? "visible" : ""}`}
      ref={containerRef}
      style={{
        backgroundImage: hoveredImage ? `url(${hoveredImage})` : "url('default-background.jpg')",
      }}
    >
      <div className="image-container">
        {images.map((image, index) => (
          <div
            key={index}
            className="image-item"
            style={{
              animationDelay: isVisible ? `${index * 0.2}s` : "0s",
            }}
            onMouseEnter={() => setHoveredImage(image.bg)}
            onMouseLeave={() => setHoveredImage(null)}
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
