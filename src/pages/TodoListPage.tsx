import React, { useEffect, useRef, useState } from "react";
import TodoItem from "../components/TodoItem";
import usePath from "../hooks/usePath";
import axios from "../lib/axios";

export type Todo = {
  id: string;
  todo: string;
  isCompleted: boolean;
  userId: string;
};

const TodoListPage = () => {
  usePath();
  const [todoText, setTodoText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);

      const response = await axios.get("/todos");

      if (response.status === 200) {
        setTodos(response.data);
      }

      setIsLoading(false);
    };
    getPosts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoText) {
      alert("텍스트를 입력하세요");
      return;
    }

    const response = await axios.post<Todo>("/todos", {
      todo: todoText,
    });

    if (response.status === 201) {
      setTodos([...todos, { ...response.data }]);
      inputRef.current!.value = "";
      inputRef.current!.focus();
    }
  };

  const updateAfterEdit = (editedTodo: Todo) => {
    const index = todos.findIndex((todo) => todo.id === editedTodo.id);
    todos.splice(index, 1, editedTodo);
    setTodos([...todos]);
  };

  const updateAfterDelete = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...newTodos]);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="to do를 추가하세요"
          onChange={handleChange}
        />
        <button>추가</button>
      </form>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todoObject={todo}
            onDeleteClick={updateAfterDelete}
            onEditClick={updateAfterEdit}
          />
        ))
      ) : (
        <div>목록이 없어요!</div>
      )}
    </div>
  );
};

export default TodoListPage;
