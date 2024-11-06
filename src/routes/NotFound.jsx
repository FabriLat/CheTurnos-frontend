import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cheTurnos from './CheTurnos-Photoroom.png';
import reloj from './reloj.gif';

const NotFound = () => {
  const navigate = useNavigate();

  const goBackLoginHandler = () => {
    navigate("/");
  };

  return (
    <>
    <div className="text-center mt-3">
      <img src={cheTurnos} alt="CheTurnos" style={{height:'400px'}} />
      <h2 style={{ marginTop:'-9%', marginBottom:'2%'}}> ¡Ups! La página solicitada no fue encontrada</h2>
      <Button style={{backgroundColor:'#6d21dd'}}className="text-center" onClick={goBackLoginHandler}>
        Volver al inicio
      </Button>
    </div>
    <img src={reloj} alt="reloj" style={{height:'200px', marginLeft:'43.5%'}} />
    </>
  );
};

export default NotFound;
