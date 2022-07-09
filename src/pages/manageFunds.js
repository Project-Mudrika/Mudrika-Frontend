import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

import Navbar from "./components/NavBar";
import Authority from "../helpers/Authority";

import bodyStyles from "../styles/Home.module.scss";
import styles from "../styles/manageFunds.module.scss";
import FundRequestTable from "./components/FundRequestTable";

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

  const handleApprove = async (reqid) => {
    await authority.approveRequest(reqid);

    // reload after 5 seconds
    // setTimeout(function () {
    //   window.location.reload();
    // }, 2000);
    console.log("Request approved");
    authority.fetchRequests().then((requests) => {
      setRequests(requests);
    });
  }

  useEffect(() => {
    authority.fetchRequests().then((requests) => setRequests(requests));
  }, []);
  return (
    <div className={bodyStyles.home}>
      <Navbar />
      <div className={styles.fund_req_container}>
        <Card bg="light">
          <Card.Body>
            <FundRequestTable>
              {req_table_data.map((tab_data, i) => {
                return (
                  <tr key={i}>
                    <td scope="col">{tab_data.req_id}</td>
                    <td scope="col">
                      {tab_data.req_authority.slice(0, 15) + "..."}
                    </td>
                    {/* <td scope="col">{tab_data.req_state}</td> */}
                    <td scope="col">Kerala</td>
                    <td scope="col">
                      {"₹" +
                        parseInt(tab_data.req_amount).toLocaleString("hi-IN")}
                    </td>
                    <td scope="col">
                      {new Date("01 January 2022").toDateString() +
                        " " +
                        new Date("01 January 2022").toLocaleTimeString()}
                    </td>
                    <td scope="col" className="d-flex">
                      <Button
                        size="sm"
                        style={{
                          fontFamily: "Varela Round, sans-serif",
                          margin: "0 0.5rem",
                        }}
                        variant="success"
                        onClick={() => handleApprove(tab_data.req_id)}
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
            </FundRequestTable>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default manageFunds;
