import React from "react";
import logo from '../Images/fitness-icon.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(){
  return(
    <Navbar expand="md">
      <Container fluid style={{
        margin: '0px 0px 0px 0px',
        maxWidth: '100%',
      }}>
        <Nav className = "m-2">
          <Navbar.Brand>
            <img src={logo} alt="logo.png" style={{
              'height' : '120px',
            }}/>
          </Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/exercise">Exercises</Nav.Link>
            {/* <Nav.Link href="/videos">Video Demos</Nav.Link> */}
            <Nav.Link href = "/workout">Workout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* <Nav>
          <NavDropdown title="User Profile" id="basic-nav-dropdown">
            <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav> */}
        {/* <Nav>
          <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav> */}
      </Container>
      <hr style={{
        border:'2px solid black',
        height:'3px',
      }}/>
    </Navbar>
  )
}
export default Header;