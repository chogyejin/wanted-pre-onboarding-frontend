import axios from "../axios";

export const requestSignin = async (values: {
  email: string;
  password: string;
}) => {
  const response = await axios.post<{ access_token: string }>(
    `/auth/signin`,
    values
  );

  return response;
};

export const requestSignup = async (values: {
  email: string;
  password: string;
}) => {
  const response = await axios.post<{ access_token: string }>(
    `/auth/signup`,
    values
  );

  return response;
};

export type Todo = {
  id: string;
  todo: string;
  isCompleted: boolean;
  userId: string;
};

export const getTodos = async () => {
  const response = await axios.get<Todo[]>("/todos");

  return response;
};

export const postTodo = async (todoText: string) => {
  const response = await axios.post<Todo>("/todos", {
    todo: todoText,
  });

  return response;
};

export const editTodo = async ({
  id,
  prevTodo,
  newTodo,
  isChecked,
}: {
  id: string;
  prevTodo: string;
  newTodo: string;
  isChecked: boolean;
}) => {
  const response = await axios.put<Todo>(`/todos/${id}`, {
    todo: newTodo ? newTodo : prevTodo,
    isCompleted: isChecked,
  });

  return response;
};

export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`/todos/${id}`);

  return response;
};
