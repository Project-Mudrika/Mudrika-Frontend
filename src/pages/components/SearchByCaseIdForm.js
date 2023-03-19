import { useWeb3 } from "@3rdweb/hooks";
import { Modal, Button, Card, Form, Spinner } from "react-bootstrap";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import axios from "axios";

import dashStyles from "../../styles/Dashboard.module.scss";
import Router from "next/router";

function SearchByCaseIdForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseID, setCaseID] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();

    const [queryData, setqueryData] = useState({
      case_id: "",
      transactions: [],
    });

    setIsSubmitting(true);
    setCaseID("");
  };
  return (
    <div className={dashStyles.Dashboard}>
      <Card
        bg="light"
        className={dashStyles.Dashboard_recent_cases}
        style={{ padding: "5rem" }}
      >
        <Card.Title>Search Activity By Case ID</Card.Title>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Case ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg: 1234"
                name="caseid"
                onInput={(e) => setCaseID(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <Spinner animation="border" role={"status"} size="sm" />
                ) : (
                  "Search"
                )}
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
export default SearchByCaseIdForm;
