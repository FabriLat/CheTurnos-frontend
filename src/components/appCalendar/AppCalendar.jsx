import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";

const AppCalendar = () => {
  const [dayMonth, setDayMonth] = useState({ day: null, month: null });
  const { dataForRequest, setDataForRequest } = useContext(
    AuthenticationContext
  );
  const navegate = useNavigate();

  const dayMonthHandle = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setDataForRequest({
      ...dataForRequest,
      day: day,
      month: month,
      year: year,
    });
    setDayMonth({ day, month });
    console.log(`Día seleccionado: ${day}, Mes seleccionado: ${month}`);
    console.log(dataForRequest);
  };

  const reserveAppointmentRequest = async () => {
    const transformedData = {
      serviceId: dataForRequest.serviceId,
      providerId: dataForRequest.providerId,
      clientId: dataForRequest.clientId,
      shopId: dataForRequest.shopId,
      dateAndHour: new Date(
        Date.UTC(
          dataForRequest.year,
          dataForRequest.month - 1,
          dataForRequest.day,
          18,
          50,
          8
        )
      ).toISOString(),
      duration: {
        ticks: dataForRequest.duration ? dataForRequest.duration : 0,
      },
    };
    console.log(transformedData);
    console.log("Inicio de fetch");
    try {
      const response = await fetch(
        "https://localhost:7276/api/Appointment/CreateAppointment",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData),
        }
      );
      if (!response.ok) {
        throw new Error("Error in obtaining shops");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const reserveDateHandle = async   () => {
    if (dayMonth.day == null || dayMonth.month == null) {
      alert("selecciona una fecha para continuar");
      return;
    }
    console.log(dayMonth);
    await reserveAppointmentRequest();
    navegate("/shoplist");
  };

  return (
    <>
      <h1>SELECCIONAR DIA</h1>
      <Calendar onChange={dayMonthHandle} />
      {dayMonth.day && dayMonth.month && (
        <p>
          Fecha seleccionada: {dayMonth.day}/{dayMonth.month}
        </p>
      )}
      <Button onClick={reserveDateHandle}>Finalizar reserva</Button>
    </>
  );
};
export default AppCalendar;
