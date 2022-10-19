import styled from "@emotion/styled";
import { useState } from "react";
import { editTodo, Todo } from "../lib/apis";
import axios from "../lib/axios";

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
    if (!window.confirm("수정할까요?")) {
      return;
    }

    const response = await editTodo({
      id,
      prevTodo: todo,
      newTodo: todoText,
      isChecked,
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
    <Container>
      <Content>
        {isEditing ? (
          <input
            type="text"
            placeholder="변경할 내용을 입력하세요"
            onChange={handleChange}
          />
        ) : (
          <span>{todo}</span>
        )}
      </Content>
      <span>{isCompleted ? "✅" : "❌"}</span>
      <div>
        {!isEditing && (
          <button type="button" onClick={handleisEditingClick}>
            수정
          </button>
        )}
        {isEditing && (
          <>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <button onClick={() => handleEditClick(id)}>확인</button>
            <button onClick={handleCancelClick}>수정 취소</button>
          </>
        )}
        <button type="button" onClick={() => handleDeleteClick(id)}>
          삭제
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #e8e8e8;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  width: 300px;
`;

export default TodoItem;
