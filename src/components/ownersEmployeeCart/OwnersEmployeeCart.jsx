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
            <Card key={employeeId} style={{border: '5px solid #0d6efd', borderRadius: '10%', backgroundColor:'#fcf7f7'}}>
                <Card.Header as="h5" style={{color:'#0d6efd',backgroundColor: '#fcf7f7', borderBottom: '3px solid #0d6efd'}}>{name}</Card.Header>
                <Card.Body>
                    <Card.Title>Email:</Card.Title>
                    <Card.Text> {email}</Card.Text>
                    <Card.Text>
                        <br />
                        <Button variant="danger" onClick={handlebutton}>
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
