import React from "react";
import { Todo } from "../interface/Todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedTodo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {
  const toggleStatus = () => {
    const updatedTodo = { ...todo, status: !todo.status };
    onUpdate(todo.id, updatedTodo);
  };

  return (
    <div>
      <hr></hr>
      <input type="checkbox" checked={todo.status} onChange={toggleStatus} />
      <span>
        {"Công việc " + todo.id}
        {"  "}
        <strong>
          {todo.todo.length == 0 ? "không có nội dung" : todo.todo}
        </strong>{" "}
        {todo.date.toString()}
      </span>
      <button onClick={() => onDelete(todo.id)}>Xóa</button>
    </div>
  );
};

export default TodoItem;
