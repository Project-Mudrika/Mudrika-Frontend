import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Button, Card, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import NavBar from "../components/NavBar";

import styles from "../../styles/reqDetails.module.scss";
import Authority from "../../helpers/Authority";
import { useWeb3 } from "@3rdweb/hooks";

function ReqId() {
  const {
    query: { reqId },
  } = useRouter();

  const { address } = useWeb3();

  const loadingData = {
    req_id: "loading",
    req_address: "loading",
    req_authority: "loading",
    req_amount: "loading",
    req_desc: "loading"
  };

  const [data, setData] = useState(loadingData);


  const authority = new Authority();

  useEffect(() => {
    if (!address) {
      Router.push("/");
    }

    authority.fetchRequestDetails(reqId)
      .then((response) => {
        setData(response)
      })
      .catch((error) => {
        alert("Invalid Request Id")
        window.location.href = "/";
      })
  }, []);

  return (
    <div className={styles.reqDetails}>
      <NavBar />
      <h2>Fund Request Details</h2>
      <div className={styles.reqDetails_body}>
        <Card className={styles.reqDetails_text}>
          <Card.Header>
            <Card.Title>Request Received on 01/01/2022 19:30</Card.Title>
          </Card.Header>
          <Card.Body className="d-flex flex-column justify-content-center ">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Request ID</Form.Label>
                <Form.Control type="text" value={reqId} readOnly={true} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sender Wallet ID</Form.Label>
                <Form.Control
                  type="text"
                  value={data.req_address}
                  readOnly={true}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sender Location</Form.Label>
                <Form.Control type="text" value={"Kerala"} readOnly={true} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Requested Amount</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    "₹ " + parseInt(data.req_amount).toLocaleString("hi")
                  }
                  readOnly={true}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Request Description</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={6}
                  value={data.req_desc}
                  readOnly={true}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <div className={styles.reqDetails_quickAction}>
          <Button
            size="lg"
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
            size="lg"
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
        </div>
      </div>
    </div>
  );
}

export default ReqId;
