
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBarComponent = () => {

    const navigator = useNavigate(); 

    // const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
    const handleSelect = (eventKey) =>  navigator(`${eventKey}`);


      return (
        <>
          {/* <Navbar bg="primary" data-bs-theme="dark"> */}
          <Navbar className='navbar navbar-custom d-flex navbar-brand text-light'>
            <Container>
              <Navbar.Brand className="navbar-brand text-light" href="/">BingeBuddy: An Online Movie Rating Platform</Navbar.Brand>
              <Nav className="justify-content-end" onSelect={handleSelect}>
                <NavDropdown title="Menu" id="nav-dropdown">
                    <NavDropdown.Item eventKey="/login">Login</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="/">Home</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/search-movie">Search Movie</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/search-user">Search User</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
        </>
      );
    
}

export default NavBarComponent
