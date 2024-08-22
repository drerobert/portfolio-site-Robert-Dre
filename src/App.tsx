// App.tsx
import "./styles/App.css";
import NavBar from "./components/NavBar";
import Heading from "./components/Heading";
import TechStackImageBox from "./components/TechStackImageBox";
import React, { useState, useEffect, useRef } from "react";
import SelfTestingSection from "./components/SelfTestingSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const techStackRef = useRef<HTMLDivElement>(null);
  const selfTestingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);

      // Adjust gradient position based on scroll position
      const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const gradientOffset = scrollPercentage * 100;

      const gradientStop1 = document.getElementById('gradientStop1');
      const gradientStop2 = document.getElementById('gradientStop2');
      const gradientStop3 = document.getElementById('gradientStop3');

      if (gradientStop1 && gradientStop2) {
        gradientStop1.setAttribute('offset', `${gradientOffset}%`);
        gradientStop2.setAttribute('offset', `${gradientOffset + 50}%`);
        gradientStop2.setAttribute('offset', `${gradientOffset + 100}%`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app-container">
      <Heading />
      <NavBar
        isScrolled={isScrolled}
        headingRef={headingRef}
        techStackRef={techStackRef}
        selfTestingRef={selfTestingRef}
        contactRef={contactRef}
        scrollToSection={scrollToSection}
      />

      <div className={`main-content ${isScrolled ? "scrolled" : ""}`}>
        <section className="section" id="welcome" ref={headingRef}>
          <div id="welcome-wrapper">
            <p>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

              1914 translation by H. Rackham
              "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

              Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
              "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p>
          </div>
        </section>
        <section className="section" id="technologies" ref={techStackRef}>
          <div className="section-wrapper" id="tech-wrapper">
            <TechStackImageBox />
          </div>
        </section>
        <section className="section" id="self-testing" ref={selfTestingRef}>
          <div className="section-wrapper">
            <SelfTestingSection />
          </div>
        </section>
        <section className="section" id="contact" ref={contactRef}>
          <div className="section-wrapper">
            <ContactForm />
          </div>
        </section>
      </div>
      <section className={`svg-container ${isScrolled ? "scrolled" : ""}`}>
        <svg className="vertical-text">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop id="gradientStop1" offset="0%" stopColor="#61b7f9" />
              <stop id="gradientStop2" offset="50%" stopColor="#4d83a7" />
              
            </linearGradient>
          </defs>
          <text x="10" y="50" transform="rotate(90 10,50)">
            D. Robert
          </text>
        </svg>
      </section>
      <Footer />
    </div>
  );
}

export default App;
