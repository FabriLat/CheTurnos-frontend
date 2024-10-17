const OwnerAppointmentItem = ({ diaYHora, proveedor, servicio, cliente }) => {

    return (
      <div className={`w-75 mx-auto my-2 d-flex border rounded p-2 ${cliente ? "bg-success border-success" : "bg-secondary border-secondary"} bg-opacity-25`}>
        <div className="w-25 text-center">{diaYHora}</div>
        <div className="w-25 text-center">{proveedor}</div>
        <div className="w-25 text-center">{servicio ? servicio : "-"}</div>
        <div className="w-25 text-center">{cliente ? cliente : "-"}</div>
      </div>
    );
  };
  
  export default OwnerAppointmentItem;