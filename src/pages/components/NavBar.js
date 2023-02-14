import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import UserDetails from "../../helpers/UserDetails";
import { Icon } from "@iconify/react";

import styles from "../../styles/NavBar.module.scss";
import Router from "next/router";
import { useWeb3 } from "@3rdweb/hooks";

export default function NavBar(props) {
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
  const { address, disconnectWallet } = useWeb3();
  const userDetails = new UserDetails();

  const web3logout = async () => {
    console.log("Sign out");
    alert("Please Disconnect using Metamask");
  };

  useEffect(() => {
    if (!/^\/$|^\/register(\/.*)?$/.test(Router.pathname)) {
      if (!address) {
        Router.push("/");
      } else {
        userDetails.fetchUserData(address).then((response) => {
          const fetchedUserData = response.data;
          console.log(fetchedUserData);
          if (fetchedUserData.data.length > 0) {
            setProfile(fetchedUserData);
          } else {
            // alert("Unregistered user. Please register first.");
            setProfile(loaderProfile);
            Router.push("/");
          }
        });
      }
    }
  }, [address]);

  return (
    <div className="NavBar">
      <Navbar className={styles.Navbar} fixed="top" expand="md">
        <Container>
          <Navbar.Brand className={styles.Navbar_brand} href="/">
            Mudrika
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {props.loginPage ? null : (
              <Nav className={styles.Navbar_list}>
                <Nav.Link
                  className={`${styles.Navbar_list_item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    Router.push("/dashboard");
                  }}
                >
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  className={`${styles.Navbar_list_item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    Router.push("/cases");
                  }}
                >
                  Cases
                </Nav.Link>
                <Nav.Link
                  className={`${styles.Navbar_list_item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    Router.push("/consignments");
                  }}
                >
                  Consignments
                </Nav.Link>
              </Nav>
            )}

            <Nav>
              {props.loginPage ? null : (
                <NavDropdown
                  title={
                    <Icon
                      icon="healthicons:ui-user-profile"
                      height={"2em"}
                      style={{ color: "#9f909c" }}
                    />
                  }
                  align="end"
                  style={{
                    fontFamily: "Varela Round, sans-serif",
                  }}
                >
                  <NavDropdown.Item aria-readonly>
                    <h5 className="h5">
                      {profile.data[0].fname + " " + profile.data[0].lname}
                    </h5>
                    <p
                      className="text-muted"
                      style={{
                        fontSize: "0.8rem",
                      }}
                    >
                      Wallet ID: {profile.data[0].accid} <br />
                    </p>
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={(e) => {
                      // prevent redirect fn of href link, router push needed to preserve useWeb3 context
                      e.preventDefault();
                      Router.push("/profile");
                    }}
                  >
                    Show Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={(e) => {
                      e.preventDefault();
                      web3logout();
                    }}
                  >
                    {" "}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
