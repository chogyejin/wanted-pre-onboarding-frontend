import styled from "@emotion/styled";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import usePath from "../hooks/usePath";
import useTodos from "../hooks/useTodos";

const TodoListPage = () => {
  usePath();
  const {
    todos,
    isLoading,
    updateAfterSubmit,
    updateAfterEdit,
    updateAfterDelete,
  } = useTodos();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <TodoForm onTodoSubmit={updateAfterSubmit} />
      <div>
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
    </Container>
  );
};

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
`;

export default TodoListPage;
