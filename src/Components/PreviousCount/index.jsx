// import "./styles.css";
import { useState } from "react";
import usePrevious from "./usePrevious";

export default function Counter() {
  const [currentCount, setCurrentCount] = useState(0);
  const previousCount = usePrevious(currentCount);

  const handleOnChange = (count) => {
    setCurrentCount(count);
  };

  return (
    <div className="App">
      <h2>Current Count: {currentCount}</h2>
      <h2>Previous Count: {previousCount}</h2>
      <button onClick={() => handleOnChange(currentCount - 1)}>
        Decrement
      </button>
      <button onClick={() => handleOnChange(0)}>Reset</button>
      <button onClick={() => handleOnChange(currentCount + 1)}>
        Increment
      </button>
    </div>
  );
}
