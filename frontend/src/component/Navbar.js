import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <BootstrapNavbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="custom-navbar"
    >
      <Container>
        <BootstrapNavbar.Brand href="#home" className="brand-text gradient">
          MD Restaurant
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/fooditem" className="nav-link">
              Food Item
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
            <NavLink to="/signup" className="nav-link">
              <button className="btn1">Sign up</button>
            </NavLink>
            <NavLink to="/login" className="nav-link">
              <button className="btn1">Login up</button>
            </NavLink>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
