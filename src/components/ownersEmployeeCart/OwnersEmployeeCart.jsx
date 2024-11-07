import { Button, Card, Modal } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { useContext, useState } from "react";
import PropTypes from 'prop-types';
import { ShopContext } from "../../services/shop/ShopContext";

const OwnersEmployeeCard = ({ employeeId, name, email, onRemoveEmployee }) => {
    const { token } = useContext(AuthenticationContext);
    const { setEmpFlag } = useContext(ShopContext);

    // Estado para controlar la visibilidad de los modales
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Función para manejar la acción de eliminar empleado
    const handlebutton = () => {
        setShowConfirmModal(true); // Muestra el modal de confirmación
    };

    // Función para eliminar el empleado
    const deleteEmployee = async () => {
        try {
            const response = await fetch(
                `https://localhost:7276/api/employee/delete/${employeeId}`,
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

            // Llamar a la función para remover al empleado de la lista
            onRemoveEmployee(employeeId);
            setEmpFlag(true);

            // Muestra el modal de éxito después de la eliminación
            setShowSuccessModal(true);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Función para cerrar el modal de confirmación
    const handleCloseConfirmModal = () => setShowConfirmModal(false);

    // Función para cerrar el modal de éxito
    const handleCloseSuccessModal = () => setShowSuccessModal(false);

    return (
        <div className="mt-4">
            <Card key={employeeId} style={{ border: '5px solid #0d6efd', borderRadius: '10%', backgroundColor: '#fcf7f7' }}>
                <Card.Header as="h5" style={{ color: '#0d6efd', backgroundColor: '#fcf7f7', borderBottom: '3px solid #0d6efd' }}>
                    {name}
                </Card.Header>
                <Card.Body>
                    <Card.Title>Email:</Card.Title>
                    <Card.Text>{email}</Card.Text>
                    <Card.Text>
                        <br />
                        <Button variant="danger" onClick={handlebutton}>
                            Eliminar Empleado
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* Modal de confirmación */}
            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de que desea eliminar al empleado {name} de forma permanente?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={deleteEmployee}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de éxito */}
            <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Operación Exitosa</Modal.Title>
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
        </div>
    );
};

OwnersEmployeeCard.propTypes = {
    employeeId: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    onRemoveEmployee: PropTypes.func,
};

export default OwnersEmployeeCard;
