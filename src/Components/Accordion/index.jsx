import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./styles.css";

function Accordion({ items = [] }) {
  const [showIndex, setShowIndex] = useState(null);

  const handleOnClick = (index) => {
    if (showIndex === index) {
      setShowIndex(null);
    } else {
      setShowIndex(index);
    }
  };

  if (items.length === 0) {
    return <div className="accordion">No items available</div>;
  }

  return (
    <div className="accordion">
      {items?.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            aria-expanded={showIndex === index}
            className="accordion-title"
            onClick={() => handleOnClick(index)}
          >
            {item.title}
            {showIndex === index ? (
              <ChevronUp style={{ float: "right" }} />
            ) : (
              <ChevronDown style={{ float: "right" }} />
            )}
          </button>
          {showIndex === index && (
            <div className="accordion-content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function AccordionParent() {
  const items = [
    {
      title: "JavaScript Basics",
      content: "Learn variables, functions, and loops in JavaScript.",
    },
    {
      title: "React.js Overview",
      content: "Understand components, state, and props in React.",
    },
    {
      title: "Node.js",
      content: "Basics of server-side development with Node.js.",
    },
    {
      title: "Full-Stack Development",
      content: "Build full-stack apps with React and Node.js.",
    },
  ];

  return <Accordion items={items} />;
}

export default AccordionParent;
