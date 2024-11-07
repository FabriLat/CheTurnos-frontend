import { Button, Card, Modal } from "react-bootstrap";
import PropTypes from 'prop-types';

const OwnersEmployeeCard = ({ employeeId, name, email, showConfirmModal, handleCloseConfirmModal, handleDeleteButton, deleteEmployee }) => {
    
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
                        <Button variant="danger" onClick={() => {handleDeleteButton()}}>
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
                    <Button variant="danger" onClick={() => {deleteEmployee(employeeId)}}>
                        Eliminar
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
    showConfirmModal: PropTypes.bool,
    handleCloseConfirmModal:  PropTypes.func,
    handleDeleteButton: PropTypes.func,
    deleteEmployee: PropTypes.func
};

export default OwnersEmployeeCard;
