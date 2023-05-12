import { useWeb3 } from "@3rdweb/hooks";
import { Modal, Button, Card, Form, Spinner, Table } from "react-bootstrap";
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

import dashStyles from "../../styles/Dashboard.module.scss";
import Router from "next/router";
import MudrikaGraph from "../../helpers/MudrikaGraph";
import ConsignmentGraph from "../../helpers/ConsignmentGraph";

function SearchByCaseIdForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseId, setCaseId] = useState("");

  const [transactionsList, setTransactionsList] = useState([]);
  useEffect(() => { }, [transactionsList]);

  const mudrikaGraph = new MudrikaGraph();
  const consignmentGraph = new ConsignmentGraph();
  const tableData = {
    case_id: "123456",
    transactions: [
      {
        type: "consignment",
        from: {
          type: "national",
          name: "National Disaster Management Authority",
        },
        to: {
          type: "state",
          name: "State Disaster Management Authority",
          state: "Kerala",
        },
        amount: 500.0,
        timestamp: 1647590400,
        consignment_name: "Food Supplies",
      },
      {
        type: "funds",
        from: {
          type: "state",
          name: "State Disaster Management Authority",
          state: "Kerala",
        },
        to: {
          type: "district",
          name: "District Disaster Management Authority",
          state: "Kerala",
          district: "Ernakulam",
        },
        amount: 1000.0,
        timestamp: 1646414400,
        reason: "Disaster response",
      },
    ],
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fundTransfers = await mudrikaGraph.fetchByCaseID(caseId);
    const consignmentTransfers = await consignmentGraph.fetchConsignmentsByCaseId(caseId);
    console.log("Fund Transfers", fundTransfers);
    console.log("Consignment Transfers", consignmentTransfers);

    let formattedTransactions = [];

    fundTransfers.map((transfer) => {
      formattedTransactions.push({
        type: "funds",
        from: {
          type: "state",
          name: "State Disaster Management Authority",
          state: "Kerala",
        },
        to: {
          walletid: transfer.to,
          // type: "district",
          // name: "District Disaster Management Authority",
          // state: "Kerala",
          // district: "Ernakulam",
        },
        amount: transfer.amount,
        timestamp: transfer.timestamp,
        reason: "Disaster response",
      });
    });

    setTransactionsList(formattedTransactions);

    console.log("transactions list after adding", transactionsList);

    setIsSubmitting(false);
    setCaseId("");
  };
  return (
    // <div className={dashStyles.Dashboard}>
    <div>
      <Card
        bg="light"
        className={dashStyles.Dashboard_recent_cases}
        style={{ padding: "5rem" }}
      >
        <Card.Title>Search Activity By Case ID</Card.Title>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Enter CaseId</Form.Label>
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

        <Table striped bordered hover>
          <thead className="text-center">
            <tr>
              <th>Sl.No</th>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Transaction Type</th>
              <th>Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.transactions?.map((transaction, index) => {
              const timestamp = new Date(transaction.timestamp);
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>
                    <div style={{ fontWeight: "bold" }}>
                      {transaction.from.name}
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "14px",
                      }}
                    >
                      {transaction.from.district ? (
                        <div>{transaction.from.district}</div>
                      ) : null}
                      {transaction.from.state ? (
                        <div className="ms-auto">{transaction.from.state}</div>
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: "bold" }}>
                      {transaction.to.name}
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "14px",
                      }}
                    >
                      {transaction.to.district ? (
                        <div>{transaction.to.district}</div>
                      ) : null}
                      {transaction.to.state ? (
                        <div className="ms-auto">{transaction.to.state}</div>
                      ) : null}
                    </div>
                  </td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>{timestamp.toUTCString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
export default SearchByCaseIdForm;
