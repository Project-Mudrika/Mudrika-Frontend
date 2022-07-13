import React, { useEffect, useState } from "react";
import { Card, Modal, Button, Form, Spinner } from "react-bootstrap";
import { Icon } from "@iconify/react";
import axios from "axios";

import dashStyles from "../../styles/Dashboard.module.scss";
import states from "./stateList";

function GenerateTokenForm() {
  const [access_level, setAccessLevel] = useState("district");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const [isNational, setIsNational] = useState(false);
  const [isState, setIsState] = useState(false);
  useEffect(() => {
    setIsNational(access_level === "national");
    setIsState(access_level === "state");

    if (access_level === "national") {
      setState("");
      setDistrict("");
    }

    if (access_level === "state") {
      setDistrict("");
    }
  }, [access_level]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let tokenFormData = new FormData();
    tokenFormData.append("access_level", access_level);
    tokenFormData.append("state", state);
    tokenFormData.append("district", district);

    const res = await axios
      .post(
        "https://mudrika.herokuapp.com/api/new-access-token/",
        tokenFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .catch((err) => console.error(err));
    const data = await res?.data;
    console.log(data);
    setIsSubmitting(false);
    setAccessLevel("");
    setState("");
    setDistrict("");
    setIsSuccess(res?.status === 200);
    setModalShow(true);
  };

  return (
    // form_format
    // {
    //   "access_level" : "national | state | district",
    //   "state": "null | str",
    //   "district": "null | str",
    // }

    <div className={dashStyles.Dashboard}>
      <Card
        bg="light"
        className={dashStyles.Dashboard_recent_cases}
        style={{ padding: "2rem" }}
      >
        <Card.Title>Generate Access Token for New User</Card.Title>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label className="mt-2">Access Level</Form.Label>
              <Form.Select
                name="access_level"
                label="Access Level"
                className="mb-2"
                onChange={(e) => setAccessLevel(e.target.value)}
                value={access_level}
              >
                <option value="district">District</option>
                <option value="state">State</option>
                <option value="national">National</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2">State</Form.Label>
              <Form.Select
                name="state"
                label="State"
                className="mb-2"
                disabled={isNational}
                required={!isNational}
                onChange={(e) => setState(e.target.value)}
                value={state}
              >
                <option value="">-- Select State --</option>
                {states.map((state) => {
                  const stateValue = Object.keys(state)[0];
                  const stateName = stateValue
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                      return str.toUpperCase();
                    });
                  return <option value={stateValue}>{stateName}</option>;
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2">District</Form.Label>
              <Form.Select
                name="district"
                label="District"
                className="mb-2"
                disabled={isNational || isState || !state}
                required={!isNational && !isState}
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
              >
                <option value="">-- Select District --</option>
                {state &&
                  // Map through each district in the state
                  states.map((stateList) => {
                    if (stateList[state]) {
                      return stateList[state].map((district) => {
                        return <option value={district}>{district}</option>;
                      });
                    }
                  })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a district.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner animation="border" role={"status"} size="sm" />
              ) : (
                "Generate Token"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Modal
        show={modalShow}
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isSuccess
              ? "Token Generation Successful!"
              : "Token Generation Failed!"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
          <h4>
            {isSuccess ? (
              <Icon width="4rem" color="#1a7a05" icon="charm:circle-tick" />
            ) : (
              <Icon width="4rem" color="#870303" icon="charm:circle-cross" />
            )}{" "}
          </h4>

          {isSuccess ? (
            <p>
              IMPORTANT!! Please copy the token information below before closing
              this window.
            </p>
          ) : (
            <p>Something Went Wrong. Try again</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isSuccess ? (
            <Button
              onClick={() => {
                setModalShow(false);
                Router.push("/");
              }}
              variant="success"
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={() => {
                setModalShow(false);
              }}
              variant="danger"
            >
              Retry
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GenerateTokenForm;
