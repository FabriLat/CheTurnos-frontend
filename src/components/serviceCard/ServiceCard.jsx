import { useContext } from 'react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ nameService, description, price, duration, idService }) => {
    const navegate = useNavigate();
    const handlebutton = () => {
        navegate("/EmployeeList");
        
    }
    return (
        <div>
            <h1>{idService}</h1>
            <Card key={idService}>
                <Card.Header as="h5">{nameService}</Card.Header>
                <Card.Body>
                    <Card.Title>
                        duracion: {duration}
                    </Card.Title>
                    <Card.Text>
                        {description} <br /> precio: {price}<br /><br />
                    </Card.Text>
                    <Button variant="primary" onClick={handlebutton}>Elegir Servicio</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

ServiceCard.propTypes = {
    nameService: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    duration: PropTypes.string,
    idService: PropTypes.number,
}

export default ServiceCard

