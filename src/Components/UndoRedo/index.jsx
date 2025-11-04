import { useState } from "react";
import "./styles.css";

function UndoRedo() {
  const [text, setText] = useState("");
  const [historyMap, setHistoryMap] = useState([""]);
  const [historyIndex, setHistoryIndex] = useState(0);

  function handleChange(e) {
    const value = e.target.value;
    setText(value);
    const updateHistoryMap = historyMap.slice(0, historyIndex + 1);
    setHistoryMap([...updateHistoryMap, value]);
    setHistoryIndex(updateHistoryMap.length);
  }

  function handleRedo() {
    if (historyIndex < historyMap.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setText(historyMap[historyIndex + 1]);
    }
  }

  function handleUndo() {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setText(historyMap[historyIndex - 1]);
    }
  }
console.log(historyMap)
  return (
    <div className="undoRedo">
      <h1>Undo Redo History</h1>

      <div className="container">
        <textarea
          className="textarea"
          value={text}
          onChange={handleChange}
          data-testid="textarea"
        />

        <div className="buttons">
          <button
            onClick={handleRedo}
            disabled={historyIndex === historyMap.length - 1}
            data-testid="redo-button"
          >
            Redo
          </button>
          <button
            onClick={handleUndo}
            disabled={historyIndex === 0}
            data-testid="undo-button"
          >
            Undo
          </button>
        </div>
      </div>
    </div>
  );
}

export default UndoRedo;
