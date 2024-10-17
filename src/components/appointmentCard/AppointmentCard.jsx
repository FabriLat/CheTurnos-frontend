import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";

const AppointmentCard = ({ idAppointment, date, id }) => {
  const navigate = useNavigate();

  const { dataForRequest, setDataForRequest } = useContext(AuthenticationContext);
  const dateObj = new Date(date);
  const formattedDay = dateObj.toLocaleString("es-AR", { weekday: "long" });
  const formattedMonth = dateObj.toLocaleString("es-AR", { month: "long" });
  const formattedDate = `${formattedDay} ${formattedMonth} ${dateObj.getDate()}`;
  const formattedHour = dateObj.toLocaleString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const userValueString = localStorage.getItem("userData");
  const userValue = userValueString ? JSON.parse(userValueString) : null;

  const reserveAppointmentRequest = async () => {
    const transformedData = {
      idAppointment: idAppointment,
      serviceId: dataForRequest.serviceId,
      clientId: userValue.id,
    };
    console.log(transformedData);
    console.log("Inicio de fetch");
    try {
      console.log(transformedData.appointmentId,transformedData.clientId,transformedData.serviceId);
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
      console.log("DATA ENVIADA: ",JSON.stringify(transformedData))
      if (!response.ok) {
        throw new Error("Error in assign appointment");
      }
      navigate("/shoplist");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlebutton = () => {
    setDataForRequest({ ...dataForRequest, appointmentId: idAppointment });
    reserveAppointmentRequest();
    setDataForRequest({ ...dataForRequest, dateAndHour: date });
    console.log("la request se ha realizado con los datos enviados: "+ dataForRequest);
  };

  return (
    <div>
      <h1>{id}</h1>
      <Card key={idAppointment}>
        <Card.Header as="h5">Turno</Card.Header>
        <Card.Body>
          <Card.Title>
            <br /> Fecha: {formattedDate}
            <br />
            <br /> Hora: {formattedHour}
            <br />
            <br />
          </Card.Title>
          <Button onClick={handlebutton} variant="primary">
            Elegir turno
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AppointmentCard;
