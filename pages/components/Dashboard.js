import React from "react";
import { Card } from "react-bootstrap";

import QuickAction from "./QuickAction";

import styles from "../../styles/Dashboard.module.scss";

export default function Dashboard() {
  return (
    <div className={styles.Dashboard}>
      <div className={styles.Dashboard_content}>
        <h4 className="h4">Recent Cases</h4>
        <Card bg="light" className={styles.Dashboard_recent_cases}>
          {/* <Card.Header>Recent Cases</Card.Header> */}
          <Card.Body>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
        <h4 className="h4">Quick Actions</h4>
        <div className={styles.Dashboard_quick_actions}>
          <QuickAction />
          <QuickAction />
          <QuickAction />
          <QuickAction />
        </div>
      </div>
    </div>
  );
}
