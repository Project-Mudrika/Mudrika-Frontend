import styles from "../styles/Home.module.scss";

import React from "react";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ActivitiesList from "./components/ActivitiesList";
import { Card } from "react-bootstrap";

function volunteers() {
  const [activitiesList, setActivitiesList] = useState([]);

  useEffect(async () => {
    const res = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/volunteer/fetch-activities/`,
        {
          responseType: "json",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .catch((err) => console.error(err));
    const data = await res?.data;

    let formattedActivitiesList = [];
    for (const walletId in data) {
      data[walletId].forEach((userActivity) => {
        formattedActivitiesList = formattedActivitiesList.concat(userActivity);
      });
    }

    setActivitiesList(formattedActivitiesList);
  }, []);

  useEffect(() => console.log(activitiesList), [activitiesList]);

  return (
    <div className={styles.home}>
      <NavBar loginPage />
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          margin: "4rem",
          padding: "0 3rem",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <h2>Volunteer Activities</h2>
        <p className="text-muted">
          View latest activities by volunteer organizations and individuals.
          Provide incentives for their contribution efforts
        </p>
        <ActivitiesList activities={activitiesList} />
      </div>
    </div>
  );
}

export default volunteers;
