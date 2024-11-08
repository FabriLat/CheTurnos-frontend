import { useState } from 'react'
import { useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Spiner from '../spiner/Spiner';
import OwnersEmployeeCard from '../ownersEmployeeCart/OwnersEmployeeCart';
import { useNavigate } from 'react-router-dom';
import './ownersEmployeeList.css'
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { ShopContext } from '../../services/shop/ShopContext';


const OwnersEmployeeList = () => {
    const { user, token } = useContext(AuthenticationContext);
    const [myShopEmployees, setMyShopEmployees] = useState([]);
    // Estado para controlar la visibilidad de los modales
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { setEmpFlag } = useContext(ShopContext);

    const [loading, setLoading] = useState(false);
    const navegate = useNavigate();

    const getMyShopEmployees = async () => {
        setLoading(true)
        await fetch(`https://localhost:7276/api/Employee/GetMyShopEmployees/${user.id}`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                mode: "cors",
            })
            .then(response => {
                if (response.ok) {
                    setLoading(false);
                    return response.json();
                } else {
                    // Manejo de errores según el código de estado
                    if (response.status === 404) {
                        setLoading(false);
                        throw new Error('Not Found (404)');
                    } else if (response.status === 401) {
                        setLoading(false);
                        throw new Error('Unauthorized (401)');
                    } else {
                        setLoading(false);
                        throw new Error(`Error: ${response.status}`);
                    }
                }
            })
            .then((data) => {
                // Procesar los datos aquí
                console.log(data);
                setMyShopEmployees(data);
                //setEmpFlag(false);
                console.log(`My shop employees: ${data}`);
            })
            .catch((error) => {
                // Manejo del error aquí
                setLoading(false);
                console.log(error)
            })

    };

    const removeEmployee = (id) => {
        setMyShopEmployees((prevEmployee) => prevEmployee.filter((e) => e.id !== id));
    }

    useEffect(() => {
        getMyShopEmployees();
    }, []);


    const handleButton = () => {
        navegate("/OwnersEmployeeRegister");
    }

    // Función para cerrar el modal de confirmación
    const handleCloseConfirmModal = () => setShowConfirmModal(false);
    // Función para cerrar el modal de éxito
    const handleCloseSuccessModal = () => setShowSuccessModal(false);

    // Función para eliminar el empleado
    const deleteEmployee = async (empId) => {
        try {
            const response = await fetch(
                `https://localhost:7276/api/employee/delete/${empId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    mode: "cors",
                }
            );

            if (!response.ok) {
                throw new Error("Error deleting employee");
            }

            //cierra el modal de confirmación
            handleCloseConfirmModal();
            // Muestra el modal de éxito después de la eliminación
            setShowSuccessModal(true);
            // Llamar a la función para remover al empleado de la lista
            removeEmployee(empId);
            setEmpFlag(true);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Función para manejar la acción de eliminar empleado
    const handleDeleteButton = () => {
        setShowConfirmModal(true); // Muestra el modal de confirmación
    };

    return (<>
        {loading ? (
            <Spiner />
        ) : (
            <div className="outer-container-employees-list">
                <div className="shop-list-container">
                    <div className="title-service">
                        <h1 className="service-title">Lista de Empleados:</h1> 
                    </div>
                    <Button style={{backgroundColor:'#6d21dd'}} onClick={handleButton}>
                        Agregar nuevo empleado
                    </Button>

                    <div className="card-service">
                        {myShopEmployees.map((e) => (
                            <OwnersEmployeeCard
                                key={e.id}
                                employeeId={e.id}
                                name={e.name}
                                email={e.email}
                                showConfirmModal={showConfirmModal}
                                handleCloseConfirmModal={handleCloseConfirmModal}
                                handleDeleteButton={handleDeleteButton}
                                deleteEmployee={deleteEmployee}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* Modal de éxito */}
        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
            <Modal.Header closeButton>
                <Modal.Title>¡Operación Exitosa!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                El empleado ha sido eliminado correctamente.
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

export default OwnersEmployeeList;