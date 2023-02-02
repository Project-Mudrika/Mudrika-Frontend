import React from "react";
import NavBar from "../components/NavBar";
import RegisterForm from "../components/RegisterForm";

import styles from "../../styles/Home.module.scss";

function Register() {
  return (
    <div className={styles.home}>
      <NavBar loginPage={true} />
      <RegisterForm />
    </div>
  );
}

export default Register;
