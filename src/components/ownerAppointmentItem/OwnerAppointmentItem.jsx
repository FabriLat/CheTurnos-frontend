import { Button } from 'react-bootstrap';
import './ownerAppointmentItem.css';
import { useContext } from 'react';
import { ShopContext } from "../../services/shop/ShopContext"
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const OwnerAppointmentItem = ({ id, diaYHora, proveedor, servicio, cliente, status }) => {

  const { token } = useContext(AuthenticationContext);
  const { myShopAppointments, deleteAppHandler, setAppFlag } = useContext(ShopContext);

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

  const deleteButtonHandler = () => {
    const result = confirm(`¿Confirma que desea eliminar de forma permanente el turno de fecha ${diaYHora} ofrecido por ${proveedor}?`);
    if (result) {
      deleteAppointment();
    }
  };

  const deleteAppointment = async () => {
    await fetch(`https://localhost:7276/api/Appointment/DeleteAppointment/${id}`, {
      method: "DELETE",
      headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`
      }
    })
      .then(response => {
          if (response.ok) {
              setAppFlag(true);
              alert("Turno eliminado con éxito");
              const filteredArray = myShopAppointments.filter((app) => app.id != id)
              deleteAppHandler(filteredArray);
              //return response.json();
          } else {
              // Manejo de errores según el código de estado
              if (response.status === 404) {
                  throw new Error('Not Found (404)');
              } else if (response.status === 401) {
                  throw new Error('Unauthorized (401)');
              } else {
                  throw new Error('Error: ' + response.status);
              }
          }
      })
      .catch((error) => {
          // Manejo del error aquí
          console.log(error)
          alert("El turno no se ha podido eliminar");
      })
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className={`my-1 d-flex align-items-center border rounded p-2 ${selectBgColour(cliente, status)}`} style={{width: "85%"}}>
        <div className="w-25 text-center appointment-item">{diaYHora}</div>
        <div className="w-25 text-center appointment-item">{proveedor}</div>
        <div className="w-25 text-center appointment-item">{servicio ? servicio : "-"}</div>
        <div className="w-25 text-center appointment-item">{cliente ? cliente : "-"}</div>
      </div>
      <Button 
        className='mx-1 my-1 p-1'
        variant={status == "Active" ? "danger" : "success"}
        onClick={deleteButtonHandler}
      >
        {status == "Active" ? "Borr." : "Rest."}
      </Button>
    </div>
  );
};

export default OwnerAppointmentItem;
