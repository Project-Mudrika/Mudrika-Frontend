import { Navbar, Nav, Container } from "react-bootstrap";
import React, { Component } from "react";
import { Icon } from "@iconify/react";

export default class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <Navbar bg="light" fixed="top" expand="md">
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
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
