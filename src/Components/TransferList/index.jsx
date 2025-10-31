import { useState } from "react";
import "./styles.css";

export default function TransferList() {
  const [availableList, setAvailableList] = useState([
    { id: 1, value: "Item A", selected: false },
    { id: 2, value: "Item B", selected: false },
    { id: 3, value: "Item C", selected: false },
  ]);
  const [selectedList, setSelectedList] = useState([]);

  const moveToSelected = () => {
    if (availableList.length) {
      const someSelected = availableList.some((item) => item.selected === true);
      if (someSelected) {
        const { selected, remaining } = availableList.reduce(
          (acc, item) => {
            if (item.selected) acc.selected.push({ ...item, selected: false });
            else acc.remaining.push(item);
            return acc;
          },
          { selected: [], remaining: [] }
        );
        console.log(selected, remaining);
        setAvailableList(remaining);
        setSelectedList((prev) => [...prev, ...selected]);
      }
    }
  };

  const moveToAvailable = () => {
    if (selectedList.length) {
      const someSelected = selectedList.some((item) => item.selected === true);
      if (someSelected) {
        const { selected, remaining } = selectedList.reduce(
          (acc, item) => {
            if (item.selected) acc.selected.push({ ...item, selected: false });
            else acc.remaining.push(item);
            return acc;
          },
          { selected: [], remaining: [] }
        );
        setAvailableList((prev) => [...prev, ...selected]);
        setSelectedList(remaining);
      }
    }
  };

  const handleSelectItem = (id, list) => {
    if (list === "available") {
      setAvailableList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, selected: !item.selected } : item
        )
      );
    } else if (list === "selected") {
      setSelectedList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, selected: !item.selected } : item
        )
      );
    }
  };

  return (
    <div className="container">
      {/* TransferList Implementation */}
      <div>
        <h3>Available</h3>
        <div className="item-list">
          {availableList?.map((item, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => {
                  handleSelectItem(item.id, "available");
                }}
              />
              {item.value}
            </label>
          ))}
        </div>
      </div>
      <div className="button-list">
        <button type="button" onClick={moveToAvailable}>
          ←
        </button>
        <button type="button" onClick={moveToSelected}>
          →
        </button>
      </div>
      <div>
        <h3>Selected</h3>
        <div className="item-list">
          {selectedList?.map((item, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => {
                  handleSelectItem(item.id, "selected");
                }}
              />
              {item.value}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
