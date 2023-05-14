import React from "react";
import NavBar from "../components/NavBar";
import TrackConsignmentForm from "../components/TrackConsignmentForm.js";

import styles from "../../styles/Home.module.scss";

function search_casequery() {
  return (
    <div className={styles.home}>
      <NavBar loginPage={true} />
      <TrackConsignmentForm />
    </div>
  );
}

export default search_casequery;
