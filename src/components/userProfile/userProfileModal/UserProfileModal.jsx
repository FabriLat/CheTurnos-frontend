import { Modal, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const UserProfileModal = ({ show, handleClose, handleConfirm, user, errorUsername, errorPassword }) => {
  const [newName, setNewName] = useState(user.username);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setNewName(user.username);
  }, [user]);

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCancel = () => {
    setNewName(user.username);
    setPassword("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modificar datos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" value={user?.id} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Control type="text" value={user?.role} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={user?.email} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={newName}
              onChange={handleInputChange}
              isInvalid={!!errorUsername}
            />
            <Form.Control.Feedback type="invalid">{errorUsername}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              isInvalid={!!errorPassword}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errorPassword || "Debe ingresar una contraseña"}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="success" onClick={() => handleConfirm(newName, password)}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UserProfileModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  errorUsername: PropTypes.string,
  errorPassword: PropTypes.string,
};

export default UserProfileModal;

