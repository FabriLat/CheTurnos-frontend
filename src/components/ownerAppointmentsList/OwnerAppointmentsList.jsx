import { useContext } from "react";
import OwnerAppointmentItem from "../ownerAppointmentItem/OwnerAppointmentItem";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import './ownerAppointmentsList.css';

const OwnerAppointmentsList = ({ appointmentsArray, employeesArray }) => {

  const { user } = useContext(AuthenticationContext);

  const formatDateTime = (dateTime) => {
    const aux1 = dateTime.split("T");
    const aux2 = aux1[0].split("-");
    const newFormat = `${aux2[2]}/${aux2[1]}/${aux2[0]} - ${aux1[1].slice(0, -3)}`;
    return newFormat;
  };

  const selectProviderName = (providerId) => {
    if (providerId == user.id) {
      return user.username;
    }
    if (employeesArray) {
      let flag = false;
      let index = 0;
      while (!flag) {
        if (providerId == employeesArray[index].id) {
          flag = true;
          return employeesArray[index].name;
        }
        index = index + 1;
      }
    }
  };

  return (
    <div className="appointments-container">
      {appointmentsArray ? (
        <div className="appointments-header">
          <div className="header-item">Día y Hora</div>
          <div className="header-item">Proveedor</div>
          <div className="header-item">Servicio</div>
          <div className="header-item">Cliente</div>
        </div>
      ) : (
        <h3 className="no-appointments">No hay turnos almacenados</h3>
      )}
      {appointmentsArray
        ? appointmentsArray.map((a) => (
            <OwnerAppointmentItem
              key={a.id}
              diaYHora={formatDateTime(a.dateAndHour)}
              proveedor={selectProviderName(a.providerId)}
              servicio={a.serviceId}
              cliente={a.clientId}
            />
          ))
        : ""}
    </div>
  );
};

export default OwnerAppointmentsList;
