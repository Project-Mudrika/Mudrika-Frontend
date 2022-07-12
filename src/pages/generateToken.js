import React from "react";
import NavBar from "./components/NavBar";

import homeStyles from "../styles/Home.module.scss";
import GenerateTokenForm from "./components/GenerateTokenForm";

function GenerateToken() {
  return (
    <div className={homeStyles.home}>
      <NavBar />
      <GenerateTokenForm />
    </div>
  );
}

export default GenerateToken;
