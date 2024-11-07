import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Modal } from "react-bootstrap";
import useValidateUser from '../hookCustom/useValidateUser';

const ClientsAppointmentItem = ({ id, shopName, serviceName, dateAndHour, onRemoveAppointment, clientName }) => {
    const { isClient, isEmployee } = useValidateUser();
    const [showModal, setShowModal] = useState(false); 

    const formatDateTime = (dateTime) => {
        const aux1 = dateTime.split('T');
        const aux2 = aux1[0].split('-');
        const newFormat = `${aux2[2]}/${aux2[1]}/${aux2[0]} - ${aux1[1].slice(0, -3)}`;
        return newFormat;
    };

    const handlebutton = () => {
        setShowModal(true); 
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`https://localhost:7276/api/Appointment/DeleteAppointment/${id}`, {
                method: "DELETE",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error("Error in delete Appointment");
            }
            onRemoveAppointment(id); // Actualizar la lista de turnos
            console.log("Appointment deleted successfully");
            setShowModal(false); // Cerrar el modal tras confirmar
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Card key={id} style={{ border: '5px solid #0d6efd', borderRadius: '10%', backgroundColor: '#fcf7f7' }}>
                <Card.Header as="h5" style={{ borderBottom: '5px solid #0d6efd', backgroundColor: '#fcf7f7', color: '#0d6efd' }}>Turno</Card.Header>
                <Card.Body>
                    <h6 style={{ color: '#0d6efd' }}>Servicio:</h6>
                    <Card.Text>{serviceName}</Card.Text>

                    <h6 style={{ color: '#0d6efd' }}>Negocio:</h6>
                    <Card.Text>{shopName}</Card.Text>

                    {isEmployee() && (
                        <>
                            <h6 style={{ color: '#0d6efd' }}>Cliente:</h6>
                            <Card.Text>{clientName}</Card.Text>
                        </>
                    )}
                    <h6 style={{ color: '#0d6efd' }}>Fecha y hora:</h6>
                    <Card.Text>{formatDateTime(dateAndHour)}</Card.Text>

                    <Button onClick={handlebutton} variant="danger">
                        ¿Cancelar turno?
                    </Button>
                </Card.Body>
            </Card>

            {/* Modal de confirmación */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar cancelación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas cancelar este turno?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        No, conservar turno
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Sí, cancelar turno
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

ClientsAppointmentItem.propTypes = {
    id: PropTypes.number,
    shopName: PropTypes.string,
    serviceName: PropTypes.string,
    dateAndHour: PropTypes.string,
    onRemoveAppointment: PropTypes.func,
    clientName: PropTypes.string,
};

export default ClientsAppointmentItem;
