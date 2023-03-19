import React from "react";
import { Card } from "react-bootstrap";
import { Icon } from "@iconify/react";

import styles from "../../styles/RegistrationCard.module.scss";

function RegistrationCard({ icon, title, description, footer_text, onClick }) {
  return (
    <a href="#" className={styles.RegistrationCard} onClick={onClick}>
      <Card style={{ height: "20rem", width: "20rem" }}>
        <Card.Body>
          <div className="d-flex justify-content-center align-items-center p-4">
            <Icon icon={icon} width="4rem" />
          </div>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="text-muted">{description}</Card.Text>
        </Card.Body>
        {footer_text ? (
          <Card.Footer>
            <small className="text-muted">{footer_text}</small>
          </Card.Footer>
        ) : (
          ""
        )}
      </Card>
    </a>
  );
}

export default RegistrationCard;
