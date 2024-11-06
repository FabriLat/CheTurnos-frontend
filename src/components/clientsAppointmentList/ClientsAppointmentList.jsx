import { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import ClientsAppointmentItem from '../clientsAppointmentItem/ClientsAppointmentItem';
import Spiner from '../spiner/Spiner';
import useValidateUser from '../hookCustom/useValidateUser';
import './clientAppointments.css';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ClientsAppointmentList = () => {
    const { user } = useContext(AuthenticationContext);
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { isClient, isEmployee } = useValidateUser();
    const [filterType, setFilterType] = useState("ACTIVO"); 

    const fetchClientAppointments = async () => {
        try {
            const response = await fetch(`https://localhost:7276/api/Appointment/GetAvailableAppointmentsByClient/${user.id}`, {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error("Error en la obtención de turnos");
            }
            const appointmentsData = await response.json();
            setAppointments(appointmentsData);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    const fetchEmployeeAppointments = async () => {
        try {
            const response = await fetch(`https://localhost:7276/api/Appointment/GetAvailableAppointmentsByEmployeeId/${user.id}`, {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error("Error en la obtención de turnos");
            }
            const appointmentsData = await response.json();

            
            const filteredAppointments = appointmentsData.filter((appointment) => {
                const isInactive = !appointment.clientName && !appointment.serviceName;
                const isActive = appointment.clientName || appointment.serviceName;
                return filterType === "ACTIVO" ? isActive : isInactive;
            });

            setAppointments(filteredAppointments);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isClient()) {
            fetchClientAppointments();
        } else if (isEmployee()) {
            fetchEmployeeAppointments();
        }
    }, [user.id, filterType]);

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const availableDates = new Set(
        appointments.map((appointment) =>
            new Date(appointment.dateAndHour).toDateString()
        )
    );

    const tileDisabled = ({ date }) => !availableDates.has(date.toDateString());

    const filteredAppointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.dateAndHour);
        return (
            appointmentDate.getFullYear() === selectedDate.getFullYear() &&
            appointmentDate.getMonth() === selectedDate.getMonth() &&
            appointmentDate.getDate() === selectedDate.getDate()
        );
    });

    const capitalizeFirstLetter = (string) =>
        string.charAt(0).toUpperCase() + string.slice(1);

    const formattedDay = capitalizeFirstLetter(
        selectedDate.toLocaleString("es-AR", { weekday: "long" })
    );
    const formattedMonth = capitalizeFirstLetter(
        selectedDate.toLocaleString("es-AR", { month: "long" })
    );
    const formattedDate = `Fecha: ${formattedDay} ${selectedDate.getDate()} de ${formattedMonth} de ${selectedDate.getFullYear()}`;

    const removeAppointment = (id) => {
        setAppointments((prevAppointments) => prevAppointments.filter((a) => a.id !== id));
    };

    return (
        <div>
            {loading ? (
                <Spiner />
            ) : (
                <div className="outer-container-appointment">
                    <div className="appointment-list-container">
                        <div className="title-service">
                            <h1 className="service-title">Mis turnos:</h1>
                        </div>
                        
                        
                        {isEmployee() && (
                            <div className="filter-select" style={{width:'20%', marginLeft:'40%', marginBottom:'1%'}}>
                                <label htmlFor="filterType" style={{fontSize:'20px'}}>Filtrar turnos:</label>
                                <select id="filterType" value={filterType} onChange={handleFilterChange}>
                                    <option value="ACTIVO">Activo</option>
                                    <option value="INACTIVO">Inactivo</option>
                                </select>
                            </div>
                        )}

                        <div className="calendar-container">
                            <Calendar
                                onChange={setSelectedDate}
                                value={selectedDate}
                                minDate={new Date()}
                                tileDisabled={tileDisabled}
                                tileClassName={({ date }) =>
                                    availableDates.has(date.toDateString()) ? 'available-date' : null
                                }
                            />
                        </div>

                        <div className="date-div">
                            <h2 className="date-title">
                                {formattedDate}
                            </h2>
                        </div>

                        <div className="card-service">
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((a) => (
                                    <ClientsAppointmentItem
                                        key={a.id}
                                        shopName={a.shopName}
                                        serviceName={a.serviceName}
                                        dateAndHour={a.dateAndHour}
                                        onRemoveAppointment={removeAppointment}
                                        clientName={a.clientName}
                                        id={a.id}
                                    />
                                ))
                            ) : (
                                <p>No hay turnos disponibles para esta fecha.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientsAppointmentList;
