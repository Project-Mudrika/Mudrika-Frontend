import React from "react";

import homeStyles from "../../styles/Home.module.scss";
import DeptQueryForm from "../components/DeptQueryForm";
import NavBar from "../components/NavBar";

function GenerateToken() {
  return (
    <div className={homeStyles.home}>
      <NavBar loginPage={true} />
      <DeptQueryForm />
    </div>
  );
}

export default GenerateToken;
