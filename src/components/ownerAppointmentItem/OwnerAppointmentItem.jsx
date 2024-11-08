import { Button, Modal } from 'react-bootstrap';
import './ownerAppointmentItem.css';
import { useContext, useState } from 'react';
import { ShopContext } from "../../services/shop/ShopContext";
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const OwnerAppointmentItem = ({ id, diaYHora, proveedor, servicio, cliente, status, onDeleteSuccess }) => {

  const { token } = useContext(AuthenticationContext);
  const { myShopAppointments, deleteAppHandler, setAppFlag } = useContext(ShopContext);
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);  

  const selectBgColour = (client) => {
    if (client) {
      return "bg-appointment border-appointment";
    } else {
      return "bg-no-client border-no-client";
    }
  };

  const deleteButtonHandler = () => {
    setShowConfirmModal(true);  
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`https://localhost:7276/api/Appointment/DeleteAppointment/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAppFlag(true);
        const filteredArray = myShopAppointments.filter((app) => app.id !== id);
        deleteAppHandler(filteredArray);
        setShowConfirmModal(false);  
        onDeleteSuccess();  
      } else {
        throw new Error('No se pudo eliminar el turno');
      }
    } catch (error) {
      console.error(error);
      alert("El turno no se ha podido eliminar");
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);  
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className={`my-1 d-flex align-items-center border rounded p-2 ${selectBgColour(cliente, status)}`} style={{ width: "85%" }}>
        <div className="w-25 text-center appointment-item">{diaYHora}</div>
        <div className="w-25 text-center appointment-item">{proveedor}</div>
        <div className="w-25 text-center appointment-item">{servicio ? servicio : "-"}</div>
        <div className="w-25 text-center appointment-item">{cliente ? cliente : "-"}</div>
      </div>
      <Button 
        className='mx-1 my-1 p-1 d-flex'
        variant="danger"
        onClick={deleteButtonHandler}
      >
        <FontAwesomeIcon title='Borrar turno' icon={faTrashCan} className='p-2' />
      </Button>

      {/* Modal de confirmación de eliminación */}
      <Modal show={showConfirmModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar permanentemente el turno de fecha {diaYHora} ofrecido por {proveedor}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OwnerAppointmentItem;
