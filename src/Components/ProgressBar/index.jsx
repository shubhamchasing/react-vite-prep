import { useEffect, useState } from "react";
import "./style.css";

const conditionalStyle = {
  right: "-1.5rem",
  color: "black",
};

const ProgressBar = ({ progress }) => {
  const [animatedProgress, setAmimatedProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAmimatedProgress(progress);
    }, 100);
  }, [progress]);

  return (
    <div className="outer">
      <div
        className="inner"
        style={{ transform: `translateX(${animatedProgress - 100}%)` }}
      >
        <span
          className="progressLabel"
          style={{ ...(animatedProgress < 5 && conditionalStyle) }}
        >{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
