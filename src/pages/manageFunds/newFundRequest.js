import React from "react";
import Router from "next/router";
import NavBar from "../components/NavBar";

import dashboardStyles from "../../styles/Dashboard.module.scss";
import bodyStyles from "../../styles/Home.module.scss";
import { Form, Button, Card } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import Authority from "../../helpers/Authority";

import { pinFileToIPFS } from '../../helpers/uploadIpfs';

import axios from "axios";

function NewFundRequest() {
  const authority = new Authority();
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [toAddr, setToAddr] = useState("");
  const [description, setDescription] = useState("");

  const [nationalOfficers, setNationalOfficers] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [file, setFile] = useState(null)
  const [fileUrl, setFileUrl] = useState(null)

  useEffect(() => {
    //fetch account address and populate the your address field
    window.ethereum.enable().then((myAccount) => setAccount(myAccount[0]));

    axios
      .get("https://mudrika.onrender.com/api/fetch-national-officers/")
      .then((response) => setNationalOfficers(response.data.data))
      .catch((err) => console.log(err));
  }, []);



  function onChange(e) {
    const file = e.target.files[0]
    setFile(file)
  }

  async function onUpload(e) {
    /* upload image to IPFS */
    // const file = e.target.files[0]
    try {
      const url = await pinFileToIPFS(file);

      // const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url, " fileURL")
      setFileUrl(url)
      console.log(url, " URL")
      alert(`fileURL: ${url}`)

    } catch (error) {
      <inputs
        type="file"
        name="Asset"
        className="my-4"
        onChange={onChange}
      />
      console.log('Error uploading file: ', error)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!toAddr) {
      toAddr = "0x598518be171D592b24041e92324988035C9429F5"
    }
    await onUpload();
    description = description.concat(`\nSupporting Documents Link: ${fileUrl}`)
    const res = await authority.requestFunds(amount, toAddr, description);
    console.log(amount, toAddr, description);
    alert(res);
    setAmount("");
    setToAddr("");
    setDescription("");
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
            <Form.Group className="mb-3">
              <Form.Label>Amount Needed</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onInput={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 file">
              <Form.Label>Supporting Evidence/Case Files</Form.Label>
              <Form.Control
                type="file"
                onChange={onChange}
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
