import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { ChevronDown } from "lucide-react";

const OPTIONS = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8",
  "Option 9",
  "Option 10",
];

function MultiSelectDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedOptions, setSubmittedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    // setErrorMessage("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    setErrorMessage("");
  };

  const handleSubmit = () => {
    setIsDropdownOpen(false);
    if (selectedOptions.length === 0) {
      setErrorMessage("Please select at least one option.");
      setSubmittedOptions([]);
    } else {
      setSubmittedOptions(selectedOptions);
      setErrorMessage("");
    }
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setSubmittedOptions([]);
    setErrorMessage("");
  };
  console.log("selectedOptions:", selectedOptions);
  console.log("submittedOptions:", submittedOptions);
  console.log("errorMessage:", errorMessage);
  console.log("isDropdownOpen:", isDropdownOpen);
  return (
    <div className="dropdown-container">
      <h2 className="dropdown-title">Multiselect Dropdown Menu</h2>
      <label className="dropdown-label" data-testid="label">Select Options:</label>
      <div className="dropdown-wrapper" ref={dropdownRef}>
        <button
          className="dropdown-toggle"
          onClick={toggleDropdown}
          data-testid="dropdown-button"
        >
          <ChevronDown
            className={`dropdown-icon ${isDropdownOpen ? "rotate" : ""}`}
            data-testid="dropdown-icon"
          />
          <span className="dropdown-button-label">
            {selectedOptions.length > 0
              ? `${selectedOptions.length} selected`
              : "Choose Options"}
          </span>
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu" data-testid="dropdown-menu">
            <li
              className="dropdown-reset"
              onClick={handleReset}
              data-testid="reset-button"
            >
              Reset Selection
            </li>
            {OPTIONS?.map((option) => (
              <li
                className={`dropdown-option ${
                  selectedOptions.includes(option) ? "selected" : ""
                }`}
                key={option}
                onClick={() => handleOptionClick(option)}
                data-testid={`option-${option}`}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  readOnly
                />
                <span className="option-label">{option}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        data-testid="submit-button"
      >
        Submit
      </button>
      <div className="result-area">
        {errorMessage && (
          <p className="error-message" data-testid="error-message">
            {errorMessage}
          </p>
        )}
        {submittedOptions.length > 0 && (
          <div className="selected-options" data-testid="selected-options">
            <strong>Selected:</strong>
            {submittedOptions.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiSelectDropdown;
