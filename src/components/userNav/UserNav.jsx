import { useState, useEffect } from "react";
import { Container, Navbar, Row, Col, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from './CheTurnosLogoBlanco.png';
import './UserNav.css';

const UserNav = () => {
  const [navActive, setNavActive] = useState(false);
  const navigate = useNavigate();

  // cambia el estado de la navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setNavActive(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar className={`navbar-custom ${navActive ? 'active' : ''}`} variant="light">
      <Container fluid>
        <Row className="w-100 align-items-center">
          <Col md={5}>
            <Nav className="d-flex align-items-center">
              <Navbar.Brand>
                <img
                  width={navActive ? "80" : "100"} // cambia el tamaño del logo al hacer scroll
                  height={navActive ? "40" : "50"} 
                  className="d-block w-100 logo"
                  src={logo}
                  alt="Logo"
                />
              </Navbar.Brand>
            </Nav>
          </Col>
          <Col md={1}></Col>
          <Col md={6}>
            <Nav className="d-flex justify-content-end align-items-center">
              <Button variant="outline-light" className="mx-2" onClick={() => navigate("/about")}>Sobre nosotros</Button>
              <Button variant="outline-light" className="mx-2" onClick={() => navigate("/contact")}>Contacto</Button>
              <Button variant="outline-light" className="mx-2" onClick={() => navigate("/register")}>Registrarse</Button>
              <Button variant="light" className="mx-2" onClick={() => navigate("/login")}>Iniciar Sesión</Button>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default UserNav;
