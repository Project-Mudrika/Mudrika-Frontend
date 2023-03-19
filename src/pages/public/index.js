import React from "react";
import NavBar from "../components/NavBar";
import RegistrationCard from "../components/Registration_redirect";

import styles from "../../styles/Home.module.scss";
import Router from "next/router";

function Retrieve() {
  const handleCaseClick = () => {
    Router.push("/public/case");
  };
  const handleDeptClick = () => {
    Router.push("/public/department");
  };

  return (
    <div className={styles.home}>
      <NavBar loginPage={true} />
      <div
        style={{
          width: "60rem",
          textAlign: "center",
          height: "50px",
          display: "flex",
          alignItems: "center",

          justifyContent: "space-evenly",
        }}
      >
        <RegistrationCard
          type="officer"
          icon="ic:round-menu-book"
          title="Search by Case ID"
          description="View the activity by searching with caseId"
          onClick={handleCaseClick}
        />
        <RegistrationCard
          type="dept"
          icon="heroicons:building-office-2-20-solid"
          title="Search by Department"
          description="View the activity by searching with department"
          onClick={handleDeptClick}
        />
      </div>
    </div>
  );
}

export default Retrieve;
