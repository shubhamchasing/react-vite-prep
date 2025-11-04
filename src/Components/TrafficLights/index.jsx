import { useState, useEffect } from "react";
import "./styles.css";

const trafficLights = [
  { id: 1, name: "red", duration: 3, nextIndex: 1 },
  { id: 2, name: "yellow", duration: 1, nextIndex: 2 },
  { id: 3, name: "green", duration: 2, nextIndex: 0 },
];

const TrafficLight = () => {
  const [activeLight, setActiveLight] = useState(trafficLights[0]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setActiveLight(trafficLights[activeLight.nextIndex]);
    }, activeLight.duration * 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [activeLight]);

  return (
    <div>
      <h2 data-testid="title">Traffic Lights</h2>
      <div
        className="traffic-light"
        id="traffic-light"
        data-testid="traffic-light"
      >
        <div
          id="red-light"
          data-testid="red-light"
          className={`circle ${activeLight.name === "red" ? "red-on" : ""}`}
        ></div>
        <div
          id="yellow-light"
          data-testid="yellow-light"
          className={`circle ${
            activeLight.name === "yellow" ? "yellow-on" : ""
          }`}
        ></div>
        <div
          id="green-light"
          data-testid="green-light"
          className={`circle ${activeLight.name === "green" ? "green-on" : ""}`}
        ></div>
      </div>
    </div>
  );
};

export default TrafficLight;
