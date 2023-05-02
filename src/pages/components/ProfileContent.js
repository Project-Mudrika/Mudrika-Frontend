import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";

import styles from "../../styles/Profile.module.scss";
import { useWeb3 } from "@3rdweb/hooks";
import Router from "next/router";

function ProfileContent() {
  const loaderProfile = {
    data: [
      {
        accid: "Loading...",
        level: "Loading...",
        fname: "Loading...",
        lname: "Loading...",
        state: "Loading...",
        district: "Loading...",
        username: "Loading...",
      },
    ],
    count: null,
  };

  const [profile, setProfile] = useState(loaderProfile);
  const { address } = useWeb3();

  useEffect(() => {
    // check if not logged in
    if (!address) {
      Router.push("/");
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/fetch-user-data/?` +
        new URLSearchParams({
          walletId: address,
        })
    )
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div className={styles.Profile}>
      <h4>User Profile</h4>

      <Form style={{ width: "60%" }}>
        <Container className="my-2 mx-0 p-0">
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Wallet ID</Form.Label>
                <Form.Control
                  readOnly
                  value={capitalize(profile.data[0].accid)}
                />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  readOnly
                  value={capitalize(profile.data[0].fname)}
                />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  readOnly
                  value={capitalize(profile.data[0].lname)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Group>
              <Form.Label>Level</Form.Label>
              <Form.Control
                readOnly
                value={capitalize(profile.data[0].level)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                readOnly
                value={capitalize(profile.data[0].state)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>District</Form.Label>
              <Form.Control
                readOnly
                value={capitalize(profile.data[0].district)}
              />
            </Form.Group>
          </Row>
        </Container>
      </Form>
    </div>
  );
}

export default ProfileContent;
