import { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";

const AppointmentCard = ({ idAppointment, date, id, onRemoveAppointment }) => {
  const navigate = useNavigate();
  
  const { dataForRequest, setDataForRequest, user } = useContext(AuthenticationContext);
  const dateObj = new Date(date);
  const [serviceId, setServiceId] = useState(null);
  const [clientId, setClientId] = useState(null);
  const formattedDay = dateObj.toLocaleString("es-AR", { weekday: "long" });
  const formattedMonth = dateObj.toLocaleString("es-AR", { month: "long" });
  const formattedDate = `${formattedDay} ${formattedMonth} ${dateObj.getDate()}`;
  const formattedHour = dateObj.toLocaleString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const assignClientString = localStorage.getItem("assignClient"); //Se trae el id del cliente, y del servicio.
  const assignClientData = assignClientString ? JSON.parse(assignClientString) : null;


  const userValueString = localStorage.getItem("userData");
  const userValue = userValueString ? JSON.parse(userValueString) : null;

  
  console.log("DATA PARA MANDAR AL ASSIGN", dataForRequest);


  const reserveAppointmentRequest = async () => {
    if (!assignClientData) {
      console.error("No hay datos de assignClient disponibles????");
      return;
    }

    const transformedData = {
      idAppointment: idAppointment,
      serviceId: assignClientData.serviceId,
      clientId: assignClientData.clientId,
    };
    console.log(`AAAAAAAAAAAAAAAAAAAAAA${JSON.stringify(transformedData)}`);
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

        throw new Error("Error in assign appointment");
      }
      console.log("DATA ENVIADA: ", JSON.stringify(transformedData));
      onRemoveAppointment(idAppointment); //actualiza lista?
      alert("Se ha asignado el turno correctamente");
      navigate("/shoplist");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlebutton = () => {
    setDataForRequest({ ...dataForRequest, appointmentId: idAppointment });
    setClientId(user.id);
    setServiceId(dataForRequest.serviceId)
    reserveAppointmentRequest();
    setDataForRequest({ ...dataForRequest, dateAndHour: date });
    console.log("la request se ha realizado con los datos enviados: " + dataForRequest);
  };

  return (
    <div>
      <h1>{id}</h1>
      <Card key={idAppointment} style={{ border: ' 1px solid #0b9c08' }} >
        <Card.Body>
          <Card.Title>
            Fecha: {formattedDate}
            <br />
            <br /> Hora: {formattedHour}
            <br />
            <br />
          </Card.Title>
          <Button style={{ backgroundColor: '#0b9c08' }} onClick={handlebutton} variant="primary">
            Elegir turno
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AppointmentCard;
