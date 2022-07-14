import React, { useEffect } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import Router from "next/router";
import { Button, Card, Spinner } from "react-bootstrap";
import { Icon } from "@iconify/react";

import QuickAction from "./QuickAction";

import styles from "../../styles/Dashboard.module.scss";
import Authority from "../../helpers/Authority";
import { useState } from "react";
import FundRequestTable from "./FundRequestTable";
import UserDetails from "../../helpers/UserDetails";

export default function Dashboard() {
  const { address } = useWeb3();
  const authority = new Authority();
  const [req_table_data, setRequests] = useState([]);
  const [nullRequests, setNullRequests] = useState(false);

  const loaderUserData = {
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
  const [userData, setUserData] = useState(loaderUserData);
  const [balance, setBalance] = useState(0);
  const [myBalance, setMyBalance] = useState(0);

  const approveRequest = async (reqid) => {
    await authority.approveRequest(reqid);

    // reload after 5 seconds
    // setTimeout(function () {
    //   window.location.reload();
    // }, 2000);
    console.log("Request approved");
    authority.fetchBalance().then((balance) => setBalance(balance));
    authority.fetchRequests().then((requests) => {
      setRequests(requests);
      setNullRequests(requests.length === 0);
    });
  };

  //watch for fund transfer event from contract
  // authority.watchTransferEvent(address);

  useEffect(() => {
    if (!address) {
      Router.push("/");
    }

    authority.fetchMyBalance().then((myBalance) => setMyBalance(myBalance));
    authority.fetchBalance().then((balance) => setBalance(balance));

    // fetch(
    //   "https://mudrika.herokuapp.com/api/fetch-user-data/?" +
    //     new URLSearchParams({
    //       walletid: address,
    //     })
    // )
    //   .then((res) => res.json())
    //   .then((data) => setUserData(data))
    //   .then(() => {
    //     console.log(userData.data[0].level);
    //   });
    const userDetails = new UserDetails();
    userDetails.fetchUserData(address).then((response) => {
      const fetchedUserData = response.data;
      console.log(fetchedUserData);
      if (fetchedUserData.data[0]) {
        setUserData(fetchedUserData);
      } else {
        alert("Unregistered user. Please register first.");
        setUserData(loaderProfile);
      }
    });

    authority.fetchRequests().then((requests) => {
      setRequests(requests);
      setNullRequests(requests.length === 0);
    });
  }, []);

  return (
    <div className={styles.Dashboard}>
      <div className={styles.Dashboard_content}>
        <h3 className="h2">
          Welcome, {userData.data[0].fname + " " + userData.data[0].lname}
        </h3>
        <p className="text-muted">Account ID: {userData.data[0].accid}</p>
        {userData.data[0].level == "national" || "admin" ? (
          <p className="text-muted">
            National Disaster Relief Fund Balance:{" "}
            {"₹" + parseInt(balance).toLocaleString("hi-IN")}
          </p>
        ) : (
          <p className="text-muted">
            {userData.data[0].level.charAt(0).toUpperCase() +
              userData.data[0].level.slice(1)}{" "}
            Authority Balance:{" "}
            {"₹" + parseInt(myBalance).toLocaleString("hi-IN")}
          </p>
        )}
        <h4 className="h4">Recent Fund Requests To You</h4>
        <div className={styles.Dashboard_row}>
          <Card bg="light" className={styles.Dashboard_recent_cases}>
            <Card.Body>
              <FundRequestTable>
                {req_table_data.length > 0 ? (
                  req_table_data.slice(0, 5).map((tab_data, i) => {
                    console.log(`tab_data${i}`, tab_data);
                    return (
                      <tr key={i}>
                        <td scope="col">{tab_data.req_id}</td>
                        <td scope="col">
                          {tab_data.req_authority.slice(0, 15) + "..."}
                        </td>
                        {/* <td scope="col">{tab_data.req_state}</td> */}
                        <td scope="col">Kerala</td>
                        <td scope="col">
                          {"₹" +
                            parseInt(tab_data.req_amount).toLocaleString(
                              "hi-IN"
                            )}
                        </td>
                        <td scope="col">
                          {new Date("01 January 2022").toDateString() +
                            " " +
                            new Date("01 January 2022").toLocaleTimeString()}
                        </td>
                        <td scope="col" className="d-flex">
                          <Button
                            size="sm"
                            style={{
                              fontFamily: "Varela Round, sans-serif",
                              margin: "0 0.5rem",
                            }}
                            variant="success"
                            onClick={(e) => {
                              e.target.disabled = true;
                              e.target.innerHTML =
                                (() => {
                                  return (
                                    <Spinner
                                      as="span"
                                      animation="border"
                                      size="sm"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                  );
                                }) + " Approving...";
                              approveRequest(tab_data.req_id);
                            }}
                          >
                            <Icon icon="material-symbols:done" color="white" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
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
                          <Button
                            size="sm"
                            style={{
                              fontFamily: "Varela Round, sans-serif",
                              margin: "0 0.5rem",
                            }}
                            variant="link"
                            onClick={() =>
                              Router.push("/manageFunds/" + tab_data.req_id)
                            }
                          >
                            More Info
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : nullRequests ? (
                  "No Requests issued"
                ) : (
                  <Spinner animation="grow" role={"status"} size="sm" />
                )}
              </FundRequestTable>
            </Card.Body>
          </Card>
        </div>
        <h4 className="h4">Quick Actions</h4>
        <div className={styles.Dashboard_quick_actions}>
          <QuickAction
            icon="ic:baseline-account-balance-wallet"
            text="Manage Fund Requests"
            onClick={(e) => {
              e.preventDefault();
              Router.push("/manageFunds");
            }}
          />
          {userData.data[0].level === "national" ? (
            <QuickAction
              icon="akar-icons:key"
              text="Generate Access Key Tokens"
              href="/generateToken"
              onClick={(e) => {
                e.preventDefault();
                Router.push("/generateToken");
              }}
            />
          ) : (
            <QuickAction
              icon="ic:baseline-note-add"
              text="Request Funds"
              href="/manageFunds/newFundRequest"
              onClick={(e) => {
                e.preventDefault();
                Router.push("/manageFunds/newFundRequest");
              }}
            />
          )}
          <QuickAction />
          <QuickAction />
        </div>
      </div>
    </div>
  );
}
