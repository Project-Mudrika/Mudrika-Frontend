import React from "react";
import Router from "next/router";
import { Card } from "react-bootstrap";
import { Icon } from "@iconify/react";

import styles from "../../styles/QuickAction.module.scss";

function QuickAction(props) {
  return (
    <a
      className={styles.QuickAction}
      href={props.href ? props.href : "#quick-action"}
      onClick={props.onClick}
    >
      <Card className={styles.QuickAction_card}>
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Icon
            icon={props.icon ? props.icon : "healthicons:ui-user-profile"}
            height={"3em"}
            className={styles.QuickAction_icon}
          />
          <Card.Text>
            {props.text ? props.text : "Feature Coming Soon..."}
          </Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}

export default QuickAction;
