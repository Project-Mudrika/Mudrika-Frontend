import React from "react";
import { Card } from "react-bootstrap";

import QuickAction from "./QuickAction";

import styles from "../../styles/Dashboard.module.scss";

export default function Dashboard() {
  return (
    <div className={styles.Dashboard}>
      <div className={styles.Dashboard_content}>
        <h4 className="h4">Recent Cases</h4>
        <div className={styles.Dashboard_row}>
          <Card bg="light" className={styles.Dashboard_recent_cases}>
            <Card.Body>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Case No</th>
                    <th scope="col">Name of Applicant</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>678567</td>
                    <td>John Smith</td>
                    <td>
                      <div className={styles.status_rejected}>Rejected</div>
                    </td>
                  </tr>
                  <tr>
                    <td>976876</td>
                    <td>Alice George</td>
                    <td>
                      <div className={styles.status_pending}>Pending</div>
                    </td>
                  </tr>
                  <tr>
                    <td>293439</td>
                    <td>Bob Daniel</td>
                    <td>
                      <div className={styles.status_approved}>Approved</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </div>
        <h4 className="h4">Quick Actions</h4>
        <div className={styles.Dashboard_quick_actions}>
          <QuickAction icon="ic:baseline-note-add" text="Register New Case"/>
          <QuickAction icon="ic:baseline-account-balance-wallet" text="Manage Funds" />
          <QuickAction />
          <QuickAction />
        </div>
      </div>
    </div>
  );
}
