import { useState } from "react";
import "./styles.css";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  // Step 1: Create a state variable isOpen and setIsOpen using useState

  // Step 2: Create functions handleOpen and handleClose to toggle modal visibility

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleStopPropogation = (e) => {
    e.stopPropagation();
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", height: "100vh" }}>
      <h1>Modal Popup</h1>

      <button
        onClick={handleOpen}
        style={{ padding: "10px", cursor: "pointer" }}
      >
        Open Modal
      </button>
      {isOpen && (
        <div
          data-testid="modal-backdrop"
          className="modal-overlay"
          onMouseDown={handleClose}
        >
          <div className="modal-content" onMouseDown={handleStopPropogation}>
            <h1>Modal Header</h1>
            <p>This is the modal body</p>
            <button className="close" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Conditionally render the modal when isOpen is true */}
      {/* Modal should close when clicking the backdrop or the Close button */}
      {/* Modal content should not close when clicking inside */}
    </div>
  );
}

export default Modal;
