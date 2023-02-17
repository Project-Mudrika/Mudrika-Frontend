import React from "react";
import NavBar from "../components/NavBar";
import OfficerRegisterForm from "../components/OfficerRegisterForm";
import RegistrationCard from "../components/Registration_redirect";

import styles from "../../styles/Home.module.scss";
import Router from "next/router";

function Register() {
  const handleOfficerClick = () => {
    Router.push("/register/officer-registration");
  };
  const handleVolunteerClick = () => {
    Router.push("/register/volunteer-registration");
  };

  return (
    <div className={styles.home}>
      <NavBar loginPage={true} />
      {/* <RegisterForm /> */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <RegistrationCard
          type="officer"
          icon="material-symbols:admin-panel-settings"
          title="Officer Registration"
          description="Register as an officer to gain access to Disaster Management Authority tools and resources."
          footer_text="Requires token from Adminstrator"
          onClick={handleOfficerClick}
        />
        <RegistrationCard
          type="volunteer"
          icon="material-symbols:volunteer-activism-rounded"
          title="Volunteer / Organization Registration"
          description="Register as a volunteer or organization to contribute to disaster relief efforts."
          footer_text="Requires Metamask Wallet Account"
          onClick={handleVolunteerClick}
        />
      </div>
    </div>
  );
}

export default Register;
