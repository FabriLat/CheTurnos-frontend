import executive from './executive.png';
import './registerScreen.css'
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const navigate = useNavigate(); 
  return (
    <div className="outer-container">
        <img
          className="executive"
          src={executive}
          alt="Logo"
        />
        <div className="registerScreen">
        <h2> ¿Quiere registrarse como Usuario?</h2>
           <button type="submit" className="register-button-user" onClick={() => navigate("/register")}>
              Registro Usuario
            </button>
          
        </div>
        <div className="registerScreenBusiness">
        <h2> ¿Quiere registrarse como Negocio?</h2>
           <button type="submit" className="register-button-shop" onClick={() => navigate("/shopForm")}>
              Registro Negocio
            </button>
          
        </div>

      
    </div>
  )
}

export default RegisterScreen
