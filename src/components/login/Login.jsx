import { useContext, useRef, useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";

import { useNavigate } from "react-router-dom";
import "./login.css";
import UserNav from "../userNav/UserNav";
const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPass, setEnteredPass] = useState("");
  const userEmailRef = useRef(null);
  const passRef = useRef(null);
  const [errors, setErrors] = useState({
    email: false,
    pass: false,
    exists: false,
  });


  const navegate = useNavigate();

  const handlebuttonForgotPassword = () => {
    navegate("/PassResetForm");
  }

  const { dataLoginHandler } = useContext(AuthenticationContext);

  const emailHandler = (event) => {
    setErrors({ ...errors, email: false });
    setEnteredEmail(event.target.value);
  };
  const passHandler = (event) => {
    setErrors({ ...errors, pass: false });
    setEnteredPass(event.target.value);
  };

  const loginHandler = (event) => {
    //para que no se recarge la pagina
    event.preventDefault();
    setErrors({ ...errors, exists: false });
    if (enteredEmail.length === 0) {
      userEmailRef.current.focus();
      setErrors({ ...errors, email: true });
      return;
    }
    if (enteredPass.length === 0) {
      passRef.current.focus();
      setErrors({ ...errors, pass: true });
      return;
    }

    //llamar api
    fetchUser();

    setEnteredEmail("");
    setEnteredPass("");
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://localhost:7276/api/Authentication",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
          }),
        }
      );

      const token = await response.text();

      if (response.ok) {
        console.log("Login successful");
        console.log("El Token:", token);
        const decodedToken = parseJwt(token);
        // ID, ROL y el nombre.
        const userId = decodedToken.sub[0];
        const userRole = decodedToken.sub[1];
        const userName = decodedToken.given_name;
        console.log("User ID:", userId);
        console.log("User Role:", userRole);
        console.log("User Name:", userName);

        //Se guarda id, role, name en el localStorage, el token en una variable del context.
        dataLoginHandler(userName, userRole, userId, token);
      } else {
        console.log("Invalid username or password");
        setErrors({ ...errors, exists: true });
        setEnteredEmail("");
        setEnteredPass("");
        return;
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.", error);
      setErrors({ ...errors, exists: true });
      setEnteredEmail("");
      setEnteredPass("");
      return;
    }
  };

  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  return (
    <>
      <UserNav />
      <Container className="login">
        <Form className="form-login" onSubmit={loginHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              ref={userEmailRef}
              value={enteredEmail}
              type="text"
              placeholder="user@example.com"
              onChange={emailHandler}
              className={errors.email && "border border-danger"}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={passRef}
              value={enteredPass}
              type="password"
              placeholder="Contraseña"
              onChange={passHandler}
              className={errors.pass && "border border-danger"}
            ></Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">
            Login
          </Button>

          <br />
          <Button onClick={handlebuttonForgotPassword}> ¿Olvidaste tu contraseña? </Button>

          {errors.exists && (
            <Alert variant="danger" className="mt-3">
              Credenciales inválidas
            </Alert>
          )}
          {(errors.email || errors.pass) && (
            <Alert variant="warning" className="mt-3">
              Debes completar todos los campos
            </Alert>
          )}
        </Form>
      </Container>
    </>
  );
};

export default Login;
