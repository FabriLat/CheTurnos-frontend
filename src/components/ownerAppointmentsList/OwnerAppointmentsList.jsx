import { useContext, useState } from "react";
import OwnerAppointmentItem from "../ownerAppointmentItem/OwnerAppointmentItem";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import './ownerAppointmentsList.css';
import logo from './CheTurnosIco.png';
import { Button, Modal } from 'react-bootstrap';

const OwnerAppointmentsList = ({ appointmentsArray }) => {
  const { user } = useContext(AuthenticationContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);  // Estado para el modal de éxito

  const formatDateTime = (dateTime) => {
    const aux1 = dateTime.split("T");
    const aux2 = aux1[0].split("-");
    const newFormat = `${aux2[2]}/${aux2[1]}/${aux2[0]} - ${aux1[1].slice(0, -3)}`;
    return newFormat;
  };

  const handleDeleteSuccess = () => {
    setShowSuccessModal(true);  // Mostrar el modal de éxito cuando un turno es eliminado
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);  // Cerrar el modal de éxito
  };

  return (
    <>
      <div className="turnos-title">
        <img className="calendarTurnos" src={logo} alt="Logo" />
        <h2>Turnos:</h2>
      </div>

      {appointmentsArray && appointmentsArray.length > 0 ? (
        <div className="appointments-container">
          <div className="appointments-header">
            <div className="header-item" style={{ width: "27%" }}>Día y Hora</div>
            <div className="header-item" style={{ width: "19%" }}>Proveedor</div>
            <div className="header-item" style={{ width: "25%" }}>Servicio</div>
            <div className="header-item" style={{ width: "20%" }}>Cliente</div>
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
              onDeleteSuccess={handleDeleteSuccess}  // Pasa la función para mostrar el modal de éxito
            />
          ))}
        </div>
      ) : (
        <div className="no-appointments-container">
          <h3 className="no-appointments">No hay turnos almacenados</h3>
        </div>
      )}

      
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Operación Exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          El turno ha sido eliminado con éxito.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OwnerAppointmentsList;
