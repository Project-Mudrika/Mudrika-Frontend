import React, { useEffect } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import Router from "next/router";
import { Button, Card } from "react-bootstrap";
import { Icon } from "@iconify/react";

import QuickAction from "./QuickAction";

import styles from "../../styles/Dashboard.module.scss";

export default function Dashboard() {
  const { address } = useWeb3();

  useEffect(() => {
    if (!address) {
      Router.push("/");
    }
  });

  // {
  //     description: description,
  //     from: address(this),
  //     to: msg.sender,
  //     fund: amount,
  //     requestId: _requestCount + 1,
  //     approvalStatus: false
  // }

  const req_table_data = [
    {
      req_id: 12022,
      req_address: "pq394vj09w0fpjw0949",
      req_authority: "Kerala",
      req_amount: 8000000,
      req_desc: "Lorem Ipsum Dolor Sit Amet",
    },
    {
      req_id: 12023,
      req_address: "98HI979h07HLKJPjir",
      req_authority: "Rajasthan",
      req_amount: 45000000,
      req_desc: "Lorem Ipsum Dolor Sit Amet",
    },
    {
      req_id: 12024,
      req_address: "pq394vj09w0fpjw0949",
      req_authority: "Uttar Pradesh",
      req_amount: 90000000,
      req_desc: "Lorem Ipsum Dolor Sit Amet",
    },
  ];

  return (
    <div className={styles.Dashboard}>
      <div className={styles.Dashboard_content}>
        <h4 className="h4">Recent Fund Requests</h4>
        <div className={styles.Dashboard_row}>
          <Card bg="light" className={styles.Dashboard_recent_cases}>
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
                      <tr>
                        <td scope="col" key={i}>
                          {tab_data.req_id}
                        </td>
                        <td scope="col" key={i}>
                          {tab_data.req_address}
                        </td>
                        <td scope="col" key={i}>
                          {tab_data.req_authority}
                        </td>
                        <td scope="col" key={i}>
                          {tab_data.req_amount.toLocaleString("hi")}
                        </td>
                        <td scope="col" key={i} className="d-flex">
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
        <h4 className="h4">Quick Actions</h4>
        <div className={styles.Dashboard_quick_actions}>
          <QuickAction icon="ic:baseline-note-add" text="Register New Case" />
          <QuickAction
            icon="ic:baseline-account-balance-wallet"
            text="Manage Funds"
          />
          <QuickAction />
          <QuickAction />
        </div>
      </div>
    </div>
  );
}
