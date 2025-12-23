import { useEffect, useState, useMemo } from "react";
import useDebounce from "./useDebounce";

export default function AutoSearch() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      });
  }, []);

  const suggestion = useMemo(() => {
    if (!debouncedSearch.trim() || data.length === 0) return [];

    const query = debouncedSearch.toLowerCase();

    return data.filter(
      (item) =>
        item.body.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query)
    );
  }, [debouncedSearch, data]);

  const handleOnChange = (e) => {
    const val = e.target.value;
    setSearch(val);
  };

  return (
    <div>
      <input type="text" value={search} onChange={handleOnChange} />
      <div>
        <ul>
          {suggestion?.map((item) => (
            <li key={item.id}>
              {item.title}
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
