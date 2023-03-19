import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import UserDetails from "../../helpers/UserDetails";
import { useStoreState } from "easy-peasy";
import { Icon } from "@iconify/react";

import styles from "../../styles/NavBar.module.scss";
import Router from "next/router";

export default function NavBar(props) {
  // User details stored
  const userDetails = useStoreState((state) => state.userData);

  const loaderProfile = {
    walletId: "Loading...",
    name: "Loading...",
  };

  const [profile, setProfile] = useState(loaderProfile);

  const web3logout = async () => {
    console.log("Sign out");
    alert("Please Disconnect using Metamask");
  };

  useEffect(() => {
    if (!/^\/$|^\/register(\/.*)?$/.test(Router.pathname)) {
      if (!userDetails.type) {
        Router.push("/");
      } else {
        setProfile({
          walletId: userDetails.walletId,
          name:
            userDetails.type == "authority"
              ? userDetails.data[0].fname + " " + userDetails.data[0].lname
              : userDetails.data[0].name,
        });
      }
    }
  }, []);

  return (
    <div className="NavBar">
      <Navbar className={styles.Navbar} fixed="top" expand="md">
        <Container>
          <Navbar.Brand
            className={styles.Navbar_brand}
            href={userDetails.type ? "/dashboard" : "/"}
          >
            Mudrika
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {loginPage ? null : (
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
              {loginPage ? null : (
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
                    <h5 className="h5">{profile.name}</h5>
                    <p
                      className="text-muted"
                      style={{
                        fontSize: "0.8rem",
                      }}
                    >
                      Wallet ID: {profile.walletId} <br />
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
