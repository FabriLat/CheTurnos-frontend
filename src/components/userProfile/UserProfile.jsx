import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { Button } from "react-bootstrap";
import UserProfileModal from "./userProfileModal/UserProfileModal";

const UserProfile = () => {
  const { user, token } = useContext(AuthenticationContext);
  console.log("User:", user);
  console.log("Token:", token);

  useEffect(() => {
    console.log("Token actualizado:", token);
  }, [token]);

  const [showModal, setShowModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  console.log(user);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    resetErrors();
  };

  const resetErrors = () => {
    setErrorUsername("");
    setErrorPassword("");
  };

  const updateUserData = async (username, password) => {
    try {
      console.log("token pa mandar", token);
      const response = await fetch(
        `https://localhost:7276/api/Client/ModifyClientData`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: username,
            password: password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      } else {
        console.log("Se ha actualizado el usuario", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = (username, password) => {
    if (!username) {
      setErrorUsername("El usuario es obligatorio");
    } else if (!password) {
      setErrorPassword("La contraseña es obligatoria");
    } else {
      setPassword(password);
      updateUserData(username, password);
      setNewUserName(username);
      handleClose();
    }
  };

  return (
    <>
      <div className="userProfile d-flex flex-column align-items-center">
        <h1>Datos del usuario</h1>
        <p>Id: {user?.id}</p>
        <p>Rol: {user?.role}</p>
        <p>Usuario: {user?.username}</p>
        <p>Email: {user?.email}</p>
        <Button className="btn btn-primary" onClick={handleShow}>
          Modificar usuario
        </Button>
      </div>

      <UserProfileModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        user={user}
        errorUsername={errorUsername}
        errorPassword={errorPassword}
        setErrorUsername={setErrorUsername}
        setErrorPassword={setErrorPassword}
      />
    </>
  );
};

export default UserProfile;
