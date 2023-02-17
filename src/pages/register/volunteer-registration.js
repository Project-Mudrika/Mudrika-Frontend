import React from "react";
import NavBar from "../components/NavBar";

import styles from "../../styles/Home.module.scss";
import VolunteerRegisterForm from "../components/VolunteerRegisterForm";

function volunteer_registration() {
  return (
    <div className={styles.home}>
      <NavBar loginPage={true} />
      <VolunteerRegisterForm />
    </div>
  );
}

export default volunteer_registration;
