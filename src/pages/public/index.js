import React from "react";
import NavBar from "../components/NavBar";
import RegistrationCard from "../components/Registration_redirect";

import styles from "../../styles/Home.module.scss";
import Router from "next/router";

function Retrieve() {
  const handleCaseClick = () => {
    Router.push("/public/case");
  };
  const handleConsClick = () => {
    Router.push("/public/consignment_track");
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
          description="View the activity by searching with Case ID"
          onClick={handleCaseClick}
        />
        <RegistrationCard
          type="dept"
          icon="mdi:truck-cargo-container"
          title="Track Consignment Details"
          description="View consignment transit and handover history with Consignment ID"
          onClick={handleConsClick}
        />
      </div>
    </div>
  );
}

export default Retrieve;
