import './ownerAppointmentItem.css';

const OwnerAppointmentItem = ({ diaYHora, proveedor, servicio, cliente }) => {
  return (
    <div className={`w-75 mx-auto my-2 d-flex border rounded p-2 ${cliente ? "bg-appointment border-appointment" : "bg-no-client border-no-client"}`}>
      <div className="w-25 text-center appointment-item">{diaYHora}</div>
      <div className="w-25 text-center appointment-item">{proveedor}</div>
      <div className="w-25 text-center appointment-item">{servicio ? servicio : "-"}</div>
      <div className="w-25 text-center appointment-item">{cliente ? cliente : "-"}</div>
    </div>
  );
};

export default OwnerAppointmentItem;
