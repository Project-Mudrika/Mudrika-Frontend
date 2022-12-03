import React from "react";
import NavBar from "../components/NavBar";

import styles from "../../styles/RegisterSelect.module.scss";

import { Button, Card } from "react-bootstrap";
import Router from "next/router";
function RegisterSelect(props) {
  return (
    <div className={styles.RegisterSelect}>
      <NavBar />

      <Card style={{ width: "18rem" }} className={styles.RegisterSelectCard}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Register User</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              Router.push("./register/officers");
            }}
          >
            Register
          </Button>
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }} className={styles.RegisterSelectCard}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Register Driver</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              Router.push("./register/drivers");
            }}
          >
            Register
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegisterSelect;
