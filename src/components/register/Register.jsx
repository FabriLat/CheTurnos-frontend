import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import UserNav from "../userNav/UserNav";

const RegisterForm = () => {

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmPassRef = useRef(null);
  const navegate = useNavigate();

  const handlebuttonForgotPassword = () => {
    navegate("/PassResetForm");
  }

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: true,
    email: true,
    password: true,
    confirmPassword: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const RegisterClient = async () => {
    await fetch("https://localhost:7276/api/Client/CreateNewClient", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "name": formData.fullName,
        "email": formData.email,
        "password": formData.password
      })
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("The response has some errors");
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const confirmPassword = confirmPassRef.current.value;

    let formIsValid = true;
    if (!fullName) {
      setErrors({ ...formData, fullName: true });
      formIsValid = false;
    } else {
      setErrors({ ...formData, fullName: false });
    }

    if (!email) {
      setErrors({ ...formData, email: true });
      formIsValid = false;
    } else {
      setErrors({ ...formData, email: false });
    }
    if (!password || password.length < 8 || isAlphanumeric(password) == false) {
      setErrors({ ...formData, password: true });
      formIsValid = false;
    } else {
      setErrors({ ...formData, password: false });
    }

    if (password !== confirmPassword) {
      setErrors({ ...formData, confirmPassword: true });
      formIsValid = false;
    } else {
      setErrors({ ...formData, confirmPassword: false });
    }

    if (formIsValid) {
      console.log("Formulario enviado"/*, formData*/);
      RegisterClient();
    };
  };

  return (
    <>
      <UserNav />
      <Container className="mt-4">
        <h2>Registro</h2>
        <Form className="mt-5" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              ref={fullNameRef}
              type="text"
              placeholder="Introduce tu nombre completo"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName ? "" : "Completa el campo."}

          </Form.Group>

          <Form.Group className="mt-4">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              ref={emailRef}
              type="email"
              placeholder="Introduce tu correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email ? "" : "Completa el campo."}
          </Form.Group>

          <Form.Group className="mt-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              ref={passRef}
              type="password"
              placeholder="Introduce tu contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password ? "" : "Completa el campo."}
          </Form.Group>

          <Form.Group className="mt-4">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              ref={confirmPassRef}
              type="password"
              placeholder="Confirma tu contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword ? "Las claves no coinciden." : ""}
          </Form.Group>

          <Button className="mt-3" variant="primary" type="submit">
            Registrarse
          </Button>
          <br />
          <Button onClick={handlebuttonForgotPassword}> ¿Olvidaste tu contraseña? </Button>
        </Form>
      </Container>
    </>
  );
};

function isAlphanumeric(pass) {  //Recibe un string y devuelve false si no es alfanumerico =)
  let hasLetter = false;
  let hasNumber = false;
  for (let i = 0; i < pass.length; i++) {
    const asciiCode = pass.charCodeAt(i);
    if (asciiCode >= 48 && asciiCode <= 57) { // 0 - 9
      hasNumber = true;
    } else if (
      (asciiCode >= 65 && asciiCode <= 90) ||  // a - z
      (asciiCode >= 97 && asciiCode <= 122)  // A - Z
    ) {
      hasLetter = true;
    } else {
      return false;
    }
  }
  return hasLetter && hasNumber;
}


export default RegisterForm;
