import { useState } from "react";
import OwnerAppointmentItem from "../ownerAppointmentItem/OwnerAppointmentItem";

const OwnerAppointmentsList = () => {
  const [myShopAppointments, setMyShopAppointments] = useState("4");

    return (
      <div>
        {myShopAppointments 
          ? <div className="d-flex">
              <h3 className="mx-5 p-3 border-bottom border-3">Día y Horario</h3>
              <h3 className="mx-5 p-3 border-bottom border-3">Proveedor</h3>
              <h3 className="mx-5 p-3 border-bottom border-3">Servicio</h3>
              <h3 className="mx-5 p-3 border-bottom border-3">Cliente</h3>
            </div>
          : <h3>No hay turnos almacenados</h3>
        }
        {myShopAppointments
          ? myShopAppointments.map((a) => 
              <OwnerAppointmentItem />
            )
          : ""
        }
      </div>
    );
  };
  
  export default OwnerAppointmentsList;