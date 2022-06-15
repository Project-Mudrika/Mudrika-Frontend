import React from "react";
import { Card } from "react-bootstrap";
import { Icon } from "@iconify/react";

import styles from "../../styles/QuickAction.module.scss";

function QuickAction(props) {
  return (
    <a
      className={styles.QuickAction}
      href={props.href ? props.href : "#quick-action"}
    >
      <Card className={styles.QuickAction_card}>
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Icon
            icon="healthicons:ui-user-profile"
            height={"3em"}
            className="my-3"
          />
          <Card.Text>
            {props.text ? props.text : "Lorem Ipsum Dolor Sit Amet"}
          </Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}

export default QuickAction;
