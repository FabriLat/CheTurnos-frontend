import { useContext } from 'react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';

const ServiceCard = ({ nameService, description, price, duration, idService }) => {
    const {dataForRequest, setDataForRequest} = useContext (AuthenticationContext);
    const navegate = useNavigate();
    const handlebutton = () => {
        setDataForRequest({ ...dataForRequest, serviceId: idService });
        navegate("/EmployeeList");
        
    }
    return (
        <div>
            <h1>{idService}</h1>
            <Card key={idService} style={{border: '2px solid #33d4c3'}}>
                <Card.Header style={{color:'#33d4c3',backgroundColor: 'white', borderBottom: '3px solid #33d4c3'}}as="h5">{nameService}</Card.Header>
                <Card.Body>
                    <Card.Title>
                        Duración: {duration}hs
                    </Card.Title>
                    <Card.Text>
                        {description} <br /> Precio: {price}<br /><br />
                    </Card.Text>
                    <Button style={{backgroundColor: '#33d4c3', border:'#45a69d'}}variant="primary" onClick={handlebutton}>Elegir Servicio</Button>
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

