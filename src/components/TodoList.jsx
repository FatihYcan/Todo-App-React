import { ListGroup } from "react-bootstrap";
import { GoCheck } from "react-icons/go";
import { MdDelete, MdEdit } from "react-icons/md";

const TodoList = ({ todoList, setTodoList, setEditTodo }) => {
  const handleDelete = ({ id }) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleComplete = ({ id }) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="todos" >
      <h2 className="mt-3 text-center">Todos</h2>
      {todoList.map((todo) => (
        <ListGroup key={todo.id}>
          <ListGroup.Item className={todo.completed ? "completed" : ""}>
            <div className="title">{todo.title}</div>
            <div className="icon">
              <GoCheck
                className="text-success"
                onClick={() => handleComplete(todo)}
              />
              <MdEdit
                className="text-warning"
                onClick={() => setEditTodo(todo)}
              />
              <MdDelete
                className="text-danger"
                onClick={() => handleDelete(todo)}
              />
            </div>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </div>
  );
};

export default TodoList;
