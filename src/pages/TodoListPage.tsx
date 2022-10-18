import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import usePath from "../hooks/usePath";
import usePosts from "../hooks/usePosts";

const TodoListPage = () => {
  usePath();
  const {
    todos,
    isLoading,
    updateAfterSubmit,
    updateAfterEdit,
    updateAfterDelete,
  } = usePosts();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <TodoForm onTodoSubmit={updateAfterSubmit} />
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
