import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import useValidateUser from '../hookCustom/useValidateUser';

const ClientsAppointmentItem = ({ id, shopName, serviceName, dateAndHour, onRemoveAppointment, clientName }) => {
    console.log(dateAndHour);
    const { isClient, isEmployee } = useValidateUser();
    console.log("ClientsAppointmentItemClientsAppointmentItemClientsAppointmentItemClientsAppointmentItemClientsAppointmentItem")

    const formatDateTime = (dateTime) => {
        const aux1 = dateTime.split('T');
        const aux2 = aux1[0].split('-');
        const newFormat = `${aux2[2]}/${aux2[1]}/${aux2[0]} - ${aux1[1].slice(0, -3)}`;
        return newFormat;
    };

    const handlebutton = () => {
        console.log(`Cancelar turno ${id}` )
        DeleteAppointment();
        //onRemoveAppointment(id) cuando se elimina/cancela el tunro se usa esta funcion 
        //para que se acutalize la lista de turnos.
    };

    const DeleteAppointment = async () => {
        try {
            const response = await fetch(`https://localhost:7276/api/Appointment/DeleteAppointment/${id}`, {
                method: "DELETE",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error("Error in delete Appointment");
            }
            onRemoveAppointment(id);
            console.log("Appointment deleted successfully")
        }
        catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <div>
            <Card key={id} style={{ border: '2px solid #0d6efd' }}>
                <Card.Header as="h5">Turno </Card.Header>
                <Card.Body>
                    <Card.Title>
                        Servicio: {serviceName}
                        <br />
                        Negocio: {shopName}
                        <br />
                        Fecha y hora: {formatDateTime(dateAndHour)}
                        <br/>
                        {(isEmployee()&& clientName) ? (<>Nombre del Cliente: {(clientName)}</>):(<> Turno Libre </>) }
                    </Card.Title>
                    <Button onClick={handlebutton} variant="danger">
                        ¿Cancelar turno?
                    </Button>
                </Card.Body>
            </Card>

        </div>
    )
}

ClientsAppointmentItem.propTypes = {
    id: PropTypes.number,
    shopName: PropTypes.string,
    serviceName: PropTypes.string,
    dateAndHour: PropTypes.string,
    onRemoveAppointment: PropTypes.func,
    clientName: PropTypes.string,
}


export default ClientsAppointmentItem
