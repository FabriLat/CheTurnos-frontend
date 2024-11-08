import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { Button , Card, Modal } from "react-bootstrap";
import UserProfileModal from "./userProfileModal/UserProfileModal";
import UserProfilePass from "./userProfileModal/UserProfilePass";
import './userProfile.css'

const UserProfile = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { user, token, setUser, setToken } = useContext(AuthenticationContext);
  console.log(user.shopId);

  useEffect(() => {
    const tokenValue = localStorage.getItem("token");
    const userValueString = localStorage.getItem("userData");
    const userValue = userValueString ? JSON.parse(userValueString) : null;
    if (tokenValue && userValue) {
      setToken(tokenValue);
      setUser(userValue);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [passShowModal, setPassShowModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  console.log(user);

  const handleShow = () => setShowModal(true);
  const handlePassShow = () => setPassShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    resetErrors();
  };
  const handlePassClose = () => {
    setPassShowModal(false);
    resetErrors();
  };

  const resetErrors = () => {
    setErrorUsername("");
    setErrorPassword("");
  };

  const updateClientData = async (username, newPassword, confirmationPassword) => {
    const endpoint = "https://localhost:7276/api/Client/ModifyClientData";
    console.log("dentro del fetch: ", username, newPassword, confirmationPassword);
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: username,
          newPassword: newPassword,
          confirmationPassword: confirmationPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      } else {
        setUser({ ...user, username: username });
        setShowSuccessModal(true);
        console.log("Se ha actualizado el usuario", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmployeeData = async (username, newPassword, confirmationPassword) => {
    const endpoint = `https://localhost:7276/api/Employee/Update`;
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: username,
          newPassword: newPassword,
          confirmationPassword: confirmationPassword,
          
        }),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      } else {
        setUser({ ...user, username: username });
        setShowSuccessModal(true);
        console.log("Se ha actualizado el usuario", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateOwnerData = async (username, newPassword, confirmationPassword) => {
    const endpoint = "https://localhost:7276/api/Owner/ModifyOwnerData";

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: username,
          newPassword: newPassword,
          confirmationPassword: confirmationPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      } else {
        setUser({ ...user, username: username });
        setShowSuccessModal(true);
        console.log("Se ha actualizado el usuario", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserData = async (username, actualPassword, newPassword) => {
    if (user.role === "Client") {
      await updateClientData(username, actualPassword, newPassword);
    } else if (user.role === "Owner") {
      await updateOwnerData(username, actualPassword, newPassword);
    } else if (user.role === "Employee") {
      await updateEmployeeData(username, actualPassword, newPassword);
    }
  };

  const handleConfirm = (username, actualPassword, newPassword) => {
    if (!username) {
      setErrorUsername("El usuario es obligatorio");
    } else if (!actualPassword) {
      setErrorPassword("La contraseña es obligatoria");
    } else {
      updateUserData(username,actualPassword, newPassword );
      setNewUserName(username);
      handleClose();
    }
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  return (
    <>
    <div className="outer-container-profile">
       <div className="d-flex flex-column align-items-center">
       <div className="user-title-service">
        <h1 className="datos-title" >Datos de: <br /></h1>
      </div>

      <Card className="user-profile-card shadow-sm" style={{border: '5px solid #0d6efd', borderRadius: '5%', backgroundColor:'#fcf7f7'}}>
      <Card.Body>
      <h1 className="name-title"> {user?.username}</h1>
  <div className="info-row">
    <div className="info-details">
      <Card.Title className="info-title">Usuario:</Card.Title>
      <p className="info-content">{user?.username}</p>
    </div>
    <Button size="sm" variant="primary" onClick={handleShow}>
      Modificar
    </Button>
  </div>

  <div className="info-row">
    <div className="info-details">
      <Card.Title className="info-title">Contraseña:</Card.Title>
      <p className="info-content">{"********"}</p>
    </div>
    <Button size="sm" variant="primary" onClick={handlePassShow}>
      Modificar
    </Button>
  </div>
  </Card.Body>
      </Card>
    </div>
    </div>
      <UserProfileModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        user={user}
        errorUsername={errorUsername}
        errorPassword={errorPassword}
      />
      <UserProfilePass
        show={passShowModal}
        handleClose={handlePassClose}
        handleConfirm={handleConfirm}
        user={user}
        errorUsername={errorUsername}
        errorPassword={errorPassword}
      />

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Operación Exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Los datos se han actualizado con éxito.
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

export default UserProfile;
