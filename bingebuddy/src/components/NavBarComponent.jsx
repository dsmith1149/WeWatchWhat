import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "./AuthContext";

const NavBarComponent = () => {
  const navigator = useNavigate();

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const logIn = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    // setAuthUser({
    //   Name: "Santa Claus",
    // });
  };

  const logOut = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    // setAuthUser(null);
    navigator("/");
  };

  // const { setAuth } = useContext(AuthContext);

  // const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
  const handleSelect = (eventKey) => navigator(`${eventKey}`);

  return (
    <>
      {/* <Navbar bg="primary" data-bs-theme="dark"> */}
      <Navbar className="navbar navbar-custom d-flex navbar-brand text-light">
        <Container>
          <Navbar.Brand className="navbar-brand text-light" href="/">
            BingeBuddy: An Online Movie Rating Platform
          </Navbar.Brand>

          <Nav className="justify-content-end nav-link navbar-brand text-light">
            <NavDropdown title="Menu" id="nav-dropdown" onSelect={handleSelect}>
              <NavDropdown.Item eventKey="/">Home</NavDropdown.Item>

              {isLoggedIn ? (
                <NavDropdown.Item eventKey="/">Logout</NavDropdown.Item>
              ) : (
                <NavDropdown.Item eventKey="/">Login</NavDropdown.Item>
              )}

              {/* <NavDropdown.Item eventKey="/dashboard-main/1"> */}

              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="/search-movie">
                Search Movie
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="/search-user">
                Search User
              </NavDropdown.Item>
            </NavDropdown>

            {isLoggedIn ? (
              <button
                class="btn btn-outline-success"
                type="submit"
                onClick={(e) => {
                  logOut(e);
                }}
              >
                Logout
              </button>
            ) : (
              <button
                class="btn btn-outline-success"
                type="submit"
                onClick={(e) => {
                  logIn(e);
                }}
              >
                Login
              </button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarComponent;
