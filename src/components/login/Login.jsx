import { useContext, useEffect, useRef, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from "./CheTurnosIco.png";
import executive from "./executive.png";
import Spiner from "../spiner/Spiner";


const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPass, setEnteredPass] = useState("");
  const userEmailRef = useRef(null);
  const passRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: false,
    pass: false,
    exists: false,
  });

  const navegate = useNavigate();

  const handlebuttonForgotPassword = () => {
    navegate("/PassResetForm");
  };

  const { dataLoginHandler, user } = useContext(
    AuthenticationContext
  );

  const emailHandler = (event) => {
    setErrors({ ...errors, email: false });
    setEnteredEmail(event.target.value);
  };

  const passHandler = (event) => {
    setErrors({ ...errors, pass: false });
    setEnteredPass(event.target.value);
  };

  const loginHandler = (event) => {
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

    // Llamar a la API
    fetchUser();
    
  };

  const fetchUser = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        "https://localhost:7276/api/Authentication",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
          }),
        }
      );

      const token = await response.text();

      if (response.ok) {
        const decodedToken = parseJwt(token);
        // ID, ROL y el nombre.
        const userId = decodedToken.sub;
        const userRole = decodedToken.role;
        const userName = decodedToken.given_name;
        const email = decodedToken.email;
        const shopId = decodedToken.shopId;
        console.log("shopId DESDE LOGIN", shopId);
        dataLoginHandler(userName, userRole, userId, token, email, shopId);
        setLoading(false);
      } else {
        setErrors({ ...errors, exists: true });
        setEnteredEmail("");
        setEnteredPass("");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.", error);
      setErrors({ ...errors, exists: true });
      setEnteredEmail("");
      setEnteredPass("");
      setLoading(false);
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

  useEffect(() => {
    if (user != null) {
      if (user.role == "Owner") {
        navegate("/ownerPage");
      }
      if (user.role == "Client") {
        navegate("/shopList");
      }
      if (user.role == "Employee") {
        navegate("/ClientAppointmentsList");
      }
      if (user.role == "SysAdmin") {
        navegate("/Users");
      }
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Spiner />
      ) :
        (
          <div className="outer-container-login">
            <img className="executive" src={executive} alt="Logo" />
            <div className="login">
              <img className="calendar" src={logo} alt="Logo" />
              <form className="form-login" onSubmit={loginHandler}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    ref={userEmailRef}
                    value={enteredEmail}
                    type="text"
                    placeholder="usuario@ejemplo.com"
                    onChange={emailHandler}
                    className={errors.email ? "input-error" : ""}
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña:</label>
                  <input
                    ref={passRef}
                    value={enteredPass}
                    type="password"
                    placeholder="Contraseña"
                    onChange={passHandler}
                    className={errors.pass ? "input-error" : ""}
                  />
                </div>
                <button type="submit" className="login-button">
                  Iniciar Sesión
                </button>
                <br />
                <a
                  href="#"
                  onClick={handlebuttonForgotPassword}
                  className="forgot-password-link"
                >
                  ¿Olvidaste tu contraseña?
                </a>
                {errors.exists && (
                  <div className="alert alert-danger">Credenciales inválidas</div>
                )}
                {(errors.email || errors.pass) && (
                  <div className="alert alert-warning">
                    Debes completar todos los campos
                  </div>
                )}
              </form>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Login;
