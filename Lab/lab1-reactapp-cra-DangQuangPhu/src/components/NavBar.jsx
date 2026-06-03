import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'


export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Pizzas</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
