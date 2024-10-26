import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import Spiner from '../spiner/Spiner';
import AppointmentCard from "../appointmentCard/AppointmentCard";

const AppointmentsList = () => {

    const [appointments, setAppointments] = useState([]);
    const {dataForRequest} = useContext(AuthenticationContext);
    const [loading, setLoading] = useState(true); 
    const providerId = dataForRequest.providerId;
    console.log("DATA PARA MANDAR AL ASSIGN",dataForRequest);

    const fetchAppointments = async () => {
        console.log("Inicio de fetch")
        try {
          const response = await fetch(`https://localhost:7276/api/Appointment/GetAvailableAppointmentsByEmployeeId/${providerId}`, {
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
        }
      };

    useEffect(() => {
        fetchAppointments();
        console.log(appointments);
    }, []);
    return (
      <div>
        {loading ? (
          <Spiner />
        ) : (
          <div className="outer-container">
            <div className="shop-list-container">
              <div className="title-service">
                <h1 className="service-title">Turnos disponibles del empleado</h1>
              </div>
              <div className="card-service">
                {appointments.map((a) => (
                  <AppointmentCard
                    key={a.id}
                    idAppointment={a.id}
                    service={a.name}
                    date={a.dateAndHour}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default AppointmentsList;