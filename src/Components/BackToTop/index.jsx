import { useEffect, useState } from "react";
import "./styles.css";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add scroll event listener to toggle visibility

    function handleScroll() {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    // Implement smooth scroll to top

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className="backToTop">
      <h1>Back To Top</h1>
      {Array.from({ length: 20 }, (_, index) => index + 1).map((_, index) => (
        <p key={index} style={{ width: "200px", margin: "0 auto" }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          odit perferendis aliquam ea aspernatur consequatur repellat, dolores
          laborum vitae libero illum reprehenderit assumenda incidunt, veniam
          tempore. Voluptate quam sint odio.
        </p>
      ))}

      <div className="container">
        {/* Show this button only after scrolling down */}
        {isVisible && (
          <button
            className="backtotop-btn"
            onClick={scrollToTop}
            data-testid="back-to-top-btn"
          >
            Back to Top
          </button>
        )}
      </div>
    </div>
  );
}
export default BackToTop;
