import { Button, Card, Form, Spinner, Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import dashStyles from "../../styles/Dashboard.module.scss";
import axios from "axios";

import ConsignmentGraph from "../../helpers/ConsignmentGraph";

function TrackConsignmentForm() {

  const tempData = {
    data: {
      consignmentAddeds: [
        {
          consignment_sender: "0x4a1f47a15831a5f4cf627414bf57145b0b47de1a",
          consignment_consignmentId: "1",
          consignment_curr_holder: "0x4a1f47a15831a5f4cf627414bf57145b0b47de1a",
          consignment_name: "Food Supplies",
          consignment_receiver: "0x598518be171d592b24041e92324988035c9429f5",
          consignment_quantity: "20",
          consignment_requestId: "2",
          txn: "                                                                                                                               "
        },
      ],
      locationUpdateds: [
        {
          consignmentId: "1",
          location: "Agra",
          updater: "0xd802aa1408bbcc59db8204a41637918ded209af7",
        },
        {
          consignmentId: "1",
          location: "Bhopal",
          updater: "0xd802aa1408bbcc59db8204a41637918ded209af7",
        },
        {
          consignmentId: "1",
          location: "Indore",
          updater: "0x598518be171d592b24041e92324988035c9429f5",
        },
      ],
    },
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationUpdates, setTransactionsList] = useState([]);
  const [consignment, setConsignmentData] = useState(tempData);
  const [caseId, setCaseId] = useState("");

  const consignmentGraph = new ConsignmentGraph();

  function fetchUserDetails(walletAddress, index) {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/fetch-user-data/?walletId=${walletAddress}`
      )
      .then((response) => {
        console.log("User Details for table", response.data);
        const userDetailsElement = document.querySelector(
          `#user-details-${walletAddress}-${index}`
        );

        const userData = response.data.data[0];
        const fullName = `${userData.first_name || ""} ${userData.last_name || ""
          }`;
        // const phnumber = userData.mobile_number || "";
        const state = userData.state || "";
        const district = userData.district || "";

        const innerHTML =
          (fullName && fullName !== " " ? `Name: ${fullName}<br>` : "") +
          //   (phnumber ? `Phone: ${phnumber}<br>` : "") +
          (state ? `State: ${state}<br>` : "") +
          (district ? `District: ${district}` : "");
        userDetailsElement.innerHTML = innerHTML;
      })
      .catch((error) => console.error(error));
  }

  //   Temporarily directly set the JSON object immediately. Remove this and put the thing inside the submit handler
  // useEffect(() => {
  // setTransactionsList(tempData.data.locationUpdateds);
  // }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const consignmentTransfers =
      await consignmentGraph.fetchConsignmentsAndLocationUpdatesById(caseId);

    console.log("Consignment Transfers", consignmentTransfers);


    setTransactionsList(consignmentTransfers.locationUpdates);
    setConsignmentData(consignmentTransfers);

    setIsSubmitting(false);
    setCaseId("");
  };

  return (
    <div>
      <Card
        bg="light"
        className={dashStyles.Dashboard_recent_cases}
        style={{ padding: "5rem" }}
      >
        <Card.Title>Track Consignment by ID</Card.Title>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Consignment ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg: 1234"
                name="caseid"
                onInput={(e) => setCaseId(e.target.value)}
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

        {locationUpdates.length > 0 ? (
          <div>
            <Card>
              <Card.Header>
                <Card.Title>Consignment Details</Card.Title>
              </Card.Header>
              <Card.Body>
                {/* {consignmentData.map((consignment) => ( */}
                <div key={consignment.consignment_consignmentId}>
                  <p style={{ fontWeight: "bolder" }}>
                    {consignment.consignment_name}
                  </p>
                  <p>
                    Sender:{" "}
                    <a
                      href=""
                      onClick={(event) => {
                        event.preventDefault();
                        document.querySelector(
                          `#user-details-${consignment.consignment_sender}-${consignment.consignment_consignmentId}`
                        ).innerHTML = "Fetching User Details...";
                        fetchUserDetails(
                          consignment.consignment_sender,
                          consignment.consignment_consignmentId
                        );
                      }}
                    >
                      {consignment.consignment_sender}
                    </a>
                    <p
                      id={`user-details-${consignment.consignment_sender}-${consignment.consignment_consignmentId}`}
                    ></p>
                  </p>
                  <p>
                    Receiver:
                    <a
                      href=""
                      onClick={(event) => {
                        event.preventDefault();
                        document.querySelector(
                          `#user-details-${consignment.consignment_receiver}-${consignment.consignment_consignmentId}`
                        ).innerHTML = "Fetching User Details...";
                        fetchUserDetails(
                          consignment.consignment_receiver,
                          consignment.consignment_consignmentId
                        );
                      }}
                    >
                      {consignment.consignment_receiver}
                    </a>
                    <p
                      id={`user-details-${consignment.consignment_receiver}-${consignment.consignment_consignmentId}`}
                    ></p>
                  </p>
                  <p>Quantity: {consignment.consignment_quantity} units</p>
                  <p>Transaction Hash: {"  "}
                    <a target="__blank"
                      href={`https://mumbai.polygonscan.com/tx/${consignment.txn}`} >
                      {consignment.txn ? consignment.txn.substring(0, 45) : " "}...
                    </a>
                  </p>
                </div>
                {/* ))} */}
              </Card.Body>
            </Card>
            <h5 className="mt-4">Location Updates</h5>
            <Table striped bordered hover>
              <thead className="text-center">
                <tr>
                  <th>Sl.No</th>
                  <th>Location</th>
                  <th>Last Known Holder</th>
                  <th>Transaction Hash</th>
                </tr>
              </thead>
              <tbody>
                {locationUpdates.map((update, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{update.location}</td>
                      <td>
                        <a
                          href=""
                          onClick={(event) => {
                            event.preventDefault();
                            document.querySelector(
                              `#user-details-${update.updater}-${index}`
                            ).innerHTML = "Fetching User Details...";
                            fetchUserDetails(update.updater, index);
                          }}
                        >
                          {update.updater}
                        </a>
                        <p id={`user-details-${update.updater}-${index}`}></p>
                      </td>
                      <td>
                        <a
                          target="__blank"
                          href={`https://mumbai.polygonscan.com/tx/${update.txn}`}
                        >
                          {update.txn.substring(0, 10)}
                          ...
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : null
        }
      </Card >
    </div >
  );
}

export default TrackConsignmentForm;
