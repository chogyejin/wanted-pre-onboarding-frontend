import { useState } from "react";
import axios from "../lib/axios";
import { Todo } from "../pages/TodoListPage";

interface Props {
  todoObject: Todo;
  onDeleteClick: (id: string) => void;
  onEditClick: (todo: Todo) => void;
}

const TodoItem = ({ todoObject, onDeleteClick, onEditClick }: Props) => {
  const { id, todo, isCompleted } = todoObject;
  const [todoText, setTodoText] = useState("");
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isEditing, setIsEditing] = useState(false);

  const handleisEditingClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleEditClick = async (id: string) => {
    if (!window.confirm("수정할까요??")) {
      return;
    }

    const response = await axios.put<Todo>(`/todos/${id}`, {
      todo: todoText ? todoText : todo,
      isCompleted: isChecked,
    });

    if (response.status === 200) {
      onEditClick(response.data);
      setIsEditing(false);
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (!window.confirm("삭제할까요?")) {
      return;
    }

    const response = await axios.delete(`/todos/${id}`);

    if (response.status === 204) {
      onDeleteClick(id);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div>{todo}</div>
      <div>{isCompleted ? "완료" : "미완료"}</div>
      {!isEditing && (
        <button type="button" onClick={handleisEditingClick}>
          수정
        </button>
      )}
      {isEditing && (
        <div>
          <input
            type="text"
            placeholder="변경할 내용을 입력하세요"
            onChange={handleChange}
          />
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <button onClick={() => handleEditClick(id)}>수정하기</button>
          <button onClick={handleCancelClick}>수정 취소</button>
        </div>
      )}
      <button type="button" onClick={() => handleDeleteClick(id)}>
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
