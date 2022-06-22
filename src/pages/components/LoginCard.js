import React from "react";

import styles from "../../styles/LoginCard.module.scss";
import { Button } from "react-bootstrap";

function LoginCard(props) {
  return (
    <div className={styles.LoginCard}>
      <div className={styles.Login_logo}>
        Mudrika{" "}
        <div className={styles.Login_logo_sub}>
          Disaster Management Infrastructure
        </div>{" "}
      </div>
      <Button
        size="md"
        variant="dark"
        className={styles.Login_Button}
        onClick={props.login}
      >
        <img src="/metamask.svg" alt="" className={styles.Login_metaicon} />
        Sign In with MetaMask
      </Button>
      <div>
        No account? <a href="/register">Register Here</a>
      </div>
    </div>
  );
}

export default LoginCard;
