import { useContext } from 'react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ServiceCard = ({ nameService, description, price, duration, idService }) => {
    const { dataForRequest, setDataForRequest, saveAssignClient } = useContext(AuthenticationContext);
    const navegate = useNavigate();

    const handlebutton = () => {
        console.log(idService);
        if (!idService) console.error("IDServicio no existe!")

        const clientData = localStorage.getItem('userData');
        const userValue = clientData ? JSON.parse(clientData) : null;
        const clientId = userValue ? userValue.id : null; 
        
        const transformedData = {
            "idAppointment": null,
            "serviceId": idService,
            "clientId": clientId,
        }

        setDataForRequest({ ...dataForRequest, serviceId: idService });

        localStorage.setItem('assignClient', JSON.stringify(transformedData));

        navegate("/EmployeeList");
    }


    return (
        <div>
            <Card key={idService} style={{ border: '5px solid #33d4c3', borderRadius: '10%', backgroundColor: '#fcf7f7' }}>
                <Card.Header style={{ color: '#33d4c3', backgroundColor: '#fcf7f7', borderBottom: '3px solid #33d4c3' }} as="h5">{nameService}</Card.Header>
                <Card.Body>
                    <Card.Title>
                        Duración: {duration}hs
                    </Card.Title>
                    <Card.Text>
                        {description} <br /> Precio:  <FontAwesomeIcon icon={faDollarSign} />{price}<br /><br />
                    </Card.Text>
                    <Button style={{ backgroundColor: '#33d4c3', border: '#45a69d' }} variant="primary" onClick={handlebutton}>Elegir Servicio</Button>
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

