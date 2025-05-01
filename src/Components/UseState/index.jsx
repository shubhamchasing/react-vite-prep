import { useState } from "react";

const UseState = () => {
  const [count, setCount] = useState(0);
  console.log("useState re-render");
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        count
      </button>
      <button onClick={() => setCount(0)}>
        count to 0
      </button>
      <button onClick={() => setCount(5)}>count to 5</button>
    </div>
  );
}
export default UseState;