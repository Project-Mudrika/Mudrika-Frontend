import React from "react";
import NavBar from "../components/NavBar";
import SearchByCaseIdForm from "../components/SearchByCaseIdForm";
import RegistrationCard from "../components/Registration_redirect";

import styles from "../../styles/Home.module.scss";
import Router from "next/router";

function Retrieve() {
  const handleCaseClick = () => {
    Router.push("/public/search-casequery");
  };
  const handleDeptClick = () => {
    Router.push("/register/volunteer-registration");
  };

  return (
    <div className={styles.home}>
      {/* <NavBar loginPage={true} /> */}
      {/* <RegisterForm /> */}
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
          // material-symbols:admin-panel-settings
          icon="ic:round-menu-book"
          title="Search by Case ID"
          description="View the activity by searching with caseId"
          //footer_text="Requires token from Adminstrator"
          onClick={handleCaseClick}
        />
        <RegistrationCard
          type="dept"
          icon="heroicons:building-office-2-20-solid"
          title="Search by Department"
         description="View the activity by searching with department"
          //footer_text="Requires Metamask Wallet Account"
          onClick={handleDeptClick}
        />
      </div>
    </div>
  );
}

export default Retrieve;
