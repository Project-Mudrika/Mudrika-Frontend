import { useWeb3 } from "@3rdweb/hooks";
import axios from "axios";
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

import dashStyles from "../../styles/Dashboard.module.scss";

function RegisterForm() {
  // sign up form data
  // {
  // "acc_address": "577g9H03rH09kT6hf",
  // "first_name": "Sudev",
  // "last_name": "Suresh Sreedevi",
  // "username": "sudevssuresh",
  // "access_level_token": "7687yodf08ha"
  // }

  const { address } = useWeb3();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [accessLevelToken, setAccessLevelToken] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    // const res = await fetch("http://mudrika.herokuapp.com/api/register/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     acc_address: address,
    //     first_name: firstName,
    //     last_name: lastName,
    //     username: username,
    //     access_level_token: accessLevelToken,
    //   }),
    // });
    let registerFormData = new FormData();
    registerFormData.append("acc_address", address);
    registerFormData.append("first_name", firstName);
    registerFormData.append("last_name", lastName);
    registerFormData.append("username", username);
    registerFormData.append("access_level_token", accessLevelToken);

    const res = await axios
      .post("http://mudrika.herokuapp.com/api/register/", registerFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => console.error(err));
    const data = await res.data;
    console.log(data);
    setFirstName("");
    setLastName("");
    setUsername("");
    setAccessLevelToken("");
  };

  return (
    <div className={dashStyles.Dashboard}>
      <Card
        bg="light"
        className={dashStyles.Dashboard_recent_cases}
        style={{ padding: "2rem" }}
      >
        <Card.Title>Register New User Account</Card.Title>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Your WalletID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter WalletID"
                name="acc_address"
                value={address}
                readOnly={true}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="first_name"
                onInput={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="last_name"
                onInput={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                onInput={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Access Level Token (Given by IT admin)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Access Level Token"
                name="access_level_token"
                onInput={(e) => setAccessLevelToken(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegisterForm;
