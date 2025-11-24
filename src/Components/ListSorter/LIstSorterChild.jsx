import { useState } from "react";
import "./styles.css";

export default function ListSorter({ initialList = [] }) {
  const [copyList, setcopyList] = useState([...initialList]);
  const [sortType, setSortType] = useState("default");

  const handleSelect = (e) => {
    const selectedOption = e.target.value;

    const sortedList = [...copyList];

    switch (selectedOption) {
      case "az":
        sortedList.sort((a, b) => a.localeCompare(b));
        break;
      case "za":
        sortedList.sort((a, b) => b.localeCompare(a));
        break;
      case "length":
        sortedList.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
    setSortType(selectedOption);
    setcopyList(sortedList);
  };

  return (
    <div data-testid="container">
      <div>
        <h2> List Sorter</h2>
      </div>
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        data-testid="sort-dropdown"
        value={sortType}
        onChange={handleSelect}
      >
        <option value="default">Default</option>
        <option value="az">A - Z (Alphabetical)</option>
        <option value="za">Z - A (Reverse Alphabetical)</option>
        <option value="length">Length (Shortest First)</option>
      </select>
      <ul data-testid="list">
        {copyList.map((item, index) => (
          <li data-testid="list-item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
