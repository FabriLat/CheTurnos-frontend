import { useContext } from "react";
import OwnerAppointmentItem from "../ownerAppointmentItem/OwnerAppointmentItem";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import './ownerAppointmentsList.css';
import logo from './CheTurnosIco.png';


const OwnerAppointmentsList = ({ appointmentsArray }) => {

  const { user } = useContext(AuthenticationContext);

  const formatDateTime = (dateTime) => {
    const aux1 = dateTime.split("T");
    const aux2 = aux1[0].split("-");
    const newFormat = `${aux2[2]}/${aux2[1]}/${aux2[0]} - ${aux1[1].slice(0, -3)}`;
    return newFormat;
  };

  return (
    <>
     <div className="turnos-title">
     <img
                  className="calendarTurnos"
                  src={logo}
                  alt="Logo"
                />
      <h2>Turnos:</h2>
    </div>
      {appointmentsArray && appointmentsArray.length > 0 ? (
        <div className="appointments-container">
          <div className="appointments-header">
            <div className="header-item" style={{width: "27%"}}>Día y Hora</div>
            <div className="header-item" style={{width: "19%"}}>Proveedor</div>
            <div className="header-item" style={{width: "25%"}}>Servicio</div>
            <div className="header-item" style={{width: "20%"}}>Cliente</div>
          </div>
          {appointmentsArray.map((a) => (
            <OwnerAppointmentItem
              key={a.id}
              id={a.id}
              diaYHora={formatDateTime(a.dateAndHour)}
              status={a.status}
              proveedor={a.providerId}
              servicio={a.serviceName}
              cliente={a.clientName}
            />
          ))}
        </div>
      ) : (
        <div className="no-appointments-container">
          <h3 className="no-appointments">No hay turnos almacenados</h3>
        </div>
      )}
    </>
  );
};

export default OwnerAppointmentsList;

