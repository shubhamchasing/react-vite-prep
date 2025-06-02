import { useState, useCallback } from "react";
import "./styles.css";

const SortableList = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const handleOnchange = (e) => {
    setText(e.target.value);
  };

  const handleAddItem = () => {
    if (text.length > 0) {
      setList((prev) => [...prev, text]);
      setText("");
    }
  };

  const handleSortItems = useCallback((order = "asc") => {
    setList((prev) => {
      const sortedList = [...prev];
      sortedList.sort((a, b) => {
        if (order === "asc") {
          return a.localeCompare(b);
        } else {
          return b.localeCompare(a);
        }
      });
      return sortedList;
    });
  }, []);

  console.log(list);
  return (
    <div className="sortable-list-container">
      <h3>Sortable List</h3>
      <input
        type="text"
        placeholder="Add a new item"
        value={text}
        onChange={handleOnchange}
      />
      <button onClick={handleAddItem}>Add Item</button>

      <div>
        <button onClick={() => handleSortItems("asc")}>Sort Ascending</button>
        <button onClick={() => handleSortItems("desc")}>Sort Descending</button>
      </div>
      <div className="list-items">
        {list?.map((item, index) => (
          <li key={index} id={`item-${index}`}>
            {item}
          </li>
        ))}
      </div>
    </div>
  );
};

export default SortableList;
