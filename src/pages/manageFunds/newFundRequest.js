import React from "react";
import Router from "next/router";
import NavBar from "../components/NavBar";

import dashboardStyles from "../../styles/Dashboard.module.scss";
import bodyStyles from "../../styles/Home.module.scss";
import { Form, Button, Card } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import Authority from "../../helpers/Authority";

function NewFundRequest() {
  const authority = new Authority();
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [toAddr, setToAddr] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    //fetch account address and populate the your address field
    window.ethereum.enable().then((myAccount) => setAccount(myAccount[0]));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await authority.requestFunds(amount, toAddr, description);
    alert(res);
    // window.location.reload();
    Router.push("/dashboard");
  };

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
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your WalletID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter WalletID"
                value={account}
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
                value={toAddr}
                onInput={(e) => setToAddr(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount Needed</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onInput={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 amount">
              <Form.Label>Request Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Reason for Fund Request"
                value={description}
                onInput={(e) => setDescription(e.target.value)}
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

export default NewFundRequest;
