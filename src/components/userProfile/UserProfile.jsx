import { useContext, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { Button } from "react-bootstrap";
import UserProfileModal from "./userProfileModal/UserProfileModal";
import UserProfilePass from "./userProfileModal/UserProfilePass";

const UserProfile = () => {
  const { user, token, setUser } = useContext(AuthenticationContext);
  console.log("User:", user);
  console.log("Token:", token);
  const shopId = user.shopId;
  const email = user.email;
  console.log(user.shopId);

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

  const updateClientData = async (username, actualPassword, newPassword) => {
    const endpoint = "https://localhost:7276/api/Client/ModifyClientData";
    console.log("dentro del fetch: ", username, actualPassword, newPassword);
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: username,
          actualPassword: actualPassword,
          newPassword: newPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      } else {
        setUser({ ...user, username: username });
        console.log("Se ha actualizado el usuario", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmployeeData = async (username, actualPassword, newPassword) => {
    const endpoint = `https://localhost:7276/api/Employee/Update/${user.id}`;
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: username,
          actualPassword: actualPassword,
          newPassword: newPassword,
          
        }),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      } else {
        setUser({ ...user, username: username });
        console.log("Se ha actualizado el usuario", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateOwnerData = async (username, actualPassword, newPassword) => {
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
          actualPassword: actualPassword,
          newPassword: newPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      } else {
        setUser({ ...user, username: username });
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
      updateUserData(username, newPassword, actualPassword);
      setNewUserName(username);
      handleClose();
    }
  };

  return (
    <>
      <div className="userProfile d-flex flex-column align-items-center">
        <h1>Datos del usuario</h1>
        <p>
          {user?.role === "Owner"
            ? "Id dueño"
            : user?.role === "Employee"
            ? "Id empleado"
            : "Id cliente"}
          : {user?.id}
        </p>
        {user.shopId && <p>Id del negocio: {user?.shopId}</p>}
        <p>Rol: {user?.role}</p>
        <p>Usuario: {user?.username}</p>
        <p>Email: {user?.email}</p>
        <Button className="btn btn-primary" onClick={handleShow}>
          Modificar usuario
        </Button>

        <Button className="btn btn-primary" onClick={handlePassShow}>
          Modificar contraseña
        </Button>
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
    </>
  );
};

export default UserProfile;
