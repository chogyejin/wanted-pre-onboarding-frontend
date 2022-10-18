import { useRef, useState } from "react";
import { postTodo, Todo } from "../lib/apis";

interface Props {
  onTodoSubmit: (todo: Todo) => void;
}

const TodoForm = ({ onTodoSubmit }: Props) => {
  const [todoText, setTodoText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoText) {
      alert("텍스트를 입력하세요");
      return;
    }

    const response = await postTodo(todoText);

    if (response.status === 201) {
      onTodoSubmit(response.data);
      inputRef.current!.value = "";
      inputRef.current!.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

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
    </div>
  );
};

export default TodoForm;
