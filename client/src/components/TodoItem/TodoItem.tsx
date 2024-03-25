import { useState } from "react";
import { ITodoItem } from "../../types/todo";
import "./TodoItem.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneIcon from "@mui/icons-material/Done";
import { TodoInput } from "..";

export const TodoItem = ({
  todoItem,
  onUpdate,
  onDelete,
}: {
  todoItem: ITodoItem;
  onUpdate: (updatedTodoItem: ITodoItem) => void;
  onDelete: (todoItemId: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = () => {
    setIsEditing(true);
  };

  const handleOnUpdate = (todoItemName: string) => {
    onUpdate({
      ...todoItem,
      name: todoItemName,
    });
    setIsEditing(false);
  };

  const handleMarkComplete = () => {
    onUpdate({
      ...todoItem,
      completed: true,
    });
  };

  const handleOnDelete = () => {
    onDelete(todoItem._id);
  };

  if (isEditing) {
    return <TodoInput onAddTodo={handleOnUpdate} todoInput={todoItem.name} />;
  }

  return (
    <div className="todo-item-container">
      <div className="todo-item-name-and-icon">
        {todoItem.completed && <CheckCircleOutlineIcon color="success" />}
        <li>{todoItem.name}</li>
      </div>
      <div className="todo-item-actions">
        {!todoItem.completed && (
          <>
            <button
              onClick={onEdit}
              data-testid={"edit-todo-item" + todoItem.name}
              className="edit-todo-item"
            >
              <EditOutlinedIcon />
            </button>
            <button
              onClick={handleMarkComplete}
              data-testid={"mark-complete-todo-item" + todoItem.name}
              className="mark-complete-todo-item"
            >
              <DoneIcon color="success" />
            </button>
          </>
        )}
        <button
          data-testid={"delete-todo-item" + todoItem.name}
          onClick={handleOnDelete}
          className="delete-todo-item"
        >
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
};
