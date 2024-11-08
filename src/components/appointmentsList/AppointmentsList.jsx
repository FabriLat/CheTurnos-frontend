import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import Spiner from "../spiner/Spiner";
import AppointmentCard from "../appointmentCard/AppointmentCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './appointmentList.css';
import { Modal, Button } from "react-bootstrap";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const { dataForRequest } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false); // Estado del modal
  const providerId = dataForRequest.providerId;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `https://localhost:7276/api/Appointment/GetAvailableAppointmentsByEmployeeId/${providerId}`,
          {
            method: "GET",
            mode: "cors",
          }
        );
        if (!response.ok) throw new Error("Error en la obtención de turnos");

        const appointmentsData = await response.json();
        setAppointments(appointmentsData.filter((a) => a.status !== "Inactive"));
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAppointments();
  }, [providerId]);

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

  // Función para mostrar el modal
  const handleAssignSuccess = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      {loading ? (
        <Spiner />
      ) : (
        <div className="outer-container-appointment-list">
          <h1 className="appointment-title">Turnos disponibles del empleado:</h1>
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
            <h2 className="date-title">{formattedDate}</h2>
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
                    onRemoveAppointment={() =>
                      setAppointments((prev) =>
                        prev.filter((ap) => ap.id !== a.id)
                      )
                    }
                    handleAssignSuccess={handleAssignSuccess} // Pasamos la función para mostrar el modal
                  />
                ))
              ) : (
                <p>No hay turnos disponibles para esta fecha.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>¡Turno asignado con éxito!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Se ha asignado el turno correctamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppointmentsList;
