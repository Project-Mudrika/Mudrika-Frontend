import React from "react";
import Router from "next/router";
import NavBar from "../components/NavBar";

import dashboardStyles from "../../styles/Dashboard.module.scss";
import bodyStyles from "../../styles/Home.module.scss";
import { Form, Button, Card, useAccordionButton } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import Authority from "../../helpers/Authority";
import axios from "axios";

function generate_consid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function NewConsignmentRequest() {
  const authority = new Authority();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [sender, setSender] = useState("");
  const [toAddr, setToAddr] = useState("");

  const [nationalOfficers, setNationalOfficers] = useState([]);

  const [img_str, setImg_str] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    //fetch account address and populate the your address field
    window.ethereum.enable().then((myAccount) => setSender(myAccount[0]));

    axios
      .get(`${process.env.API_URL}/api/fetch-national-officers/`)
      .then((response) => setNationalOfficers(response.data.data))
      .catch((err) => console.log(err));

    setId(generate_consid(7));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    //const res = await authority.requestFunds(amount, toAddr, description);
    // alert(res);
    console.log(`Consignment ID: ${id}`);
    let consignFormData = new FormData();
    consignFormData.append("cons_id", id);
    consignFormData.append("con_name", name);
    consignFormData.append("quantity", quantity);
    consignFormData.append("location", location);
    consignFormData.append("sender", sender);
    consignFormData.append("receiver", toAddr);

    const consignFormUrl = `${process.env.API_URL}/api/new-consignment/`;
    const res = await axios.post(consignFormUrl, consignFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setImg_str(res.data.data.qr);

    setId("");
    setName("");
    setQuantity("");
    setLocation("");
    setToAddr("");
    // Router.push("/dashboard");
  };

  return (
    <div className={bodyStyles.home}>
      <NavBar />
      <Card
        bg="light"
        className={dashboardStyles.Dashboard_recent_cases}
        style={{ padding: "2rem", width: "50vw" }}
      >
        <Card.Title>Create a New Consignment Request</Card.Title>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Consignment Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your required consignment"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your required quantity"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sender"
                value={sender}
                readOnly={true}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Higher Authority Officer</Form.Label>
              <select
                name="toAddr"
                label="Higher Authority WalletID"
                className="mb-2 form-control"
                onChange={(e) => setToAddr(e.target.value)}
                value={toAddr}
              >
                <option value="">-- Select Higher Authority WalletID --</option>
                {nationalOfficers.map((officer) => (
                  <option key={officer.accid} value={officer.accid}>
                    {officer.fname + " " + officer.lname}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {img_str ? (
        <img src={`data:image/png;base64,${img_str}`} alt="qrCode" />
      ) : null}
    </div>
  );
}

export default NewConsignmentRequest;
