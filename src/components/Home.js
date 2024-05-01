import React, { useState } from "react";
import { Button, Stack, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./List";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid"; // Identifiant unique

const Home = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut de la fonction

    const ids = uuid(); // Génere un id unique
    let uniqueId = ids.slice(0, 3); // Extrait les 8 premiers caractères de l'id
    let a = task;
    let b = taskCompleted;

    List.push({ id: uniqueId, task: a, taskCompleted: b }); // Ajoute un objet à List
    setTask("");

    navigate("/"); // Navigue vers la page d'accueil
  };

  // Fonction pour modifier un index
  const handleEdit = (id, task, taskCompleted) => {
    localStorage.setItem("Task", task);
    localStorage.setItem("Id", id);
    localStorage.setItem("TaskCompleted", taskCompleted);
  };

  // Fonction pour supprimer un index
  const handleDelete = (id) => {
    let index = List.map(function (e) {
      return e.id;
    }).indexOf(id);

    List.splice(index, 1);
    navigate("/");
  };

  // Fonction pour rayer la tâche
  const handleCompleted = (item) => {
    item.taskCompleted = !item.taskCompleted;
    navigate("/");
  };

  return (
    <Container>
      <Row className="mt-5">
        <Form>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              className="me-auto"
              type="text"
              placeholder="Ajoutez votre tâche"
              onChange={(e) => setTask(e.target.value)}
            />
            <Button
              variant="success"
              onClick={(e) => handleSubmit(e)}
              type="submit"
            >
              Ajouter
            </Button>
          </Stack>
        </Form>

        {List && List.length > 0 ? (
          List.map((item, index) => {
            return (
              <Stack
                direction="horizontal"
                gap={3}
                className="mt-3"
                id={`div-task-${item.id}`}
                key={index}
              >
                <Form.Check
                  type="switch"
                  id={`switch-${item.id}`}
                  defaultChecked={item.taskCompleted}
                  isValid={true}
                  onClick={() => handleCompleted(item)}
                />
                <Col
                  className={`text-center ${
                    item.taskCompleted ? "text-decoration-line-through" : ""
                  }`}
                >
                  {item.task}
                </Col>
                <Link to={`/edit/${item.id}`}>
                  <Button
                    variant="success"
                    onClick={() =>
                      handleEdit(item.id, item.task, item.taskCompleted)
                    }
                  >
                    Modifier
                  </Button>
                </Link>
                <div className="vr" />
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Supprimer
                </Button>
              </Stack>
            );
          })
        ) : (
          <Col className="mt-3 text-center">Aucune tâche disponible</Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
