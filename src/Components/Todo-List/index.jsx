import { useState } from "react";
import "./styles.css";

function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleOnChange = (e) => {
    setTodo(e.target.value);
  };
  const handleAddTodo = () => {
    if (todo.trim()) {
      const value = { id: Math.random(), text: todo, completed: false };
      setTodoList((prev) => [...prev, value]);
      setTodo("");
    }
  };

  const handleCheck = (e) => {
    const id = Number(e.target.value);
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(updatedTodoList);
  };

  const handleDelete = (e) => {
    const id = Number(e.target.value);
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <label htmlFor="input">
        <input
          id="input"
          type="text"
          placeholder="Enter todo"
          className="input-todo"
          value={todo}
          onChange={handleOnChange}
        />
        <button className="btn-add" onClick={handleAddTodo}>
          Add
        </button>
      </label>
      <ul className="todo-list">
        {todoList.map((todo) => (
          //   <div className="todo" key={todo.id}>
          <li
            
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleCheck}
              value={todo.id}
            />

            {todo.text}
            <button onClickCapture={handleDelete} value={todo.id}>
              Delete
            </button>
          </li>
          //   </div>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
