import { useState } from "react";
import "./styles.css";

function EvenOrOddChecker() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const validate = () => {
    const temp = Number(input);
    if (input.trim() && Number.isInteger(temp)) {
      return temp % 2 === 0
        ? `The number ${temp} is even.`
        : `The number ${temp} is odd.`;
    } else {
      return "Please enter a valid number.";
    }
  };

  const handleCheck = () => {
    setIsLoading(true);

    setTimeout(() => {
      const msg = validate();

      setMessage(msg);

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="even-odd-container">
      <h1 className="title">Even or Odd Checker</h1>

      <input
        data-testid="number-input"
        className="number-input"
        type="text"
        placeholder="Enter a number"
        value={input}
        onChange={handleOnChange}
      />

      <button
        data-testid="check-button"
        className="check-button"
        onClick={handleCheck}
      >
        Check
      </button>

      <div className="result-area">
        {isLoading ? (
          <div className="loading" data-testid="loading">
            Checking...
          </div>
        ) : (
          <div data-testid="result" className="result">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default EvenOrOddChecker;
