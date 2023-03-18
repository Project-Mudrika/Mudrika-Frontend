import React from "react";
import NavBar from "../components/NavBar";
import SearchByCaseIdForm from "../components/SearchByCaseIdForm";

import styles from "../../styles/Home.module.scss";

function search_casequery() {
  return (
    <div className={styles.home}>
      {/* <NavBar loginPage={true} /> */}
      <SearchByCaseIdForm/>
    </div>
  );
}

export default search_casequery;
