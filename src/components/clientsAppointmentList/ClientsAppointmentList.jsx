import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import ClientsAppointmentItem from '../clientsAppointmentItem/ClientsAppointmentItem';
import Spiner from '../spiner/Spiner';
const ClientsAppointmentList = () => {
    const { user } = useContext(AuthenticationContext);
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);

    const fetchClientAppointments = async () => {
        try {
            const response = await fetch(`https://localhost:7276/api/Appointment/GetAvailableAppointmentsByClient/${user.id}`, {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error("Error in obtaining appointments")
            }
            const appointmentsData = await response.json();
            setAppointments(appointmentsData);
            setLoading(false); // desactiva el spiners
        }
        catch (error) {
            console.error("Error:", error)
            setLoading(false); // desactiva el spiners
        }
    };

    useEffect(() => {
        fetchClientAppointments();
    }, [user.id]);

    return (
        <div>
            {loading ? (
                <Spiner />
            ) : (
                <div className="outer-container">
                    <div className="shop-list-container">
                        <div className="title-service">
                            <h1 className="service-title">Mis turnos</h1>
                        </div>
                        <div className="card-service">
                            {appointments.map(a => (
                                <ClientsAppointmentItem
                                    key={a.id}
                                    idShop={a.shopId}
                                    IdService={a.serviceId}
                                    dateAndhour={a.dateAndhour}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientsAppointmentList;