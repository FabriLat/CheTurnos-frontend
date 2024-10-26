import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import Spiner from '../spiner/Spiner';

const ClientsAppointmentItem = ({ id, idShop, idService, dateAndHour, }) => {

    const [nameShop, setNameShop] = useState('');
    const [nameService, setNameService] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNameShop();
        getnNameService();
    }, []);

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

    let formatedDay = 'Loading...';
    let formattedHour = 'Loading...';
    if (dateAndHour) {
    const [date, time] = dateAndHour.split('T');
    formatedDay = new Date(date).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
    formattedHour = time.slice(0, 5); //agarra los primeros 5 caracteres.
}

const handlebutton = () => {
    console.log("Cancelar un turno?")
};
return (
    <div>
        {loading ? (
            <Spiner />
        ) : (<>
            <h1>{id}</h1>
            <Card key={id} style={{border: '2px solid #0d6efd'}}>
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

ClientsAppointmentItem.propTypes = {
    id: PropTypes.number,
    idShop: PropTypes.number,
    idService: PropTypes.number,
    dateAndHour: PropTypes.string,
}


export default ClientsAppointmentItem
