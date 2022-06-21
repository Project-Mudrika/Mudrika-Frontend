import { Navbar, Nav, Container, Button } from "react-bootstrap";
import React from "react";
import { Icon } from "@iconify/react";

import styles from "../../styles/NavBar.module.scss";

export default function NavBar(props) {
  return (
    <div className="NavBar">
      <Navbar className={styles.Navbar} fixed="top" expand="md">
        <Container>
          <Navbar.Brand className={styles.Navbar_brand} href="/">
            Mudrika
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.Navbar_list}>
              {props.loginPage ? null : (
                <Nav.Link
                  className={`${styles.Navbar_list_item}`}
                  href="/dashboard"
                >
                  Dashboard
                </Nav.Link>
              )}
              {props.loginPage ? null : (
                <Nav.Link
                  className={`${styles.Navbar_list_item}`}
                  href="/cases"
                >
                  Cases
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              <Nav.Link href="#profile">
                <Icon
                  icon="healthicons:ui-user-profile"
                  height={"2em"}
                  style={{ color: "#9f909c" }}
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
