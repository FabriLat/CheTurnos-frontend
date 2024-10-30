import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import useValidateUser from '../hookCustom/useValidateUser';

const ShopCard = ({ name, address, phone, timeStart, timeEnd, idShop, onRemoveShop }) => {
  const { setShopId } = useContext(AuthenticationContext);
  const { dataForRequest, setDataForRequest } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const { isAdmin, isClient } = useValidateUser();

  const [showModal, setShowModal] = useState(false); 

  const handleButton = () => {
    setShopId(idShop);
    setDataForRequest({ ...dataForRequest, shopId: idShop });
    navigate('/serviceList');
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://localhost:7276/api/Shop/PermanentDeletionShop/${idShop}`, {
        method: "DELETE",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Error in delete shop");
      }
      onRemoveShop(idShop);
      console.log("Shop deleted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
    setShowModal(false); 
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
  };

  return (
    <>
      <Card key={idShop} style={{ border: '1px solid #6d21dd' }}>
        <Card.Header style={{ color: '#6d21dd', backgroundColor: 'white', borderBottom: '3px solid #6d21dd' }} as="h5">{name}</Card.Header>
        <Card.Body>
          <Card.Title>{address}</Card.Title>
          <Card.Text>
            Teléfono: {phone}<br />
            Abre: {formatTime(timeStart)}<br />
            Cierra: {formatTime(timeEnd)}<br />
          </Card.Text>
          {isClient() && <Button variant="primary" onClick={handleButton} style={{ backgroundColor: '#6d21dd' }}>Pedi tu Turno!</Button>}
          {isAdmin() && <Button variant="danger" onClick={() => setShowModal(true)} style={{ backgroundColor: '#FF00D' }}>Eliminar Negocio</Button>}
        </Card.Body>
      </Card>

      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar este negocio?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ShopCard.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  timeStart: PropTypes.string,
  timeEnd: PropTypes.string,
  idShop: PropTypes.number,
  onRemoveShop: PropTypes.func,
  key: PropTypes.number,
};

export default ShopCard;
