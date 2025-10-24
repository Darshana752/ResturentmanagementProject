import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import './navbar.css';

export default function Navbar() {
  return (
    <BootstrapNavbar expand="lg" bg="dark" data-bs-theme="dark" className="custom-navbar">
      <Container>
        <BootstrapNavbar.Brand href="#home"  className="brand-text gradient">MD Resturent</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#menu">Food Item</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            <button className='btn1'>Sign up</button>
            <button className='btn1'>Login up</button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}


