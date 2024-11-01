import { useEffect, useState } from 'react';
import { ListGroup, Form, Modal, Button } from 'react-bootstrap';
import EachUser from './EachUser';
import Spiner from '../spiner/Spiner';
import './users.css';

const Users = () => {
  const [user, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [owners, setOwners] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("Client");
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setClients(user.filter(u => u.type === "Client"));
    setOwners(user.filter(u => u.type === "Owner"));
    setEmployees(user.filter(u => u.type === "Employee"));
    setAdmins(user.filter(u => u.type === "SysAdmin"));
  }, [user]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`https://localhost:7276/api/SysAdmin/GetAll`, {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Error in obtaining Users");
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const confirmDeleteUser = (userId) => {
    setUserIdToDelete(userId);
    setShowModal(true);
  };

  const handleDeleteUser = async () => {
    deleteUser();
//if o algo para que identificque que es dueño y eliminar en cascada. 
  }


  const deleteUser = async () => {
    if (userIdToDelete) {
      try {
        const response = await fetch(`https://localhost:7276/api/SysAdmin/Delete/${userIdToDelete}`, {
          method: "DELETE",
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Error in deleting User");
        }
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userIdToDelete));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setShowModal(false);
        setUserIdToDelete(null);
      }
    }
  };

  const renderUserList = () => {
    switch (selectedType) {
      case "Client":
        return clients;
      case "Owner":
        return owners;
      case "Employee":
        return employees;
      case "SysAdmin":
        return admins;
      default:
        return [];
    }
  };

  const getUserTypeTitle = () => {
    switch (selectedType) {
      case "Client":
        return "Clientes";
      case "Owner":
        return "Dueños";
      case "Employee":
        return "Empleados";
      case "SysAdmin":
        return "Admins";
      default:
        return "";
    }
  };

  return (
    <div className='outer-container-users'>
      {loading ? (
        <Spiner />
      ) : (
        <div className="user-container">
          <Form.Group controlId="userTypeSelect" className="user-select">
            <Form.Label>Selecciona Tipo de Usuario:</Form.Label>
            <Form.Select
              as="select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="Client">Clientes</option>
              <option value="Owner">Dueños</option>
              <option value="Employee">Empleados</option>
              <option value="SysAdmin">Admins</option>
            </Form.Select>
          </Form.Group>

          <h4>{getUserTypeTitle()}</h4>

          <ListGroup className="user-list">
            {renderUserList().map((user) => (
              <EachUser
                key={user.id}
                name={user.userName}
                email={user.email}
                onDelete={() => confirmDeleteUser(user.id)}
                id={user.id}
              />
            ))}
          </ListGroup>


          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro de que deseas eliminar este usuario?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleDeleteUser}>
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Users;
