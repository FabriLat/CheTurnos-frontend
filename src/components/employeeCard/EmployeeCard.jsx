import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ employeeId, name, email, state }) => {
  //const navegate = useNavigate();
  const handlebutton = (e) => {
    console.log(e)
  };
  return (
    <div className="mt-4">
      <Card key={employeeId}>
        <Card.Header as="h5">{name}</Card.Header>
        <Card.Body>
          <Card.Title>estado: {state}</Card.Title>
          <Card.Text>
            {email} <br />
            <br />
            <br />
          </Card.Text>
          <Button variant="primary" onClick={handlebutton}>
            Elegir Empleado
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeCard;
