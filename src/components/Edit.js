import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [task, setTask] = useState("");
  const { id } = useParams(); // Extrait l'id de l'url
  const navigate = useNavigate();
  // Ajout 21/07/24
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  // Ajout 28/07/24
  const [type, setType] = useState("");

  // Charge les données de la tâche a éditer
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = savedTasks.find((task) => task.id === id);

    console.log(taskToEdit);

    if (taskToEdit) {
      setTask(taskToEdit.name);
      setDetails(taskToEdit.details);
      setDate(taskToEdit.date);
      setType(taskToEdit.type);
    }
  }, [id]);

  // Envoie la nouvelle tâche dans le localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = savedTasks.map((taskItem) =>
      taskItem.id === id
        ? {
            ...taskItem,
            name: task,
            details: details,
            type: type,
          }
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
            <h5 className="text-center">Nom de la tâche</h5>
            <Form.Control
              className="me-auto"
              as="textarea"
              rows={2}
              value={task}
              required
              onChange={(e) => setTask(e.target.value)}
            />
          </Stack>

          <Stack className="mt-3 text-center">
            <label>
              Type :{" "}
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">-- Sélectionnez une catégorie --</option>
                <option value="Travail">Travail</option>
                <option value="Personnel">Personnel</option>
              </select>
            </label>
          </Stack>

          <Stack className="mt-3">
            <h5 className="text-center">Détails</h5>
            <p className="text-center">Créée le {date} </p>
            <Form.Control
              className="me-auto"
              as="textarea"
              rows={5}
              value={details}
              placeholder="Ajoutez ici des détails sur votre tâche"
              onChange={(e) => setDetails(e.target.value)}
            />
          </Stack>

          <div className="text-center ">
            <Button variant="success" type="submit" className="m-3" size="sm">
              Modifier
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate("/")}>
              Fermer
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default Edit;
