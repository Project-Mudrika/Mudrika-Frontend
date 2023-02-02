import Router from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import styles from "../../styles/Home.module.scss";

function consignments() {
  return (
    <div className={styles.home}>
      <NavBar />
      <Button
        onClick={(e) => {
          e.preventDefault();
          Router.push("/consignments/newConsignment");
        }}
      >
        New Consignment
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Cons ID</th>
            <th scope="col">Consignment Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default consignments;
