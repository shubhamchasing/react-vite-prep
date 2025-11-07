import { useState, useEffect } from "react";
import "./styles.css";

const messages = [
  "Hello, welcome to the typewriter effect!",
  "This demonstrates useEffect and setInterval in React.",
  "Watch as each character appears one by one.",
  "You can skip the animation if you're impatient!",
  "Thanks for watching the typewriter in action!",
];

export function TypeWriterMessage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const startTyping = () => {
    // TODO: Implement start typing logic
    setIsTyping(true);
    setShowSkip(true);
    setDisplayedText("");
  };

  const skipTyping = () => {
    // TODO: Implement skip typing logic
    setShowSkip(false);
    setIsTyping(false);
    setDisplayedText(messages[currentMessageIndex]);
  };

  const nextMessage = () => {
    // TODO: Implement next message logic
    const newIndex = (currentMessageIndex + 1) % messages.length;
    setCurrentMessageIndex(newIndex);
    setDisplayedText("");
    setIsTyping(false);
  };

  // TODO: Implement useEffect with setInterval for typewriter effect
  useEffect(() => {
    // TODO: Add setInterval logic here
    let timer;
    if (isTyping) {
      timer = setInterval(() => {
        setDisplayedText((prev) => {
          const curr =
            prev +
            messages[currentMessageIndex].slice(
              displayedText.length,
              displayedText.length + 1
            );
          return curr;
        });
      }, 100);
    }
    if (displayedText === messages[currentMessageIndex]) {
      setIsTyping(false);
      setShowSkip(false);
    }
    return () => clearInterval(timer);
  }, [displayedText, currentMessageIndex, isTyping]);

  return (
    <div className="typewriter-container">
      <h1>Typewriter Effect</h1>

      <div className="message-display">
        <p className="displayed-text">{displayedText}</p>
        {isTyping && <span className="cursor">|</span>}
      </div>

      <div className="controls">
        <button
          onClick={startTyping}
          className="start-button"
          disabled={showSkip}
        >
          Start
        </button>

        {showSkip && (
          <button onClick={skipTyping} className="skip-button">
            Skip
          </button>
        )}

        <button
          onClick={nextMessage}
          className="next-button"
          disabled={showSkip}
        >
          Next
        </button>
      </div>

      <div className="message-info">
        <p>
          Message {currentMessageIndex + 1} of {messages.length}
        </p>
        <p className="instruction">
          Watch the typewriter effect or use the Skip button to see the full
          message instantly!
        </p>
      </div>
    </div>
  );
}
