import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Container, Row, Col } from "react-bootstrap";
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
      <Row>
        <Form onSubmit={handleSubmit}>
          <Stack className="mt-5">
            <Form.Control
              className="me-auto"
              as="textarea"
              rows={3}
              value={task}
              required
              onChange={(e) => setTask(e.target.value)}
            />
          </Stack>

          <div className="text-center ">
            <Button variant="success" type="submit" className="m-3">
              Modifier
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Fermer
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default Edit;
