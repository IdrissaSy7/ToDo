import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./List";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const [task, setTask] = useState("");
  const [id, setId] = useState("");
  const [taskCompleted, setTaskCompleted] = useState("");

  const navigate = useNavigate();

  let index = List.map(function (e) {
    return e.id;
  }).indexOf(id);

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut de la fonction

    let a = List[index];
    a.task = task;

    navigate("/"); // Navigue vers la page d'accueil
  };

  useEffect(() => {
    setTask(localStorage.getItem("Task"));
    setId(localStorage.getItem("Id"));
    setTaskCompleted(localStorage.getItem(taskCompleted));
  }, []);

  return (
    <Container>
      <Row className="mt-5">
        <Form>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              className="me-auto"
              type="text"
              value={task}
              required
              onChange={(e) => setTask(e.target.value)}
            ></Form.Control>
            <Button
              variant="success"
              onClick={(e) => handleSubmit(e)}
              type="submit"
            >
              Modifier
            </Button>
            <div className="vr" />
            <Button variant="success" onClick={() => navigate("/")}>
              Fermer
            </Button>
          </Stack>
        </Form>
      </Row>
    </Container>
  );
};

export default Edit;
