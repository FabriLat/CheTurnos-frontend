import { Button, Card } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { useContext } from "react";
import PropTypes from 'prop-types';

const OwnersEmployeeCard = ({ employeeId, name, email, onfetch }) => {
    const { token } = useContext(AuthenticationContext);
    const handlebutton = () => {
        //Llamar a la api para eleiminar empleado.
        deleteEmployee()
        onfetch();
    };

    const deleteEmployee = async () => {
        try {
            const response = await fetch(
                `https://localhost:7276/api/employee/delete/${employeeId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                      },
                    mode: "cors"
                }
            );
            if (!response.ok) {
                throw new Error("Error deleting employee");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="mt-4">
            <Card key={employeeId} style={{border: '2px solid #0d6efd'}}>
                <Card.Header as="h5">{name}</Card.Header>
                <Card.Body>
                    <Card.Title>Email: {email}</Card.Title>
                    <Card.Text>
                        <br />
                        <Button variant="primary" onClick={handlebutton}>
                            Eliminar Empleado
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

OwnersEmployeeCard.propTypes = {
    employeeId: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    onfetch: PropTypes.func
}

export default OwnersEmployeeCard;
