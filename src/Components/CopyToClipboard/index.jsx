import { useState } from "react";
import "./styles.css";

function CopyClipboard() {
  const [inputText, setInputText] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);
  const [error, setError] = useState("");

  const handleCopy = (value) => {
    setError("");
    if (!value.trim()) {
      setError("Type some values to copy");
      return;
    }
    navigator.clipboard.writeText(inputText);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(""), 2000);
  };

  function handleOnChange(e) {
    setInputText(e.target.value);
  }

  return (
    <div className="copyToClipboard">
      <h1>Copy to Clipboard</h1>
      <p>Click the button to copy the text</p>

      <div className="copyToClipboard-container">
        <div className="form">
          <label htmlFor="text">
            Enter your text:
            <input
              type="text"
              id="text"
              data-testid="input-field"
              placeholder="Type Something"
              value={inputText}
              onChange={handleOnChange}
            />
          </label>
          <button
            onClick={() => {
              handleCopy(inputText);
            }}
            className="btn"
            data-testid="copy-button"
          >
            Copy
          </button>
        </div>

        {copyStatus && (
          <div data-testid="copied-message" className="message">
            Copied!
          </div>
        )}

        {error && (
          <div data-testid="error-message" className="errorMessage">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default CopyClipboard;
