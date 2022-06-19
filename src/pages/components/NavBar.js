import { Navbar, Nav, Container, Button } from "react-bootstrap";
import React from "react";
import { Icon } from "@iconify/react";

export default function NavBar(props) {
  return (
    <div className="NavBar">
      <Navbar bg="dark" variant="dark" fixed="top" expand="md">
        <Container>
          <Navbar.Brand href="#dashboard">Mudrika</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Dashboard</Nav.Link>
              <Nav.Link href="#cases">Cases</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#profile">
                <Icon icon="healthicons:ui-user-profile" height={"2em"} />
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <Icon icon="ic:baseline-login" height={"2em"} onClick={props.web3login} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
