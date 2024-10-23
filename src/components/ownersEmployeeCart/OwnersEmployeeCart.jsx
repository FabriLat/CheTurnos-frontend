import { Button, Card } from "react-bootstrap";

import { useContext } from "react";
import PropTypes from 'prop-types';

const OwnersEmployeeCard = ({ employeeId, name, email, onfetch }) => {

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
            <Card key={employeeId}>
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
