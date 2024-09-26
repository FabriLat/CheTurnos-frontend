import { Container, Navbar, Row, Col, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserNav = () => {
  const navigate = useNavigate();
  return (
    <Navbar style={{ backgroundColor: "#A7C6ED" }}>
      <Container fluid>
        <Row className="w-100">
          <Col md={5}>
            <Nav className="d-flex">
              <Navbar.Brand>
                <img width="30" height="30" src="" alt="" />
              </Navbar.Brand>
              <h1>Logo</h1>
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
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default UserNav;
