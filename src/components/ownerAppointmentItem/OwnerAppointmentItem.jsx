import { Button } from 'react-bootstrap';
import './ownerAppointmentItem.css';

const OwnerAppointmentItem = ({ diaYHora, proveedor, servicio, cliente, status }) => {

  const selectBgColour = (client, state) => {

    if (state == "Inactive") {
      return "bg-inactive border-inactive"
    }

    if (client) {
      return "bg-appointment border-appointment"
    } else {
      return "bg-no-client border-no-client"
    }
  };

  return (
    <div className={`w-75 mx-auto my-2 d-flex border rounded p-2 ${selectBgColour(cliente, status)}`}>
      <div className="w-25 text-center appointment-item">{diaYHora}</div>
      <div className="w-25 text-center appointment-item">{proveedor}</div>
      <div className="w-25 text-center appointment-item">{servicio ? servicio : "-"}</div>
      <div className="w-25 text-center appointment-item">{cliente ? cliente : "-"}</div>
    </div>
  );
};

export default OwnerAppointmentItem;

//<Button variant={status == "Active" ? "danger" : "success"}>{status == "Active" ? "Borrar" : "Restaurar"}</Button>
