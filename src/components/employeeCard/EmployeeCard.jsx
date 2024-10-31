import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { useContext } from "react";

const EmployeeCard = ({ employeeId, name, email, state }) => {
  const {dataForRequest, setDataForRequest} = useContext (AuthenticationContext);
  const navegate = useNavigate();

  const handlebutton = () => {
    setDataForRequest({ ...dataForRequest, providerId: employeeId });
    navegate("/AppointmentList");
  };
  
  return (
    <div className="mt-4">
      <Card style={{border: '5px solid #2d9ae3', borderRadius: '10%', backgroundColor:'#fcf7f7'}}key={employeeId}>
        <Card.Header style={{color:'#2d9ae3',backgroundColor: '#fcf7f7', borderBottom: '3px solid #2d9ae3'}}as="h5">{name}</Card.Header>
        <Card.Body>
          <Card.Text>
          </Card.Text>
          <Button style={{backgroundColor:'#2d9ae3'}} variant="primary" onClick={handlebutton}>
            Elegir Empleado
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeCard;
