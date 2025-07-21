import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./styles.css";

const faqs = [
  {
    question: "What is this app about?",
    answer: "This app helps users track and improve their daily habits.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login screen and follow instructions.",
  },
  {
    question: "Can I use this app offline?",
    answer: "Yes, some features are available offline after the initial setup.",
  },
];

function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div className="faq-item" key={index} data-testid={`faq-item-${index}`}>
          <button
            className="faq-question"
            data-testid={`faq-question-${index}`}
            onClick={() => handleToggle(index)}
          >
            <span>{faq.question}</span>
            <span className="faq-icon">
              {activeIndex === index ? (
                <ChevronUp data-testid={`icon-up-${index}`} />
              ) : (
                <ChevronDown data-testid={`icon-down-${index}`} />
              )}
            </span>
          </button>

          {activeIndex === index && (
            <div className="faq-answer" data-testid={`faq-answer-${index}`}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FaqAccordion;
