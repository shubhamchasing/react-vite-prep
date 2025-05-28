import { useState } from "react";

const outer = {
  position: "relative",
  width: "30rem",
  height: "1.5rem",
  border: "1px solid none",
  borderRadius: "0.5rem",
  margin: "1rem auto",
  backgroundColor: "#ccc",
  overflow: "hidden",
};
const inner = {
  height: "100%",
  transition: "transform 0.25s ease-in",
};

const progressLabel = {
  position: "absolute",
  left: "50%",
  top: "0",
  color: "white",
  fontWeight: "bold",
};

function ProgressBar() {
  const [progressValue, setProgressValue] = useState(0);

  const handleProgress = (value) => {
    setProgressValue((prev) => Math.max(0, Math.min(100, prev + value)));
  };

  const getProgressBarColor = () => {
    if (progressValue >= 80) return "green";
    if (progressValue >= 40) return "orange";
    return "red";
  };

  return (
    <div>
      <h2>Progress Bar</h2>
      <div className="outer" style={outer}>
        <div
          id="testBgColor"
          className="inner"
          style={{
            ...inner,
            transform: `translateX(${progressValue - 100}%)`,
            backgroundColor: getProgressBarColor(),
          }}
        ></div>
        <span className="progressLabel" style={progressLabel}>
          {progressValue}%
        </span>
      </div>
      <div>
        <button
          onClick={() => handleProgress(-10)}
          style={{ marginRight: "1rem" }}
        >
          -10%
        </button>
        <button onClick={() => handleProgress(10)}>+10%</button>
      </div>
    </div>
  );
}

export default ProgressBar;
