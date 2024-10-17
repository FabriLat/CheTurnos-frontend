import { useContext } from "react";
import OwnerAppointmentItem from "../ownerAppointmentItem/OwnerAppointmentItem";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";

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
          return employeesArray[index].name
        }
        index = index + 1;
      }
    }
  };

  return (
    <div className="overflow-auto" style={{ width: "95%", maxHeight: "85%" }}>
      {appointmentsArray
        ? <div className=" w-75 mx-auto mb-3 p-2 d-flex h3 border-bottom border-2">
            <div className="w-25 text-center">Día y Hora</div>
            <div className="w-25 text-center">Proveedor</div>
            <div className="w-25 text-center">Servicio</div>
            <div className="w-25 text-center">Cliente</div>
          </div>
        : <h3 className="text-center">No hay turnos almacenados</h3>
      }
      {appointmentsArray
        ? appointmentsArray.map((a) => 
            <OwnerAppointmentItem
              key={a.id}
              diaYHora={formatDateTime(a.dateAndHour)}
              proveedor={selectProviderName(a.providerId)}
              servicio={a.serviceId}
              cliente={a.clientId}
            />
          )
        : ""
      }
    </div>
  );
  };
  
  export default OwnerAppointmentsList;
