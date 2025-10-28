import { useState } from "react";
import "./styles.css";

export default function GetWeekday() {
  const [dateInput, setDateInput] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");

  const handleDateChange = (e) => setDateInput(e.target.value);

  const findDayOfWeek = () => {
    if (!dateInput) return;
    const date = new Date(dateInput);
    const options = { weekday: "long" };
    const dayName = date.toLocaleDateString("en-US", options);
    setDayOfWeek(dayName);
  };

  return (
    <div className="container">
      <h1>Get Weekday</h1>
      <input
        type="date"
        data-testid="date-input"
        value={dateInput}
        onChange={handleDateChange}
      />
      <button data-testid="find-day-btn" onClick={findDayOfWeek}>
        Find Day
      </button>

      {dayOfWeek && (
        <div className="result" data-testid="result">
          The date falls on <strong>{dayOfWeek}</strong>!
        </div>
      )}
    </div>
  );
}
