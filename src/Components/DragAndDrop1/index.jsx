import { useCallback, useState } from "react";
import "./styles.css";

const initialState = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" },
  { id: "3", name: "Grape" },
  { id: "4", name: "Pineapple" },
  { id: "5", name: "Mango" },
];

function DragDrop() {
  const [availableItems, setAvailableItems] = useState(initialState);
  const [droppedItems, setDroppedItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDragStart = useCallback((item, from) => {
    setDraggedItem(item);
    setDraggedFrom(from);
  }, []);

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleDrop = useCallback(
    (to, e) => {
      e.preventDefault();
      if (!draggedItem) return;

      if (draggedFrom === to) {
        const list = to === "available" ? availableItems : droppedItems;

        const draggedIndex = list.findIndex(
          (item) => item.id === draggedItem.id
        );

        const dropTargetId = e.target.getAttribute("data-id");
        const dropIndex = list.findIndex((item) => item.id === dropTargetId);

        if (dropIndex === -1) return;

        if (draggedIndex !== dropIndex) {
          const reordered = reorder(list, draggedIndex, dropIndex);
          if (to === "available") setAvailableItems(reordered);
          else setDroppedItems(reordered);
        }
      } else {
        if (draggedFrom === "available") {
          setAvailableItems((prev) =>
            prev.filter((item) => item.id !== draggedItem.id)
          );
          setDroppedItems((prev) => [...prev, draggedItem]);
        } else {
          setDroppedItems((prev) =>
            prev.filter((item) => item.id !== draggedItem.id)
          );
          setAvailableItems((prev) => [...prev, draggedItem]);
        }
      }

      setDraggedFrom(null);
      setDraggedItem(null);
    },
    [draggedFrom, draggedItem, availableItems, droppedItems]
  );

  const resetLists = () => {
    setAvailableItems(initialState);
    setDroppedItems([]);
    setDraggedFrom(null);
    setDraggedItem(null);
  };

  const renderItem = (item, from) => {
    return (
      <div
        key={item.id}
        data-id={item.id}
        data-testid={`item-${item.id}`}
        draggable
        onDragStart={() => handleDragStart(item, from)}
        className="item"
      >
        {item.name}
      </div>
    );
  };

  return (
    <div className="app-wrapper">
      <header>
        <h1>Drag & Drop Fruits</h1>
        <button
          className="reset-btn"
          onClick={resetLists}
          data-testid="reset-button"
        >
          Reset Lists
        </button>
      </header>

      <div className="container">
        <div
          className="column"
          onDrop={(e) => handleDrop("available", e)}
          onDragOver={allowDrop}
          data-testid="available-column"
        >
          <h2 data-testid="available-title">Available Fruits</h2>
          {availableItems.length === 0 ? (
            <p className="empty" data-testid="available-empty">
              No fruits here
            </p>
          ) : (
            availableItems.map((item) => renderItem(item, "available"))
          )}
        </div>

        <div
          className="column drop-zone"
          onDrop={(e) => handleDrop("dropped", e)}
          onDragOver={allowDrop}
          data-testid="dropped-column"
        >
          <h2 data-testid="dropped-title">Dropped Fruits</h2>
          {droppedItems.length === 0 ? (
            <p className="empty" data-testid="dropped-empty">
              Drop fruits here
            </p>
          ) : (
            droppedItems.map((item) => renderItem(item, "dropped"))
          )}
        </div>
      </div>
    </div>
  );
}

export default DragDrop;
