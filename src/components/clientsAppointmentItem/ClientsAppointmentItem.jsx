import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import Spiner from '../spiner/Spiner';

const ClientsAppointmentItem = ({ idShop, idService, dateAndHour, }) => {

    const [nameShop, setNameShop] = useState('');
    const [nameService, setNameService] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNameShop();
        getnNameService();
    },[]);

    const getNameShop = async () => {
        try {
            const response = await fetch(`https://localhost:7276/api/Shop/GetById/${idShop}`, {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error("Error in obtaining nameShop")
            }
            const ShopData = await response.json();
            setNameShop(ShopData.name);
            setLoading(false); // desactiva el spiners
        }
        catch (error) {
            console.error("Error:", error)
        }
    }
    const getnNameService = async () => {
        try {
            const response = await fetch(`https://localhost:7276/api/Service/GetById/${idService}`, {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error("Error in obtaining appointments")
            }
            const ServiceData = await response.json();
            setNameService(ServiceData.name);
            setLoading(false); // desactiva el spiners
        }
        catch (error) {
            console.error("Error:", error)
        }
    }

    const dateObj = new Date(dateAndHour);
    const formatedDay = dateObj.toLocaleDateString("es-AR",{weeday:"long",day:"numeric",month:"long"});
    const formattedHour = dateObj.toLocaleTimeString("es-AR", { hour: '2-digit', minute: '2-digit' });

    const handlebutton = () => {
        console.log("Cancelar un turno?")
    };
    return (
        <div>
            {loading ? (
                <Spiner />
            ) : (<>
                <h1>{id}</h1>
                <Card key={id}>
                    <Card.Header as="h5">Turno</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Servicio: {nameService}
                            <br />
                            Negocio: {nameShop}
                            <br />
                            Fecha: {formatedDay}
                            <br />
                            Hora: {formattedHour}
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

ClientsAppointmentItem.PropTypes = {
    idShop: PropTypes.number,
    idService: PropTypes.number,
    dateAndHour: PropTypes.string,
}


export default ClientsAppointmentItem
