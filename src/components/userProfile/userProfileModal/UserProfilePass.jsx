import { Modal, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const UserProfileModal = ({
  show,
  handleClose,
  handleConfirm,
  user,
  errorUsername,
  errorPassword,
}) => {
  const [newName, setNewName] = useState(user.username);
  const [actualPassword,setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  useEffect(() => {
    setNewName(user.username);
  }, [user]);


  const handleCancel = () => {
    setNewName(user.username);
    setNewPassword("");
    setConfirmNewPassword("");
    handleClose();
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmNewPassword(value);
  };

  const submitHandler = () => {
    if (newPassword !== confirmNewPassword) {
      setErrorConfirmPassword("Las contraseñas no coinciden");
    } else {
      handleConfirm(user.username,newPassword, actualPassword);
      handleClose();
    }
  };

  const handleActualPassword = (e) => {
    setActualPassword(e.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modificar datos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" value={user?.email} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de usuario:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={newName}
              disabled
            />
            <Form.Control.Feedback type="invalid">
              {errorUsername}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña actual:</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={actualPassword}
              onChange={handleActualPassword}
              isInvalid={!!errorPassword}
              required
            />

            <Form.Control.Feedback type="invalid">
              {errorPassword || "Debe ingresar una contraseña"}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nueva contraseña:</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              isInvalid={!!errorPassword}
              required
            />

            <Form.Control.Feedback type="invalid">
              {errorPassword || "Debe ingresar una contraseña"}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar nueva contraseña:</Form.Label>
            <Form.Control
              type="password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              isInvalid={!!errorConfirmPassword}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errorConfirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="success" onClick={submitHandler}>
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
    shopId: PropTypes.number,
  }).isRequired,
  errorUsername: PropTypes.string,
  errorPassword: PropTypes.string,
};

export default UserProfileModal;
