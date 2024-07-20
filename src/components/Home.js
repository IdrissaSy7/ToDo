import React, { useState, useEffect } from "react";
import { Button, Stack, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Chargement initial des tâches du localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Fonction pour sauvegarder les tâches dans le localStorage
  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Fonction pour ajouter une tâche dans le localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: uuid().slice(0, 8),
      name: task,
      completed: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
    setTask("");
  };

  // Fonction pour supprimer une tâche du localStorage
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Fonction pour marquer une tâche comme complétée ou non
  const handleCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Form onSubmit={handleSubmit}>
          <Stack direction="horizontal" gap={2}>
            <Form.Control
              className="me-auto"
              type="text"
              placeholder="Ajoutez votre tâche"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button className="btnSuccess" variant="success" type="submit">
              <i class="fa-solid fa-plus"></i>
            </Button>
          </Stack>
        </Form>
        {tasks.length > 0 ? (
          tasks.map((item) => (
            <Stack
              direction="horizontal"
              gap={2}
              className="mt-3 pb-2 div-task"
              key={item.id}
            >
              <Form.Check
                type="switch"
                id={`switch-${item.id}`}
                checked={item.completed}
                isValid={true}
                onChange={() => handleCompleted(item.id)}
              />
              <Col
                className={` ${
                  item.completed ? "text-decoration-line-through" : ""
                }`}
              >
                <span className="task-name">
                  <Link to={`/edit/${item.id}`}>{item.name}</Link>
                </span>
              </Col>

              <Button
                className="btnDanger"
                variant="danger"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                <i class="fa-solid fa-trash-can"></i>
              </Button>
            </Stack>
          ))
        ) : (
          <Col className="mt-3 text-center">Aucune tâche disponible</Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
