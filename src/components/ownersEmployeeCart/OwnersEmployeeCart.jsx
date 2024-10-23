import { Button, Card } from "react-bootstrap";

import { useContext } from "react";
import PropTypes from 'prop-types';

const OwnersEmployeeCard = ({ employeeId, name, email }) => {

    const handlebutton = () => {
        //Llamar a la api para eleiminar empleado.
    };

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
}

export default OwnersEmployeeCard;
