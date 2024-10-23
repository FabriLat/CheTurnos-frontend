
import { useContext } from 'react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
const ShopCard = ({name, address, phone, timeStart, timeEnd, idShop}) => {
  const {setShopId} = useContext (AuthenticationContext);
  const {dataForRequest, setDataForRequest} = useContext (AuthenticationContext);
  const navegate = useNavigate();

  const handlebutton = ()=>{
    setShopId(idShop); 
    setDataForRequest({...dataForRequest, shopId: idShop});
    navegate('/serviceList')
  }


  const formatTime = (time)=>{
        const [hour, minute] = time.split(":");
        return `${hour}:${minute}`;
    }
    
    return (
        <Card key={idShop} style={{border: '1px solid #6d21dd' }}>
        <Card.Header style={{color:'#6d21dd',backgroundColor: 'white', borderBottom: '3px solid #6d21dd'}}as="h5">{name}</Card.Header>
        <Card.Body>
          <Card.Title>{address}</Card.Title>
          <Card.Text>
            Telefono: {phone}<br/>
            Abre: {formatTime(timeStart)}<br/>
            Cierra: {formatTime(timeEnd)}<br/>
          </Card.Text>
          <Button variant="primary" onClick={handlebutton} style={{backgroundColor: '#6d21dd'}}>Pedi tu Turno!</Button>
        </Card.Body>
      </Card>
    )
}

ShopCard.propType = {
    name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    timeStart: PropTypes.date,
    timeEnd: PropTypes.date,
    idShop: PropTypes.number,
    key: PropTypes.number,

}

export default ShopCard
