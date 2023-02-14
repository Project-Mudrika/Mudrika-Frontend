import React from "react";
import NavBar from "../components/NavBar";
import OfficerRegisterForm from "../components/OfficerRegisterForm";

import styles from "../../styles/Home.module.scss";

function officer_registration() {
  return (
    <div className={styles.home}>
      <NavBar loginPage={true} />
      <OfficerRegisterForm />
    </div>
  );
}

export default officer_registration;
