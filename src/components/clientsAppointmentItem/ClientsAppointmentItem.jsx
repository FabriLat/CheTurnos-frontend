import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import Spiner from '../spiner/Spiner';

const ClientsAppointmentItem = ({ id, shopName, serviceName, dateAndHour, }) => {

    const formatDateTime = (dateTime) => {
        const aux1 = dateTime.split("T");
        const aux2 = aux1[0].split("-");
        const newFormat = `${aux2[2]}/${aux2[1]}/${aux2[0]} - ${aux1[1].slice(0, -3)}`;
        return newFormat;
      };

    const handlebutton = () => {
        console.log("Cancelar un turno?")
    };
    return (
        <div>
            {loading ? (
                <Spiner />
            ) : (<>
                <h1>{id}</h1>
                <Card key={id} style={{ border: '2px solid #0d6efd' }}>
                    <Card.Header as="h5">Turno</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Servicio: {serviceName}
                            <br />
                            Negocio: {shopName}
                            <br />
                            Fecha: {formatedDay}
                            <br />
                            Hora: {formatDateTime(dateAndHour)}
                        </Card.Title>
                        <Button onClick={handlebutton} variant="primary">
                            ¿Cancelar turno?
                        </Button>
                    </Card.Body>
                </Card>
            </>
            )}
        </div>
    )
}

ClientsAppointmentItem.propTypes = {
    id: PropTypes.number,
    shopName: PropTypes.string,
    serviceName: PropTypes.string,
    dateAndHour: PropTypes.string,
}


export default ClientsAppointmentItem
