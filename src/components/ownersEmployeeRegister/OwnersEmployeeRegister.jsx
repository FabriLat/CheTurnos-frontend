import React from 'react'
import { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import "../register/register.css"
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../register/CheTurnosIco.png";
import executive from '../register/executive.png';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { ShopContext } from '../../services/shop/ShopContext';

const OwnersEmployeeRegister = () => {

  const { token, user } = useContext(AuthenticationContext);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmPassRef = useRef(null);

  const { setEmpFlag } = useContext(ShopContext);
  const navegate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const [showModal, setShowModal] = useState(false);
  const [responseMessagge, setResponseMessagge] = useState("")
  const [styleMessagge, setStyleMessagge] = useState("")
const [errorMessagge, setErrorMessagge] = useState("")
  const showModalHandler = () => {
    if (showModal) {
      setStyleMessagge("")
      setResponseMessagge("")
      setErrorMessagge("");
      navegate('/OwnersEmployeeList');

      setShowModal(false)
    } else {
      setShowModal(false)
    }
  };


  const RegisterClient = async () => {
    await fetch("https://localhost:7276/api/Employee/Create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        shopId: user.shopId
      }),
    })
      .then((response) => {
        if (response.ok) {
          setEmpFlag(true);
          //alert("Empleado registrado con éxito")
          setStyleMessagge("text-success");
          setResponseMessagge("Operación exitosa!");
          setShowModal(true);

          return response.json();
        }
        else {
          throw new Error("The response has some errors");
        }
      })
      .then((data) => console.log(data))
      .catch(() => {
        // setStyleMessagge("text-danger")
        // setResponseMessagge("Error de Conexion!")
        // //showModalHandler()
        // setShowModal(true)
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const confirmPassword = confirmPassRef.current.value;

    let formIsValid = true;

    if (!fullName) {
      setErrors((prevErrors) => ({ ...prevErrors, fullName: true }));
      formIsValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, fullName: false }));
    }

    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: true }));
      formIsValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: false }));
    }

    if (!password || password.length < 8 || !isAlphanumeric(password)) {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      formIsValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: false }));
    }

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: true }));
      formIsValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: false }));
    }

    if (formIsValid) {
      console.log("Formulario enviado");
      RegisterClient();
    }
  };



  return (
    <>
      <div className="outer-container">

        <img
          className="executive"
          src={executive}
          alt="Logo"
        />
        <div className="register">
          <h2>Registro Empleados <img
            className="calendar"
            src={logo}
            alt="Logo"
          /></h2>
          <form className="form-register" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre Completo:</label>
              <input
                ref={fullNameRef}
                type="text"
                name="fullName"
                placeholder="Introduce tu nombre completo"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "input-error" : ""}
              />
              {errors.fullName && (
                <div className="alert alert-warning">Completa el campo.</div>
              )}
            </div>

            <div className="form-group">
              <label>Correo Electrónico:</label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="Introduce tu correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <div className="alert alert-warning">Completa el campo.</div>
              )}
            </div>

            <div className="form-group">
              <label>Contraseña:</label>
              <input
                ref={passRef}
                type="password"
                name="password"
                placeholder="Introduce tu contraseña"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <div className="alert alert-warning">
                  La contraseña debe tener al menos 8 caracteres y ser alfanumérica.
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirmar Contraseña:</label>
              <input
                ref={confirmPassRef}
                type="password"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && (
                <div className="alert alert-warning">
                  Las contraseñas no coinciden.
                </div>
              )}
            </div>

            <button type="submit" className="register-button">
              Registrar empleado
            </button>
          </form>
        </div>
      </div>
      <Modal show={showModal} onHide={showModalHandler} centered>
        <Modal.Body>
          <h3 className={styleMessagge}>{responseMessagge}</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showModalHandler}>
            CERRAR
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


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


export default OwnersEmployeeRegister
