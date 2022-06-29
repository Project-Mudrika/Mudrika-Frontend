import React, { useEffect } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import Router from "next/router";
import { Button, Card } from "react-bootstrap";
import { Icon } from "@iconify/react";

import QuickAction from "./QuickAction";

import styles from "../../styles/Dashboard.module.scss";
import Authority from "../../helpers/HigherAuth";
import { useState } from "react";

export default function Dashboard() {
  const { address } = useWeb3();
  const authority = new Authority();
  const [req_table_data, setRequests] = useState([]);

  const approveRequest = async (reqid) => {
    await authority.approveRequest(reqid)

    // reload after 5 seconds
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }

  useEffect(() => {
    if (!address) {
      Router.push("/");
    }
    authority.fetchRequests().then((requests) => setRequests(requests));
  }, []);

  return (
    <div className={styles.Dashboard}>
      <div className={styles.Dashboard_content}>
        <h4 className="h4">Recent Fund Requests To You</h4>
        <div className={styles.Dashboard_row}>
          <Card bg="light" className={styles.Dashboard_recent_cases}>
            <Card.Body>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Request No</th>
                    <th scope="col">To Authority Address</th>
                    <th scope="col">From Applicant Authority</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {req_table_data.slice(0, 5).map((tab_data, i) => {
                    console.log(`tab_data${i}`, tab_data);
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
                            onClick={() => approveRequest(tab_data.req_id)}
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
                            onClick={() =>
                              Router.push("/manageFunds/" + tab_data.req_id)
                            }
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
          <QuickAction
            icon="ic:baseline-note-add"
            text="Allot New Fund"
            href="/manageFunds/newFundRequest"
          />
          <QuickAction
            icon="ic:baseline-account-balance-wallet"
            text="Manage Fund Requests"
            href="/manageFunds"
          />
          <QuickAction />
          <QuickAction />
        </div>
      </div>
    </div>
  );
}
