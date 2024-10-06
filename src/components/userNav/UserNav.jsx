import { useState } from "react";
import { Container, Navbar, Row, Col, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from './CheTurnosLogo.png'
const UserNav = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  
  const navbarStyle = {
    backgroundColor: darkMode ?  "#9AB7F0BA" : "#FFE9E2" , 
    color: darkMode ? "#ffffff" : "#ffffff", 
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Navbar style={navbarStyle} variant={darkMode ? "dark" : "light"}>
      <Container fluid>
        <Row className="w-100">
          <Col md={5}>
            <Nav className="d-flex">
              <Navbar.Brand>
                <img width="100" height="50" className="d-block w-100"
              src={logo}
              alt="First slide"
               />
              </Navbar.Brand>
              
            </Nav>
          </Col>
          <Col md={1}></Col>
          <Col md={6}>
            <Nav className="d-flex justify-content-end">
              <Nav.Link>Sobre nosotros</Nav.Link>
              <Nav.Link>Contacto</Nav.Link>
              <Nav.Link onClick={() => navigate("/login")}>
                Iniciar sesión
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/register")}>
                Registrarse
              </Nav.Link>
              <Nav.Link onClick={toggleDarkMode}>
                {darkMode ? "Modo Claro" : "Modo Oscuro"}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default UserNav;
