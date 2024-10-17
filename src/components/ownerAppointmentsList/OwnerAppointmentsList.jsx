import { useState,  } from "react";
import OwnerAppointmentItem from "../ownerAppointmentItem/OwnerAppointmentItem";

const OwnerAppointmentsList = () => {
  const hardcodedData = [
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "",
      cliente: ""
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "",
      cliente: ""
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    },
    {
      diaYHora: "20/10/2024 - 16:00",
      proveedor: "Walter Ramos",
      servicio: "Corte de cabello",
      cliente: "Pepe Mujica"
    }
  ]
  const [myShopAppointments, setMyShopAppointments] = useState(hardcodedData);

    return (
      <div className="overflow-auto" style={{ width: "90%", maxHeight: "80%" }}>
        {myShopAppointments
          ? <div className=" w-75 mx-auto mb-3 p-2 d-flex h3 border-bottom border-2">
              <div className="w-25 text-center">Día y Hora</div>
              <div className="w-25 text-center">Empleado</div>
              <div className="w-25 text-center">Servicio</div>
              <div className="w-25 text-center">Cliente</div>
            </div>
          : <h3 className="text-center">No hay turnos almacenados</h3>
        }
        {myShopAppointments
          ? myShopAppointments.map((a) => 
              <OwnerAppointmentItem 
                diaYHora={a.diaYHora}
                proveedor={a.proveedor}
                servicio={a.servicio}
                cliente={a.cliente}
              />
            )
          : ""
        }
      </div>
    );
  };
  
  export default OwnerAppointmentsList;