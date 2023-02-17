import { useWeb3 } from "@3rdweb/hooks";
import { Modal, Button, Card, Form, Spinner } from "react-bootstrap";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import axios from "axios";

import dashStyles from "../../styles/Dashboard.module.scss";
import { pinFileToIPFS } from "../../helpers/uploadIpfs";
import Router from "next/router";

function VolunteerRegisterForm() {
  const { address, connectWallet } = useWeb3();

  const [name, setName] = useState("");
  const [isIndividual, setIsIndividual] = useState(true);
  const [aadharNgoID, setAadharNgoID] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const web3login = async () => {
    console.log("Connected");
    connectWallet("injected");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let registerFormData = new FormData();
    registerFormData.append("walletid", address);
    registerFormData.append("name", name);
    registerFormData.append(
      "voltype",
      isIndividual ? "individual" : "organisation"
    );
    registerFormData.append("aadharngoid", aadharNgoID);

    const fileUrl = await pinFileToIPFS(profileImage);
    registerFormData.append("profileimg", fileUrl);

    const res = await axios
      .post(
        `${process.env.API_URL}/api/register/volunteer/`,
        registerFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .catch((err) => console.error(err));
    const data = await res?.data;
    console.log(data);

    // // Test Data
    // const serializedFormData = {};
    // registerFormData.forEach((value, key) => (serializedFormData[key] = value));
    // console.log(serializedFormData);

    setIsSubmitting(false);
    setIsSuccess(res?.status === 200);
    setModalShow(true);
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };
  return (
    <div className={dashStyles.Dashboard}>
      <Card
        bg="light"
        className={dashStyles.Dashboard_recent_cases}
        style={{ padding: "2rem" }}
      >
        <Card.Title>Register Volunteer Account</Card.Title>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Full Name / Your Organization's Full Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Individual or Organization?</Form.Label>
              <Form.Check
                type="radio"
                label="Individual"
                name="individual_organization"
                checked={isIndividual}
                onChange={() => setIsIndividual(true)}
              />
              <Form.Check
                type="radio"
                label="Organization"
                name="individual_organization"
                checked={!isIndividual}
                onChange={() => setIsIndividual(false)}
              />
            </Form.Group>
            {isIndividual ? (
              <Form.Group className="mb-3">
                <Form.Label>Aadhar ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Aadhar ID"
                  name="aadhar_id"
                  value={aadharNgoID}
                  required
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9\s]/g, "")
                      .substr(0, 14);
                    const formattedValue = value
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim();
                    setAadharNgoID(formattedValue);
                  }}
                  pattern="^\d{4}\s?\d{4}\s?\d{4}$"
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Unique NGO/VO ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Unique NGO/VO ID (e.g. AB/2010/0001234)"
                  name="ngo_id"
                  value={aadharNgoID}
                  onChange={(e) => setAadharNgoID(e.target.value)}
                  pattern="^[A-Z]{2}\/\d{4}\/\d{7}$"
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Your WalletID</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  placeholder="Click Connect with Metamask for WalletID"
                  name="acc_address"
                  style={{ flexGrow: 1, marginRight: "8px" }}
                  value={address}
                  readOnly={true}
                  required
                />
                {address ? null : (
                  <Button
                    variant="primary"
                    style={{ flexShrink: 0, whiteSpace: "nowrap" }}
                    onClick={web3login}
                  >
                    <img
                      src="/metamask.svg"
                      alt=""
                      style={{ width: "1.5rem", marginRight: 4 }}
                    />
                    Connect with Metamask
                  </Button>
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </Form.Group>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Submitting...
                </>
              ) : (
                "Submit"
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
              ? "New User Registration Successful!"
              : "New User Registration Failed!"}
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
          <p>
            {isSuccess
              ? "Click Continue to login from home page."
              : "Something Went Wrong. Try again"}
          </p>
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

export default VolunteerRegisterForm;
