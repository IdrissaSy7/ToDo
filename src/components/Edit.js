import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [task, setTask] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const { id } = useParams(); // Extrait l'id de l'url
  const navigate = useNavigate();

  // Charge les données de la tâche a éditer
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = savedTasks.find((task) => task.id === id);

    if (taskToEdit) {
      setTask(taskToEdit.name);
      setTaskCompleted(taskToEdit.completed);
    }
  }, [id]);

  // Envoie la nouvelle tâche dans le localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = savedTasks.map((taskItem) =>
      taskItem.id === id
        ? { ...taskItem, name: task, completed: taskCompleted }
        : taskItem
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  return (
    <Container>
      <Row className="mt-5">
        <Form onSubmit={handleSubmit}>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              className="me-auto"
              type="text"
              value={task}
              required
              onChange={(e) => setTask(e.target.value)}
            />
            <Button variant="success" type="submit">
              Modifier
            </Button>
            <div className="vr" />
            <Button variant="secondary" onClick={() => navigate("/")}>
              Fermer
            </Button>
          </Stack>
        </Form>
      </Row>
    </Container>
  );
};

export default Edit;
