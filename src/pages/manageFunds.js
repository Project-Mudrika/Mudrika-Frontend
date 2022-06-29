import React, { useState, useEffect } from "react";
import Router from "next/router";
import { Card, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

import Navbar from "./components/NavBar";
import Authority from "../helpers/HigherAuth";

import bodyStyles from "../styles/Home.module.scss";
import styles from "../styles/manageFunds.module.scss";

function manageFunds() {
  // const req_table_data = [
  //   {
  //     req_id: 12022,
  //     req_address: "pq394vj09w0fpjw0949",
  //     req_authority: "Kerala",
  //     req_amount: 8000000,
  //     req_desc: "Lorem Ipsum Dolor Sit Amet",
  //   },
  //   {
  //     req_id: 12023,
  //     req_address: "98HI979h07HLKJPjir",
  //     req_authority: "Rajasthan",
  //     req_amount: 45000000,
  //     req_desc: "Lorem Ipsum Dolor Sit Amet",
  //   },
  //   {
  //     req_id: 12024,
  //     req_address: "pq394vj09w0fpjw0949",
  //     req_authority: "Uttar Pradesh",
  //     req_amount: 90000000,
  //     req_desc: "Lorem Ipsum Dolor Sit Amet",
  //   },
  // ];
  const authority = new Authority();
  const [req_table_data, setRequests] = useState([]);

  useEffect(() => {
    authority.fetchRequests().then((requests) => setRequests(requests));
  }, []);
  return (
    <div className={bodyStyles.home}>
      <Navbar />
      <div className={styles.fund_req_container}>
        <Card bg="light">
          <Card.Body>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Request No</th>
                  <th scope="col">Authority Address</th>
                  <th scope="col">Applicant Authority</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {req_table_data.map((tab_data, i) => {
                  return (
                    <tr key={i}>
                      <td scope="col">{tab_data.req_id}</td>
                      <td scope="col">{tab_data.req_address}</td>
                      <td scope="col">{tab_data.req_authority}</td>
                      <td scope="col">
                        {parseInt(tab_data.req_amount).toLocaleString("hi")}
                      </td>
                      <td scope="col" className="d-flex">
                        <Button
                          size="sm"
                          style={{
                            fontFamily: "Varela Round, sans-serif",
                            margin: "0 0.5rem",
                          }}
                          variant="success"
                        >
                          <Icon icon="material-symbols:done" color="white" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          style={{
                            fontFamily: "Varela Round, sans-serif",
                            margin: "0 0.5rem",
                          }}
                          variant="danger"
                        >
                          <Icon
                            icon="material-symbols:delete-outline-rounded"
                            color="white"
                          />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          style={{
                            fontFamily: "Varela Round, sans-serif",
                            margin: "0 0.5rem",
                          }}
                          variant="link"
                        >
                          More Info
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default manageFunds;
