import { useState, useEffect } from "react";

// Toast Component
const Toast = ({ message, type, duration }) => {
  const [isVisible, setIsVisible] = useState(true);
  const bgColor =
    type === "success" ? "green" : type === "info" ? "blue" : "red";

  useEffect(() => {
    const timeID = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timeID);
    };
  }, []);

  return isVisible ? (
    <span
      style={{
        width: "18rem",
        padding: "0.75rem",
        borderRadius: "0.25rem",
        backgroundColor: bgColor,
        color: "#ffffff",
      }}
    >
      {message}
    </span>
  ) : null;
};

export default Toast;
