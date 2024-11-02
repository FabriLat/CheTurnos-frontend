import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import Spiner from "../spiner/Spiner";
import AppointmentCard from "../appointmentCard/AppointmentCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './appointmentList.css'

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const { dataForRequest } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const providerId = dataForRequest.providerId;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`https://localhost:7276/api/Appointment/GetAvailableAppointmentsByEmployeeId/${providerId}`, {
          method: "GET",
          mode: "cors",
        });
        if (!response.ok) throw new Error("Error in obtaining appointments");

        const appointmentsData = await response.json();
        setAppointments(appointmentsData.filter((a) => a.status !== "Inactive"));
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAppointments();
  }, [providerId]);

  // Función para filtrar turnos por fecha seleccionada
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.dateAndHour);
    return (
      appointmentDate.getFullYear() === selectedDate.getFullYear() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div>
      {loading ? (
        <Spiner />
      ) : (
        <div className="outer-container-appointment">
          <h1 className="service-title">Turnos disponibles del empleado:</h1>
          <div className="calendar-container">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
            />
          </div>
          <div className="appointment-list-container">
            <div className="card-service">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((a) => (
                  <AppointmentCard
                    key={a.id}
                    idAppointment={a.id}
                    service={a.name}
                    date={a.dateAndHour}
                    onRemoveAppointment={() => setAppointments((prev) => prev.filter((ap) => ap.id !== a.id))}
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

export default AppointmentsList;
