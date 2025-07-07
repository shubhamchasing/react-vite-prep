import { useState, useEffect } from "react";
import "./styles.css";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const newSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${newSeconds
    .toString()
    .padStart(2, "0")}`;
};

function TodoWithTimeout() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    if (value.trim()) {
      setTodo(value);
    }
  };
  const handleAddTodo = () => {
    if (todo.trim()) {
      const newTodo = {
        id: crypto.randomUUID(),
        title: todo,
        time: 0,
        isRunning: false,
      };
      setTodoList((prev) => [...prev, newTodo]);
      setTodo("");
    }
  };
  console.log(todoList);

  const handleStartPause = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        id === todo.id ? { ...todo, isRunning: !todo.isRunning } : todo
      )
    );
  };
  const handleReset = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        id === todo.id ? { ...todo, isRunning: false, time: 0 } : todo
      )
    );
  };
  const handleDelete = (id) => {
    setTodoList((prev) => prev.filter((todo) => id !== todo.id));
  };

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.isRunning ? { ...todo, time: todo.time + 1 } : todo
        )
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="todo-container">
      <h2>Todo with Timer</h2>
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          data-testid="todo-input"
          placeholder="Enter todo"
          value={todo}
          onChange={handleOnChange}
        />
        <button
          className="add-button"
          data-testid="add-button"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todoList.map(({ id, title, isRunning, time }) => (
          <li data-testid="todo-item" className="todo-item" key={id}>
            <div className="todo-content">
              <p className="todo-title">{title}</p>
              <p className="todo-time" data-testid="todo-timer">
                {formatTime(time)}
              </p>
            </div>
            <div className="todo-actions">
              <button
                className={`timer-button ${isRunning ? "pause" : "start"}`}
                data-testid="toggle-button"
                onClick={() => handleStartPause(id)}
              >
                {isRunning ? "Pause" : "Start"}
              </button>
              <button
                className="reset-button"
                data-testid="reset-button"
                onClick={() => handleReset(id)}
              >
                Reset
              </button>
              <button
                className="delete-button"
                data-testid="delete-button"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoWithTimeout;
