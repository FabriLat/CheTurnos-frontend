import { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";

const AppointmentCard = ({ idAppointment, date, onRemoveAppointment, handleAssignSuccess }) => {
  const { dataForRequest } = useContext(AuthenticationContext);
  const dateObj = new Date(date);
  const formattedHour = dateObj.toLocaleString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const assignClientString = localStorage.getItem("assignClient");
  const assignClientData = assignClientString ? JSON.parse(assignClientString) : null;

  const reserveAppointmentRequest = async () => {
    if (!assignClientData) {
      console.error("No hay datos de assignClient disponibles");
      return;
    }

    const transformedData = {
      idAppointment,
      serviceId: assignClientData.serviceId,
      clientId: assignClientData.clientId,
    };

    try {
      const response = await fetch(
        "https://localhost:7276/api/Appointment/AssignClient",
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData),
        }
      );
      if (!response.ok) {
        throw new Error("Error en la asignación del turno");
      }
      onRemoveAppointment(idAppointment);
      handleAssignSuccess(); // Llamada para activar el modal en la lista
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card key={idAppointment} style={{ border: "5px solid #51f6af", borderRadius: "5%", backgroundColor: "#fcf7f7" }}>
      <Card.Body>
        <Card.Title>
          Hora: {formattedHour}
          <br />
        </Card.Title>
        <Button style={{ backgroundColor: "#51f6af", borderColor: "#51f6af" }} onClick={reserveAppointmentRequest} variant="primary">
          Elegir turno
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AppointmentCard;
