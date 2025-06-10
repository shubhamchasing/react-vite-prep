import { useState } from "react";
import Toast from "./Toast";

const successToast = {
  message: "Data saved successfully!",
  type: "success",
  duration: 3000,
};
const infoToast = {
  message: "Information loaded",
  type: "info",
  duration: 4000,
};
const errorToast = {
  message: "Error saving data!",
  type: "error",
  duration: 5000,
};

const ToastContainer = () => {
  const [list, setList] = useState([]);

  console.log(list);
  const handleAddToast = (data) => {
    const id =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    setList((prev) => [...prev, { id, ...data }]);

    setTimeout(() => {
      removeToast(id);
    }, data.duration);
  };

  const removeToast = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
            padding:"1rem"
        }}
      >
        <button onClick={() => handleAddToast(successToast)}>
          Show Success
        </button>
        <button onClick={() => handleAddToast(errorToast)}>Show Error</button>
        <button onClick={() => handleAddToast(infoToast)}>Show Info</button>
      </div>
      <div
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {list.map((item, index) => (
          <Toast key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;
