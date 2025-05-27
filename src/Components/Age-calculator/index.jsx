import { useState } from "react";
import "./styles.css";

function AgeCalculator() {
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [age, setAge] = useState({});

  const handleOnChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleCalulateAge = () => {
    setError("");
    if (!selectedDate) {
      setIsValid(false);
      setAge({});
      setError("Please select a date");
      return;
    }
    const birth = new Date(selectedDate);
    const today = new Date();

    if (birth > today) {
      setIsValid(false);
      setAge({});
      setError("Birthdate cannot be in the future");
      return;
    }
    setIsValid(true);
    console.log(today.getMonth(), birth.getMonth());
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="conatiner">
      <h2 className="title">Age Calculator</h2>
      <label className="label" data-testid="label-birthdate">
        Enter/Select a birthdate:
      </label>
      <input
        id="birthdate"
        type="date"
        className="input-date"
        value={selectedDate}
        onChange={handleOnChange}
        data-testid="input-birthdate"
      />
      <button
        className="btn-calc"
        onClick={handleCalulateAge}
        data-testid="btn-calculate"
      >
        Calculate Age
      </button>
      {isValid ? (
        <p
          className="age-result"
          data-testid="age-result"
        >{`${age.years} years, ${age.months} months, ${age.days} days`}</p>
      ) : (
      error &&  <p className="error-msg" data-testid="error-msg">
          {error}
        </p>
      )}
    </div>
  );
}

export default AgeCalculator;
