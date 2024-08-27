import { Button, Container, Form } from "react-bootstrap";
import TodoList from "./TodoList";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
  const [editTodo, setEditTodo] = useState("");
  const { id, title: newTitle } = editTodo;

  const [title, setTitle] = useState(newTitle);
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { id: uuidv4(), title: title, completed: false };

    if (id) {
      setTodoList(
        todoList.map((i) =>
          i.id === id ? { id, title, completed: i.completed } : i
        )
      );
      setEditTodo("");
    } else {
      setTodoList([...todoList, newTodo]);
    }

    setTitle("");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
    setTitle(newTitle);
  }, [newTitle, todoList]);

  console.log(title);

  return (
    <div className="main">
      <Container className="form-todo">
        <h1 className="mb-3 text-center">Todo App</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="d-flex" controlId="formBasicText">
            <Form.Control
              className="w-75"
              type="text"
              placeholder="Enter new todo..."
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              variant="primary"
              type="submit"
              className="w-25"
              disabled={!title}
            >
              {id ? "Edit Todo" : "Add Todo"}
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <TodoList
        todoList={todoList}
        setTodoList={setTodoList}
        setEditTodo={setEditTodo}
      />
    </div>
  );
};

export default Header;
