import React from "react";
import NavBar from "../components/NavBar";

import bodyStyles from "../../styles/Home.module.scss";
import { Form, Button } from "react-bootstrap";

function newFundRequest() {
  return (
    <div className={bodyStyles.home}>
      <NavBar />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Wallet ID</Form.Label>
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
          <Form.Label>State WalletID</Form.Label>
          <Form.Control type="text" placeholder="Enter State" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default newFundRequest;
