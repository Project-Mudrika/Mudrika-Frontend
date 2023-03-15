import React from "react";

import homeStyles from "../../styles/Home.module.scss";
import DeptQueryForm from "../components/DeptQueryForm";

function GenerateToken() {
  return (
    <div className={homeStyles.home}>
      
      <DeptQueryForm />
    </div>
  );
}

export default GenerateToken;
