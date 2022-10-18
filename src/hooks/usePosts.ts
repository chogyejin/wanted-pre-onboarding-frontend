import { useEffect, useState } from "react";
import { getTodos, Todo } from "../lib/apis";

const usePosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const updateAfterSubmit = (submittedTodo: Todo) => {
    setTodos([...todos, submittedTodo]);
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

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);

      const response = await getTodos();

      if (response.status === 200) {
        setTodos(response.data);
      }

      setIsLoading(false);
    };
    getPosts();
  }, []);

  return {
    todos,
    isLoading,
    updateAfterSubmit,
    updateAfterEdit,
    updateAfterDelete,
  };
};

export default usePosts;
