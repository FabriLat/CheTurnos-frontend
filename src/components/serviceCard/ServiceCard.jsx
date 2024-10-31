import { useContext } from 'react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <Card key={idService} style={{border: '5px solid #33d4c3', borderRadius: '10%', backgroundColor:'#fcf7f7'}}>
                <Card.Header style={{color:'#33d4c3',backgroundColor: '#fcf7f7', borderBottom: '3px solid #33d4c3'}}as="h5">{nameService}</Card.Header>
                <Card.Body>
                    <Card.Title>
                        Duración: {duration}hs
                    </Card.Title>
                    <Card.Text>
                        {description} <br /> Precio:  <FontAwesomeIcon icon={faDollarSign} />{price}<br /><br />
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

