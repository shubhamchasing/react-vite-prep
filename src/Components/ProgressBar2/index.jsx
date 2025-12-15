import { useEffect, useState } from "react";
import "./styles.css";
const ProgressBarChild = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="outer">
      <div
        className="inner"
        role="progressbar"
        style={{
          transform: `translateX(${animatedProgress - 100}%)`,
          color: animatedProgress < 5 ? "black" : "white",
        }}
      >
        {animatedProgress}%
      </div>
    </div>
  );
};

function ProgressBar2() {
  const bars = [4, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  return (
    <div className="App">
      <h1>Progress bar</h1>
      {bars.map((progress) => (
        <ProgressBarChild key={progress} progress={progress} />
      ))}
    </div>
  );
}
export default ProgressBar2;
