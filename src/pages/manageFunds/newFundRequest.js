import React from "react";
import NavBar from "../components/NavBar";

import dashboardStyles from "../../styles/Dashboard.module.scss";
import bodyStyles from "../../styles/Home.module.scss";
import { Form, Button, Card } from "react-bootstrap";

function newFundRequest() {
  return (
    <div className={bodyStyles.home}>
      <NavBar />
      <Card
        bg="light"
        className={dashboardStyles.Dashboard_recent_cases}
        style={{ padding: "2rem", width: "50vw" }}
      >
        <Card.Title>Create a New Fund Request</Card.Title>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Your WalletID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter WalletID"
                value="02340jf0hh0H234YD"
                readOnly={true}
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Higher Authority WalletID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Higher Authority WalletID"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount Needed</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Request Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Reason for Fund Request"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default newFundRequest;
