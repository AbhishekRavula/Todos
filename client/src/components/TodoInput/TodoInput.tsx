import { useState } from "react";
import "./TodoInput.css";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

export const TodoInput = ({
  onAddTodo,
  todoInput = "",
}: {
  onAddTodo: (newTodoName: string) => void;
  todoInput?: string;
}) => {
  const [todoName, setTodoName] = useState(todoInput);

  const onTodoInputChange = (e: any) => {
    setTodoName(e.target.value);
  };

  const handleAddTodo = (e: any) => {
    e.preventDefault();
    setTodoName("");
    onAddTodo(todoName);
  };

  return (
    <form role="form" onSubmit={handleAddTodo} className="todo-input-form">
      <input
        type="text"
        className="todo-input"
        value={todoName}
        onChange={onTodoInputChange}
        data-testid="add-new-item-input"
        placeholder="add your new todo"
        autoFocus
      />
      <button
        type="submit"
        className="todo-add-button"
        onClick={handleAddTodo}
        data-testid="add-new-item-button"
        disabled={todoName.length === 0}
        style={{
          backgroundColor: todoInput ? "yellow" : "blue",
          color: todoInput ? "black" : "white",
        }}
      >
        {todoInput ? <CheckIcon /> : <AddIcon />}
      </button>
    </form>
  );
};
